import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Upload, X, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { compressImage, blobToBase64, type CompressedImage } from "@/lib/imageUtils";

const MAX_PHOTOS = 10;

interface RequestEstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PhotoFile {
  blob: Blob;
  preview: string;
  originalName: string;
  compressedSize: number;
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
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    description: "",
    priorities: "",
  });

  const [photos, setPhotos] = useState<PhotoFile[]>([]);

  const progress = (step / 3) * 100;

  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Check if adding these files would exceed the limit
    const remainingSlots = MAX_PHOTOS - photos.length;
    if (remainingSlots <= 0) {
      toast({
        title: "Maximum photos reached",
        description: `You can upload a maximum of ${MAX_PHOTOS} photos.`,
        variant: "destructive",
      });
      return;
    }
    
    // Limit files to remaining slots
    const filesToProcess = files.slice(0, remainingSlots);
    if (files.length > remainingSlots) {
      toast({
        title: "Some files were skipped",
        description: `Only ${remainingSlots} more photo(s) can be added. Maximum is ${MAX_PHOTOS}.`,
        variant: "destructive",
      });
    }
    
    const validFiles = filesToProcess.filter((file) => {
      const isValidType = file.type.startsWith("image/");
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });

    if (validFiles.length !== filesToProcess.length) {
      toast({
        title: "Some files were skipped",
        description: "Please upload only images under 10MB each.",
        variant: "destructive",
      });
    }

    if (validFiles.length === 0) return;

    setIsCompressing(true);
    
    try {
      // Compress each file
      for (const file of validFiles) {
        const compressed = await compressImage(file);
        setPhotos((prev) => [
          ...prev,
          {
            blob: compressed.blob,
            preview: compressed.preview,
            originalName: compressed.originalName,
            compressedSize: compressed.compressedSize,
          },
        ]);
      }
      
      const totalSaved = validFiles.reduce((acc, f) => acc + f.size, 0);
      console.log(`Compressed ${validFiles.length} images, original total: ${(totalSaved / 1024).toFixed(0)}KB`);
    } catch (error) {
      console.error("Error compressing images:", error);
      toast({
        title: "Error processing images",
        description: "Some images could not be compressed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCompressing(false);
    }
  };

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(photos[index].preview);
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    // Basic validation
    if (step === 1) {
      if (!formData.name || formData.name.trim().length < 2) {
        toast({
          title: "Name required",
          description: "Please enter your name (at least 2 characters).",
          variant: "destructive",
        });
        return;
      }
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

  const MAKE_WEBHOOK_URL = "https://hook.eu2.make.com/wrnxhxamaqnecwlwqpojh281so1fx94y";

  // Send form data and photos to Make.com webhook using FormData (multipart/form-data)
  const sendToMakeWebhook = async () => {
    const webhookFormData = new FormData();
    
    // Add all form fields
    webhookFormData.append("name", formData.name);
    webhookFormData.append("email", formData.email);
    webhookFormData.append("phone", formData.phone || "");
    webhookFormData.append("address", formData.address);
    webhookFormData.append("city", formData.city);
    webhookFormData.append("zip", formData.zip);
    webhookFormData.append("description", formData.description);
    webhookFormData.append("priorities", formData.priorities || "");
    webhookFormData.append("submittedAt", new Date().toISOString());
    webhookFormData.append("photoCount", photos.length.toString());
    
    // Add each compressed photo as actual file (multipart/form-data)
    photos.forEach((photo, index) => {
      webhookFormData.append(`photo_${index + 1}`, photo.blob, photo.originalName);
    });

    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        body: webhookFormData,
        // No Content-Type header - browser sets it automatically with boundary for multipart/form-data
      });
      console.log("Form data sent to Make.com webhook successfully", response.status);
    } catch (error) {
      console.error("Error sending to Make.com webhook:", error);
      // Don't throw - we still want the payment flow to continue
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      console.log("Processing submission...");

      // Send data to Make.com webhook first (non-blocking for payment flow)
      sendToMakeWebhook();

      // Convert compressed blobs to base64 for edge function
      const photosWithBase64 = await Promise.all(
        photos.map(async (p) => ({
          type: "image/jpeg",
          data: `data:image/jpeg;base64,${await blobToBase64(p.blob)}`,
        }))
      );

      // Process submission first
      const { data: submissionData, error: submissionError } = await supabase.functions.invoke(
        "process-submission",
        {
          body: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            zip: formData.zip,
            description: formData.description,
            priorities: formData.priorities,
            photos: photosWithBase64,
          },
        }
      );

      if (submissionError) throw submissionError;

      console.log("Submission processed:", submissionData);

      // Create payment session
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke(
        "create-payment",
        {
          body: {
            email: formData.email,
            submissionId: submissionData.submissionId,
          },
        }
      );

      if (paymentError) throw paymentError;

      console.log("Payment session created");

      // Redirect to Stripe checkout
      if (paymentData.url) {
        window.location.href = paymentData.url;
      }
    } catch (error: any) {
      console.error("Error submitting:", error);
      toast({
        title: "Error",
        description:
          error.message || "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      // Clean up previews
      photos.forEach((photo) => URL.revokeObjectURL(photo.preview));
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        description: "",
        priorities: "",
      });
      setPhotos([]);
      setStep(1);
      onClose();
    }
  };

  const isUploadDisabled = isCompressing || photos.length >= MAX_PHOTOS;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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
                <Label htmlFor="name">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

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
                <div className={`mt-2 border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                  isUploadDisabled 
                    ? "border-muted bg-muted/30 cursor-not-allowed" 
                    : "border-border hover:border-primary cursor-pointer"
                }`}>
                  <input
                    type="file"
                    id="photo-upload"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isUploadDisabled}
                  />
                  <label
                    htmlFor="photo-upload"
                    className={`flex flex-col items-center gap-2 ${isUploadDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    {isCompressing ? (
                      <>
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <p className="text-sm text-muted-foreground">
                          Compressing images...
                        </p>
                      </>
                    ) : photos.length >= MAX_PHOTOS ? (
                      <>
                        <Check className="w-8 h-8 text-primary" />
                        <p className="text-sm text-muted-foreground">
                          Maximum {MAX_PHOTOS} photos reached
                        </p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          JPG, PNG up to 10MB • Max {MAX_PHOTOS} photos ({photos.length}/{MAX_PHOTOS}) • Auto-compressed
                        </p>
                      </>
                    )}
                  </label>
                </div>

                {/* Photo Previews */}
                {photos.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo.preview}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
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
                <Label htmlFor="priorities" className="text-foreground/90">
                  What matters most to you in this renovation?
                </Label>
                <Textarea
                  id="priorities"
                  placeholder="Quality, longevity, daily comfort... share what's important to you."
                  value={formData.priorities}
                  onChange={(e) =>
                    setFormData({ ...formData, priorities: e.target.value })
                  }
                  rows={3}
                  maxLength={500}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground/70 mt-2 italic">
                  This helps us understand your priorities
                </p>
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
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
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
                    <span className="font-medium text-right">
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
                  Evaluation Fee: $100
                </p>
                <p className="text-sm text-muted-foreground">
                  Secure payment via Stripe • Credited if you proceed with full
                  project
                </p>
              </div>

              <div className="bg-muted/50 rounded-xl p-6 text-sm text-muted-foreground">
                <p>
                  By clicking "Submit & Pay", you'll be redirected to Stripe's
                  secure checkout page to complete your payment. After successful
                  payment, you'll receive a confirmation email and Avil will
                  contact you within 48 business hours.
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>
                Back
              </Button>
            )}
            <div className="ml-auto space-x-2">
              <Button variant="ghost" onClick={handleClose} disabled={isSubmitting}>
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
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Submit & Pay $100
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
