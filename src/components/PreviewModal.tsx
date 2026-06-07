import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import type { Template } from "@/lib/types";
import { useTemplates } from "@/lib/TemplatesProvider";
import { useToast } from "@/hooks/use-toast";

interface PreviewModalProps {
  template: Template | null;
  onClose: () => void;
}

const PreviewModal = ({ template, onClose }: PreviewModalProps) => {
  const { downloadTemplate } = useTemplates();
  const { toast } = useToast();

  if (!template) return null;

  const handleDownload = () => {
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

  return (
    <Dialog open={!!template} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-base">{template.title}</DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                title={`${template.title}をダウンロード`}
              >
                <Download className="h-4 w-4 mr-2" />
                ダウンロード
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 bg-muted rounded-lg overflow-hidden min-h-0">
          <iframe
            src={template.preview_path}
            title={`${template.title} preview`}
            className="w-full h-full border-0"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
