import {
	Pagination as PaginationRoot,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
} from "@/components/ui/pagination";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

function getPageRange(
	currentPage: number,
	totalPages: number,
): (number | "ellipsis")[] {
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	const pages: (number | "ellipsis")[] = [];
	const delta = 2;
	const left = currentPage - delta;
	const right = currentPage + delta;

	pages.push(1);

	if (left > 2) {
		pages.push("ellipsis");
	}

	for (let i = Math.max(2, left); i <= Math.min(totalPages - 1, right); i++) {
		pages.push(i);
	}

	if (right < totalPages - 1) {
		pages.push("ellipsis");
	}

	pages.push(totalPages);

	return pages;
}

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) {
	if (totalPages <= 1) return null;

	const pageRange = getPageRange(currentPage, totalPages);

	const handlePrevious = (e: React.MouseEvent) => {
		e.preventDefault();
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = (e: React.MouseEvent) => {
		e.preventDefault();
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	const handlePageClick = (e: React.MouseEvent, page: number) => {
		e.preventDefault();
		onPageChange(page);
	};

	return (
		<PaginationRoot aria-label="ページネーション">
			<PaginationContent>
				<PaginationItem>
					<a
						href="#"
						onClick={handlePrevious}
						aria-disabled={currentPage === 1}
						aria-label="前へ"
						className={
							currentPage === 1
								? "pointer-events-none opacity-50"
								: "cursor-pointer"
						}
					>
						<ChevronLeft className="h-4 w-4" />
						<span>前へ</span>
					</a>
				</PaginationItem>

				{pageRange.map((page, index) =>
					page === "ellipsis" ? (
						<PaginationItem key={`ellipsis-${index}`}>
							<PaginationEllipsis />
						</PaginationItem>
					) : (
						<PaginationItem key={page}>
							<PaginationLink
								href="#"
								isActive={page === currentPage}
								onClick={(e) => handlePageClick(e, page)}
								aria-label={`ページ ${page}${page === currentPage ? "（現在のページ）" : ""}`}
								aria-current={page === currentPage ? "page" : undefined}
								className="cursor-pointer"
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					),
				)}

				<PaginationItem>
					<a
						href="#"
						onClick={handleNext}
						aria-disabled={currentPage === totalPages}
						aria-label="次へ"
						className={
							currentPage === totalPages
								? "pointer-events-none opacity-50"
								: "cursor-pointer"
						}
					>
						<span>次へ</span>
						<ChevronRight className="h-4 w-4" />
					</a>
				</PaginationItem>
			</PaginationContent>
		</PaginationRoot>
	);
}
