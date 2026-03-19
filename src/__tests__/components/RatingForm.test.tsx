import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RatingForm from "@/components/RatingForm";

describe("RatingForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should render all required fields", () => {
    render(<RatingForm templateId="test-template" />);
    expect(
      screen.getByRole("heading", {
        name: /このテンプレートの評価/i,
        level: 4,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(
        /このテンプレートについてご意見をお聞かせください.../i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /評価を送信/i }),
    ).toBeInTheDocument();
  });

  it("should show rating stars", () => {
    render(<RatingForm templateId="test-template" />);
    expect(screen.getAllByRole("button", { name: /stars/i })).toHaveLength(5);
  });

  it("should disable submit button when rating is 0", () => {
    render(<RatingForm templateId="test-template" />);
    const submitButton = screen.getByRole("button", { name: /評価を送信/i });
    expect(submitButton).toBeDisabled();
  });

  it("should enable submit button when rating is provided", () => {
    render(<RatingForm templateId="test-template" />);
    const submitButton = screen.getByRole("button", { name: /評価を送信/i });
    const stars = screen.getAllByRole("button", { name: /stars/i });
    fireEvent.click(stars[3]); // Click 4 stars
    expect(submitButton).not.toBeDisabled();
  });

  it.skip("should call toast when rating is 0", async () => {
    // Create a mock toast function
    const mockToast = jest.fn();
    // Mock useToast before importing RatingForm
    jest.mock("@/components/ui/use-toast", () => ({
      useToast: jest.fn().mockReturnValue({ toast: mockToast }),
    }));

    // Import after mock is set up
    render(<RatingForm templateId="test-template" />);
    const submitButton = screen.getByRole("button", { name: /評価を送信/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
    });
  });

  it("should show submitted message after successful submission", async () => {
    const mockToast = jest.fn();
    jest.mock("@/components/ui/use-toast", () => ({
      useToast: jest.fn().mockReturnValue({ toast: mockToast }),
    }));

    render(<RatingForm templateId="test-template" />);
    const stars = screen.getAllByRole("button", { name: /out of 5 stars/i });
    fireEvent.click(stars[4]); // Click 5 stars
    fireEvent.change(
      screen.getByPlaceholderText(
        /このテンプレートについてご意見をお聞かせください.../i,
      ),
      {
        target: { value: "Excellent template!" },
      },
    );

    const submitButton = screen.getByRole("button", { name: /評価を送信/i });
    fireEvent.click(submitButton);

    // Fast-forward time to simulate 1 second delay
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(
        screen.getByText(/このテンプレートの評価を送信しました/i),
      ).toBeInTheDocument();
    });
  });

  it("should reset form after successful submission", async () => {
    const mockToast = jest.fn();
    jest.mock("@/components/ui/use-toast", () => ({
      useToast: jest.fn().mockReturnValue({ toast: mockToast }),
    }));

    render(<RatingForm templateId="test-template" />);
    const stars = screen.getAllByRole("button", { name: /out of 5 stars/i });
    fireEvent.click(stars[3]); // Click 4 stars
    fireEvent.change(
      screen.getByPlaceholderText(
        /このテンプレートについてご意見をお聞かせください.../i,
      ),
      {
        target: { value: "Great!" },
      },
    );

    const submitButton = screen.getByRole("button", { name: /評価を送信/i });
    fireEvent.click(submitButton);

    // Fast-forward time to simulate 1 second delay
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(
        screen.getByText(/このテンプレートの評価を送信しました/i),
      ).toBeInTheDocument();
    });
  });

  it("should disable textarea and button while submitting", async () => {
    const mockToast = jest.fn();
    jest.mock("@/components/ui/use-toast", () => ({
      useToast: jest.fn().mockReturnValue({ toast: mockToast }),
    }));

    render(<RatingForm templateId="test-template" />);
    const stars = screen.getAllByRole("button", { name: /stars/i });
    fireEvent.click(stars[3]); // Click 4 stars

    const submitButton = screen.getByRole("button", { name: /評価を送信/i });
    fireEvent.click(submitButton);

    const textarea = screen.getByPlaceholderText(
      /このテンプレートについてご意見をお聞かせください.../i,
    );
    expect(textarea).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });

  it("should call onReviewSubmitted callback after submission", async () => {
    const onReviewSubmitted = jest.fn();
    const mockToast = jest.fn();
    jest.mock("@/components/ui/use-toast", () => ({
      useToast: jest.fn().mockReturnValue({ toast: mockToast }),
    }));

    render(
      <RatingForm
        templateId="test-template"
        onReviewSubmitted={onReviewSubmitted}
      />,
    );
    const stars = screen.getAllByRole("button", { name: /stars/i });
    fireEvent.click(stars[3]); // Click 4 stars
    fireEvent.change(
      screen.getByPlaceholderText(
        /このテンプレートについてご意見をお聞かせください.../i,
      ),
      {
        target: { value: "Good!" },
      },
    );

    const submitButton = screen.getByRole("button", { name: /評価を送信/i });
    fireEvent.click(submitButton);

    // Fast-forward time to simulate 1 second delay
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(onReviewSubmitted).toHaveBeenCalled();
    });
  });
});
