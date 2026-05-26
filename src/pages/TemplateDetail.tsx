import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, X, Plus, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import PreviewModal from "@/components/PreviewModal";
import templatesData from "@/lib/templates.json";
import type { Template } from "@/lib/types";

export default function TemplateDetail() {
  const { id } = useParams<{ id: string }>();
  const [showPreview, setShowPreview] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [templates] = useState<Template[]>(() => {
    return templatesData as Template[];
  });
  const [template, setTemplate] = useState<Template | null>(null);

  // Load template on mount
  useEffect(() => {
    const loadedTemplates = templatesData as Template[];
    const foundTemplate = loadedTemplates.find((t) => t.id === id);
    if (foundTemplate) {
      setTemplate(foundTemplate);
    }
  }, [id]);

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

  const allTags = Array.from(
    new Set(templates.flatMap((t) => t.tags)),
  ).sort();

  const handleTagToggle = (tag: string) => {
    const updatedTemplates = templates.map((t) =>
      t.id === template.id
        ? {
            ...t,
            tags: t.tags.includes(tag)
              ? t.tags.filter((t) => t !== tag)
              : [...t.tags, tag],
          }
        : t
    );
    setTemplate(updatedTemplates.find((t) => t.id === template.id) || template);
  };

  const handleTagAdd = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !template.tags.includes(trimmedTag)) {
      const updatedTemplates = templates.map((t) =>
        t.id === template.id
          ? { ...t, tags: [...t.tags, trimmedTag] }
          : t
      );
      setTemplate(updatedTemplates.find((t) => t.id === template.id) || template);
    }
    setNewTag("");
  };

  const handleTagRemove = (tag: string) => {
    const updatedTemplates = templates.map((t) =>
      t.id === template.id
        ? { ...t, tags: t.tags.filter((t) => t !== tag) }
        : t
    );
    setTemplate(updatedTemplates.find((t) => t.id === template.id) || template);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTagAdd(newTag);
    }
  };

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
            <div className="flex flex-wrap gap-2 mb-3">
              {template.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-sm cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  onClick={() => handleTagRemove(tag)}
                >
                  {tag}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add new tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="flex-1"
              />
              <Button size="sm" onClick={() => handleTagAdd(newTag)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={template.tags.includes(tag) ? "default" : "secondary"}
                  className="text-sm cursor-pointer transition-colors"
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Click to toggle tag inclusion
            </p>
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
