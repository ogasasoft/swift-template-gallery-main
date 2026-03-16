import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Template {
  id: string;
  title: string;
  preview_path: string;
}

interface PreviewModalProps {
  template: Template | null;
  onClose: () => void;
}

const PreviewModal = ({ template, onClose }: PreviewModalProps) => {
  if (!template) return null;

  return (
    <Dialog open={!!template} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-4 gap-2">
        <DialogHeader className="py-1">
          <DialogTitle className="text-base">
            {template.title} Preview
          </DialogTitle>
          <DialogDescription className="sr-only">
            {template.title}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 bg-muted rounded-lg overflow-hidden min-h-0">
          {/* ここでテンプレサイトを埋め込み表示 */}
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
