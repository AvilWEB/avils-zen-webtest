import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet";
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
import DesignTokens from "@/components/brandbook/DesignTokens";
import ComponentTemplates from "@/components/brandbook/ComponentTemplates";
import CopyMessaging from "@/components/brandbook/CopyMessaging";
const sections = [{
  id: "essence",
  label: "Brand Essence"
}, {
  id: "logo",
  label: "Logo Usage"
}, {
  id: "colors",
  label: "Color System"
}, {
  id: "typography",
  label: "Typography"
}, {
  id: "voice",
  label: "Voice & Tone"
}, {
  id: "ui",
  label: "UI Elements"
}, {
  id: "layout",
  label: "Layout"
}, {
  id: "photography",
  label: "Photography"
}, {
  id: "templates",
  label: "Component Templates"
}, {
  id: "philosophy",
  label: "Philosophy"
}, {
  id: "tokens",
  label: "Design Tokens"
}, {
  id: "applications",
  label: "Applications"
}];

// JSON-LD structured data for AI and search engines
const brandJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AVIL's Bathrooms",
  "description": "Premium bathroom remodeling services in Houston, Texas. Crafting luxury bathroom transformations with quality craftsmanship.",
  "url": "https://avilsbathrooms.com",
  "logo": "https://avilsbathrooms.com/logos/logo-gold.png",
  "brand": {
    "@type": "Brand",
    "name": "AVIL's Bathrooms",
    "slogan": "Crafting Your Perfect Sanctuary",
    "description": "Luxury bathroom remodeling"
  },
  "sameAs": [],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["English"]
  },
  "additionalProperty": [{
    "@type": "PropertyValue",
    "name": "primaryColor",
    "value": "#8AAB1C"
  }, {
    "@type": "PropertyValue",
    "name": "secondaryColor",
    "value": "#7F909A"
  }, {
    "@type": "PropertyValue",
    "name": "accentColor",
    "value": "#FFD700"
  }, {
    "@type": "PropertyValue",
    "name": "backgroundColor",
    "value": "#E8E3D7"
  }, {
    "@type": "PropertyValue",
    "name": "headingFont",
    "value": "Cotta"
  }, {
    "@type": "PropertyValue",
    "name": "bodyFont",
    "value": "Helvetica"
  }, {
    "@type": "PropertyValue",
    "name": "logoFont",
    "value": "Berova"
  }]
};
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
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };
  return <div className="min-h-screen bg-background">
      <Helmet>
        <title>Brand Book | AVIL's Bathrooms - Complete Brand Guidelines</title>
        <meta name="description" content="Complete brand guidelines for AVIL's Bathrooms. Includes logo usage, color palette, typography, design tokens, templates, and messaging guidelines for consistent brand implementation." />
        <meta name="keywords" content="AVIL's Bathrooms, brand guidelines, brand book, design system, logo, colors, typography, templates" />
        <script type="application/ld+json">
          {JSON.stringify(brandJsonLd)}
        </script>
      </Helmet>

      <div className="relative">
        <BrandBookHero />
      </div>
      
      <div>
        <main className="flex-1">
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
            
            <section id="templates" className="scroll-mt-24 mt-32">
              <ComponentTemplates />
            </section>
            
            <section id="philosophy" className="scroll-mt-24 mt-32">
              <BrandPhilosophy />
            </section>

            <section id="tokens" className="scroll-mt-24 mt-32">
              <DesignTokens />
            </section>

            <section id="applications" className="scroll-mt-24 mt-32">
              <DigitalPrintApplications />
            </section>
            
            {/* Back to Website Button */}
            <div className="mt-32 pb-32 text-center">
              <Link to="/" className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-body text-lg hover:bg-primary/90 transition-colors group">
                Visit Main Website
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>;
};
export default BrandBook;