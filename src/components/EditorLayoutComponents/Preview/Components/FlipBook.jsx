import "turn.js";
import Turn from "../Helper/Turn.jsx";
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import JsonToHtml from "../Helper/JsonToHtml.jsx";
import { GetFlipbookApi } from "@/service/flipbook.service.js";
import { GetPublishFlipbookApi, UpdateFlipbookViewCountApi, GetFlipbookThumbnailsApi } from "@/service/flipbook.publish.service.js";
import { toast } from "sonner";
import $ from "jquery";
import { Loader } from "@/components/ui/loader";
import { useFlipbookSettings as useFlipbookSettingsContext } from "@/context/FlipbookSettingsProvider.jsx";
import { useFlipbookSettings } from "@/hooks/useFlipbookSettings";
import PageContentRenderer from "./PageContentRenderer";
import PageWrapper from "./PageWrapper";
import { BackgroundColorType, BackgroundImageType, LayoutStyle } from "@/utils/enum.js";
import Slider from "../Helper/Slider.jsx";
import PageOverviewModal from "./PageOverviewModal.jsx";
import ShoppingCartPopover from "./ShoppingCartPopover.jsx";
import { detectDeviceType } from "@/utils/Helper.js";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

const FlipBook = forwardRef(function FlipBook({ flipbookId, onPageChange, containerRefHeight, component, isMobile, isDrawerOpen, isFullscreen, pageType, setPageType, previewId, isPageOverviewOpen, isPublicView, publicFlipbookData, zoomLevel = 1, transformRef, setZoomLevel, isAutoFlipping }, ref) {
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(400);
    const [divWidth, setDivWidth] = useState(400);
    const [divHeight, setDivHeight] = useState(400);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [pageContent, setPageContent] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewCountUpdated, setViewCountUpdated] = useState(false);
    const { latestJson } = useFlipbookSettingsContext();
    const visibilitySettings = useFlipbookSettings(latestJson);
    const [currentPages, setCurrentPages] = useState([0, 1]);
    const [thumbnails, setThumbnails] = useState([]);
    const [isFlipbookReady, setIsFlipbookReady] = useState(false);
    const [loadedPages, setLoadedPages] = useState([]);
    const [renderedPages, setRenderedPages] = useState([]);

    const myRef = useRef(null);
    const isTurning = useRef(false);

    const calculateNewDivSize = (screenWidth, screenHeight, divWidth, divHeight) => {
        pageType === "double" ? (divWidth *= 2) : (divWidth *= 1);
        const aspectRatio = divWidth / divHeight;
        const maxWidth = screenWidth - 30;
        const maxHeight = screenHeight - (isPageOverviewOpen ? 300 : 170);
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
        setIsFlipbookReady(false);
    }, [isPageOverviewOpen, isFullscreen]);
    useEffect(() => {
        const handleResize = () => {
            const previewDialog = document.getElementById(previewId);
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

            // Mark flipbook as ready after dimensions are calculated
            // setIsFlipbookReady(false);
            if (!isFlipbookReady && divWidth !== 400 && divHeight !== 400) {
                setTimeout(() => setIsFlipbookReady(true), 100);
            }
        };
        const debouncedResize = debounce(handleResize, 250);
        setTimeout(() => {
            handleResize();
        }, 200);
        window.addEventListener("resize", debouncedResize);
        return () => {
            window.removeEventListener("resize", debouncedResize);
        };
    }, [pageType, divWidth, divHeight, isDrawerOpen, isFullscreen, visibilitySettings.layoutStyle, containerRefHeight, isPageOverviewOpen, isFlipbookReady]);

    useEffect(() => {
        const getPageData = async () => {
            try {
                setIsFlipbookReady(false);
                setPageContent([]);
                let flipbookRes = null;
                let fetchedThumbnails = [];
                if (isPublicView) {
                    let flipbookPromise;
                    if (publicFlipbookData) {
                        flipbookRes = publicFlipbookData;
                        flipbookPromise = Promise.resolve({ data: { flipbook: publicFlipbookData } });
                    } else {
                        flipbookPromise = GetPublishFlipbookApi(flipbookId);
                    }
                    const [publishRes, thumbRes] = await Promise.all([
                        flipbookPromise,
                        GetFlipbookThumbnailsApi(flipbookId)
                    ]);
                    if (!flipbookRes) {
                        flipbookRes = publishRes.data.flipbook;
                    }
                    fetchedThumbnails = thumbRes.data.thumbnails || [];
                } else {
                    const response = await GetFlipbookApi(flipbookId, false);
                    flipbookRes = response.data;
                }
                setDivHeight(flipbookRes.height);
                setDivWidth(flipbookRes.width);

                const htmlData = JsonToHtml(flipbookRes.pages);
                htmlData.map((data) => {
                    setPageContent((prev) => [...prev, data]);
                });
                setTotalPages(flipbookRes.pages.length);
                if (isPublicView) {
                    setThumbnails(fetchedThumbnails);
                } else {
                    setThumbnails([]);
                }
            } catch (error) {
                toast.error("Failed to load flipbook", {
                    description: error.message || "Oops! Something went wrong.",
                });
                setIsFlipbookReady(true); // Show UI even on error
            }
        };
        getPageData();
    }, [flipbookId, publicFlipbookData]);

    useEffect(() => {
        if (visibilitySettings.pageTransition === 0 && myRef.current) {
            const flipbookEL = myRef.current;
            const handleTurned = (e, page) => {
                pageType === "double" && totalPages % 2 != 0 && page == totalPages - 1 && (page = totalPages);
                page && setCurrentPage(page);
                if (onPageChange) onPageChange(page, totalPages);
                isTurning.current = false;
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

    useEffect(() => {
        if (pageType === "single") {
            setCurrentPages([currentPage]);
        } else if (pageType === "double") {
            if (currentPage === 1) {
                setCurrentPages([1]);
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
                setCurrentPages(pages);
            }
        }
    }, [pageType, currentPage, totalPages]);

    useEffect(() => {
        // Priority: Always render current visible pages
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

    useEffect(() => {
        // Sequential Background Loading
        if (totalPages === 0) return;

        const loadNextPage = () => {
            for (let i = 1; i <= totalPages; i++) {
                if (loadedPages.includes(i)) continue; // Already loaded

                if (renderedPages.includes(i)) {
                    return;
                }

                setRenderedPages((prev) => [...prev, i]);
                return; // Only start one at a time
            }
        };

        const timeout = setTimeout(loadNextPage, 100); // Small delay to allow state updates
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
                    <Loader />
                </div>
            </div>
        );
    }

    const handleFlipbookClick = async () => {
        if (isPublicView && !viewCountUpdated) {
            try {
                const data = {
                    device: detectDeviceType()
                }
                await UpdateFlipbookViewCountApi(flipbookId, data);
                setViewCountUpdated(true);
            } catch (error) {
                toast.error("Failed to update view count", {
                    description: error.message || "Oops! Something went wrong."
                })
            }
        }
    };

    const handlePrevPage = () => {
        if (isTurning.current) return;
        isTurning.current = true;
        transformRef.current?.resetTransform(200);
        setTimeout(() => {
            if (visibilitySettings.pageTransition === 0 && myRef.current && currentPage > 1) {
                $(myRef.current).turn("previous");
            } else if (currentPage > 1) {
                if (pageType === "double" && currentPage === 2) {
                    setCurrentPage(1);
                    onPageChange(1, totalPages);
                } else if (pageType === "double") {
                    setCurrentPage(currentPage - 2);
                    onPageChange(currentPage - 2, totalPages);
                } else {
                    setCurrentPage(currentPage - 1);
                    onPageChange(currentPage - 1, totalPages);
                }
                isTurning.current = false;
            } else {
                isTurning.current = false;
            }
        }, 250);
    };

    const handleNextPage = () => {
        if (isTurning.current) return;
        isTurning.current = true;
        transformRef.current?.resetTransform(200);
        setTimeout(() => {

            if (visibilitySettings.pageTransition === 0 && myRef.current && currentPage < totalPages) {
                $(myRef.current).turn("next");
            } else if (currentPage < totalPages) {
                if (pageType === "double" && currentPage === 1) {
                    setCurrentPage(2);
                    onPageChange(2, totalPages);
                } else if (pageType === "double") {

                    if (
                        (totalPages % 2 === 0 && currentPage + 2 > totalPages) ||
                        (totalPages % 2 !== 0 && currentPage + 1 >= totalPages)
                    ) {

                        return;
                    } else {
                        setCurrentPage(currentPage + 2);
                        onPageChange(currentPage + 2, totalPages);
                    }
                } else {
                    setCurrentPage(currentPage + 1);
                    onPageChange(currentPage + 1, totalPages);
                }
                isTurning.current = false;
            } else {
                isTurning.current = false;
            }
        }, 250);

    };

    return (
        <>
            <div className="w-full h-full"
                style={{
                    backgroundColor: visibilitySettings.backgroundColor === BackgroundColorType.SOLID ? visibilitySettings.backgroundColorHash : 'white',
                    backgroundImage: visibilitySettings.backgroundColor === BackgroundColorType.IMAGE ? `url(${visibilitySettings.backgroundImage})` : 'none',
                    ...(visibilitySettings.backgroundImageType === BackgroundImageType.SCALE_CROP && {
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }),
                    ...(visibilitySettings.backgroundImageType === BackgroundImageType.CENTER && {
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    })
                }}>

                <div className="w-full absolute top-0  left-0 z-[10]" dir={visibilitySettings.rightToLeftOrientation ? "rtl" : "ltr"}>
                    {visibilitySettings.brandLogo && (
                        <div className="flex justify-start p-4">
                            {visibilitySettings.logoLink ? (
                                <a
                                    href={visibilitySettings.logoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cursor-pointer z-[11]"
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
                                    className="w-auto h-auto max-h-[50px] max-w-[200px]"
                                    alt="Logo"
                                />
                            )}
                        </div>
                    )}
                    {visibilitySettings.showShoppingList && <div className={`absolute top-4 ${visibilitySettings.rightToLeftOrientation ? "left-4" : "right-4"} z-[12]`}>
                        <ShoppingCartPopover flipbookId={flipbookId} isMobile={isMobile} visibilitySettings={visibilitySettings} />
                    </div>}
                </div>

                <div
                    className={`wrapper flex flex-col items-center justify-center relative`}
                    id={previewId}
                    onClick={handleFlipbookClick}
                    style={{
                        opacity: isFlipbookReady ? 1 : 0,
                        transition: 'opacity 0.3s ease-in',
                        pointerEvents: isFlipbookReady ? 'auto' : 'none'
                    }}
                >
                    <TransformWrapper
                        ref={transformRef}
                        initialScale={1}
                        minScale={1}
                        maxScale={4}
                        centerOnInit={true}
                        smooth={true}
                        onTransformed={(e) => {
                            const { scale } = e.state;
                            setZoomLevel(scale);
                        }}
                        disablePadding={true}
                        disabled={zoomLevel == 1 && isMouseDown}
                        doubleClick={{ mode: "reset" }}
                        wheel={{ smoothStep: 0.01, wheelDisabled: true }}
                        pinch={{ disabled: false, step: 0.05 }}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <TransformComponent>
                            <div className={`aspect ${isPageOverviewOpen && zoomLevel == 1 ? "bottom-[45px]" : "bottom-[0]"}`} style={{
                                width, height,
                                transition: 'bottom 0.3s ease-in',
                            }}>
                                <div className="aspect-inner">
                                    {visibilitySettings.pageTransition === 0 ? (
                                        <Turn
                                            isDisabled={zoomLevel > 1 || isMouseDown}
                                            className="flipbook"
                                            id="flipbook"
                                            width={width}
                                            height={height}
                                            pageType={pageType}
                                            myRef={myRef}
                                            visibilitySettings={visibilitySettings}
                                            setCurrentPages={setCurrentPages}
                                            isAutoFlipping={isAutoFlipping}
                                        >
                                            {pageContent.map((page, index) => {
                                                const pageNumber = index + 1;
                                                const isVisible = currentPages.includes(pageNumber);
                                                const isRendered = renderedPages.includes(pageNumber);
                                                const isLoaded = loadedPages.includes(pageNumber);

                                                return (
                                                    <div
                                                        key={index}
                                                        className="page"
                                                        style={{ cursor: zoomLevel > 1 ? (isMouseDown ? 'grabbing' : 'grab') : 'default' }}
                                                        onMouseDown={() => setIsMouseDown(true)}
                                                        onMouseUp={() => setIsMouseDown(false)}
                                                    >
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
                                                                            flipbookRef={myRef}
                                                                            flipbookId={flipbookId}
                                                                            isVisible={isVisible}
                                                                        />
                                                                    ))}
                                                                </PageWrapper>
                                                            )}
                                                        </div>
                                                        {(!isLoaded && isVisible) && (
                                                            <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
                                                                <Loader />
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
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
                                            flipbookId={flipbookId}
                                        />
                                    )}
                                </div>
                            </div>
                        </TransformComponent>
                    </TransformWrapper>
                    {visibilitySettings.showNavigationArrow && (
                        <>
                            {currentPage > 1 && (
                                <button
                                    onClick={handlePrevPage}
                                    className="absolute flex hover:opacity-70 p-2 items-center left-5 transition-all duration-300 ease-in-out"
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
                            {((pageType !== "double" && currentPage < totalPages) ||
                                (pageType === "double" && currentPage < (totalPages % 2 == 0 ? totalPages : totalPages - 1))) && (
                                    <button
                                        onClick={handleNextPage}
                                        className="absolute flex hover:opacity-70 p-2 items-center right-5 transition-all duration-300 ease-in-out"
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
                {visibilitySettings.showPageOverview && (
                    <PageOverviewModal
                        isOpen={isPageOverviewOpen}
                        width={divWidth}
                        height={divHeight}
                        currentPages={currentPages}
                        totalPages={totalPages}
                        pageType={pageType}
                        flipbookId={flipbookId}
                        flipbookRef={myRef}
                        isPublicView={isPublicView}
                        thumbnails={thumbnails}
                        transformRef={transformRef}
                        visibilitySettings={visibilitySettings}
                    />
                )}
            </div>
        </>
    );
});

export default FlipBook;