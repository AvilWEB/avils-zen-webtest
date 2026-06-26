import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Check, Mail, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const submissionId = searchParams.get("submission");
  const sessionId = searchParams.get("session_id");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const verify = async () => {
      if (!submissionId || !sessionId) {
        navigate("/", { replace: true });
        return;
      }
      const { data, error } = await supabase.functions.invoke("verify-payment", {
        body: { sessionId, submissionId },
      });
      if (cancelled) return;
      if (error || !data?.valid) {
        navigate("/", { replace: true });
        return;
      }
      setVerified(true);
    };
    verify();
    return () => {
      cancelled = true;
    };
  }, [submissionId, sessionId, navigate]);

  if (!verified) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <p className="text-muted-foreground">Verifying payment…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Helmet>
        <title>Payment Confirmed | Avil&#39;s Bathrooms</title>
        <meta name="description" content="Your bathroom evaluation payment has been received. Avil will personally review your submission and reach out within 48 business hours." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://avilsbathrooms.com/payment-success" />
        <meta property="og:title" content="Payment Confirmed | Avil's Bathrooms" />
        <meta property="og:description" content="Your bathroom evaluation payment has been received." />
        <meta property="og:url" content="https://avilsbathrooms.com/payment-success" />
      </Helmet>
      <div className="max-w-2xl w-full">
        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-elegant text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your bathroom evaluation request has been received and payment
            confirmed.
          </p>

          {/* Reference */}
          {submissionId && (
            <div className="bg-background rounded-xl p-4 mb-8">
              <p className="text-sm text-muted-foreground mb-1">
                Reference Number
              </p>
              <p className="text-lg font-mono font-semibold text-foreground break-all">
                {submissionId}
              </p>
            </div>
          )}

          {/* What's Next */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4 text-left">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Confirmation Email Sent
                </h3>
                <p className="text-muted-foreground">
                  Check your inbox for a confirmation email with your submission
                  details.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-left">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Avil Will Contact You
                </h3>
                <p className="text-muted-foreground">
                  Avil will personally review your photos and contact you within
                  48 business hours to discuss next steps.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-xl">
              <Link to="/">Return to Homepage</Link>
            </Button>
          </div>

          {/* Footer Note */}
          <p className="text-sm text-muted-foreground mt-8">
            If you have any questions, please email{" "}
            <a
              href="mailto:info@avilsbathrooms.com"
              className="text-primary hover:underline"
            >
              info@avilsbathrooms.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
