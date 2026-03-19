import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  rating?: number;
  count?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
}

export default function RatingStars({
  rating = 0,
  count = 0,
  interactive = false,
  onRatingChange,
  size = "md",
}: RatingStarsProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const containerSizeClasses = {
    sm: "h-3",
    md: "h-4",
    lg: "h-5",
  };

  return (
    <div className="flex items-center gap-1">
      <div className={`flex ${containerSizeClasses[size]}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRatingChange?.(star)}
            className={`${sizeClasses[size]} text-yellow-400 transition-colors`}
            aria-label={`${star} out of 5 stars`}
          >
            {rating >= star ? (
              <Star fill="currentColor" className="fill-yellow-400" />
            ) : rating >= star - 0.5 ? (
              <StarHalf fill="currentColor" className="fill-yellow-400" />
            ) : (
              <Star />
            )}
          </button>
        ))}
      </div>
      {count > 0 && (
        <span className="text-sm text-muted-foreground ml-1">({count})</span>
      )}
    </div>
  );
}
