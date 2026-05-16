import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const [searchParams] = useSearchParams();

  // URLからタグを復元
  const tagsFromUrl = searchParams.get("tags");
  const initialTags = tagsFromUrl ? tagsFromUrl.split(",") : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Gallery initialTags={initialTags} />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
