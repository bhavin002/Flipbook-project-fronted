import $ from "jquery";

export const PageNavigationActions = {
    goToNextPage: (flipbookRef) => {
        if (flipbookRef?.current) {
            $(flipbookRef.current).turn("next");
        }
    },

    goToPreviousPage: (flipbookRef) => {
        if (flipbookRef?.current) {
            $(flipbookRef.current).turn("previous");
        }
    },

    goToFirstPage: (flipbookRef) => {
        if (flipbookRef?.current) {
            $(flipbookRef.current).turn("page", 1);
        }
    },

    goToLastPage: (flipbookRef) => {
        if (flipbookRef?.current) {
            const totalPages = $(flipbookRef.current).turn("pages");
            $(flipbookRef.current).turn("page", totalPages);
        }
    },

    goToPage: (flipbookRef, pageNumber) => {
        if (flipbookRef?.current) {
            $(flipbookRef.current).turn("page", pageNumber);
        }
    }
}; 