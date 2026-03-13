import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const industries = [
  "all",
  "lifestyle",
  "business",
  "education",
  "health",
];

interface GalleryFiltersProps {
  filters: {
    category: string;
    search: string;
  };
  setFilters: (filters: { category: string; search: string }) => void;
  totalTemplates: number;
}

export default function GalleryFilters({ filters, setFilters, totalTemplates }: GalleryFiltersProps) {
  const handleCategoryChange = (value: string) => {
    setFilters({ ...filters, category: value });
  };

  const handleSearchChange = (value: string) => {
    setFilters({ ...filters, search: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-1/3">
          <Select value={filters.category} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry === "all" ? "All Categories" : industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search templates..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {totalTemplates} templates
      </p>
    </div>
  );
}
