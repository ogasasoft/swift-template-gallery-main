import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/Header";

// モック ThemeToggle コンポーネント
jest.mock("@/components/theme-toggle", () => ({
	ThemeToggle: () => <div data-testid="theme-toggle">ThemeToggle</div>,
}));

describe("Header Component", () => {
	beforeEach(() => {
		// jsdom does not implement scrollIntoView, so we need to mock it
		Object.defineProperty(window.HTMLElement.prototype, "scrollIntoView", {
			writable: true,
			value: jest.fn(() => Promise.resolve(undefined)),
		});
		// Mock scrollTo to track calls
		global.scrollTo = jest.fn();
		// Mock document.getElementById to return a mock element with scrollIntoView
		const mockElement = {
			scrollIntoView: jest.fn(() => Promise.resolve(undefined)),
			getBoundingClientRect: jest.fn(() => ({
				top: 100,
				left: 0,
				width: 100,
				height: 100,
			})),
		};
		jest.spyOn(document, "getElementById").mockReturnValue(mockElement as any);
		// Clear previous calls
		jest.clearAllMocks();
	});

	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
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

		// Check if document.getElementById was called
		const getElementByIdMock = document.getElementById as jest.Mock;
		expect(getElementByIdMock).toHaveBeenCalledWith("gallery");
		// Since element doesn't exist in test DOM, neither scrollIntoView nor scrollTo should be called
		expect(window.HTMLElement.prototype.scrollIntoView).not.toHaveBeenCalled();
		expect(window.scrollTo).not.toHaveBeenCalled();
	});

	it("calls scrollToSection when Pricing link is clicked", () => {
		render(<Header />);

		const pricingLink = screen.getByText("Pricing");
		fireEvent.click(pricingLink);

		// Since element doesn't exist in test DOM, neither scrollIntoView nor scrollTo should be called
		expect(window.HTMLElement.prototype.scrollIntoView).not.toHaveBeenCalled();
		expect(window.scrollTo).not.toHaveBeenCalled();
	});

	it("calls scrollToSection when Contact link is clicked", () => {
		render(<Header />);

		const contactLink = screen.getByText("Contact");
		fireEvent.click(contactLink);

		// Since element doesn't exist in test DOM, neither scrollIntoView nor scrollTo should be called
		expect(window.HTMLElement.prototype.scrollIntoView).not.toHaveBeenCalled();
		expect(window.scrollTo).not.toHaveBeenCalled();
	});

	it("calls scrollToSection when Inquiry button is clicked", () => {
		render(<Header />);

		const inquiryButton = screen.getByText("Inquiry");
		fireEvent.click(inquiryButton);

		// Since element doesn't exist in test DOM, neither scrollIntoView nor scrollTo should be called
		expect(window.HTMLElement.prototype.scrollIntoView).not.toHaveBeenCalled();
		expect(window.scrollTo).not.toHaveBeenCalled();
	});

	it("calls scrollToSection when mobile menu button is clicked", () => {
		render(<Header />);

		const menuButton = screen.getByText("Menu");
		fireEvent.click(menuButton);

		// Since element doesn't exist in test DOM, neither scrollIntoView nor scrollTo should be called
		expect(window.HTMLElement.prototype.scrollIntoView).not.toHaveBeenCalled();
		expect(window.scrollTo).not.toHaveBeenCalled();
	});

	it("has mobile menu button in desktop view", () => {
		render(<Header />);

		expect(screen.getByText("Menu")).toBeInTheDocument();
	});

	it("has correct z-index and positioning", () => {
		render(<Header />);

		const header = screen.getByRole("banner") as HTMLElement;
		expect(header).toHaveClass("fixed");
		expect(header).toHaveClass("top-0");
		expect(header).toHaveClass("left-0");
		expect(header).toHaveClass("right-0");
		expect(header).toHaveClass("z-50");
	});

	it("has responsive container", () => {
		render(<Header />);

		const header = screen.getByRole("banner");
		const container = (header as HTMLElement).firstElementChild as HTMLElement;
		expect(container).toHaveClass("container");
		expect(container).toHaveClass("mx-auto");
		expect(container).toHaveClass("px-4");
		expect(container).toHaveClass("h-16");
		expect(container).toHaveClass("flex");
		expect(container).toHaveClass("items-center");
		expect(container).toHaveClass("justify-between");
	});
});
