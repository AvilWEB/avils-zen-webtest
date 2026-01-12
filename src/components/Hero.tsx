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
    setIsMuted(prev => {
      const next = !prev;
      if (videoRef.current) videoRef.current.muted = next;
      return next;
    });
  };
  const scrollToGallery = () => {
    const gallery = document.getElementById("gallery");
    gallery?.scrollIntoView({
      behavior: "smooth"
    });
  };
  const handleReady = () => {
    setIsLoading(false);
  };
  const handleVideoError = () => {
    console.error("Hero video failed to load: /baner-video-main.mp4");
    setIsLoading(false);
  };
  return <section className="relative h-screen w-full overflow-hidden bg-background">
      {/* Loading Indicator */}
      {isLoading && <div className="absolute inset-0 z-10 flex items-center justify-center bg-background">
          <Loader2 className="w-12 h-12 text-foreground/60 animate-spin" />
        </div>}

      {/* Video Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <video ref={videoRef} autoPlay muted={isMuted} loop playsInline preload="auto" onCanPlay={handleReady} onLoadedData={handleReady} onPlaying={handleReady} onError={handleVideoError} className="w-full h-full object-contain">
          <source src="/baner-video-main.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Sound Toggle Button */}
      <button onClick={toggleMute} className="absolute bottom-8 right-8 z-20 p-3 rounded-full bg-foreground/90 backdrop-blur-sm hover:bg-foreground transition-all shadow-elegant" aria-label={isMuted ? "Ieslēgt skaņu" : "Izslēgt skaņu"}>
        {isMuted ? <VolumeX className="w-6 h-6 text-background" /> : <Volume2 className="w-6 h-6 text-background" />}
      </button>

      {/* Headline - Positioned at Top */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 pt-6 md:pt-10 text-center">
        <div className="bg-background/60 backdrop-blur-sm rounded-lg px-6 py-5 md:px-8 md:py-6 max-w-3xl mx-auto">
          <h1 className="font-heading text-xl md:text-3xl lg:text-4xl text-foreground leading-tight">We design and build bathrooms for people who value lasting quality not quick fixes.</h1>
        </div>
      </div>

      {/* Subheadline - Positioned at Bottom */}
      <div className="absolute bottom-20 left-0 right-0 z-10 px-4 text-center">
        <div className="bg-background/60 backdrop-blur-sm rounded-lg px-6 py-4 md:px-8 md:py-5 max-w-xl mx-auto">
          <p className="font-body text-xs md:text-sm text-muted-foreground tracking-wide">
            Direct collaboration. Thoughtful design. Built to last.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ArrowDown className="w-6 h-6 text-background/80" />
      </div>
    </section>;
};
export default Hero;