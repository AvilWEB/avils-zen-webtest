import { useState } from "react";
import Hero from "@/components/Hero";
import WhyAvil from "@/components/WhyAvil";
import ServicesProcess from "@/components/ServicesProcess";
import Gallery from "@/components/Gallery";
import DirectConnection from "@/components/DirectConnection";
import EvaluationDetails from "@/components/EvaluationDetails";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import RequestEstimateModal from "@/components/RequestEstimateModal";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <WhyAvil />
      <ServicesProcess />
      <Gallery />
      <DirectConnection />
      <EvaluationDetails onOpenModal={() => setIsModalOpen(true)} />
      <Testimonials />
      <FAQ />
      <Footer />
      <StickyCTA onOpenModal={() => setIsModalOpen(true)} />
      <RequestEstimateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
