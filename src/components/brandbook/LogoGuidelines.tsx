import { Check, X } from "lucide-react";

const LogoGuidelines = () => {
  return (
    <div>
      <div className="mb-16">
        <span className="text-primary font-body text-sm tracking-widest uppercase">
          02 — Logo Usage
        </span>
        <h2 className="font-heading text-4xl md:text-5xl text-foreground mt-4 mb-6">
          Logo Guidelines
        </h2>
        <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-3xl">
          Our logo is the cornerstone of our brand identity. These guidelines ensure 
          consistent and proper usage across all applications.
        </p>
      </div>

      {/* Primary Logo Display */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-background rounded-2xl p-12 border border-border flex items-center justify-center">
          <img 
            src="/avils-logo.gif" 
            alt="AVIL's Bathrooms Logo - Light Background" 
            className="h-20"
          />
        </div>
        <div className="bg-foreground rounded-2xl p-12 flex items-center justify-center">
          <img 
            src="/avils-logo.gif" 
            alt="AVIL's Bathrooms Logo - Dark Background" 
            className="h-20"
          />
        </div>
      </div>

      {/* Clear Space Rules */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Clear Space</h3>
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="relative flex items-center justify-center py-12">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-32 border-2 border-dashed border-primary/30 rounded-lg" />
            </div>
            <img 
              src="/avils-logo.gif" 
              alt="Logo with clear space" 
              className="h-12 relative z-10"
            />
          </div>
          <p className="text-muted-foreground font-body text-sm text-center mt-4">
            Maintain a minimum clear space equal to the height of the "A" around all sides of the logo.
          </p>
        </div>
      </div>

      {/* Minimum Size */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Minimum Size</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl p-6 border border-border text-center">
            <div className="h-20 flex items-center justify-center">
              <img src="/avils-logo.gif" alt="Print size" className="h-8" />
            </div>
            <p className="text-sm text-muted-foreground font-body mt-2">Print: 25mm width</p>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border text-center">
            <div className="h-20 flex items-center justify-center">
              <img src="/avils-logo.gif" alt="Digital size" className="h-6" />
            </div>
            <p className="text-sm text-muted-foreground font-body mt-2">Digital: 80px width</p>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border text-center">
            <div className="h-20 flex items-center justify-center">
              <img src="/avils-logo.gif" alt="Favicon size" className="h-4" />
            </div>
            <p className="text-sm text-muted-foreground font-body mt-2">Favicon: 32px</p>
          </div>
        </div>
      </div>

      {/* Do's and Don'ts */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" /> Correct Usage
          </h3>
          <div className="space-y-4">
            {[
              "Use on clean, uncluttered backgrounds",
              "Maintain proper clear space",
              "Use approved color variations",
              "Keep proportions intact"
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/10">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm font-body text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
            <X className="w-5 h-5 text-destructive" /> Incorrect Usage
          </h3>
          <div className="space-y-4">
            {[
              "Do not stretch or distort",
              "Do not add effects or shadows",
              "Do not change colors arbitrarily",
              "Do not place on busy backgrounds"
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 bg-destructive/5 rounded-lg border border-destructive/10">
                <X className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <span className="text-sm font-body text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoGuidelines;
