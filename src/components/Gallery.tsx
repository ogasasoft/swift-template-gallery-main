import { useState, useEffect } from "react";
import templates from "@/lib/templates.json";
import TemplateCard from "./TemplateCard";
import GalleryFilters from "./GalleryFilters";
import PreviewModal from "./PreviewModal";

export default function Gallery() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    category: 'all',
    search: ''
  });
  
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = filters.category === 'all' || template.category === filters.category;
    const matchesSearch = template.name.toLowerCase().includes(filters.search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Template Gallery</h1>
        <p className="text-lg text-muted-foreground">Browse our collection of templates</p>
      </div>

      {selectedTemplate && (
        <PreviewModal 
          templateId={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      )}

      <GalleryFilters 
        filters={filters}
        setFilters={setFilters}
        totalTemplates={templates.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredTemplates.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No templates found matching your criteria
          </p>
        ) : (
          filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onClick={() => setSelectedTemplate(template.id)}
            />
          ))
        )}
      </div>
    </section>
  );
}
