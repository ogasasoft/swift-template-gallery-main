import type { Template } from "./types";
import templatesData from "./templates.json";

export interface TemplatesContextValue {
  templates: Template[];
  getTemplateById: (id: string) => Template | undefined;
  downloadTemplate: (template: Template) => void;
}

export const templatesContextDefaultValues: TemplatesContextValue = {
  templates: templatesData as Template[],
  getTemplateById: (id: string) => {
    return templatesData.find((t) => t.id === id);
  },
  downloadTemplate: (template: Template) => {
    const previewPath = template.preview_path;
    if (previewPath) {
      const publicPath = previewPath.startsWith("/templates")
        ? previewPath
        : `/templates/${template.id}/index.html`;
      const link = document.createElement("a");
      link.href = publicPath;
      link.setAttribute("download", `${template.id}.html`);
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("Template preview path is not defined");
    }
  },
};
