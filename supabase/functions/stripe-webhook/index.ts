import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

const logStep = (step: string, details?: any) => {
  const timestamp = new Date().toISOString();
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK ${timestamp}] ${step}${detailsStr}`);
};

// Helper function to create JWT for Google Sheets authentication
async function createJWT(credentials: any): Promise<string> {
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: credentials.client_email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  // Import private key
  const privateKey = credentials.private_key;
  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(privateKey),
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  );

  // Sign the token
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(unsignedToken)
  );

  const encodedSignature = base64UrlEncode(signature);
  return `${unsignedToken}.${encodedSignature}`;
}

function base64UrlEncode(data: string | ArrayBuffer): string {
  const bytes = typeof data === "string" 
    ? new TextEncoder().encode(data)
    : new Uint8Array(data);
  
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const pemContents = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s/g, '');
  
  const binaryString = atob(pemContents);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

serve(async (req) => {
  logStep("Incoming request", { 
    method: req.method, 
    url: req.url,
    headers: Object.fromEntries(req.headers.entries())
  });
  
  if (req.method === "OPTIONS") {
    logStep("CORS preflight request handled");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Starting webhook processing");

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    logStep("Environment variables check", {
      hasStripeKey: !!stripeSecretKey,
      hasWebhookSecret: !!webhookSecret,
      stripeKeyLength: stripeSecretKey?.length,
      webhookSecretLength: webhookSecret?.length
    });
    
    if (!stripeSecretKey) {
      logStep("CRITICAL ERROR: STRIPE_SECRET_KEY is not configured");
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    
    if (!webhookSecret) {
      logStep("CRITICAL ERROR: STRIPE_WEBHOOK_SECRET is not configured");
      throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
    }

    const signature = req.headers.get("stripe-signature");
    logStep("Stripe signature check", { 
      hasSignature: !!signature,
      signaturePreview: signature?.substring(0, 50) + "..."
    });
    
    if (!signature) {
      logStep("CRITICAL ERROR: No stripe-signature header found in request");
      return new Response(
        JSON.stringify({ error: "No signature provided" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    logStep("Signature found, reading request body");

    // Read the raw body as text for signature verification
    const body = await req.text();
    
    logStep("Request body received", { 
      bodyLength: body.length,
      bodyPreview: body.substring(0, 100) + "..."
    });

    logStep("Initializing Stripe client");
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-08-27.basil",
    });
    logStep("Stripe client initialized successfully");

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      logStep("Verifying webhook signature with Stripe");
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        webhookSecret
      );
      logStep("✅ Webhook signature verified successfully", { 
        eventType: event.type,
        eventId: event.id,
        created: event.created
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      const errorStack = err instanceof Error ? err.stack : undefined;
      logStep("❌ CRITICAL ERROR: Webhook signature verification failed", { 
        error: errorMessage,
        stack: errorStack,
        signatureLength: signature.length
      });
      return new Response(
        JSON.stringify({ error: `Webhook signature verification failed: ${errorMessage}` }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Initialize Supabase client with service role key for database updates
    logStep("Initializing Supabase client");
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );
    logStep("Supabase client initialized");

    // Handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      logStep("🎯 Processing checkout.session.completed event", {
        sessionId: session.id,
        paymentStatus: session.payment_status,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total,
        currency: session.currency,
        metadata: session.metadata
      });

      // Extract submission ID from metadata
      const submissionId = session.metadata?.submission_id;
      
      logStep("Checking for submission_id in metadata", {
        hasMetadata: !!session.metadata,
        metadata: session.metadata,
        submissionId
      });
      
      if (!submissionId) {
        logStep("❌ CRITICAL ERROR: No submission_id found in session metadata");
        return new Response(
          JSON.stringify({ error: "No submission_id in metadata" }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
          }
        );
      }

      logStep("✅ Submission ID extracted from metadata", { submissionId });

      // Get payment intent ID
      const paymentIntentId = session.payment_intent as string;
      
      logStep("Payment intent check", {
        hasPaymentIntent: !!paymentIntentId,
        paymentIntentId
      });
      
      if (!paymentIntentId) {
        logStep("⚠️ WARNING: No payment_intent found in session");
      }

      // Update submission status in database
      logStep("📝 Updating submission in database", { 
        submissionId,
        newStatus: "paid",
        paymentIntentId 
      });
      
      const { data, error } = await supabaseClient
        .from("submissions")
        .update({
          status: "paid",
          stripe_payment_id: paymentIntentId,
          updated_at: new Date().toISOString(),
        })
        .eq("submission_id", submissionId)
        .select();

      if (error) {
        logStep("❌ CRITICAL ERROR: Failed to update submission in database", {
          submissionId,
          error: error.message,
          errorDetails: error,
          code: error.code,
          hint: error.hint
        });
        return new Response(
          JSON.stringify({ error: `Database update failed: ${error.message}` }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
          }
        );
      }

      logStep("✅ Submission updated successfully in database", {
        submissionId,
        paymentIntentId,
        updatedRecords: data?.length,
        updatedData: data
      });

      // Sync to Google Sheets
      try {
        if (data && data.length > 0) {
          const submission = data[0];
          
          logStep("📊 Starting Google Sheets sync", { submissionId });
          
          // Get Google Sheets credentials
          const credentialsJson = Deno.env.get("GOOGLE_SHEETS_CREDENTIALS");
          const sheetId = Deno.env.get("GOOGLE_SHEET_ID");
          
          logStep("Google Sheets configuration check", {
            hasCredentials: !!credentialsJson,
            hasSheetId: !!sheetId,
            credentialsLength: credentialsJson?.length,
            sheetId: sheetId
          });
          
          if (!credentialsJson || !sheetId) {
            logStep("⚠️ WARNING: Google Sheets credentials not configured, skipping sync");
          } else {
            logStep("Parsing Google Sheets credentials");
            const credentials = JSON.parse(credentialsJson);
            logStep("✅ Credentials parsed successfully", {
              clientEmail: credentials.client_email,
              projectId: credentials.project_id
            });
            
            // Get OAuth token from service account
            logStep("Creating JWT for Google authentication");
            const jwt = await createJWT(credentials);
            logStep("✅ JWT created, requesting OAuth access token");
            
            const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
                assertion: jwt,
              }),
            });
            
            logStep("OAuth token response", {
              status: tokenResponse.status,
              ok: tokenResponse.ok
            });
            
            if (!tokenResponse.ok) {
              const errorText = await tokenResponse.text();
              logStep("❌ ERROR: Failed to get OAuth access token", { 
                status: tokenResponse.status,
                error: errorText 
              });
              throw new Error(`Failed to get access token: ${errorText}`);
            }
            
            const { access_token } = await tokenResponse.json();
            logStep("✅ OAuth access token obtained successfully");
            
            // Prepare row data matching user's specified format
            const rowData = [
              submission.email || "", // Name (using email as we don't have a separate name field)
              submission.phone || "",
              submission.email || "",
              `${submission.address}, ${submission.city}, ${submission.zip}`,
              submission.submission_id || "",
              "$50.00", // Amount
              session.id || "", // Stripe session ID
              submission.status || "",
              new Date(submission.created_at).toLocaleString() || "",
            ];
            
            logStep("Row data prepared for Google Sheets", {
              rowData,
              rowLength: rowData.length
            });
            
            // Append to Google Sheet
            const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:I:append?valueInputOption=RAW`;
            logStep("Appending row to Google Sheets", { 
              url: sheetsUrl,
              submissionId 
            });
            
            const sheetsResponse = await fetch(sheetsUrl, {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                values: [rowData],
              }),
            });
            
            logStep("Google Sheets API response", {
              status: sheetsResponse.status,
              ok: sheetsResponse.ok
            });
            
            if (!sheetsResponse.ok) {
              const errorText = await sheetsResponse.text();
              logStep("❌ ERROR: Failed to append to Google Sheets", {
                status: sheetsResponse.status,
                error: errorText
              });
              throw new Error(`Failed to append to Google Sheets: ${errorText}`);
            }
            
            const sheetsResult = await sheetsResponse.json();
            logStep("✅ Successfully synced to Google Sheets", { 
              submissionId,
              updatedRange: sheetsResult.updates?.updatedRange,
              updatedRows: sheetsResult.updates?.updatedRows,
              updatedColumns: sheetsResult.updates?.updatedColumns
            });
          }
        }
      } catch (sheetsError) {
        // Log error but don't fail the webhook
        const errorMessage = sheetsError instanceof Error ? sheetsError.message : String(sheetsError);
        const errorStack = sheetsError instanceof Error ? sheetsError.stack : undefined;
        logStep("❌ ERROR: Failed to sync to Google Sheets (non-fatal)", { 
          error: errorMessage,
          stack: errorStack,
          submissionId
        });
      }

      logStep("✅ Webhook processing completed successfully", {
        eventType: event.type,
        submissionId,
        finalStatus: "paid"
      });
      
      return new Response(
        JSON.stringify({ 
          received: true, 
          submissionId,
          status: "paid",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Log other event types for debugging
    logStep("ℹ️ Received unhandled event type", { 
      eventType: event.type,
      eventId: event.id 
    });

    return new Response(
      JSON.stringify({ received: true, eventType: event.type }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    logStep("💥 FATAL ERROR: Unexpected error in webhook handler", { 
      error: errorMessage,
      stack: errorStack,
      errorType: error instanceof Error ? error.constructor.name : typeof error
    });
    
    return new Response(
      JSON.stringify({ error: `Webhook handler error: ${errorMessage}` }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
