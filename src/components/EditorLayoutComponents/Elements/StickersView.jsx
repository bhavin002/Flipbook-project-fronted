import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuid } from "uuid";

const API_KEY = `${import.meta.env.VITE_APP_TENOR_API}`;

const StickersView = ({ setIsEditorDrawerOpen, setMainStage, mainStage, selectedIndex, onBackClick }) => {
    const [trendingStickers, setTrendingStickers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [nextPageToken, setNextPageToken] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const initialLoadRef = useRef(false);
    const observer = useRef();

    const fetchStickers = async (query = '', currentStickers = []) => {
        if (isLoading || !hasMore) return;

        try {
            setIsLoading(true);
            const url = new URL('https://tenor.googleapis.com/v2/search');
            url.searchParams.append('key', API_KEY);
            url.searchParams.append('limit', '9');
            url.searchParams.append('searchfilter', 'sticker');

            if (query) {
                url.searchParams.append('q', query);
            } else {
                url.searchParams.append('q', 'stickers trending');
            }

            if (nextPageToken) {
                url.searchParams.append('pos', nextPageToken);
            }

            const response = await fetch(url.toString());
            const data = await response.json();

            if (!data.results || data.results.length === 0) {
                setHasMore(false);
                return;
            }

            const newStickers = data.results.filter(
                sticker => !currentStickers.some(existing => existing.id === sticker.id) &&
                    sticker.flags.every(e => e == "sticker")
            );

            if (query) {
                setSearchResults(prev => [...prev, ...newStickers]);
            } else {
                setTrendingStickers(prev => [...prev, ...newStickers]);
            }

            setNextPageToken(data.next || null);
            setHasMore(!!data.next);
        } catch (error) {
            console.error("Error fetching stickers:", error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!initialLoadRef.current) {
            fetchStickers();
            initialLoadRef.current = true;
        }
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim() === "") {
            setSearchResults([]);
            setNextPageToken(null);
            setHasMore(true);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && searchQuery.trim() !== "") {
            setSearchResults([]);
            setNextPageToken(null);
            setHasMore(true);
            fetchStickers(searchQuery);
        }
    };

    const lastStickerRef = useCallback(node => {
        if (isLoading || !hasMore || !node) return;

        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                if (searchQuery.trim() !== "") {
                    fetchStickers(searchQuery, searchResults);
                } else {
                    fetchStickers('', trendingStickers);
                }
            }
        });
        observer.current.observe(node);
    }, [hasMore, isLoading, searchQuery, searchResults, trendingStickers]);

    return (
        <div className="px-6 pt-6 pb-2 space-y-4 flex flex-col h-[100vh]">
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    className="text-primary"
                    onClick={onBackClick}
                >
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                Stickers
            </div>

            <div className="flex flex-col h-0 flex-grow overflow-hidden">
                <div className="relative">
                    <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                        <Search className="h-4 w-4" />
                    </div>
                    <Input
                        type="search"
                        placeholder="Search stickers"
                        className="w-full rounded-lg bg-background text-black pl-8"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyPress={handleKeyPress}
                    />
                </div>

                <div className="overflow-y-auto flex-grow">
                    {searchQuery.trim() !== "" ? (
                        <Section
                            title={`Results for "${searchQuery}"`}
                            stickers={searchResults}
                            lastStickerRef={lastStickerRef}
                            mainStage={mainStage}
                            selectedIndex={selectedIndex}
                            setMainStage={setMainStage}
                            setIsEditorDrawerOpen={setIsEditorDrawerOpen}
                        />
                    ) : (
                        <Section
                            title="Trending Stickers"
                            stickers={trendingStickers}
                            lastStickerRef={lastStickerRef}
                            mainStage={mainStage}
                            selectedIndex={selectedIndex}
                            setMainStage={setMainStage}
                            setIsEditorDrawerOpen={setIsEditorDrawerOpen}
                        />
                    )}

                    {isLoading && (
                        <p className="text-white text-center mt-4">
                            Loading more stickers...
                        </p>
                    )}

                    {!hasMore && (
                        <p className="text-white text-center mt-4">
                            No more stickers available.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

const Section = ({
    setIsEditorDrawerOpen,
    setMainStage,
    title,
    stickers,
    lastStickerRef,
    mainStage,
    selectedIndex
}) => {

    // Unified logic for sticker drag + click
    const handleStickerSelect = async (sticker, isDragStart = false) => {
        const stickerUrl =
            sticker.media_formats?.tinygif_transparent?.url ||
            sticker.media_formats?.gif?.url;

        const dimensions = await new Promise((resolve, reject) => {
            const img = new Image();
            img.src = stickerUrl;
            img.onload = () => resolve({ width: img.width, height: img.height });
            img.onerror = () => reject("Error loading sticker");
        });

        const stickerData = {
            width: dimensions.width,
            height: dimensions.height,
            type: "sticker",
            src: stickerUrl,
            visible: true,
            title: "stock-sticker",
            layer: "Stock Sticker",
            htmlType: "stock-sticker",
            sidebar: "image-action",
        };

        // Drag start: just assign to dragRect
        if (isDragStart) {
            mainStage[selectedIndex].dragRect.current = stickerData;
            return;
        }

        const item = { attrs: stickerData };

        if (item.attrs) {
            // Get the group from the stage
            let group = mainStage[selectedIndex].stageref.current.children[0].children[1];

            // Calculate the center of the group
            const groupWidth = group.width();
            const groupHeight = group.height();
            const dropX = (groupWidth / 2) / group.scaleX() - (item.attrs.width || 50) / 2;
            const dropY = (groupHeight / 2) / group.scaleY() - (item.attrs.height || 50) / 2;

            let isOverShapeWidget = false;
            let isOverMaskedImage = false;
            let shapeWidget = null;
            let shapeWidgetData = [];

            // Detect selected shape
            mainStage[selectedIndex].stageref.current.children[0].children[1].children.forEach(shape => {
                if (mainStage[selectedIndex].selectedShapes.length === 1) {
                    if (shape.attrs.id === mainStage[selectedIndex].selectedShapes[0].attrs.id) {
                        if (shape.attrs.title === "shape-widget") {
                            isOverShapeWidget = true;
                            shapeWidget = shape.attrs;
                            shapeWidgetData = shape.children
                                .map(child => (child.dataArray ? child.dataArray : null))
                                .filter(data => data !== null);
                        } else if (shape.attrs.isMasked && (shape.attrs.title === 'masked-image' || shape.attrs.title === 'masked-gif' || shape.attrs.title === 'masked-sticker')) {
                            isOverMaskedImage = true;
                            shapeWidget = shape.attrs;
                        }
                    }
                }
            });

            // Base new shape
            let newShape = {
                x: dropX,
                y: dropY,
                ...item.attrs,
                id: uuid(),
            };

            // Handle masked-sticker replacement
            if (isOverMaskedImage) {
                mainStage[selectedIndex].selectedShapes = [];

                const htmlType = stickerData.htmlType;
                const typeMapping = {
                    "upload-photo": "masked-image",
                    "stock-gif": "masked-gif",
                    "stock-photo": "masked-image",
                    "stock-sticker": "masked-sticker",
                };

                const layerMapping = {
                    "upload-photo": "Masked Image",
                    "stock-gif": "Masked Gif",
                    "stock-photo": "Masked Image",
                    "stock-sticker": "Masked Sticker",
                };

                const shapeType = typeMapping[htmlType] || "masked-sticker";
                const layerType = layerMapping[htmlType] || "Masked Sticker";

                setMainStage(prevState => {
                    const updatedState = [...prevState];
                    const updatedShapes = updatedState[selectedIndex].shapes.map((shape, idx) => {
                        if (shape.id !== shapeWidget.id) return shape;
                        const shapeNode = updatedState[selectedIndex].stageref.current.children[0].children[1].children[idx].attrs;
                        return {
                            ...shape,
                            title: shapeType,
                            layer: layerType,
                            htmlType: shapeType,
                            x: shapeNode.x,
                            y: shapeNode.y,
                            scaleX: shapeNode.scaleX,
                            scaleY: shapeNode.scaleY,
                            width: shapeNode.width,
                            height: shapeNode.height,
                            src: stickerData.src,
                            type: "sticker",
                        };
                    });
                    updatedState[selectedIndex] = {
                        ...updatedState[selectedIndex],
                        shapes: updatedShapes,
                    };
                    return updatedState;
                });
                return;
            }

            // Handle shape-widget with mask
            if (isOverShapeWidget && shapeWidget?.isMasked) {
                newShape = {
                    src: stickerData.src,
                    height: Number(shapeWidget.height),
                    width: Number(shapeWidget.width),
                    x: shapeWidget.x,
                    y: shapeWidget.y,
                    scaleX: shapeWidget.scaleX,
                    scaleY: shapeWidget.scaleY,
                    skewX: shapeWidget.skewX,
                    skewY: shapeWidget.skewY,
                    title: "masked-sticker",
                    layer: "Masked Sticker",
                    htmlType: "masked-sticker",
                    type: "sticker",
                    isMasked: true,
                    data: shapeWidget.data,
                    maskData: shapeWidgetData,
                    maskType: shapeWidget.maskType,
                    draggable: true,
                    visible: true,
                    id: uuid(),
                };
                mainStage[selectedIndex].selectedShapes = [];
                setMainStage(prevState => {
                    const updatedState = [...prevState];
                    const updatedShapes = updatedState[selectedIndex].shapes.filter(shape => shape.id !== shapeWidget.id);
                    updatedState[selectedIndex] = {
                        ...updatedState[selectedIndex],
                        shapes: [...updatedShapes, newShape],
                    };
                    return updatedState;
                });
            } else {
                // Default: add sticker normally
                setMainStage(prevState => {
                    const updatedState = [...prevState];
                    updatedState[selectedIndex] = {
                        ...updatedState[selectedIndex],
                        shapes: [...updatedState[selectedIndex].shapes, newShape],
                    };
                    return updatedState;
                });
            }

            // Auto-select new sticker
            if (newShape) {
                setTimeout(() => {
                    mainStage[selectedIndex].stageref.current.children[0].children[1].children.forEach((child) => {
                        if (child.attrs.id === newShape.id) {
                            setMainStage(prevState => {
                                const updatedState = [...prevState];
                                updatedState[selectedIndex] = {
                                    ...updatedState[selectedIndex],
                                    selectedShapes: [child],
                                };
                                return updatedState;
                            });
                        }
                    });
                }, 100);
            }

            setIsEditorDrawerOpen(false);
        }
    };

    return (
        <div className="mt-6">
            <h3 className="text-white font-bold">{title}</h3>
            <div className="grid grid-cols-3 gap-2 mt-2">
                {stickers.map((sticker, index) => {
                    const stickerUrl =
                        sticker.media_formats?.tinygif_transparent?.url ||
                        sticker.media_formats?.gif?.url;

                    if (index === stickers.length - 1) {
                        return (
                            <img
                                ref={lastStickerRef}
                                key={sticker.id}
                                src={stickerUrl}
                                alt={sticker.content_description}
                                className="rounded-lg w-full h-24 object-cover cursor-pointer"
                                draggable
                                onDragStart={() => handleStickerSelect(sticker, true)}
                                onClick={() => handleStickerSelect(sticker, false)}
                            />
                        );
                    }
                    return (
                        <img
                            key={sticker.id}
                            src={stickerUrl}
                            alt={sticker.content_description}
                            className="rounded-lg w-full h-24 object-cover cursor-pointer"
                            draggable
                            onDragStart={() => handleStickerSelect(sticker, true)}
                            onClick={() => handleStickerSelect(sticker, false)}
                        />
                    );
                })}
            </div>
        </div>
    );
};


export default StickersView;