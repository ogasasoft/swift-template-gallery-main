export const CATEGORY_COLORS: Record<
  string,
  {
    dot: string;
    activeBg: string;
    activeText: string;
    chipBg: string;
    chipText: string;
  }
> = {
  "ui-components": {
    dot: "bg-indigo-500",
    activeBg: "data-[state=on]:bg-indigo-500",
    activeText: "data-[state=on]:text-white",
    chipBg: "bg-indigo-100 dark:bg-indigo-900",
    chipText: "text-indigo-700 dark:text-indigo-300",
  },
  forms: {
    dot: "bg-pink-500",
    activeBg: "data-[state=on]:bg-pink-500",
    activeText: "data-[state=on]:text-white",
    chipBg: "bg-pink-100 dark:bg-pink-900",
    chipText: "text-pink-700 dark:text-pink-300",
  },
  "data-viz": {
    dot: "bg-green-500",
    activeBg: "data-[state=on]:bg-green-500",
    activeText: "data-[state=on]:text-white",
    chipBg: "bg-green-100 dark:bg-green-900",
    chipText: "text-green-700 dark:text-green-300",
  },
  layout: {
    dot: "bg-orange-500",
    activeBg: "data-[state=on]:bg-orange-500",
    activeText: "data-[state=on]:text-white",
    chipBg: "bg-orange-100 dark:bg-orange-900",
    chipText: "text-orange-700 dark:text-orange-300",
  },
};

export function getCategoryColor(category: string) {
  return (
    CATEGORY_COLORS[category] ?? {
      dot: "bg-gray-400",
      activeBg: "data-[state=on]:bg-primary",
      activeText: "data-[state=on]:text-primary-foreground",
      chipBg: "",
      chipText: "",
    }
  );
}
