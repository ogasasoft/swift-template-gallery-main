import { render, screen, fireEvent } from "@testing-library/react";
import GalleryFilters from "@/components/GalleryFilters";
import type { FilterState } from "@/lib/types";

const defaultFilters: FilterState = {
  tags: [],
  industry: [],
  tone: [],
  style: [],
  search: "",
};

const defaultProps = {
  filters: defaultFilters,
  setFilters: jest.fn(),
  allTags: ["Cafe", "Simple", "Minimal", "Luxury", "Elegant"],
  allIndustries: ["Cafe", "Restaurant", "Fashion", "Tech"],
  allTones: ["Simple", "Luxury", "Pop", "Natural", "Modern"],
  allStyles: ["Minimal", "Elegant", "Colorful", "Organic", "Clean"],
  totalTemplates: 10,
  filteredCount: 10,
};

describe("GalleryFilters Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render search input", () => {
    render(<GalleryFilters {...defaultProps} />);
    expect(
      screen.getByPlaceholderText("テンプレートを検索..."),
    ).toBeInTheDocument();
  });

  it("should render filter button", () => {
    render(<GalleryFilters {...defaultProps} />);
    expect(screen.getByText("フィルター")).toBeInTheDocument();
  });

  it("should show total template count without active filters", () => {
    render(<GalleryFilters {...defaultProps} />);
    expect(screen.getByText("10 件のテンプレート")).toBeInTheDocument();
  });

  it("should show filtered count when filters are active", () => {
    render(
      <GalleryFilters
        {...defaultProps}
        filters={{ ...defaultFilters, search: "Cafe" }}
        filteredCount={3}
      />,
    );
    expect(screen.getByText(/3/)).toBeInTheDocument();
    expect(screen.getByText(/10 件のテンプレートを表示/)).toBeInTheDocument();
  });

  it("should call setFilters when search changes", () => {
    const setFilters = jest.fn();
    render(<GalleryFilters {...defaultProps} setFilters={setFilters} />);
    const input = screen.getByPlaceholderText("テンプレートを検索...");
    fireEvent.change(input, { target: { value: "cafe" } });
    expect(setFilters).toHaveBeenCalledWith(
      expect.objectContaining({ search: "cafe" }),
    );
  });

  it("should show clear button when search is active", () => {
    render(
      <GalleryFilters
        {...defaultProps}
        filters={{ ...defaultFilters, search: "test" }}
      />,
    );
    expect(screen.getByText("クリア")).toBeInTheDocument();
  });

  it("should not show clear button when no active filters", () => {
    render(<GalleryFilters {...defaultProps} />);
    expect(screen.queryByText("クリア")).not.toBeInTheDocument();
  });

  it("should call setFilters with empty state when clear is clicked", () => {
    const setFilters = jest.fn();
    render(
      <GalleryFilters
        {...defaultProps}
        setFilters={setFilters}
        filters={{ ...defaultFilters, search: "test" }}
      />,
    );
    fireEvent.click(screen.getByText("クリア"));
    expect(setFilters).toHaveBeenCalledWith({
      tags: [],
      industry: [],
      tone: [],
      style: [],
      search: "",
    });
  });

  it("should show active filter chips for selected industry", () => {
    render(
      <GalleryFilters
        {...defaultProps}
        filters={{ ...defaultFilters, industry: ["Cafe"] }}
      />,
    );
    expect(screen.getByText("業種: Cafe")).toBeInTheDocument();
  });

  it("should show active filter chips for selected tone", () => {
    render(
      <GalleryFilters
        {...defaultProps}
        filters={{ ...defaultFilters, tone: ["Luxury"] }}
      />,
    );
    expect(screen.getByText("トーン: Luxury")).toBeInTheDocument();
  });

  it("should show active filter chips for selected style", () => {
    render(
      <GalleryFilters
        {...defaultProps}
        filters={{ ...defaultFilters, style: ["Minimal"] }}
      />,
    );
    expect(screen.getByText("スタイル: Minimal")).toBeInTheDocument();
  });

  it("should show active filter count badge on filter button", () => {
    render(
      <GalleryFilters
        {...defaultProps}
        filters={{ ...defaultFilters, industry: ["Cafe"], tone: ["Simple"] }}
      />,
    );
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should remove industry filter chip when clicked", () => {
    const setFilters = jest.fn();
    render(
      <GalleryFilters
        {...defaultProps}
        setFilters={setFilters}
        filters={{ ...defaultFilters, industry: ["Cafe", "Restaurant"] }}
      />,
    );
    // Click the Cafe industry chip
    const cafeBadge = screen.getByText("業種: Cafe");
    fireEvent.click(cafeBadge);
    expect(setFilters).toHaveBeenCalledWith(
      expect.objectContaining({ industry: ["Restaurant"] }),
    );
  });

  it("should show 'selected' label when active filters exist", () => {
    render(
      <GalleryFilters
        {...defaultProps}
        filters={{ ...defaultFilters, tags: ["Cafe"] }}
      />,
    );
    expect(screen.getByText("選択中:")).toBeInTheDocument();
  });
});
