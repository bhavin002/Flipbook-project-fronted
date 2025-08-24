import { addStage, deleteStage, duplicateStage } from '@/utils/Helper';
import { ChevronsLeft, Copy, File, PanelLeft, Plus, Trash2, X } from 'lucide-react';
import { ReactSortable } from 'react-sortablejs';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { v4 as uuid } from "uuid";

export default function LateralPanelRightPages({ setIsPageShow, isSidebarOpen, setCurrentRightPanel, mainStage, selectedIndex, setSelectedIndex, setIsRightLateralCollapse, setMainStage, index, isExpanded, setIsExpanded }) {
    const toggleBtn = () => {
        setIsExpanded(!isExpanded);
    }

    const handleListChange = (newList) => {
        if (JSON.stringify(mainStage) !== JSON.stringify(newList)) {
            newList.forEach(ele => {
                ele.selectedShapes = [];
                ele.shapes = ele.stageref && ele.stageref.current ? ele.stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) : ele.shapes;
            })
            setMainStage(newList);
        } else {
            console.log("No changes in the list order.");
        }
    };

    const handleDragStart = () => {
        mainStage.forEach(element => {
            const temp = JSON.parse(JSON.stringify(element));
            temp.shapes = element.stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs)))
            temp.shapes.forEach(element => { element.id = uuid() })
            temp.stageref.current = JSON.parse(temp.stageref.current);
            temp.selectedShapes = [];
        });
        setMainStage(mainStage)
    };

    const handleDragEnd = (event) => {
        const newIndex = event.newIndex;
        setSelectedIndex(newIndex);
    };

    const closePanel = (isExpanded) => {
        if (isExpanded) {
            setIsExpanded(false)
        } else {
            setIsRightLateralCollapse(false)
            setCurrentRightPanel('')

        }
        setIsPageShow(null);
    }

    return (
        <div className='flex w-[276px] relative max-lg:border-none border border-gray-200 h-full'>
            <div className={`bg-white flex flex-col lateral-panel-right h-[calc(100%-50px)] border absolute ${isExpanded ? `right-0 ${isSidebarOpen ? 'w-[60vw]' : 'w-[85vw]'} bg-white z-[11] border-r-2 rounded-l-sm transition-all` : 'w-full'}`}>
                <div className="flex items-center justify-between bg-accent p-1 border-b">
                    <button className={`p-1 hover:bg-gray-100 rounded ${isExpanded ? 'rotate-180' : ''}`} onClick={toggleBtn} aria-label="Expand panel">
                        <ChevronsLeft className='w-5 h-5' />
                    </button>
                    <Label className="font-medium text-xs">Pages</Label>
                    <button className="p-1 hover:bg-gray-100 rounded" onClick={() => closePanel(isExpanded)} aria-label="Close panel">
                        <X className='w-5 h-5' />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <ReactSortable
                        className={`p-2 ${isExpanded && 'flex flex-wrap'}`}
                        list={mainStage}
                        setList={handleListChange}
                        animation="200"
                        easing="ease-out"
                        onStart={handleDragStart}
                        onEnd={handleDragEnd}
                    >
                        {mainStage.map((_, index) => (
                            <div
                                key={index}
                                className={`mb-2 p-2 rounded cursor-pointer ${selectedIndex === index && 'selected'}`}

                            >
                                <div className="flex flex-col items-center cursor-move" onClick={() => setSelectedIndex(index)}
                                >
                                    <div className="w-24 h-32 bg-accent flex items-center justify-center">
                                        {index === 0 ? <PanelLeft /> : <File className='w-5 h-5' />}
                                    </div>
                                    <span className="mt-1 text-[11px] font-medium">{index + 1}</span>
                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                </div>

                <div className="border-t border-b p-2">
                    <div className={`flex gap-2 ${isExpanded ? "justify-end" : 'justify-between'}`}>
                        <Button onClick={() => addStage(mainStage, setMainStage, index, setSelectedIndex)}>
                            <Plus />
                        </Button>
                        <Button variant="ghost" onClick={() => duplicateStage(mainStage, setMainStage, index, setSelectedIndex)}>
                            <Copy />
                        </Button>
                        <Button disabled={mainStage.length == 1} variant="ghost" onClick={() => deleteStage(mainStage, setMainStage, index, selectedIndex, setSelectedIndex)}>
                            <Trash2 />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
