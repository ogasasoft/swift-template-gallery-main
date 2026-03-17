import { useState } from "react";
import { Send } from "lucide-react"; // Star is handled by RatingStars component
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Star is not directly used
import { useToast } from "@/components/ui/use-toast";
import RatingStars from "./RatingStars";
interface RatingFormProps {
  templateId: string;
  onReviewSubmitted?: () => void;
}

export default function RatingForm({ onReviewSubmitted }: RatingFormProps) {
  const { toast } = useToast();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "評価を入力してください",
        description: "1つ以上の星を選択してください。",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      // 実際の実装では API 呼び出し
      // const response = await reviewsApi.addReview(templateId, { rating, comment });

      // テスト用シミュレーション
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setHasReviewed(true);
      toast({
        title: "評価を送信しました",
        description: "ありがとうございます！",
      });

      setRating(0);
      setComment("");
      onReviewSubmitted?.();
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "エラーが発生しました",
        description: "送信に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (hasReviewed) {
    return (
      <div className="rounded-lg border bg-muted/50 p-4 text-center">
        <p className="text-sm text-muted-foreground">
          このテンプレートの評価を送信しました
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-semibold">このテンプレートの評価</h4>
        <RatingStars
          rating={rating}
          interactive
          onRatingChange={setRating}
          size="md"
        />
      </div>

      <div>
        <label
          htmlFor="review-comment"
          className="mb-2 block text-sm font-medium"
        >
          コメント（任意）
        </label>
        <Textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="このテンプレートについてご意見をお聞かせください..."
          rows={4}
          disabled={submitting}
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={rating === 0 || submitting}
        className="w-full"
      >
        {submitting ? (
          <>
            送信中...
            <Send className="ml-2 h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            評価を送信
            <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}
