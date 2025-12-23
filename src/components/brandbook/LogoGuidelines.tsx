import { useState } from "react";
import { Check, X, Download } from "lucide-react";
import logoDarkBg from "@/assets/logo-dark-bg.png";
import logoLightBgGold from "@/assets/logo-light-bg-gold.png";
import logoLightBgDark from "@/assets/logo-light-bg-dark.png";

const downloadableLogos = [
  { 
    src: "/logos/logo-basic.png", 
    name: "Basic Logo", 
    description: "Dark text on transparent background",
    filename: "avils-logo-basic.png",
    bgClass: "bg-white"
  },
  { 
    src: "/logos/logo-gold.png", 
    name: "Gold Logo", 
    description: "Metallic gold on transparent background",
    filename: "avils-logo-gold.png",
    bgClass: "bg-white"
  },
  { 
    src: "/logos/logo-yellow.png", 
    name: "Yellow Logo", 
    description: "Bright yellow on transparent background",
    filename: "avils-logo-yellow.png",
    bgClass: "bg-zinc-900"
  },
];

const LogoGuidelines = () => {
  const [selectedLogo, setSelectedLogo] = useState<typeof downloadableLogos[0] | null>(null);

  const handleDownload = (logo: typeof downloadableLogos[0]) => {
    const link = document.createElement('a');
    link.href = logo.src;
    link.download = logo.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return <div>
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

      {/* Logo Variations */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Logo Variations</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Dark Background - Gold Logo */}
          <div className="rounded-2xl overflow-hidden">
            <img src={logoDarkBg} alt="AVIL's Bathrooms Logo - Dark Background" className="w-full aspect-square object-cover" />
            <div className="bg-card border border-border border-t-0 rounded-b-2xl p-4">
              <p className="text-sm font-body text-foreground font-medium">Primary - Dark Background</p>
              <p className="text-xs text-muted-foreground mt-1">Gold logo on dark surfaces</p>
            </div>
          </div>
          
          {/* Light Background - Gold Logo */}
          <div className="rounded-2xl overflow-hidden">
            <img src={logoLightBgGold} alt="AVIL's Bathrooms Logo - Light Background Gold" className="w-full aspect-square object-cover" />
            <div className="bg-card border border-border border-t-0 rounded-b-2xl p-4">
              <p className="text-sm font-body text-foreground font-medium">Primary - Light Background</p>
              <p className="text-xs text-muted-foreground mt-1">Gold logo on light surfaces</p>
            </div>
          </div>
          
          {/* Light Background - Dark Logo */}
          <div className="rounded-2xl overflow-hidden">
            <img src={logoLightBgDark} alt="AVIL's Bathrooms Logo - Light Background Dark" className="w-full aspect-square object-cover" />
            <div className="bg-card border border-border border-t-0 rounded-b-2xl p-4">
              <p className="text-sm font-body text-foreground font-medium">Monochrome Variant</p>
              <p className="text-xs text-muted-foreground mt-1">Dark logo for single-color applications</p>
            </div>
          </div>
        </div>
      </div>

      {/* Downloadable Logo Building Blocks */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-2">Logo Building Blocks</h3>
        <p className="text-muted-foreground font-body text-sm mb-6">
          Download official AVIL's Bathrooms logos for your projects. Click to preview, use the download button to save.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {downloadableLogos.map((logo) => (
            <div key={logo.name} className="rounded-2xl overflow-hidden border border-border bg-card group">
              <div 
                className={`${logo.bgClass} p-8 cursor-pointer transition-opacity hover:opacity-90`}
                onClick={() => setSelectedLogo(logo)}
              >
                <img 
                  src={logo.src} 
                  alt={logo.name} 
                  className="w-full h-32 object-contain"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-body text-foreground font-medium">{logo.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{logo.description}</p>
                </div>
                <button
                  onClick={() => handleDownload(logo)}
                  className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                  title={`Download ${logo.name}`}
                >
                  <Download className="w-4 h-4 text-primary" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Space Rules */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Clear Space</h3>
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="relative flex items-center justify-center py-12">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-48 border-2 border-dashed border-primary/30 rounded-lg" />
            </div>
            <img src={logoLightBgGold} alt="Logo with clear space" className="h-32 relative z-10 object-contain" />
          </div>
          <p className="text-muted-foreground font-body text-sm text-center mt-4">
            Maintain a minimum clear space equal to the height of the "A" around all sides of the logo.
          </p>
        </div>
      </div>

      {/* Do's and Don'ts */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" /> Correct Usage
          </h3>
          <div className="space-y-4">
            {["Use on clean, uncluttered backgrounds", "Maintain proper clear space", "Use approved color variations", "Keep proportions intact"].map(item => <div key={item} className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/10">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm font-body text-foreground">{item}</span>
              </div>)}
          </div>
        </div>
        <div>
          <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
            <X className="w-5 h-5 text-destructive" /> Incorrect Usage
          </h3>
          <div className="space-y-4">
            {["Do not stretch or distort", "Do not add effects or shadows", "Do not change colors arbitrarily", "Do not place on busy backgrounds"].map(item => <div key={item} className="flex items-start gap-3 p-4 bg-destructive/5 rounded-lg border border-destructive/10">
                <X className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <span className="text-sm font-body text-foreground">{item}</span>
              </div>)}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Logo Preview */}
      {selectedLogo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedLogo(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
          
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-border hover:bg-card transition-colors"
            onClick={() => setSelectedLogo(null)}
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
          
          {/* Image Container */}
          <div 
            className="relative z-10 max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${selectedLogo.bgClass} rounded-2xl p-12`}>
              <img 
                src={selectedLogo.src} 
                alt={selectedLogo.name} 
                className="w-full object-contain max-h-[60vh]"
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-heading text-foreground">{selectedLogo.name}</h4>
                <p className="text-sm text-muted-foreground font-body">{selectedLogo.description}</p>
              </div>
              <button
                onClick={() => handleDownload(selectedLogo)}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-body text-sm hover:bg-primary/90 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PNG
              </button>
            </div>
          </div>
        </div>
      )}
    </div>;
};
export default LogoGuidelines;