import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TemplateCard from "@/components/TemplateCard";
import type { Template } from "@/lib/types";

const mockTemplate: Template = {
  id: "test-001",
  title: "Test Template",
  tags: ["Test", "Sample"],
  industry: "Test Industry",
  tone: "Test Tone",
  style: "Test Style",
  thumb: "https://example.com/thumb.jpg",
  preview_path: "/templates/test-001/index.html",
};

describe("TemplateCard", () => {
  it("renders template information correctly", () => {
    const onClick = jest.fn();

    render(
      <MemoryRouter>
        <TemplateCard
          template={mockTemplate}
          onClick={onClick}
          onTagClick={jest.fn()}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Template")).toBeInTheDocument();
  });

  it("calls onClick when card is clicked", () => {
    const onClick = jest.fn();

    render(
      <MemoryRouter>
        <TemplateCard
          template={mockTemplate}
          onClick={onClick}
          onTagClick={jest.fn()}
        />
      </MemoryRouter>,
    );

    const card = screen.getByRole("heading", { name: /test template/i });
    fireEvent.click(card);

    expect(onClick).toHaveBeenCalled();
  });

  it("calls onTagClick when tag is clicked", () => {
    const onClick = jest.fn();
    const onTagClick = jest.fn();

    render(
      <MemoryRouter>
        <TemplateCard
          template={mockTemplate}
          onClick={onClick}
          onTagClick={onTagClick}
        />
      </MemoryRouter>,
    );

    const tag = screen.getByText("Test");
    fireEvent.click(tag);

    expect(onTagClick).toHaveBeenCalledWith("Test");
  });

  it("renders preview button", () => {
    const onClick = jest.fn();

    render(
      <MemoryRouter>
        <TemplateCard
          template={mockTemplate}
          onClick={onClick}
          onTagClick={jest.fn()}
        />
      </MemoryRouter>,
    );

    const previewButton = screen.getByRole("button", { name: /プレビュー/i });
    expect(previewButton).toBeInTheDocument();
  });

  it("renders details link", () => {
    render(
      <MemoryRouter>
        <TemplateCard
          template={mockTemplate}
          onClick={jest.fn()}
          onTagClick={jest.fn()}
        />
      </MemoryRouter>,
    );

    const detailsLink = screen.getByRole("link", { name: /詳細/i });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute("href", "/templates/test-001");
  });

  it("calls onDownload when download button is clicked", () => {
    const onDownload = jest.fn();

    render(
      <MemoryRouter>
        <TemplateCard
          template={mockTemplate}
          onClick={jest.fn()}
          onTagClick={jest.fn()}
          onDownload={onDownload}
        />
      </MemoryRouter>,
    );

    const downloadButton = screen.getByRole("button", {
      name: /テンプレート「Test Template」をダウンロード/i,
    });

    expect(downloadButton).toBeInTheDocument();

    fireEvent.click(downloadButton);

    expect(onDownload).toHaveBeenCalledWith(mockTemplate);
  });

  it("renders download button with aria-label", () => {
    const onClick = jest.fn();
    const onDownload = jest.fn();

    render(
      <MemoryRouter>
        <TemplateCard
          template={mockTemplate}
          onClick={onClick}
          onTagClick={jest.fn()}
          onDownload={onDownload}
        />
      </MemoryRouter>,
    );

    const downloadButton = screen.getByRole("button", {
      name: /テンプレート「Test Template」をダウンロード/i,
    });

    expect(downloadButton).toBeInTheDocument();
  });

  it("renders rating stars if rating is provided", () => {
    const onClick = jest.fn();
    const templateWithRating = {
      ...mockTemplate,
      rating: 4,
      reviewCount: 10,
    };

    render(
      <MemoryRouter>
        <TemplateCard
          template={templateWithRating}
          onClick={onClick}
          onTagClick={jest.fn()}
          onDownload={jest.fn()}
        />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("button", { name: /4 out of 5 stars/i }),
    ).toBeInTheDocument();
  });
});
