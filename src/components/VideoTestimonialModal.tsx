import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";

interface VideoTestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  customerName: string;
}

const VideoTestimonialModal = ({
  isOpen,
  onClose,
  videoUrl,
  customerName,
}: VideoTestimonialModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="backdrop-blur-md bg-background/80" />
      <DialogContent className="max-w-4xl w-full p-0 border-0 bg-transparent shadow-none">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-elegant">
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-full"
            aria-label={`Video testimonial from ${customerName}`}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoTestimonialModal;
