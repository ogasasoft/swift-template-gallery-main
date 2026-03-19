import React from "react";
import { render, screen } from "@testing-library/react";
import PreviewModal from "@/components/PreviewModal";

type Template = { id: string; title: string; preview_path: string };

// Mock the Dialog components
jest.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog">{children}</div>
  ),
  DialogContent: ({ children }: { children: React.ReactNode }) => (
    <div
      data-testid="dialog-content"
      className="max-w-6xl h-[90vh] flex flex-col p-4 gap-2"
    >
      {children}
    </div>
  ),
  DialogHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-header" className="py-1">
      {children}
    </div>
  ),
  DialogTitle: ({ children }: { children: React.ReactNode }) => (
    <h2 data-testid="dialog-title">{children}</h2>
  ),
}));

describe("PreviewModal Component", () => {
  const mockTemplate = {
    id: "1",
    title: "Test Template",
    preview_path: "https://example.com/preview",
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render correctly when template is provided", () => {
      render(<PreviewModal template={mockTemplate} onClose={mockOnClose} />);

      expect(screen.getByTestId("dialog")).toBeInTheDocument();
      expect(screen.getByTestId("dialog-content")).toBeInTheDocument();
      expect(screen.getByTestId("dialog-header")).toBeInTheDocument();
      expect(screen.getByTestId("dialog-title")).toBeInTheDocument();
    });

    it("should display the template title", () => {
      render(<PreviewModal template={mockTemplate} onClose={mockOnClose} />);

      expect(screen.getByTestId("dialog-title")).toHaveTextContent(
        "Test Template Preview",
      );
    });

    it("should not render when template is null", () => {
      render(<PreviewModal template={null} onClose={mockOnClose} />);

      expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();
    });

    it("should not render when template is undefined", () => {
      render(<PreviewModal template={undefined} onClose={mockOnClose} />);

      expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();
    });
  });

  describe("Props", () => {
    it("should receive template props", () => {
      const customTemplate = {
        id: "2",
        title: "Custom Template",
        preview_path: "https://example.com/custom",
      };

      render(<PreviewModal template={customTemplate} onClose={mockOnClose} />);

      expect(screen.getByTestId("dialog-title")).toHaveTextContent(
        "Custom Template Preview",
      );
    });

    it("should receive onClose callback", () => {
      render(<PreviewModal template={mockTemplate} onClose={mockOnClose} />);

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe("Dialog Behavior", () => {
    it("should open dialog when template is provided", () => {
      render(<PreviewModal template={mockTemplate} onClose={mockOnClose} />);

      expect(screen.getByTestId("dialog")).toBeInTheDocument();
    });

    it("should set dialog open state based on template presence", () => {
      const { rerender } = render(
        <PreviewModal template={mockTemplate} onClose={mockOnClose} />,
      );

      expect(screen.getByTestId("dialog")).toBeInTheDocument();

      // When template is null, dialog should be closed
      rerender(<PreviewModal template={null} onClose={mockOnClose} />);
      expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();
    });
  });

  describe("Content Structure", () => {
    it("should render DialogContent with correct classes", () => {
      render(<PreviewModal template={mockTemplate} onClose={mockOnClose} />);

      const dialogContent = screen.getByTestId("dialog-content");
      expect(dialogContent).toHaveClass("max-w-6xl");
      expect(dialogContent).toHaveClass("h-[90vh]");
      expect(dialogContent).toHaveClass("flex");
      expect(dialogContent).toHaveClass("flex-col");
      expect(dialogContent).toHaveClass("p-4");
      expect(dialogContent).toHaveClass("gap-2");
    });

    it("should render DialogHeader with correct class", () => {
      render(<PreviewModal template={mockTemplate} onClose={mockOnClose} />);

      const dialogHeader = screen.getByTestId("dialog-header");
      expect(dialogHeader).toHaveClass("py-1");
    });

    it("should render iframe with correct attributes", () => {
      render(<PreviewModal template={mockTemplate} onClose={mockOnClose} />);

      const iframe = screen.getByTitle("Test Template preview");
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute("src", "https://example.com/preview");
      expect(iframe).toHaveAttribute("title", "Test Template preview");
      expect(iframe.className).toContain("w-full");
      expect(iframe.className).toContain("h-full");
      expect(iframe.className).toContain("border-0");
    });

    it("should render iframe when template is provided", () => {
      render(<PreviewModal template={mockTemplate} onClose={mockOnClose} />);

      const iframe = screen.getByTitle("Test Template preview");
      expect(iframe).toBeInTheDocument();
    });

    it("should render background container with correct classes", () => {
      render(<PreviewModal template={mockTemplate} onClose={mockOnClose} />);

      const iframe = screen.getByTitle("Test Template preview");
      const parentDiv = iframe.parentElement;

      expect(parentDiv).toBeInTheDocument();
      expect(parentDiv).toHaveClass("flex-1");
      expect(parentDiv).toHaveClass("bg-muted");
      expect(parentDiv).toHaveClass("rounded-lg");
      expect(parentDiv).toHaveClass("overflow-hidden");
      expect(parentDiv).toHaveClass("min-h-0");
    });
  });

  describe("onClose Callback", () => {
    it("should call onClose when component unmounts without null template", () => {
      const { unmount } = render(
        <PreviewModal template={mockTemplate} onClose={mockOnClose} />,
      );

      unmount();

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty template object", () => {
      const emptyTemplate: Template = {
        id: "",
        title: "",
        preview_path: "",
      };

      render(<PreviewModal template={emptyTemplate} onClose={mockOnClose} />);

      // Should still render but with empty values
      expect(screen.getByTestId("dialog")).toBeInTheDocument();
    });

    it("should handle template with special characters in title", () => {
      const specialCharTemplate = {
        id: "3",
        title: 'Template with <special> "characters"',
        preview_path: "https://example.com/special",
      };

      render(
        <PreviewModal template={specialCharTemplate} onClose={mockOnClose} />,
      );

      expect(screen.getByTestId("dialog-title")).toHaveTextContent(
        'Template with <special> "characters" Preview',
      );
    });

    it("should handle very long template title", () => {
      const longTitleTemplate = {
        id: "4",
        title: "A".repeat(200),
        preview_path: "https://example.com/long",
      };

      render(
        <PreviewModal template={longTitleTemplate} onClose={mockOnClose} />,
      );

      expect(screen.getByTestId("dialog-title")).toHaveTextContent(
        `${"A".repeat(200)} Preview`,
      );
    });

    it("should handle malformed URL in preview_path", () => {
      const malformedUrlTemplate = {
        id: "5",
        title: "Malformed URL Template",
        preview_path: "not-a-valid-url",
      };

      render(
        <PreviewModal template={malformedUrlTemplate} onClose={mockOnClose} />,
      );

      // Should still render the iframe with invalid URL
      const iframe = screen.getByTitle("Malformed URL Template preview");
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute("src", "not-a-valid-url");
    });
  });
});
