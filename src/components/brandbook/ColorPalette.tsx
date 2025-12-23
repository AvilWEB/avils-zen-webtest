import { useState } from "react";
import { Check, Copy } from "lucide-react";
const colors = [{
  name: "Salad Green",
  variable: "--primary",
  hsl: "76 82% 39%",
  hex: "#8AAB1C",
  role: "Primary",
  purpose: "Action, growth, freshness. Used for CTAs, highlights, and key brand moments."
}, {
  name: "Ocean Blue",
  variable: "--secondary",
  hsl: "202 12% 57%",
  hex: "#8094A0",
  role: "Secondary",
  purpose: "Trust, calm, reliability. Used for supporting elements and subtle accents."
}, {
  name: "Gold",
  variable: "--accent",
  hsl: "51 100% 50%",
  hex: "#FFD700",
  role: "Accent",
  purpose: "Luxury, premium highlights. Used sparingly for special emphasis."
}, {
  name: "Milky",
  variable: "--background",
  hsl: "50 25% 87%",
  hex: "#E8E2D3",
  role: "Background",
  purpose: "Warmth, elegance, comfort. The foundation of our visual identity."
}, {
  name: "Dark Earth",
  variable: "--foreground",
  hsl: "0 0% 10%",
  hex: "#1A1A1A",
  role: "Foreground",
  purpose: "Grounding, readability. Primary text and strong contrasts."
}];
const ColorPalette = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(name);
    setTimeout(() => setCopiedColor(null), 2000);
  };
  return <div>
      <div className="mb-16">
        <span className="text-primary font-body text-sm tracking-widest uppercase">
          03 — Color System
        </span>
        <h2 className="font-heading text-4xl md:text-5xl text-foreground mt-4 mb-6">
          Color Palette
        </h2>
        <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-3xl">
          Our color palette reflects the brand's essence: natural, warm, and premium. 
          Each color serves a specific emotional and functional purpose.
        </p>
      </div>

      {/* Color Cards */}
      <div className="space-y-6 mb-16">
        {colors.map(color => <div key={color.name} className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-48 h-32 md:h-auto" style={{
            backgroundColor: color.hex
          }} />
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs text-primary font-body tracking-wider uppercase">
                      {color.role}
                    </span>
                    <h3 className="font-heading text-xl text-foreground">{color.name}</h3>
                  </div>
                  <button onClick={() => copyToClipboard(color.hex, color.name)} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Copy HEX">
                    {copiedColor === color.name ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                  </button>
                </div>
                <p className="text-muted-foreground font-body text-sm mb-4">
                  {color.purpose}
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-mono text-muted-foreground">
                  <span>HSL: {color.hsl}</span>
                  <span>HEX: {color.hex}</span>
                  <span>CSS: var({color.variable})</span>
                </div>
              </div>
            </div>
          </div>)}
      </div>

      {/* Color Combinations */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Color Combinations</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl p-6 border border-border">
            <h4 className="font-heading text-lg text-foreground mb-4">✓ Recommended</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex">
                  <div className="w-8 h-8 rounded-l bg-primary" />
                  <div className="w-8 h-8 rounded-r bg-background" />
                </div>
                <span className="text-sm font-body text-muted-foreground">Primary on Background</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex">
                  <div className="w-8 h-8 rounded-l bg-foreground" />
                  <div className="w-8 h-8 rounded-r bg-background" />
                </div>
                <span className="text-sm font-body text-muted-foreground">Foreground on Background</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex">
                  <div className="w-8 h-8 rounded-l bg-accent" />
                  <div className="w-8 h-8 rounded-r bg-foreground" />
                </div>
                <span className="text-sm font-body text-muted-foreground">Accent on Dark</span>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <h4 className="font-heading text-lg text-foreground mb-4">✗ Avoid</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex opacity-50">
                  <div className="w-8 h-8 rounded-l bg-accent" />
                  <div className="w-8 h-8 rounded-r bg-background" />
                </div>
                <span className="text-sm font-body text-muted-foreground">Gold on light (low contrast)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex opacity-50">
                  <div className="w-8 h-8 rounded-l bg-secondary" />
                  <div className="w-8 h-8 rounded-r bg-muted" />
                </div>
                <span className="text-sm font-body text-muted-foreground">Secondary on Muted</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex opacity-50">
                  <div className="w-8 h-8 rounded-l bg-primary" />
                  <div className="w-8 h-8 rounded-r bg-accent" />
                </div>
                <span className="text-sm font-body text-muted-foreground">Primary on Accent</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Note */}
      
    </div>;
};
export default ColorPalette;