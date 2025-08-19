import React, { useRef } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import bookLogo from '/assets/book_thumbnail.jpg';
import { PageNavigationActions } from '@/components/EditorLayoutComponents/Preview/Helper/PageNavigationActions.js';

const PageOverviewModal = ({
    isOpen,
    onClose,
    width,
    height,
    currentPages,
    totalPages,
    pageType,
    flipbookRef,
    isPublicView,
    thumbnails = []
}) => {
    const containerRef = useRef(null); // Ref for the parent container
    const aspectRatioString = width && height ? `1 / ${height / width}` : '1 / 1';

    const getImageSrc = (pageNumber) => {
        if (isPublicView) {
            return thumbnails[pageNumber - 1] || bookLogo;
        } else {
            return bookLogo;
        }
    };

    const SingleThumbnailCard = ({ pageNumber, justify = 'center', isCurrent, onClick }) => (
        <div
            className={`relative group flex ${justify === 'end' ? 'justify-end' : justify === 'start' ? 'justify-start' : 'justify-center'
                }`}
            onClick={() => onClick(pageNumber)}
            style={{ cursor: 'pointer' }}
        >
            <div
                className={`relative bg-[#d6d1f4] overflow-hidden shadow-lg ${pageType === 'double' && 'w-1/2'
                    } flex items-center justify-center transition-all duration-300 ${isCurrent
                        ? 'border-4 border-primary rounded-md overflow-hidden'
                        : 'border-4 border-transparent rounded-md'
                    } group-hover:border-4 group-hover:border-primary group-hover:rounded-md group-hover:shadow-lg group-hover:shadow-black/30`}
                style={{ aspectRatio: aspectRatioString }}
            >
                <img
                    src={getImageSrc(pageNumber)}
                    alt={`Page ${pageNumber}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                />
                <div
                    className={`absolute inset-0 bg-black/40 transition-opacity duration-200 pointer-events-none ${isCurrent ? 'opacity-60' : 'opacity-0 group-hover:opacity-60'
                        }`}
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-sm font-bold min-w-[32px] text-center rounded-md">
                    {pageNumber}
                </div>
            </div>
        </div>
    );

    const PairedThumbnailCard = ({ leftPageNumber, rightPageNumber, isCurrentLeft, isCurrentRight, onClick }) => (
        <div className="relative group flex justify-center" onClick={() => onClick(leftPageNumber)} style={{ cursor: 'pointer' }}>
            <div
                className={`relative bg-[#d6d1f4] overflow-hidden shadow-lg flex w-full transition-all duration-300 ${isCurrentLeft || isCurrentRight
                    ? 'border-4 border-primary rounded-md'
                    : 'border-4 border-transparent rounded-md'
                    } group-hover:border-4 group-hover:border-primary group-hover:rounded-md group-hover:shadow-lg group-hover:shadow-black/30`}
            >
                <div
                    className={`relative flex-1 flex items-center justify-center ${pageType === 'double' && 'w-1/2'}`}
                    style={{ aspectRatio: aspectRatioString }}
                >
                    <img
                        src={getImageSrc(leftPageNumber)}
                        alt={`Page ${leftPageNumber}`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                    />
                    <div
                        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 pointer-events-none ${isCurrentLeft ? 'opacity-60' : 'opacity-0 group-hover:opacity-60'
                            }`}
                    />
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-sm font-bold min-w-[32px] text-center rounded-md">
                        {leftPageNumber}
                    </div>
                </div>
                <div
                    className={`relative flex-1 flex items-center justify-center ${pageType === 'double' && 'w-1/2'}`}
                    style={{ aspectRatio: aspectRatioString }}
                >
                    <img
                        src={getImageSrc(rightPageNumber)}
                        alt={`Page ${rightPageNumber}`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                    />
                    <div
                        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 pointer-events-none ${isCurrentRight ? 'opacity-60' : 'opacity-0 group-hover:opacity-60'
                            }`}
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-sm font-bold min-w-[32px] text-center rounded-md">
                        {rightPageNumber}
                    </div>
                </div>
            </div>
        </div>
    );

    const handleThumbnailClick = (pageNumber) => {
        PageNavigationActions.goToPage(flipbookRef, pageNumber);
        onClose();
    };

    const renderThumbnails = () => {
        const layout = [];
        if (pageType === 'single') {
            for (let i = 0; i < totalPages; i++) {
                const pageNumber = i + 1;
                const isCurrent = currentPages.includes(pageNumber);
                layout.push(
                    <SingleThumbnailCard
                        key={i}
                        pageNumber={pageNumber}
                        justify="center"
                        isCurrent={isCurrent}
                        onClick={handleThumbnailClick}
                    />
                );
            }
        } else {
            layout.push(
                <SingleThumbnailCard
                    key={0}
                    pageNumber={1}
                    justify="end"
                    isCurrent={currentPages.includes(1)}
                    onClick={handleThumbnailClick}
                />
            );
            let i = 1;
            for (; i < totalPages - 1; i += 2) {
                if (i + 1 === totalPages - 1 && totalPages % 2 === 0) {
                    break;
                }
                const leftPageNumber = i + 1;
                const rightPageNumber = i + 2;
                const isCurrentLeft = currentPages.includes(leftPageNumber);
                const isCurrentRight = currentPages.includes(rightPageNumber);
                layout.push(
                    <PairedThumbnailCard
                        key={`pair-${i}`}
                        leftPageNumber={leftPageNumber}
                        rightPageNumber={rightPageNumber}
                        isCurrentLeft={isCurrentLeft}
                        isCurrentRight={isCurrentRight}
                        onClick={handleThumbnailClick}
                    />
                );
            }
            if (totalPages % 2 === 0) {
                const pageNumber = totalPages;
                layout.push(
                    <SingleThumbnailCard
                        key={totalPages - 1}
                        pageNumber={pageNumber}
                        justify="start"
                        isCurrent={currentPages.includes(pageNumber)}
                        onClick={handleThumbnailClick}
                    />
                );
            } else if (i < totalPages) {
                const leftPageNumber = i + 1;
                const rightPageNumber = i + 2;
                const isCurrentLeft = currentPages.includes(leftPageNumber);
                const isCurrentRight = currentPages.includes(rightPageNumber);
                layout.push(
                    <PairedThumbnailCard
                        key={`pair-last`}
                        leftPageNumber={leftPageNumber}
                        rightPageNumber={rightPageNumber}
                        isCurrentLeft={isCurrentLeft}
                        isCurrentRight={isCurrentRight}
                        onClick={handleThumbnailClick}
                    />
                );
            }
        }
        return layout;
    };

    return (
        <div ref={containerRef}>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent
                    className="max-h-[90vh] max-w-[90vw] z-[100] overflow-y-auto bg-transparent shadow-none border-0 text-white"
                    isCustomX={true}
                    container={containerRef.current} // Pass the container ref
                >
                    <div className="space-y-6  px-4 py-8">
                        <div
                            className={`grid ${pageType === 'double'
                                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'
                                : 'grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-4'
                                }`}
                        >
                            {renderThumbnails()}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PageOverviewModal;