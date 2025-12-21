import { useState } from "react";
import { X, Play } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import beforeAAA from "@/assets/before-AAA.jpg";
import afterAAA from "@/assets/after-AAA.jpg";
import beforeBBB from "@/assets/before-BBB.jpg";
import afterBBB from "@/assets/after-BBB.jpg";
import beforeCCC from "@/assets/before-CCC.jpg";
import afterCCC from "@/assets/after-CCC.jpg";
import thumbnailAndyErin from "@/assets/thumbnail-andy-erin.jpg";
import thumbnailDave from "@/assets/thumbnail-dave.jpg";
import thumbnailMichelleCraine from "@/assets/thumbnail-michelle-craine.jpg";

const Gallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = [
    {
      video: "/videos/bathroom-andy-erin.mp4",
      thumbnail: thumbnailAndyErin,
      description: "Andy and Erin bathroom in Sandyhook",
    },
    {
      video: "/videos/bathroom-dave.mp4",
      thumbnail: thumbnailDave,
      description: "Daves bathroom in Brookfield",
    },
    {
      video: "/videos/bathroom-michelle-craine.mp4",
      thumbnail: thumbnailMichelleCraine,
      description: "Michelle Craine bathroom in Connecticut",
    },
  ];

  const beforeAfterComparisons = [
    {
      before: beforeAAA,
      after: afterAAA,
      beforeAlt: "Bathroom before renovation - outdated purple walls",
      afterAlt: "Bathroom after renovation - elegant dark tile and freestanding tub",
      title: "Modern Elegance",
    },
    {
      before: beforeBBB,
      after: afterBBB,
      beforeAlt: "Bathroom before renovation - dated design",
      afterAlt: "Bathroom after renovation - luxury clawfoot tub",
      title: "Classic Luxury",
    },
    {
      before: beforeCCC,
      after: afterCCC,
      beforeAlt: "Bathroom during renovation - construction phase",
      afterAlt: "Bathroom after renovation - modern spa retreat",
      title: "Spa Retreat",
    },
  ];

  return (
    <section id="gallery" className="py-20 md:py-32 bg-card">
      <div className="max-w-[1800px] mx-auto">
        <div className="text-center mb-16 px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Before / Process / After
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
            Witness the transformation. Every project is a testament to
            craftsmanship and care.
          </p>
        </div>

        {/* Before/After Sliders Section */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold mb-10 text-foreground text-center px-4">
            Interactive Comparisons
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
            {beforeAfterComparisons.map((comparison, index) => (
              <div key={index} className="flex flex-col">
                <p className="text-base font-medium text-muted-foreground mb-3 text-center">
                  {comparison.title}
                </p>
                <BeforeAfterSlider
                  beforeImage={comparison.before}
                  afterImage={comparison.after}
                  beforeAlt={comparison.beforeAlt}
                  afterAlt={comparison.afterAlt}
                  aspectRatio="5/7"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Video Gallery */}
        <div className="px-4">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-foreground text-center">
            Project Videos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {videos.map((item, index) => (
              <div
                key={index}
                className="group relative aspect-video overflow-hidden rounded-2xl cursor-pointer shadow-soft hover:shadow-elegant transition-all duration-300"
                onClick={() => setSelectedVideo(item.video)}
              >
                <img
                  src={item.thumbnail}
                  alt={item.description}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <p className="text-white text-sm md:text-base font-medium relative z-10">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Lightbox */}
        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10"
              onClick={() => setSelectedVideo(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="max-h-[90vh] max-w-[90vw] rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
