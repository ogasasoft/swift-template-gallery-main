import { describe, it, expect } from "@jest/globals";
import {
  generateReview,
  generateReviews,
  analyzeReviewSentiment,
} from "../../lib/reviews";

describe("reviews.ts", () => {
  describe("generateReview", () => {
    it("should generate a review with basic fields", () => {
      const review = generateReview();

      expect(review).toHaveProperty("id");
      expect(review).toHaveProperty("templateId");
      expect(review).toHaveProperty("rating");
      expect(review).toHaveProperty("comment");
      expect(review).toHaveProperty("userName");
      expect(review).toHaveProperty("createdAt");
      expect(review.rating).toBeGreaterThanOrEqual(1);
      expect(review.rating).toBeLessThanOrEqual(5);
    });

    it("should generate a review with specific template ID", () => {
      const templateId = "react-template-1";
      const review = generateReview({ templateId });

      expect(review.templateId).toBe(templateId);
    });

    it("should generate a review with specific author", () => {
      const userName = "John Doe";
      const review = generateReview({ userName });

      expect(review.userName).toBe(userName);
    });

    it("should generate a review with specific rating", () => {
      const rating = 5;
      const review = generateReview({ rating });

      expect(review.rating).toBe(rating);
    });

    it("should generate a review with specific content", () => {
      const comment = "Excellent template, very easy to use!";
      const review = generateReview({ comment });

      expect(review.comment).toBe(comment);
    });

    it("should have different IDs for different reviews", () => {
      const review1 = generateReview();
      const review2 = generateReview();

      expect(review1.id).not.toBe(review2.id);
    });
  });

  describe("generateReviews", () => {
    it("should generate multiple reviews", () => {
      const reviews = generateReviews(5);

      expect(reviews).toHaveLength(5);
    });

    it("should generate reviews with different content", () => {
      const reviews = generateReviews(10);

      expect(reviews.length).toBeGreaterThan(1);

      const contentSet = new Set(reviews.map((r) => r.comment));
      expect(contentSet.size).toBeGreaterThan(1);
    });

    it("should include all required fields in each review", () => {
      const reviews = generateReviews(3);

      reviews.forEach((review) => {
        expect(review).toHaveProperty("id");
        expect(review).toHaveProperty("templateId");
        expect(review).toHaveProperty("rating");
        expect(review).toHaveProperty("comment");
        expect(review).toHaveProperty("userName");
        expect(review).toHaveProperty("createdAt");
      });
    });

    it("should work with zero reviews", () => {
      const reviews = generateReviews(0);

      expect(reviews).toHaveLength(0);
    });
  });

  describe("analyzeReviewSentiment", () => {
    it("should classify positive reviews correctly", () => {
      const positiveReviews = [
        "Excellent template, very easy to use!",
        "Great work! This saved me a lot of time.",
        "Perfect implementation, highly recommend!",
      ];

      positiveReviews.forEach((content) => {
        const sentiment = analyzeReviewSentiment(content);
        expect(sentiment).toBe("positive");
      });
    });

    it("should classify negative reviews correctly", () => {
      const negativeReviews = [
        "Terrible template, very buggy.",
        "Waste of time, don't recommend.",
        "Very disappointed with this implementation.",
      ];

      negativeReviews.forEach((content) => {
        const sentiment = analyzeReviewSentiment(content);
        expect(sentiment).toBe("negative");
      });
    });

    it("should classify neutral reviews correctly", () => {
      const neutralReviews = [
        "It works.",
        "Standard template, nothing special.",
        "Okay implementation.",
      ];

      neutralReviews.forEach((content) => {
        const sentiment = analyzeReviewSentiment(content);
        expect(sentiment).toBe("neutral");
      });
    });

    it("should handle mixed reviews", () => {
      const mixedReview = "Good template but has some bugs. Overall decent.";

      const sentiment = analyzeReviewSentiment(mixedReview);
      expect(sentiment).toBe("positive");
    });

    it("should handle empty or very short reviews", () => {
      const shortReview = "It works.";

      const sentiment = analyzeReviewSentiment(shortReview);
      expect(sentiment).toBe("neutral");
    });
  });

  describe("edge cases", () => {
    it("should handle very long reviews", () => {
      const longReview = "This is a test review. " + "x".repeat(10000);

      const sentiment = analyzeReviewSentiment(longReview);
      expect(sentiment).toBeTruthy();
    });

    it("should handle reviews with special characters", () => {
      const specialReview = "Great template! @user #tag! 😀";

      const sentiment = analyzeReviewSentiment(specialReview);
      expect(sentiment).toBeTruthy();
    });
  });
});
