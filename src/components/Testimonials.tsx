import { Star, Shield, Award, Play } from "lucide-react";
import { useState } from "react";
import VideoTestimonialModal from "./VideoTestimonialModal";
import testimonialAndyErinCover from "@/assets/testimonial-andy-erin-cover.jpg";
import testimonialDaveCover from "@/assets/testimonial-dave-cover.jpg";
import testimonialMichelleCover from "@/assets/testimonial-michelle-craine-cover.jpg";
const Testimonials = () => {
  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    name: string;
  } | null>(null);
  const testimonials = [{
    name: "Andy And Erin Bosco",
    location: "Sandyhook, CT",
    text: "The whole process was perfect. So very communicative, super respectful about our schedule. We have a family, we've got kids. We had a whole thing built outside the bathroom to keep the dust and the construction to a minimum, which is wonderful.",
    rating: 5,
    hasVideo: true,
    videoCover: testimonialAndyErinCover,
    videoUrl: "/testimonial-andy-erin.mp4"
  }, {
    name: "Dave",
    location: "Brookfield, CT",
    text: "Very happy for the job very professional, neat polite. Couldn't be a better job thank you.",
    rating: 5,
    hasVideo: true,
    videoCover: testimonialDaveCover,
    videoUrl: "/testimonial-dave.mp4"
  }, {
    name: "Michelle Craine",
    location: "Newtown, CT",
    text: "The attention to details was phenomenal. It came out beautiful and year later we still absolutely love it.",
    rating: 5,
    hasVideo: true,
    videoCover: testimonialMichelleCover,
    videoUrl: "/testimonial-michelle-craine.mp4"
  }];
  const badges = [{
    icon: Shield,
    text: "Licensed & Insured"
  }, {
    icon: Award,
    text: "20+ Years Experience"
  }, {
    icon: Star,
    text: "5-Star Rated"
  }];
  return <section className="py-20 md:py-32 px-4 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Trusted by Homeowners
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">Excellence recognized by those who matter most - our clients.</p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => <div key={index} className="bg-background rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300">
              {/* Video Thumbnail (if available) */}
              {testimonial.hasVideo && <div className="relative cursor-pointer group overflow-hidden" onClick={() => setActiveVideo({
            url: testimonial.videoUrl,
            name: testimonial.name
          })}>
                  <img src={testimonial.videoCover} alt={`${testimonial.name} testimonial video`} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/50 transition-all flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>}

              <div className="p-8">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-accent text-accent" />)}
                </div>

                {/* Quote */}
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>)}
        </div>

        {/* Video Modal */}
        <VideoTestimonialModal isOpen={!!activeVideo} onClose={() => setActiveVideo(null)} videoUrl={activeVideo?.url || ""} customerName={activeVideo?.name || ""} />

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-border">
          {badges.map((badge, index) => <div key={index} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <badge.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="font-medium text-foreground">{badge.text}</span>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Testimonials;