import { useState } from "react";
import { Play } from "lucide-react";
import beforeDave from "@/assets/before-AAA.jpg";
import afterDave from "@/assets/after-AAA.jpg";
import testimonialDaveCover from "@/assets/testimonial-dave-cover.jpg";

const LayoutComposition = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div>
      <div className="mb-16">
        <span className="text-primary font-body text-sm tracking-widest uppercase">
          07 — Layout & Composition
        </span>
        <h2 className="font-heading text-4xl md:text-5xl text-foreground mt-4 mb-6">
          Spatial Rhythm
        </h2>
        <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-3xl">
          Consistent spacing and layout principles create visual harmony and guide 
          the user's eye through content naturally.
        </p>
      </div>

      {/* Grid System */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Grid System</h3>
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="grid grid-cols-12 gap-2 mb-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={i} 
                className="h-16 bg-primary/20 rounded flex items-center justify-center text-xs text-primary font-mono"
              >
                {i + 1}
              </div>
            ))}
          </div>
          <p className="text-muted-foreground font-body text-sm">
            12-column grid with responsive breakpoints. Max container width: <span className="text-primary font-mono">1280px</span>
          </p>
        </div>
      </div>

      {/* Section Spacing */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Section Spacing</h3>
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="divide-y divide-border">
            <div className="p-6 flex items-center justify-between">
              <span className="font-body text-foreground">Section Padding (Desktop)</span>
              <span className="font-mono text-primary">py-20 md:py-32 (80px / 128px)</span>
            </div>
            <div className="p-6 flex items-center justify-between">
              <span className="font-body text-foreground">Content Gap</span>
              <span className="font-mono text-primary">gap-6 md:gap-8 (24px / 32px)</span>
            </div>
            <div className="p-6 flex items-center justify-between">
              <span className="font-body text-foreground">Card Padding</span>
              <span className="font-mono text-primary">p-6 md:p-8 (24px / 32px)</span>
            </div>
            <div className="p-6 flex items-center justify-between">
              <span className="font-body text-foreground">Component Gap</span>
              <span className="font-mono text-primary">gap-4 (16px)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Before/After Layout */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Before/After Framing</h3>
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <img 
                src={beforeDave} 
                alt="Dave's Bathroom - Before" 
                className="w-full aspect-[4/3] object-cover rounded-xl"
              />
              <span className="absolute top-4 left-4 bg-foreground/80 text-background px-3 py-1 rounded-full text-sm font-body">
                BEFORE
              </span>
            </div>
            <div className="relative">
              <img 
                src={afterDave} 
                alt="Dave's Bathroom - After" 
                className="w-full aspect-[4/3] object-cover rounded-xl"
              />
              <span className="absolute top-4 left-4 bg-primary text-foreground px-3 py-1 rounded-full text-sm font-body">
                AFTER
              </span>
            </div>
          </div>
          <p className="text-muted-foreground font-body text-sm mt-6 text-center">
            Side-by-side comparison with equal aspect ratios and consistent framing — Dave's Bathroom Transformation
          </p>
        </div>
      </div>

      {/* Testimonial Layout */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Testimonial Video Pattern</h3>
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              {isVideoPlaying ? (
                <video
                  src="/testimonial-dave.mp4"
                  autoPlay
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <img 
                    src={testimonialDaveCover} 
                    alt="Dave's Testimonial" 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    onClick={() => setIsVideoPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center bg-foreground/20 hover:bg-foreground/30 transition-colors"
                  >
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-foreground fill-foreground ml-1" />
                    </div>
                  </button>
                </>
              )}
            </div>
            <div className="space-y-4">
              <h4 className="font-heading text-xl text-foreground">Video Testimonial</h4>
              <blockquote className="font-body text-muted-foreground italic border-l-2 border-primary pl-4">
                "Authentic client stories showcasing real transformations and genuine satisfaction."
              </blockquote>
              <ul className="space-y-2 text-muted-foreground font-body text-sm">
                <li>• Custom thumbnail matching brand aesthetic</li>
                <li>• Play button with brand primary color</li>
                <li>• Rounded corners: xl (0.75rem)</li>
                <li>• Overlay on hover for interaction feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Video Placement */}
      <div>
        <h3 className="font-heading text-2xl text-foreground mb-6">Project Showcase Video</h3>
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-video rounded-xl overflow-hidden">
              <video
                src="/videos/bathroom-dave.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <h4 className="font-heading text-xl text-foreground">Video Guidelines</h4>
              <ul className="space-y-2 text-muted-foreground font-body text-sm">
                <li>• Aspect ratio: 16:9 for hero, 1:1 for testimonials</li>
                <li>• Auto-play muted with clear unmute control</li>
                <li>• Rounded corners: lg (0.75rem) or 2xl (1rem)</li>
                <li>• Custom thumbnails matching brand aesthetic</li>
                <li>• Loop for ambient/showcase videos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutComposition;
