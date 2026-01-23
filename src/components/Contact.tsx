import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Phone, MessageCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    templateId: "",
    message: "",
  });

  // ★ Inquiryボタンからのテンプレ選択イベントを受け取り、templateIdにセット
  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const selectedId = customEvent.detail;

      setFormData((prev) => ({
        ...prev,
        templateId: selectedId,
      }));
    };

    window.addEventListener("template-selected", handler);
    return () => window.removeEventListener("template-selected", handler);
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error("Please fill in required fields");
      return;
    }

    toast.success("Inquiry sent successfully!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      templateId: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-foreground mb-4">
          Contact
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Send us your inquiry or request a quote
        </p>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-xl p-8 mb-8" style={{ boxShadow: "var(--card-shadow)" }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="template-id">Template ID</Label>
                <Input
                  id="template-id"
                  value={formData.templateId}
                  onChange={(e) => setFormData({ ...formData, templateId: e.target.value })}
                  placeholder="e.g., cafe-01"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Note about image/text replacement or any questions..."
                  rows={5}
                  className="mt-2"
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Send Inquiry
              </Button>
            </form>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Or contact us directly:</p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <a href="mailto:info@templatelab.com" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="tel:+81-3-1234-5678" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://line.me" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  LINE
                </a>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              info@templatelab.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
