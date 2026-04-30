import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "@/components/Pagination";

describe("Pagination Component", () => {
	const mockOnPageChange = jest.fn();

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
		render(
			<Pagination
				currentPage={1}
				totalPages={5}
				onPageChange={mockOnPageChange}
			/>,
		);

		const prevButton = screen.getByLabelText("前へ");
		// Button should have pointer-events-none when disabled
		expect(prevButton).toHaveClass("pointer-events-none");
		// Click should still trigger the handler, but handler checks the condition
		fireEvent.click(prevButton);
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
		render(
			<Pagination
				currentPage={5}
				totalPages={5}
				onPageChange={mockOnPageChange}
			/>,
		);

		const nextButton = screen.getByLabelText("次へ");
		// Button should have pointer-events-none when disabled
		expect(nextButton).toHaveClass("pointer-events-none");
		// Click should still trigger the handler, but handler checks the condition
		fireEvent.click(nextButton);
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

		const ellipsisElements = screen.getAllByLabelText(/ellipsis/);
		expect(ellipsisElements.length).toBeGreaterThan(0);
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
		expect(screen.getByLabelText("ページ 1")).toBeInTheDocument();
		expect(screen.getByLabelText("ページ 2")).toBeInTheDocument();
		expect(screen.getByLabelText("ページ 3")).toBeInTheDocument();
	});
});
