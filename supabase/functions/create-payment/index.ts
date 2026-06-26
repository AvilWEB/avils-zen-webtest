import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Validation schema
const paymentSchema = z.object({
  email: z.string().email('Invalid email address').max(255),
  submissionId: z.string().trim().min(1, 'Submission ID required').max(100)
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Creating payment session for evaluation");

    const requestBody = await req.json();
    
    // Validate input
    const validationResult = paymentSchema.safeParse(requestBody);
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

    const { email, submissionId } = validationResult.data;

    // Validate Origin against an allowlist to prevent open-redirect abuse.
    // The Origin header is attacker-controlled, so we never trust it directly.
    const DEFAULT_ORIGIN = "https://avilsbathrooms.com";
    const ALLOWED_EXACT = new Set<string>([
      "https://avilsbathrooms.com",
      "https://www.avilsbathrooms.com",
      "https://avils-zen-webtest.lovable.app",
    ]);
    const requestOrigin = req.headers.get("origin") || "";
    let safeOrigin = DEFAULT_ORIGIN;
    if (ALLOWED_EXACT.has(requestOrigin)) {
      safeOrigin = requestOrigin;
    } else {
      try {
        const u = new URL(requestOrigin);
        // Allow Lovable preview subdomains over https only
        if (u.protocol === "https:" && u.hostname.endsWith(".lovable.app")) {
          safeOrigin = `${u.protocol}//${u.host}`;
        }
      } catch {
        // requestOrigin not a valid URL — fall back to DEFAULT_ORIGIN
      }
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Check if customer exists
    const customers = await stripe.customers.list({ email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Create checkout session for $20 evaluation
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Avil's Bathroom Evaluation",
              description: "Professional bathroom renovation assessment",
            },
            unit_amount: 10000, // $100.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${safeOrigin}/payment-success?submission=${submissionId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${safeOrigin}/?payment=cancelled`,
      metadata: {
        submission_id: submissionId,
      },
    });

    console.log("Payment session created:", session.id);

    return new Response(
      JSON.stringify({ url: session.url, sessionId: session.id }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating payment session:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create payment session. Please try again." }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
