import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import glassTexture from "@/assets/glass-texture.jpg";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal = ({ isOpen, onClose }: PrivacyPolicyModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-3xl max-h-[85vh] p-0 border-0 bg-transparent shadow-2xl"
        style={{
          backgroundImage: `url(${glassTexture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div 
          className="relative backdrop-blur-xl bg-background/40 rounded-3xl border border-background/20 overflow-hidden"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <DialogHeader className="p-8 pb-4">
            <DialogTitle className="text-3xl font-bold text-foreground">
              Privacy Policy
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[calc(85vh-120px)] px-8 pb-8">
            <div className="space-y-6 text-foreground/90">
              <section>
                <h3 className="text-xl font-semibold mb-3">1. Information We Collect</h3>
                <p className="leading-relaxed">
                  We collect information you provide directly to us when requesting an estimate, 
                  including your name, email address, phone number, physical address, and photos 
                  of your bathroom. We also collect payment information processed securely through 
                  Stripe.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">2. How We Use Your Information</h3>
                <p className="leading-relaxed mb-2">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide you with bathroom renovation estimates and consultations</li>
                  <li>Process your payments securely</li>
                  <li>Communicate with you about your project</li>
                  <li>Improve our services and customer experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">3. Information Sharing</h3>
                <p className="leading-relaxed">
                  We do not sell or rent your personal information to third parties. We may share 
                  your information with service providers who assist us in operating our business, 
                  such as payment processors (Stripe) and cloud storage providers, but only to the 
                  extent necessary to provide our services.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">4. Data Security</h3>
                <p className="leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or 
                  destruction. Your payment information is processed securely through Stripe and 
                  is never stored on our servers.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">5. Your Photos</h3>
                <p className="leading-relaxed">
                  Photos you submit of your bathroom are stored securely in our private cloud 
                  storage and are only accessible to authorized personnel for the purpose of 
                  providing you with renovation estimates. We do not use your photos for marketing 
                  purposes without your explicit written consent.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">6. Your Rights</h3>
                <p className="leading-relaxed mb-2">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent where we rely on it</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">7. Cookies and Tracking</h3>
                <p className="leading-relaxed">
                  We use essential cookies to ensure our website functions properly. We do not 
                  use third-party tracking cookies or advertising cookies without your consent.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">8. Changes to This Policy</h3>
                <p className="leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of any 
                  material changes by posting the new policy on this page and updating the "Last 
                  updated" date.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">9. Contact Us</h3>
                <p className="leading-relaxed">
                  If you have any questions about this privacy policy or our data practices, 
                  please contact us at:
                </p>
                <div className="mt-4 p-4 bg-background/20 rounded-xl border border-background/20">
                  <p className="font-medium">Avil's Bathrooms</p>
                  <p>259 Willow St</p>
                  <p>Bridgeport, CT 06610</p>
                  <p className="mt-2">
                    Email: <a href="mailto:info@avilsbathrooms.com" className="text-primary hover:underline">info@avilsbathrooms.com</a>
                  </p>
                  <p>
                    Phone: <a href="tel:+14753510934" className="text-primary hover:underline">+1 (475) 351-0934</a>
                  </p>
                </div>
              </section>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicyModal;
