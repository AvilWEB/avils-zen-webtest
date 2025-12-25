import businessCardDark from "@/assets/business-card-dark.png";
import businessCardLight from "@/assets/business-card-light.png";
import estimatePreview from "@/assets/estimate-template-preview.jpg";
const DigitalPrintApplications = () => {
  return <div>
      <div className="mb-16">
        <span className="text-primary font-body text-sm tracking-widest uppercase">
          09 — Applications
        </span>
        <h2 className="font-heading text-4xl md:text-5xl text-foreground mt-4 mb-6">
          Digital & Print
        </h2>
        <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-3xl">
          Consistent application across all touchpoints reinforces brand recognition 
          and builds trust with every interaction.
        </p>
      </div>

      {/* Website Sections */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Website Sections</h3>
        <div className="bg-foreground rounded-2xl p-4 overflow-hidden">
          <video src="/videos/website-sample.mov" autoPlay loop muted playsInline className="w-full rounded-xl" />
        </div>
        <p className="text-muted-foreground font-body text-sm mt-4">
          Website design showcasing brand consistency across digital touchpoints
        </p>
      </div>

      {/* Business Cards */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Business Cards</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <img src={businessCardDark} alt="Avil's Bathrooms Business Card - Dark Version" className="w-full rounded-2xl shadow-lg" />
          <img src={businessCardLight} alt="Avil's Bathrooms Business Card - Light Version" className="w-full rounded-2xl shadow-lg" />
        </div>
      </div>

      {/* Social Media */}
      

      {/* Invoice/Estimate */}
      <div>
        <h3 className="font-heading text-2xl text-foreground mb-6">Documents</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card rounded-2xl p-6 border border-border">
            <img src={estimatePreview} alt="AVIL's Bathrooms Estimate Template" className="w-full rounded-xl shadow-lg" />
          </div>
          <div className="flex flex-col justify-center">
            <h4 className="font-heading text-xl text-foreground mb-4">Project Estimate</h4>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              Professional estimate documents feature the brand's signature gold logo, 
              clean table layouts for cost breakdowns, and consistent typography throughout.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground font-body">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Clean layout with prominent logo placement
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Organized cost breakdown tables
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Consistent brand typography
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Professional contact information footer
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>;
};
export default DigitalPrintApplications;