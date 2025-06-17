import "turn.js";
import Turn from "../Helper/Turn.jsx";
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import JsonToHtml from "../Helper/JsonToHtml.jsx";
import { GetFlipbookApi } from "@/service/flipbook.service.js";
import { toast } from "sonner";
import $ from "jquery";
import { Loader2 } from "lucide-react";
import { useFlipbookSettings as useFlipbookSettingsContext } from "@/context/FlipbookSettingsProvider.jsx";
import { useFlipbookSettings } from "@/hooks/useFlipbookSettings";
import PageContentRenderer from "./PageContentRenderer";
import { LayoutStyle } from "@/utils/enum.js";

const Slider = ({ width, height, pageType, pageContent, currentPage, setCurrentPage, onPageChange, totalPages, divWidth, divHeight, visibilitySettings, onLoad }) => {
    useEffect(() => {
        if (onLoad) onLoad();
    }, [onLoad]);

    // Calculate slide index from currentPage
    const getSlideIndex = (page) => {
        if (pageType === "single") {
            return page - 1; // Each page is a slide
        }
        // For double-page mode:
        // Page 1 -> Slide 0 (single page)
        // Pages 2,3 -> Slide 1
        // Pages 4,5 -> Slide 2, etc.
        if (page === 1) return 0;
        return Math.floor((page - 2) / 2) + 1;
    };

    // Get pages for a given slide index
    const getPagesForSlide = (slideIndex) => {
        if (pageType === "single") {
            return [pageContent[slideIndex]]; // One page per slide
        }
        if (slideIndex === 0) {
            return [pageContent[0]]; // First slide shows only page 1
        }
        const pageIndex = 2 * (slideIndex - 1) + 1; // Start from page 2
        const pages = [pageContent[pageIndex]];
        if (pageContent[pageIndex + 1]) {
            pages.push(pageContent[pageIndex + 1]); // Add next page if available
        }
        return visibilitySettings?.rightToLeftOrientation ? pages.reverse() : pages;
    };

    // Calculate total number of slides
    const totalSlides = pageType === "single" ? totalPages : Math.ceil((totalPages - 1) / 2) + 1;

    // Current slide index
    const currentSlide = getSlideIndex(currentPage);

    // Determine transform direction based on rightToLeftOrientation
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

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

const FlipBook = forwardRef(function FlipBook({ flipbookId, onPageChange, component, isMobile, isDrawerOpen, isFullscreen, pageType, setPageType }, ref) {

    const [width, setWidth] = useState(793);
    const [height, setHeight] = useState(793);
    const [divWidth, setDivWidth] = useState(793);
    const [divHeight, setDivHeight] = useState(793);

    const [pageContent, setPageContent] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const { latestJson } = useFlipbookSettingsContext();
    const visibilitySettings = useFlipbookSettings(latestJson);

    const myRef = useRef(null);

    const calculateNewDivSize = (screenWidth, screenHeight, divWidth, divHeight) => {
        pageType === "double" ? (divWidth *= 2) : (divWidth *= 1);
        const aspectRatio = divWidth / divHeight;
        const maxWidth = screenWidth * 0.9;
        const maxHeight = screenHeight * 0.8;
        let newWidth, newHeight;
        if (divWidth > maxWidth) {
            newWidth = maxWidth;
            newHeight = newWidth / aspectRatio;
        } else {
            newWidth = divWidth;
            newHeight = divHeight;
        }
        if (newHeight > maxHeight) {
            newHeight = maxHeight;
            newWidth = newHeight * aspectRatio;
        }
        return { width: newWidth, height: newHeight };
    };

    useEffect(() => {
        const handleResize = () => {
            const previewDialog = document.getElementById("preview-dialog");
            if (visibilitySettings.layoutStyle === LayoutStyle.SMART_VIEW) {
                if (previewDialog?.clientWidth < 768) {
                    setPageType("single");
                } else {
                    setPageType("double");
                }
            } else if (visibilitySettings.layoutStyle === LayoutStyle.ONE_PAGE) {
                setPageType("single");
            } else if (visibilitySettings.layoutStyle === LayoutStyle.TWO_PAGE) {
                setPageType("double");
            }
            const ratioDta = calculateNewDivSize(previewDialog?.clientWidth, previewDialog?.clientHeight, divWidth, divHeight);
            setHeight(ratioDta.height);
            setWidth(ratioDta.width);
        };
        const debouncedResize = debounce(handleResize, 150);
        setTimeout(() => {
            handleResize();
        }, 100);
        window.addEventListener("resize", debouncedResize);
        return () => {
            window.removeEventListener("resize", debouncedResize);
        };
    }, [pageType, divWidth, divHeight, isDrawerOpen, isFullscreen, visibilitySettings.layoutStyle]);

    useEffect(() => {
        const getPageData = async () => {
            try {
                setPageContent([]);
                const response = await GetFlipbookApi(flipbookId, false);
                setDivHeight(response.data.height);
                setDivWidth(response.data.width);

                const htmlData = JsonToHtml(response.data.pages);
                htmlData.map((data) => {
                    setPageContent((prev) => [...prev, data]);
                });
                setTotalPages(response.data.pages.length);
            } catch (error) {
                toast.error("Failed to load flipbook", {
                    description: error.message,
                });
            }
        };
        getPageData();
    }, [flipbookId]);

    useEffect(() => {
        if (visibilitySettings.pageTransition === 0 && myRef.current) {
            const flipbookEL = myRef.current;
            const handleTurned = (e, page) => {
                pageType === "double" && totalPages % 2 != 0 && page == totalPages - 1 && (page = totalPages);
                page && setCurrentPage(page);
                if (onPageChange) onPageChange(page, totalPages);
            };
            $(flipbookEL).on("turned", handleTurned);
            setTimeout(() => {
                let page = $(flipbookEL).turn("page");
                pageType === "double" && totalPages % 2 != 0 && page == totalPages - 1 && (page = totalPages);
                page && setCurrentPage(page);
                if (onPageChange) onPageChange(page, totalPages);
            }, 100);
            return () => {
                $(flipbookEL).off("turned", handleTurned);
            };
        } else {
            onPageChange(currentPage, totalPages)
        }
    }, [pageContent, totalPages, onPageChange, visibilitySettings.pageTransition]);

    useImperativeHandle(ref, () => ({
        setPage: (page) => {
            if (visibilitySettings.pageTransition === 0 && myRef.current) {
                $(myRef.current).turn("page", page);
            } else {
                setCurrentPage(page);
            }
        },
    }));

    if (pageContent.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center data-[state=inactive]:hidden">
                <div className="w-full h-full flex items-center justify-center">
                    <Loader2 className="animate-spin" />
                </div>
            </div>
        );
    }

    const handleBookLoad = () => {

    };

    const handlePrevPage = () => {
        if (visibilitySettings.pageTransition === 0 && myRef.current && currentPage > 1) {
            $(myRef.current).turn("previous");
        } else if (currentPage > 1) {
            if (pageType === "double" && currentPage === 2) {
                setCurrentPage(1); // Go to page 1 (first slide)
                onPageChange(1, totalPages);
            } else if (pageType === "double") {
                setCurrentPage(currentPage - 2); // Move back two pages
                onPageChange(currentPage - 2, totalPages);
            } else {
                setCurrentPage(currentPage - 1); // Move back one page
                onPageChange(currentPage - 1, totalPages);
            }
        }
    };

    const handleNextPage = () => {
        if (visibilitySettings.pageTransition === 0 && myRef.current && currentPage < totalPages) {
            $(myRef.current).turn("next");
        } else if (currentPage < totalPages) {
            if (pageType === "double" && currentPage === 1) {
                setCurrentPage(2); // Go to pages 2 and 3 (second slide)
                onPageChange(2, totalPages);
            } else if (pageType === "double") {
                if (totalPages % 2 !== 0 && currentPage + 3 == totalPages) {
                    setCurrentPage(totalPages); // Move forward two pages
                    onPageChange(totalPages, totalPages);
                } else {
                    setCurrentPage(currentPage + 2); // Move forward two pages
                    onPageChange(currentPage + 2, totalPages);
                }
            } else {
                setCurrentPage(currentPage + 1); // Move forward one page
                onPageChange(currentPage + 1, totalPages);
            }
        }
        setTimeout(() => {


        }, 1000);

    };

    return (
        <>
            {visibilitySettings.brandLogo && (
                visibilitySettings.logoLink ? (
                    <a
                        href={visibilitySettings.logoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-5 left-5 cursor-pointer z-[11]"
                    >
                        <img
                            src={visibilitySettings.brandLogo}
                            width={200}
                            alt="Logo"
                            className="w-auto h-auto max-h-[50px] max-w-[200px]"
                        />
                    </a>
                ) : (
                    <img
                        src={visibilitySettings.brandLogo}
                        width={200}
                        className="absolute top-5 left-5 w-auto h-auto max-h-[50px] max-w-[200px]"
                        alt="Logo"
                    />
                )
            )}

            <div className="wrapper flex flex-col items-center justify-center relative">
                <div className="aspect" style={{ width, height }}>
                    <div className="aspect-inner">
                        {visibilitySettings.pageTransition === 0 ? (
                            <Turn
                                className="flipbook"
                                id="flipbook"
                                width={width}
                                height={height}
                                pageType={pageType}
                                myRef={myRef}
                                onLoad={handleBookLoad}
                                visibilitySettings={visibilitySettings}
                            >
                                {pageContent.map((page, index) => (
                                    <div key={index} className="page">
                                        <div
                                            style={{
                                                transformOrigin: "left top",
                                                transform: `scale(${width / (pageType === "double" ? divWidth * 2 : divWidth)}, ${height / divHeight})`,
                                                width: `${pageType === "double" ? divWidth : divWidth}px`,
                                                height: `${divHeight}px`,
                                                backgroundColor: page?.background || visibilitySettings.backgroundColor || "white",
                                                position: "relative",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {page.pageData.map((data, idx) => (
                                                <PageContentRenderer
                                                    key={idx}
                                                    data={data}
                                                    index={idx}
                                                    visibilitySettings={visibilitySettings}
                                                    flipbookRef={myRef}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </Turn>
                        ) : (
                            <Slider
                                width={width}
                                height={height}
                                pageType={pageType}
                                pageContent={pageContent}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                onPageChange={onPageChange}
                                totalPages={totalPages}
                                divWidth={divWidth}
                                divHeight={divHeight}
                                visibilitySettings={visibilitySettings}
                                onLoad={handleBookLoad}
                            />
                        )}
                    </div>
                </div>
                {visibilitySettings.showNavigationArrow && (
                    <>
                        {currentPage > 1 && (
                            <button
                                onClick={handlePrevPage}
                                className="absolute flex hover:bg-[#ffffff40] rounded-full p-2 items-center left-5 transition-all duration-300 ease-in-out"
                                aria-label="Previous page"
                            >
                                <svg aria-hidden="true" width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
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
                        )}
                        {currentPage < totalPages && (
                            <button
                                onClick={handleNextPage}
                                className="absolute flex hover:bg-[#ffffff40] rounded-full p-2 items-center right-5 transition-all duration-300 ease-in-out"
                                aria-label="Next page"
                            >
                                <svg aria-hidden="true" width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
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
                        )}
                    </>
                )}
            </div>
        </>
    );
});

export default FlipBook;