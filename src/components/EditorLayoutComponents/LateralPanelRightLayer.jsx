
import { deleteShape } from '@/utils/Helper';
import { X, Lock, Unlock, Eye, EyeOff, Copy, Files, Trash2, AlignStartHorizontal, AlignCenterHorizontal, AlignEndHorizontal, AlignStartVertical, AlignCenterVertical, AlignEndVertical } from 'lucide-react';
import { ReactSortable } from 'react-sortablejs';
import { useEffect, useState } from 'react';
import { v4 as uuid } from "uuid";

export default function LateralPanelRightLayer({ mainStage, setMainStage, selectedIndex, setIsRightLateralCollapse, isExpanded, setIsExpanded, setSelectedAlignType }) {
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


    const toggleBtn = () => {
        setIsExpanded(!isExpanded);
    }

    const elementIcons = {
        "Link": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15"><path d="M14.306 0C15.386 0 16 .924 16 1.6v7.413h-1.984l-.025-6.356a.642.642 0 0 0-.643-.64L2.645 2.03a.642.642 0 0 0-.64.642v6.711c0 .355.287.642.641.642H10v1.99l-8.413.003C.567 12.017 0 11.19 0 10.413V1.65C0 .941.497.013 1.613.013 6.605.013 8.244.004 11.92.001zm-8.8 5.024l5.038.026a.481.481 0 0 1 .479.481v.989a.481.481 0 0 1-.481.481h-.003l-5.037-.026a.481.481 0 0 1-.479-.481v-.988c0-.266.216-.482.481-.482h.003zm10.424 8.258l-1.421-1.46 1.014-.602a.247.247 0 0 0 .118-.23.245.245 0 0 0-.15-.21l-4.52-1.853a.234.234 0 0 0-.258.054.25.25 0 0 0-.053.264l1.803 4.646a.24.24 0 0 0 .205.154.237.237 0 0 0 .224-.122l.586-1.042 1.42 1.46a.236.236 0 0 0 .339 0l.693-.712a.25.25 0 0 0 0-.347z"></path></svg>`
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

            // mainStage[selectedIndex].stageref.current.children[0].children[1].children = data;
            mainStage[selectedIndex].shapes = data.map(e => JSON.parse(JSON.stringify(e.attrs)));
            // mainStage[selectedIndex].shapes.forEach(element => { element.id = uuid() })
            setMainStage(prevState => {
                const updatedState = [...prevState];
                updatedState[selectedIndex] = {
                    ...updatedState[selectedIndex],
                    // stageref: mainStage[selectedIndex].stageref,
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
                // e.attrs.id = id;
                // shape.id = id;
                mainStage[selectedIndex].stageref.current.children[0].children[1].children[index].setAttr('visible', !e.attrs.visible)
                return true;
            }
        })
        // mainStage[selectedIndex].shapes.find(e => {
        //     if (e.id == shape.id) {
        //         e.visible = !e.visible;
        //         return true;
        //     }
        // })
        // const temp = JSON.parse(JSON.stringify(mainStage[selectedIndex]));
        // temp.shapes = mainStage[selectedIndex].stageref.current.children[0].children[1].children.map(e => e.attrs)
        // temp.shapes.forEach(element => { element.id = uuid() })
        // temp.stageref.current = JSON.parse(temp.stageref.current);
        // temp.selectedShapes = [];
        // const temp = serializationStage(mainStage[selectedIndex]);
        mainStage.splice(selectedIndex, 1, mainStage[selectedIndex]);
        setMainStage([...mainStage]);

        // setMainStage(mainStage);
        // setMainStage(prevState => {
        //     const updatedState = [...prevState];
        //     updatedState[selectedIndex] = {
        //         ...updatedState[selectedIndex],
        //         stageref: mainStage[selectedIndex].stageref,
        //         shapes: mainStage[selectedIndex].shapes
        //     };
        //     return updatedState;
        // });
    }

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
    return (
        <div className='flex w-64 relative border border-gray-200'>
            <div className={`bg-white flex flex-col lateral-panel-right h-[calc(100%-50px)] absolute ${isExpanded ? ' right-0 w-[65vw] bg-white z-[11] border-r-2 rounded-l-sm transition-all' : 'w-full'}`}>
                <div className="flex bg-[#f1f5f9] items-center justify-between p-2 border-b">
                    <div className={`p-1 hover:bg-gray-100 rounded ${isExpanded ? 'rotate-180' : ''}`} aria-label="Expand panel">
                        {/* <KeyboardDoubleArrowLeftIcon style={{ fontSize: '18px' }} /> */}
                    </div>
                    <span className="font-medium text-[13px]">Layers</span>
                    <button className="p-1 hover:bg-gray-100 rounded" onClick={() => { isExpanded ? setIsExpanded(false) : setIsRightLateralCollapse(false) }} aria-label="Close panel">
                        <X />
                    </button>
                </div>

                <div className='flex justify-between px-2 py-4 border-b-2'>
                    <AlignStartHorizontal 
                        onClick={() => { selectedShapes.length && setSelectedAlignType("alignLeft") }} 
                        className={`cursor-pointer ${selectedShapes.length ? "opacity-100" : "opacity-50"}`} 
                        size={20} 
                    />
                    <AlignCenterHorizontal 
                        onClick={() => { selectedShapes.length && setSelectedAlignType("alignMiddle") }} 
                        className={`${selectedShapes.length ? "opacity-100" : "opacity-50"}`} 
                        size={20} 
                    />
                    <AlignEndHorizontal 
                        onClick={() => { selectedShapes.length && setSelectedAlignType("alignRight") }} 
                        className={`${selectedShapes.length ? "opacity-100" : "opacity-50"}`} 
                        size={20} 
                    />
                    <AlignStartVertical 
                        onClick={() => { selectedShapes.length && setSelectedAlignType("alignTop") }} 
                        className={`${selectedShapes.length ? "opacity-100" : "opacity-50"}`} 
                        size={20} 
                    />
                    <AlignCenterVertical 
                        onClick={() => { selectedShapes.length && setSelectedAlignType("alignCenter") }} 
                        className={`${selectedShapes.length ? "opacity-100" : "opacity-50"}`} 
                        size={20} 
                    />
                    <AlignEndVertical 
                        onClick={() => { selectedShapes.length && setSelectedAlignType("alignBottom") }} 
                        className={`${selectedShapes.length ? "opacity-100" : "opacity-50"}`} 
                        size={20} 
                    />
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
                                    <div className='relative'>

                                        <div onClick={() => !isToggle && selectLayer(shape)} className={`flex items-center pl-6 gap-x-1 rounded-[4px] py-[2px] mx-[2px] ${selectedShapes.includes(shape.id) ? "bg-[#0362FC] text-white" : "hover:bg-gray-100"}`}>
                                            <div className={`${selectedShapes.includes(shape.id) && "invert-[1]"}`} dangerouslySetInnerHTML={{ __html: elementIcons[shape.layer] }}></div>
                                            <p className='text-[14px] font-[500]' key={index}>{shape.layer}</p>
                                            <div className='flex grow justify-end pr-2'>
                                            </div>
                                        </div>
                                        <a className={`absolute top-[-1px] right-[35px] ${selectedShapes.includes(shape.id) && "invert-[1]"}`}>
                                            {!shape.draggable &&
                                                <Lock 
                                                    onClick={() => { toggleLock(shape) }} 
                                                    size={20} 
                                                />}
                                        </a>
                                        <a className={`absolute top-[-1px] right-[10px] ${selectedShapes.includes(shape.id) && "invert-[1]"}`}>
                                            {shape.visible ?
                                                <Eye 
                                                    onClick={() => { toggleVisiblity(shape) }} 
                                                    size={20} 
                                                /> :
                                                <EyeOff 
                                                    onClick={() => { toggleVisiblity(shape) }} 
                                                    size={20} 
                                                />}
                                        </a>
                                    </div>

                                )
                            })
                        }
                    </ReactSortable>
                </div>
                <div className="border-t border-b p-2">
                    <div className={`flex ${isExpanded ? "justify-end" : 'justify-between'}`}>
                        <button onClick={() => { duplicateShapes() }} className={`w-auto px-3 py-2 text-gray-600 hover:bg-gray-100 rounded flex items-center justify-center ${selectedShapes.length ? "opacity-100" : "opacity-50"}`}>
                            <Copy size={20} />
                        </button>
                        <button onClick={() => { copyInAllPages() }} className="w-auto px-3 py-2 text-gray-600 hover:bg-gray-100 rounded flex items-center justify-center">
                            <Files className={`${selectedShapes.length ? "opacity-100" : "opacity-50"}`} size={20} />
                        </button>
                        <button className={`w-auto px-3 py-2 text-gray-600 hover:bg-gray-100 rounded flex items-center justify-center ${selectedShapes.length ? "opacity-100" : "opacity-50"}`}>
                            {mainStage[selectedIndex]?.selectedShapes.some(e => !e.attrs.draggable) ?
                                <Lock onClick={() => { selectedShapes.length && toggleLock(null, true) }} size={20} /> :
                                <Unlock onClick={() => { selectedShapes.length && toggleLock(null, false) }} size={20} />}
                        </button>
                        <button onClick={() => { deleteShape(mainStage, setMainStage, selectedIndex) }} className={`w-auto px-3 py-2 text-gray-600 hover:bg-gray-100 rounded flex items-center justify-center ${selectedShapes.length ? "opacity-100" : "opacity-50"}`}>
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
