import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Trash2, Lock, Unlock, Eye } from "lucide-react";
import { v4 as uuid } from "uuid";
import { deleteShape } from "@/utils/Helper";
export default function TopToolbar({ selectedShape, setMainStage, mainStage, selectedIndex }) {
    const [opacity, setOpacity] = useState(100);
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
        <div className="flex justify-between items-center px-5 py-[6px] bg-white border border-[#d0d0d0]">
            <div className="flex gap-x-3 items-center">
                <div
                    className="w-8 h-8 border-2 border-gray-300 cursor-pointer rounded-md"
                    style={{ backgroundColor: "gray" }}
                ></div>
            </div>
            {selectedShape && selectedShape.length !== 0 && (
                <div className="flex gap-x-3 items-center">
                    <button
                        className="text-[#333] hover:bg-gray-100 px-2 py-1 rounded-md font-[500] text-[13px]"
                        onClick={() => {
                            duplicateShapes();
                        }}
                    >
                        Copy
                    </button>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="text-[#333] hover:bg-gray-100 px-2 py-1 rounded-md font-[500] text-[13px]">
                            Arrange
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="z-[50] w-48 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                        >
                            <DropdownMenuItem>
                                <button
                                    onClick={handleForward}
                                    className="w-full px-4 py-1 text-sm flex text-gray-700 items-center"
                                >
                                    Forward
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <button
                                    onClick={handleBack}
                                    className="w-full px-4 py-1 text-sm flex text-gray-700 items-center"
                                >
                                    Back
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex gap-x-4 items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center cursor-pointer">
                                <Eye className="cursor-pointer" size={20} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="z-[50] w-56 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                            >
                                <div className="p-4 flex gap-1 items-center">
                                    <label className="block font-medium text-gray-700 text-[12px]">
                                        Opacity
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={opacity}
                                        onChange={(e) => handleOpacityChange(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="text-[12px] w-12 text-gray-600">{opacity}</div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {
                            mainStage[selectedIndex]?.selectedShapes.some(e => !e.attrs.draggable) ?
                                <Lock
                                    onClick={() => { selectedShapes.length && toggleLock(null, true) }}
                                    className="cursor-pointer"
                                    size={20}
                                /> :
                                <Unlock
                                    onClick={() => { selectedShapes.length && toggleLock(null, false) }}
                                    className="cursor-pointer"
                                    size={20}
                                />
                        }
                        <button
                            onClick={() => { deleteShape(mainStage, setMainStage, selectedIndex) }}
                            className={`w-auto px-3 py-1 text-gray-600 hover:bg-gray-100 rounded flex items-center justify-center ${selectedShapes.length ? "opacity-100" : "opacity-50"}`}
                        >
                            <Trash2
                                className="cursor-pointer"
                                size={20}
                            />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}