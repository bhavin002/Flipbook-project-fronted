import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { BringToFront, FlipHorizontal2, FlipVertical2, Link, SendToBack } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const renderElements = (shapeType, selectedShape, selectedSubMenu, setSelectedSubMenu, setMainStage, mainStage, selectedIndex, handleCrop) => {
    const [isMaskingEnabled, setIsMaskingEnabled] = useState(false);

    useEffect(() => {
        if (selectedShape && selectedShape.length) {
            const shape = mainStage[selectedIndex].shapes.find(e => e.id === selectedShape[0].attrs.id);
            shape && (shape.title == 'shape-widget') && ('isMasked' in shape) && setIsMaskingEnabled(shape.isMasked);
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

    switch (shapeType) {
        case "hyperlink":
            return <>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={() => { selectedSubMenu === "color" ? setSelectedSubMenu(null) : setSelectedSubMenu("color") }}
                                className="w-8 h-8 rounded cursor-pointer"
                                style={{ backgroundColor: selectedShape[0].attrs.fill }}
                            ></div>
                        </TooltipTrigger>
                        <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                            <p className="text-xs">Color</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {selectedShape?.length == 1 && <Button variant="ghost" size="sm" onClick={() => { selectedSubMenu === "hyperlink" ? setSelectedSubMenu(null) : setSelectedSubMenu("hyperlink") }}>
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
                    </div>}
                {selectedShape?.length == 1 && <Button variant="ghost" size="sm" onClick={() => { selectedSubMenu === "shape-style" ? setSelectedSubMenu(null) : setSelectedSubMenu("shape-style") }}>
                    Style
                </Button>}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={() => { selectedSubMenu === "color" ? setSelectedSubMenu(null) : setSelectedSubMenu("color") }}
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

        case 'stock-photo':
            return <>
                {selectedShape?.length == 1 && <>
                    <Button variant="ghost" size="sm" onClick={() => { selectedSubMenu === "image-filter" ? setSelectedSubMenu(null) : setSelectedSubMenu("image-filter") }}>
                        Filters
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => { selectedSubMenu === "image-style" ? setSelectedSubMenu(null) : setSelectedSubMenu("image-style") }}>
                        Style
                    </Button>
                    <div className="border-r"></div>
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
                            <DropdownMenuItem>
                                <FlipHorizontal2 /> Flip horizontal
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FlipVertical2 /> Flip vertical
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>}
            </>

        default:
            return null;
    }
}

export default function LeftSideElements({ selectedSubMenu, setSelectedSubMenu, selectedShape, setMainStage, mainStage, selectedIndex, handleCrop }) {

    return (
        <>
            <div className="flex gap-2">
                {renderElements(selectedShape[0].attrs.title, selectedShape, selectedSubMenu, setSelectedSubMenu, setMainStage, mainStage, selectedIndex, handleCrop)}
            </div>
        </>
    )
}