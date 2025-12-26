import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const BrandBookHero = () => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="relative h-screen w-screen overflow-hidden flex flex-col">
      {/* Top text - visible on mobile to fill empty space */}
      <div className="md:hidden absolute top-8 left-0 right-0 z-10 text-center px-6">
        <span className="text-primary/60 font-body text-xs tracking-[0.3em] uppercase">
          AVIL's Bathrooms
        </span>
        <h1 className="font-heading text-lg text-foreground/80 mt-2">
          Brand Guidelines
        </h1>
      </div>
      
      <video
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="absolute inset-0 w-full h-full object-contain bg-background mx-auto"
      >
        <source src="/baner-video-brandbook.mp4" type="video/mp4" />
      </video>
      
      {/* Bottom text - visible on mobile to fill empty space */}
      <div className="md:hidden absolute bottom-24 left-0 right-0 z-10 text-center px-6">
        <p className="text-muted-foreground/70 font-body text-xs leading-relaxed">
          Scroll down to explore our complete brand identity system
        </p>
      </div>
      
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-8 right-8 z-20 p-3 rounded-full bg-background/20 backdrop-blur-sm border border-background/20 text-background hover:bg-background/30 transition-all"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </section>
  );
};

export default BrandBookHero;
