export interface Template {
  id: string;
  title: string;
  tags: string[];
  industry: string;
  tone: string;
  style: string;
  thumb: string;
  preview_path: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
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
