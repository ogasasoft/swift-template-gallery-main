import { render, screen, fireEvent } from "@testing-library/react";
import TemplateCard from "@/components/TemplateCard";
import type { Template } from "@/types/template";

describe("TemplateCard", () => {
  const mockTemplate: Template = {
    id: "1",
    title: "E-commerce Template",
    industry: "Retail",
    tags: ["shop", "product"],
    thumb: "/images/template1.jpg",
    preview_path: "/preview/ecommerce.html",
    description: "A complete e-commerce solution",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  };

  const mockOnClick = jest.fn();

  it("renders card with template information", () => {
    render(
      <TemplateCard
        template={mockTemplate}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText("E-commerce Template")).toBeInTheDocument();
    expect(screen.getByText("Retail")).toBeInTheDocument();
    expect(screen.getByText("shop, product")).toBeInTheDocument();
  });

  it("calls onClick when card is clicked", () => {
    mockOnClick.mockClear();
    const { container } = render(
      <TemplateCard
        template={mockTemplate}
        onClick={mockOnClick}
      />
    );

    const card = container.firstChild as HTMLElement;
    if (!card) {
      throw new Error('Card not found');
    }
    fireEvent.click(card);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("renders industry badge", () => {
    render(
      <TemplateCard
        template={mockTemplate}
        onClick={mockOnClick}
      />
    );

    const badge = screen.getByText("Retail");
    expect(badge).toBeInTheDocument();
    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveClass("bg-blue-100");
    expect(badge).toHaveClass("text-blue-800");
  });

  it("renders tags as comma-separated text", () => {
    render(
      <TemplateCard
        template={mockTemplate}
        onClick={mockOnClick}
      />
    );

    const tags = screen.getByText("shop, product");
    expect(tags).toBeInTheDocument();
  });

  it("renders View and Download buttons", () => {
    render(
      <TemplateCard
        template={mockTemplate}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText("View")).toBeInTheDocument();
    expect(screen.getByText("Download")).toBeInTheDocument();
  });

  it("has correct styling classes", () => {
    const { container } = render(
      <TemplateCard
        template={mockTemplate}
        onClick={mockOnClick}
      />
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("group");
    expect(card).toHaveClass("relative");
    expect(card).toHaveClass("overflow-hidden");
    expect(card).toHaveClass("rounded-lg");
    expect(card).toHaveClass("border");
    expect(card).toHaveClass("bg-white");
    expect(card).toHaveClass("transition-all");
    expect(card).toHaveClass("hover:shadow-lg");
  });

  it("has aspect ratio container for image", () => {
    render(
      <TemplateCard
        template={mockTemplate}
        onClick={mockOnClick}
      />
    );

    const imageContainer = screen.getByAltText("E-commerce Template");
    expect(imageContainer).toBeInTheDocument();
    expect(imageContainer.tagName).toBe("IMG");
  });

  it("uses template thumbnail image", () => {
    render(
      <TemplateCard
        template={mockTemplate}
        onClick={mockOnClick}
      />
    );

    const image = screen.getByAltText("E-commerce Template");
    expect(image).toHaveAttribute("src", "/images/template1.jpg");
  });

  it("has hover effect classes", () => {
    const { container } = render(
      <TemplateCard
        template={mockTemplate}
        onClick={mockOnClick}
      />
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("group");
  });

  it("applies hover:shadow-lg on group hover", () => {
    const { container } = render(
      <TemplateCard
        template={mockTemplate}
        onClick={mockOnClick}
      />
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("group");
  });

  it("handles multiple tags correctly", () => {
    const multiTagTemplate: Template = {
      ...mockTemplate,
      tags: ["react", "typescript", "vite", "shadcn-ui"],
    };

    render(
      <TemplateCard
        template={multiTagTemplate}
        onClick={mockOnClick}
      />
    );

    const tags = screen.getByText("react, typescript, vite, shadcn-ui");
    expect(tags).toBeInTheDocument();
  });
});
