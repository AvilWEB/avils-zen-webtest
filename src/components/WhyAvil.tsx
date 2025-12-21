import { Award, Users, Heart } from "lucide-react";
const WhyAvil = () => {
  const highlights = [{
    icon: Award,
    title: "20+ Years Experience",
    description: "Mastery refined over two decades of dedicated craftsmanship"
  }, {
    icon: Users,
    title: "European Training",
    description: "Traditional techniques combined with modern innovation"
  }, {
    icon: Heart,
    title: "Master-to-Client Direct",
    description: "Personal attention from consultation through completion"
  }];
  return <section className="py-20 md:py-32 px-4 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Why Avil's Bathrooms</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
            Every bathroom tells a story. With Avil, yours will speak of quiet
            luxury, thoughtful design, and uncompromising quality.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((item, index) => <div key={index} className="bg-background rounded-2xl p-8 shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default WhyAvil;