import { addStage, deleteStage, duplicateStage } from "@/utils/Helper";
import { ChevronDown, ChevronUp, Copy, Plus, Trash2 } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { v4 as uuid } from "uuid";

export default function StagePageMenu({ rectProps, setSelectedIndex, selectedIndex, mainStage, setMainStage, index, setPageCounter, pageCounter }) {
    const onUpStage = () => {
        if (index !== 0) {

            const mainStageCurr = JSON.parse(JSON.stringify(mainStage[index]));
            mainStageCurr.shapes = mainStage[index].stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs)))
            mainStageCurr.shapes.forEach(element => { element.id = uuid() })
            mainStageCurr.stageref.current = JSON.parse(mainStageCurr.stageref.current);
            mainStageCurr.selectedShapes = [];

            const mainStageNext = JSON.parse(JSON.stringify(mainStage[index - 1]));
            mainStageNext.shapes = mainStage[index - 1].stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs)))
            mainStageNext.shapes.forEach(element => { element.id = uuid() })
            mainStageNext.stageref.current = JSON.parse(mainStageNext.stageref.current);
            mainStageNext.selectedShapes = [];

            setSelectedIndex(index - 1);
            setMainStage(prevState => {
                const updatedState = [...prevState];
                updatedState[index] = {
                    ...mainStageNext
                };
                updatedState[index - 1] = {
                    ...mainStageCurr
                };
                return updatedState;
            });

        }
    }

    const onDownStage = () => {
        if (index !== mainStage.length - 1) {
            const mainStageCurr = JSON.parse(JSON.stringify(mainStage[index]));
            mainStageCurr.shapes = mainStage[index].stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs)))
            mainStageCurr.shapes.forEach(element => { element.id = uuid() })
            mainStageCurr.stageref.current = JSON.parse(mainStageCurr.stageref.current);
            mainStageCurr.selectedShapes = [];
            const mainStageNext = JSON.parse(JSON.stringify(mainStage[index + 1]));
            mainStageNext.shapes = mainStage[index + 1].stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs)))
            mainStageNext.shapes.forEach(element => { element.id = uuid() })
            mainStageNext.stageref.current = JSON.parse(mainStageNext.stageref.current);
            mainStageNext.selectedShapes = [];
            const current = mainStageCurr;
            mainStage[index] = mainStageNext;
            mainStage[index + 1] = current;
            setSelectedIndex(index + 1)
            setMainStage(prevState => {
                const updatedState = [...prevState];
                updatedState[index] = {
                    ...mainStageNext
                };
                updatedState[index + 1] = {
                    ...mainStageCurr
                };
                return updatedState;
            });
        }
    }
    return (
        <div className='absolute flex justify-between z-[111]' style={{ width: rectProps.tempWidth, left: rectProps.x, top: (rectProps.y - 30) }}>
            <div className="text-primary font-[500] text-[14px]"><span>Page {index + 1} / {mainStage.length}</span></div>
            <div className="flex gap-x-4 items-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Plus
                                className="w-5 h-5 cursor-pointer hover:text-primary transition-colors duration-200"
                                onClick={() => addStage(mainStage, setMainStage, index, setSelectedIndex)}
                            />
                        </TooltipTrigger>
                        <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                            <p className="text-xs">New page</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <ChevronUp
                                className={`w-5 h-5 cursor-pointer hover:text-primary transition-colors duration-200 topbar-icons-custom ${index === 0 ? "disabled" : ""}`}
                                onClick={() => { onUpStage() }}
                            />
                        </TooltipTrigger>
                        <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                            <p className="text-xs">Move page up</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <ChevronDown
                                className={`w-5 h-5 cursor-pointer hover:text-primary transition-colors duration-200 topbar-icons-custom ${index === mainStage.length - 1 ? "disabled" : ""}`}
                                onClick={() => { onDownStage() }}
                            />
                        </TooltipTrigger>
                        <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                            <p className="text-xs">Move page down</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Copy
                                className="w-5 h-5 cursor-pointer hover:text-primary transition-colors duration-200"
                                onClick={() => duplicateStage(mainStage, setMainStage, index, setSelectedIndex)}
                            />
                        </TooltipTrigger>
                        <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                            <p className="text-xs">Duplicate page</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {mainStage.length > 1 && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Trash2
                                    className="w-5 h-5 cursor-pointer hover:text-primary transition-colors duration-200"
                                    onClick={() => deleteStage(mainStage, setMainStage, index, selectedIndex, setSelectedIndex, setPageCounter, pageCounter)}
                                />
                            </TooltipTrigger>
                            <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                                <p className="text-xs">Delete page</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>
        </div>
    )
}