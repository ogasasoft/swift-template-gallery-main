import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PreviewModal from "@/components/PreviewModal";
import templatesData from "@/lib/templates.json";
import type { Template } from "@/lib/types";

const templates = templatesData as Template[];

export default function TemplateDetail() {
  const { id } = useParams<{ id: string }>();
  const [showPreview, setShowPreview] = useState(false);

  const template = templates.find((t) => t.id === id);

  if (!template) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground text-lg mb-4">
          テンプレートが見つかりません
        </p>
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            ギャラリーに戻る
          </Button>
        </Link>
      </div>
    );
  }

  const metaItems = [
    { label: "業種", value: template.industry },
    { label: "トーン", value: template.tone },
    { label: "スタイル", value: template.style },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        ギャラリーに戻る
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Thumbnail */}
        <div className="rounded-lg overflow-hidden border bg-muted aspect-video">
          <img
            src={template.thumb}
            alt={template.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{template.title}</h1>
          </div>

          <Separator />

          {/* Meta */}
          <div className="space-y-3">
            {metaItems.map(({ label, value }) => (
              <div key={label} className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground w-20 shrink-0">
                  {label}
                </span>
                <Badge variant="outline">{value}</Badge>
              </div>
            ))}
          </div>

          <Separator />

          {/* Tags */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              タグ
            </p>
            <div className="flex flex-wrap gap-2">
              {template.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Button onClick={() => setShowPreview(true)} className="gap-2">
            <Eye className="h-4 w-4" />
            プレビューを見る
          </Button>
        </div>
      </div>

      {showPreview && (
        <PreviewModal
          template={template}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}
