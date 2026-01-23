import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Template {
  id: string;
  title: string;
  tags: string[];
  thumb: string;
  preview_path: string;
}

interface TemplateCardProps {
  template: Template;
  onPreview: () => void;
}

const TemplateCard = ({ template, onPreview }: TemplateCardProps) => {
  const scrollToContact = (templateId: string) => {
  const contact = document.getElementById("contact");
  if (contact) {
    contact.scrollIntoView({ behavior: "smooth" });
  }

  // Contact コンポーネントに「このテンプレが選ばれた」と通知する
  window.dispatchEvent(
    new CustomEvent("template-selected", { detail: templateId })
  );
};


  return (
    <div className="group bg-card rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
         style={{ boxShadow: "var(--card-shadow)" }}
         onMouseEnter={(e) => e.currentTarget.style.boxShadow = "var(--card-shadow-hover)"}
         onMouseLeave={(e) => e.currentTarget.style.boxShadow = "var(--card-shadow)"}>
      <div className="aspect-video overflow-hidden">
        <img
          src={template.thumb}
          alt={template.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-card-foreground mb-2">
          {template.title}
        </h3>
        <div className="flex gap-2 mb-4">
          {template.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onPreview}
          >
            Preview
          </Button>
          <Button
            className="flex-1"
            onClick={() => scrollToContact(template.id)}
          >
            Inquiry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
