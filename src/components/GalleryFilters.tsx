import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GalleryFiltersProps {
  industries: string[];
  tones: string[];
  selectedIndustry: string;
  selectedTone: string;
  sortBy: string;
  onIndustryChange: (value: string) => void;
  onToneChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const GalleryFilters = ({
  industries,
  tones,
  selectedIndustry,
  selectedTone,
  sortBy,
  onIndustryChange,
  onToneChange,
  onSortChange,
}: GalleryFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8 justify-center">
      <Select value={selectedIndustry} onValueChange={onIndustryChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Industry" />
        </SelectTrigger>
        <SelectContent>
          {industries.map((industry) => (
            <SelectItem key={industry} value={industry}>
              {industry}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedTone} onValueChange={onToneChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tone" />
        </SelectTrigger>
        <SelectContent>
          {tones.map((tone) => (
            <SelectItem key={tone} value={tone}>
              {tone}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="popular">Popular</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default GalleryFilters;
