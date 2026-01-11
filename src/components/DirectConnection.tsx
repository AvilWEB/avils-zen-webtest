const DirectConnection = () => {
  return (
    <section className="py-20 md:py-32 px-4 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
          How We Work Together
        </h2>
        <p className="text-xl text-muted-foreground font-light mb-12">
          A direct, personal approach to bathroom renovation
        </p>

        <div className="text-left space-y-6 mb-12">
          <p className="text-lg text-foreground leading-relaxed">
            When you reach out, you're not passed between departments or handed off to a sales team. 
            You're starting a conversation with the person who will understand your space, guide your decisions, 
            and ultimately deliver the finished result.
          </p>
          <p className="text-lg text-foreground leading-relaxed">
            This direct relationship means your priorities stay central — from initial ideas through final details. 
            Questions get answered quickly. Decisions are made with care. And the work reflects what you actually need, 
            not what's easiest to sell.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Clarity</h3>
            <p className="text-muted-foreground">
              One point of contact from start to finish
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Quality</h3>
            <p className="text-muted-foreground">
              Standards maintained without compromise
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Longevity</h3>
            <p className="text-muted-foreground">
              Built to last, not just to impress
            </p>
          </div>
        </div>

        <p className="text-muted-foreground text-base max-w-2xl mx-auto">
          This approach works best for clients who value a thoughtful process over a fast transaction — 
          and who want a bathroom that still feels right years from now.
        </p>
      </div>
    </section>
  );
};

export default DirectConnection;
