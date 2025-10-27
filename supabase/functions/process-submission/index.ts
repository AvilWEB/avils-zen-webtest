import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing submission");

    const {
      email,
      phone,
      address,
      city,
      zip,
      description,
      height,
      heightUnit,
      photos,
    } = await req.json();

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Generate unique submission ID
    const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const randomId = Math.random().toString(36).substring(7).toUpperCase();
    const submissionId = `${timestamp}_${email.split("@")[0]}_${randomId}`;

    // Upload photos to storage
    const photoUrls: string[] = [];
    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      const fileName = `${submissionId}/${Date.now()}_${i}.${photo.type.split("/")[1]}`;
      
      // Convert base64 to blob
      const base64Data = photo.data.split(",")[1];
      const binaryData = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
      
      const { error: uploadError } = await supabaseClient.storage
        .from("bathroom-photos")
        .upload(fileName, binaryData, {
          contentType: photo.type,
        });

      if (uploadError) {
        console.error("Error uploading photo:", uploadError);
        throw new Error(`Failed to upload photo: ${uploadError.message}`);
      }

      const { data: urlData } = supabaseClient.storage
        .from("bathroom-photos")
        .getPublicUrl(fileName);

      photoUrls.push(urlData.publicUrl);
    }

    // Save submission to database
    const { data: submission, error: dbError } = await supabaseClient
      .from("submissions")
      .insert([
        {
          submission_id: submissionId,
          email,
          phone,
          address,
          city,
          zip,
          description,
          height,
          height_unit: heightUnit,
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

    // TODO: Add integrations (Google Drive, Gmail, Telegram, SMS)
    // For now, just return success with submission ID

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
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
