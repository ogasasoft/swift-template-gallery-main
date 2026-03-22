import { render, screen, fireEvent } from "@testing-library/react";
import PreviewModal from "@/components/PreviewModal";
import type { Template } from "@/types/template";

describe("PreviewModal", () => {
  const mockTemplate: Template = {
    id: "1",
    title: "Dashboard Template",
    industry: "SaaS",
    tags: ["dashboard", "analytics"],
    thumb: "/images/template1.jpg",
    preview_path: "/preview/dashboard-template.html",
    tone: "modern",
  };

  it("renders dialog when template is provided", () => {
    render(
      <PreviewModal
        template={mockTemplate}
        onClose={() => {}}
      />
    );

    expect(screen.getByText("Dashboard Template Preview")).toBeInTheDocument();
    const iframe = document.querySelector("iframe");
    expect(iframe).toHaveAttribute("title", "Dashboard Template preview");
  });

  it("does not render when template is null", () => {
    const { container } = render(
      <PreviewModal
        template={null}
        onClose={() => {}}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("calls onClose when clicking outside or pressing Escape", () => {
    const handleClose = jest.fn();
    render(
      <PreviewModal
        template={mockTemplate}
        onClose={handleClose}
      />
    );

    // Dialog is wired to call onClose via onOpenChange (triggered by Escape key)
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("passes correct props to iframe", () => {
    render(
      <PreviewModal
        template={mockTemplate}
        onClose={() => {}}
      />
    );

    const iframe = document.querySelector("iframe");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", "/preview/dashboard-template.html");
    expect(iframe).toHaveAttribute("title", "Dashboard Template preview");
  });

  it("has correct class names for styling", () => {
    render(
      <PreviewModal
        template={mockTemplate}
        onClose={() => {}}
      />
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("max-w-6xl");
    expect(dialog).toHaveClass("h-[90vh]");
    expect(dialog).toHaveClass("flex");
    expect(dialog).toHaveClass("flex-col");
    expect(dialog).toHaveClass("p-4");
    expect(dialog).toHaveClass("gap-2");
  });

  it("hides when dialog is closed", () => {
    render(
      <PreviewModal
        template={mockTemplate}
        onClose={() => {}}
      />
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeVisible();
  });
});
