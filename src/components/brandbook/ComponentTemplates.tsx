import { Download } from 'lucide-react';
import giftCardPreview from '@/assets/gift-card-template-preview.jpg';
const ComponentTemplates = () => {
  return <div>
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
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src={giftCardPreview} alt="AVIL's Bathrooms Gift Card Template Preview" className="w-full h-auto" />
          </div>
          <p className="text-center text-sm text-muted-foreground font-body mt-4">
            Aspect ratio: 16:9 • Light natural background with gold accent
          </p>
          <div className="flex justify-center mt-4">
            <a href="https://github.com/AvilWEB/avils-zen-webtest/releases/download/TampatePSD/Gift.Card.Tamplate.psd" download className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-body text-sm hover:bg-primary/90 transition-colors">
              <Download className="w-4 h-4" />
              Download PSD Template
            </a>
          </div>
        </div>
      </div>

      {/* Coupon Template */}
      

      {/* Social Media Templates */}
      

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
      
    </div>;
};
export default ComponentTemplates;