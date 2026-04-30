import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "@/components/Pagination";

describe("Pagination Component", () => {
	const mockOnPageChange = jest.fn();

	// Mock document.getElementById for tests that call scrollToSection
	beforeEach(() => {
		jest.spyOn(document, "getElementById").mockReturnValue({
			scrollIntoView: jest.fn(() => Promise.resolve(undefined)),
		} as any);
	});

	it("renders nothing when totalPages is 1 or less", () => {
		const { container } = render(
			<Pagination
				currentPage={1}
				totalPages={1}
				onPageChange={mockOnPageChange}
			/>,
		);
		expect(container.firstChild).toBeNull();
	});

	it("renders pagination controls for total pages > 1", () => {
		render(
			<Pagination
				currentPage={3}
				totalPages={5}
				onPageChange={mockOnPageChange}
			/>,
		);
		expect(screen.getByLabelText("ページネーション")).toBeInTheDocument();
	});

	it("calls onPageChange when clicking previous page", () => {
		render(
			<Pagination
				currentPage={3}
				totalPages={5}
				onPageChange={mockOnPageChange}
			/>,
		);

		const prevButton = screen.getByLabelText("前へ");
		fireEvent.click(prevButton);

		expect(mockOnPageChange).toHaveBeenCalledWith(2);
	});

	it("does not call onPageChange when clicking previous page on first page", () => {
		// Clear mock before each test
		mockOnPageChange.mockClear();
		render(
			<Pagination
				currentPage={1}
				totalPages={5}
				onPageChange={mockOnPageChange}
			/>,
		);

		const prevLink = screen.getByLabelText("前へ");
		// Link should have aria-disabled="true" when disabled
		expect(prevLink).toHaveAttribute("aria-disabled", "true");
		// Click should not call onPageChange because currentPage > 1 condition fails
		fireEvent.click(prevLink);
		expect(mockOnPageChange).not.toHaveBeenCalled();
	});

	it("calls onPageChange when clicking next page", () => {
		render(
			<Pagination
				currentPage={3}
				totalPages={5}
				onPageChange={mockOnPageChange}
			/>,
		);

		const nextButton = screen.getByLabelText("次へ");
		fireEvent.click(nextButton);

		expect(mockOnPageChange).toHaveBeenCalledWith(4);
	});

	it("does not call onPageChange when clicking next page on last page", () => {
		// Clear mock before each test
		mockOnPageChange.mockClear();
		render(
			<Pagination
				currentPage={5}
				totalPages={5}
				onPageChange={mockOnPageChange}
			/>,
		);

		const nextLink = screen.getByLabelText("次へ");
		// Link should have aria-disabled="true" when disabled
		expect(nextLink).toHaveAttribute("aria-disabled", "true");
		// Click should not call onPageChange because currentPage < totalPages condition fails
		fireEvent.click(nextLink);
		expect(mockOnPageChange).not.toHaveBeenCalled();
	});

	it("calls onPageChange when clicking a page number", () => {
		render(
			<Pagination
				currentPage={3}
				totalPages={5}
				onPageChange={mockOnPageChange}
			/>,
		);

		// Click on page 2 (current page is 3)
		const page2Link = screen.getByLabelText("ページ 2");
		fireEvent.click(page2Link);

		expect(mockOnPageChange).toHaveBeenCalledWith(2);
	});

	it("marks current page as active", () => {
		render(
			<Pagination
				currentPage={3}
				totalPages={5}
				onPageChange={mockOnPageChange}
			/>,
		);

		const page3Link = screen.getByLabelText(/ページ 3.*現在のページ/);
		expect(page3Link).toHaveAttribute("aria-current", "page");
	});

	it("marks previous button as disabled on first page", () => {
		render(
			<Pagination
				currentPage={1}
				totalPages={5}
				onPageChange={mockOnPageChange}
			/>,
		);

		const prevButton = screen.getByLabelText("前へ");
		expect(prevButton).toHaveAttribute("aria-disabled", "true");
	});

	it("marks next button as disabled on last page", () => {
		render(
			<Pagination
				currentPage={5}
				totalPages={5}
				onPageChange={mockOnPageChange}
			/>,
		);

		const nextButton = screen.getByLabelText("次へ");
		expect(nextButton).toHaveAttribute("aria-disabled", "true");
	});

	it("handles ellipsis correctly for many pages", () => {
		render(
			<Pagination
				currentPage={7}
				totalPages={12}
				onPageChange={mockOnPageChange}
			/>,
		);

		// Ellipsis is rendered as a span with aria-hidden="true" containing "More pages"
		// The text is in a span with aria-hidden="true", but it's nested in an outer span
		const allSpans = screen.getAllByText("More pages");
		expect(allSpans.length).toBeGreaterThan(0);
	});

	it("handles small number of pages correctly", () => {
		render(
			<Pagination
				currentPage={2}
				totalPages={3}
				onPageChange={mockOnPageChange}
			/>,
		);

		expect(screen.getByLabelText("前へ")).toBeInTheDocument();
		expect(screen.getByLabelText("次へ")).toBeInTheDocument();
		// Page labels may not be rendered by shadcn pagination
		expect(screen.getByText("2")).toBeInTheDocument();
		expect(screen.getByText("3")).toBeInTheDocument();
	});
});
