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
        className="absolute inset-0 w-full h-full object-contain bg-primary"
      >
        <source src="/baner-video.mp4" type="video/mp4" />
      </video>
      
      
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
