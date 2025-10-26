import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Avil's Bathrooms</h3>
            <p className="text-background/80 leading-relaxed">
              Crafted for calm. Premium bathroom renovations in Bridgeport, CT
              and surrounding areas.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-background/80">
                <Phone className="w-5 h-5" />
                <span>(203) 555-0100</span>
              </div>
              <div className="flex items-center gap-3 text-background/80">
                <Mail className="w-5 h-5" />
                <span>info@avilsbathrooms.com</span>
              </div>
              <div className="flex items-center gap-3 text-background/80">
                <MapPin className="w-5 h-5" />
                <span>Bridgeport, CT</span>
              </div>
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
              <a
                href="#"
                className="block text-background/80 hover:text-background transition-colors"
              >
                Privacy Policy
              </a>
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
    </footer>
  );
};

export default Footer;
