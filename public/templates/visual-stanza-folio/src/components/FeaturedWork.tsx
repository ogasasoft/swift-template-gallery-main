import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const FeaturedWork = () => {
  const featured = [
    { id: 1, image: gallery1, title: "Portrait Series", category: "Portrait" },
    { id: 2, image: gallery2, title: "Mountain Dreams", category: "Landscape" },
    { id: 3, image: gallery3, title: "Urban Nights", category: "Street" },
  ];

  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Featured Work</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A curated selection of my recent projects
          </p>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featured.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer hover-lift"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-sm font-medium text-gold mb-2">{item.category}</p>
                  <h3 className="font-serif text-2xl font-bold">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/gallery">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              View Full Gallery
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
