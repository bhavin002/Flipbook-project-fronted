import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const API_KEY = `${import.meta.env.VITE_APP_PEXELS_API}`;

const INITIAL_CATEGORIES = [
    "God",
    "Architecture",
    "Travel",
    "Fashion",
    "Food",
    "Technology",
    "Car",
    "Wedding"
];

const StockPhotosView = ({ mainStage, selectedIndex, onBackClick }) => {
    const [categories, setCategories] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentCategory, setCurrentCategory] = useState(null);
    const [page, setPage] = useState(1);
    console.log("page ????", page)
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    useEffect(() => {
        INITIAL_CATEGORIES.forEach(category => {
            fetchImages(category, true, 1);
        });
    }, []);

    const fetchImages = async (query, isCategory = false, pageNum = 1) => {
        try {
            const response = await fetch(
                `https://api.pexels.com/v1/search?query=${query}&per_page=9&page=${pageNum}`,
                {
                    headers: { Authorization: API_KEY },
                }
            );
            const data = await response.json();

            if (data.photos.length === 0) {
                setHasMore(false);
                return;
            }

            const newImages = data.photos;

            if (isCategory) {
                setCategories(prevCategories => ({
                    ...prevCategories,
                    [query]: pageNum === 1
                        ? newImages
                        : [
                            ...(prevCategories[query] || []),
                            ...newImages.filter(image => !prevCategories[query].some(existingImage => existingImage.id === image.id))
                        ]
                }));
            } else {
                setSearchResults(prevResults => {
                    const existingIds = new Set(prevResults.map(image => image.id));
                    const uniqueNewImages = newImages.filter(image => !existingIds.has(image.id));
                    return pageNum === 1 ? uniqueNewImages : [...prevResults, ...uniqueNewImages];
                });
            }
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    const handleCategoryClick = (category) => {
        setCurrentCategory(category);
        setSearchQuery(category);
        setPage(1);
        setHasMore(true);
        fetchImages(category, false, 1);
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        setCurrentCategory(null);
        setPage(1);
        setHasMore(true);

        if (query.trim() === "") {
            setSearchResults([]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && searchQuery.trim() !== "") {
            setSearchResults([]);
            fetchImages(searchQuery, false, 1);
        }
    };

    const lastImageRef = useCallback(node => {
        if (!hasMore || !node) return;

        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => {
                    const newPage = prevPage + 1;
                    if (currentCategory) {
                        fetchImages(currentCategory, false, newPage);
                    } else if (searchQuery.trim() !== "") {
                        fetchImages(searchQuery, false, newPage);
                    }
                    return newPage;
                });
            }
        });
        observer.current.observe(node);
    }, [hasMore, currentCategory, searchQuery]);

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
                Stock photos
            </div>

            <div className="flex flex-col h-0 flex-grow overflow-hidden">
                <div className="relative">
                    <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                        <Search className="h-4 w-4" />
                    </div>
                    <Input
                        type="search"
                        placeholder="Search stock photos"
                        className="w-full rounded-lg bg-background text-black pl-8"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyPress={handleKeyPress}
                    />
                </div>

                <div className="overflow-y-auto flex-grow">
                    {searchQuery.trim() !== "" ? (
                        <Section
                            title={currentCategory ? `Showing results for "${currentCategory}"` : `Results for "${searchQuery}"`}
                            images={searchResults}
                            lastImageRef={lastImageRef}
                            mainStage={mainStage}
                            selectedIndex={selectedIndex}
                        />
                    ) : (
                        Object.keys(categories).map((category) => (
                            <Section
                                key={category}
                                title={category}
                                images={categories[category]}
                                onViewAll={() => handleCategoryClick(category)}
                                mainStage={mainStage}
                                selectedIndex={selectedIndex}
                            />
                        ))
                    )}

                    {!hasMore && (
                        <p className="text-white text-center mt-4">
                            No images available.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

const Section = ({ title, images, onViewAll, lastImageRef, mainStage, selectedIndex }) => {
    return (
        <div className="mt-6">
            <div className="flex justify-between items-center">
                <h3 className="text-white font-bold">{title}</h3>
                {onViewAll && (
                    <button className="text-white text-sm" onClick={onViewAll}>
                        See all
                    </button>
                )}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
                {images.map((image, index) => {
                    if (index === images.length - 1) {
                        return (
                            <img
                                ref={lastImageRef}
                                key={image.id}
                                src={image.src.medium}
                                alt={image.photographer}
                                className="rounded-lg w-full h-24 object-cover cursor-pointer"
                                draggable
                                onDragStart={(e) => {
                                    mainStage[selectedIndex].dragRect.current = {
                                        width: 146,
                                        height: 146,
                                        type: "img",
                                        src: `${image.src.medium}`,
                                        visible: true,
                                        title: "stock-photo",
                                        layer: "Stock Photo",
                                        htmlType: "stock-photo"
                                    };
                                }}
                            />
                        );
                    }
                    return (
                        <img
                            key={image.id}
                            src={image.src.medium}
                            alt={image.photographer}
                            className="rounded-lg w-full h-24 object-cover cursor-pointer"
                            draggable
                            onDragStart={(e) => {
                                mainStage[selectedIndex].dragRect.current = {
                                    type: "img",
                                    src: `${image.src.medium}`,
                                    visible: true,
                                    title: "stock-photo",
                                    layer: "Stock Photo",
                                    htmlType: "stock-photo"
                                };
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default StockPhotosView;