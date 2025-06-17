import React, { useEffect } from "react";
import PageContentRenderer from "../Components/PageContentRenderer";

const Slider = ({ width, height, pageType, pageContent, currentPage, setCurrentPage, onPageChange, totalPages, divWidth, divHeight, visibilitySettings, onLoad }) => {
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
                        nextPage = prevPage + 2; // Increment by 1, not 2, unless that's intentional
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
                            {pages.map((page, pageIdx) => (
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
                                            }}
                                        >
                                            {page?.pageData.map((data, idx) => (
                                                <PageContentRenderer
                                                    key={idx}
                                                    data={data}
                                                    index={idx}
                                                    visibilitySettings={visibilitySettings}
                                                />
                                            ))}
                                        </div>
                                    </div>


                                </>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Slider;