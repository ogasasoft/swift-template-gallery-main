import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-xl font-semibold text-foreground">TemplateLab</div>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("gallery")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Gallery
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </button>

          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            onClick={() => scrollToSection("contact")}
          >
            Inquiry
          </Button>
        </nav>

        <button
          className="md:hidden text-foreground"
          onClick={() => scrollToSection("gallery")}
        >
          Menu
        </button>
      </div>
    </header>
  );
};

export default Header;
