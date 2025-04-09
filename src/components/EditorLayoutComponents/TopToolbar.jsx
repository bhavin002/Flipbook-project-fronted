import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Trash2, Lock, Unlock, Eye, BringToFront, SendToBack } from "lucide-react";
import { v4 as uuid } from "uuid";
import { deleteShape } from "@/utils/Helper";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
export default function TopToolbar({ selectedShape, setMainStage, mainStage, selectedIndex }) {
    const [opacity, setOpacity] = useState(30);
    const selectedShapes = mainStage[selectedIndex]?.selectedShapes.map(e => e.attrs).map(e => e.id);

    const toggleLock = (shape = null, idDraggable = true) => {
        // setIsToggle(true);
        if (shape) {
            mainStage[selectedIndex].stageref.current.children[0].children[1].children.find((e, index) => {
                if (e.attrs.id == shape.id) {
                    mainStage[selectedIndex].stageref.current.children[0].children[1].children[index].setAttr('draggable', idDraggable)
                    return true;
                }
            })
            mainStage[selectedIndex].selectedShapes = [...mainStage[selectedIndex].selectedShapes];
            mainStage.splice(selectedIndex, 1, mainStage[selectedIndex]);
            setMainStage([...mainStage]);
        } else {
            selectedShapes.forEach(element => {
                mainStage[selectedIndex].stageref.current.children[0].children[1].children.find((e, index) => {
                    if (e.attrs.id == element) {
                        mainStage[selectedIndex].stageref.current.children[0].children[1].children[index].setAttr('draggable', idDraggable)
                        return true;
                    }
                })
            })
            mainStage[selectedIndex].selectedShapes = [...mainStage[selectedIndex].selectedShapes];
            mainStage.splice(selectedIndex, 1, mainStage[selectedIndex]);
            setMainStage([...mainStage]);
        }
    }

    const handleOpacityChange = (value) => {
        setOpacity(value); // Update local state

        // Update the opacity of the selected shapes in mainStage
        if (selectedShape?.length) {
            const updatedShapes = mainStage[selectedIndex]?.shapes.map((shape) => {
                if (selectedShape.some((s) => s.attrs.id === shape.id)) {
                    return { ...shape, opacity: value / 100 };
                }
                return shape;
            });

            const updatedStage = [...mainStage];
            updatedStage[selectedIndex].shapes = updatedShapes;
            setMainStage(updatedStage);
        }
    };


    const duplicateShapes = () => {
        const selectedShapes = mainStage[selectedIndex]?.selectedShapes
            .map((e) => e.attrs)
            .map((e) => e.id);
        const tempShapes = mainStage[selectedIndex].stageref.current.children[0].children[1].children
            .filter((e, index) => selectedShapes.includes(e.attrs.id))
            .map((e) => e.attrs);
        const newShapes = tempShapes.map((e) => {
            const newID = uuid();
            return {
                ...e,
                id: newID,
                x: e.x,
                y: e.y,
            };
        });
        mainStage[selectedIndex].shapes = mainStage[selectedIndex].stageref.current.children[0].children[1].children.map((e) =>
            JSON.parse(JSON.stringify(e.attrs))
        );
        newShapes.forEach((e) => {
            let index = mainStage[selectedIndex].shapes.findIndex((shape) => shape.id === e.id);
            mainStage[selectedIndex].shapes.splice(index, 0, e);
        });
        mainStage[selectedIndex].shapes.find((e, index) => {
            if (selectedShapes.includes(e.id)) {
                e.x += 30;
                e.y += 30;
            }
        });
        mainStage.splice(selectedIndex, 1, mainStage[selectedIndex]);
        setMainStage([...mainStage]);
    };

    const handleForward = () => {
        const selectedShapes = mainStage[selectedIndex]?.selectedShapes.map((e) => e.attrs.id);
        if (!selectedShapes?.length) return;

        const shapes = mainStage[selectedIndex].shapes;

        // Loop through selected shapes and move them one index forward
        for (let i = shapes.length - 2; i >= 0; i--) {
            if (selectedShapes.includes(shapes[i].id)) {
                // Swap the current shape with the one after it
                [shapes[i], shapes[i + 1]] = [shapes[i + 1], shapes[i]];
            }
        }

        const updatedStage = [...mainStage];
        updatedStage[selectedIndex].shapes = shapes;
        setMainStage(updatedStage);
    };

    const handleBack = () => {
        const selectedShapes = mainStage[selectedIndex]?.selectedShapes.map((e) => e.attrs.id);
        if (!selectedShapes?.length) return;

        const shapes = mainStage[selectedIndex].shapes;

        // Loop through selected shapes and move them one index back
        for (let i = 1; i < shapes.length; i++) {
            if (selectedShapes.includes(shapes[i].id)) {
                // Swap current shape with the one before it
                [shapes[i - 1], shapes[i]] = [shapes[i], shapes[i - 1]];
            }
        }

        const updatedStage = [...mainStage];
        updatedStage[selectedIndex].shapes = shapes;
        setMainStage(updatedStage);
    };
    return (
        <div className="flex justify-between items-center px-6 py-[6px] bg-white border-y border-[#d0d0d0]">
            <div className="flex gap-2">
                <div className="border-r border-[#d0d0d0] pr-2">
                    <p className="text-sm">Page 1</p>
                    <p className="text-[10px] text-gray-500">1632 x 1056 px</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="text-xs">Background</p>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    className="w-8 h-8 rounded cursor-pointer"
                                    style={{ backgroundColor: "black" }}
                                ></div>
                            </TooltipTrigger>
                            <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                                <p className="text-xs">Color</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            {selectedShape && selectedShape.length !== 0 && (
                <div className="flex items-center">
                    <Button variant="ghost" size="sm" onClick={() => {
                        duplicateShapes();
                    }}>
                        Copy
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="ghost" size="sm">
                                Arrange
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={handleForward}>
                                <BringToFront /> Forward
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleBack}>
                                <SendToBack /> Back
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="sm" className="blur-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="black" width="100%" height="20" viewBox="0 0 20 20">
                                                    <rect width="4" height="4" rx="1"></rect>
                                                    <rect width="4" height="4" rx="1"></rect>
                                                    <rect width="4" height="4" y="8" rx="1"></rect>
                                                    <rect width="4" height="4" y="16" rx="1"></rect>
                                                    <rect width="4" height="4" x="4" y="12" opacity=".7" rx="1"></rect>
                                                    <rect width="4" height="4" x="4" y="4" opacity=".67" rx="1"></rect>
                                                    <rect width="4" height="4" x="8" opacity=".3" rx="1"></rect>
                                                    <rect width="4" height="4" x="8" y="8" opacity=".3" rx="1"></rect>
                                                    <rect width="4" height="4" x="8" y="16" opacity=".3" rx="1"></rect>
                                                    <rect width="4" height="4" x="12" y="12" opacity=".2" rx="1"></rect>
                                                    <rect width="4" height="4" x="12" y="4" opacity=".2" rx="1"></rect>
                                                    <rect width="4" height="4" x="16" opacity=".1" rx="1"></rect>
                                                    <rect width="4" height="4" x="16" y="8" opacity=".1" rx="1"></rect>
                                                    <rect width="4" height="4" x="16" y="16" opacity=".1" rx="1"></rect>
                                                </svg>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                                            <p className="text-xs">Opacity</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent >
                                <div className="py-2 px-1 flex gap-2 items-center">
                                    <Slider
                                        min={0}
                                        max={100}
                                        value={[opacity]}
                                        onValueChange={(values) => handleOpacityChange(values[0])}
                                        className="w-full"
                                    />
                                    <div className="text-[12px] w-12 text-gray-600">{opacity}</div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {
                            mainStage[selectedIndex]?.selectedShapes.some(e => !e.attrs.draggable) ?
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="sm"
                                                onClick={() => { selectedShapes.length && toggleLock(null, true) }}
                                            >
                                                <Lock
                                                    className="cursor-pointer"
                                                    size={20}
                                                />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                                            <p className="text-xs">Unlock</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                :
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="sm"
                                                onClick={() => { selectedShapes.length && toggleLock(null, false) }}
                                            >
                                                <Unlock
                                                    className="cursor-pointer"
                                                    size={20}
                                                />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                                            <p className="text-xs">Lock</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                        }
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <Trash2
                                            onClick={() => { deleteShape(mainStage, setMainStage, selectedIndex) }}
                                            className="cursor-pointer"
                                            size={20}
                                        />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                                    <p className="text-xs">Delete</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                    </div>
                </div>
            )
            }
        </div >
    )
}
