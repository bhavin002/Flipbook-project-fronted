
import { deleteShape } from '@/utils/Helper';
import { X, Lock, Unlock, Eye, EyeOff, Copy, Files, Trash2, AlignStartHorizontal, AlignCenterHorizontal, AlignEndHorizontal, AlignStartVertical, AlignCenterVertical, AlignEndVertical, ChevronsLeft, AlignVerticalJustifyCenter, SquareMousePointer } from 'lucide-react';
import { ReactSortable } from 'react-sortablejs';
import { useEffect, useState } from 'react';
import { v4 as uuid } from "uuid";
import { Label } from '../ui/label';
import { Button } from '../ui/button';

export default function LateralPanelRightLayer({ setCurrentRightPanel, mainStage, setMainStage, selectedIndex, setIsRightLateralCollapse, isExpanded, setIsExpanded, setSelectedAlignType }) {
    const [shapes, setShapes] = useState([]);
    const [isToggle, setIsToggle] = useState(false);
    const selectedShapes = mainStage[selectedIndex]?.selectedShapes.map(e => e.attrs).map(e => e.id);
    useEffect(() => {
        setTimeout(() => {
            const temp = mainStage[selectedIndex];
            const tempShapes = temp?.stageref?.current?.children[0]?.children[1]?.children.map(e => e.attrs);
            tempShapes.reverse();
            setShapes(tempShapes);
        }, 100);
        setIsToggle(false);
    }, [mainStage])

    const elementIcons = {
        "Link": <SquareMousePointer className='w-4 h-4' />
    }
    const selectLayer = (shape) => {
        if (isToggle) {
            return;
        }
        setMainStage(prevState => {
            const updatedState = [...prevState];
            updatedState[selectedIndex] = {
                ...updatedState[selectedIndex],
                selectedShapes: [mainStage[selectedIndex].stageref.current.children[0].children[1].children.find(e => e.attrs.id == shape.id)]
            };
            return updatedState;
        });
    }

    const handleListChange = (newList) => {
        if (JSON.stringify(shapes) !== JSON.stringify(newList)) {
            const data = [];
            newList.reverse()
            newList.forEach(element => {
                data.push(mainStage[selectedIndex].stageref.current.children[0].children[1].children.find(e => e.attrs.id == element.id));
            });
            mainStage[selectedIndex].shapes = data.map(e => JSON.parse(JSON.stringify(e.attrs)));
            setMainStage(prevState => {
                const updatedState = [...prevState];
                updatedState[selectedIndex] = {
                    ...updatedState[selectedIndex],
                    shapes: mainStage[selectedIndex].shapes,
                };
                return updatedState;
            });
            newList.reverse();
            setShapes(newList);
        } else {
            console.log("No changes in the list order.");
        }
    };
    const toggleVisiblity = (shape) => {
        setIsToggle(true);
        mainStage[selectedIndex].stageref.current.children[0].children[1].children.find((e, index) => {
            if (e.attrs.id == shape.id) {
                mainStage[selectedIndex].stageref.current.children[0].children[1].children[index].setAttr('visible', !e.attrs.visible)
                return true;
            }
        })
        mainStage.splice(selectedIndex, 1, mainStage[selectedIndex]);
        setMainStage([...mainStage]);
    }

    const toggleLock = (shape = null, idDraggable = true) => {
        if (shape) {
            mainStage[selectedIndex].stageref.current.children[0].children[1].children.find((e, index) => {
                if (e.attrs.id == shape.id) {
                    mainStage[selectedIndex].stageref.current.children[0].children[1].children[index].setAttr('draggable', idDraggable)
                    return true;
                }
            })
            mainStage[selectedIndex].shapes = mainStage[selectedIndex].stageref.current.children[0].children[1].children.map((e) =>
                JSON.parse(JSON.stringify(e.attrs))
            );
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
            mainStage[selectedIndex].shapes = mainStage[selectedIndex].stageref.current.children[0].children[1].children.map((e) =>
                JSON.parse(JSON.stringify(e.attrs))
            );
            mainStage[selectedIndex].selectedShapes = [...mainStage[selectedIndex].selectedShapes];
            mainStage.splice(selectedIndex, 1, mainStage[selectedIndex]);
            setMainStage([...mainStage]);
        }
    }

    const duplicateShapes = () => {
        const tempShapes = mainStage[selectedIndex].stageref.current.children[0].children[1].children.filter((e, index) => selectedShapes.includes(e.attrs.id)).map(e => e.attrs);
        const newShapes = tempShapes.map((e) => {
            const newID = uuid();
            return {
                ...e,
                id: newID,
                x: e.x,
                y: e.y,
            }
        })
        mainStage[selectedIndex].shapes = mainStage[selectedIndex].stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs)));
        newShapes.forEach((e) => {
            let index = mainStage[selectedIndex].shapes.findIndex(shape => shape.id == e.id);
            mainStage[selectedIndex].shapes.splice(index, 0, e);
        })
        mainStage[selectedIndex].shapes.find((e, index) => {
            if (selectedShapes.includes(e.id)) {
                // e.id = uuid();
                e.x += 30;
                e.y += 30;
            }
        })
        mainStage.splice(selectedIndex, 1, mainStage[selectedIndex]);
        setMainStage([...mainStage]);
    }

    const copyInAllPages = () => {
        const tempSelectedShapes = mainStage[selectedIndex].selectedShapes;

        mainStage.forEach((element, index) => {
            if (selectedIndex !== index) {
                tempSelectedShapes.forEach(shape => {
                    element.shapes.push({
                        ...shape.attrs,
                        id: uuid(),
                    })
                })
            }
        });

        setMainStage([...mainStage]);
    }

    const closePanel = (isExpanded) => {
        if (isExpanded) {
            setIsExpanded(false)
        } else {
            setIsRightLateralCollapse(false)
            setCurrentRightPanel(false)
        }
    }

    return (
        <div className='flex w-[276px] relative border border-gray-200'>
            <div className={`bg-white flex flex-col lateral-panel-right h-[calc(100%-50px)] absolute ${isExpanded ? ' right-0 w-[65vw] bg-white z-[11] border-r-2 rounded-l-sm transition-all' : 'w-full'}`}>
                <div className="flex bg-accent items-center justify-between p-1 border-b">
                    <div className={`p-1 hover:bg-gray-100 rounded`} aria-label="Expand panel">
                        <ChevronsLeft className='w-5 h-5 text-accent' />
                    </div>
                    <Label className="font-medium text-xs">Layers</Label>
                    <button className="p-1 hover:bg-gray-100 rounded" onClick={() => closePanel(isExpanded)} aria-label="Close panel">
                        <X className='w-5 h-5' />
                    </button>
                </div>

                <div className='flex justify-between px-1 py-1 border-b-2'>
                    <Button onClick={() => { selectedShapes.length && setSelectedAlignType("alignLeft") }} size="xs" variant="ghost" className={`${!selectedShapes.length ? "hover:text-black" : ""}`}>
                        <AlignStartVertical className={`h-4 w-4 cursor-pointer ${selectedShapes.length ? "opacity-100" : "opacity-50"}`} />
                    </Button>
                    <Button onClick={() => { selectedShapes.length && setSelectedAlignType("alignMiddle") }} size="xs" variant="ghost" className={`${!selectedShapes.length ? "hover:text-black" : ""}`}>
                        <AlignVerticalJustifyCenter className={`h-4 w-4 ${selectedShapes.length ? "opacity-100" : "opacity-50"}`} />
                    </Button>
                    <Button onClick={() => { selectedShapes.length && setSelectedAlignType("alignRight") }} size="xs" variant="ghost" className={`${!selectedShapes.length ? "hover:text-black" : ""}`}>
                        <AlignEndVertical className={`h-4 w-4 ${selectedShapes.length ? "opacity-100" : "opacity-50"}`} />
                    </Button>
                    <Button onClick={() => { selectedShapes.length && setSelectedAlignType("alignTop") }} size="xs" variant="ghost" className={`${!selectedShapes.length ? "hover:text-black" : ""}`}>
                        <AlignStartHorizontal className={`h-4 w-4 ${selectedShapes.length ? "opacity-100" : "opacity-50"}`} />
                    </Button>
                    <Button onClick={() => { selectedShapes.length && setSelectedAlignType("alignCenter") }} size="xs" variant="ghost" className={`${!selectedShapes.length ? "hover:text-black" : ""}`}>
                        <AlignCenterHorizontal className={`h-4 w-4 ${selectedShapes.length ? "opacity-100" : "opacity-50"}`} />
                    </Button>
                    <Button onClick={() => { selectedShapes.length && setSelectedAlignType("alignBottom") }} size="xs" variant="ghost" className={`${!selectedShapes.length ? "hover:text-black" : ""}`}>
                        <AlignEndHorizontal className={`h-4 w-4 ${selectedShapes.length ? "opacity-100" : "opacity-50"}`} />
                    </Button>
                </div>
                <div className='cursor-pointer flex-1 overflow-y-auto'>
                    <ReactSortable
                        className={`p-2 ${isExpanded && 'flex flex-wrap'}`}
                        list={shapes}
                        setList={handleListChange}
                        animation="200"
                        easing="ease-out"
                    >
                        {
                            shapes.map((shape, index) => {
                                return (
                                    <div onClick={() => !isToggle && selectLayer(shape)} className={`flex px-2 justify-between rounded-[4px] py-[2px] ${selectedShapes.includes(shape.id) ? "bg-primary text-white" : "hover:bg-gray-100"}`}>
                                        <div className='flex items-center gap-1'>
                                            {elementIcons[shape.layer]}
                                            <p className='text-[14px] font-[500]' key={index}>{shape.layer}</p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            {!shape.draggable &&
                                                <Lock
                                                    className='w-4 h-4'
                                                    onClick={() => { toggleLock(shape) }}
                                                />}
                                            {shape.visible ?
                                                <Eye
                                                    className='w-4 h-4'
                                                    onClick={() => { toggleVisiblity(shape) }}
                                                /> :
                                                <EyeOff
                                                    className='w-4 h-4'
                                                    onClick={() => { toggleVisiblity(shape) }}
                                                />}
                                        </div>


                                    </div>

                                )
                            })
                        }
                    </ReactSortable>
                </div>
                <div className="border-t border-b p-2">
                    <div className="flex justify-between">
                        <Button size="sm" variant="ghost" disabled={!selectedShapes.length} onClick={() => { duplicateShapes() }}>
                            <Copy className='h-4 w-4' />
                        </Button>
                        <Button size="sm" variant="ghost" disabled={!selectedShapes.length} onClick={() => { copyInAllPages() }}>
                            <Files className='h-4 w-4' />
                        </Button>
                        {mainStage[selectedIndex]?.shapes.some(e => !e.draggable) ?
                            <Button onClick={() => { selectedShapes.length && toggleLock(null, true) }} size="sm" variant="ghost" disabled={!selectedShapes.length}>
                                <Lock className='h-4 w-4' />
                            </Button> :
                            <Button onClick={() => { selectedShapes.length && toggleLock(null, false) }} size="sm" variant="ghost" disabled={!selectedShapes.length}>
                                <Unlock className='h-4 w-4' />
                            </Button>
                        }
                        <Button size="sm" variant="ghost" disabled={!selectedShapes.length} onClick={() => { deleteShape(mainStage, setMainStage, selectedIndex) }}>
                            <Trash2 className='h-4 w-4' />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
