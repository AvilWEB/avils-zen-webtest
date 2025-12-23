import { useState } from "react";
import { Check, X } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import beforeDave from "@/assets/before-AAA.jpg";
import afterDave from "@/assets/after-AAA.jpg";
import framingWide from "@/assets/framing-wide-full-room.jpg";
import framingMedium from "@/assets/framing-medium-key-features.jpg";
import framingDetail from "@/assets/framing-detail-craftsmanship.jpg";
import framingLifestyle from "@/assets/framing-lifestyle-in-use.jpg";

const framingPhotos = [
  { src: framingWide, label: "Wide", description: "Full Room" },
  { src: framingMedium, label: "Medium", description: "Key Features" },
  { src: framingDetail, label: "Detail", description: "Craftsmanship" },
  { src: framingLifestyle, label: "Lifestyle", description: "In Use" },
];

const PhotographyStyle = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; label: string; description: string } | null>(null);
  return (
    <div>
      <div className="mb-16">
        <span className="text-primary font-body text-sm tracking-widest uppercase">
          08 — Photography & Video
        </span>
        <h2 className="font-heading text-4xl md:text-5xl text-foreground mt-4 mb-6">
          Visual Standards
        </h2>
        <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-3xl">
          Our photography captures the essence of our work: authentic, warm, and professional. 
          Every image should tell a story of transformation and quality.
        </p>
      </div>

      {/* Before/After Interactive */}
      <div className="mb-16">
        <div className="bg-card rounded-2xl p-8 border border-border">
          <h3 className="font-heading text-xl text-foreground mb-6">Before / After Shots</h3>
          <div className="max-w-3xl mx-auto mb-6">
            <BeforeAfterSlider
              beforeImage={beforeDave}
              afterImage={afterDave}
              beforeAlt="Dave's Bathroom - Before"
              afterAlt="Dave's Bathroom - After"
              aspectRatio="4/3"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground font-body mb-6">
            Dave's Bathroom Transformation — Drag the slider to compare
          </p>
          <ul className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              "Same camera angle and position",
              "Consistent natural lighting",
              "Clean, uncluttered space",
              "Shot during similar time of day"
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                <Check className="w-4 h-4 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Lighting */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Lighting Preferences</h3>
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full mx-auto mb-4" />
              <h4 className="font-heading text-lg text-foreground mb-2">Natural Light</h4>
              <p className="text-sm text-muted-foreground font-body">Primary choice — warm, authentic feel</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mx-auto mb-4" />
              <h4 className="font-heading text-lg text-foreground mb-2">Soft Artificial</h4>
              <p className="text-sm text-muted-foreground font-body">When natural isn't available</p>
            </div>
            <div className="text-center opacity-50">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-300 rounded-full mx-auto mb-4" />
              <h4 className="font-heading text-lg text-foreground mb-2">Harsh Flash</h4>
              <p className="text-sm text-muted-foreground font-body">Avoid — creates cold, clinical look</p>
            </div>
          </div>
        </div>
      </div>

      {/* Framing & Angles */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Framing & Angles</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {framingPhotos.map((photo) => (
            <div 
              key={photo.label}
              className="bg-card rounded-xl p-4 border border-border text-center cursor-pointer group"
              onClick={() => setSelectedImage(photo)}
            >
              <div className="aspect-square rounded-lg mb-3 overflow-hidden">
                <img 
                  src={photo.src} 
                  alt={`${photo.label} shot - ${photo.description}`} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="text-xs text-primary font-body uppercase tracking-wider">{photo.label}</span>
              <p className="text-sm font-body text-foreground mt-1">{photo.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What to Avoid */}
      <div className="bg-destructive/5 rounded-2xl p-8 border border-destructive/10">
        <h3 className="font-heading text-xl text-foreground mb-4">What to Avoid</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Stock photography feeling",
            "Over-processed HDR effects",
            "Cluttered or messy spaces",
            "Poor lighting or harsh shadows",
            "Inconsistent color temperature",
            "Logos or branding in frame"
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm font-body text-muted-foreground">
              <span className="w-2 h-2 bg-destructive rounded-full" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
          
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-border hover:bg-card transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
          
          {/* Image Container */}
          <div 
            className="relative z-10 max-w-5xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.src} 
              alt={`${selectedImage.label} - ${selectedImage.description}`} 
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6 rounded-b-lg">
              <span className="text-xs text-primary font-body uppercase tracking-wider">{selectedImage.label}</span>
              <p className="text-lg font-heading text-foreground mt-1">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotographyStyle;
