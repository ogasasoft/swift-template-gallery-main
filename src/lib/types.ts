export interface Template {
  id: string;
  title: string;
  tags: string[];
  industry: string;
  tone: string;
  style: string;
  thumb: string;
  preview_path: string;
}

export interface FilterState {
  tags: string[];
  industry: string[];
  tone: string[];
  style: string[];
  search: string;
}
