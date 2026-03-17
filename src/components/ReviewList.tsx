import { Card } from "@/components/ui/card";
import RatingStars from "./RatingStars";

interface ReviewItemProps {
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

function ReviewItem({ userName, rating, comment, createdAt }: ReviewItemProps) {
  const date = new Date(createdAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="font-semibold">{userName}</p>
          <RatingStars rating={rating} count={0} size="sm" />
        </div>
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
      <p className="text-sm text-muted-foreground">{comment}</p>
    </Card>
  );
}

interface ReviewListProps {
  reviews: {
    id: string;
    templateId: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
  }[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="rounded-lg border bg-muted/50 p-4 text-center">
        <p className="text-sm text-muted-foreground">
          まだレビューがありません
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">レビュー ({reviews.length})</h3>
      <div className="space-y-3">
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            userName={review.userName}
            rating={review.rating}
            comment={review.comment}
            createdAt={review.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
