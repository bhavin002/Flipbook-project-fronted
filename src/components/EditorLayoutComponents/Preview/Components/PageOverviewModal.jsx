import React, { useRef } from 'react';
import bookLogo from '/assets/book_thumbnail.jpg';
import { PageNavigationActions } from '@/components/EditorLayoutComponents/Preview/Helper/PageNavigationActions.js';
import { motion, AnimatePresence } from 'framer-motion';

const PageOverviewModal = ({
    isOpen,
    width,
    height,
    currentPages,
    totalPages,
    pageType,
    flipbookRef,
    isPublicView,
    thumbnails = [],
    transformRef,
    visibilitySettings
}) => {
    const scrollContainerRef = useRef(null);
    const aspectRatioString = width && height ? `1 / ${height / width}` : '1 / 1';
    const isRTL = visibilitySettings?.rightToLeftOrientation;

    const getImageSrc = (pageNumber) => {
        if (isPublicView) {
            return thumbnails[pageNumber - 1] || bookLogo;
        } else {
            return bookLogo;
        }
    };

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            // In RTL, scrolling "left" (visually right) usually means decreasing scrollLeft (negative) or increasing if 0 is right.
            // But scrollBy({ left: -300 }) moves view to the left, which is what we want for "Left Arrow".
            // So we keep the logic same: 'left' moves view left, 'right' moves view right.
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const SingleThumbnailCard = ({ pageNumber, justify = 'center', isCurrent, onClick }) => (
        <div
            className="relative group flex-shrink-0 flex flex-col items-center"
            onClick={() => onClick(pageNumber)}
            style={{ cursor: 'pointer' }}
        >
            <div
                className={`relative bg-[#d6d1f4] overflow-hidden shadow-lg h-[100px] flex items-center justify-center transition-all duration-300 ${isCurrent
                    ? 'border-2 border-primary ring-2 ring-primary/50'
                    : 'border-2 border-transparent hover:border-primary/50'
                    } rounded-md`}
                style={{ aspectRatio: aspectRatioString }}
            >
                <img
                    src={getImageSrc(pageNumber)}
                    alt={`Page ${pageNumber}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40">
                    <span className="text-white font-bold text-sm">{pageNumber}</span>
                </div>
            </div>
        </div>
    );

    const PairedThumbnailCard = ({ leftPageNumber, rightPageNumber, isCurrentLeft, isCurrentRight, onClick }) => (
        <div className="relative group flex-shrink-0 flex flex-col items-center" onClick={() => onClick(leftPageNumber)} style={{ cursor: 'pointer' }}>
            <div
                dir={isRTL ? "rtl" : "ltr"}
                className={`relative bg-[#d6d1f4] overflow-hidden shadow-lg h-[100px] flex transition-all duration-300 ${isCurrentLeft || isCurrentRight
                    ? 'border-2 border-primary ring-2 ring-primary/50'
                    : 'border-2 border-transparent hover:border-primary/50'
                    } rounded-md`}
            >
                <div
                    className={`relative flex-1 flex items-center justify-center h-full ${isRTL ? "border-l" : "border-r"} border-gray-300/20`}
                    style={{ aspectRatio: aspectRatioString }}
                >
                    <img
                        src={getImageSrc(leftPageNumber)}
                        alt={`Page ${leftPageNumber}`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40">
                        <span className="text-white font-bold text-sm">{leftPageNumber}</span>
                    </div>
                </div>
                <div
                    className="relative flex-1 flex items-center justify-center h-full"
                    style={{ aspectRatio: aspectRatioString }}
                >
                    <img
                        src={getImageSrc(rightPageNumber)}
                        alt={`Page ${rightPageNumber}`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40">
                        <span className="text-white font-bold text-sm">{rightPageNumber}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const handleThumbnailClick = (pageNumber) => {
        transformRef?.current?.resetTransform(200);
        setTimeout(() => {
            PageNavigationActions.goToPage(flipbookRef, pageNumber);
        }, 250);
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
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: 100, x: "-50%", opacity: 0 }}
                    animate={{ y: 0, x: "-50%", opacity: 1 }}
                    exit={{ y: 100, x: "-50%", opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="absolute bottom-[45px] left-1/2 z-[1000] w-auto max-w-[90%]"
                >
                    <div className="relative flex items-center gap-4 py-4">
                        <button
                            variant="ghost"
                            size="icon"
                            className="hover:opacity-70 p-2 items-center left-5 transition-all duration-300 ease-in-out"
                            onClick={() => scroll('left')}
                        >
                            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill="#FFFFFF"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M31.3138 39.4453C30.5737 40.1853 29.374 40.1852 28.634 39.4452L12.7973 23.6076C11.9093 22.7196 11.9094 21.2799 12.7973 20.3919L28.634 4.55524C29.374 3.81524 30.5738 3.81524 31.3138 4.55524C32.0538 5.29524 32.0538 6.49502 31.3138 7.23501L16.549 21.9998L31.3138 36.7655C32.0538 37.5055 32.0538 38.7053 31.3138 39.4453Z"
                                />
                                <path
                                    fill="#000000"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M32.7279 40.8595C31.2068 42.3805 28.7407 42.3805 27.2197 40.8594L11.383 25.0218C9.71408 23.3527 9.71412 20.6467 11.3831 18.9777L27.2198 3.14103C28.7409 1.61998 31.207 1.61998 32.728 3.14103L31.3138 4.55524C30.5738 3.81524 29.374 3.81524 28.634 4.55524L12.7973 20.3919C11.9094 21.2799 11.9093 22.7196 12.7973 23.6076L28.634 39.4452C29.374 40.1852 30.5737 40.1853 31.3138 39.4453C32.0538 38.7053 32.0538 37.5055 31.3138 36.7655L16.549 21.9998L31.3138 7.23501C32.0538 6.49502 32.0538 5.29524 31.3138 4.55524L32.728 3.14103C34.2491 4.66208 34.2491 7.12818 32.728 8.64923L19.3774 21.9999L32.7281 35.3513C34.2491 36.8724 34.249 39.3385 32.7279 40.8595Z"
                                    fillOpacity="0.2"
                                />
                            </svg>
                        </button>


                        <div
                            dir={isRTL ? "rtl" : "ltr"}
                            ref={scrollContainerRef}
                            className="flex items-center gap-4 overflow-x-auto scrollbar-hide py-2 px-2"
                            style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {renderThumbnails()}
                        </div>

                        <button
                            variant="ghost"
                            size="icon"
                            className="hover:opacity-70 p-2 items-center left-5 transition-all duration-300 ease-in-out"
                            onClick={() => scroll('right')}
                        >
                            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill="#FFFFFF"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12.6864 4.5552C13.4264 3.81523 14.6262 3.81526 15.3662 4.55528L31.2028 20.3929C32.0908 21.2809 32.0908 22.7206 31.2028 23.6086L15.3661 39.4452C14.6261 40.1852 13.4263 40.1852 12.6863 39.4452C11.9463 38.7052 11.9463 37.5055 12.6863 36.7655L27.4512 22.0007L12.6863 7.23497C11.9463 6.49495 11.9464 5.29518 12.6864 4.5552Z"
                                />
                                <path
                                    fill="#000000"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M11.2721 40.8595C9.75109 39.3384 9.75108 36.8723 11.2721 35.3513L24.6228 22.0006L11.2721 8.64915C9.75105 7.12806 9.75112 4.66195 11.2722 3.14095C12.7933 1.61995 15.2594 1.62002 16.7804 3.14111L32.6171 18.9787C34.2861 20.6478 34.286 23.3538 32.617 25.0228L16.7803 40.8595C15.2593 42.3805 12.7932 42.3805 11.2721 40.8595ZM12.6863 36.7655C11.9463 37.5055 11.9463 38.7052 12.6863 39.4452C13.4263 40.1852 14.6261 40.1852 15.3661 39.4452L31.2028 23.6086C32.0908 22.7206 32.0908 21.2809 31.2028 20.3929L15.3662 4.55528C14.6262 3.81526 13.4264 3.81523 12.6864 4.5552C11.9464 5.29518 11.9463 6.49495 12.6863 7.23497L27.4512 22.0007L12.6863 36.7655Z"
                                    fillOpacity="0.2"
                                />
                            </svg>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PageOverviewModal;