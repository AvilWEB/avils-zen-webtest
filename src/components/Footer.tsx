import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import PrivacyPolicyModal from "./PrivacyPolicyModal";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  return (
    <footer className="bg-foreground text-background py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <img 
              src="/avils-logo.gif" 
              alt="Avil's Bathrooms Logo" 
              className="w-[150px] h-[150px] mb-4"
            />
            <p className="text-background/80 leading-relaxed">
              Crafted for calm. Premium bathroom renovations in Bridgeport, CT
              and surrounding areas.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a 
                href="tel:+14753510934"
                className="flex items-center gap-3 text-background/80 hover:text-background transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+1 (475) 351-0934</span>
              </a>
              <a 
                href="mailto:info@avilsbathrooms.com"
                className="flex items-center gap-3 text-background/80 hover:text-background transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>info@avilsbathrooms.com</span>
              </a>
              <a
                href="https://share.google/yCNtC2qjCwrYvjpsk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-background/80 hover:text-background transition-colors"
              >
                <MapPin className="w-5 h-5" />
                <span>259 Willow St, Bridgeport, CT 06610</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a
                href="#gallery"
                className="block text-background/80 hover:text-background transition-colors"
              >
                Portfolio
              </a>
              <button
                onClick={() => setIsPrivacyModalOpen(true)}
                className="block text-background/80 hover:text-background transition-colors text-left"
              >
                Privacy Policy
              </button>
              <a
                href="#"
                className="block text-background/80 hover:text-background transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-background/80 hover:text-background transition-colors"
              >
                Google Business
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20 text-center text-background/60 text-sm">
          <p>
            © {currentYear} Avil's Bathrooms. All rights reserved. Licensed &
            Insured.
          </p>
        </div>
      </div>
      <PrivacyPolicyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)} 
      />
    </footer>
  );
};

export default Footer;
