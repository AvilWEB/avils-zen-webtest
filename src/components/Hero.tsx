import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  onOpenModal: () => void;
}

const Hero = ({ onOpenModal }: HeroProps) => {
  const scrollToGallery = () => {
    const gallery = document.getElementById("gallery");
    gallery?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source
            src="https://cdn.pixabay.com/video/2023/05/17/162826-826774896_large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="max-w-4xl rounded-2xl bg-background/90 backdrop-blur-sm p-8 md:p-12 shadow-elegant">
          <h1 className="mb-6 text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Designed for calm.
          </h1>
          <p className="mb-8 text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
            Private, crafted bathroom renovations by Avil — Bridgeport's master
            craftsman.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={onOpenModal}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-elegant transition-all hover:shadow-xl hover:scale-105"
            >
              Request Avil's Estimate — $20
            </Button>
            <button
              onClick={scrollToGallery}
              className="text-foreground hover:text-primary transition-colors flex items-center gap-2 group"
            >
              <span className="font-medium">View portfolio / Before & After</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ArrowDown className="w-6 h-6 text-background/80" />
      </div>
    </section>
  );
};

export default Hero;
