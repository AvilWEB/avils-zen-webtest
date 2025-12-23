import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const BrandBookHero = () => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="relative h-screen w-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="absolute inset-0 w-full h-full object-contain bg-foreground"
      >
        <source src="/baner-video.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/60" />
      
      <div className="relative z-10 flex flex-col items-center justify-end h-full text-center px-6 pb-32">
        
        <h1 className="font-logo text-4xl md:text-6xl lg:text-7xl text-background tracking-wide mb-6">
          Brand Book
        </h1>
        
        <p className="font-body text-lg md:text-xl text-background/80 max-w-2xl leading-relaxed">
          A comprehensive guide to the AVIL's Bathrooms visual identity, 
          voice, and design principles. Built for consistency, crafted for excellence.
        </p>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-background/60 text-sm font-body tracking-widest uppercase">
            Scroll to explore
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-background/60 to-transparent animate-pulse" />
        </div>
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
