import $ from "jquery";

export const PageNavigationActions = {
    goToNextPage: (flipbookRef) => {
        if (flipbookRef?.current) {
            // Check if it's WebView (has setPage method)
            if (flipbookRef.current.setPage) {
                const currentPage = flipbookRef.current.getCurrentPage?.() || 1;
                flipbookRef.current.setPage(currentPage + 1);
            } else {
                $(flipbookRef.current).turn("next");
            }
        }
    },

    goToPreviousPage: (flipbookRef) => {
        if (flipbookRef?.current) {
            // Check if it's WebView (has setPage method)
            if (flipbookRef.current.setPage) {
                const currentPage = flipbookRef.current.getCurrentPage?.() || 1;
                flipbookRef.current.setPage(Math.max(1, currentPage - 1));
            } else {
                $(flipbookRef.current).turn("previous");
            }
        }
    },

    goToFirstPage: (flipbookRef) => {
        if (flipbookRef?.current) {
            // Check if it's WebView (has setPage method)
            if (flipbookRef.current.setPage) {
                flipbookRef.current.setPage(1);
            } else {
                $(flipbookRef.current).turn("page", 1);
            }
        }
    },

    goToLastPage: (flipbookRef) => {
        if (flipbookRef?.current) {
            // Check if it's WebView (has setPage method)
            if (flipbookRef.current.setPage) {
                const totalPages = flipbookRef.current.getTotalPages?.() || 1;
                flipbookRef.current.setPage(totalPages);
            } else {
                const totalPages = $(flipbookRef.current).turn("pages");
                $(flipbookRef.current).turn("page", totalPages);
            }
        }
    },

    goToPage: (flipbookRef, pageNumber) => {
        if (flipbookRef?.current) {
            // Check if it's WebView (has setPage method)
            if (flipbookRef.current.setPage) {
                flipbookRef.current.setPage(pageNumber);
            } else {
                $(flipbookRef.current).turn("page", pageNumber);
            }
        }
    }
}; 