import { Sparkles, Target, Heart, Zap, Award } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const values = [{
  icon: Award,
  title: "Quality",
  description: "Uncompromising standards in every detail, from materials to execution."
}, {
  icon: Target,
  title: "Functionality",
  description: "Purpose-driven design that serves real life, not just aesthetics."
}, {
  icon: Sparkles,
  title: "Aesthetics",
  description: "Beauty that emerges from thoughtful design and careful craftsmanship."
}, {
  icon: Zap,
  title: "Modern Technology",
  description: "Contemporary solutions that enhance comfort and longevity."
}, {
  icon: Heart,
  title: "Satisfaction",
  description: "Long-lasting results that bring joy for years to come."
}];

const BrandEssence = () => {
  const [shimmerPosition, setShimmerPosition] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const distance = (viewportCenter - elementCenter) / windowHeight;
        // Clamp between -1 and 1, then normalize to 0-100
        const normalizedPosition = Math.max(0, Math.min(100, (distance + 0.5) * 100));
        setShimmerPosition(normalizedPosition);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <div className="mb-16">
        <span className="text-primary font-body text-sm tracking-widest uppercase">
          01 — Brand Essence
        </span>
        <h2 className="font-heading text-4xl md:text-5xl text-foreground mt-4 mb-6">
          Who We Are
        </h2>
        <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-3xl">
          AVIL's Bathrooms is a premium bathroom renovation brand based in Connecticut. 
          We represent a calm, confident, and celebratory presence — modern yet timeless, 
          inspired by a contemporary renaissance.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {values.map(value => (
          <div key={value.title} className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
            <value.icon className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-heading text-xl text-foreground mb-2">{value.title}</h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
              {value.description}
            </p>
          </div>
        ))}
      </div>
      
      <div 
        ref={sectionRef}
        className="relative rounded-2xl p-8 md:p-12 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, hsl(43 30% 12%) 0%, hsl(38 35% 18%) 50%, hsl(43 30% 12%) 100%)',
        }}
      >
        {/* Subtle gold shimmer overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse 80% 50% at ${shimmerPosition}% 50%, hsl(45 60% 50% / 0.3), transparent 70%)`,
          }}
        />
        
        {/* Secondary subtle highlight */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: `linear-gradient(120deg, transparent ${shimmerPosition - 20}%, hsl(48 70% 60% / 0.15) ${shimmerPosition}%, transparent ${shimmerPosition + 20}%)`,
          }}
        />
        
        {/* Border glow */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: 'inset 0 1px 0 0 hsl(45 50% 40% / 0.3), inset 0 -1px 0 0 hsl(30 30% 10% / 0.5)',
          }}
        />
        
        <div className="relative z-10">
          <h3 className="font-heading text-2xl text-amber-100/90 mb-4">
            Contemporary Renaissance
          </h3>
          <p className="text-amber-200/70 font-body leading-relaxed mb-6">
            Our brand represents a rebirth of craftsmanship values in a modern context. 
            We bridge the gap between timeless artisan quality and contemporary innovation, 
            creating spaces that feel both fresh and enduring.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Premium", "Refined", "Unique", "Clear", "Intentional"].map(trait => (
              <span 
                key={trait} 
                className="px-4 py-2 rounded-full text-sm font-body border transition-colors"
                style={{
                  background: 'hsl(43 25% 15% / 0.6)',
                  borderColor: 'hsl(45 40% 35% / 0.4)',
                  color: 'hsl(45 30% 80%)',
                }}
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandEssence;