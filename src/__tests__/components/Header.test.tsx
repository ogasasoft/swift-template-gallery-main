import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/Header";

// モック ThemeToggle コンポーネント
jest.mock("@/components/theme-toggle", () => ({
	ThemeToggle: () => <div data-testid="theme-toggle">ThemeToggle</div>,
}));

describe("Header Component", () => {
	beforeEach(() => {
		// スクロールメソッドのモック
		global.scrollTo = jest.fn();
		global.scrollIntoView = jest.fn(() => null);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders TemplateLab branding", () => {
		render(<Header />);

		expect(screen.getByText("TemplateLab")).toBeInTheDocument();
	});

	it("renders navigation links", () => {
		render(<Header />);

		expect(screen.getByText("Gallery")).toBeInTheDocument();
		expect(screen.getByText("Pricing")).toBeInTheDocument();
		expect(screen.getByText("Contact")).toBeInTheDocument();
	});

	it("renders ThemeToggle component", () => {
		render(<Header />);

		expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
	});

	it("calls scrollToSection when Gallery link is clicked", () => {
		render(<Header />);

		const galleryLink = screen.getByText("Gallery");
		fireEvent.click(galleryLink);

		expect(global.scrollTo).toHaveBeenCalledWith({
			behavior: "smooth",
			block: "start",
		});
	});

	it("calls scrollToSection when Pricing link is clicked", () => {
		render(<Header />);

		const pricingLink = screen.getByText("Pricing");
		fireEvent.click(pricingLink);

		expect(global.scrollTo).toHaveBeenCalledWith({
			behavior: "smooth",
			block: "start",
		});
	});

	it("calls scrollToSection when Contact link is clicked", () => {
		render(<Header />);

		const contactLink = screen.getByText("Contact");
		fireEvent.click(contactLink);

		expect(global.scrollTo).toHaveBeenCalledWith({
			behavior: "smooth",
			block: "start",
		});
	});

	it("calls scrollToSection when Inquiry button is clicked", () => {
		render(<Header />);

		const inquiryButton = screen.getByText("Inquiry");
		fireEvent.click(inquiryButton);

		expect(global.scrollTo).toHaveBeenCalledWith({
			behavior: "smooth",
			block: "start",
		});
	});

	it("calls scrollToSection when mobile menu button is clicked", () => {
		render(<Header />);

		const menuButton = screen.getByText("Menu");
		fireEvent.click(menuButton);

		expect(global.scrollTo).toHaveBeenCalledWith({
			behavior: "smooth",
			block: "start",
		});
	});

	it("has correct z-index and positioning", () => {
		render(<Header />);

		const header = screen.getByRole("banner");
		expect(header).toHaveClass("fixed");
		expect(header).toHaveClass("top-0");
		expect(header).toHaveClass("left-0");
		expect(header).toHaveClass("right-0");
		expect(header).toHaveClass("z-50");
	});

	it("has responsive container", () => {
		render(<Header />);

		const container = screen.getByRole("banner").firstElementChild;
		expect(container).toHaveClass("container");
		expect(container).toHaveClass("mx-auto");
		expect(container).toHaveClass("px-4");
		expect(container).toHaveClass("h-16");
		expect(container).toHaveClass("flex");
		expect(container).toHaveClass("items-center");
		expect(container).toHaveClass("justify-between");
	});
});
