import React, { useState, useRef, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Monitor, Smartphone, ZoomIn, ZoomOut, Share2, Maximize, Minimize, LayoutGrid, List, Search, ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";
import FlipBook from "./FlipBook.jsx";
import { useFlipbookSettings as useFlipbookSettingsContext } from "@/context/FlipbookSettingsProvider.jsx";
import { useFlipbookSettings } from "@/hooks/useFlipbookSettings";
import { useViewMode } from "@/context/ViewModeContext";
import { BackgroundColorType, BackgroundImageType } from "@/utils/enum.js";
import BackgroundAudioPlayer from "./BackgroundAudioPlayer";
import TableOfContentsDrawer from "./TableOfContentsDrawer.jsx";
import LeadFormModel from "./LeadFormModel";
import cartService from '@/service/IndexedDBCart.service';
import { getProductCartInfoApi } from '@/service/product.service.js';
import { toast } from "sonner";

export default function FlipBookPreview({ flipbookId, component, id = "preview-dialog", isPublicView = false, publicFlipbookData }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
    const [isPageOverviewOpen, setIsPageOverviewOpen] = useState(false);
    const { latestJson } = useFlipbookSettingsContext();
    const visibilitySettings = useFlipbookSettings(latestJson);
    const { activeTab, setActiveTab } = useViewMode();
    const [pageType, setPageType] = useState("double");
    const progressBarRef = useRef(null);
    const flipBookRef = useRef(null);
    const containerRef = useRef(null);

    console.log("isPublicView ??", isPublicView);

    useEffect(() => {
        const syncCartPrices = async () => {
            if (!flipbookId) return;
            try {
                const cartItems = await cartService.getCart(flipbookId);
                console.log("cartItems ????", cartItems);
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
                    console.log("getProductCartInfoApi ????", response.data);
                    updatedProducts = response.data;
                } catch (err) {
                    toast.error('Failed to sync cart prices', { description: err.message });
                    return;
                }
                console.log("updatedProducts ????", updatedProducts);
                console.log("cartItems ????", cartItems);

                const updatedCartItems = cartItems.map(item => {
                    const updated = updatedProducts.find(
                        p =>
                            p.productId === item.productId &&
                            (String(p.productVariantId || '') === String(item.productVariantId || ''))
                    );
                    console.log(`Matching for item ${item.cartId}:`, {
                        itemProductId: item.productId,
                        itemVariantId: item.productVariantId,
                        foundMatch: !!updated,
                        updatedProduct: updated
                    });

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

                console.log("Final updatedCartItems:", updatedCartItems);
                await cartService.saveCart(flipbookId, updatedCartItems);
                console.log("Cart successfully updated in IndexedDB");
            } catch (error) {
                toast.error('Failed to sync cart prices', { description: error.message });
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
            ? 1 - x / rect.width // Reverse progress for RTL
            : x / rect.width;

        let page = Math.round(percent * (totalPages - 1)) + 1;
        page = Math.max(1, Math.min(page, totalPages)); // Clamp page within valid range
        if (pageType === "double" && page > 1) {
            page = page % 2 === 0 ? page : page - 1;
        }
        if (pageType === "double" && totalPages % 2 !== 0 && page + 1 === totalPages) {
            page = totalPages;

        }

        // Update current page and flipbook
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


    const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 2));
    const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));

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

    const ProgressBar = ({ isMobile = false }) => {
        let displayCurrentPage = isNaN(currentPage) ? 1 : currentPage % 2 === 0 ? currentPage : currentPage - 1;
        let displayTotalPages = isNaN(totalPages) ? 1 : totalPages;
        displayCurrentPage == 0 && displayCurrentPage++;
        if (pageType === "single") {
            displayCurrentPage = isNaN(currentPage) ? 1 : currentPage;
            displayTotalPages = isNaN(totalPages) ? 1 : totalPages;
        }
        // Show only current page for first and last page
        // if page single then show only current page
        let pageDisplay = pageType === "single"
            ? displayCurrentPage
            : displayCurrentPage % 2 !== 0
                ? `${displayCurrentPage}`
                : displayCurrentPage === displayTotalPages
                    ? `${displayCurrentPage}`
                    : `${displayCurrentPage} - ${displayCurrentPage + 1}`;

        if (isMobile) {
            return (
                visibilitySettings.showControlBar && (
                    <div className="w-full flex flex-col items-center justify-center">
                        <div className="w-[90%] max-w-[400px] bg-gradient-to-r from-primary/90 to-primary p-3 flex flex-col items-center justify-center shadow-lg space-y-3">
                            {visibilitySettings.showNavigationBar && (
                                <div className="flex items-center text-primary-foreground text-sm w-full">
                                    <div
                                        ref={progressBarRef}
                                        className="flex-1 h-2 bg-primary-foreground/20 rounded-full relative cursor-pointer select-none hover:bg-primary-foreground/30 transition-colors"
                                        onMouseDown={handleMouseDown}
                                        onTouchStart={handleTouchStart}
                                    >
                                        <div
                                            className="h-2 bg-primary-foreground rounded-full absolute left-0 top-0 transition-all duration-300"
                                            style={{
                                                width: `${isNaN(progress) ? 0 : progress}%`,
                                                backgroundColor: visibilitySettings.playerAccentColorHash || "#f9fafb",
                                            }}
                                        />
                                        <div
                                            className="absolute top-1/2 -translate-y-1/2"
                                            style={{ left: `calc(${isNaN(progress) ? 0 : progress}% - 8px)` }}
                                        >
                                            <div
                                                className="w-4 h-4 bg-primary-foreground text-primary rounded-full shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform"
                                                style={{ touchAction: "none" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-center space-x-4">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full transition-colors w-8 h-8"
                                    onClick={handleZoomOut}
                                >
                                    <ZoomOut className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full transition-colors w-8 h-8"
                                    onClick={handleZoomIn}
                                >
                                    <ZoomIn className="w-4 h-4" />
                                </Button>
                                {visibilitySettings.showPageOverview && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full transition-colors w-8 h-8"
                                        onClick={() => setIsPageOverviewOpen(true)}
                                    >
                                        <LayoutGrid className="w-4 h-4" />
                                    </Button>
                                )}
                                {visibilitySettings.showSearch && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full transition-colors"
                                    >
                                        <Search className="w-5 h-5" />
                                    </Button>
                                )}
                                {visibilitySettings.showShare && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full transition-colors w-8 h-8"
                                    >
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                )}
                                {visibilitySettings.showTableOfContent && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={`text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full transition-colors ${isDrawerOpen ? "bg-primary-foreground/10" : ""
                                            }`}
                                        onClick={() => setIsDrawerOpen((prev) => !prev)}
                                    >
                                        <List className="w-5 h-5" />
                                    </Button>
                                )}
                                {visibilitySettings.showLeadForm && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full transition-colors"
                                        onClick={() => setIsLeadFormOpen(true)}
                                    >
                                        <ReceiptText className="w-5 h-5" />
                                    </Button>
                                )}
                                {visibilitySettings.showFullscreen && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full transition-colors w-8 h-8"
                                        onClick={toggleFullscreen}
                                    >
                                        {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                )
            );
        }

        return (
            visibilitySettings.showControlBar && (
                <div
                    className={`w-full bg-gradient-to-r from-primary/90 to-primary p-4 flex items-center justify-between relative shadow-lg ${isMobile ? "rounded-b-lg" : ""
                        }`}
                >
                    <div className="flex items-center text-primary-foreground text-sm flex-1">
                        <span className="mr-6 font-medium bg-primary-foreground/10 px-4 py-1.5 rounded-full">
                            {pageDisplay} / {displayTotalPages}
                        </span>
                        <BackgroundAudioPlayer visibilitySettings={visibilitySettings} />
                        {visibilitySettings.showNavigationBar && (
                            <div
                                ref={progressBarRef}
                                className={`flex-1 h-2.5 absolute left-3 right-3 top-[-5px] bg-[#ae83f4] rounded-full cursor-pointer select-none hover:bg-[#cfb1ff] transition-colors duration-300 ease-in-out ${visibilitySettings.rightToLeftOrientation ? "rotate-180" : ""
                                    }`}
                                onMouseDown={handleMouseDown}
                                onTouchStart={handleTouchStart}
                            >
                                <div
                                    className="h-2.5 bg-primary-foreground rounded-full absolute left-0 top-0 transition-all duration-300"
                                    style={{
                                        width: `${isNaN(progress) ? 0 : progress}%`,
                                        backgroundColor: visibilitySettings.playerAccentColorHash || "#f9fafb",
                                    }}
                                />
                                <div
                                    className="absolute top-1/2 -translate-y-1/2"
                                    style={{ left: `calc(${isNaN(progress) ? 0 : progress}% - 10px)` }}
                                >
                                    <div
                                        className="w-5 h-5 bg-primary-foreground text-primary rounded-full shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform"
                                        style={{ touchAction: "none" }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-3 md:ml-6">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full transition-colors"
                            onClick={handleZoomOut}
                        >
                            <ZoomOut className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full transition-colors"
                            onClick={handleZoomIn}
                        >
                            <ZoomIn className="w-5 h-5" />
                        </Button>
                        {visibilitySettings.showPageOverview && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full transition-colors"
                                onClick={() => setIsPageOverviewOpen(true)}
                            >
                                <LayoutGrid className="w-5 h-5" />
                            </Button>
                        )}
                        {visibilitySettings.showSearch && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full transition-colors"
                            >
                                <Search className="w-5 h-5" />
                            </Button>
                        )}
                        {visibilitySettings.showShare && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full transition-colors"
                            >
                                <Share2 className="w-5 h-5" />
                            </Button>
                        )}
                        {visibilitySettings.showTableOfContent && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full transition-colors ${isDrawerOpen ? "bg-primary-foreground/10" : ""
                                    }`}
                                onClick={() => setIsDrawerOpen((prev) => !prev)}
                            >
                                <List className="w-5 h-5" />
                            </Button>
                        )}
                        {visibilitySettings.showLeadForm && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full transition-colors"
                                onClick={() => setIsLeadFormOpen(true)}
                            >
                                <ReceiptText className="w-5 h-5" />
                            </Button>
                        )}
                        {visibilitySettings.showFullscreen && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full transition-colors"
                                onClick={toggleFullscreen}
                            >
                                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                            </Button>
                        )}
                    </div>
                </div>
            )
        );
    };

    return (
        <>
            <div className="w-full h-full flex items-center relative rounded bg-white overflow-hidden" ref={containerRef} >
                {visibilitySettings.showTableOfContent && <TableOfContentsDrawer
                    visibilitySettings={visibilitySettings}
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    navigateToPage={setPage}
                />}
                <div className={`h-full flex flex-col items-center relative rounded bg-white overflow-hidden transition-all duration-150 ease-in-out ${isDrawerOpen && visibilitySettings.showTableOfContent ? "w-[calc(100%-24rem)]" : "w-full"}`}>
                    <Tabs
                        value={activeTab.toLowerCase()}
                        onValueChange={handleTabChange}
                        className="w-full h-full flex flex-col items-center"
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
                                className="w-full h-full flex items-center justify-center data-[state=inactive]:hidden"
                            >
                                <div
                                    className={`w-full h-full flex items-center justify-center flex-col`}
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
                                    id={id}
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
                                        isMobile={activeTab.toLowerCase() === "mobile"}
                                        component={component}
                                        previewId={id}
                                        isPageOverviewOpen={isPageOverviewOpen}
                                        setIsPageOverviewOpen={setIsPageOverviewOpen}
                                        isPublicView={isPublicView}
                                        publicFlipbookData={publicFlipbookData}
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent
                                value="mobile"
                                className="w-full h-full flex items-center justify-center data-[state=inactive]:hidden"
                            >
                                <div
                                    className={`w-[90%] max-w-[400px] h-full flex flex-col items-center justify-center overflow-hidden`}
                                    style={{ backgroundColor: visibilitySettings.backgroundColorHash }}
                                    id={id}
                                >
                                    <div className="w-full h-full flex items-center justify-center flex-col"
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
                                            isMobile={activeTab.toLowerCase() === "mobile"}
                                            component={component}
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
                    <ProgressBar isMobile={activeTab.toLowerCase() === "mobile" && !isFullscreen} />

                    {visibilitySettings.showLeadForm && (
                        <LeadFormModel
                            open={isLeadFormOpen}
                            onOpenChange={setIsLeadFormOpen}
                            leadFormData={visibilitySettings.leadForm}
                        />
                    )}
                </div>
            </div>

        </>

    );
}