import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const API_KEY = `${import.meta.env.VITE_APP_TENOR_API}`;

const StickersView = ({ setMainStage, mainStage, selectedIndex,onBackClick }) => {
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
                        />
                    ) : (
                        <Section
                            title="Trending Stickers"
                            stickers={trendingStickers}
                            lastStickerRef={lastStickerRef}
                            mainStage={mainStage}
                            selectedIndex={selectedIndex}
                            setMainStage={setMainStage}
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

const Section = ({ setMainStage, title, stickers, lastStickerRef, mainStage, selectedIndex }) => {
    return (
        <div className="mt-6">
            <h3 className="text-white font-bold">{title}</h3>
            <div className="grid grid-cols-3 gap-2 mt-2">
                {stickers.map((sticker, index) => {
                    if (index === stickers.length - 1) {
                        return (
                            <img
                                draggable
                                onDragStart={(e) => {
                                    mainStage[selectedIndex].dragRect.current = {
                                        type: "sticker",
                                        src: sticker.media_formats?.tinygif_transparent ? sticker.media_formats?.tinygif_transparent.url : sticker.media_formats?.gif?.url, // Use direct URL from the response
                                        visible: true,
                                        title: "stock-sticker",
                                        layer: "Stock Sticker",
                                        htmlType: "stock-sticker",
                                    };
                                }}
                                ref={lastStickerRef}
                                key={sticker.id}
                                src={sticker.media_formats?.tinygif_transparent?.url || sticker.media_formats?.gif?.url}
                                alt={sticker.content_description}
                                className="rounded-lg w-full h-24 object-cover cursor-pointer"
                            />
                        );
                    }
                    return (
                        <img
                            draggable
                            onDragStart={(e) => {
                                mainStage[selectedIndex].dragRect.current = {
                                    type: "sticker",
                                    src: sticker.media_formats?.tinygif_transparent ? sticker.media_formats?.tinygif_transparent.url : sticker.media_formats?.gif?.url, // Use direct URL from the response
                                    visible: true,
                                    title: "stock-sticker",
                                    layer: "Stock Sticker",
                                    htmlType: "stock-sticker",
                                };
                            }}
                            key={sticker.id}
                            src={sticker.media_formats?.tinygif_transparent?.url || sticker.media_formats?.gif?.url}
                            alt={sticker.content_description}
                            className="rounded-lg w-full h-24 object-cover cursor-pointer"
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default StickersView;