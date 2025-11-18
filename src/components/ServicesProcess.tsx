import { MessageSquare, Palette, Hammer } from "lucide-react";
const ServicesProcess = () => {
  const steps = [{
    icon: MessageSquare,
    title: "Consult",
    description: "We begin with understanding your vision, space, and lifestyle needs",
    number: "01"
  }, {
    icon: Palette,
    title: "Design",
    description: "Custom design solutions that blend aesthetics with functionality",
    number: "02"
  }, {
    icon: Hammer,
    title: "Build",
    description: "Meticulous execution with attention to every detail and finish",
    number: "03"
  }];
  return <section className="py-20 md:py-32 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Services / Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
            A seamless journey from concept to completion, guided by experience
            and dedication.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, index) => <div key={index} className="relative">
              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-border -z-10" />}

              <div className="text-center">
                {/* Number Badge */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-lg mb-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-20 h-20 bg-card rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default ServicesProcess;