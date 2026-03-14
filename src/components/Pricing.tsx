import { Button } from "@/components/ui/button";

const Pricing = () => {
  const scrollToContact = () => {
    const contact = document.getElementById("contact");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 id="pricing-heading" className="text-4xl font-bold text-center text-foreground mb-4">
          Pricing
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Basic plan includes template usage and content replacement. Additional options available upon request.
        </p>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-xl p-8 mb-8" style={{ boxShadow: "var(--card-shadow)" }}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 text-card-foreground font-semibold">Item</th>
                  <th className="text-right py-4 text-card-foreground font-semibold">Price (JPY)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-4 text-muted-foreground">Base template setup</td>
                  <td className="py-4 text-right text-card-foreground">¥50,000〜</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 text-muted-foreground">Extra images (per item)</td>
                  <td className="py-4 text-right text-card-foreground">¥3,000</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 text-muted-foreground">Text replacement (per 200 chars)</td>
                  <td className="py-4 text-right text-card-foreground">¥2,000</td>
                </tr>
                <tr>
                  <td className="py-4 text-muted-foreground">Extra page</td>
                  <td className="py-4 text-right text-card-foreground">¥15,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center mb-8">
            <p className="text-muted-foreground mb-6">
              <span className="font-semibold text-foreground">Delivery time:</span> Usually within 5–7 business days after receiving materials.
            </p>
            <Button size="lg" onClick={scrollToContact}>
              Request a Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
