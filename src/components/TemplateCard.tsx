import { useState } from "react";
import { Eye, Download, Info, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import RatingStars from "./RatingStars";
import { useToast } from "@/hooks/use-toast";
import type { Template } from "@/lib/types";

interface TemplateCardProps {
  template: Template;
  onClick: () => void;
  onTagClick?: (tag: string) => void;
  selectedTags?: string[];
}

export default function TemplateCard({
  template,
  onClick,
  onTagClick,
  selectedTags = [],
}: TemplateCardProps) {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      // Show toast with template name
      toast({
        title: "ダウンロードを開始",
        description: `「${template.title}」のダウンロードを開始します...`,
      });

      // Simulate download delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real implementation, you would:
      // 1. Fetch the template from an API endpoint
      // 2. Trigger a blob download
      // 3. Or redirect to the template preview page with download instructions

      toast({
        title: "準備完了",
        description: `「${template.title}」のテンプレートをダウンロードできます。`,
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg cursor-pointer"
    >
      <div className="aspect-video w-full bg-muted">
        <img
          src={template.thumb}
          alt={template.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold">{template.title}</h3>

        <div className="mb-3 flex items-center gap-2">
          <RatingStars
            rating={template.rating || 0}
            count={template.reviewCount || 0}
            size="sm"
          />
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {template.tags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "secondary"}
              className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onTagClick?.(tag);
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1 rounded-md bg-muted px-3 py-1.5 text-sm font-medium hover:bg-muted/80 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <Eye className="h-4 w-4" />
            プレビュー
          </button>
          <Link
            to={`/templates/${template.id}`}
            className="flex items-center gap-1 rounded-md bg-muted px-3 py-1.5 text-sm font-medium hover:bg-muted/80 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Info className="h-4 w-4" />
            詳細
          </Link>
          <button
            className="flex items-center gap-1 rounded-md bg-muted px-3 py-1.5 text-sm font-medium hover:bg-muted/80 transition-colors"
            onClick={handleDownload}
            disabled={isDownloading}
            aria-label={`テンプレート${template.title}をダウンロード`}
          >
            {isDownloading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                ダウンロード中
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                ダウンロード
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
