import React, { useState, useRef, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Monitor, Smartphone, ZoomIn, ZoomOut, Grid, Share2, Menu, Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import FlipBook from "./FlipBook.jsx";

export default function FlipBookPreview({ flipbookId }) {
    const [activeTab, setActiveTab] = useState("desktop");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const progressBarRef = useRef(null);
    const flipBookRef = useRef(null);
    const containerRef = useRef(null);

    const progress = totalPages > 1 ? ((currentPage - 1) / (totalPages - 1)) * 100 : 0;

    const handlePageChange = (page, total) => {
        setCurrentPage(page);
        setTotalPages(total);
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
        const percent = x / rect.width;
        const page = Math.round(percent * (totalPages - 1)) + 1;
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

    const ProgressBar = ({ isMobile = false }) => (
        <div className={`w-full bg-gradient-to-r from-gray-900 to-gray-700 p-4 flex items-center justify-between shadow-lg ${isMobile ? "rounded-b-lg" : ""}`}>
            <div className="flex items-center text-gray-200 text-sm flex-1">
                <span className="mr-4 font-medium bg-gray-800/50 px-3 py-1 rounded-full">
                    {currentPage}-{currentPage + 1}/{totalPages}
                </span>
                <div
                    ref={progressBarRef}
                    className="flex-1 h-2 bg-gray-600/50 rounded-full relative cursor-pointer select-none hover:bg-gray-600/70 transition-colors"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                >
                    <div
                        className="h-2 bg-primary rounded-full absolute left-0 top-0 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                    <div
                        className="absolute top-1/2 -translate-y-1/2"
                        style={{ left: `calc(${progress}% - 8px)` }}
                    >
                        <div
                            className="w-4 h-4 bg-primary text-primary-foreground rounded-full shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform"
                            style={{ touchAction: "none" }}
                        />
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-200 hover:bg-primary hover:text-primary-foreground rounded-full transition-colors"
                    onClick={handleZoomOut}
                >
                    <ZoomOut className="w-5 h-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-200 hover:bg-primary hover:text-primary-foreground rounded-full transition-colors"
                    onClick={handleZoomIn}
                >
                    <ZoomIn className="w-5 h-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-200 hover:bg-primary hover:text-primary-foreground rounded-full transition-colors"
                    onClick={toggleFullscreen}
                >
                    {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-200 hover:bg-primary hover:text-primary-foreground rounded-full transition-colors"
                >
                    <Grid className="w-5 h-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-200 hover:bg-primary hover:text-primary-foreground rounded-full transition-colors"
                >
                    <Share2 className="w-5 h-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-200 hover:bg-primary hover:text-primary-foreground rounded-full transition-colors"
                >
                    <Menu className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center relative rounded bg-white">
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full h-full flex flex-col items-center justify-center"
            >
                <div className="w-full h-[10%] mt-5 flex items-center justify-center">
                    <TabsList className="grid w-[200px] grid-cols-2 bg-gray-100 rounded-lg">
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
                <div className="w-full h-full flex-grow flex items-center justify-center pb-16">
                    <TabsContent
                        value="desktop"
                        className="w-full h-full flex items-center justify-center data-[state=inactive]:hidden"
                    >
                        <div
                            className="w-full h-full flex items-center justify-center"
                            id="preview-dialog"
                        >
                            <FlipBook
                                ref={flipBookRef}
                                flipbookId={flipbookId}
                                onPageChange={handlePageChange}
                                zoomLevel={zoomLevel}
                                isMobile={activeTab === "mobile"}
                            />
                        </div>
                    </TabsContent>
                    <TabsContent
                        value="mobile"
                        className="w-full h-full flex items-center justify-center data-[state=inactive]:hidden"
                    >
                        <div
                            className="w-[90%] max-w-[400px] flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg shadow-md overflow-hidden"
                            id="preview-dialog"
                        >
                            <div className="w-full h-[70vh] flex items-center justify-center">
                                <FlipBook
                                    ref={flipBookRef}
                                    flipbookId={flipbookId}
                                    onPageChange={handlePageChange}
                                    zoomLevel={zoomLevel}
                                    isMobile={activeTab === "mobile"}
                                />
                            </div>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
            <ProgressBar isMobile={activeTab !== "desktop"} />
        </div>
    );
}