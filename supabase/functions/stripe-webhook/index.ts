import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
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
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Webhook request received");

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    
    if (!webhookSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
    }

    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      logStep("ERROR: No stripe-signature header found");
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
    
    logStep("Body received, initializing Stripe");

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-08-27.basil",
    });

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        webhookSecret
      );
      logStep("Webhook signature verified", { eventType: event.type });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      logStep("ERROR: Webhook signature verification failed", { error: errorMessage });
      return new Response(
        JSON.stringify({ error: `Webhook signature verification failed: ${errorMessage}` }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Initialize Supabase client with service role key for database updates
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      logStep("Processing checkout.session.completed", {
        sessionId: session.id,
        paymentStatus: session.payment_status,
      });

      // Extract submission ID from metadata
      const submissionId = session.metadata?.submission_id;
      
      if (!submissionId) {
        logStep("ERROR: No submission_id in session metadata");
        return new Response(
          JSON.stringify({ error: "No submission_id in metadata" }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
          }
        );
      }

      logStep("Submission ID found", { submissionId });

      // Get payment intent ID
      const paymentIntentId = session.payment_intent as string;
      
      if (!paymentIntentId) {
        logStep("WARNING: No payment_intent in session");
      }

      // Update submission status in database
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
        logStep("ERROR: Failed to update submission", {
          submissionId,
          error: error.message,
        });
        return new Response(
          JSON.stringify({ error: `Database update failed: ${error.message}` }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
          }
        );
      }

      logStep("Submission updated successfully", {
        submissionId,
        paymentIntentId,
        updatedRecords: data?.length,
      });

      // Sync to Google Sheets
      try {
        if (data && data.length > 0) {
          const submission = data[0];
          
          logStep("Syncing to Google Sheets", { submissionId });
          
          // Get Google Sheets credentials
          const credentialsJson = Deno.env.get("GOOGLE_SHEETS_CREDENTIALS");
          const sheetId = Deno.env.get("GOOGLE_SHEET_ID");
          
          if (!credentialsJson || !sheetId) {
            logStep("WARNING: Google Sheets credentials not configured, skipping sync");
          } else {
            const credentials = JSON.parse(credentialsJson);
            
            // Get OAuth token from service account
            const jwt = await createJWT(credentials);
            const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
                assertion: jwt,
              }),
            });
            
            if (!tokenResponse.ok) {
              throw new Error(`Failed to get access token: ${await tokenResponse.text()}`);
            }
            
            const { access_token } = await tokenResponse.json();
            
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
            
            // Append to Google Sheet
            const sheetsResponse = await fetch(
              `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:I:append?valueInputOption=RAW`,
              {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${access_token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  values: [rowData],
                }),
              }
            );
            
            if (!sheetsResponse.ok) {
              throw new Error(`Failed to append to Google Sheets: ${await sheetsResponse.text()}`);
            }
            
            logStep("Successfully synced to Google Sheets", { submissionId });
          }
        }
      } catch (sheetsError) {
        // Log error but don't fail the webhook
        const errorMessage = sheetsError instanceof Error ? sheetsError.message : String(sheetsError);
        logStep("ERROR: Failed to sync to Google Sheets", { error: errorMessage });
      }

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
    logStep("Received unhandled event type", { eventType: event.type });

    return new Response(
      JSON.stringify({ received: true, eventType: event.type }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR: Unexpected error in webhook handler", { error: errorMessage });
    
    return new Response(
      JSON.stringify({ error: `Webhook handler error: ${errorMessage}` }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
