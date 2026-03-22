import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "@/components/Pagination";

describe("Pagination Component", () => {
  describe("Rendering", () => {
    it("should render nothing when totalPages is 1", () => {
      const { container } = render(
        <Pagination currentPage={1} totalPages={1} onPageChange={jest.fn()} />,
      );
      expect(container.firstChild).toBeNull();
    });

    it("should render nothing when totalPages is 0", () => {
      const { container } = render(
        <Pagination currentPage={1} totalPages={0} onPageChange={jest.fn()} />,
      );
      expect(container.firstChild).toBeNull();
    });

    it("should render pagination when totalPages > 1", () => {
      render(
        <Pagination currentPage={1} totalPages={3} onPageChange={jest.fn()} />,
      );
      expect(
        screen.getByRole("navigation", { name: "ページネーション" }),
      ).toBeInTheDocument();
    });

    it("should render Previous and Next buttons", () => {
      render(
        <Pagination currentPage={2} totalPages={5} onPageChange={jest.fn()} />,
      );
      expect(
        screen.getByRole("link", { name: /Go to previous page/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /Go to next page/i }),
      ).toBeInTheDocument();
    });

    it("should render all page numbers for totalPages <= 7", () => {
      render(
        <Pagination currentPage={1} totalPages={5} onPageChange={jest.fn()} />,
      );
      expect(
        screen.getByRole("link", { name: /ページ 1/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /ページ 2/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /ページ 3/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /ページ 4/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /ページ 5/i }),
      ).toBeInTheDocument();
    });
  });

  describe("Active Page Highlighting", () => {
    it("should mark the current page as active", () => {
      render(
        <Pagination currentPage={3} totalPages={5} onPageChange={jest.fn()} />,
      );
      const activePage = screen.getByRole("link", {
        name: /ページ 3（現在のページ）/i,
      });
      expect(activePage).toHaveAttribute("aria-current", "page");
    });

    it("should not mark other pages as active", () => {
      render(
        <Pagination currentPage={2} totalPages={5} onPageChange={jest.fn()} />,
      );
      const page1 = screen.getByRole("link", { name: /^ページ 1$/ });
      expect(page1).not.toHaveAttribute("aria-current", "page");
    });
  });

  describe("Previous Button", () => {
    it("should be disabled on the first page", () => {
      render(
        <Pagination currentPage={1} totalPages={5} onPageChange={jest.fn()} />,
      );
      const prev = screen.getByRole("link", { name: /Go to previous page/i });
      expect(prev).toHaveAttribute("aria-disabled", "true");
      expect(prev).toHaveClass("pointer-events-none", "opacity-50");
    });

    it("should not be disabled on pages > 1", () => {
      render(
        <Pagination currentPage={2} totalPages={5} onPageChange={jest.fn()} />,
      );
      const prev = screen.getByRole("link", { name: /Go to previous page/i });
      expect(prev).not.toHaveClass("pointer-events-none");
    });

    it("should call onPageChange with currentPage - 1 when clicked", () => {
      const onPageChange = jest.fn();
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={onPageChange}
        />,
      );
      fireEvent.click(
        screen.getByRole("link", { name: /Go to previous page/i }),
      );
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it("should not call onPageChange when disabled (page 1)", () => {
      const onPageChange = jest.fn();
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={onPageChange}
        />,
      );
      // pointer-events-none prevents actual clicks, but we test the handler directly
      const prev = screen.getByRole("link", { name: /Go to previous page/i });
      fireEvent.click(prev);
      // Even though event fires, handler guards against going below page 1
      expect(onPageChange).not.toHaveBeenCalled();
    });
  });

  describe("Next Button", () => {
    it("should be disabled on the last page", () => {
      render(
        <Pagination currentPage={5} totalPages={5} onPageChange={jest.fn()} />,
      );
      const next = screen.getByRole("link", { name: /Go to next page/i });
      expect(next).toHaveAttribute("aria-disabled", "true");
      expect(next).toHaveClass("pointer-events-none", "opacity-50");
    });

    it("should not be disabled on pages < totalPages", () => {
      render(
        <Pagination currentPage={3} totalPages={5} onPageChange={jest.fn()} />,
      );
      const next = screen.getByRole("link", { name: /Go to next page/i });
      expect(next).not.toHaveClass("pointer-events-none");
    });

    it("should call onPageChange with currentPage + 1 when clicked", () => {
      const onPageChange = jest.fn();
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={onPageChange}
        />,
      );
      fireEvent.click(screen.getByRole("link", { name: /Go to next page/i }));
      expect(onPageChange).toHaveBeenCalledWith(4);
    });

    it("should not call onPageChange when disabled (last page)", () => {
      const onPageChange = jest.fn();
      render(
        <Pagination
          currentPage={5}
          totalPages={5}
          onPageChange={onPageChange}
        />,
      );
      const next = screen.getByRole("link", { name: /Go to next page/i });
      fireEvent.click(next);
      expect(onPageChange).not.toHaveBeenCalled();
    });
  });

  describe("Page Number Clicks", () => {
    it("should call onPageChange with the clicked page number", () => {
      const onPageChange = jest.fn();
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={onPageChange}
        />,
      );
      fireEvent.click(screen.getByRole("link", { name: /ページ 3/ }));
      expect(onPageChange).toHaveBeenCalledWith(3);
    });

    it("should call onPageChange when clicking a different page", () => {
      const onPageChange = jest.fn();
      render(
        <Pagination
          currentPage={2}
          totalPages={5}
          onPageChange={onPageChange}
        />,
      );
      fireEvent.click(screen.getByRole("link", { name: /^ページ 5$/ }));
      expect(onPageChange).toHaveBeenCalledWith(5);
    });
  });

  describe("Ellipsis Logic", () => {
    it("should show ellipsis for large page counts (currentPage near start)", () => {
      render(
        <Pagination currentPage={1} totalPages={10} onPageChange={jest.fn()} />,
      );
      expect(screen.getByText("More pages")).toBeInTheDocument();
    });

    it("should show two ellipses for large page counts (currentPage in middle)", () => {
      render(
        <Pagination currentPage={6} totalPages={15} onPageChange={jest.fn()} />,
      );
      const ellipses = screen.getAllByText("More pages");
      expect(ellipses).toHaveLength(2);
    });

    it("should show ellipsis for large page counts (currentPage near end)", () => {
      render(
        <Pagination
          currentPage={10}
          totalPages={10}
          onPageChange={jest.fn()}
        />,
      );
      expect(screen.getByText("More pages")).toBeInTheDocument();
    });

    it("should always show first page", () => {
      render(
        <Pagination currentPage={8} totalPages={10} onPageChange={jest.fn()} />,
      );
      expect(
        screen.getByRole("link", { name: /^ページ 1$/ }),
      ).toBeInTheDocument();
    });

    it("should always show last page", () => {
      render(
        <Pagination currentPage={2} totalPages={10} onPageChange={jest.fn()} />,
      );
      expect(
        screen.getByRole("link", { name: /ページ 10$/ }),
      ).toBeInTheDocument();
    });

    it("should not show ellipsis for totalPages <= 7", () => {
      render(
        <Pagination currentPage={4} totalPages={7} onPageChange={jest.fn()} />,
      );
      expect(screen.queryByText("More pages")).not.toBeInTheDocument();
    });
  });

  describe("Two Pages", () => {
    it("should render both pages when totalPages is 2", () => {
      render(
        <Pagination currentPage={1} totalPages={2} onPageChange={jest.fn()} />,
      );
      expect(
        screen.getByRole("link", { name: /ページ 1/ }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /ページ 2/ }),
      ).toBeInTheDocument();
    });
  });
});
