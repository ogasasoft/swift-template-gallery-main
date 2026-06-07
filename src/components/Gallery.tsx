import { useState, useMemo } from "react";
import TemplateCard from "./TemplateCard";
import GalleryFilters from "./GalleryFilters";
import PreviewModal from "./PreviewModal";
import { useToast } from "@/hooks/use-toast";
import { useTemplates } from "@/lib/TemplatesProvider";
import type { Template, FilterState } from "@/lib/types";

export default function Gallery() {
  const { toast } = useToast();
  const { getTemplateById, downloadTemplate, templates } = useTemplates();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [filters, setFilters] = useState<FilterState>({
    tags: [],
    industry: [],
    tone: [],
    style: [],
    search: "",
  });

  const handleOpenTemplate = (template: Template) => {
    const foundTemplate = getTemplateById(template.id);
    if (!foundTemplate || !foundTemplate.preview_path) {
      toast({
        title: "プレビューを開けません",
        description: `「${template.title}」のプレビューパスが見つかりません。`,
        variant: "destructive",
      });
      return;
    }
    setSelectedTemplate(foundTemplate);
  };

  const handleTagClick = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleDownload = (template: Template) => {
    try {
      downloadTemplate(template);
      toast({
        title: "ダウンロード開始",
        description: `「${template.title}」のダウンロードを開始しました。`,
      });
    } catch {
      toast({
        title: "ダウンロードエラー",
        description: `「${template.title}」のダウンロードに失敗しました。`,
        variant: "destructive",
      });
    }
  };

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      // Filter by search text
      const matchesSearch =
        filters.search === "" ||
        template.title.toLowerCase().includes(filters.search.toLowerCase());

      // Filter by tags (OR logic - template matches if ANY filter tag matches)
      const matchesTags =
        filters.tags.length === 0 ||
        filters.tags.some((tag) => template.tags.includes(tag));

      // Filter by industry
      const matchesIndustry =
        filters.industry.length === 0 ||
        filters.industry.includes(template.industry);

      // Filter by tone
      const matchesTone =
        filters.tone.length === 0 || filters.tone.includes(template.tone);

      // Filter by style
      const matchesStyle =
        filters.style.length === 0 || filters.style.includes(template.style);

      return (
        matchesSearch &&
        matchesTags &&
        matchesIndustry &&
        matchesTone &&
        matchesStyle
      );
    });
  }, [templates, filters]);

  const allIndustries = useMemo(
    () => Array.from(new Set(templates.map((t) => t.industry))).sort(),
    [templates],
  );

  const allTones = useMemo(
    () => Array.from(new Set(templates.map((t) => t.tone))).sort(),
    [templates],
  );

  const allStyles = useMemo(
    () => Array.from(new Set(templates.map((t) => t.style))).sort(),
    [templates],
  );

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
              onDownload={handleDownload}
            />
          ))
        )}
      </div>
    </section>
  );
}

const templates = Array.from(
  import("@/lib/templates.json").then((mod) => mod.default as Template[]),
);

// AllTags is used in the template, keeping allTags variable
const allTags = Array.from(new Set(templates.flatMap((t) => t.tags))).sort();

// These variables are calculated but not currently used - keeping for future use
const _allIndustries = Array.from(
  new Set(templates.map((t) => t.industry)),
).sort();
const _allTones = Array.from(new Set(templates.map((t) => t.tone))).sort();
const _allStyles = Array.from(new Set(templates.map((t) => t.style))).sort();
