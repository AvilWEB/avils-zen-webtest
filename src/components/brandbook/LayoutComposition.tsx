const LayoutComposition = () => {
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
            <div className="aspect-[4/3] bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <span className="text-2xl font-heading text-foreground">BEFORE</span>
                <p className="text-sm text-muted-foreground font-body mt-2">Same angle, consistent lighting</p>
              </div>
            </div>
            <div className="aspect-[4/3] bg-primary/10 rounded-xl flex items-center justify-center border-2 border-primary/30">
              <div className="text-center">
                <span className="text-2xl font-heading text-foreground">AFTER</span>
                <p className="text-sm text-muted-foreground font-body mt-2">Showcase transformation</p>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground font-body text-sm mt-6 text-center">
            Side-by-side comparison with equal aspect ratios and consistent framing
          </p>
        </div>
      </div>

      {/* Testimonial Layout */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Testimonial Pattern</h3>
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-6" />
            <blockquote className="font-heading text-2xl text-foreground mb-4 italic">
              "Quote text goes here — impactful and authentic"
            </blockquote>
            <cite className="font-body text-muted-foreground not-italic">
              — Client Name, Location
            </cite>
          </div>
        </div>
      </div>

      {/* Video Placement */}
      <div>
        <h3 className="font-heading text-2xl text-foreground mb-6">Video Placement</h3>
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-video bg-foreground/10 rounded-xl flex items-center justify-center">
              <span className="text-foreground/40 font-heading">16:9 Video</span>
            </div>
            <div className="space-y-4">
              <h4 className="font-heading text-xl text-foreground">Video Guidelines</h4>
              <ul className="space-y-2 text-muted-foreground font-body text-sm">
                <li>• Aspect ratio: 16:9 for hero, 1:1 for testimonials</li>
                <li>• Auto-play muted with clear unmute control</li>
                <li>• Rounded corners: lg (0.75rem) or 2xl (1rem)</li>
                <li>• Custom thumbnails matching brand aesthetic</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutComposition;
