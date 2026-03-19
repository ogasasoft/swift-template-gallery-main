import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReviewList from "@/components/ReviewList";

describe("ReviewList Component", () => {
  it("should render empty state when no reviews", () => {
    render(<ReviewList reviews={[]} />);
    expect(screen.getByText(/まだレビューがありません/i)).toBeInTheDocument();
  });

  it("should render reviews list when reviews exist", () => {
    const reviews = [
      {
        id: "1",
        templateId: "template-1",
        userId: "user-1",
        userName: "田中太郎",
        rating: 5,
        comment: "Excellent!",
        createdAt: "2026-03-15T10:00:00Z",
      },
    ];

    render(<ReviewList reviews={reviews} />);
    expect(screen.getByText("田中太郎")).toBeInTheDocument();
    expect(screen.getByText("Excellent!")).toBeInTheDocument();
  });

  it("should render review count", () => {
    const reviews = [
      {
        id: "1",
        templateId: "template-1",
        userId: "user-1",
        userName: "田中太郎",
        rating: 5,
        comment: "Good!",
        createdAt: "2026-03-15T10:00:00Z",
      },
    ];

    render(<ReviewList reviews={reviews} />);
    expect(screen.getByText("レビュー (1)")).toBeInTheDocument();
  });

  it("should render multiple reviews", () => {
    const reviews = [
      {
        id: "1",
        templateId: "template-1",
        userId: "user-1",
        userName: "田中太郎",
        rating: 5,
        comment: "Excellent!",
        createdAt: "2026-03-15T10:00:00Z",
      },
      {
        id: "2",
        templateId: "template-1",
        userId: "user-2",
        userName: "山田花子",
        rating: 4,
        comment: "Good!",
        createdAt: "2026-03-16T14:30:00Z",
      },
    ];

    render(<ReviewList reviews={reviews} />);
    expect(screen.getAllByText("田中太郎")).toHaveLength(1);
    expect(screen.getAllByText("山田花子")).toHaveLength(1);
    expect(screen.getAllByText("Excellent!")).toHaveLength(1);
    expect(screen.getAllByText("Good!")).toHaveLength(1);
  });

  it("should format date correctly", () => {
    const reviews = [
      {
        id: "1",
        templateId: "template-1",
        userId: "user-1",
        userName: "田中太郎",
        rating: 5,
        comment: "Test comment",
        createdAt: "2026-03-15T10:00:00Z",
      },
    ];

    render(<ReviewList reviews={reviews} />);
    // 2026年3月15日と表示されるはず
    expect(screen.getByText(/3月15日/i)).toBeInTheDocument();
  });

  it("should render ReviewItem for each review", () => {
    const reviews = [
      {
        id: "1",
        templateId: "template-1",
        userId: "user-1",
        userName: "田中太郎",
        rating: 5,
        comment: "Test comment",
        createdAt: "2026-03-15T10:00:00Z",
      },
    ];

    render(<ReviewList reviews={reviews} />);
    expect(screen.getByText("田中太郎")).toBeInTheDocument();
    expect(screen.getByText("Test comment")).toBeInTheDocument();
  });
});
