import { Button } from "@/components/ui/button";
import { ArrowDown, Volume2, VolumeX } from "lucide-react";
import { useState, useRef } from "react";
interface HeroProps {
  onOpenModal: () => void;
}
const Hero = ({
  onOpenModal
}: HeroProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToGallery = () => {
    const gallery = document.getElementById("gallery");
    gallery?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="relative h-screen w-full overflow-hidden bg-[#E5E2D5]">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <video ref={videoRef} autoPlay muted loop playsInline className="w-full h-full object-contain">
          <source src="/baner-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Sound Toggle Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-8 z-20 p-3 rounded-full bg-foreground/90 backdrop-blur-sm hover:bg-foreground transition-all shadow-elegant"
        aria-label={isMuted ? "Ieslēgt skaņu" : "Izslēgt skaņu"}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-background" />
        ) : (
          <Volume2 className="w-6 h-6 text-background" />
        )}
      </button>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ArrowDown className="w-6 h-6 text-background/80" />
      </div>
    </section>;
};
export default Hero;