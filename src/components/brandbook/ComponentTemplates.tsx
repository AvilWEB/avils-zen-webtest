const ComponentTemplates = () => {
  return (
    <div>
      <div className="mb-16">
        <span className="text-primary font-body text-sm tracking-widest uppercase">
          12 — Component Templates
        </span>
        <h2 className="font-heading text-4xl md:text-5xl text-foreground mt-4 mb-6">
          Ready-to-Use Templates
        </h2>
        <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-3xl">
          Visual examples of branded materials. Use these as references when creating 
          gift cards, coupons, social media posts, and other marketing collateral.
        </p>
      </div>

      {/* Gift Card Template */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Gift Card</h3>
        <div className="max-w-md mx-auto">
          <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 aspect-[1.6/1] flex flex-col justify-between overflow-hidden">
            {/* Gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
            
            <div className="flex justify-between items-start">
              <div>
                <p className="font-logo text-2xl text-accent">AVIL's</p>
                <p className="font-heading text-sm text-zinc-400 tracking-widest">BATHROOMS</p>
              </div>
              <p className="font-body text-xs text-zinc-500 uppercase tracking-wider">Gift Card</p>
            </div>
            
            <div className="text-center">
              <p className="font-heading text-4xl text-white">$250</p>
              <p className="font-body text-sm text-zinc-400 mt-1">Towards your dream bathroom</p>
            </div>
            
            <div className="flex justify-between items-end">
              <p className="font-body text-xs text-zinc-500">Card #: XXXX-XXXX-XXXX</p>
              <p className="font-body text-xs text-zinc-500">Valid for 2 years</p>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground font-body mt-4">
            Aspect ratio: 1.6:1 (standard credit card) • Dark background with gold accents
          </p>
        </div>
      </div>

      {/* Coupon Template */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Discount Coupon</h3>
        <div className="max-w-lg mx-auto">
          <div className="relative bg-card rounded-2xl border-2 border-dashed border-primary overflow-hidden">
            <div className="flex">
              {/* Left side - discount */}
              <div className="bg-primary text-primary-foreground p-8 flex flex-col items-center justify-center min-w-[140px]">
                <p className="font-heading text-5xl">15%</p>
                <p className="font-body text-sm uppercase tracking-wider">OFF</p>
              </div>
              
              {/* Right side - details */}
              <div className="p-6 flex-1">
                <p className="font-logo text-xl text-foreground">AVIL's Bathrooms</p>
                <p className="font-heading text-lg text-foreground mt-2">First-Time Customer Discount</p>
                <p className="font-body text-sm text-muted-foreground mt-2">
                  Valid on any bathroom remodeling project over $5,000
                </p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="font-body text-xs text-muted-foreground">
                    Code: <span className="font-mono text-primary">WELCOME15</span>
                  </p>
                  <p className="font-body text-xs text-muted-foreground mt-1">
                    Expires: December 31, 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground font-body mt-4">
            Dashed border emphasizes "cut out" feel • Primary color highlight for discount value
          </p>
        </div>
      </div>

      {/* Social Media Templates */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Social Media Posts</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Instagram Square */}
          <div>
            <div className="aspect-square bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
              <p className="font-logo text-lg text-accent">AVIL's</p>
              <div className="text-center">
                <p className="font-heading text-2xl text-white leading-tight">
                  Transform Your
                  <br />
                  <span className="text-accent">Bathroom</span>
                </p>
                <p className="font-body text-sm text-zinc-400 mt-4">
                  Premium remodeling services
                </p>
              </div>
              <p className="font-body text-xs text-zinc-500 text-center">avilsbathrooms.com</p>
            </div>
            <p className="text-center text-sm text-muted-foreground font-body mt-2">
              Instagram/Facebook (1:1)
            </p>
          </div>

          {/* Story Format */}
          <div>
            <div className="aspect-[9/16] max-h-[400px] bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl p-6 flex flex-col justify-between mx-auto">
              <div className="text-center">
                <p className="font-logo text-lg text-accent">AVIL's</p>
                <p className="font-heading text-xs text-zinc-400">BATHROOMS</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-xl text-white leading-tight">
                  Before → After
                </p>
                <p className="font-body text-sm text-zinc-400 mt-2">
                  Swipe to see the transformation
                </p>
              </div>
              <div className="bg-primary/20 rounded-full py-2 px-4 text-center">
                <p className="font-body text-sm text-primary">Get Free Estimate</p>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground font-body mt-2">
              Stories (9:16)
            </p>
          </div>

          {/* Twitter/X */}
          <div>
            <div className="aspect-[16/9] bg-background rounded-2xl p-6 flex flex-col justify-center border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="font-logo text-sm text-primary-foreground">A</span>
                </div>
                <div>
                  <p className="font-body text-sm text-foreground font-medium">AVIL's Bathrooms</p>
                  <p className="font-body text-xs text-muted-foreground">@avilsbathrooms</p>
                </div>
              </div>
              <p className="font-body text-sm text-foreground mt-4">
                Your dream bathroom is just a consultation away. 
                Book your free estimate today! 🛁✨
              </p>
              <p className="font-body text-xs text-primary mt-2">#BathroomRemodel #LuxuryBathroom</p>
            </div>
            <p className="text-center text-sm text-muted-foreground font-body mt-2">
              Twitter/X (16:9)
            </p>
          </div>
        </div>
      </div>

      {/* Email Header */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Email Header</h3>
        <div className="max-w-2xl mx-auto">
          <div className="bg-zinc-900 rounded-t-2xl p-8 flex justify-center">
            <img src="/avils-logo.gif" alt="AVIL's Bathrooms Logo" className="h-32 w-auto" />
          </div>
          <div className="bg-card rounded-b-2xl p-6 border border-t-0 border-border">
            <p className="font-heading text-xl text-foreground text-center">Your Estimate is Ready</p>
            <p className="font-body text-sm text-muted-foreground text-center mt-2">
              Thank you for considering AVIL's Bathrooms for your remodeling project.
            </p>
          </div>
          <p className="text-center text-sm text-muted-foreground font-body mt-4">
            Max width: 600px • Dark header with gold logo • Light content area
          </p>
        </div>
      </div>

      {/* Specification Notes */}
      <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
        <h3 className="font-heading text-xl text-foreground mb-4">Template Specifications</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-body text-sm font-medium text-foreground mb-2">Print Materials</h4>
            <ul className="space-y-1 text-sm text-muted-foreground font-body">
              <li>• Resolution: 300 DPI minimum</li>
              <li>• Color mode: CMYK for print</li>
              <li>• Bleed: 0.125" (3mm) on all sides</li>
              <li>• Safe zone: 0.25" (6mm) from edge</li>
            </ul>
          </div>
          <div>
            <h4 className="font-body text-sm font-medium text-foreground mb-2">Digital Materials</h4>
            <ul className="space-y-1 text-sm text-muted-foreground font-body">
              <li>• Resolution: 72 DPI for web</li>
              <li>• Color mode: sRGB</li>
              <li>• Format: PNG for transparency, JPG for photos</li>
              <li>• Max file size: 200KB for web optimization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentTemplates;