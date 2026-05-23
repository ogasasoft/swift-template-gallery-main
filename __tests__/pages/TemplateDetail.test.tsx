import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TemplateDetail from "@/pages/TemplateDetail";
import templatesData from "@/lib/templates.json";
import type { Template } from "@/lib/types";

// Mock the templates.json to include sample data
const mockTemplates = templatesData as Template[];

describe("TemplateDetail", () => {
  const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it("should render the template detail page", () => {
    const mockTemplate = mockTemplates[0];
    renderWithRouter(<TemplateDetail />);

    expect(screen.getByText(mockTemplate.title)).toBeInTheDocument();
    expect(screen.getByText(mockTemplate.industry)).toBeInTheDocument();
    expect(screen.getByText(mockTemplate.tone)).toBeInTheDocument();
    expect(screen.getByText(mockTemplate.style)).toBeInTheDocument();
  });

  it("should display all tags for the template", () => {
    const mockTemplate = mockTemplates[0];
    renderWithRouter(<TemplateDetail />);

    mockTemplate.tags.forEach((tag) => {
      const tagElements = screen.queryAllByText(tag);
      expect(tagElements.length).toBeGreaterThan(0);
    });
  });

  it("should render back to gallery button", () => {
    renderWithRouter(<TemplateDetail />);

    const backButton = screen.getByRole("link", { name: /ギャラリーに戻る/i });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute("href", "/");
  });

  it("should render preview button", () => {
    renderWithRouter(<TemplateDetail />);

    const previewButton = screen.getByRole("button", { name: /プレビューを見る/i });
    expect(previewButton).toBeInTheDocument();
  });

  it("should handle tag toggle - remove tag when clicked", () => {
    const mockTemplate = { ...mockTemplates[0] };
    renderWithRouter(<TemplateDetail />);

    const firstTag = screen.getByText(mockTemplate.tags[0]);
    fireEvent.click(firstTag);

    expect(screen.queryByText(mockTemplate.tags[0])).not.toBeInTheDocument();
  });

  it("should handle tag add - add new tag from input", async () => {
    renderWithRouter(<TemplateDetail />);

    const input = screen.getByPlaceholderText(/Add new tag.../i);
    const addButton = screen.getByRole("button", { name: /add new tag/i });
    const newTag = "New Tag";

    fireEvent.change(input, { target: { value: newTag } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.queryByText(newTag)).toBeInTheDocument();
    });
  });

  it("should not add duplicate tags", async () => {
    const mockTemplate = { ...mockTemplates[0] };
    const initialTagCount = mockTemplate.tags.length;

    renderWithRouter(<TemplateDetail />);

    const input = screen.getByPlaceholderText(/Add new tag.../i);
    const addButton = screen.getByRole("button", { name: /add new tag/i });
    const duplicateTag = mockTemplate.tags[0];

    fireEvent.change(input, { target: { value: duplicateTag } });
    fireEvent.click(addButton);

    await waitFor(() => {
      const tagElements = screen.queryAllByText(duplicateTag);
      expect(tagElements.length).toBe(initialTagCount);
    });
  });

  it("should remove whitespace from tag input", async () => {
    renderWithRouter(<TemplateDetail />);

    const input = screen.getByPlaceholderText(/Add new tag.../i);
    const addButton = screen.getByRole("button", { name: /add new tag/i });
    const newTag = "  New Tag  ";

    fireEvent.change(input, { target: { value: newTag } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("New Tag")).toBeInTheDocument();
    });
  });

  it("should not add empty tag", async () => {
    renderWithRouter(<TemplateDetail />);

    const input = screen.getByPlaceholderText(/Add new tag.../i);
    const addButton = screen.getByRole("button", { name: /add new tag/i });

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.queryByPlaceholderText(/Add new tag.../i)).toBeInTheDocument();
    });
  });

  it("should add tag on Enter key press", async () => {
    renderWithRouter(<TemplateDetail />);

    const input = screen.getByPlaceholderText(/Add new tag.../i);
    const newTag = "EnterTag";

    fireEvent.change(input, { target: { value: newTag } });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(screen.getByText(newTag)).toBeInTheDocument();
    });
  });

  it("should render all available tags for toggling", () => {
    renderWithRouter(<TemplateDetail />);

    const allTags = Array.from(
      new Set(mockTemplates.flatMap((t) => t.tags))
    ).sort();

    allTags.forEach((tag) => {
      const tagElements = screen.queryAllByText(tag);
      expect(tagElements.length).toBeGreaterThan(0);
      expect(tagElements[0]).toHaveClass("cursor-pointer");
    });
  });
});
