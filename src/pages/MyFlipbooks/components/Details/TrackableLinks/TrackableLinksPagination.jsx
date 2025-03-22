
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis
} from "@/components/ui/pagination";

export default function TrackableLinksPagination({ currentPage, totalPages, onChangePage }) {
    const pageNumbers = [];

    pageNumbers.push(1);

    if (currentPage > 3) {
        pageNumbers.push("ellipsis1");
    }

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pageNumbers.push(i);
    }

    if (currentPage < totalPages - 2) {
        pageNumbers.push("ellipsis2");
    }

    if (totalPages > 1) {
        pageNumbers.push(totalPages);
    }

    const uniquePageNumbers = [...new Set(pageNumbers)];

    return (
        <div className="mt-4">
            <Pagination className="justify-center">
                <PaginationContent className="flex flex-wrap gap-1">
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => onChangePage(currentPage - 1)}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>

                    {uniquePageNumbers.map((pageNumber, index) => (
                        pageNumber === "ellipsis1" || pageNumber === "ellipsis2" ? (
                            <PaginationItem key={`ellipsis-${index}`} className="hidden relative sm:block">
                                <PaginationEllipsis />
                            </PaginationItem>
                        ) : (
                            <PaginationItem key={`page-${pageNumber}`}>
                                <PaginationLink
                                    isActive={currentPage === pageNumber}
                                    onClick={() => onChangePage(pageNumber)}
                                    className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center"
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => onChangePage(currentPage + 1)}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}