import { Eye, Download } from "lucide-react";
import type { Template } from "@/types/template";

interface TemplateCardProps {
  template: Template;
  onClick: () => void;
}

export default function TemplateCard({ template, onClick }: TemplateCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg"
    >
      <div className="aspect-video w-full bg-gray-100">
        <img
          src={template.thumb}
          alt={template.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
            {template.industry}
          </span>
        </div>

        <h3 className="mb-1 text-lg font-semibold">{template.title}</h3>
        <p className="mb-3 text-sm text-gray-600 line-clamp-2">
          {template.tags.join(", ")}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium hover:bg-gray-200">
              <Eye className="h-4 w-4" />
              View
            </button>
            <button className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium hover:bg-gray-200">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
