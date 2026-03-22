import { useState } from "react";
import { X, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  getTagColorClass,
  getTagDefinition,
  TAG_CATEGORY_CONFIG,
} from "@/lib/tagDefinitions";
import { cn } from "@/lib/utils";
import type { Template } from "@/lib/types";

interface TagEditorModalProps {
  template: Template;
  isOpen: boolean;
  onClose: () => void;
  onTagsUpdated: (updatedTags: string[]) => void;
}

const MAX_TAGS = 10;
const _TAG_PREFIX = "tag:";

export default function TagEditorModal({
  template,
  isOpen,
  onClose,
  onTagsUpdated,
}: TagEditorModalProps) {
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState<string[]>(template.tags);

  const handleAddTag = () => {
    const trimmedTag = newTag.trim();
    if (!trimmedTag) return;

    if (tags.length >= MAX_TAGS) {
      alert(`タグは最大${MAX_TAGS}個までです。`);
      return;
    }

    if (tags.includes(trimmedTag)) {
      alert("そのタグは既に存在します。");
      return;
    }

    const updatedTags = [...tags, trimmedTag];
    setTags(updatedTags);
    setNewTag("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  const handleSave = () => {
    onTagsUpdated(tags);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTag();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>タグの編集</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              テンプレート: {template.title}
            </p>
            <p className="text-xs text-muted-foreground">
              タグを追加または削除できます。最大 {MAX_TAGS} 個まで。
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">タグを追加</label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="新しいタグを入力（Enterで追加）"
                maxLength={50}
              />
              <Button
                type="button"
                onClick={handleAddTag}
                disabled={!newTag.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              タグ一覧 ({tags.length}/{MAX_TAGS})
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  タグがありません。上のフォームから追加してください。
                </p>
              ) : (
                tags.map((tag) => {
                  const def = getTagDefinition(tag);
                  const categoryLabel = TAG_CATEGORY_CONFIG[def.category].label;
                  return (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={cn(
                        "gap-1 pl-3 pr-2 border",
                        getTagColorClass(tag),
                      )}
                    >
                      <span className="text-xs opacity-60">
                        {categoryLabel}:
                      </span>
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 rounded-full p-0.5 hover:bg-foreground/10"
                        aria-label="タグを削除"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={handleSave}>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
