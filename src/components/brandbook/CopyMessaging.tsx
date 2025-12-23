import { Check, X } from "lucide-react";

const CopyMessaging = () => {
  return (
    <div>
      <div className="mb-16">
        <span className="text-primary font-body text-sm tracking-widest uppercase">
          13 — Copy & Messaging
        </span>
        <h2 className="font-heading text-4xl md:text-5xl text-foreground mt-4 mb-6">
          Brand Language
        </h2>
        <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-3xl">
          Consistent messaging reinforces brand identity. Use these examples and guidelines 
          to maintain a unified voice across all communications.
        </p>
      </div>

      {/* Taglines & Slogans */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Taglines & Slogans</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl p-6 border border-border">
            <p className="text-xs text-primary font-body uppercase tracking-wider mb-2">Primary Tagline</p>
            <p className="font-heading text-2xl text-foreground">"Crafting Your Perfect Sanctuary"</p>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border">
            <p className="text-xs text-primary font-body uppercase tracking-wider mb-2">Secondary Tagline</p>
            <p className="font-heading text-2xl text-foreground">"Where Luxury Meets Functionality"</p>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border">
            <p className="text-xs text-primary font-body uppercase tracking-wider mb-2">Short Form</p>
            <p className="font-heading text-2xl text-foreground">"Transform Your Space"</p>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border">
            <p className="text-xs text-primary font-body uppercase tracking-wider mb-2">Promise Statement</p>
            <p className="font-heading text-2xl text-foreground">"Quality You Can Feel"</p>
          </div>
        </div>
      </div>

      {/* CTA Examples */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Call-to-Action Text</h3>
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-3">Primary CTAs</p>
              <div className="space-y-2">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-center font-body text-sm">
                  Get Free Estimate
                </div>
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-center font-body text-sm">
                  Start Your Project
                </div>
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-center font-body text-sm">
                  Book Consultation
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-3">Secondary CTAs</p>
              <div className="space-y-2">
                <div className="border border-primary text-primary px-4 py-2 rounded-full text-center font-body text-sm">
                  View Our Work
                </div>
                <div className="border border-primary text-primary px-4 py-2 rounded-full text-center font-body text-sm">
                  Learn More
                </div>
                <div className="border border-primary text-primary px-4 py-2 rounded-full text-center font-body text-sm">
                  See Testimonials
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-3">Subtle CTAs</p>
              <div className="space-y-2">
                <div className="text-primary px-4 py-2 text-center font-body text-sm underline">
                  Contact Us →
                </div>
                <div className="text-primary px-4 py-2 text-center font-body text-sm underline">
                  Explore Gallery →
                </div>
                <div className="text-primary px-4 py-2 text-center font-body text-sm underline">
                  Read Our Story →
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Subject Lines */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Email Subject Lines</h3>
        <div className="space-y-3">
          {[
            { type: "Welcome", example: "Welcome to AVIL's Bathrooms – Your Dream Awaits" },
            { type: "Estimate", example: "Your Custom Bathroom Estimate is Ready" },
            { type: "Follow-up", example: "Questions About Your Bathroom Project?" },
            { type: "Promotional", example: "Save 15% on Your Spring Bathroom Refresh" },
            { type: "Completion", example: "Your New Bathroom is Complete – Here's What's Next" },
            { type: "Review Request", example: "We'd Love to Hear About Your Experience" },
          ].map((item) => (
            <div key={item.type} className="flex items-center gap-4 bg-card rounded-xl p-4 border border-border">
              <span className="text-xs text-primary font-body uppercase tracking-wider min-w-[100px]">
                {item.type}
              </span>
              <p className="font-body text-foreground">{item.example}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Captions */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Social Media Captions</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl p-6 border border-border">
            <p className="text-xs text-primary font-body uppercase tracking-wider mb-2">Before/After Post</p>
            <p className="font-body text-foreground text-sm leading-relaxed">
              From dated to dazzling ✨ This primary bathroom transformation proves that 
              every space has potential. Swipe to see the before!
              <br /><br />
              <span className="text-primary">#BathroomRemodel #HomeTransformation #AvilsBathrooms #LuxuryBathroom</span>
            </p>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border">
            <p className="text-xs text-primary font-body uppercase tracking-wider mb-2">Project Showcase</p>
            <p className="font-body text-foreground text-sm leading-relaxed">
              Marble, brass, and natural light – the perfect combination for this spa-inspired 
              retreat. Every detail was chosen with intention.
              <br /><br />
              <span className="text-primary">#BathroomDesign #InteriorDesign #SpaBathroom #Craftsmanship</span>
            </p>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border">
            <p className="text-xs text-primary font-body uppercase tracking-wider mb-2">Educational</p>
            <p className="font-body text-foreground text-sm leading-relaxed">
              Thinking about a bathroom remodel? Here are 3 things to consider before you start:
              <br />1. Budget for the unexpected
              <br />2. Prioritize ventilation
              <br />3. Choose timeless over trendy
              <br /><br />
              <span className="text-primary">#BathroomTips #HomeImprovement #RemodelAdvice</span>
            </p>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border">
            <p className="text-xs text-primary font-body uppercase tracking-wider mb-2">Testimonial Feature</p>
            <p className="font-body text-foreground text-sm leading-relaxed">
              "AVIL's team turned our vision into reality. The attention to detail was 
              extraordinary." – Sarah & David, Houston
              <br /><br />
              Ready to start your transformation?
              <br /><br />
              <span className="text-primary">#ClientLove #CustomerReview #5Stars</span>
            </p>
          </div>
        </div>
      </div>

      {/* Writing Do's and Don'ts */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" /> Writing Style
          </h3>
          <div className="space-y-3">
            {[
              "Use active, confident language",
              "Be warm and approachable",
              "Focus on transformation and results",
              "Highlight craftsmanship and quality",
              "Speak to aspirations, not just features",
              "Use 'you' and 'your' to personalize"
            ].map(item => (
              <div key={item} className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/10">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm font-body text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
            <X className="w-5 h-5 text-destructive" /> Avoid
          </h3>
          <div className="space-y-3">
            {[
              "Overly salesy or pushy language",
              "Technical jargon without explanation",
              "Negative comparisons to competitors",
              "Exaggerated claims or superlatives",
              "Generic, impersonal messaging",
              "ALL CAPS except for acronyms"
            ].map(item => (
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

export default CopyMessaging;