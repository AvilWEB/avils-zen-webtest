import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Upload, X, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RequestEstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RequestEstimateModal = ({
  isOpen,
  onClose,
}: RequestEstimateModalProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    description: "",
    height: "",
    heightUnit: "cm",
  });

  const [photos, setPhotos] = useState<File[]>([]);

  const progress = (step / 3) * 100;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => {
      const isValidType = file.type.startsWith("image/");
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      toast({
        title: "Some files were skipped",
        description: "Please upload only images under 10MB each.",
        variant: "destructive",
      });
    }

    setPhotos((prev) => [...prev, ...validFiles]);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    // Basic validation
    if (step === 1) {
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return;
      }
    }

    if (step === 2) {
      if (!formData.address || !formData.city || !formData.zip) {
        toast({
          title: "Missing information",
          description: "Please fill in all required address fields.",
          variant: "destructive",
        });
        return;
      }

      if (photos.length === 0) {
        toast({
          title: "Photos required",
          description: "Please upload at least one photo of your bathroom.",
          variant: "destructive",
        });
        return;
      }

      if (!formData.description || formData.description.length < 10) {
        toast({
          title: "Description too short",
          description:
            "Please provide a brief description of what you'd like (at least 10 characters).",
          variant: "destructive",
        });
        return;
      }
    }

    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // TODO: Integrate with Stripe and backend
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Success!",
        description:
          "Your request has been submitted. Avil will contact you within 48 hours.",
      });

      // Reset and close
      setFormData({
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        description: "",
        height: "",
        heightUnit: "cm",
      });
      setPhotos([]);
      setStep(1);
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Request Avil's Estimate
            </h2>
            <p className="text-muted-foreground">
              Step {step} of 3 — {step === 1 && "Contact Information"}
              {step === 2 && "Project Details"}
              {step === 3 && "Review & Payment"}
            </p>
          </div>

          {/* Progress Bar */}
          <Progress value={progress} className="h-2" />

          {/* Step 1: Contact */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number (optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (203) 555-0100"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Recommended for faster response
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Project Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">
                  Street Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="address"
                  placeholder="123 Main Street"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">
                    City <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="city"
                    placeholder="Bridgeport"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="zip">
                    ZIP Code <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="zip"
                    placeholder="06601"
                    value={formData.zip}
                    onChange={(e) =>
                      setFormData({ ...formData, zip: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <Label>
                  Upload Photos <span className="text-destructive">*</span>
                </Label>
                <div className="mt-2 border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    type="file"
                    id="photo-upload"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG up to 10MB (max 10 files)
                    </p>
                  </label>
                </div>

                {/* Photo Previews */}
                {photos.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="description">
                  What would you like to do?{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your bathroom renovation goals..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  maxLength={500}
                  required
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {formData.description.length}/500 characters
                </p>
              </div>

              <div>
                <Label htmlFor="height">Your standing height (optional)</Label>
                <div className="flex gap-2">
                  <Input
                    id="height"
                    type="number"
                    placeholder="170"
                    value={formData.height}
                    onChange={(e) =>
                      setFormData({ ...formData, height: e.target.value })
                    }
                  />
                  <Select
                    value={formData.heightUnit}
                    onValueChange={(value) =>
                      setFormData({ ...formData, heightUnit: value })
                    }
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="inches">in</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Payment */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-card rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-lg">Submission Summary</h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{formData.email}</span>
                  </div>
                  {formData.phone && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="font-medium">{formData.phone}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Address:</span>
                    <span className="font-medium">
                      {formData.address}, {formData.city} {formData.zip}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Photos:</span>
                    <span className="font-medium">{photos.length} uploaded</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 rounded-xl p-6 text-center">
                <p className="text-2xl font-bold text-foreground mb-2">
                  Evaluation Fee: $20
                </p>
                <p className="text-sm text-muted-foreground">
                  Secure payment via Stripe • Credited if you proceed with full
                  project
                </p>
              </div>

              {/* Placeholder for Stripe integration */}
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                <p className="text-muted-foreground">
                  Stripe payment form will be integrated here
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            <div className="ml-auto space-x-2">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              {step < 3 ? (
                <Button onClick={handleNext}>Next</Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Submit & Pay $20
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestEstimateModal;
