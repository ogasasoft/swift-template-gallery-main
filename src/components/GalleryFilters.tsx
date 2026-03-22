import { useState } from "react";
import { X, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { groupTagsByCategory, TAG_CATEGORY_CONFIG } from "@/lib/tagDefinitions";
import { cn } from "@/lib/utils";
import type { FilterState, TagCategory } from "@/lib/types";

const TAG_CATEGORIES: TagCategory[] = ["industry", "tone", "style", "feature"];

interface GalleryFiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  allTags: string[];
  allIndustries: string[];
  allTones: string[];
  allStyles: string[];
  totalTemplates: number;
  filteredCount: number;
}

export default function GalleryFilters({
  filters,
  setFilters,
  allTags,
  allIndustries,
  allTones,
  allStyles,
  totalTemplates,
  filteredCount,
}: GalleryFiltersProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const activeFilterCount =
    filters.tags.length +
    filters.industry.length +
    filters.tone.length +
    filters.style.length;
  const hasActiveFilters = activeFilterCount > 0 || filters.search.length > 0;

  const handleClearAll = () => {
    setFilters({ tags: [], industry: [], tone: [], style: [], search: "" });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleRemoveTag = (tag: string) => {
    setFilters({ ...filters, tags: filters.tags.filter((t) => t !== tag) });
  };

  const handleRemoveIndustry = (value: string) => {
    setFilters({
      ...filters,
      industry: filters.industry.filter((v) => v !== value),
    });
  };

  const handleRemoveTone = (value: string) => {
    setFilters({ ...filters, tone: filters.tone.filter((v) => v !== value) });
  };

  const handleRemoveStyle = (value: string) => {
    setFilters({ ...filters, style: filters.style.filter((v) => v !== value) });
  };

  return (
    <div className="space-y-3">
      {/* Search + Filter button */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="テンプレートを検索..."
            value={filters.search}
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="shrink-0 gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              フィルター
              {activeFilterCount > 0 && (
                <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-80 overflow-y-auto">
            <SheetHeader className="mb-4">
              <SheetTitle>フィルター設定</SheetTitle>
            </SheetHeader>

            <Accordion
              type="multiple"
              defaultValue={["industry", "tone", "style", "tags"]}
            >
              {/* Industry */}
              <AccordionItem value="industry">
                <AccordionTrigger className="text-sm font-medium">
                  業種
                  {filters.industry.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-2 h-5 px-1.5 text-xs"
                    >
                      {filters.industry.length}
                    </Badge>
                  )}
                </AccordionTrigger>
                <AccordionContent>
                  <ToggleGroup
                    type="multiple"
                    value={filters.industry}
                    onValueChange={(values) =>
                      setFilters({ ...filters, industry: values })
                    }
                    className="flex-wrap justify-start gap-2 pt-1"
                  >
                    {allIndustries.map((v) => (
                      <ToggleGroupItem
                        key={v}
                        value={v}
                        size="sm"
                        className="rounded-full px-3 py-1 text-xs h-auto data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                      >
                        {v}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </AccordionContent>
              </AccordionItem>

              {/* Tone */}
              <AccordionItem value="tone">
                <AccordionTrigger className="text-sm font-medium">
                  トーン
                  {filters.tone.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-2 h-5 px-1.5 text-xs"
                    >
                      {filters.tone.length}
                    </Badge>
                  )}
                </AccordionTrigger>
                <AccordionContent>
                  <ToggleGroup
                    type="multiple"
                    value={filters.tone}
                    onValueChange={(values) =>
                      setFilters({ ...filters, tone: values })
                    }
                    className="flex-wrap justify-start gap-2 pt-1"
                  >
                    {allTones.map((v) => (
                      <ToggleGroupItem
                        key={v}
                        value={v}
                        size="sm"
                        className="rounded-full px-3 py-1 text-xs h-auto data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                      >
                        {v}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </AccordionContent>
              </AccordionItem>

              {/* Style */}
              <AccordionItem value="style">
                <AccordionTrigger className="text-sm font-medium">
                  スタイル
                  {filters.style.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-2 h-5 px-1.5 text-xs"
                    >
                      {filters.style.length}
                    </Badge>
                  )}
                </AccordionTrigger>
                <AccordionContent>
                  <ToggleGroup
                    type="multiple"
                    value={filters.style}
                    onValueChange={(values) =>
                      setFilters({ ...filters, style: values })
                    }
                    className="flex-wrap justify-start gap-2 pt-1"
                  >
                    {allStyles.map((v) => (
                      <ToggleGroupItem
                        key={v}
                        value={v}
                        size="sm"
                        className="rounded-full px-3 py-1 text-xs h-auto data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                      >
                        {v}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </AccordionContent>
              </AccordionItem>

              {/* Tags */}
              <AccordionItem value="tags">
                <AccordionTrigger className="text-sm font-medium">
                  タグ
                  {filters.tags.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-2 h-5 px-1.5 text-xs"
                    >
                      {filters.tags.length}
                    </Badge>
                  )}
                </AccordionTrigger>
                <AccordionContent>
                  {(() => {
                    const grouped = groupTagsByCategory(allTags);
                    return (
                      <div className="space-y-3 pt-1">
                        {TAG_CATEGORIES.map((category) => {
                          const categoryTags = grouped[category];
                          if (categoryTags.length === 0) return null;
                          const { label, colorClass } =
                            TAG_CATEGORY_CONFIG[category];
                          return (
                            <div key={category}>
                              <p className="text-xs text-muted-foreground mb-1.5 font-medium">
                                {label}
                              </p>
                              <ToggleGroup
                                type="multiple"
                                value={filters.tags}
                                onValueChange={(values) =>
                                  setFilters({ ...filters, tags: values })
                                }
                                className="flex-wrap justify-start gap-1.5"
                              >
                                {categoryTags.map((tag) => (
                                  <ToggleGroupItem
                                    key={tag}
                                    value={tag}
                                    size="sm"
                                    className={cn(
                                      "rounded-full px-3 py-1 text-xs h-auto border transition-colors",
                                      colorClass,
                                      "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary",
                                    )}
                                  >
                                    {tag}
                                  </ToggleGroupItem>
                                ))}
                              </ToggleGroup>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {activeFilterCount > 0 && (
              <div className="mt-4 pt-4 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="w-full gap-2"
                >
                  <X className="h-4 w-4" />
                  すべてクリア
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="shrink-0"
          >
            <X className="h-4 w-4 mr-1" />
            クリア
          </Button>
        )}
      </div>

      {/* Active filter chips */}
      {(filters.industry.length > 0 ||
        filters.tone.length > 0 ||
        filters.style.length > 0 ||
        filters.tags.length > 0) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-muted-foreground">選択中:</span>
          {filters.industry.map((v) => (
            <Badge
              key={`industry-${v}`}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors text-xs"
              onClick={() => handleRemoveIndustry(v)}
            >
              業種: {v}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
          {filters.tone.map((v) => (
            <Badge
              key={`tone-${v}`}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors text-xs"
              onClick={() => handleRemoveTone(v)}
            >
              トーン: {v}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
          {filters.style.map((v) => (
            <Badge
              key={`style-${v}`}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors text-xs"
              onClick={() => handleRemoveStyle(v)}
            >
              スタイル: {v}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
          {filters.tags.map((tag) => (
            <Badge
              key={`tag-${tag}`}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors text-xs"
              onClick={() => handleRemoveTag(tag)}
            >
              {tag}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}

      {/* Result count */}
      <p className="text-sm text-muted-foreground">
        {hasActiveFilters ? (
          <>
            <span className="font-medium text-foreground">{filteredCount}</span>
            {" / "}
            {totalTemplates} 件のテンプレートを表示
          </>
        ) : (
          <>{totalTemplates} 件のテンプレート</>
        )}
      </p>
    </div>
  );
}
