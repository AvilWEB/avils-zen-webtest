import { useState } from "react";
import { Copy, Check } from "lucide-react";

const designTokensJSON = `{
  "brand": {
    "name": "AVIL's Bathrooms",
    "tagline": "Luxury bathroom remodeling",
    "website": "https://avilsbathrooms.com"
  },
  "colors": {
    "primary": {
      "name": "Salad Green",
      "hex": "#8AAB1C",
      "rgb": "rgb(138, 171, 28)",
      "hsl": "hsl(76, 82%, 39%)",
      "usage": "Primary brand color, CTAs, key actions"
    },
    "secondary": {
      "name": "Ocean Blue",
      "hex": "#7F909A",
      "rgb": "rgb(127, 144, 154)",
      "hsl": "hsl(202, 12%, 57%)",
      "usage": "Secondary elements, subtle accents"
    },
    "accent": {
      "name": "Gold",
      "hex": "#FFD700",
      "rgb": "rgb(255, 215, 0)",
      "hsl": "hsl(51, 100%, 50%)",
      "usage": "Premium highlights, luxury elements"
    },
    "background": {
      "name": "Milky",
      "hex": "#E8E3D7",
      "rgb": "rgb(232, 227, 215)",
      "hsl": "hsl(50, 25%, 87%)",
      "usage": "Page backgrounds, light surfaces"
    },
    "foreground": {
      "name": "Dark Earth",
      "hex": "#1A1A1A",
      "rgb": "rgb(26, 26, 26)",
      "hsl": "hsl(0, 0%, 10%)",
      "usage": "Primary text, headings"
    }
  },
  "typography": {
    "fonts": {
      "logo": {
        "family": "Berova",
        "fallback": ["Georgia", "serif"],
        "usage": "Logo text only"
      },
      "heading": {
        "family": "Cotta",
        "fallback": ["Georgia", "serif"],
        "usage": "All headings (h1-h6)"
      },
      "body": {
        "family": "Helvetica",
        "fallback": ["Arial", "sans-serif"],
        "usage": "Body text, paragraphs, UI elements"
      }
    },
    "sizes": {
      "hero": "4rem - 6rem (64px - 96px)",
      "h1": "3rem (48px)",
      "h2": "2.25rem (36px)",
      "h3": "1.5rem (24px)",
      "h4": "1.25rem (20px)",
      "body": "1rem (16px)",
      "small": "0.875rem (14px)",
      "caption": "0.75rem (12px)"
    },
    "weights": {
      "regular": 400,
      "medium": 500
    },
    "lineHeight": {
      "tight": 1.2,
      "normal": 1.5,
      "relaxed": 1.75
    }
  },
  "spacing": {
    "scale": {
      "xs": "0.25rem (4px)",
      "sm": "0.5rem (8px)",
      "md": "1rem (16px)",
      "lg": "1.5rem (24px)",
      "xl": "2rem (32px)",
      "2xl": "3rem (48px)",
      "3xl": "4rem (64px)"
    },
    "containerPadding": "2rem",
    "sectionGap": "4rem - 8rem"
  },
  "borderRadius": {
    "sm": "0.5rem (8px)",
    "md": "0.625rem (10px)",
    "lg": "0.75rem (12px)",
    "xl": "1rem (16px)",
    "2xl": "1.5rem (24px)",
    "full": "9999px (pills, circles)"
  },
  "shadows": {
    "elegant": "0 10px 40px -10px rgba(138, 171, 28, 0.15)",
    "soft": "0 4px 20px rgba(0, 0, 0, 0.06)"
  },
  "animation": {
    "duration": {
      "fast": "150ms",
      "normal": "300ms",
      "slow": "500ms"
    },
    "easing": {
      "default": "cubic-bezier(0.4, 0, 0.2, 1)",
      "easeOut": "cubic-bezier(0, 0, 0.2, 1)",
      "easeIn": "cubic-bezier(0.4, 0, 1, 1)"
    }
  }
}`;

const DesignTokens = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(designTokensJSON);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="mb-16">
        <span className="text-primary font-body text-sm tracking-widest uppercase">
          11 — Design Tokens
        </span>
        <h2 className="font-heading text-4xl md:text-5xl text-foreground mt-4 mb-6">
          Machine-Readable Tokens
        </h2>
        <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-3xl">
          Complete design system values in JSON format. Use these tokens to ensure 
          pixel-perfect brand consistency across any platform or AI-generated content.
        </p>
      </div>

      {/* JSON Code Block */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-2xl text-foreground">Brand Tokens (JSON)</h3>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full font-body text-sm transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy JSON"}
          </button>
        </div>
        <div className="bg-zinc-900 rounded-2xl p-6 overflow-auto max-h-[500px] border border-border">
          <pre className="text-sm text-zinc-100 font-mono whitespace-pre">
            {designTokensJSON}
          </pre>
        </div>
      </div>

      {/* Quick Reference Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h4 className="font-heading text-lg text-foreground mb-4">Color Quick Reference</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary" />
              <div>
                <p className="text-sm font-body text-foreground">Primary (Salad Green)</p>
                <p className="text-xs text-muted-foreground font-mono">#8AAB1C</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary" />
              <div>
                <p className="text-sm font-body text-foreground">Secondary (Ocean Blue)</p>
                <p className="text-xs text-muted-foreground font-mono">#7F909A</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent" />
              <div>
                <p className="text-sm font-body text-foreground">Accent (Gold)</p>
                <p className="text-xs text-muted-foreground font-mono">#FFD700</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-background border border-border" />
              <div>
                <p className="text-sm font-body text-foreground">Background (Milky)</p>
                <p className="text-xs text-muted-foreground font-mono">#E8E3D7</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-foreground" />
              <div>
                <p className="text-sm font-body text-foreground">Foreground (Dark Earth)</p>
                <p className="text-xs text-muted-foreground font-mono">#1A1A1A</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border">
          <h4 className="font-heading text-lg text-foreground mb-4">Typography Quick Reference</h4>
          <div className="space-y-4">
            <div>
              <p className="font-logo text-2xl text-foreground">Berova (Logo)</p>
              <p className="text-xs text-muted-foreground font-body">Used exclusively for logo text</p>
            </div>
            <div>
              <p className="font-heading text-2xl text-foreground">Cotta (Headings)</p>
              <p className="text-xs text-muted-foreground font-body">All headings h1 through h6</p>
            </div>
            <div>
              <p className="font-body text-lg text-foreground">Helvetica (Body)</p>
              <p className="text-xs text-muted-foreground font-body">Body text, paragraphs, UI</p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Variables Reference */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h4 className="font-heading text-lg text-foreground mb-4">CSS Variables</h4>
        <p className="text-sm text-muted-foreground font-body mb-4">
          Use these CSS custom properties in your stylesheets:
        </p>
        <div className="bg-zinc-900 rounded-xl p-4 overflow-auto">
          <pre className="text-sm text-zinc-100 font-mono whitespace-pre">{`:root {
  --primary: 76 82% 39%;      /* Salad Green */
  --secondary: 202 12% 57%;   /* Ocean Blue */
  --accent: 51 100% 50%;      /* Gold */
  --background: 50 25% 87%;   /* Milky */
  --foreground: 0 0% 10%;     /* Dark Earth */
  --radius: 0.75rem;
}

/* Usage: */
.element {
  color: hsl(var(--primary));
  background: hsl(var(--background));
}`}</pre>
        </div>
      </div>
    </div>
  );
};

export default DesignTokens;