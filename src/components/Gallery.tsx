import { useState } from "react";
import templates from "@/lib/templates.json";
import TemplateCard from "./TemplateCard";
import GalleryFilters from "./GalleryFilters";
import PreviewModal from "./PreviewModal";

const Gallery = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const [selectedTone, setSelectedTone] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [previewTemplate, setPreviewTemplate] = useState<typeof templates[0] | null>(null);

  const industries = ["All", ...Array.from(new Set(templates.map(t => t.industry)))];
  const tones = ["All", ...Array.from(new Set(templates.map(t => t.tone)))];

  const filteredTemplates = templates.filter(template => {
    if (selectedIndustry !== "All" && template.industry !== selectedIndustry) return false;
    if (selectedTone !== "All" && template.tone !== selectedTone) return false;
    return true;
  });

  return (
    <section id="gallery" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-foreground mb-4">
          Template Gallery
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Browse our collection of professionally designed templates
        </p>

        <GalleryFilters
          industries={industries}
          tones={tones}
          selectedIndustry={selectedIndustry}
          selectedTone={selectedTone}
          sortBy={sortBy}
          onIndustryChange={setSelectedIndustry}
          onToneChange={setSelectedTone}
          onSortChange={setSortBy}
        />

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="flex-shrink-0 w-[calc(33.333%-1rem)] min-w-[300px] snap-start">
              <TemplateCard
                template={template}
                onPreview={() => setPreviewTemplate(template)}
              />
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No templates found with the selected filters.</p>
          </div>
        )}
      </div>

      <PreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
      />
    </section>
  );
};

export default Gallery;
