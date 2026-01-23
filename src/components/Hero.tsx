import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToGallery = () => {
    const gallery = document.getElementById("gallery");
    if (gallery) {
      gallery.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-16" style={{ background: "var(--hero-gradient)" }}>
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
          See it. Choose it. Get it fast.
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          Pick a design from our gallery and receive your customized site with your own text and images.
        </p>
        <Button
          size="lg"
          onClick={scrollToGallery}
          className="text-lg px-8 py-6"
        >
          View Gallery
        </Button>
      </div>
    </section>
  );
};

export default Hero;
