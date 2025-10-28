import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

interface StickyCTAProps {
  onOpenModal: () => void;
}

const StickyCTA = ({ onOpenModal }: StickyCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling 60% of the page
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrolled / (fullHeight - windowHeight)) * 100;

      if (scrollPercentage > 60) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-in slide-in-from-bottom-4">
      <Button
        size="lg"
        onClick={onOpenModal}
        className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-6 rounded-xl shadow-elegant transition-all hover:shadow-xl hover:scale-105"
      >
        <span className="mr-2">Request Avil's Estimate — $50</span>
        <ArrowUp className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default StickyCTA;
