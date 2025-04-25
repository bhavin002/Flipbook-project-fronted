import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { FlipHorizontal2, FlipVertical2, Link } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const renderElements = (shapeType, selectedShape, selectedSubMenu, setSelectedSubMenu, setMainStage, mainStage, selectedIndex, handleCrop, setIsShapeDrawerOpen) => {
    const [isMaskingEnabled, setIsMaskingEnabled] = useState(false);

    useEffect(() => {
        if (selectedShape && selectedShape.length) {
            const shape = mainStage[selectedIndex].shapes.find(e => e.id === selectedShape[0].attrs.id);
            shape && (shape.title == 'shape-widget' || shape.title == 'masked-image' || shape.title == 'stock-gif' || shape.title == 'masked-gif' || shape.title == 'stock-sticker' || shape.title == 'masked-sticker') && ('isMasked' in shape) && setIsMaskingEnabled(shape.isMasked);
        }
    }, [mainStage, selectedShape]);

    const toggleMasking = () => {
        setIsMaskingEnabled(!isMaskingEnabled);
        const updatedStage = [...mainStage];
        if (selectedShape?.length) {
            updatedStage[selectedIndex].shapes = mainStage[selectedIndex].shapes.map(shape => {
                if (selectedShape.some(s => s.attrs.id === shape.id)) {
                    return { ...shape, isMasked: !isMaskingEnabled };
                }
                return shape;
            });
        }
        setMainStage(updatedStage);
    };

    const handleFlip = (type) => {
        if (selectedShape?.length !== 1) return;

        const updatedStage = [...mainStage];
        updatedStage[selectedIndex].shapes = mainStage[selectedIndex].shapes.map((shape) => {
            if (selectedShape[0].attrs.id === shape.id) {
                if (type === "horizontal") {
                    return { ...shape, flipX: !shape.flipX };
                } else if (type === "vertical") {
                    return { ...shape, flipY: !shape.flipY };
                }
            }
            return shape;
        });
        setMainStage(updatedStage);
    };

    switch (shapeType) {
        case "hyperlink":
            return <>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={() => {
                                    setIsShapeDrawerOpen(true)
                                    selectedSubMenu === "color" ? setSelectedSubMenu(null) : setSelectedSubMenu("color")
                                }}
                                className="w-8 h-8 rounded cursor-pointer"
                                style={{
                                    backgroundColor: selectedShape?.length
                                        ? selectedShape[0].attrs.fill
                                        : mainStage[selectedIndex].background,
                                }}
                            ></div>
                        </TooltipTrigger>
                        <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                            <p className="text-xs">Color</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {selectedShape?.length == 1 && <Button variant="ghost" size="sm" onClick={() => {
                    setIsShapeDrawerOpen(true)
                    selectedSubMenu === "hyperlink" ? setSelectedSubMenu(null) : setSelectedSubMenu("hyperlink")
                }}>
                    <Link />
                </Button>}
            </>
        case 'shape-widget':
            return <>
                {selectedShape?.length == 1 && ('isMasked' in selectedShape[0].attrs) &&
                    <div className="flex items-center gap-2">
                        <Switch
                            id="use-as-mask"
                            checked={isMaskingEnabled}
                            onCheckedChange={toggleMasking}
                        />
                        <Label htmlFor="use-as-mask" className="text-xs">
                            Use as mask
                        </Label>
                    </div>
                }
                {selectedShape?.length == 1 && <Button variant="ghost" size="sm" onClick={() => {
                    setIsShapeDrawerOpen(true)
                    selectedSubMenu === "shape-style" ? setSelectedSubMenu(null) : setSelectedSubMenu("shape-style")
                }}>
                    Style
                </Button>}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={() => {
                                    setIsShapeDrawerOpen(true)
                                    selectedSubMenu === "color" ? setSelectedSubMenu(null) : setSelectedSubMenu("color")
                                }}
                                className="w-8 h-8 rounded cursor-pointer"
                                style={{ backgroundColor: selectedShape[0].attrs.fill }}
                            ></div>
                        </TooltipTrigger>
                        <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                            <p className="text-xs">Color</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </>
        case 'masked-image':
            return <>
                {selectedShape?.length == 1 && ('isMasked' in selectedShape[0].attrs) &&
                    <div className="flex items-center gap-2">
                        <Switch
                            id="use-as-mask"
                            checked={isMaskingEnabled}
                            onCheckedChange={toggleMasking}
                        />
                        <Label htmlFor="use-as-mask" className="text-xs">
                            Use as mask
                        </Label>
                    </div>
                }
                {selectedShape?.length == 1 && <>
                    <Button variant="ghost" size="sm" onClick={handleCrop}>
                        Crop
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="ghost" size="sm">
                                Flip
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem onClick={() => handleFlip("horizontal")}>
                                <FlipHorizontal2 /> Flip horizontal
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleFlip("vertical")}>
                                <FlipVertical2 /> Flip vertical
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>}

            </>
        case 'masked-gif':
            return <>
                {selectedShape?.length == 1 && ('isMasked' in selectedShape[0].attrs) &&
                    <div className="flex items-center gap-2">
                        <Switch
                            id="use-as-mask"
                            checked={isMaskingEnabled}
                            onCheckedChange={toggleMasking}
                        />
                        <Label htmlFor="use-as-mask" className="text-xs">
                            Use as mask
                        </Label>
                    </div>
                }
                {selectedShape?.length == 1 && <>
                    {/* <Button variant="ghost" size="sm" onClick={() => {
                        setIsShapeDrawerOpen(true)
                        selectedSubMenu === "image-filter" ? setSelectedSubMenu(null) : setSelectedSubMenu("image-filter")
                    }}>
                        Filters
                    </Button> */}
                    {/* <Button variant="ghost" size="sm" onClick={() => {
                        setIsShapeDrawerOpen(true)
                        selectedSubMenu === "image-style" ? setSelectedSubMenu(null) : setSelectedSubMenu("image-style")
                    }}>
                        Style
                    </Button> */}
                    <Button variant="ghost" size="sm" onClick={handleCrop}>
                        Crop
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="ghost" size="sm">
                                Flip
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem onClick={() => handleFlip("horizontal")}>
                                <FlipHorizontal2 /> Flip horizontal
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleFlip("vertical")}>
                                <FlipVertical2 /> Flip vertical
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>}
            </>
        case 'masked-sticker':
            return <>
                {selectedShape?.length == 1 && ('isMasked' in selectedShape[0].attrs) &&
                    <div className="flex items-center gap-2">
                        <Switch
                            id="use-as-mask"
                            checked={isMaskingEnabled}
                            onCheckedChange={toggleMasking}
                        />
                        <Label htmlFor="use-as-mask" className="text-xs">
                            Use as mask
                        </Label>
                    </div>
                }
                {selectedShape?.length == 1 && <>
                    <Button variant="ghost" size="sm" onClick={handleCrop}>
                        Crop
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="ghost" size="sm">
                                Flip
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem onClick={() => handleFlip("horizontal")}>
                                <FlipHorizontal2 /> Flip horizontal
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleFlip("vertical")}>
                                <FlipVertical2 /> Flip vertical
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>}
            </>
        case 'stock-photo':
            return <>
                {selectedShape?.length == 1 && <>
                    <Button variant="ghost" size="sm" onClick={() => {
                        setIsShapeDrawerOpen(true)
                        selectedSubMenu === "image-filter" ? setSelectedSubMenu(null) : setSelectedSubMenu("image-filter")
                    }}>
                        Filters
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => {
                        setIsShapeDrawerOpen(true)
                        selectedSubMenu === "image-style" ? setSelectedSubMenu(null) : setSelectedSubMenu("image-style")
                    }}>
                        Style
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleCrop}>
                        Crop
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="ghost" size="sm">
                                Flip
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem onClick={() => handleFlip("horizontal")}>
                                <FlipHorizontal2 /> Flip horizontal
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleFlip("vertical")}>
                                <FlipVertical2 /> Flip vertical
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>}
            </>
        case 'stock-sticker':
            return <>
                {selectedShape?.length == 1 && <>
                    <Button variant="ghost" size="sm" onClick={() => {
                        setIsShapeDrawerOpen(true)
                        selectedSubMenu === "image-style" ? setSelectedSubMenu(null) : setSelectedSubMenu("image-style")
                    }}>
                        Style
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleCrop}>
                        Crop
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="ghost" size="sm">
                                Flip
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem onClick={() => handleFlip("horizontal")}>
                                <FlipHorizontal2 /> Flip horizontal
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleFlip("vertical")}>
                                <FlipVertical2 /> Flip vertical
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>}
            </>
        case 'stock-gif':
            return <>
                {selectedShape?.length == 1 && <>
                    <Button variant="ghost" size="sm" onClick={() => {
                        setIsShapeDrawerOpen(true)
                        selectedSubMenu === "image-style" ? setSelectedSubMenu(null) : setSelectedSubMenu("image-style")
                    }}>
                        Style
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleCrop}>
                        Crop
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="ghost" size="sm">
                                Flip
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem onClick={() => handleFlip("horizontal")}>
                                <FlipHorizontal2 /> Flip horizontal
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleFlip("vertical")}>
                                <FlipVertical2 /> Flip vertical
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>}
            </>
        case 'stock-video':
            return <>
                {selectedShape?.length == 1 && <Button variant="ghost" size="sm" onClick={() => {
                    setIsShapeDrawerOpen(true)
                    selectedSubMenu === "stock-video" ? setSelectedSubMenu(null) : setSelectedSubMenu("stock-video")
                }}>
                    Edit
                </Button>}
            </>
        case "link-button":
            return <>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={() => {
                                    setIsShapeDrawerOpen(true)
                                    selectedSubMenu === "color" ? setSelectedSubMenu(null) : setSelectedSubMenu("color")
                                }}
                                className="w-8 h-8 rounded cursor-pointer"
                                style={{ backgroundColor: selectedShape[0].attrs.fill }}
                            ></div>
                        </TooltipTrigger>
                        <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                            <p className="text-xs">Color</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {selectedShape?.length == 1 && <Button variant="ghost" size="sm" onClick={() => {
                    setIsShapeDrawerOpen(true)
                    selectedSubMenu === "link" ? setSelectedSubMenu(null) : setSelectedSubMenu("link")
                }}>
                    <Link />
                </Button>}
            </>
        case "tag":
            return <>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={() => {
                                    setIsShapeDrawerOpen(true)
                                    selectedSubMenu === "color" ? setSelectedSubMenu(null) : setSelectedSubMenu("color")
                                }}
                                className="w-8 h-8 rounded cursor-pointer"
                                style={{ backgroundColor: selectedShape[0].attrs.fill }}
                            ></div>
                        </TooltipTrigger>
                        <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                            <p className="text-xs">Color</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {selectedShape?.length == 1 && <Button variant="ghost" size="sm" onClick={() => {
                    setIsShapeDrawerOpen(true)
                    selectedSubMenu === "tag" ? setSelectedSubMenu(null) : setSelectedSubMenu("tag")
                }}>
                    <Link />
                </Button>}
            </>
        case "caption":
            return <>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={() => {
                                    setIsShapeDrawerOpen(true)
                                    selectedSubMenu === "color" ? setSelectedSubMenu(null) : setSelectedSubMenu("color")
                                }}
                                className="w-8 h-8 rounded cursor-pointer"
                                style={{ backgroundColor: selectedShape[0].attrs.fill }}
                            ></div>
                        </TooltipTrigger>
                        <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                            <p className="text-xs">Color</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {selectedShape?.length == 1 && <Button variant="ghost" size="sm" onClick={() => {
                    setIsShapeDrawerOpen(true)
                    selectedSubMenu === "caption" ? setSelectedSubMenu(null) : setSelectedSubMenu("caption")
                }}>
                    Edit
                </Button>}
            </>
        case "embed-code":
            return <>
                {selectedShape?.length == 1 && <Button variant="ghost" size="sm" onClick={() => {
                    setIsShapeDrawerOpen(true)
                    selectedSubMenu === "embed" ? setSelectedSubMenu(null) : setSelectedSubMenu("embed")
                }}>
                    Add code
                </Button>}
            </>
        case "slideshow":
            return <>
                {selectedShape?.length == 1 && <Button variant="ghost" size="sm" onClick={() => {
                    setIsShapeDrawerOpen(true)
                    selectedSubMenu === "slideshow" ? setSelectedSubMenu(null) : setSelectedSubMenu("slideshow")
                }}>
                    Edit
                </Button>}
            </>
        case "video-embed":
            return <>
                {selectedShape?.length == 1 && <Button variant="ghost" size="sm" onClick={() => {
                    setIsShapeDrawerOpen(true)
                    selectedSubMenu === "video-embed" ? setSelectedSubMenu(null) : setSelectedSubMenu("video-embed")
                }}>
                    Edit
                </Button>}
            </>
        case "video-button":
            return <>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={() => {
                                    setIsShapeDrawerOpen(true)
                                    selectedSubMenu === "color" ? setSelectedSubMenu(null) : setSelectedSubMenu("color")
                                }}
                                className="w-8 h-8 rounded cursor-pointer"
                                style={{ backgroundColor: selectedShape[0].attrs.fill }}
                            ></div>
                        </TooltipTrigger>
                        <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                            <p className="text-xs">Color</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {selectedShape?.length == 1 && <Button variant="ghost" size="sm" onClick={() => {
                    setIsShapeDrawerOpen(true)
                    selectedSubMenu === "video-button" ? setSelectedSubMenu(null) : setSelectedSubMenu("video-button")
                }}>
                    Edit
                </Button>}
            </>
        case "audio-button":
            return <>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={() => {
                                    setIsShapeDrawerOpen(true)
                                    selectedSubMenu === "color" ? setSelectedSubMenu(null) : setSelectedSubMenu("color")
                                }}
                                className="w-8 h-8 rounded cursor-pointer"
                                style={{ backgroundColor: selectedShape[0].attrs.fill }}
                            ></div>
                        </TooltipTrigger>
                        <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                            <p className="text-xs">Color</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {selectedShape?.length == 1 && <Button variant="ghost" size="sm" onClick={() => {
                    setIsShapeDrawerOpen(true)
                    selectedSubMenu === "audio-button" ? setSelectedSubMenu(null) : setSelectedSubMenu("audio-button")
                }}>
                    Edit
                </Button>}
            </>
        case "shop-area":
            return <>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={() => {
                                    setIsShapeDrawerOpen(true)
                                    selectedSubMenu === "color" ? setSelectedSubMenu(null) : setSelectedSubMenu("color")
                                }}
                                className="w-8 h-8 rounded cursor-pointer"
                                style={{ backgroundColor: selectedShape[0].attrs.fill }}
                            ></div>
                        </TooltipTrigger>
                        <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                            <p className="text-xs">Color</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {selectedShape?.length == 1 && <Button variant="ghost" size="sm" onClick={() => {
                    setIsShapeDrawerOpen(true)
                    selectedSubMenu === "shopping-list" ? setSelectedSubMenu(null) : setSelectedSubMenu("shopping-list")
                }}>
                    Edit
                </Button>}
            </>
        case "quiz":
            return <>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={() => {
                                    setIsShapeDrawerOpen(true)
                                    selectedSubMenu === "color" ? setSelectedSubMenu(null) : setSelectedSubMenu("color")
                                }}
                                className="w-8 h-8 rounded cursor-pointer"
                                style={{ backgroundColor: selectedShape[0].attrs.fill }}
                            ></div>
                        </TooltipTrigger>
                        <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                            <p className="text-xs">Color</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {selectedShape?.length == 1 && <Button variant="ghost" size="sm" onClick={() => {
                    setIsShapeDrawerOpen(true)
                    selectedSubMenu === "quiz" ? setSelectedSubMenu(null) : setSelectedSubMenu("quiz")
                }}>
                    Edit
                </Button>}
            </>
        case "question":
            return <>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={() => {
                                    setIsShapeDrawerOpen(true)
                                    selectedSubMenu === "color" ? setSelectedSubMenu(null) : setSelectedSubMenu("color")
                                }}
                                className="w-8 h-8 rounded cursor-pointer"
                                style={{ backgroundColor: selectedShape[0].attrs.fill }}
                            ></div>
                        </TooltipTrigger>
                        <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                            <p className="text-xs">Color</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {selectedShape?.length == 1 && <Button variant="ghost" size="sm" onClick={() => {
                    setIsShapeDrawerOpen(true)
                    selectedSubMenu === "question" ? setSelectedSubMenu(null) : setSelectedSubMenu("question")
                }}>
                    Edit
                </Button>}
            </>
        case "contact-form":
            return <>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={() => {
                                    setIsShapeDrawerOpen(true)
                                    selectedSubMenu === "color" ? setSelectedSubMenu(null) : setSelectedSubMenu("color")
                                }}
                                className="w-8 h-8 rounded cursor-pointer"
                                style={{ backgroundColor: selectedShape[0].attrs.fill }}
                            ></div>
                        </TooltipTrigger>
                        <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                            <p className="text-xs">Color</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {selectedShape?.length == 1 && <Button variant="ghost" size="sm" onClick={() => {
                    setIsShapeDrawerOpen(true)
                    selectedSubMenu === "contact-form" ? setSelectedSubMenu(null) : setSelectedSubMenu("contact-form")
                }}>
                    Edit
                </Button>}
            </>
        case "page-options":
            return <>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={() => {
                                    setIsShapeDrawerOpen(true)
                                    selectedSubMenu === "color" ? setSelectedSubMenu(null) : setSelectedSubMenu("color")
                                }}
                                className="w-8 h-8 rounded cursor-pointer"
                                style={{ backgroundColor: selectedShape[0].attrs.fill }}
                            ></div>
                        </TooltipTrigger>
                        <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                            <p className="text-xs">Color</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            {selectedShape?.length == 1 && <Button variant="ghost" size="sm" onClick={() => {
                                setIsShapeDrawerOpen(true)
                                selectedSubMenu === "page-options" ? setSelectedSubMenu(null) : setSelectedSubMenu("page-options")
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="12" viewBox="0 0 12 12">
                                    <path d="M10 2V0H0v10h2v2h10V2h-2zM9 9H1V1h8v8z">
                                    </path>
                                </svg>
                            </Button>}
                        </TooltipTrigger>
                        <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                            <p className="text-xs">Style</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

            </>
        case "go-to-page":
            return <>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={() => {
                                    setIsShapeDrawerOpen(true)
                                    selectedSubMenu === "color" ? setSelectedSubMenu(null) : setSelectedSubMenu("color")
                                }}
                                className="w-8 h-8 rounded cursor-pointer"
                                style={{ backgroundColor: selectedShape[0].attrs.fill }}
                            ></div>
                        </TooltipTrigger>
                        <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                            <p className="text-xs">Color</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            {selectedShape?.length == 1 && <Button variant="ghost" size="sm" onClick={() => {
                                setIsShapeDrawerOpen(true)
                                selectedSubMenu === "go-to-page" ? setSelectedSubMenu(null) : setSelectedSubMenu("go-to-page")
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="12" viewBox="0 0 12 12">
                                    <path d="M10 2V0H0v10h2v2h10V2h-2zM9 9H1V1h8v8z">
                                    </path>
                                </svg>
                            </Button>}
                        </TooltipTrigger>
                        <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                            <p className="text-xs">Style</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </>
        case 'text':
            return <>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={() => {
                                    setIsShapeDrawerOpen(true)
                                    selectedSubMenu === "color" ? setSelectedSubMenu(null) : setSelectedSubMenu("color")
                                }}
                                className="w-8 h-8 rounded cursor-pointer"
                                style={{ backgroundColor: selectedShape[0].attrs.fill }}
                            ></div>
                        </TooltipTrigger>
                        <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                            <p className="text-xs">Color</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {selectedShape?.length == 1 && <Button variant="ghost" size="sm" onClick={() => {
                    setIsShapeDrawerOpen(true)
                    selectedSubMenu === "text" ? setSelectedSubMenu(null) : setSelectedSubMenu("text")
                }}>
                    Edit
                </Button>}
            </>
        default:
            return null;
    }
}

export default function LeftSideElements({ selectedSubMenu, setSelectedSubMenu, selectedShape, setMainStage, mainStage, selectedIndex, handleCrop, setIsShapeDrawerOpen }) {

    return (
        <>
            <div className="flex gap-2 flex-none">
                {renderElements(selectedShape[0].attrs.title, selectedShape, selectedSubMenu, setSelectedSubMenu, setMainStage, mainStage, selectedIndex, handleCrop, setIsShapeDrawerOpen)}
            </div>
        </>
    )
}