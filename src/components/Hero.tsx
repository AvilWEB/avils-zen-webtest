import { ArrowDown, Volume2, VolumeX, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

interface HeroProps {
  onOpenModal: () => void;
}

const Hero = ({
  onOpenModal
}: HeroProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleWaiting = () => {
    setIsLoading(true);
  };

  return <section className="relative h-screen w-full overflow-hidden bg-[#E5E2D5]">
      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#E5E2D5]">
          <Loader2 className="w-12 h-12 text-foreground/60 animate-spin" />
        </div>
      )}

      {/* Video Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          loop 
          playsInline 
          onCanPlay={handleCanPlay}
          onWaiting={handleWaiting}
          className="w-full h-full object-contain"
        >
          <source src="/baner-video-brandbook.mp4" type="video/mp4" />
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