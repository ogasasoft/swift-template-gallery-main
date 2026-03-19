import { TemplateReview, ReviewForm } from "@/lib/types";

// テスト用データ
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

// テスト用関数
export const generateReview = (
  overrides?: Partial<TemplateReview>,
  index?: number,
): TemplateReview => ({
  id: `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  templateId:
    overrides?.templateId || `template-${Math.floor(Math.random() * 100)}`,
  userId: overrides?.userId || `user-${Math.floor(Math.random() * 100)}`,
  userName:
    overrides?.userName || `テストユーザー${Math.floor(Math.random() * 100)}`,
  rating: overrides?.rating || Math.floor(Math.random() * 5) + 1,
  comment: overrides?.comment || `テストレビュー ${index + 1}です。`,
  createdAt: overrides?.createdAt || new Date().toISOString(),
});

export const generateReviews = (count: number): TemplateReview[] => {
  return Array.from({ length: count }, (_, i) => generateReview(undefined, i));
};

export const analyzeReviewSentiment = (
  content: string,
): "positive" | "negative" | "neutral" => {
  // English positive keywords - excluding neutral words like "works", "okay", "very"
  const englishPositiveKeywords = [
    "excellent",
    "great",
    "perfect",
    "good",
    "awesome",
    "amazing",
    "best",
    "recommend",
    "helpful",
    "easy",
    "love",
    "enjoy",
    "fantastic",
    "outstanding",
    "recommended",
    "highly",
    "good job",
    "well done",
    "nice",
    "pleasant",
    "solid",
    "solid job",
    "pleased",
    "pleased with",
    "happy with",
    "satisfied",
    "satisfied with",
  ];

  // English negative keywords
  const englishNegativeKeywords = [
    "terrible",
    "bad",
    "worst",
    "poor",
    "waste",
    "disappointed",
    "bugs",
    "error",
    "issue",
    "problem",
    "hate",
    "awful",
    "dislike",
    "frustrating",
    "hated",
    "hates",
    "hating",
    "hated it",
    "hate it",
    "not good",
    "not great",
    "slow",
    "buggy",
    "problems",
    "issues",
    "don't recommend",
    "not recommended",
    "would not recommend",
    "wouldn't recommend",
  ];

  // Japanese positive keywords (hiragana and katakana)
  const japanesePositiveKeywords = [
    "素晴らしい",
    "最高",
    "素晴",
    "良い",
    "よい",
    "いい",
    "大変",
    "助かる",
    "楽",
    "喜ぶ",
    "おすすめ",
    "オススメ",
    "満足",
    "満足する",
    "最高に",
    "最高",
    "素晴らしいです",
    "最高です",
    "良いですね",
    "大変助かります",
    "最高",
    "最高だ",
    "最高だね",
    "いい",
    "良い",
    "とても",
    "とても良かった",
    "よくできています",
  ];

  // Japanese negative keywords
  const japaneseNegativeKeywords = [
    "最悪",
    "悪い",
    "ダメ",
    "酷い",
    "つまらない",
    "不満",
    "失望",
    "残念",
    "イライラ",
    "迷惑",
    "迷惑です",
    "最悪です",
    "ダメです",
    "酷いです",
    "期待外れ",
    "期待していない",
    "できない",
    "無理",
    "困る",
    "嫌だ",
    "嫌",
    "遅い",
    "バグ",
    "バグがあります",
    "問題があります",
  ];

  const lowerContent = content.toLowerCase();

  // Count English keyword matches
  const englishPositiveMatches = englishPositiveKeywords.filter((kw) => {
    return lowerContent.includes(kw.toLowerCase()) && kw.length >= 3;
  }).length;

  const englishNegativeMatches = englishNegativeKeywords.filter((kw) => {
    return lowerContent.includes(kw.toLowerCase());
  }).length;

  // Count Japanese keyword matches
  const japanesePositiveMatches = japanesePositiveKeywords.filter((kw) => {
    return lowerContent.includes(kw);
  }).length;

  const japaneseNegativeMatches = japaneseNegativeKeywords.filter((kw) => {
    return lowerContent.includes(kw);
  }).length;

  const totalPositiveMatches = englishPositiveMatches + japanesePositiveMatches;
  const totalNegativeMatches = englishNegativeMatches + japaneseNegativeMatches;

  // If one side has at least 1 more match, return that sentiment
  if (totalPositiveMatches > totalNegativeMatches) {
    return "positive";
  }

  if (totalNegativeMatches > totalPositiveMatches) {
    return "negative";
  }

  // If tie with both sides matching, favor positive (mixed reviews lean positive)
  if (totalPositiveMatches > 0) {
    return "positive";
  }

  // If only negative matches in tie (shouldn't happen), return negative
  if (totalNegativeMatches > 0) {
    return "negative";
  }

  // Otherwise, default to neutral (conservative approach)
  return "neutral";
};
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
