import { useState, useMemo, useEffect } from "react";
import templatesData from "@/lib/templates.json";
import TemplateCard from "./TemplateCard";
import GalleryFilters from "./GalleryFilters";
import PreviewModal from "./PreviewModal";
import Pagination from "./Pagination";
import { useToast } from "@/hooks/use-toast";
import type { Template, FilterState } from "@/lib/types";

const ITEMS_PER_PAGE = 9;

const templates = templatesData as Template[];

const allTags = Array.from(new Set(templates.flatMap((t) => t.tags))).sort();
const allIndustries = Array.from(
  new Set(templates.map((t) => t.industry)),
).sort();
const allTones = Array.from(new Set(templates.map((t) => t.tone))).sort();
const allStyles = Array.from(new Set(templates.map((t) => t.style))).sort();

export default function Gallery() {
  const { toast } = useToast();
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
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);

  const paginatedTemplates = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTemplates.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTemplates, currentPage]);

  const handleOpenTemplate = (template: Template) => {
    if (!template.preview_path) {
      toast({
        title: "プレビューを開けません",
        description: `「${template.title}」のプレビューパスが見つかりません。`,
        variant: "destructive",
      });
      return;
    }
    setSelectedTemplate(template);
  };

  const handleTagClick = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
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
          paginatedTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onClick={() => handleOpenTemplate(template)}
              onTagClick={handleTagClick}
              selectedTags={filters.tags}
              onTagUpdate={(templateId, updatedTags) => {
                const index = templates.findIndex((t) => t.id === templateId);
                if (index !== -1) {
                  templates[index].tags = updatedTags;
                }
                toast({
                  title: "タグを更新しました",
                  description: `「${template.title}」のタグが変更されました（ローカルのみ）`,
                });
              }}
            />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </section>
  );
}
