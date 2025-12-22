const TypographyShowcase = () => {
  return (
    <div>
      <div className="mb-16">
        <span className="text-primary font-body text-sm tracking-widest uppercase">
          04 — Typography
        </span>
        <h2 className="font-heading text-4xl md:text-5xl text-foreground mt-4 mb-6">
          Typography System
        </h2>
        <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-3xl">
          Our typography creates a visual hierarchy that balances elegance with readability. 
          Each typeface serves a distinct purpose in our brand communication.
        </p>
      </div>

      {/* Font Specimens */}
      <div className="space-y-12 mb-16">
        {/* Berova - Logo */}
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="flex items-baseline justify-between mb-6">
            <span className="text-xs text-primary font-body tracking-wider uppercase">Logo Font</span>
            <span className="text-xs text-muted-foreground font-mono">/fonts/Berova.otf</span>
          </div>
          <h3 className="font-logo text-6xl md:text-8xl text-foreground mb-4">Berova</h3>
          <p className="text-muted-foreground font-body text-sm mb-6">
            Used exclusively for the AVIL's logo and brand mark. Distinguished, elegant, and memorable.
          </p>
          <div className="font-logo text-3xl text-foreground/80 tracking-wide">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </div>
          <div className="font-logo text-3xl text-foreground/60 tracking-wide mt-2">
            abcdefghijklmnopqrstuvwxyz
          </div>
          <div className="font-logo text-3xl text-foreground/40 tracking-wide mt-2">
            0123456789
          </div>
        </div>

        {/* Cotta - Headings */}
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="flex items-baseline justify-between mb-6">
            <span className="text-xs text-primary font-body tracking-wider uppercase">Heading Font</span>
            <span className="text-xs text-muted-foreground font-mono">/fonts/Cotta.otf</span>
          </div>
          <h3 className="font-heading text-5xl md:text-7xl text-foreground mb-4">Cotta</h3>
          <p className="text-muted-foreground font-body text-sm mb-6">
            Primary heading typeface. Confident, warm, and contemporary. Creates strong visual hierarchy.
          </p>
          <div className="font-heading text-2xl text-foreground/80 tracking-wide">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </div>
          <div className="font-heading text-2xl text-foreground/60 tracking-wide mt-2">
            abcdefghijklmnopqrstuvwxyz
          </div>
          <div className="font-heading text-2xl text-foreground/40 tracking-wide mt-2">
            0123456789
          </div>
        </div>

        {/* Helvetica - Body */}
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="flex items-baseline justify-between mb-6">
            <span className="text-xs text-primary font-body tracking-wider uppercase">Body Font</span>
            <span className="text-xs text-muted-foreground font-mono">/fonts/Helvetica.ttc</span>
          </div>
          <h3 className="font-body text-5xl md:text-7xl text-foreground mb-4 font-light">Helvetica</h3>
          <p className="text-muted-foreground font-body text-sm mb-6">
            Body text and UI elements. Clean, professional, and highly readable at all sizes.
          </p>
          <div className="font-body text-xl text-foreground/80">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </div>
          <div className="font-body text-xl text-foreground/60 mt-2">
            abcdefghijklmnopqrstuvwxyz
          </div>
          <div className="font-body text-xl text-foreground/40 mt-2">
            0123456789
          </div>
        </div>
      </div>

      {/* Type Scale */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Type Scale</h3>
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="divide-y divide-border">
            <div className="p-6 flex items-baseline gap-6">
              <span className="text-xs text-muted-foreground font-mono w-20">H1 / 48px</span>
              <span className="font-heading text-5xl text-foreground">Transform Your Space</span>
            </div>
            <div className="p-6 flex items-baseline gap-6">
              <span className="text-xs text-muted-foreground font-mono w-20">H2 / 36px</span>
              <span className="font-heading text-4xl text-foreground">Premium Craftsmanship</span>
            </div>
            <div className="p-6 flex items-baseline gap-6">
              <span className="text-xs text-muted-foreground font-mono w-20">H3 / 24px</span>
              <span className="font-heading text-2xl text-foreground">Quality Materials</span>
            </div>
            <div className="p-6 flex items-baseline gap-6">
              <span className="text-xs text-muted-foreground font-mono w-20">Body / 16px</span>
              <span className="font-body text-base text-foreground">Every detail matters in creating your perfect bathroom.</span>
            </div>
            <div className="p-6 flex items-baseline gap-6">
              <span className="text-xs text-muted-foreground font-mono w-20">Small / 14px</span>
              <span className="font-body text-sm text-muted-foreground">Supporting text and captions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Line Height & Spacing */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border">
          <h4 className="font-heading text-lg text-foreground mb-4">Line Height</h4>
          <div className="space-y-4">
            <div>
              <span className="text-xs text-primary font-body">Headings: 1.2</span>
              <p className="font-heading text-xl leading-tight text-foreground mt-1">
                Tight line height for impact
              </p>
            </div>
            <div>
              <span className="text-xs text-primary font-body">Body: 1.6</span>
              <p className="font-body text-base leading-relaxed text-foreground mt-1">
                Relaxed line height for comfortable reading in longer passages of text.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border">
          <h4 className="font-heading text-lg text-foreground mb-4">Letter Spacing</h4>
          <div className="space-y-4">
            <div>
              <span className="text-xs text-primary font-body">Labels: 0.1em</span>
              <p className="font-body text-sm tracking-widest uppercase text-foreground mt-1">
                UPPERCASE LABELS
              </p>
            </div>
            <div>
              <span className="text-xs text-primary font-body">Body: Normal</span>
              <p className="font-body text-base text-foreground mt-1">
                Standard tracking for body text
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypographyShowcase;
