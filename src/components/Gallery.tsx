import { useState } from "react";
import { X } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
      alt: "Modern marble bathroom with natural lighting",
      category: "After",
    },
    {
      url: "https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=800&q=80",
      alt: "Elegant tile work detail",
      category: "Process",
    },
    {
      url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80",
      alt: "Luxury bathroom renovation completed",
      category: "After",
    },
    {
      url: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80",
      alt: "Custom shower installation",
      category: "Process",
    },
    {
      url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
      alt: "Contemporary bathroom design",
      category: "After",
    },
    {
      url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80",
      alt: "Detailed finishing work",
      category: "Process",
    },
  ];

  return (
    <section id="gallery" className="py-20 md:py-32 px-4 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Before / Process / After
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
            Witness the transformation. Every project is a testament to
            craftsmanship and care.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer shadow-soft hover:shadow-elegant transition-all duration-300"
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm rounded-lg font-medium">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Full size preview"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
