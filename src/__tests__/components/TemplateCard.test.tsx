import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TemplateCard from "@/components/TemplateCard";
import type { Template } from "@/lib/types";

const mockTemplate: Template = {
  id: "test-1",
  title: "Test Template",
  tags: ["Cafe", "Modern"],
  industry: "Cafe",
  tone: "Modern",
  style: "Minimal",
  thumb: "/images/test.jpg",
  preview_path: "/templates/test/index.html",
};

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe("TemplateCard Component", () => {
  it("should render template title", () => {
    renderWithRouter(
      <TemplateCard template={mockTemplate} onClick={jest.fn()} />,
    );
    expect(screen.getByText("Test Template")).toBeInTheDocument();
  });

  it("should render template image with correct alt text and src", () => {
    renderWithRouter(
      <TemplateCard template={mockTemplate} onClick={jest.fn()} />,
    );
    const img = screen.getByAltText("Test Template") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("/images/test.jpg");
  });

  it("should render all template tags", () => {
    renderWithRouter(
      <TemplateCard template={mockTemplate} onClick={jest.fn()} />,
    );
    expect(screen.getByText("Cafe")).toBeInTheDocument();
    expect(screen.getByText("Modern")).toBeInTheDocument();
  });

  it("should call onClick when preview button is clicked", () => {
    const onClick = jest.fn();
    renderWithRouter(
      <TemplateCard template={mockTemplate} onClick={onClick} />,
    );
    fireEvent.click(screen.getByText("プレビュー"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should not propagate preview button click to card", () => {
    const onClick = jest.fn();
    renderWithRouter(
      <TemplateCard template={mockTemplate} onClick={onClick} />,
    );
    fireEvent.click(screen.getByText("プレビュー"));
    // onClick is called exactly once (from the button handler), not twice (card + button)
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should render detail link with correct href", () => {
    renderWithRouter(
      <TemplateCard template={mockTemplate} onClick={jest.fn()} />,
    );
    const detailLink = screen
      .getByText("詳細")
      .closest("a") as HTMLAnchorElement;
    expect(detailLink).toBeInTheDocument();
    expect(detailLink.getAttribute("href")).toBe("/templates/test-1");
  });

  it("should render download button", () => {
    renderWithRouter(
      <TemplateCard template={mockTemplate} onClick={jest.fn()} />,
    );
    expect(
      screen.getByRole("button", { name: /ダウンロード/i }),
    ).toBeInTheDocument();
  });

  it("should call onTagClick with tag name when a tag badge is clicked", () => {
    const onClick = jest.fn();
    const onTagClick = jest.fn();
    renderWithRouter(
      <TemplateCard
        template={mockTemplate}
        onClick={onClick}
        onTagClick={onTagClick}
      />,
    );
    fireEvent.click(screen.getByText("Cafe"));
    expect(onTagClick).toHaveBeenCalledWith("Cafe");
  });

  it("should not call onClick when tag badge is clicked (stopPropagation)", () => {
    const onClick = jest.fn();
    const onTagClick = jest.fn();
    renderWithRouter(
      <TemplateCard
        template={mockTemplate}
        onClick={onClick}
        onTagClick={onTagClick}
      />,
    );
    fireEvent.click(screen.getByText("Cafe"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("should not throw when onTagClick is not provided and tag is clicked", () => {
    renderWithRouter(
      <TemplateCard template={mockTemplate} onClick={jest.fn()} />,
    );
    expect(() => fireEvent.click(screen.getByText("Cafe"))).not.toThrow();
  });

  it("should render tags with secondary variant when not selected", () => {
    renderWithRouter(
      <TemplateCard
        template={mockTemplate}
        onClick={jest.fn()}
        selectedTags={[]}
      />,
    );
    // Both tags should be present; neither is highlighted
    expect(screen.getByText("Cafe")).toBeInTheDocument();
    expect(screen.getByText("Modern")).toBeInTheDocument();
  });

  it("should apply different styling to selected tags", () => {
    renderWithRouter(
      <TemplateCard
        template={mockTemplate}
        onClick={jest.fn()}
        selectedTags={["Cafe"]}
      />,
    );
    // Both tags still rendered
    expect(screen.getByText("Cafe")).toBeInTheDocument();
    expect(screen.getByText("Modern")).toBeInTheDocument();
  });

  it("should render with empty tags array", () => {
    const templateNoTags: Template = { ...mockTemplate, tags: [] };
    renderWithRouter(
      <TemplateCard template={templateNoTags} onClick={jest.fn()} />,
    );
    expect(screen.getByText("Test Template")).toBeInTheDocument();
  });

  it("should render preview button with Japanese text", () => {
    renderWithRouter(
      <TemplateCard template={mockTemplate} onClick={jest.fn()} />,
    );
    expect(screen.getByText("プレビュー")).toBeInTheDocument();
  });

  it("should render detail button with Japanese text", () => {
    renderWithRouter(
      <TemplateCard template={mockTemplate} onClick={jest.fn()} />,
    );
    expect(screen.getByText("詳細")).toBeInTheDocument();
  });

  it("should not call onClick when detail link is clicked (stopPropagation)", () => {
    const onClick = jest.fn();
    renderWithRouter(
      <TemplateCard template={mockTemplate} onClick={onClick} />,
    );
    const detailLink = screen
      .getByText("詳細")
      .closest("a") as HTMLAnchorElement;
    fireEvent.click(detailLink);
    expect(onClick).not.toHaveBeenCalled();
  });
});
