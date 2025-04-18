import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuid } from "uuid";

const API_KEY = `${import.meta.env.VITE_APP_TENOR_API}`;

const GIFsView = ({ setIsEditorDrawerOpen, setMainStage, mainStage, selectedIndex, onBackClick }) => {
    const [trendingGifs, setTrendingGifs] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [nextPageToken, setNextPageToken] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const initialLoadRef = useRef(false);
    const observer = useRef();

    const fetchGifs = async (query = '', currentGifs = []) => {
        if (isLoading || !hasMore) return;

        try {
            setIsLoading(true);
            const url = new URL('https://tenor.googleapis.com/v2/search');
            url.searchParams.append('key', API_KEY);
            url.searchParams.append('limit', '9');
            if (query) {
                url.searchParams.append('q', query);
            } else {
                url.searchParams.append('q', 'trending');
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

            const newGifs = data.results.filter(
                gif => !currentGifs.some(existing => existing.id === gif.id)
            );

            if (query) {
                setSearchResults(prev => [...prev, ...newGifs]);
            } else {
                setTrendingGifs(prev => [...prev, ...newGifs]);
            }

            setNextPageToken(data.next || null);
            setHasMore(!!data.next);
        } catch (error) {
            console.error("Error fetching GIFs:", error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!initialLoadRef.current) {
            fetchGifs();
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
            fetchGifs(searchQuery);
        }
    };

    const lastGifRef = useCallback(node => {
        if (isLoading || !hasMore || !node) return;

        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                if (searchQuery.trim() !== "") {
                    fetchGifs(searchQuery, searchResults);
                } else {
                    fetchGifs('', trendingGifs);
                }
            }
        });
        observer.current.observe(node);
    }, [hasMore, isLoading, searchQuery, searchResults, trendingGifs]);

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
                GIFs
            </div>

            <div className="flex flex-col h-0 flex-grow overflow-hidden">
                <div className="relative">
                    <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                        <Search className="h-4 w-4" />
                    </div>
                    <Input
                        type="search"
                        placeholder="Search GIFs"
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
                            gifs={searchResults}
                            lastGifRef={lastGifRef}
                            mainStage={mainStage}
                            selectedIndex={selectedIndex}
                            setMainStage={setMainStage}
                            setIsEditorDrawerOpen={setIsEditorDrawerOpen}
                        />
                    ) : (
                        <Section
                            title="Trending GIFs"
                            gifs={trendingGifs}
                            lastGifRef={lastGifRef}
                            mainStage={mainStage}
                            selectedIndex={selectedIndex}
                            setMainStage={setMainStage}
                            setIsEditorDrawerOpen={setIsEditorDrawerOpen}
                        />
                    )}

                    {isLoading && (
                        <p className="text-white text-center mt-4">
                            Loading more GIFs...
                        </p>
                    )}

                    {!hasMore && (
                        <p className="text-white text-center mt-4">
                            No more GIFs available.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

const Section = ({ setIsEditorDrawerOpen, setMainStage, title, gifs, lastGifRef, mainStage, selectedIndex }) => {
    // Function to handle GIF drag start
    const handleGifDragStart = async (gif) => {
        const dimensions = await new Promise((resolve, reject) => {
            const img = new Image();
            img.src = gif.media_formats.gif.url;
            img.onload = () => resolve({ width: img.width, height: img.height });
            img.onerror = () => reject("Error loading image");
        });
        mainStage[selectedIndex].dragRect.current = {
            width: dimensions.width,
            height: dimensions.height,
            type: "img",
            src: `${gif.media_formats.gif.url}`,
            visible: true,
            title: "stock-gif",
            layer: "Stock Gif",
            htmlType: "stock-gif",
        };
    };

    // Function to handle GIF click
    const handleGifClick = async (gif) => {
        const dimensions = await new Promise((resolve, reject) => {
            const img = new Image();
            img.src = gif.media_formats.gif.url;
            img.onload = () => resolve({ width: img.width, height: img.height });
            img.onerror = () => reject("Error loading image");
        });

        const shape = {
            attrs: {
                width: dimensions.width,
                height: dimensions.height,
                type: "img",
                src: `${gif.media_formats.gif.url}`,
                visible: true,
                title: "stock-gif",
                layer: "Stock Gif",
                htmlType: "stock-gif",
            }
        };

        if (shape?.attrs) {
            // Get the group from the stage
            let group = mainStage[selectedIndex].stageref.current.children[0].children[1];

            // Calculate the center of the group
            const groupWidth = group.width();
            const groupHeight = group.height();
            const dropX = (groupWidth / 2) / group.scaleX() - (shape?.attrs.width || 50) / 2;
            const dropY = (groupHeight / 2) / group.scaleY() - (shape?.attrs.height || 50) / 2;

            let isOverShapeWidget = false;
            let shapeWidget = null;
            let shapeWidgetData = [];

            // Check if the drop position overlaps with a shape-widget
            mainStage[selectedIndex].stageref.current.children[0].children[1].children.forEach(x => {
                if (x.attrs.title === 'shape-widget') {
                    const shapeLeft = x.attrs.x;
                    const shapeTop = x.attrs.y;
                    const shapeRight = x.attrs.x + (x.attrs.width * (x.attrs.scaleX || 1));
                    const shapeBottom = x.attrs.y + (x.attrs.height * (x.attrs.scaleY || 1));

                    // Check if drop position is within shape-widget bounds
                    if (dropX >= shapeLeft && dropX <= shapeRight && dropY >= shapeTop && dropY <= shapeBottom) {
                        isOverShapeWidget = true;
                        shapeWidget = x.attrs;
                        shapeWidgetData = x.children[0].dataArray;
                    }
                }
            });

            // Create new shape at the center of the group
            let newShape = {
                x: dropX,
                y: dropY,
                ...shape?.attrs,
                id: uuid()
            };

            // Handle masked image case
            if (isOverShapeWidget && shapeWidget?.isMasked &&
                (mainStage[selectedIndex].dragRect.current.htmlType === 'stock-photo' || mainStage[selectedIndex].dragRect.current.htmlType === 'upload-photo')) {
                newShape = {
                    src: newShape.src,
                    height: Number(shapeWidget.height),
                    width: Number(shapeWidget.width),
                    x: shapeWidget.x,
                    y: shapeWidget.y,
                    scaleX: shapeWidget.scaleX,
                    scaleY: shapeWidget.scaleY,
                    skewX: shapeWidget.skewX,
                    skewY: shapeWidget.skewY,
                    title: 'masked-image',
                    layer: 'masked-image',
                    htmlType: 'masked-image',
                    type: 'img',
                    data: shapeWidget.data,
                    maskData: shapeWidgetData,
                    maskType: shapeWidget.maskType,
                    draggable: true,
                    visible: true,
                    id: uuid()
                };

                // Update mainStage by removing the shape-widget and adding the new masked-image
                mainStage[selectedIndex].selectedShapes = [];
                setMainStage(prevState => {
                    const updatedState = [...prevState];
                    const updatedShapes = updatedState[selectedIndex].shapes.filter(
                        shape => shape.id !== shapeWidget.id
                    );
                    updatedState[selectedIndex] = {
                        ...updatedState[selectedIndex],
                        shapes: [...updatedShapes, newShape]
                    };
                    return updatedState;
                });
            } else {
                // Add the new shape at the center of the group
                setMainStage(prevState => {
                    const updatedState = [...prevState];
                    updatedState[selectedIndex] = {
                        ...updatedState[selectedIndex],
                        shapes: [...updatedState[selectedIndex].shapes, newShape]
                    };
                    return updatedState;
                });
            }

            // Select the newly added shape
            setTimeout(() => {
                mainStage[selectedIndex].stageref.current.children[0].children[1].children.forEach((child) => {
                    if (child.attrs.id === newShape.id) {
                        setMainStage(prevState => {
                            const updatedState = [...prevState];
                            updatedState[selectedIndex] = {
                                ...updatedState[selectedIndex],
                                selectedShapes: [child]
                            };
                            return updatedState;
                        });
                    }
                });
            }, 100);
            setIsEditorDrawerOpen(false);
        }
    };

    return (
        <div className="mt-6">
            <h3 className="text-white font-bold">{title}</h3>
            <div className="grid grid-cols-3 gap-2 mt-2">
                {gifs.map((gif, index) => {
                    if (index === gifs.length - 1) {
                        return (
                            <img
                                draggable
                                onDragStart={() => handleGifDragStart(gif)}
                                onClick={() => handleGifClick(gif)}
                                ref={lastGifRef}
                                key={gif.id}
                                src={gif.media_formats.gif.url}
                                alt={gif.content_description}
                                className="rounded-lg w-full h-24 object-cover cursor-pointer"
                            />
                        );
                    }
                    return (
                        <img
                            draggable
                            onDragStart={() => handleGifDragStart(gif)}
                            onClick={() => handleGifClick(gif)}
                            key={gif.id}
                            src={gif.media_formats.gif.url}
                            alt={gif.content_description}
                            className="rounded-lg w-full h-24 object-cover cursor-pointer"
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default GIFsView;