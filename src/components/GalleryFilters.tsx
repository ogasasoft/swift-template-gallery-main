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
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-1/3">
          <select
            value={filters.category}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 border rounded-md"
          >
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry === "all" ? "All Categories" : industry}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search templates..."
            value={filters.search}
            onChange={handleSearchChange}
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
