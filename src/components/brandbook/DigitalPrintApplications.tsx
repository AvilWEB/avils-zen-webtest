const DigitalPrintApplications = () => {
  return (
    <div>
      <div className="mb-16">
        <span className="text-primary font-body text-sm tracking-widest uppercase">
          09 — Applications
        </span>
        <h2 className="font-heading text-4xl md:text-5xl text-foreground mt-4 mb-6">
          Digital & Print
        </h2>
        <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-3xl">
          Consistent application across all touchpoints reinforces brand recognition 
          and builds trust with every interaction.
        </p>
      </div>

      {/* Website Sections */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Website Sections</h3>
        <div className="bg-foreground rounded-2xl p-4 overflow-hidden">
          <div className="bg-background rounded-xl overflow-hidden">
            {/* Mock Header */}
            <div className="bg-card px-6 py-4 border-b border-border flex items-center justify-between">
              <div className="h-6 w-24 bg-primary/20 rounded" />
              <div className="flex gap-4">
                <div className="h-4 w-16 bg-muted rounded" />
                <div className="h-4 w-16 bg-muted rounded" />
                <div className="h-4 w-16 bg-muted rounded" />
              </div>
            </div>
            {/* Mock Hero */}
            <div className="aspect-[21/9] bg-gradient-to-br from-foreground/80 to-foreground/60 flex items-center justify-center">
              <div className="text-center text-background">
                <div className="h-8 w-48 bg-background/20 rounded mx-auto mb-4" />
                <div className="h-4 w-64 bg-background/10 rounded mx-auto" />
              </div>
            </div>
            {/* Mock Content */}
            <div className="p-8 grid grid-cols-3 gap-4">
              <div className="aspect-square bg-muted rounded-lg" />
              <div className="aspect-square bg-muted rounded-lg" />
              <div className="aspect-square bg-muted rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Business Cards */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Business Cards</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Front */}
          <div className="bg-foreground rounded-2xl p-8 aspect-[1.75/1] flex flex-col justify-between">
            <img src="/avils-logo.gif" alt="Logo" className="h-8" />
            <div>
              <p className="text-background font-heading text-lg">Avil's Bathrooms</p>
              <p className="text-background/60 font-body text-sm">Premium Bathroom Renovations</p>
            </div>
          </div>
          {/* Back */}
          <div className="bg-background rounded-2xl p-8 aspect-[1.75/1] flex flex-col justify-between border border-border">
            <div>
              <p className="font-heading text-lg text-foreground">Contact Information</p>
            </div>
            <div className="space-y-1 font-body text-sm text-muted-foreground">
              <p>email@avilsbathrooms.com</p>
              <p>(123) 456-7890</p>
              <p>Connecticut, USA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Social Media</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Instagram Post */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <span className="text-muted-foreground font-body text-sm">1:1 Square</span>
            </div>
            <div className="p-4">
              <span className="text-xs text-muted-foreground font-body">Instagram Post</span>
            </div>
          </div>
          {/* Story */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="aspect-[9/16] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center max-h-64">
              <span className="text-muted-foreground font-body text-sm">9:16 Vertical</span>
            </div>
            <div className="p-4">
              <span className="text-xs text-muted-foreground font-body">Story / Reel</span>
            </div>
          </div>
          {/* Thumbnail */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <span className="text-muted-foreground font-body text-sm">16:9 Wide</span>
            </div>
            <div className="p-4">
              <span className="text-xs text-muted-foreground font-body">YouTube Thumbnail</span>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice/Estimate */}
      <div>
        <h3 className="font-heading text-2xl text-foreground mb-6">Documents</h3>
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="bg-background rounded-xl p-6 border border-border max-w-md">
            <div className="flex items-start justify-between mb-8">
              <img src="/avils-logo.gif" alt="Logo" className="h-8" />
              <div className="text-right">
                <p className="font-heading text-foreground">ESTIMATE</p>
                <p className="text-xs text-muted-foreground font-body">#EST-2024-001</p>
              </div>
            </div>
            <div className="space-y-4 mb-8">
              <div className="h-3 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
            <div className="pt-4 border-t border-border flex justify-between">
              <span className="font-body text-muted-foreground text-sm">Total</span>
              <span className="font-heading text-foreground">$X,XXX.XX</span>
            </div>
          </div>
          <p className="text-muted-foreground font-body text-sm mt-4">
            Clean layout, prominent logo, consistent typography
          </p>
        </div>
      </div>
    </div>
  );
};

export default DigitalPrintApplications;
