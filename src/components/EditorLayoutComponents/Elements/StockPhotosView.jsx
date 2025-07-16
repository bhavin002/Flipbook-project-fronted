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

const StockPhotosView = ({ setIsEditorDrawerOpen, setMainStage, mainStage, selectedIndex, onBackClick }) => {
    const [categories, setCategories] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentCategory, setCurrentCategory] = useState(null);
    const [page, setPage] = useState(1);
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
                            setMainStage={setMainStage}
                            selectedIndex={selectedIndex}
                            setIsEditorDrawerOpen={setIsEditorDrawerOpen}
                        />
                    ) : (
                        Object.keys(categories).map((category) => (
                            <Section
                                key={category}
                                title={category}
                                images={categories[category]}
                                onViewAll={() => handleCategoryClick(category)}
                                mainStage={mainStage}
                                setMainStage={setMainStage}
                                selectedIndex={selectedIndex}
                                setIsEditorDrawerOpen={setIsEditorDrawerOpen}
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

const Section = ({ setMainStage, title, images, onViewAll, lastImageRef, mainStage, selectedIndex, setIsEditorDrawerOpen }) => {
    // Extracted reusable function to handle the image selection logic

    const handleImageSelect = async (image, isDragStart = false) => {
        const dimensions = await new Promise((resolve, reject) => {
            const img = new Image();
            img.src = image.src.medium;
            img.onload = () => resolve({ width: img.width, height: img.height });
            img.onerror = () => reject("Error loading image");
        });

        const imageData = {
            width: dimensions.width,
            height: dimensions.height,
            type: "img",
            src: `${image.src.medium}`,
            visible: true,
            title: "stock-photo",
            layer: "Image",
            htmlType: "stock-photo",
            sidebar: "image-action"
        };

        if (isDragStart) {
            mainStage[selectedIndex].dragRect.current = imageData;
            return;
        }

        const item = { attrs: imageData };

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

            // Check if the drop position overlaps with a shape-widget
            mainStage[selectedIndex].stageref.current.children[0].children[1].children.forEach(shape => {
                if (mainStage[selectedIndex].selectedShapes.length == 1) {
                    if (shape.attrs.id == mainStage[selectedIndex].selectedShapes[0].attrs.id) {
                        if (shape.attrs.title === 'shape-widget') {
                            isOverShapeWidget = true;
                            shapeWidget = shape.attrs;
                            shapeWidgetData = shape.children[0].dataArray;
                        }
                        else if (shape.attrs.title === 'masked-image') {
                            isOverMaskedImage = true;
                            shapeWidget = shape.attrs;
                        }
                    }

                }
            });


            // Create new shape at the center of the group
            let newShape = {
                x: dropX,
                y: dropY,
                ...item.attrs,
                id: uuid()

            };
            // Handle masked image case
            if (isOverMaskedImage) {
                mainStage[selectedIndex].selectedShapes = [];
                const htmlType = imageData.htmlType;
                const typeMapping = {
                    'upload-photo': 'masked-image',
                    'stock-gif': 'masked-gif',
                    'stock-photo': 'masked-image',
                    'stock-sticker': 'masked-sticker'
                };
                const shapeType = typeMapping[htmlType] || 'masked-sticker'; // Default to 'masked-sticker' for unknown types
                setMainStage(prevState => {
                    const updatedState = [...prevState];
                    const updatedShapes = updatedState[selectedIndex].shapes.map((shape, idx) => {
                        if (shape.id !== shapeWidget.id) return shape;
                        const shapeNode = updatedState[selectedIndex].stageref.current.children[0].children[1].children[idx].attrs;
                        return {
                            ...shape,
                            title: shapeType,
                            layer: shapeType,
                            htmlType: shapeType,
                            x: shapeNode.x,
                            y: shapeNode.y,
                            scaleX: shapeNode.scaleX,
                            scaleY: shapeNode.scaleY,
                            width: shapeNode.width,
                            height: shapeNode.height,
                            src: imageData.src,
                            type: 'img',
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
            if (isOverShapeWidget && shapeWidget?.isMasked) {
                newShape = {
                    src: imageData.src,
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

            // stage.dragRect.current = null;

            setIsEditorDrawerOpen(false);
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
                                onDragStart={() => handleImageSelect(image, true)}
                                onClick={() => handleImageSelect(image, false)}
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
                            onDragStart={() => handleImageSelect(image, true)}
                            onClick={() => handleImageSelect(image, false)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default StockPhotosView;