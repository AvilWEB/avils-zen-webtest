import businessCardDark from "@/assets/business-card-dark.png";
import businessCardLight from "@/assets/business-card-light.png";
import estimatePreview from "@/assets/estimate-template-preview.jpg";
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
          <img 
            src={businessCardDark} 
            alt="Avil's Bathrooms Business Card - Dark Version" 
            className="w-full rounded-2xl shadow-lg"
          />
          <img 
            src={businessCardLight} 
            alt="Avil's Bathrooms Business Card - Light Version" 
            className="w-full rounded-2xl shadow-lg"
          />
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
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card rounded-2xl p-6 border border-border">
            <img 
              src={estimatePreview} 
              alt="AVIL's Bathrooms Estimate Template" 
              className="w-full rounded-xl shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h4 className="font-heading text-xl text-foreground mb-4">Project Estimate</h4>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              Professional estimate documents feature the brand's signature gold logo, 
              clean table layouts for cost breakdowns, and consistent typography throughout.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground font-body">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Clean layout with prominent logo placement
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Organized cost breakdown tables
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Consistent brand typography
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Professional contact information footer
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalPrintApplications;
