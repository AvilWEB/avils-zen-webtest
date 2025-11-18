import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
interface HeroProps {
  onOpenModal: () => void;
}
const Hero = ({
  onOpenModal
}: HeroProps) => {
  const scrollToGallery = () => {
    const gallery = document.getElementById("gallery");
    gallery?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="h-full w-full object-cover">
          <source src="https://cdn.pixabay.com/video/2023/05/17/162826-826774896_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

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