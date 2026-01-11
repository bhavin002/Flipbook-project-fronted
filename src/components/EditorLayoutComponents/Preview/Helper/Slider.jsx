import React, { useEffect, useState, useMemo } from "react";
import PageContentRenderer from "../Components/PageContentRenderer";
import PageWrapper from "../Components/PageWrapper";
import { Loader } from "@/components/ui/loader";

const Slider = ({ width, height, pageType, pageContent, currentPage, setCurrentPage, onPageChange, totalPages, divWidth, divHeight, visibilitySettings, onLoad, flipbookId }) => {
    const [loadedPages, setLoadedPages] = useState([]);
    const [renderedPages, setRenderedPages] = useState([]);

    useEffect(() => {
        if (onLoad) onLoad();
    }, [onLoad]);

    useEffect(() => {
        let autoPlayInterval = null;

        if (visibilitySettings?.automaticTransition) {
            autoPlayInterval = setInterval(() => {
                setCurrentPage((prevPage) => {
                    let nextPage;
                    if (prevPage >= totalPages) {
                        nextPage = 1;
                    } else {
                        nextPage = prevPage + 2;
                    }
                    nextPage = Math.min(nextPage, totalPages);
                    onPageChange(nextPage, totalPages);
                    return nextPage;
                });
            }, (visibilitySettings.automaticTransitionDelay || 4) * 1000);
        }

        return () => {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        };
    }, [visibilitySettings?.automaticTransition, visibilitySettings?.automaticTransitionDelay, totalPages, onPageChange]);

    const getSlideIndex = (page) => {
        if (pageType === "single") {
            return page - 1;
        }
        if (page === 1) return 0;
        return Math.floor((page - 2) / 2) + 1;
    };

    const getPagesForSlide = (slideIndex) => {
        if (pageType === "single") {
            return [pageContent[slideIndex]];
        }
        if (slideIndex === 0) {
            return [pageContent[0]];
        }
        const pageIndex = 2 * (slideIndex - 1) + 1;
        const pages = [pageContent[pageIndex]];
        if (pageContent[pageIndex + 1]) {
            pages.push(pageContent[pageIndex + 1]);
        }
        return visibilitySettings?.rightToLeftOrientation ? pages.reverse() : pages;
    };

    const totalSlides = pageType === "single" ? totalPages : Math.ceil((totalPages - 1) / 2) + 1;
    const currentSlide = getSlideIndex(currentPage);

    // Calculate current visible pages
    const currentPages = useMemo(() => {
        if (pageType === "single") {
            return [currentPage];
        } else if (pageType === "double") {
            if (currentPage === 1) {
                return [1];
            } else {
                let leftPage;
                if (currentPage % 2 === 0) {
                    leftPage = currentPage;
                } else {
                    leftPage = currentPage - 1;
                }
                const pages = [leftPage];
                if (leftPage + 1 <= totalPages) {
                    pages.push(leftPage + 1);
                }
                return pages;
            }
        }
        return [];
    }, [pageType, currentPage, totalPages]);

    // Priority: Always render current visible pages
    useEffect(() => {
        setRenderedPages((prev) => {
            const newRendered = [...prev];
            let changed = false;
            currentPages.forEach((page) => {
                if (!newRendered.includes(page)) {
                    newRendered.push(page);
                    changed = true;
                }
            });
            return changed ? newRendered : prev;
        });
    }, [currentPages]);

    // Sequential Background Loading
    useEffect(() => {
        if (totalPages === 0) return;

        const loadNextPage = () => {
            for (let i = 1; i <= totalPages; i++) {
                if (loadedPages.includes(i)) continue;

                if (renderedPages.includes(i)) {
                    return;
                }

                setRenderedPages((prev) => [...prev, i]);
                return;
            }
        };

        const timeout = setTimeout(loadNextPage, 100);
        return () => clearTimeout(timeout);
    }, [loadedPages, renderedPages, totalPages]);

    const handlePageLoad = (pageNumber) => {
        setLoadedPages((prev) => {
            if (!prev.includes(pageNumber)) {
                return [...prev, pageNumber];
            }
            return prev;
        });
    };

    const transformDirection = visibilitySettings?.rightToLeftOrientation ? `translateX(${currentSlide * width}px)` : `translateX(-${currentSlide * width}px)`;

    return (
        <div
            className="slider-container"
            style={{
                width,
                height,
                position: "relative",
                overflow: "hidden",
                direction: visibilitySettings?.rightToLeftOrientation ? "rtl" : "ltr",
                textAlign: "left"
            }}
        >
            <div
                className="slider-track"
                style={{
                    display: "flex",
                    transform: transformDirection,
                    transition: "transform 0.5s ease-in-out",
                }}
            >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                    const pages = getPagesForSlide(slideIndex);
                    return (
                        <div
                            key={slideIndex}
                            className="slide"
                            style={{
                                width: width,
                                height,
                                display: "flex",
                                flexShrink: 0,
                                flexDirection: visibilitySettings?.rightToLeftOrientation ? "row-reverse" : "row",
                            }}
                        >
                            {pages.map((page, pageIdx) => {
                                const pageNumber = pageContent.indexOf(page) + 1;
                                const isVisible = currentPages.includes(pageNumber);
                                const isRendered = renderedPages.includes(pageNumber);
                                const isLoaded = loadedPages.includes(pageNumber);

                                return (
                                    <>
                                        {slideIndex === 0 && !visibilitySettings?.rightToLeftOrientation && pageType === "double" ? (
                                            <div
                                                key={-1}
                                                className="page"
                                                style={{
                                                    width: pageType === "double" ? width / 2 : width,
                                                    height,
                                                    flexShrink: 0,
                                                }}
                                            ></div>
                                        ) : null}
                                        {slideIndex === totalSlides - 1 && visibilitySettings?.rightToLeftOrientation && pageType === "double" ? (
                                            <div
                                                key={-1}
                                                className="page"
                                                style={{
                                                    width: pageType === "double" ? width / 2 : width,
                                                    height,
                                                    flexShrink: 0,
                                                }}
                                            ></div>
                                        ) : null}
                                        <div
                                            key={pageIdx}
                                            className="page"
                                            style={{
                                                width: pageType === "double" ? width / 2 : width,
                                                height,
                                                flexShrink: 0,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    transformOrigin: visibilitySettings?.rightToLeftOrientation ? "right top" : "left top",
                                                    transform: `scale(${width / (pageType === "double" ? divWidth * 2 : divWidth)}, ${height / divHeight})`,
                                                    width: `${pageType === "double" ? divWidth : divWidth}px`,
                                                    height: `${divHeight}px`,
                                                    backgroundColor: page?.background || visibilitySettings.backgroundColor || "white",
                                                    position: "relative",
                                                    overflow: "hidden",
                                                    filter: (!isLoaded && isVisible) ? 'blur(4px)' : 'none',
                                                    transition: 'filter 0.5s ease-in-out'
                                                }}
                                            >
                                                {isRendered && (
                                                    <PageWrapper
                                                        pageNumber={pageNumber}
                                                        onPageLoad={handlePageLoad}
                                                        isVisible={isVisible}
                                                    >
                                                        {page?.pageData.map((data, idx) => (
                                                            <PageContentRenderer
                                                                key={idx}
                                                                data={data}
                                                                index={idx}
                                                                visibilitySettings={visibilitySettings}
                                                                flipbookId={flipbookId}
                                                                isVisible={isVisible}
                                                            />
                                                        ))}
                                                    </PageWrapper>
                                                )}

                                                {/* Enhanced Spine Shadow / Depth Overlay */}
                                                <div className="absolute inset-0 pointer-events-none"
                                                    style={{
                                                        background: pageNumber % 2 === 0
                                                            ? 'linear-gradient(to left, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 10%)'
                                                            : 'linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 10%)',
                                                        zIndex: 10
                                                    }}
                                                />

                                                {/* Skeleton Shimmer Overlay */}
                                                {(!isLoaded && isVisible) && (
                                                    <div className="absolute inset-0 z-50 skeleton-shimmer bg-white/20" />
                                                )}
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Slider;