import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import bookLogo from '@/assets/book_thumbnail.jpg';

const PageOverviewModal = ({
    isOpen,
    onClose,
    width,
    height,
    currentPage,
    totalPages,
    pageType,
}) => {
    console.log('width and height', width, height);
    // Calculate aspect ratio for thumbnails
    const aspectRatioString = width && height ? `1 / ${height / width}` : '1 / 1';
    // Helper to check if a page is currently selected
    const isPageCurrent = (pageNum) => {
        if (Array.isArray(currentPage)) {
            return currentPage.includes(pageNum);
        }
        return currentPage === pageNum;
    };

    // Default thumbnail card
    const SingleThumbnailCard = ({ pageNumber, justify = 'center', isCurrent }) => (
        <div
            className={`relative group flex ${justify === 'end'
                ? 'justify-end'
                : justify === 'start'
                    ? 'justify-start'
                    : 'justify-center'
                }`}
        >
            <div
                className={`relative bg-[#d6d1f4] rounded-lg overflow-hidden shadow-lg w-1/2 flex items-center justify-center transition-all duration-300  ${isCurrent ? 'ring-4 ring-blue-500' : 'ring-0'
                    }`}
                style={{ aspectRatio: aspectRatioString }}
            >
                <img
                    src={bookLogo}
                    alt={`Page ${pageNumber}`}
                    className="w-full h-full opacity-70 rounded-md object-contain"
                    loading="lazy"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-sm font-bold rounded-md min-w-[32px] text-center">
                    {pageNumber}
                </div>
            </div>
        </div>
    );

    // Paired thumbnail card
    const PairedThumbnailCard = ({
        leftPageNumber,
        rightPageNumber,
        leftCurrent,
        rightCurrent,
    }) => (
        <div className="relative group flex justify-center">
            <div className="relative bg-[#d6d1f4] rounded-lg overflow-hidden shadow-lg flex w-full ">
                {/* Left thumbnail */}
                <div
                    className={`relative flex-1 flex items-center justify-center w-1/2 border-gray-700 transition-all duration-300 ${leftCurrent ? 'ring-4 ring-blue-500 z-10' : 'ring-0'
                        }`}
                    style={{ aspectRatio: aspectRatioString }}
                >
                    <img
                        src={bookLogo}
                        alt={`Page ${leftPageNumber}`}
                        className="w-full h-full opacity-70 rounded-md object-contain"
                        loading="lazy"
                    />
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-sm font-bold rounded-md min-w-[32px] text-center">
                        {leftPageNumber}
                    </div>
                </div>
                {/* Right thumbnail */}
                <div
                    className={`relative flex-1 flex items-center justify-center w-1/2 transition-all duration-300 ${rightCurrent ? 'ring-4 ring-blue-500 z-10' : 'ring-0'
                        }`}
                        style={{ aspectRatio: aspectRatioString }}
                >
                    <img
                        src={bookLogo}
                        alt={`Page ${rightPageNumber}`}
                        className="w-full h-full opacity-70 object-contain"
                        loading="lazy"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-sm font-bold rounded-md min-w-[32px] text-center">
                        {rightPageNumber}
                    </div>
                </div>
            </div>
        </div>
    );

    // Render thumbnails based on pageType
    const renderThumbnails = () => {
        const layout = [];
        if (pageType === 'single') {
            for (let i = 0; i < totalPages; i++) {
                layout.push(
                    <SingleThumbnailCard
                        key={i}
                        pageNumber={i + 1}
                        isCurrent={isPageCurrent(i)}
                        justify="center"
                    />
                );
            }
        } else {
            // Double page mode
            // First page (cover)
            layout.push(
                <SingleThumbnailCard
                    key={0}
                    pageNumber={1}
                    isCurrent={isPageCurrent(0)}
                    justify="end"
                />
            );
            // Paired pages
            let i = 1;
            for (; i < totalPages - 1; i += 2) {
                // If last page is even, last is single
                if (i + 1 === totalPages - 1 && totalPages % 2 === 0) {
                    break;
                }
                layout.push(
                    <PairedThumbnailCard
                        key={`pair-${i}`}
                        leftPageNumber={i + 1}
                        rightPageNumber={i + 2}
                        leftCurrent={isPageCurrent(i)}
                        rightCurrent={isPageCurrent(i + 1)}
                    />
                );
            }
            // Last page(s)
            if (totalPages % 2 === 0) {
                // Even: last is single
                layout.push(
                    <SingleThumbnailCard
                        key={totalPages - 1}
                        pageNumber={totalPages}
                        isCurrent={isPageCurrent(totalPages - 1)}
                        justify="start"
                    />
                );
            } else if (i < totalPages) {
                // Odd: last pair
                layout.push(
                    <PairedThumbnailCard
                        key={`pair-last`}
                        leftPageNumber={i + 1}
                        rightPageNumber={i + 2}
                        leftCurrent={isPageCurrent(i)}
                        rightCurrent={isPageCurrent(i + 1)}
                    />
                );
            }
        }
        return layout;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] max-w-[90vw] z-[100] overflow-y-auto bg-transparent shadow-none border-0 text-white" hideClose={true}>
                <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                        {renderThumbnails()}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PageOverviewModal;
