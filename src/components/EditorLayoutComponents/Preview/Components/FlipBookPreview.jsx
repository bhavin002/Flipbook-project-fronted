import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Monitor,
    Smartphone,
    LayoutGrid,
    Search,
    Share2,
    List,
    ReceiptText,
    Minimize,
    Maximize,
    MoreHorizontal,
    Plus,
    Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FlipBook from "./FlipBook.jsx";
import { useFlipbookSettings as useFlipbookSettingsContext } from "@/context/FlipbookSettingsProvider.jsx";
import { useFlipbookSettings } from "@/hooks/useFlipbookSettings";
import { useViewMode } from "@/context/ViewModeContext";
import { BackgroundColorType, BackgroundImageType } from "@/utils/enum.js";
import BackgroundAudioPlayer, { useBackgroundAudio } from "./BackgroundAudioPlayer";
import TableOfContentsDrawer from "./TableOfContentsDrawer.jsx";
import LeadFormModel from "./LeadFormModel";
import cartService from '@/service/IndexedDBCart.service';
import { getProductCartInfoApi } from '@/service/product.service.js';
import { toast } from "sonner";
import { useShopSettings } from "@/context/ShopSettingsContext.jsx";
import ShareFlipbookDialog from "@/components/AppLayoutComponents/Sidebar/Home/MyFlipbooks/ShareFlipbookDialog.jsx";

export default function FlipBookPreview({ flipbookId, component, id = "preview-dialog", isPublicView = false, publicFlipbookData, startPage }) {
    const [currentPage, setCurrentPage] = useState(startPage || 1);
    const [totalPages, setTotalPages] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
    const [isPageOverviewOpen, setIsPageOverviewOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const { latestJson } = useFlipbookSettingsContext();
    const visibilitySettings = useFlipbookSettings(latestJson);
    const { activeTab, setActiveTab } = useViewMode();
    const { shopSettings } = useShopSettings();
    const { isPlaying, toggleAudio } = useBackgroundAudio(visibilitySettings);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setActiveTab("Mobile");
            } else {
                setActiveTab("Desktop");
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [setActiveTab]);

    const [pageType, setPageType] = useState("double");
    const progressBarRef = useRef(null);
    const flipBookRef = useRef(null);
    const containerRef = useRef(null);
    const transformRef = useRef(null);
    const mobileMenuRef = useRef(null);

    useEffect(() => {
        if (startPage && startPage > 0 && flipBookRef.current?.setPage) {
            const timer = setTimeout(() => {
                setPage(startPage);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [startPage]);

    useEffect(() => {
        const syncCartPrices = async () => {
            if (!flipbookId) return;
            try {
                const cartItems = await cartService.getCart(flipbookId);
                if (!cartItems || cartItems.length === 0) return;

                const uniqMap = new Map();
                cartItems.forEach(item => {
                    const key = `${item.productId}::${item.productVariantId || ''}`;
                    if (!uniqMap.has(key)) {
                        uniqMap.set(key, {
                            productId: item.productId,
                            variantId: item.productVariantId || ''
                        });
                    }
                });
                const payload = Array.from(uniqMap.values());

                let updatedProducts;
                try {
                    const response = await getProductCartInfoApi(payload);
                    updatedProducts = response.data;
                } catch (err) {
                    toast.error('Failed to sync cart prices', { description: err.message });
                    return;
                }

                const updatedCartItems = cartItems.map(item => {
                    const updated = updatedProducts.find(
                        p =>
                            p.productId === item.productId &&
                            (String(p.productVariantId || '') === String(item.productVariantId || ''))
                    );

                    if (updated) {
                        return {
                            ...item,
                            productTitle: updated.productName || item.productTitle,
                            productImage: updated.images && updated.images[0] ? updated.images[0].imageLink : item.productImage,
                            productPrice: updated.discountedPrice ?? updated.price ?? item.productPrice,
                            price: updated.price ?? item.price,
                            discountedPrice: updated.discountedPrice ?? item.discountedPrice,
                            images: updated.images || item.images,
                            pricingMethod: updated.pricingMethod || item.pricingMethod,
                            paidPersonalization: updated.paidPersonalization ?? item.paidPersonalization,
                            personalizationPrice: updated.personalizationPrice ?? item.personalizationPrice,
                        };
                    }
                    return item;
                });
                await cartService.saveCart(flipbookId, updatedCartItems);
            } catch (error) {
                toast.error('Failed to sync cart prices', { description: error.message || "Oops! Something went wrong." });
            }
        };
        syncCartPrices();
    }, []);

    const progress = totalPages > 1 ? ((currentPage - 1) / (totalPages - 1)) * 100 : 0;

    const handleTabChange = (value) => {
        setActiveTab(value.charAt(0).toUpperCase() + value.slice(1));
    };

    const handlePageChange = (page, total) => {
        const validPage = isNaN(page) || page < 1 ? 1 : page;
        const validTotal = isNaN(total) || total < 1 ? 1 : total;

        if (pageType == "double" && validTotal % 2 !== 0 && validPage + 1 == validTotal) {
            setCurrentPage(validTotal);
            setTotalPages(validTotal);
        } else {
            setCurrentPage(validPage);
            setTotalPages(validTotal);
        }
    };

    const setPage = (page) => {
        if (flipBookRef.current?.setPage) {
            flipBookRef.current.setPage(page);
        }
    };

    const handleDrag = (clientX) => {
        const bar = progressBarRef.current;
        if (!bar) return;

        const rect = bar.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = visibilitySettings.rightToLeftOrientation
            ? 1 - x / rect.width
            : x / rect.width;

        let page = Math.round(percent * (totalPages - 1)) + 1;
        page = Math.max(1, Math.min(page, totalPages));
        if (pageType === "double" && page > 1) {
            page = page % 2 === 0 ? page : page - 1;
        }
        if (pageType === "double" && totalPages % 2 !== 0 && page + 1 === totalPages) {
            page = totalPages;
        }

        console.log("page ???", page)


        setCurrentPage(page);
        setPage(page);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        handleDrag(e.clientX);
    };

    const handleMouseMove = (e) => {
        if (isDragging) handleDrag(e.clientX);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        handleDrag(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (isDragging) handleDrag(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
            window.addEventListener("touchmove", handleTouchMove);
            window.addEventListener("touchend", handleTouchEnd);
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isDragging]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setShowMobileMenu(false);
            }
        };

        if (showMobileMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMobileMenu]);

    const handleZoomChange = (value) => {
        const newZoomLevel = Math.max(1, Math.min(value, 4));
        setZoomLevel(newZoomLevel);
        if (transformRef.current) {
            const transformWrapper = transformRef.current;
            if (transformWrapper) {
                transformWrapper.centerView(newZoomLevel, 500, "easeOut");
            }
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().then(() => {
                setIsFullscreen(true);
            }).catch((err) => {
                console.error("Error attempting to enable full-screen mode:", err);
            });
        } else {
            document.exitFullscreen().then(() => {
                setIsFullscreen(false);
            }).catch((err) => {
                console.error("Error attempting to exit full-screen mode:", err);
            });
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    const renderProgressBar = (isMobile = false) => {
        let displayCurrentPage = isNaN(currentPage) ? 1 : currentPage % 2 === 0 ? currentPage : currentPage - 1;
        let displayTotalPages = isNaN(totalPages) ? 1 : totalPages;
        displayCurrentPage == 0 && displayCurrentPage++;
        if (pageType === "single") {
            displayCurrentPage = isNaN(currentPage) ? 1 : currentPage;
            displayTotalPages = isNaN(totalPages) ? 1 : totalPages;
        }

        let pageDisplay = pageType === "single"
            ? displayCurrentPage
            : displayCurrentPage % 2 !== 0
                ? `${displayCurrentPage}`
                : displayCurrentPage === displayTotalPages
                    ? `${displayCurrentPage}`
                    : `${displayCurrentPage}-${displayCurrentPage + 1}`;

        const isMobileView = isMobile || (typeof window !== 'undefined' && window.innerWidth < 768);

        if (isMobileView) {
            return (
                visibilitySettings.showControlBar && (
                    <div className="w-full flex flex-col items-center justify-center bottom-0 left-0 right-0 z-[2000] absolute  ">
                        <div className={`max-md:w-full w-full bg-transparent p-3 flex items-center justify-between gap-2 ${isPublicView ? "" : "max-w-[400px]"}`}>
                            <span className="text-xs font-medium whitespace-nowrap" style={{ color: visibilitySettings.playerPanelColorHash || 'black' }}>
                                {pageDisplay}/{displayTotalPages}
                            </span>

                            {visibilitySettings.showNavigationBar && (
                                <div className="flex-1 mx-2 flex items-center">
                                    <div
                                        ref={progressBarRef}
                                        className="flex-1 h-[2px] rounded-full relative cursor-pointer select-none hover:bg-black/30 transition-colors"
                                        onMouseDown={handleMouseDown}
                                        onTouchStart={handleTouchStart}
                                        style={{
                                            backgroundColor: visibilitySettings.playerAccentColorHash || 'black'
                                        }}
                                    >
                                        <div
                                            className="h-[2px] rounded-full absolute left-0 top-0 transition-all duration-300"
                                            style={{
                                                width: `${isNaN(progress) ? 0 : progress}%`,
                                                backgroundColor: visibilitySettings.playerPanelColorHash || 'black'
                                            }}
                                        />
                                        <div
                                            className="absolute top-1/2 -translate-y-1/2"
                                            style={{ left: `calc(${isNaN(progress) ? 0 : progress}% - 8px)` }}
                                        >
                                            <div
                                                className="w-3 h-3 text-primary rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"
                                                style={{ touchAction: "none", backgroundColor: visibilitySettings.playerPanelColorHash || 'black' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="relative" ref={mobileMenuRef}>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-transparent hover:opacity-70 transition-colors [&_svg]:size-5"
                                    style={{ color: visibilitySettings.playerPanelColorHash || 'black' }}
                                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                                >
                                    <MoreHorizontal className="h-5 w-5" />
                                </Button>

                                <AnimatePresence>
                                    {showMobileMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9, y: 15 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: 15 }}
                                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                            className="absolute bottom-full right-0 mb-2 w-[160px] bg-[#333333]/80 backdrop-blur-sm rounded-lg shadow-xl py-1 flex flex-col z-[9999]"
                                        >
                                            <button
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:opacity-70 w-full text-left transition-colors"
                                                onClick={() => { handleZoomChange(zoomLevel > 1 ? 1 : 1.5); setShowMobileMenu(false); }}
                                            >
                                                {zoomLevel > 1 ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />} {zoomLevel > 1 ? "Zoom Out" : "Zoom In"}
                                            </button>
                                            {visibilitySettings.showSearch && (
                                                <button
                                                    className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:opacity-70 w-full text-left transition-colors"
                                                    onClick={() => { setShowMobileMenu(false); }}
                                                >
                                                    <Search className="h-4 w-4" /> Search
                                                </button>
                                            )}
                                            {visibilitySettings.showPageOverview && (
                                                <button
                                                    className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:opacity-70 w-full text-left transition-colors"
                                                    onClick={() => {
                                                        setIsPageOverviewOpen((prev) => !prev);
                                                        setShowMobileMenu(false);
                                                    }}
                                                >
                                                    <LayoutGrid className="h-4 w-4" /> Thumbnails
                                                </button>
                                            )}
                                            {visibilitySettings.showTableOfContent && (
                                                <button
                                                    className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:opacity-70 w-full text-left transition-colors"
                                                    onClick={() => { setIsDrawerOpen(true); setShowMobileMenu(false); }}
                                                >
                                                    <List className="h-4 w-4" /> Toc
                                                </button>
                                            )}
                                            {visibilitySettings.showLeadForm && (
                                                <button
                                                    className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:opacity-70 w-full text-left transition-colors"
                                                    onClick={() => { setIsLeadFormOpen(true); setShowMobileMenu(false); }}
                                                >
                                                    <ReceiptText className="h-4 w-4" /> Lead Form
                                                </button>
                                            )}
                                            <BackgroundAudioPlayer
                                                visibilitySettings={visibilitySettings}
                                                isMobile={true}
                                                isPlaying={isPlaying}
                                                toggleAudio={toggleAudio}
                                                onMobileClose={() => setShowMobileMenu(false)}
                                            />
                                            {visibilitySettings.showShare && (
                                                <button
                                                    className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:opacity-70 w-full text-left transition-colors"
                                                    onClick={() => { setIsShareModalOpen(true); setShowMobileMenu(false); }}
                                                >
                                                    <Share2 className="h-4 w-4" /> Social Share
                                                </button>
                                            )}
                                            {visibilitySettings.showFullscreen && (
                                                <button
                                                    className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:opacity-70 w-full text-left transition-colors"
                                                    onClick={() => { toggleFullscreen(); setShowMobileMenu(false); }}
                                                >
                                                    {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />} Fullscreen
                                                </button>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                )
            );
        }

        return (
            visibilitySettings.showControlBar && (
                <div className={`w-full bg-transparent p-4 flex flex-wrap items-center justify-between absolute bottom-0 ${isMobileView ? "rounded-b-lg" : ""}`}>
                    <div className="flex items-center justify-between w-full gap-4">

                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-transparent hover:opacity-70 transition-colors [&_svg]:size-5"
                                style={{ color: visibilitySettings.playerPanelColorHash || 'black' }}
                                onClick={() => handleZoomChange(zoomLevel > 1 ? 1 : 1.5)}
                                title={zoomLevel > 1 ? "Zoom Out" : "Zoom In"}
                            >
                                {zoomLevel > 1 ? <Minus /> : <Plus />}
                            </Button>

                            {visibilitySettings.showPageOverview && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-transparent hover:opacity-70 transition-colors [&_svg]:size-5"
                                    style={{ color: visibilitySettings.playerPanelColorHash || 'black' }}
                                    onClick={() => {
                                        setIsPageOverviewOpen((prev) => !prev);
                                    }}
                                    title="Thumbnails"
                                >
                                    <LayoutGrid />
                                </Button>
                            )}
                        </div>

                        <div className="flex items-center flex-1 gap-4">
                            <span className="text-sm font-medium whitespace-nowrap" style={{ color: visibilitySettings.playerPanelColorHash || 'black' }}>
                                {pageDisplay}/{displayTotalPages}
                            </span>

                            {visibilitySettings.showNavigationBar && (
                                <div className="flex-1 flex items-center">
                                    <div
                                        ref={progressBarRef}
                                        className="flex-1 h-[2px] rounded-full relative cursor-pointer select-none hover:bg-black/30 transition-colors"
                                        onMouseDown={handleMouseDown}
                                        onTouchStart={handleTouchStart}
                                        style={{
                                            backgroundColor: visibilitySettings.playerAccentColorHash || 'black'
                                        }}
                                    >
                                        <div
                                            className="h-[2px] rounded-full absolute left-0 top-0 transition-all duration-300"
                                            style={{
                                                width: `${isNaN(progress) ? 0 : progress}%`,
                                                backgroundColor: visibilitySettings.playerPanelColorHash || 'black'
                                            }}
                                        />
                                        <div
                                            className="absolute top-1/2 -translate-y-1/2"
                                            style={{ left: `calc(${isNaN(progress) ? 0 : progress}% - 8px)` }}
                                        >
                                            <div
                                                className="w-3 h-3 text-primary rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"
                                                style={{ touchAction: "none", backgroundColor: visibilitySettings.playerPanelColorHash || 'black' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <BackgroundAudioPlayer visibilitySettings={visibilitySettings} isPlaying={isPlaying} toggleAudio={toggleAudio} iconColor={visibilitySettings.playerPanelColorHash} />
                            {visibilitySettings.showShare && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-transparent hover:opacity-70 transition-colors [&_svg]:size-5"
                                    style={{ color: visibilitySettings.playerPanelColorHash || 'black' }}
                                    disabled={!shopSettings?.isAllowToShare}
                                    onClick={() => setIsShareModalOpen(true)}
                                    title="Share"
                                >
                                    <Share2 />
                                </Button>
                            )}

                            {visibilitySettings.showTableOfContent && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`hover:bg-transparent hover:opacity-70 transition-colors [&_svg]:size-5 ${isDrawerOpen ? "bg-black/10" : ""}`}
                                    style={{ color: visibilitySettings.playerPanelColorHash || 'black' }}
                                    onClick={() => setIsDrawerOpen((prev) => !prev)}
                                    title="Table of Contents"
                                >
                                    <List />
                                </Button>
                            )}

                            {visibilitySettings.showLeadForm && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-transparent hover:opacity-70 transition-colors [&_svg]:size-5"
                                    style={{ color: visibilitySettings.playerPanelColorHash || 'black' }}
                                    onClick={() => setIsLeadFormOpen(true)}
                                    title="Lead Form"
                                >
                                    <ReceiptText />
                                </Button>
                            )}

                            {visibilitySettings.showFullscreen && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-transparent hover:opacity-70 transition-colors [&_svg]:size-5"
                                    style={{ color: visibilitySettings.playerPanelColorHash || 'black' }}
                                    onClick={toggleFullscreen}
                                    title="Fullscreen"
                                >
                                    {isFullscreen ? <Minimize /> : <Maximize />}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )
        );
    };

    return (
        <>
            <div className="w-full h-full flex items-center bg-white overflow-hidden" ref={containerRef} >
                {visibilitySettings.showTableOfContent && <TableOfContentsDrawer
                    visibilitySettings={visibilitySettings}
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    navigateToPage={setPage}
                />}
                <div className={`h-full flex flex-col items-center relative bg-white overflow-hidden transition-all duration-150 ease-in-out ${isDrawerOpen && visibilitySettings.showTableOfContent ? "w-[calc(100%-24rem)]" : "w-full"}`}
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
                    }}
                >
                    <Tabs
                        value={activeTab.toLowerCase()}
                        onValueChange={handleTabChange}
                        className="w-full h-full flex flex-col items-center h-[calc(100%-76px)]"
                    >
                        {component !== "customize" && !isPublicView && (
                            <div className="w-full h-[10%] mt-5 flex items-center justify-center">
                                <TabsList className="grid grid-cols-2 bg-gray-100 rounded-lg">
                                    <TabsTrigger
                                        value="desktop"
                                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                    >
                                        <Monitor className="w-4 h-4 mr-2" />
                                        Desktop
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="mobile"
                                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                    >
                                        <Smartphone className="w-4 h-4 mr-2" />
                                        Mobile
                                    </TabsTrigger>
                                </TabsList>
                            </div>
                        )}

                        <div className="w-full h-full flex-grow flex items-center justify-center">
                            <TabsContent
                                value="desktop"
                                className="w-full h-full flex items-center justify-center data-[state=inactive]:hidden m-0"
                            >
                                <div
                                    className={`w-full h-full flex items-center justify-center flex-col relative`}
                                    
                                >
                                    <FlipBook
                                        isDrawerOpen={isDrawerOpen}
                                        isFullscreen={isFullscreen}
                                        ref={flipBookRef}
                                        flipbookId={flipbookId}
                                        onPageChange={handlePageChange}
                                        pageType={pageType}
                                        setPageType={setPageType}
                                        zoomLevel={zoomLevel}
                                        setZoomLevel={setZoomLevel}
                                        transformRef={transformRef}
                                        isMobile={activeTab.toLowerCase() === "mobile"}
                                        component={component}
                                        previewId={id}
                                        containerRefHeight={containerRef?.current?.clientHeight}
                                        isPageOverviewOpen={isPageOverviewOpen}
                                        setIsPageOverviewOpen={setIsPageOverviewOpen}
                                        isPublicView={isPublicView}
                                        publicFlipbookData={publicFlipbookData}
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent
                                value="mobile"
                                className="w-full h-full flex items-center justify-center data-[state=inactive]:hidden m-0"
                            >
                                <div
                                    className={`w-full h-full flex flex-col items-center justify-center overflow-hidden relative ${activeTab == 'Mobile' && !isPublicView ? "max-w-[400px]" : ""}`}
                                    style={{ backgroundColor: visibilitySettings.backgroundColorHash }}
                                  
                                >
                                    <div className="w-full h-full flex items-center justify-center flex-col"
                                    //   id={id}
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
                                        }}
                                    >
                                        <FlipBook
                                            isDrawerOpen={isDrawerOpen}
                                            isFullscreen={isFullscreen}
                                            ref={flipBookRef}
                                            flipbookId={flipbookId}
                                            onPageChange={handlePageChange}
                                            pageType={pageType}
                                            setPageType={setPageType}
                                            zoomLevel={zoomLevel}
                                            setZoomLevel={setZoomLevel}
                                            isMobile={activeTab.toLowerCase() === "mobile"}
                                            component={component}
                                            transformRef={transformRef}
                                            previewId={id}
                                            isPageOverviewOpen={isPageOverviewOpen}
                                            setIsPageOverviewOpen={setIsPageOverviewOpen}
                                            isPublicView={isPublicView}
                                            publicFlipbookData={publicFlipbookData}
                                        />
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                    {renderProgressBar(activeTab.toLowerCase() === "mobile" && !isFullscreen)}

                    {visibilitySettings.showLeadForm && (
                        <LeadFormModel
                            open={isLeadFormOpen}
                            onOpenChange={setIsLeadFormOpen}
                            leadFormData={visibilitySettings.leadForm}
                        />
                    )}
                    <ShareFlipbookDialog isShareModalOpen={isShareModalOpen} setIsShareModalOpen={setIsShareModalOpen} flipbookId={flipbookId} />
                </div>

            </div>
        </>
    );
}