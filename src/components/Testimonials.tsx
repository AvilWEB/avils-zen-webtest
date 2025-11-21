import { Star, Shield, Award } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Andy And Erin Bosco",
      location: "Fairfield County",
      text: "Avil transformed our master bathroom into a spa-like retreat. His attention to detail and commitment to quality is unmatched.",
      rating: 5,
    },
    {
      name: "Michael R.",
      location: "Bridgeport",
      text: "Professional, punctual, and perfection-driven. Avil's European training really shows in the craftsmanship.",
      rating: 5,
    },
    {
      name: "Jennifer K.",
      location: "Stamford",
      text: "From consultation to completion, the experience was seamless. Our bathroom is now the most beautiful room in our home.",
      rating: 5,
    },
  ];

  const badges = [
    { icon: Shield, text: "Licensed & Insured" },
    { icon: Award, text: "20+ Years Experience" },
    { icon: Star, text: "5-Star Rated" },
  ];

  return (
    <section className="py-20 md:py-32 px-4 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Trusted by Homeowners
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
            Excellence recognized by those who matter most — our clients.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-8 shadow-soft hover:shadow-elegant transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div>
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-border">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <badge.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="font-medium text-foreground">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
