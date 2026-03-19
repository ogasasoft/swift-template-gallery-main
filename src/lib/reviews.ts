import { TemplateReview, ReviewForm } from "@/lib/types";

// テスト用ダミーデータ
const mockReviews: TemplateReview[] = [
  {
    id: "1",
    templateId: "template-1",
    userId: "user-1",
    userName: "田中太郎",
    rating: 5,
    comment: "非常に便利なテンプレートです。すぐに使い始められました。",
    createdAt: "2026-03-15T10:00:00Z",
  },
  {
    id: "2",
    templateId: "template-1",
    userId: "user-2",
    userName: "山田花子",
    rating: 4,
    comment: "良いテンプレートですが、もう少し機能があれば完璧です。",
    createdAt: "2026-03-16T14:30:00Z",
  },
];

// 現在のユーザーID（テスト用）
const currentUserId = "current-user";

export const reviewsApi = {
  // テンプレートの評価とレビュー一覧を取得
  getTemplateReviews: async (templateId: string): Promise<TemplateReview[]> => {
    // 実際の実装では API リクエスト
    return mockReviews.filter((r) => r.templateId === templateId);
  },

  // テンプレートの平均評価を取得
  getTemplateRating: async (
    templateId: string,
  ): Promise<{ average: number; count: number }> => {
    const reviews = await reviewsApi.getTemplateReviews(templateId);
    if (reviews.length === 0) {
      return { average: 0, count: 0 };
    }
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return {
      average: parseFloat((sum / reviews.length).toFixed(1)),
      count: reviews.length,
    };
  },

  // ユーザーによるテンプレート評価の登録
  addReview: async (
    templateId: string,
    review: ReviewForm,
  ): Promise<TemplateReview> => {
    const newReview: TemplateReview = {
      id: `review-${Date.now()}`,
      templateId,
      userId: currentUserId,
      userName: "現在使用者", // 実際はユーザー名を取得
      rating: review.rating,
      comment: review.comment,
      createdAt: new Date().toISOString(),
    };

    // 実際の実装では API リクエスト
    mockReviews.push(newReview);
    return newReview;
  },

  // ユーザーによる評価済みかどうか確認
  hasUserReviewed: async (templateId: string): Promise<boolean> => {
    const reviews = await reviewsApi.getTemplateReviews(templateId);
    return reviews.some((r) => r.userId === currentUserId);
  },
};
