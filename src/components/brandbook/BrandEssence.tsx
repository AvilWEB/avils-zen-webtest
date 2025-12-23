import { Sparkles, Target, Heart, Zap, Award } from "lucide-react";
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
  return <div>
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
        {values.map(value => <div key={value.title} className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
            <value.icon className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-heading text-xl text-foreground mb-2">{value.title}</h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
              {value.description}
            </p>
          </div>)}
      </div>
      
      <div className="bg-gradient-to-br from-sky-600/20 to-cyan-500/10 rounded-2xl p-8 md:p-12 border border-sky-500/20">
        <h3 className="font-heading text-2xl text-foreground mb-4">
          Contemporary Renaissance
        </h3>
        <p className="text-muted-foreground font-body leading-relaxed mb-6">Our brand represents a rebirth of craftsmanship values in a modern context. We bridge the gap between timeless artisan quality and contemporary innovation, creating spaces that feel both fresh and enduring. </p>
        <div className="flex flex-wrap gap-3">
          {["Premium", "Refined", "Unique", "Clear", "Intentional"].map(trait => <span key={trait} className="px-4 py-2 bg-background rounded-full text-sm font-body text-foreground border border-border">
              {trait}
            </span>)}
        </div>
      </div>
    </div>;
};
export default BrandEssence;