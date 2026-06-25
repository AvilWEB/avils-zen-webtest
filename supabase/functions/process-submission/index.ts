import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Validation schema
const submissionSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').max(255),
  phone: z.string().max(20).optional(),
  address: z.string().trim().min(5, 'Address must be at least 5 characters').max(200),
  city: z.string().trim().min(2, 'City must be at least 2 characters').max(100),
  zip: z.string().trim().min(3, 'ZIP code required').max(10),
  description: z.string().trim().min(10, 'Description must be at least 10 characters').max(500),
  priorities: z.string().max(500).optional(),
  photos: z.array(z.object({
    type: z.string().regex(/^image\/(jpeg|jpg|png|webp)$/, 'Invalid image type'),
    data: z.string()
  })).min(1, 'At least one photo required').max(10, 'Maximum 10 photos allowed')
});

// Sanitize text to prevent XSS
const sanitizeText = (text: string): string => {
  return text.replace(/<[^>]*>/g, '').trim();
};

const buildEmailHtml = (firstName: string) => `<!doctype html><html><body style="margin:0;padding:0;background-color:#E5E2D5;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#E5E2D5;"><tr><td align="center" style="padding:32px 16px;"><table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;"><tr><td align="center" style="padding:24px 44px 0;"><div style="font-family:Georgia,'Times New Roman',serif;font-size:27px;letter-spacing:7px;color:#131211;">AVIL'S</div><div style="font-family:Georgia,serif;font-size:15px;letter-spacing:5px;color:#4a4942;padding-top:2px;">bathrooms</div><table role="presentation" cellpadding="0" cellspacing="0" style="margin:16px auto 0;"><tr><td style="width:40px;height:2px;background-color:#FFD700;font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr><tr><td align="center" style="padding:34px 44px 0;"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td align="center" valign="middle" style="width:52px;height:52px;background-color:#8BAB1C;border-radius:26px;color:#ffffff;font-family:Arial,sans-serif;font-size:26px;line-height:52px;">&#10003;</td></tr></table><div style="font-family:Georgia,serif;font-size:23px;color:#131211;padding-top:18px;">Payment received</div></td></tr><tr><td align="center" style="padding:20px 44px 0;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.75;color:#2b2a26;">Thank you, ${firstName}. We&rsquo;ve received your evaluation fee, and your project is now in our hands.</td></tr><tr><td style="padding:24px 44px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fbfaf6;border:1px solid #d4d1c4;border-radius:8px;"><tr><td style="padding:16px 18px;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#2b2a26;">One of our designers will personally reach out <strong style="color:#131211;">within 48 hours</strong> to arrange your consultation.</td></tr></table></td></tr><tr><td style="padding:32px 44px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="height:1px;background-color:#FFD700;font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr><tr><td align="center" style="padding:24px 44px 32px;"><div style="font-family:Georgia,serif;font-style:italic;font-size:14px;color:#6b6a60;">Timeless, tactile, and deeply human.</div><div style="font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#85939E;padding-top:14px;line-height:1.7;">avilsbathrooms.com &middot; Bridgeport, CT<br>This confirms payment of your evaluation fee.</div></td></tr></table></td></tr></table></body></html>`;

const sendConfirmationEmail = async (toEmail: string, fullName: string): Promise<any> => {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_API_KEY) return { skipped: "no RESEND_API_KEY" };
  const firstName = (fullName || "there").trim().split(" ")[0] || "there";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "AVIL's Bathrooms <info@avilsbathrooms.com>",
      to: [toEmail],
      reply_to: "info@avilsbathrooms.com",
      subject: "Payment received — we'll be in touch shortly",
      html: buildEmailHtml(firstName),
    }),
  });
  return { status: res.status, body: await res.text() };
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing submission");

    const requestBody = await req.json();
    
    // Validate input
    const validationResult = submissionSchema.safeParse(requestBody);
    if (!validationResult.success) {
      console.error("Validation failed:", validationResult.error.errors);
      return new Response(
        JSON.stringify({ 
          error: "Invalid input data",
          details: validationResult.error.errors.map(e => e.message)
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    const {
      name,
      email,
      phone,
      address,
      city,
      zip,
      description,
      priorities,
      photos,
    } = validationResult.data;

    // Sanitize text inputs
    const sanitizedName = sanitizeText(name);
    const sanitizedDescription = sanitizeText(description);
    const sanitizedAddress = sanitizeText(address);
    const sanitizedCity = sanitizeText(city);

    // Create Supabase client (service role)
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Basic abuse protection: max 3 submissions per email per hour
    const oneHourAgo = new Date(Date.now() - 3600_000).toISOString();
    const { data: recent, error: recentErr } = await supabaseClient
      .from("submissions")
      .select("id")
      .eq("email", email)
      .gte("created_at", oneHourAgo);
    if (!recentErr && recent && recent.length >= 3) {
      return new Response(
        JSON.stringify({ error: "Too many submissions. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate unique submission ID
    const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const randomId = Math.random().toString(36).substring(7).toUpperCase();
    const submissionId = `${timestamp}_${email.split("@")[0]}_${randomId}`;

    // Upload photos to storage and generate long-lived signed URLs (bucket is private)
    const photoUrls: string[] = [];
    const SIGNED_URL_TTL = 60 * 60 * 24 * 365; // 1 year
    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      const fileName = `${submissionId}/${Date.now()}_${i}.${photo.type.split("/")[1]}`;

      const base64Data = photo.data.split(",")[1];
      const binaryData = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

      const { error: uploadError } = await supabaseClient.storage
        .from("bathroom-photos")
        .upload(fileName, binaryData, { contentType: photo.type });

      if (uploadError) {
        console.error("Error uploading photo:", uploadError);
        throw new Error(`Failed to upload photo: ${uploadError.message}`);
      }

      const { data: signedData, error: signedErr } = await supabaseClient.storage
        .from("bathroom-photos")
        .createSignedUrl(fileName, SIGNED_URL_TTL);

      if (signedErr || !signedData?.signedUrl) {
        console.error("Error signing photo URL:", signedErr);
        throw new Error(`Failed to sign photo URL: ${signedErr?.message}`);
      }

      photoUrls.push(signedData.signedUrl);
    }

    // Save submission to database
    const { data: submission, error: dbError } = await supabaseClient
      .from("submissions")
      .insert([
        {
          submission_id: submissionId,
          name: sanitizedName,
          email,
          phone,
          address: sanitizedAddress,
          city: sanitizedCity,
          zip,
          description: sanitizedDescription,
          priorities: priorities ? sanitizeText(priorities) : null,
          photos_folder_url: photoUrls.join(","),
          status: "pending_payment",
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error("Error saving submission:", dbError);
      throw new Error(`Failed to save submission: ${dbError.message}`);
    }

    console.log("Submission saved successfully:", submissionId);

    // Send Telegram notification for new (unpaid) lead — non-fatal
    {
      let telegramStatus: number | null = null;
      let telegramResponse: string = "";
      const tgToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
      const tgChat = Deno.env.get("TELEGRAM_CHAT_ID");
      const hasToken = !!tgToken;
      const hasChat = !!tgChat;
      try {
        if (tgToken && tgChat) {
          const esc = (s: string) =>
            (s ?? "").toString()
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");
          const captionLines = [
            "🆕 <b>New AVIL lead (unpaid)</b>",
            `<b>Name:</b> ${esc(sanitizedName)}`,
            `<b>Email:</b> ${esc(email)}`,
            `<b>Phone:</b> ${esc(phone || "")}`,
            `<b>Address:</b> ${esc(`${sanitizedAddress}, ${sanitizedCity}, ${zip}`)}`,
            `<b>What would you like to do:</b> ${esc(sanitizedDescription)}`,
            `<b>What matters most:</b> ${esc(priorities ? sanitizeText(priorities) : "(not provided)")}`,
            `<b>ID:</b> ${esc(submissionId)}`,
          ];
          const textMessage = captionLines.join("\n");

          // 1) Send the lead text
          const msgRes = await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: tgChat,
              text: textMessage,
              parse_mode: "HTML",
              disable_web_page_preview: true,
            }),
          });
          telegramStatus = msgRes.status;
          telegramResponse = await msgRes.text();
          if (!msgRes.ok) {
            console.error("Telegram sendMessage failed:", telegramStatus, telegramResponse);
          }

          // 2) Send photos as actual inline images (album)
          if (photoUrls.length > 0) {
            // Chunk into groups of 10 (Telegram media group limit)
            const chunks: string[][] = [];
            for (let i = 0; i < photoUrls.length; i += 10) {
              chunks.push(photoUrls.slice(i, i + 10));
            }
            for (let c = 0; c < chunks.length; c++) {
              const chunk = chunks[c];
              let photoStatus: number | null = null;
              let photoResponse: string = "";
              try {
                if (chunk.length === 1) {
                  const r = await fetch(`https://api.telegram.org/bot${tgToken}/sendPhoto`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      chat_id: tgChat,
                      photo: chunk[0],
                      caption: `Lead ${submissionId}`,
                    }),
                  });
                  photoStatus = r.status;
                  photoResponse = await r.text();
                } else {
                  const media = chunk.map((url, idx) => ({
                    type: "photo",
                    media: url,
                    ...(idx === 0 && c === 0 ? { caption: `Lead ${submissionId}` } : {}),
                  }));
                  const r = await fetch(`https://api.telegram.org/bot${tgToken}/sendMediaGroup`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ chat_id: tgChat, media }),
                  });
                  photoStatus = r.status;
                  photoResponse = await r.text();
                }
                if (photoStatus && photoStatus >= 400) {
                  console.error("Telegram media send failed:", photoStatus, photoResponse);
                }
              } catch (mediaErr) {
                photoResponse = mediaErr instanceof Error ? mediaErr.message : String(mediaErr);
                console.error("Telegram media send error:", mediaErr);
              }
              try {
                await supabaseClient.from("debug_telegram_log").insert([{
                  submission_id: `${submissionId}_PHOTOS_${c + 1}`,
                  has_token: hasToken,
                  has_chat: hasChat,
                  telegram_status: photoStatus,
                  telegram_response: photoResponse,
                }]);
              } catch (_e) { /* ignore */ }
            }
          }
        } else {
          telegramResponse = "env vars missing";
          console.log("Telegram env vars not set, skipping notification");
        }
      } catch (tgErr) {
        telegramResponse = tgErr instanceof Error ? tgErr.message : String(tgErr);
        console.error("Telegram notification error (non-fatal):", tgErr);
      }
      try {
        await supabaseClient.from("debug_telegram_log").insert([{
          submission_id: submissionId,
          has_token: hasToken,
          has_chat: hasChat,
          telegram_status: telegramStatus,
          telegram_response: telegramResponse,
        }]);
      } catch (logErr) {
        console.error("debug_telegram_log insert failed (non-fatal):", logErr);
      }
    }

    // Google Sheets sync — write EVERY submission immediately (idempotent)
    {
      let sheetStatus: number | null = null;
      let sheetResponse: string = "";
      let credsOk = false;
      try {
        const credentialsJson = Deno.env.get("GOOGLE_SHEETS_CREDENTIALS");
        const sheetId = Deno.env.get("GOOGLE_SHEET_ID");
        if (!credentialsJson || !sheetId) {
          sheetResponse = "creds missing";
          console.log("Sheets env vars not set, skipping sync");
        } else {
          let credentials: any;
          try {
            credentials = JSON.parse(credentialsJson);
            credsOk = true;
          } catch (_e) {
            sheetResponse = "invalid credentials JSON";
            throw new Error("invalid credentials JSON");
          }

          const b64url = (data: string | ArrayBuffer): string => {
            const bytes = typeof data === "string"
              ? new TextEncoder().encode(data)
              : new Uint8Array(data);
            let bin = "";
            for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
            return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
          };
          const pemToBuf = (pem: string): ArrayBuffer => {
            const c = pem.replace(/-----BEGIN PRIVATE KEY-----/, "")
              .replace(/-----END PRIVATE KEY-----/, "").replace(/\s/g, "");
            const bin = atob(c);
            const arr = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
            return arr.buffer;
          };

          const now = Math.floor(Date.now() / 1000);
          const jwtPayload = {
            iss: credentials.client_email,
            scope: "https://www.googleapis.com/auth/spreadsheets",
            aud: "https://oauth2.googleapis.com/token",
            exp: now + 3600,
            iat: now,
          };
          const unsigned = `${b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${b64url(JSON.stringify(jwtPayload))}`;
          const key = await crypto.subtle.importKey(
            "pkcs8",
            pemToBuf(credentials.private_key),
            { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
            false,
            ["sign"],
          );
          const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(unsigned));
          const jwt = `${unsigned}.${b64url(sig)}`;

          const tokRes = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
              assertion: jwt,
            }),
          });
          if (!tokRes.ok) {
            sheetStatus = tokRes.status;
            sheetResponse = `token error: ${await tokRes.text()}`;
            console.error("Sheets token error:", sheetResponse);
          } else {
            const { access_token } = await tokRes.json();

            // Auto-detect first tab name
            let tab = "Sheet1";
            try {
              const metaRes = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=sheets.properties.title`,
                { headers: { "Authorization": `Bearer ${access_token}` } },
              );
              if (metaRes.ok) {
                const metaJson = await metaRes.json();
                tab = metaJson.sheets?.[0]?.properties?.title || "Sheet1";
              } else {
                console.error("Sheets meta lookup failed:", metaRes.status, await metaRes.text());
              }
            } catch (metaErr) {
              console.error("Sheets meta lookup error:", metaErr);
            }

            const createdAt = new Date().toLocaleString("en-US", {
              timeZone: "America/New_York",
              year: "numeric", month: "2-digit", day: "2-digit",
              hour: "2-digit", minute: "2-digit", second: "2-digit",
            });
            const rowData = [
              sanitizedName,                                           // A: Name
              phone || "",                                             // B: Phone
              email,                                                   // C: Customer_email
              `${sanitizedAddress}, ${sanitizedCity}, ${zip}`,         // D: Address
              submissionId,                                            // E: Id
              "",                                                      // F: Amount (blank until paid)
              "",                                                      // G: Stripe_session_id (blank until paid)
              "pending_payment",                                       // H: Status
              createdAt,                                               // I: Created_at
              photoUrls.join(", "),                                    // J: Photos
              priorities ? sanitizeText(priorities) : "",              // K: What matters most
              sanitizedDescription,                                    // L: What would you like to do
            ];

            // Ensure header row (idempotent)
            try {
              const headerRange = encodeURIComponent(`'${tab}'!A1:L1`);
              const headerGetRes = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${headerRange}`,
                { headers: { "Authorization": `Bearer ${access_token}` } },
              );
              let needsHeader = true;
              if (headerGetRes.ok) {
                const headerJson = await headerGetRes.json();
                const row0: string[] = headerJson.values?.[0] || [];
                if (row0.length >= 12 && (row0[11] || "").trim() !== "") {
                  needsHeader = false;
                }
              }
              if (needsHeader) {
                const headers = ["Name","Phone","Customer_email","Address","Id","Amount","Stripe_session_id","Status","Created_at","Photos","What matters most","What would you like to do"];
                const headerPutRes = await fetch(
                  `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${headerRange}?valueInputOption=RAW`,
                  {
                    method: "PUT",
                    headers: {
                      "Authorization": `Bearer ${access_token}`,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ values: [headers] }),
                  },
                );
                if (!headerPutRes.ok) {
                  console.error("Sheets header write failed:", headerPutRes.status, await headerPutRes.text());
                }
              }
            } catch (hErr) {
              console.error("Sheets header ensure error:", hErr);
            }

            // Idempotency: look up submissionId in column E
            const lookupRange = encodeURIComponent(`'${tab}'!E:E`);
            const lookupUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${lookupRange}`;
            const lookupRes = await fetch(lookupUrl, {
              headers: { "Authorization": `Bearer ${access_token}` },
            });
            let existingRow: number | null = null;
            if (lookupRes.ok) {
              const lookupData = await lookupRes.json();
              const values: string[][] = lookupData.values || [];
              for (let i = 0; i < values.length; i++) {
                if ((values[i]?.[0] || "") === submissionId) {
                  existingRow = i + 1; // 1-indexed
                  break;
                }
              }
            } else {
              console.error("Sheets lookup failed:", lookupRes.status, await lookupRes.text());
            }

            if (existingRow !== null) {
              const updateRange = encodeURIComponent(`'${tab}'!A${existingRow}:L${existingRow}`);
              const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${updateRange}?valueInputOption=RAW`;
              const updateRes = await fetch(updateUrl, {
                method: "PUT",
                headers: {
                  "Authorization": `Bearer ${access_token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ values: [rowData] }),
              });
              sheetStatus = updateRes.status;
              if (!updateRes.ok) {
                sheetResponse = `update failed: ${await updateRes.text()}`;
                console.error("Sheets update failed:", sheetStatus, sheetResponse);
              } else {
                sheetResponse = "SHEET ok (updated)";
                console.log("Sheets row updated for", submissionId);
              }
            } else {
              const appendRange = encodeURIComponent(`'${tab}'!A:L`);
              const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${appendRange}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
              const appendRes = await fetch(appendUrl, {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${access_token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ values: [rowData] }),
              });
              sheetStatus = appendRes.status;
              if (!appendRes.ok) {
                sheetResponse = `append failed: ${await appendRes.text()}`;
                console.error("Sheets append failed:", sheetStatus, sheetResponse);
              } else {
                sheetResponse = "SHEET ok";
                console.log("Sheets append OK for", submissionId);
              }
            }
          }

        }
      } catch (sheetsErr) {
        if (!sheetResponse) {
          sheetResponse = sheetsErr instanceof Error ? sheetsErr.message : String(sheetsErr);
        }
        console.error("Sheets sync error (non-fatal):", sheetsErr);
      }
      try {
        await supabaseClient.from("debug_telegram_log").insert([{
          submission_id: submissionId,
          has_token: credsOk,
          has_chat: false,
          telegram_status: sheetStatus,
          telegram_response: sheetResponse.slice(0, 1000),
        }]);
      } catch (_e) { /* ignore */ }
    }




    return new Response(
      JSON.stringify({
        success: true,
        submissionId,
        message: "Submission saved successfully",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing submission:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process submission. Please try again." }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
