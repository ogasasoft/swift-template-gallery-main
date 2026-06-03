import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import TemplateDetail from "@/pages/TemplateDetail";

jest.mock("@/lib/templates.json", () => [
  {
    id: "cafe-01",
    title: "Cafe-01",
    tags: ["Cafe", "Simple", "Minimal", "Light"],
    industry: "Cafe",
    tone: "Simple",
    style: "Minimal",
    thumb: "/templates/test/template.jpg",
    preview_path: "/templates/cafe-01/index.html",
  },
  {
    id: "restaurant-01",
    title: "Restaurant-01",
    tags: ["Restaurant", "Elegant", "Sophisticated", "Classic"],
    industry: "Restaurant",
    tone: "Sophisticated",
    style: "Elegant",
    thumb: "/templates/restaurant/template.jpg",
    preview_path: "/templates/restaurant-01/index.html",
  },
]);

const renderWithRoute = (id: string) => {
  return render(
    <MemoryRouter initialEntries={[`/templates/${id}`]}>
      <Routes>
        <Route path="/templates/:id" element={<TemplateDetail />} />
        <Route path="/" element={<div>Gallery</div>} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("TemplateDetail Page", () => {
  it("should render template title", () => {
    renderWithRoute("cafe-01");
    expect(screen.getByText("Cafe-01")).toBeInTheDocument();
  });

  it("should display industry, tone and style metadata", () => {
    renderWithRoute("cafe-01");
    // Use getAllByText since values appear in both meta badges and tag badges
    expect(screen.getAllByText("Cafe").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Simple").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Minimal").length).toBeGreaterThan(0);
  });

  it("should display meta labels", () => {
    renderWithRoute("cafe-01");
    expect(screen.getByText("業種")).toBeInTheDocument();
    expect(screen.getByText("トーン")).toBeInTheDocument();
    expect(screen.getByText("スタイル")).toBeInTheDocument();
  });

  it("should display all tags as badges", () => {
    renderWithRoute("cafe-01");
    expect(screen.getAllByText("Cafe").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Simple").length).toBeGreaterThan(0);
    expect(screen.getByText("Light")).toBeInTheDocument();
  });

  it("should show preview button", () => {
    renderWithRoute("cafe-01");
    expect(screen.getByText("プレビューを見る")).toBeInTheDocument();
  });

  it("should show 'back to gallery' link", () => {
    renderWithRoute("cafe-01");
    expect(screen.getByText("ギャラリーに戻る")).toBeInTheDocument();
  });

  it("should show different template for restaurant-01", () => {
    renderWithRoute("restaurant-01");
    expect(screen.getByText("Restaurant-01")).toBeInTheDocument();
    expect(screen.getAllByText("Restaurant").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Sophisticated").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Elegant").length).toBeGreaterThan(0);
  });

  it("should show not found message for unknown id", () => {
    renderWithRoute("nonexistent-id");
    expect(
      screen.getByText("テンプレートが見つかりません"),
    ).toBeInTheDocument();
    expect(screen.getByText("ギャラリーに戻る")).toBeInTheDocument();
  });

  it("should open preview modal when preview button is clicked", () => {
    renderWithRoute("cafe-01");
    const previewButton = screen.getByText("プレビューを見る");
    fireEvent.click(previewButton);
    // PreviewModal should be rendered (it renders a dialog)
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
