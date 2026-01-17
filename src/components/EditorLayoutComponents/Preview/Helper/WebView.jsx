import React, { useEffect, useState, useMemo, useRef, forwardRef, useImperativeHandle } from "react";
import PageContentRenderer from "../Components/PageContentRenderer";
import PageWrapper from "../Components/PageWrapper";
import { BackgroundColorType, BackgroundImageType } from "@/utils/enum.js";

const WebView = forwardRef(function WebView({
    pageContent,
    currentPage,
    setCurrentPage,
    onPageChange,
    totalPages,
    divWidth,
    divHeight,
    visibilitySettings,
    flipbookId,
    isPublicView,
    component,
    isFullscreen,
    isAutoFlipping,
    isZoomed,
    setIsMouseDown
}, ref) {
    const [loadedPages, setLoadedPages] = useState([]);
    const [renderedPages, setRenderedPages] = useState([]);
    const scrollContainerRef = useRef(null);
    const pageRefs = useRef({});
    const lastScrolledPageRef = useRef(currentPage);
    const [isAutoScrolling, setIsAutoScrolling] = useState(false);


    // Calculate header height (brand logo + padding)
    const headerHeight = visibilitySettings?.brandLogo ? 82 : 0; // ~50px logo + 32px padding (p-4 = 16px top + 16px bottom)

    // Calculate page dimensions maintaining aspect ratio
    const calculatePageDimensions = () => {
        if (!scrollContainerRef?.current) return { width: divWidth, height: divHeight };

        const containerWidth = scrollContainerRef.current.clientWidth;
        const aspectRatio = divWidth / divHeight;

        // Set width to full container width
        let pageWidth = containerWidth;

        // Calculate height based on width to maintain aspect ratio
        let pageHeight = pageWidth / aspectRatio;

        return { width: pageWidth, height: pageHeight };
    };

    const [pageDimensions, setPageDimensions] = useState(() => calculatePageDimensions());

    // Scroll to specific page - defined early so it can be used in useEffects
    const scrollToPage = React.useCallback((pageNumber) => {
        const pageRef = pageRefs.current[pageNumber];
        if (pageRef && scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const pageTop = pageRef.offsetTop;
            const containerHeight = container.clientHeight;
            const scrollPosition = pageTop - (containerHeight / 2) + (pageDimensions.height / 2);

            setIsAutoScrolling(true);
            container.scrollTo({
                top: Math.max(0, scrollPosition),
                behavior: 'smooth'
            });

            // Set a timeout to clear isAutoScrolling after animation completes
            // (~500ms for smooth scroll)
            setTimeout(() => {
                setIsAutoScrolling(false);
            }, 600);
        }
    }, [pageDimensions]);

    // Automatic Transition Effect
    useEffect(() => {
        let autoPlayInterval = null;

        if (visibilitySettings?.automaticTransition && isAutoFlipping) {
            autoPlayInterval = setInterval(() => {
                if (currentPage < totalPages) {
                    scrollToPage(currentPage + 1);
                } else {
                    // Loop back to first page
                    scrollToPage(1);
                }
            }, (visibilitySettings.automaticTransitionDelay || 7) * 1000);
        }

        return () => {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        };
    }, [visibilitySettings?.automaticTransition, visibilitySettings?.automaticTransitionDelay, isAutoFlipping, currentPage, totalPages, scrollToPage]);


    // Update page dimensions when container ref is available
    useEffect(() => {
        if (scrollContainerRef.current) {
            setPageDimensions(calculatePageDimensions());
        }
    }, [divWidth, divHeight, component, headerHeight]);

    // Scroll to start page on initial load or when page changes programmatically
    useEffect(() => {
        if (scrollContainerRef.current && currentPage > 1 && pageRefs.current[currentPage]) {
            // Only scroll if the change didn't come from the user scrolling
            if (currentPage !== lastScrolledPageRef.current) {
                const timer = setTimeout(() => {
                    scrollToPage(currentPage);
                    // Sync the ref after programmatically scrolling
                    lastScrolledPageRef.current = currentPage;
                }, 300);
                return () => clearTimeout(timer);
            }
        }
    }, [currentPage, scrollToPage]);

    useEffect(() => {
        const handleResize = () => {
            setPageDimensions(calculatePageDimensions());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [divWidth, divHeight, component, headerHeight]);

    // Track which pages are currently visible in viewport
    useEffect(() => {
        const handleScroll = () => {
            if (!scrollContainerRef.current) return;

            const container = scrollContainerRef.current;
            const containerTop = container.scrollTop;
            const containerBottom = containerTop + container.clientHeight;

            let newCurrentPage = 1;
            let minDistance = Infinity;

            // Find the page closest to the center of the viewport
            Object.entries(pageRefs.current).forEach(([pageNum, ref]) => {
                if (!ref) return;
                const rect = ref.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const pageTop = rect.top - containerRect.top + container.scrollTop;
                const pageBottom = pageTop + rect.height;
                const pageCenter = (pageTop + pageBottom) / 2;
                const containerCenter = containerTop + container.clientHeight / 2;
                const distance = Math.abs(pageCenter - containerCenter);

                if (distance < minDistance) {
                    minDistance = distance;
                    newCurrentPage = parseInt(pageNum);
                }
            });

            if (newCurrentPage !== currentPage) {
                lastScrolledPageRef.current = newCurrentPage;
                setCurrentPage(newCurrentPage);
                onPageChange(newCurrentPage, totalPages);
            }
        };

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll, { passive: true });
            // Initial check
            handleScroll();
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [currentPage, totalPages, onPageChange, pageDimensions]);

    // Priority: Always render current visible pages and nearby pages
    useEffect(() => {
        setRenderedPages((prev) => {
            const newRendered = [...prev];
            let changed = false;

            // Render current page and nearby pages (for smooth scrolling)
            const pagesToRender = [
                currentPage,
                currentPage - 1,
                currentPage + 1,
                currentPage - 2,
                currentPage + 2
            ].filter(page => page >= 1 && page <= totalPages);

            pagesToRender.forEach((page) => {
                if (!newRendered.includes(page)) {
                    newRendered.push(page);
                    changed = true;
                }
            });

            return changed ? newRendered : prev;
        });
    }, [currentPage, totalPages]);

    // Sequential Background Loading
    useEffect(() => {
        if (totalPages === 0) return;

        const loadNextPage = () => {
            for (let i = 1; i <= totalPages; i++) {
                if (loadedPages.includes(i)) continue;
                if (renderedPages.includes(i)) {
                    setRenderedPages((prev) => [...prev, i]);
                    return;
                }
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

    // Expose scrollToPage method via ref
    useImperativeHandle(ref, () => ({
        scrollToPage: scrollToPage,
        setPage: (pageNumber) => {
            setCurrentPage(pageNumber);
            scrollToPage(pageNumber);
        },
        getCurrentPage: () => currentPage,
        getTotalPages: () => totalPages,
        isAutoScrolling: () => isAutoScrolling,
    }), [scrollToPage, setCurrentPage, currentPage, totalPages, isAutoScrolling]);

    const isPreviewMode = component === "customize";

    return (
        <div
            ref={scrollContainerRef}
            className="webview-container"
            onMouseDown={() => setIsMouseDown?.(true)}
            onMouseUp={() => setIsMouseDown?.(false)}
            onMouseLeave={() => setIsMouseDown?.(false)}
            style={{
                width: '100%',
                height: isPreviewMode && !isFullscreen ? 'calc(100vh - 64px)' : '100dvh',
                overflowY: isZoomed ? 'hidden' : 'auto',
                overflowX: 'hidden',
                position: isPreviewMode ? 'relative' : 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: visibilitySettings?.backgroundColor === BackgroundColorType.SOLID
                    ? visibilitySettings.backgroundColorHash
                    : 'white',
                backgroundImage: visibilitySettings?.backgroundColor === BackgroundColorType.IMAGE
                    ? `url(${visibilitySettings.backgroundImage})`
                    : 'none',
                ...(visibilitySettings?.backgroundImageType === BackgroundImageType.SCALE_CROP && {
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }),
                ...(visibilitySettings?.backgroundImageType === BackgroundImageType.CENTER && {
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }),
                // Hide scrollbar but keep functionality
                msOverflowStyle: 'none', // IE and Edge
                scrollbarWidth: 'none', // Firefox
            }}
        >
            <style dangerouslySetInnerHTML={{
                __html: `
                .webview-container::-webkit-scrollbar {
                    display: none;
                }
            `}} />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    padding: '0px',
                    gap: '0px', // No gap between pages - pages should connect
                    minHeight: '100%'
                }}
            >
                {pageContent.map((page, index) => {
                    const pageNumber = index + 1;
                    const isRendered = renderedPages.includes(pageNumber);
                    const isLoaded = loadedPages.includes(pageNumber);
                    const isVisible = Math.abs(pageNumber - currentPage) <= 2;

                    return (
                        <div
                            key={index}
                            ref={(el) => {
                                if (el) pageRefs.current[pageNumber] = el;
                            }}
                            style={{
                                width: `${pageDimensions.width}px`,
                                height: `${pageDimensions.height}px`,
                                flexShrink: 0,
                                position: 'relative',
                                boxShadow: index === 0 ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none', // Only shadow on first page
                                backgroundColor: page?.background || visibilitySettings?.backgroundColor || "white",
                                filter: (!isLoaded && isVisible) ? 'blur(4px)' : 'none',
                                transition: 'filter 0.5s ease-in-out',
                                marginBottom: index < pageContent.length - 1 ? '0px' : '0px' // No margin between pages
                            }}
                        >
                            <div
                                style={{
                                    transformOrigin: "left top",
                                    transform: `scale(${pageDimensions.width / divWidth}, ${pageDimensions.height / divHeight})`,
                                    width: `${divWidth}px`,
                                    height: `${divHeight}px`,
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                {isRendered && (
                                    <PageWrapper
                                        pageNumber={pageNumber}
                                        onPageLoad={handlePageLoad}
                                        isVisible={isVisible}
                                    >
                                        {page.pageData.map((data, idx) => (
                                            <PageContentRenderer
                                                key={idx}
                                                data={data}
                                                index={idx}
                                                visibilitySettings={visibilitySettings}
                                                flipbookId={flipbookId}
                                                isVisible={isVisible}
                                                isPublicView={isPublicView}
                                            />
                                        ))}
                                    </PageWrapper>
                                )}

                                {/* Skeleton Shimmer Overlay */}
                                {(!isLoaded && isVisible) && (
                                    <div className="absolute inset-0 z-50 skeleton-shimmer bg-white/20" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

export default WebView;

