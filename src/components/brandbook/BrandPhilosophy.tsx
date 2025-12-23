const BrandPhilosophy = () => {
  return <div>
      <div className="mb-16">
        <span className="text-primary font-body text-sm tracking-widest uppercase">
          10 — Philosophy
        </span>
        <h2 className="font-heading text-4xl md:text-5xl text-foreground mt-4 mb-6">
          Our Promise
        </h2>
      </div>

      {/* Manifesto */}
      <div className="bg-gradient-to-br from-foreground to-foreground/90 rounded-3xl p-8 md:p-16 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <img src="/avils-logo.gif" alt="AVIL's Bathrooms" className="h-48 mx-auto mb-12 opacity-90" />
          
          <blockquote className="font-heading text-2xl md:text-4xl text-background leading-relaxed mb-8">
            "We don't just renovate bathrooms. We build relationships. 
            We make promises. We create long-term solutions designed 
            to serve your life — not trends."
          </blockquote>
          
          <div className="h-px w-24 bg-primary mx-auto mb-8" />
          
          <p className="font-body text-background/70 text-lg leading-relaxed">
            Every project begins with understanding. Every decision serves a purpose. 
            Every detail matters. This is not mass production — this is a direct 
            relationship between craftsman and client, built on trust, expertise, 
            and a shared vision for lasting quality.
          </p>
        </div>
      </div>

      {/* Core Beliefs */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="font-heading text-2xl text-primary">01</span>
          </div>
          <h3 className="font-heading text-xl text-foreground mb-2">Relationship First</h3>
          <p className="text-muted-foreground font-body text-sm">
            Direct connection between master and client. No intermediaries, no compromises.
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="font-heading text-2xl text-primary">02</span>
          </div>
          <h3 className="font-heading text-xl text-foreground mb-2">Purpose-Driven Design</h3>
          <p className="text-muted-foreground font-body text-sm">
            Every element serves your daily life. Form follows function, beauty follows both.
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="font-heading text-2xl text-primary">03</span>
          </div>
          <h3 className="font-heading text-xl text-foreground mb-2">Lasting Results</h3>
          <p className="text-muted-foreground font-body text-sm">
            Quality materials, precise execution, satisfaction that endures for years.
          </p>
        </div>
      </div>

      {/* Closing */}
      <div className="bg-card rounded-2xl p-8 md:p-12 border border-border text-center">
        <h3 className="font-heading text-2xl text-foreground mb-4">
          This Brand Book Is a Living Document
        </h3>
        <p className="text-muted-foreground font-body max-w-2xl mx-auto mb-8">
          As AVIL's Bathrooms grows and evolves, so will these guidelines. 
          The principles remain constant — the expressions may adapt. 
          Consistency builds trust. Trust builds relationships. 
          Relationships build legacy.
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-border" />
          <img src="/avils-logo.gif" alt="AVIL's" className="h-8 opacity-60" />
          <div className="h-px w-12 bg-border" />
        </div>
      </div>
    </div>;
};
export default BrandPhilosophy;