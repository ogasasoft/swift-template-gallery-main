import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import photographerPortrait from "@/assets/photographer-portrait.jpg";
import { Camera, Award, Users, Globe } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Camera, value: "10+", label: "Years Experience" },
    { icon: Award, value: "25+", label: "Awards Won" },
    { icon: Users, value: "500+", label: "Happy Clients" },
    { icon: Globe, value: "30+", label: "Countries Visited" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-4 bg-background">
        <div className="container mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">About Me</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate about storytelling through the lens
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Portrait */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <img
                  src={photographerPortrait}
                  alt="Alex Rivers"
                  className="w-full rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gold/20 rounded-lg -z-10" />
              </div>
            </div>

            {/* Bio */}
            <div className="order-1 lg:order-2">
              <h2 className="font-serif text-4xl font-bold mb-6">Hello, I'm Alex</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  For over a decade, I've dedicated my life to capturing the extraordinary beauty 
                  in everyday moments. My journey began with a simple camera and an insatiable 
                  curiosity about the world around me.
                </p>
                <p>
                  What started as a hobby quickly evolved into a lifelong passion. I specialize in 
                  portrait, landscape, and street photography, always seeking to tell compelling 
                  stories through my lens.
                </p>
                <p>
                  My work has been featured in numerous international publications and exhibitions. 
                  I believe that great photography is not just about technical perfection, but about 
                  capturing genuine emotion and authentic moments.
                </p>
                <blockquote className="border-l-4 border-gold pl-4 italic text-foreground font-serif text-lg mt-8">
                  "Photography is the art of frozen time... the ability to store emotion and 
                  feelings within a frame."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-gold" />
                    </div>
                  </div>
                  <div className="font-serif text-4xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Services</h2>
            <p className="text-muted-foreground text-lg">What I can do for you</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-border rounded-lg hover:border-gold transition-colors">
              <h3 className="font-serif text-2xl font-bold mb-4">Portrait Sessions</h3>
              <p className="text-muted-foreground">
                Professional portrait photography for individuals, families, and corporate clients. 
                Capturing personality and emotion in every frame.
              </p>
            </div>
            
            <div className="p-8 border border-border rounded-lg hover:border-gold transition-colors">
              <h3 className="font-serif text-2xl font-bold mb-4">Editorial Work</h3>
              <p className="text-muted-foreground">
                Creative editorial photography for magazines, brands, and publications. 
                Bringing concepts and stories to life through imagery.
              </p>
            </div>
            
            <div className="p-8 border border-border rounded-lg hover:border-gold transition-colors">
              <h3 className="font-serif text-2xl font-bold mb-4">Fine Art Prints</h3>
              <p className="text-muted-foreground">
                Limited edition fine art prints available for collectors. Each piece is 
                carefully printed and hand-signed for authenticity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
