import type { TagCategory, TagDefinition } from "./types";

export const TAG_CATEGORY_CONFIG: Record<
  TagCategory,
  { label: string; colorClass: string }
> = {
  industry: {
    label: "業種",
    colorClass:
      "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-700",
  },
  tone: {
    label: "トーン",
    colorClass:
      "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700",
  },
  style: {
    label: "スタイル",
    colorClass:
      "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-700",
  },
  feature: {
    label: "特徴",
    colorClass:
      "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700",
  },
};

export const TAG_DEFINITIONS: Record<string, TagDefinition> = {
  // Industry
  Cafe: { id: "Cafe", label: "Cafe", category: "industry" },
  Restaurant: { id: "Restaurant", label: "Restaurant", category: "industry" },
  Fashion: { id: "Fashion", label: "Fashion", category: "industry" },
  Tech: { id: "Tech", label: "Tech", category: "industry" },
  // Tone
  Simple: { id: "Simple", label: "Simple", category: "tone" },
  Luxury: { id: "Luxury", label: "Luxury", category: "tone" },
  Pop: { id: "Pop", label: "Pop", category: "tone" },
  Natural: { id: "Natural", label: "Natural", category: "tone" },
  Modern: { id: "Modern", label: "Modern", category: "tone" },
  Sophisticated: {
    id: "Sophisticated",
    label: "Sophisticated",
    category: "tone",
  },
  Casual: { id: "Casual", label: "Casual", category: "tone" },
  // Style
  Minimal: { id: "Minimal", label: "Minimal", category: "style" },
  Elegant: { id: "Elegant", label: "Elegant", category: "style" },
  Colorful: { id: "Colorful", label: "Colorful", category: "style" },
  Organic: { id: "Organic", label: "Organic", category: "style" },
  Clean: { id: "Clean", label: "Clean", category: "style" },
  Warm: { id: "Warm", label: "Warm", category: "style" },
  // Feature
  Light: { id: "Light", label: "Light", category: "feature" },
  Premium: { id: "Premium", label: "Premium", category: "feature" },
  Fun: { id: "Fun", label: "Fun", category: "feature" },
  Earthy: { id: "Earthy", label: "Earthy", category: "feature" },
  Professional: {
    id: "Professional",
    label: "Professional",
    category: "feature",
  },
  Bold: { id: "Bold", label: "Bold", category: "feature" },
  Chic: { id: "Chic", label: "Chic", category: "feature" },
  Classic: { id: "Classic", label: "Classic", category: "feature" },
  Friendly: { id: "Friendly", label: "Friendly", category: "feature" },
};

export function getTagDefinition(tag: string): TagDefinition {
  return (
    TAG_DEFINITIONS[tag] ?? {
      id: tag,
      label: tag,
      category: "feature" as TagCategory,
    }
  );
}

export function getTagColorClass(tag: string): string {
  const def = getTagDefinition(tag);
  return TAG_CATEGORY_CONFIG[def.category].colorClass;
}

export function groupTagsByCategory(
  tags: string[],
): Record<TagCategory, string[]> {
  const grouped: Record<TagCategory, string[]> = {
    industry: [],
    tone: [],
    style: [],
    feature: [],
  };
  for (const tag of tags) {
    const def = getTagDefinition(tag);
    grouped[def.category].push(tag);
  }
  return grouped;
}
