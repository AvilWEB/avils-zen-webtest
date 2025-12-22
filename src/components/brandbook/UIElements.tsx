import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronRight, Mail, Phone, MapPin, Star, Calendar, Clock } from "lucide-react";

const UIElements = () => {
  return (
    <div>
      <div className="mb-16">
        <span className="text-primary font-body text-sm tracking-widest uppercase">
          06 — UI Elements
        </span>
        <h2 className="font-heading text-4xl md:text-5xl text-foreground mt-4 mb-6">
          Interface Components
        </h2>
        <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-3xl">
          Consistent UI elements create a cohesive experience. These components follow 
          our design principles: clean, minimal, and purposeful.
        </p>
      </div>

      {/* Button Styles */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Buttons</h3>
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <span className="text-xs text-muted-foreground font-body">Primary</span>
              <Button className="w-full">Get Started</Button>
            </div>
            <div className="space-y-3">
              <span className="text-xs text-muted-foreground font-body">Secondary</span>
              <Button variant="secondary" className="w-full">Learn More</Button>
            </div>
            <div className="space-y-3">
              <span className="text-xs text-muted-foreground font-body">Outline</span>
              <Button variant="outline" className="w-full">Contact Us</Button>
            </div>
            <div className="space-y-3">
              <span className="text-xs text-muted-foreground font-body">Ghost</span>
              <Button variant="ghost" className="w-full">View Details</Button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border">
            <span className="text-xs text-muted-foreground font-body block mb-3">With Icons</span>
            <div className="flex flex-wrap gap-4">
              <Button>
                Request Estimate <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline">
                <Phone className="mr-2 w-4 h-4" /> Call Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Icon Style */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Iconography</h3>
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="mb-6">
            <span className="text-xs text-primary font-body">Style: Lucide Icons — Line, Minimal, Modern</span>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
            {[ArrowRight, Check, ChevronRight, Mail, Phone, MapPin, Star, Calendar, Clock].map((Icon, index) => (
              <div 
                key={index}
                className="flex flex-col items-center gap-2 p-4 bg-muted/30 rounded-xl"
              >
                <Icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-border grid md:grid-cols-3 gap-6">
            <div>
              <span className="text-xs text-muted-foreground font-body">Stroke Width</span>
              <p className="font-body text-foreground mt-1">1.5px — 2px</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground font-body">Standard Size</span>
              <p className="font-body text-foreground mt-1">24px (w-6 h-6)</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground font-body">Color</span>
              <p className="font-body text-foreground mt-1">currentColor (inherits text)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Border Radius */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Corner Radius</h3>
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-primary/20 border-2 border-primary rounded-sm mx-auto mb-3" />
              <span className="text-xs text-muted-foreground font-mono">sm: 0.125rem</span>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-primary/20 border-2 border-primary rounded-md mx-auto mb-3" />
              <span className="text-xs text-muted-foreground font-mono">md: 0.375rem</span>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-primary/20 border-2 border-primary rounded-lg mx-auto mb-3" />
              <span className="text-xs text-muted-foreground font-mono">lg: 0.75rem ✓</span>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-primary/20 border-2 border-primary rounded-2xl mx-auto mb-3" />
              <span className="text-xs text-muted-foreground font-mono">2xl: 1rem</span>
            </div>
          </div>
          <p className="text-muted-foreground font-body text-sm text-center mt-6">
            Default radius: <span className="text-primary font-mono">0.75rem (lg)</span> — Warm, approachable corners
          </p>
        </div>
      </div>

      {/* Dividers & Separators */}
      <div>
        <h3 className="font-heading text-2xl text-foreground mb-6">Dividers & Separators</h3>
        <div className="bg-card rounded-2xl p-8 border border-border space-y-8">
          <div>
            <span className="text-xs text-muted-foreground font-body mb-3 block">Standard Divider</span>
            <div className="h-px bg-border w-full" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground font-body mb-3 block">Accent Divider</span>
            <div className="h-0.5 bg-gradient-to-r from-primary via-primary/50 to-transparent w-full" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground font-body mb-3 block">Section Separator</span>
            <div className="flex items-center gap-4">
              <div className="h-px bg-border flex-1" />
              <span className="text-xs text-muted-foreground font-body">or</span>
              <div className="h-px bg-border flex-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIElements;
