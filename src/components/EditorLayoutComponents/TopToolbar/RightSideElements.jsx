import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, Lock, Unlock, BringToFront, SendToBack } from "lucide-react";
import { deleteShape, duplicateShapes } from "@/utils/Helper";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FieldMappingApi } from '@/service/productCatalog.service';
import { toast } from 'sonner';

export default function RightSideElements({ selectedShape, setMainStage, mainStage, selectedIndex, setSelectedSubMenu }) {
    const [opacity, setOpacity] = useState(30);
    const selectedShapes = mainStage[selectedIndex]?.selectedShapes.map(e => e.attrs).map(e => e.id);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [fieldMappingData, setFieldMappingData] = useState([]);

    useEffect(() => {
        if (selectedShape && selectedShape.length) {
            const shape = mainStage[selectedIndex].shapes.find(e => e.id === selectedShape[0].attrs.id);
            if (shape?.opacity == undefined) {
                setOpacity(Math.floor((1 * 100)));
            } else {
                shape?.opacity && setOpacity(Math.floor(((shape?.opacity || 1) * 100)));
            }
        }
    }, [mainStage, selectedShape]);

    const location = useLocation();
    const pathname = location.pathname.split("/")[1];

    const toggleLock = (shape = null, idDraggable = true) => {
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
        setOpacity(value);
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

    const handleForward = () => {
        const selectedShapes = mainStage[selectedIndex]?.selectedShapes.map((e) => e.attrs.id);
        if (!selectedShapes?.length) return;
        const shapes = mainStage[selectedIndex].shapes;
        for (let i = shapes.length - 2; i >= 0; i--) {
            if (selectedShapes.includes(shapes[i].id)) {
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
        for (let i = 1; i < shapes.length; i++) {
            if (selectedShapes.includes(shapes[i].id)) {
                [shapes[i - 1], shapes[i]] = [shapes[i], shapes[i - 1]];
            }
        }
        const updatedStage = [...mainStage];
        updatedStage[selectedIndex].shapes = shapes;
        setMainStage(updatedStage);
    };

    const setFieldName = (fieldId) => {
        if (selectedShape?.length) {
            const updatedShapes = mainStage[selectedIndex]?.shapes.map((shape) => {
                if (selectedShape.some((s) => s.attrs.id === shape.id)) {
                    return { ...shape, fieldName: fieldId };
                }
                return shape;
            });
            const updatedStage = [...mainStage];
            updatedStage[selectedIndex].shapes = updatedShapes;
            setMainStage(updatedStage);
        }
    };

    useEffect(() => {
        const GetFieldMapping = async () => {
            try {
                setIsFetching(true);
                const response = await FieldMappingApi();
                console.log("response ??", response.data);
                setFieldMappingData(response.data || []);
            } catch (error) {
                toast.error("Failed to get field mapping", {
                    description: error.message || "Oops! Something went wrong."
                })
            } finally {
                setIsFetching(false);
            }
        }
        if (pathname == "admin-editor") {
            GetFieldMapping();
        }
    }, []);

    

    return (
        <div className="flex items-center">
            {pathname == "admin-editor" && (
                isFetching ? (
                    <Skeleton className="h-10 w-[200px]" />
                ) : (
                    <Select
                        value={selectedShape?.[0]?.attrs?.fieldName || ""}
                        onValueChange={setFieldName}
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select Field Name" />
                        </SelectTrigger>
                        <SelectContent>
                            {fieldMappingData.map((field) => (
                                <SelectItem key={field._id} value={field._id}>
                                    {field.fieldName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )
            )}
            

            {selectedShape && selectedShape.length == 1 && ["shape-widget", "stock-photo", "stock-sticker", "stock-gif", "upload-photo"].includes(selectedShape[0].attrs.title) && <Button variant="ghost" size="sm" onClick={() => setSelectedSubMenu(selectedShape[0].attrs.sidebar)}>
                Action
            </Button>}
            <Button variant="ghost" size="sm" disabled={isLoading} onClick={() => {
                duplicateShapes(mainStage, selectedIndex, setMainStage, setIsLoading, selectedShape);
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
                            <Button onClick={() => { deleteShape(mainStage, setMainStage, selectedIndex) }} variant="ghost" size="sm">
                                <Trash2
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