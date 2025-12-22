import { useState, useEffect } from "react";
import BrandBookHero from "@/components/brandbook/BrandBookHero";
import BrandBookNav from "@/components/brandbook/BrandBookNav";
import BrandEssence from "@/components/brandbook/BrandEssence";
import LogoGuidelines from "@/components/brandbook/LogoGuidelines";
import ColorPalette from "@/components/brandbook/ColorPalette";
import TypographyShowcase from "@/components/brandbook/TypographyShowcase";
import VoiceTone from "@/components/brandbook/VoiceTone";
import UIElements from "@/components/brandbook/UIElements";
import LayoutComposition from "@/components/brandbook/LayoutComposition";
import PhotographyStyle from "@/components/brandbook/PhotographyStyle";
import DigitalPrintApplications from "@/components/brandbook/DigitalPrintApplications";
import BrandPhilosophy from "@/components/brandbook/BrandPhilosophy";

const sections = [
  { id: "essence", label: "Brand Essence" },
  { id: "logo", label: "Logo Usage" },
  { id: "colors", label: "Color System" },
  { id: "typography", label: "Typography" },
  { id: "voice", label: "Voice & Tone" },
  { id: "ui", label: "UI Elements" },
  { id: "layout", label: "Layout" },
  { id: "photography", label: "Photography" },
  { id: "applications", label: "Applications" },
  { id: "philosophy", label: "Philosophy" },
];

const BrandBook = () => {
  const [activeSection, setActiveSection] = useState("essence");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id)
      }));

      for (const section of sectionElements) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <BrandBookHero />
      
      <div className="flex">
        <BrandBookNav 
          sections={sections} 
          activeSection={activeSection} 
          onSectionClick={scrollToSection} 
        />
        
        <main className="flex-1 lg:ml-64">
          <div className="max-w-5xl mx-auto px-6 md:px-12 py-20">
            <section id="essence" className="scroll-mt-24">
              <BrandEssence />
            </section>
            
            <section id="logo" className="scroll-mt-24 mt-32">
              <LogoGuidelines />
            </section>
            
            <section id="colors" className="scroll-mt-24 mt-32">
              <ColorPalette />
            </section>
            
            <section id="typography" className="scroll-mt-24 mt-32">
              <TypographyShowcase />
            </section>
            
            <section id="voice" className="scroll-mt-24 mt-32">
              <VoiceTone />
            </section>
            
            <section id="ui" className="scroll-mt-24 mt-32">
              <UIElements />
            </section>
            
            <section id="layout" className="scroll-mt-24 mt-32">
              <LayoutComposition />
            </section>
            
            <section id="photography" className="scroll-mt-24 mt-32">
              <PhotographyStyle />
            </section>
            
            <section id="applications" className="scroll-mt-24 mt-32">
              <DigitalPrintApplications />
            </section>
            
            <section id="philosophy" className="scroll-mt-24 mt-32 pb-32">
              <BrandPhilosophy />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BrandBook;
