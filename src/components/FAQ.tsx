import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What does the $20 evaluation include?",
      answer:
        "The evaluation includes a thorough review of your photos, a rough project scope, prioritized improvement recommendations, and a timeline estimate. Avil personally reviews each submission.",
    },
    {
      question: "How quickly will I hear back after submitting?",
      answer:
        "Avil responds to all evaluation requests within 48 business hours. You'll receive a detailed assessment and next steps for moving forward.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We primarily serve Bridgeport and surrounding areas including Fairfield County, Stamford, and nearby Connecticut communities. Contact us to confirm service availability for your location.",
    },
    {
      question: "Do you handle all aspects of bathroom renovation?",
      answer:
        "Yes, Avil manages the complete renovation process from design through construction, including plumbing, electrical, tiling, fixtures, and finishing work.",
    },
    {
      question: "What is your typical project timeline?",
      answer:
        "Project timelines vary based on scope and complexity. A typical bathroom renovation takes 2-4 weeks. Avil will provide a detailed timeline during your evaluation.",
    },
    {
      question: "Is the $20 evaluation fee refundable?",
      answer:
        "The evaluation fee is non-refundable but represents a valuable first step. If you proceed with the full project, the $20 is credited toward your final invoice.",
    },
  ];

  return (
    <section className="py-20 md:py-32 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground font-light">
            Everything you need to know about working with Avil
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card rounded-2xl px-6 shadow-soft border-none"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center p-6 bg-card rounded-2xl">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Privacy & Security:</strong> Your
            photos and information are stored securely and used solely for your
            project evaluation. We never share your data with third parties.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
