export interface TemplateFile {
  path: string;
  content: string;
}

export interface Template {
  id: string;
  title: string;
  name: string;
  description: string;
  category: string;
  features: string[];
  tags: string[];
  industry: string;
  tone: string;
  style: string;
  thumb: string;
  preview_path: string;
  files?: TemplateFile[];
  rating?: number;
  reviewCount?: number;
}

export interface TemplateReview {
  id: string;
  templateId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ReviewForm {
  rating: number;
  comment: string;
}

export interface FilterState {
  tags: string[];
  industry: string[];
  tone: string[];
  style: string[];
  search: string;
}
