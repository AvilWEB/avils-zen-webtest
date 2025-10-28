import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface EvaluationDetailsProps {
  onOpenModal: () => void;
}

const EvaluationDetails = ({ onOpenModal }: EvaluationDetailsProps) => {
  const includes = [
    "Photography review of your current space",
    "Rough scope highlighting key opportunities",
    "Prioritized list of improvements",
    "Short timeline estimate for your project",
    "Direct consultation with Avil",
  ];

  return (
    <section className="py-20 md:py-32 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-elegant">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              What's included in the $20-$50 evaluation
            </h2>
            <p className="text-xl text-muted-foreground font-light">
              A comprehensive assessment to kickstart your bathroom
              transformation
            </p>
          </div>

          <div className="space-y-4 mb-12">
            {includes.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <p className="text-lg text-foreground">{item}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={onOpenModal}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-elegant transition-all hover:shadow-xl hover:scale-105"
            >
              Request Avil's Estimate — $20-$50
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Secure payment • Avil responds within 48 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EvaluationDetails;
