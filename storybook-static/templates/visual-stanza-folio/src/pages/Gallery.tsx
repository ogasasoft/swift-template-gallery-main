import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  category: string;
  aspectRatio: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const galleryItems: GalleryItem[] = [
    { id: 1, image: gallery1, title: "Natural Light Portrait", category: "portrait", aspectRatio: "aspect-[2/3]" },
    { id: 2, image: gallery2, title: "Mountain Vista", category: "landscape", aspectRatio: "aspect-[3/2]" },
    { id: 3, image: gallery3, title: "Urban Wanderer", category: "street", aspectRatio: "aspect-[4/5]" },
    { id: 4, image: gallery4, title: "Coastal Serenity", category: "landscape", aspectRatio: "aspect-[3/2]" },
    { id: 5, image: gallery5, title: "Architectural Lines", category: "portrait", aspectRatio: "aspect-[2/3]" },
    { id: 6, image: gallery6, title: "Forest Mystique", category: "landscape", aspectRatio: "aspect-[4/5]" },
  ];

  const categories = [
    { value: "all", label: "All Work" },
    { value: "portrait", label: "Portraits" },
    { value: "landscape", label: "Landscapes" },
    { value: "street", label: "Street" },
  ];

  const filteredItems = filter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-4 bg-background">
        <div className="container mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">Gallery</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A collection of my work spanning portraits, landscapes, and urban photography
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 px-4 border-b border-border">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={filter === category.value ? "default" : "outline"}
                onClick={() => setFilter(category.value)}
                className={filter === category.value ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative overflow-hidden rounded-lg hover-lift">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-xs font-medium text-gold uppercase tracking-wide mb-1">
                        {item.category}
                      </p>
                      <h3 className="font-serif text-lg font-bold">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl p-0 bg-black border-0">
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <p className="text-sm font-medium text-gold uppercase tracking-wide mb-2">
                  {selectedImage.category}
                </p>
                <h3 className="font-serif text-2xl font-bold">{selectedImage.title}</h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Gallery;
