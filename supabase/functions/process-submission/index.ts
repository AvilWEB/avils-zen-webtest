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
      JSON.stringify({ error: "Failed to process submission. Please try again." }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
