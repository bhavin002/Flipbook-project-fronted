import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuid } from "uuid";

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

const StockVideosView = ({ setMainStage, mainStage, selectedIndex, onBackClick }) => {
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
            fetchVideo(category, true, 1);
        });
    }, []);

    const fetchVideo = async (query, isCategory = false, pageNum = 1) => {
        try {
            const response = await fetch(
                `https://api.pexels.com/videos/search?query=${query}&per_page=9&page=${pageNum}`,
                { headers: { Authorization: API_KEY } }
            );
            const data = await response.json();

            if (data.videos.length === 0) {
                setHasMore(false);
                return;
            }

            const newVideos = data.videos;

            if (isCategory) {
                setCategories(prevCategories => ({
                    ...prevCategories,
                    [query]: pageNum === 1
                        ? newVideos
                        : [
                            ...(prevCategories[query] || []),
                            ...newVideos.filter(video => !prevCategories[query].some(existingVideo => existingVideo.id === video.id))
                        ]
                }));
            } else {
                setSearchResults(prevResults => {
                    const existingIds = new Set(prevResults.map(video => video.id));
                    const uniqueNewVideos = newVideos.filter(video => !existingIds.has(video.id));
                    return pageNum === 1 ? uniqueNewVideos : [...prevResults, ...uniqueNewVideos];
                });
            }
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    const handleCategoryClick = (category) => {
        setCurrentCategory(category);
        setSearchQuery(category);
        setPage(1);
        setHasMore(true);
        fetchVideo(category, false, 1);
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
            fetchVideo(searchQuery, false, 1);
        }
    };

    const lastVideoRef = useCallback(node => {
        if (!hasMore || !node) return;

        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => {
                    const newPage = prevPage + 1;
                    if (currentCategory) {
                        fetchVideo(currentCategory, false, newPage);
                    } else if (searchQuery.trim() !== "") {
                        fetchVideo(searchQuery, false, newPage);
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
                Stock videos
            </div>

            <div className="flex flex-col h-0 flex-grow overflow-hidden">
                <div className="relative">
                    <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                        <Search className="h-4 w-4" />
                    </div>
                    <Input
                        type="search"
                        placeholder="Search stock videos"
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
                            videos={searchResults}
                            lastVideoRef={lastVideoRef}
                            mainStage={mainStage}
                            setMainStage={setMainStage}
                            selectedIndex={selectedIndex}
                        />
                    ) : (
                        Object.keys(categories).map((category) => (
                            <Section
                                key={category}
                                title={category}
                                videos={categories[category]}
                                onViewAll={() => handleCategoryClick(category)}
                                mainStage={mainStage}
                                setMainStage={setMainStage}
                                selectedIndex={selectedIndex}
                            />
                        ))
                    )}

                    {!hasMore && (
                        <p className="text-white text-center mt-4">
                            No videos available.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

const Section = ({ setMainStage, title, videos, onViewAll, lastVideoRef, mainStage, selectedIndex }) => {
    // Function to handle video drag start
    const handleVideoDragStart = (video) => {
        const videoUrl = video.video_files.find(file => file.quality === "sd")?.link || video.video_files[0]?.link;
        mainStage[selectedIndex].dragRect.current = {
            width: 500,
            height: 300,
            type: "img",
            visible: true,
            bgImage: `${video.image}`,
            iconSrc: "/src/assets/icons/PlayVideo.svg",
            src: videoUrl,
            fill: "#ebf0fc",
            title: "stock-video",
            layer: "Stock Video",
            htmlType: "stock-video",
        };
    };

    // Function to handle video click
    const handleVideoClick = (video) => {
        const videoUrl = video.video_files.find(file => file.quality === "sd")?.link || video.video_files[0]?.link;
        const shape = {
            attrs: {
                width: 500,
                height: 300,
                type: "img",
                visible: true,
                bgImage: `${video.image}`,
                iconSrc: "/src/assets/icons/PlayVideo.svg",
                src: videoUrl,
                fill: "#ebf0fc",
                title: "stock-video",
                layer: "Stock Video",
                htmlType: "stock-video",
            }
        };

        if (shape?.attrs) {
            // Get the group from the stage
            let group = mainStage[selectedIndex].stageref.current.children[0].children[1];

            // Calculate the center of the group
            const groupX = group.x();
            const groupY = group.y();
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
        }
    };

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
                {videos.map((video, index) => {
                    const videoUrl = video.video_files.find(file => file.quality === "sd")?.link || video.video_files[0]?.link;

                    if (index === videos.length - 1) {
                        return (
                            <div
                                key={video.id}
                                ref={lastVideoRef}
                                className="relative"
                                draggable
                                onDragStart={() => handleVideoDragStart(video)}
                                onClick={() => handleVideoClick(video)}
                            >
                                <img
                                    id={video.id}
                                    src={video.image}
                                    alt={video.user.name}
                                    className="rounded-lg w-full h-24 object-cover cursor-pointer"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-8 h-8" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" fill="rgba(0,0,0,0.5)" />
                                        <path d="M10 8l6 4-6 4V8z" fill="white" />
                                    </svg>
                                </div>
                            </div>
                        );
                    }
                    return (
                        <div
                            key={video.id}
                            className="relative"
                            draggable
                            onDragStart={() => handleVideoDragStart(video)}
                            onClick={() => handleVideoClick(video)}
                        >
                            <img
                                src={video.image}
                                alt={video.user.name}
                                className="rounded-lg w-full h-24 object-cover cursor-pointer"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <svg className="w-8 h-8" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" fill="rgba(0,0,0,0.5)" />
                                    <path d="M10 8l6 4-6 4V8z" fill="white" />
                                </svg>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StockVideosView;