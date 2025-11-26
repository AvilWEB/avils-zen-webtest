import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
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

// Helper function to upload photo to Google Drive
async function uploadPhotoToDrive(
  accessToken: string,
  photoData: string,
  fileName: string,
  folderId: string
): Promise<string> {
  try {
    // Check if photoData is base64 or URL
    let imageBlob: Blob;
    
    if (photoData.startsWith('data:image')) {
      // Base64 image
      const base64Data = photoData.split(',')[1];
      const binaryString = atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      imageBlob = new Blob([bytes], { type: 'image/jpeg' });
    } else {
      // URL - fetch the image
      const imageResponse = await fetch(photoData);
      if (!imageResponse.ok) {
        throw new Error(`Failed to fetch image from URL: ${imageResponse.statusText}`);
      }
      imageBlob = await imageResponse.blob();
    }

    // Create metadata
    const metadata = {
      name: fileName,
      parents: [folderId],
      mimeType: 'image/jpeg',
    };

    // Upload to Google Drive
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', imageBlob);

    const uploadResponse = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: form,
      }
    );

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`Drive upload failed: ${errorText}`);
    }

    const uploadResult = await uploadResponse.json();
    
    // Make the file publicly accessible
    await fetch(`https://www.googleapis.com/drive/v3/files/${uploadResult.id}/permissions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: 'reader',
        type: 'anyone',
      }),
    });

    return `https://drive.google.com/file/d/${uploadResult.id}/view`;
  } catch (error) {
    logStep("ERROR uploading photo to Drive", { error: error instanceof Error ? error.message : String(error) });
    throw error;
  }
}

// Helper function to log errors to Google Sheets Logs tab
async function logErrorToSheet(
  accessToken: string,
  sheetId: string,
  stripeSessionId: string,
  errorMessage: string,
  attempts: number
) {
  try {
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    const logData = [timestamp, stripeSessionId, errorMessage, attempts];

    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Logs!A:D:append?valueInputOption=RAW`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [logData],
        }),
      }
    );
  } catch (err) {
    logStep("Failed to log error to Logs sheet", { error: err instanceof Error ? err.message : String(err) });
  }
}

// Helper function to check for existing row by Stripe session ID
async function findExistingRow(
  accessToken: string,
  sheetId: string,
  stripeSessionId: string
): Promise<number | null> {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!G:G`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    const values = data.values || [];

    // Find the row index (1-based, skipping header)
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === stripeSessionId) {
        return i + 1; // Return 1-based row number
      }
    }

    return null;
  } catch (error) {
    logStep("Error checking for existing row", { error: error instanceof Error ? error.message : String(error) });
    return null;
  }
}

// Helper function to send notification webhook
async function sendNotification(webhookUrl: string, data: any) {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    logStep("Notification sent", { 
      url: webhookUrl, 
      status: response.status 
    });
  } catch (error) {
    logStep("Failed to send notification", { 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
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
          const driveFolderId = Deno.env.get("GOOGLE_DRIVE_FOLDER_ID");
          const notifyWebhook = Deno.env.get("NOTIFY_WEBHOOK_URL");
          
          logStep("Google Sheets configuration check", {
            hasCredentials: !!credentialsJson,
            hasSheetId: !!sheetId,
            hasDriveFolderId: !!driveFolderId,
            hasNotifyWebhook: !!notifyWebhook,
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
            
            // Get OAuth token from service account with Drive scope
            const jwtPayload = {
              iss: credentials.client_email,
              scope: "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file",
              aud: "https://oauth2.googleapis.com/token",
              exp: Math.floor(Date.now() / 1000) + 3600,
              iat: Math.floor(Date.now() / 1000),
            };

            const encodedHeader = base64UrlEncode(JSON.stringify({ alg: "RS256", typ: "JWT" }));
            const encodedPayload = base64UrlEncode(JSON.stringify(jwtPayload));
            const unsignedToken = `${encodedHeader}.${encodedPayload}`;

            const privateKey = credentials.private_key;
            const key = await crypto.subtle.importKey(
              "pkcs8",
              pemToArrayBuffer(privateKey),
              { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
              false,
              ["sign"]
            );

            const signature = await crypto.subtle.sign(
              "RSASSA-PKCS1-v1_5",
              key,
              new TextEncoder().encode(unsignedToken)
            );

            const jwt = `${unsignedToken}.${base64UrlEncode(signature)}`;
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

            // Check for existing row (idempotency)
            logStep("🔍 Checking for existing row with Stripe session ID", { sessionId: session.id });
            const existingRow = await findExistingRow(access_token, sheetId, session.id);
            
            if (existingRow) {
              logStep("✅ Row already exists, updating instead of creating duplicate", { 
                rowNumber: existingRow,
                sessionId: session.id 
              });
            }

            // Handle photo uploads to Google Drive
            let photoLinks = "";
            if (submission.photos_folder_url && driveFolderId) {
              logStep("📸 Processing photo uploads to Google Drive");
              try {
                // photos_folder_url contains comma-separated Supabase storage URLs
                const photos = submission.photos_folder_url.split(',').map((p: string) => p.trim());
                const uploadedLinks: string[] = [];

                for (let i = 0; i < photos.length; i++) {
                  const photoUrl = photos[i];
                  logStep(`Fetching photo ${i + 1}/${photos.length} from Supabase storage`, { url: photoUrl });
                  
                  // Fetch photo from Supabase storage using signed URL
                  const fileName = photoUrl.split('/').pop() || `${i}.jpg`;
                  const bucketPath = photoUrl.split('/bathroom-photos/')[1];
                  
                  logStep(`Getting signed URL for bucket path`, { bucketPath });
                  
                  // Get signed URL for the photo
                  const { data: signedUrlData, error: signedUrlError } = await supabaseClient.storage
                    .from('bathroom-photos')
                    .createSignedUrl(bucketPath, 3600); // Valid for 1 hour

                  if (signedUrlError || !signedUrlData?.signedUrl) {
                    throw new Error(`Failed to get signed URL: ${signedUrlError?.message}`);
                  }

                  logStep(`Got signed URL, uploading to Drive`, { signedUrl: signedUrlData.signedUrl.substring(0, 50) + '...' });

                  const driveFileName = `est_${session.id}_${i + 1}.jpg`;
                  const driveLink = await uploadPhotoToDrive(
                    access_token,
                    signedUrlData.signedUrl,
                    driveFileName,
                    driveFolderId
                  );
                  uploadedLinks.push(driveLink);
                  logStep(`✅ Photo ${i + 1} uploaded to Drive`, { driveLink });
                }

                photoLinks = uploadedLinks.join(', ');
                logStep("✅ All photos uploaded to Drive", { 
                  count: uploadedLinks.length,
                  links: photoLinks 
                });
              } catch (photoError) {
                const photoErrorMsg = photoError instanceof Error ? photoError.message : String(photoError);
                const photoErrorStack = photoError instanceof Error ? photoError.stack : undefined;
                logStep("⚠️ Photo upload failed", { error: photoErrorMsg, stack: photoErrorStack });
                photoLinks = `ERROR: ${photoErrorMsg}`;
              }
            }
            
            // Prepare row data with proper timezone
            const createdAt = new Date(submission.created_at).toLocaleString('en-US', { 
              timeZone: 'America/New_York',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            });

            // Extract name from email (before @)
            const nameFromEmail = submission.email ? submission.email.split('@')[0].replace(/[._]/g, ' ').split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') : '';
            
            const rowData = [
              nameFromEmail || submission.email || "", // A: Name (extracted from email)
              submission.phone || "", // B: Phone
              submission.email || "", // C: Customer_email
              `${submission.address}, ${submission.city}, ${submission.zip}`, // D: Address
              submission.submission_id || "", // E: Id
              "$50.00", // F: Amount
              session.id || "", // G: Stripe_session_id
              submission.status || "paid", // H: Status
              createdAt, // I: Created_at
              photoLinks, // J: Photos (Drive links)
              submission.height ? `${submission.height} ${submission.height_unit || ''}` : "", // K: Client_height
              submission.description || "", // L: Notes
            ];
            
            logStep("Row data prepared for Google Sheets", {
              rowData,
              rowLength: rowData.length,
              isUpdate: !!existingRow
            });
            
            let sheetsResponse;
            if (existingRow) {
              // Update existing row
              const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A${existingRow}:L${existingRow}?valueInputOption=RAW`;
              logStep("Updating existing row in Google Sheets", { 
                url: updateUrl,
                rowNumber: existingRow 
              });
              
              sheetsResponse = await fetch(updateUrl, {
                method: "PUT",
                headers: {
                  "Authorization": `Bearer ${access_token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  values: [rowData],
                }),
              });
            } else {
              // Append new row
              const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:L:append?valueInputOption=RAW`;
              logStep("Appending new row to Google Sheets", { 
                url: appendUrl,
                submissionId 
              });
              
              sheetsResponse = await fetch(appendUrl, {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${access_token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  values: [rowData],
                }),
              });
            }
            
            logStep("Google Sheets API response", {
              status: sheetsResponse.status,
              ok: sheetsResponse.ok
            });
            
            if (!sheetsResponse.ok) {
              const errorText = await sheetsResponse.text();
              logStep("❌ ERROR: Failed to sync to Google Sheets", {
                status: sheetsResponse.status,
                error: errorText
              });
              
              // Log to Logs sheet
              await logErrorToSheet(access_token, sheetId, session.id, errorText, 1);
              
              throw new Error(`Failed to sync to Google Sheets: ${errorText}`);
            }
            
            const sheetsResult = await sheetsResponse.json();
            logStep("✅ Successfully synced to Google Sheets", { 
              submissionId,
              updatedRange: sheetsResult.updatedRange || sheetsResult.updates?.updatedRange,
              updatedRows: sheetsResult.updatedRows || sheetsResult.updates?.updatedRows,
              updatedColumns: sheetsResult.updatedColumns || sheetsResult.updates?.updatedColumns,
              action: existingRow ? "updated" : "appended"
            });

            // Send notification webhook if configured
            if (notifyWebhook) {
              logStep("📤 Sending notification webhook");
              await sendNotification(notifyWebhook, {
                event: "checkout.session.completed",
                submission_id: submissionId,
                stripe_session_id: session.id,
                customer_email: session.customer_email,
                amount: "$50.00",
                status: "paid",
                created_at: createdAt,
                action: existingRow ? "updated" : "created"
              });
            }
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

        // Try to log to Logs sheet
        try {
          const credentialsJson = Deno.env.get("GOOGLE_SHEETS_CREDENTIALS");
          const sheetId = Deno.env.get("GOOGLE_SHEET_ID");
          if (credentialsJson && sheetId) {
            const credentials = JSON.parse(credentialsJson);
            const jwt = await createJWT(credentials);
            const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
                assertion: jwt,
              }),
            });
            if (tokenResponse.ok) {
              const { access_token } = await tokenResponse.json();
              await logErrorToSheet(access_token, sheetId, session.id, errorMessage, 1);
            }
          }
        } catch (logError) {
          logStep("Failed to log error to Logs sheet", { 
            error: logError instanceof Error ? logError.message : String(logError) 
          });
        }
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
