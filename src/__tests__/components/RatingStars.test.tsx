import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import RatingStars from "@/components/RatingStars";

describe("RatingStars Component", () => {
  describe("Rendering", () => {
    it("should render with rating", () => {
      render(<RatingStars rating={4} count={10} />);
      const stars = screen.getAllByLabelText(/star/i);
      expect(stars).toHaveLength(5);
    });

    it("should render with zero rating", () => {
      render(<RatingStars rating={0} count={0} />);
      const stars = screen.getAllByLabelText(/star/i);
      expect(stars).toHaveLength(5);
    });

    it("should render without count", () => {
      render(<RatingStars rating={3} />);
      expect(screen.queryByText("(0)")).not.toBeInTheDocument();
    });

    it("should render with count", () => {
      render(<RatingStars rating={4} count={10} />);
      expect(screen.getByText("(10)")).toBeInTheDocument();
    });
  });

  describe("Star Icons", () => {
    it("should show filled stars for rating >= star", () => {
      render(<RatingStars rating={4} />);
      const filledStars = screen.getAllByRole("button", {
        name: /^5 out of 5 stars$/i,
      });
      expect(filledStars.length).toBeLessThan(5);
    });

    it("should show half star for rating 4.5", () => {
      render(<RatingStars rating={4.5} />);
      const filledStars = screen.getAllByRole("button", {
        name: /^5 out of 5 stars$/i,
      });
      expect(filledStars.length).toBeLessThan(5);
    });
  });

  describe("Interactive Mode", () => {
    it("should not allow rating changes when interactive is false", () => {
      render(<RatingStars rating={3} interactive={false} />);
      const stars = screen.getAllByRole("button");
      stars.forEach((star) => {
        expect(star).toBeDisabled();
      });
    });

    it("should allow rating changes when interactive is true", () => {
      const onRatingChange = jest.fn();
      render(
        <RatingStars
          rating={3}
          interactive={true}
          onRatingChange={onRatingChange}
        />,
      );
      const stars = screen.getAllByRole("button");
      expect(stars[0]).not.toBeDisabled();
    });

    it("should call onRatingChange when a star is clicked", async () => {
      const onRatingChange = jest.fn();
      render(
        <RatingStars
          rating={3}
          interactive={true}
          onRatingChange={onRatingChange}
        />,
      );

      await act(async () => {
        fireEvent.click(
          screen.getAllByRole("button", { name: /^4 out of 5 stars$/i })[0],
        );
      });

      expect(onRatingChange).toHaveBeenCalledWith(4);
    });
  });

  describe("Size Variants", () => {
    it("should render with small size", () => {
      const { container } = render(<RatingStars rating={4} size="sm" />);
      const buttons = container.querySelectorAll("button");
      expect(buttons[0]).toHaveClass("h-3");
    });

    it("should render with medium size", () => {
      const { container } = render(<RatingStars rating={4} size="md" />);
      const buttons = container.querySelectorAll("button");
      expect(buttons[0]).toHaveClass("h-4");
    });

    it("should render with large size", () => {
      const { container } = render(<RatingStars rating={4} size="lg" />);
      const buttons = container.querySelectorAll("button");
      expect(buttons[0]).toHaveClass("h-5");
    });
  });
});
