import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import templatesData from "@/lib/templates.json";
import TemplateCard from "./TemplateCard";
import GalleryFilters from "./GalleryFilters";
import PreviewModal from "./PreviewModal";
import { useToast } from "@/hooks/use-toast";
import type { Template, FilterState } from "@/lib/types";

const templates = templatesData as Template[];

const allTags = Array.from(new Set(templates.flatMap((t) => t.tags))).sort();
const allIndustries = Array.from(
  new Set(templates.map((t) => t.industry)),
).sort();
const allTones = Array.from(new Set(templates.map((t) => t.tone))).sort();
const allStyles = Array.from(new Set(templates.map((t) => t.style))).sort();

interface GalleryProps {
  initialTags?: string[];
}

export default function Gallery({ initialTags = [] }: GalleryProps) {
  const { toast } = useToast();
  const [_searchParams, setSearchParams] = useSearchParams();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [filters, setFilters] = useState<FilterState>({
    tags: initialTags,
    industry: [],
    tone: [],
    style: [],
    search: "",
  });

  // クエリパラメータに基づいてタグを復元
  useEffect(() => {
    if (initialTags.length > 0) {
      setFilters((prev) => ({ ...prev, tags: initialTags }));
    }
  }, [initialTags]);

  const filteredTemplates = useMemo(() => {
    try {
      return templates.filter((template) => {
        const matchesTags =
          filters.tags.length === 0 ||
          filters.tags.some((tag) => template.tags.includes(tag));
        const matchesIndustry =
          filters.industry.length === 0 ||
          filters.industry.includes(template.industry);
        const matchesTone =
          filters.tone.length === 0 || filters.tone.includes(template.tone);
        const matchesStyle =
          filters.style.length === 0 || filters.style.includes(template.style);
        const matchesSearch = template.title
          .toLowerCase()
          .includes(filters.search.toLowerCase());
        return (
          matchesTags &&
          matchesIndustry &&
          matchesTone &&
          matchesStyle &&
          matchesSearch
        );
      });
    } catch {
      toast({
        title: "フィルタリングエラー",
        description: "テンプレートの絞り込み中にエラーが発生しました。",
        variant: "destructive",
      });
      return templates;
    }
  }, [filters, toast]);

  const handleOpenTemplate = (template: Template) => {
    if (!template.preview_path) {
      toast({
        title: "プレビューを開けません",
        description: `「${template.title}」のプレビューパスが見つかりません。`,
        variant: "destructive",
      });
      return;
    }

    // URL を更新してテンプレート詳細ページへ遷移
    const params = new URLSearchParams({
      template: template.id,
    });
    setSearchParams(params);

    setSelectedTemplate(template);
  };

  const handleTagClick = (tag: string, isChecked: boolean) => {
    const newTags = isChecked
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];

    setFilters((prev) => {
      // URL を更新
      const params = new URLSearchParams();
      if (newTags.length > 0) {
        params.set("tags", newTags.join(","));
      }
      setSearchParams(params);

      return { ...prev, tags: newTags };
    });

    // トースト通知
    if (isChecked) {
      toast({
        title: "タグを解除しました",
        description: `"${tag}" タグのフィルターが解除されました`,
      });
    } else {
      toast({
        title: "タグを追加しました",
        description: `"${tag}" タグのフィルターが適用されました`,
      });
    }
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Template Gallery</h1>
        <p className="text-lg text-muted-foreground">
          Browse our collection of templates
        </p>
      </div>

      {selectedTemplate && (
        <PreviewModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      )}

      <GalleryFilters
        filters={filters}
        setFilters={setFilters}
        allTags={allTags}
        allIndustries={allIndustries}
        allTones={allTones}
        allStyles={allStyles}
        totalTemplates={templates.length}
        filteredCount={filteredTemplates.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredTemplates.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <p className="text-muted-foreground text-lg mb-2">
              条件に一致するテンプレートが見つかりません
            </p>
            <p className="text-sm text-muted-foreground">
              フィルターを変更してもう一度お試しください
            </p>
          </div>
        ) : (
          filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onClick={() => handleOpenTemplate(template)}
              onTagClick={handleTagClick}
              selectedTags={filters.tags}
            />
          ))
        )}
      </div>
    </section>
  );
}
