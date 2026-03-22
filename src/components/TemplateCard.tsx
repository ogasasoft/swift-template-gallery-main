import { useState } from "react";
import { Eye, Download, Info, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import RatingStars from "./RatingStars";
import TagEditorModal from "./TagEditorModal";
import { getTagColorClass } from "@/lib/tagDefinitions";
import { cn } from "@/lib/utils";
import type { Template } from "@/lib/types";

interface TemplateCardProps {
  template: Template;
  onClick: () => void;
  onTagClick?: (tag: string) => void;
  selectedTags?: string[];
  onTagUpdate?: (templateId: string, updatedTags: string[]) => void;
}

export default function TemplateCard({
  template,
  onClick,
  onTagClick,
  selectedTags = [],
  onTagUpdate,
}: TemplateCardProps) {
  const [isTagEditorOpen, setIsTagEditorOpen] = useState(false);

  const handleTagUpdate = (updatedTags: string[]) => {
    setIsTagEditorOpen(false);
    if (onTagUpdate) {
      onTagUpdate(template.id, updatedTags);
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
              variant="outline"
              className={cn(
                "text-xs cursor-pointer transition-colors border",
                selectedTags.includes(tag)
                  ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                  : cn(
                      getTagColorClass(tag),
                      "hover:bg-primary hover:text-primary-foreground hover:border-primary",
                    ),
              )}
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
            onClick={(e) => {
              e.stopPropagation();
              setIsTagEditorOpen(true);
            }}
            aria-label="タグを編集"
          >
            <Tag className="h-4 w-4" />
          </button>
          <button
            className="flex items-center gap-1 rounded-md bg-muted px-3 py-1.5 text-sm font-medium hover:bg-muted/80 transition-colors"
            onClick={(e) => e.stopPropagation()}
            aria-label="ダウンロード"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>

        {isTagEditorOpen && (
          <TagEditorModal
            template={template}
            isOpen={isTagEditorOpen}
            onClose={() => setIsTagEditorOpen(false)}
            onTagsUpdated={handleTagUpdate}
          />
        )}
      </div>
    </div>
  );
}
