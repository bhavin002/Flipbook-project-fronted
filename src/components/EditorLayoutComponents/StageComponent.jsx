import { useEffect, useRef, useState } from "react";
import { Layer, Rect, Stage, Group, Line, Transformer } from "react-konva";
import { v4 as uuid } from "uuid";
import LinkArea from "../../pages/widget/LinkArea";
import StagePageMenu from "./StagePageMenu";

export default function StageComponent({ isCropping, stage, isRightLateralCollapse, parentRef, mainStageString, setMainStageString, mainStage, setMainStage, selectedAlignType, setSelectedAlignType, selectedIndex, index, scale, setScale, rectProps, setRectProps, setSelectedIndex, isSelected, isSidebarOpen }) {
    // Consistent Refs Initialization
    // console.log("stage.selectedShapes.length" , stage.selectedShapes.length);

    const stageRef = useRef(null);
    const demo = useRef(null);
    const dragRect = useRef(null);
    const dragImg = useRef(null);
    const transformerRef = useRef(null);
    const startPoint = useRef({ x: 0, y: 0 });

    // State Hooks
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [selecting, setSelecting] = useState(false);
    const [selectionRect, setSelectionRect] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        visible: false
    });

    // Constants
    const GUIDELINE_OFFSET = 5;

    // Update stage references
    useEffect(() => {
        // Mutate stage object with refs
        stage.stageref = stageRef;
        stage.dragRect = dragRect;
        stage.dragImg = dragImg;
    }, [stage]);

    // Width and Height Detection Effect
    useEffect(() => {
        const updateWidth = () => {
            if (parentRef.current) {
                const newWidth = parentRef.current.getBoundingClientRect().width;
                const newHeight = parentRef.current.getBoundingClientRect().height;
                setWidth(newWidth);
                setHeight(newHeight);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, [parentRef]);

    // Rect Size and Scale Calculation Effect
    // useEffect(() => {
    //     const updateRectSize = () => {
    //         if (!width || !height) return;

    //         const size = Math.min(width, height) * 0.8;
    //         let tempWidth = 0;
    //         let tempHeight = 0;
    //         height * 0.8 == size ?
    //             (tempWidth = mainStage[0].CANVAS_WIDTH * size / mainStage[0].CANVAS_HEIGHT) :
    //             (tempHeight = mainStage[0].CANVAS_HEIGHT * size / mainStage[0].CANVAS_WIDTH);

    //         tempWidth == 0 ? tempWidth = size : tempHeight = size;

    //         const x = (width / 2 - tempWidth / 2);
    //         const y = (height - tempHeight) / 2;
    //         const scaleY = tempHeight / mainStage[0].CANVAS_HEIGHT;
    //         const scaleX = tempWidth / mainStage[0].CANVAS_WIDTH;
    //         setRectProps({ x, y, size, tempWidth, tempHeight });
    //         setScale({ scaleX, scaleY });
    //     };

    //     if (index === 0) {
    //         setTimeout(updateRectSize, 20);
    //     }
    // }, [width, height, toggleLateral, isRightLateralCollapse]);

    useEffect(() => {
        if (isCropping) return;
        const updateRectSize = () => {
            setWidth(parentRef.current?.getBoundingClientRect().width);
            setHeight(parentRef.current?.getBoundingClientRect().height)
            if (!width || !height) return;
            const size = Math.min(width, height) * 0.8;
            let tempWidth = 0;
            let tempHeight = 0;
            height * 0.8 == size ?
                (tempWidth = mainStage[0].CANVAS_WIDTH * size / mainStage[0].CANVAS_HEIGHT) :
                (tempHeight = mainStage[0].CANVAS_HEIGHT * size / mainStage[0].CANVAS_WIDTH);

            tempWidth == 0 ? tempWidth = size : tempHeight = size;

            const x = (width / 2 - tempWidth / 2);
            const y = (height - tempHeight) / 2;
            const scaleY = tempHeight / mainStage[0].CANVAS_HEIGHT;
            const scaleX = tempWidth / mainStage[0].CANVAS_WIDTH;
            setRectProps({ x, y, size, tempWidth, tempHeight });
            setScale({ scaleX, scaleY });
        };
        // if (index == 0) {
        setTimeout(() => {
            updateRectSize();
        }, 20)
        // }
        window.addEventListener("resize", updateRectSize);

        return () => window.removeEventListener("resize", updateRectSize);
    }, [width, height, mainStage, isSidebarOpen,isRightLateralCollapse]);

    // Clear Selected Shapes Effect
    useEffect(() => {
        if (isCropping) return;
        if (selectedIndex !== index) {
            setMainStage(prevState => {
                const updatedState = [...prevState];
                updatedState[index] = {
                    ...updatedState[index],
                    selectedShapes: []
                };
                return updatedState;
            });
        }
    }, [selectedIndex]);


    useEffect(() => {
        if (isCropping) return;
        if (!selectedAlignType) {
            return;
        }
        let x = 0;
        let y = 0;
        if (stage.selectedShapes && stage.selectedShapes.length == 0) return;
        const mapShapeIds = stage.selectedShapes.map(e => e.attrs.id);
        if (mapShapeIds.length == 1) {
            stage.stageref?.current.children.forEach(child1 => {
                child1.children[1].children.forEach(child2 => {
                    if (mapShapeIds.includes(child2.attrs.id)) {
                        let parentWidth = child1.children[1].width() / child1.children[1].scaleX();
                        let shapeWidth = child2.width() * child2.scaleX();
                        let parentHeight = child1.children[1].height() / child1.children[1].scaleY();
                        let shapeHeight = child2.height() * child2.scaleY();

                        switch (selectedAlignType) {
                            case "alignLeft":
                                child2.attrs.x = 0.001;
                                break;
                            case "alignMiddle":
                                child2.attrs.x = (parentWidth - shapeWidth) / 2;
                                break;
                            case "alignRight":
                                child2.attrs.x = parentWidth - shapeWidth;
                                break;
                            case "alignTop":
                                child2.attrs.y = 0.001;
                                break;
                            case "alignBottom":
                                child2.attrs.y = parentHeight - shapeHeight;
                                break;
                            case "alignCenter":
                                child2.attrs.y = (parentHeight - shapeHeight) / 2;
                                break;
                            default:
                                break;
                        }
                        // Store new position values
                        x = child2.attrs.x;
                        y = child2.attrs.y;
                    }
                });
            });

            // Update positions for shapes in main stage
            stage.shapes.forEach(e => {
                if (mapShapeIds.includes(e.id)) {
                    e.x = Number(Number(x).toFixed(2)) + 0.01;
                    e.y = Number(Number(y).toFixed(2)) + 0.01;
                }
            });
            mainStage.splice(index, 1, stage);
            setMainStage([...mainStage]);
        } else {
            stage.stageref?.current.children.forEach(child1 => {
                // Filter selected shapes in this stage
                const selectedStageShapes = child1.children[1].children.filter(child2 =>
                    mapShapeIds.includes(child2.attrs.id)
                );

                if (selectedStageShapes.length <= 1) return;

                // Get common parent dimensions
                let parentWidth = child1.children[1].width() / child1.children[1].scaleX();
                let parentHeight = child1.children[1].height() / child1.children[1].scaleY();

                switch (selectedAlignType) {
                    case "alignLeft":
                        const leftmostX = Math.min(...selectedStageShapes.map(shape => shape.attrs.x));
                        selectedStageShapes.forEach(shape => shape.attrs.x -= leftmostX);
                        break;

                    case "alignRight":
                        const rightmostX = Math.max(...selectedStageShapes.map(shape =>
                            (shape.attrs.x + (shape.width() * shape.scaleX()))
                        ));
                        selectedStageShapes.forEach(shape => {
                            shape.attrs.x += parentWidth - rightmostX;
                        });
                        break;

                    case "alignMiddle":
                        const minX = Math.min(...selectedStageShapes.map(shape => shape.attrs.x));
                        const maxX = Math.max(...selectedStageShapes.map(shape =>
                            (shape.attrs.x + (shape.width() * shape.scaleX()))
                        ));
                        const widthTr = maxX - minX;
                        selectedStageShapes.forEach(shape => {
                            shape.attrs.x += (parentWidth / 2) - minX - (widthTr / 2);
                        });
                        break;

                    case "alignTop":
                        const topY = Math.min(...selectedStageShapes.map(shape => shape.attrs.y));
                        selectedStageShapes.forEach(shape => shape.attrs.y -= topY);
                        break;

                    case "alignBottom":
                        const bottomY = Math.max(...selectedStageShapes.map(shape =>
                            shape.attrs.y + (shape.height() * shape.scaleY())
                        ));
                        selectedStageShapes.forEach(shape => {
                            shape.attrs.y += parentHeight - bottomY;
                        });
                        break;

                    case "alignCenter":
                        const minY = Math.min(...selectedStageShapes.map(shape => shape.attrs.y));
                        const maxY = Math.max(...selectedStageShapes.map(shape =>
                            (shape.attrs.y + (shape.height() * shape.scaleY()))
                        ));
                        const heightTr = maxY - minY;
                        selectedStageShapes.forEach(shape => {
                            shape.attrs.y += (parentHeight / 2) - minY - (heightTr / 2);
                        });
                        break;

                    default:
                        break;
                }
            });

            // Update positions for shapes in main stage
            stage.shapes.forEach(e => {
                const matchingShape = stage.stageref?.current.children[0].children[1].children.find(
                    child => child.attrs.id === e.id
                );
                if (matchingShape && mapShapeIds.includes(e.id)) {
                    e.x = Number(matchingShape.attrs.x.toFixed(2)) + 0.01;
                    e.y = Number(matchingShape.attrs.y.toFixed(2)) + 0.01;
                }
            });

            // Update main stage state
            mainStage.splice(index, 1, stage);
            setMainStage([...mainStage]);
        }
        setSelectedAlignType(null)

    }, [selectedAlignType]);

    useEffect(() => {
        if (isCropping) return;
        if (transformerRef.current) {
            transformerRef.current.nodes(stage.selectedShapes);
            transformerRef.current?.getLayer()?.batchDraw();
            if (stage.selectedShapes.some(e => !e.attrs.draggable)) {
                transformerRef.current.resizeEnabled(false)
                transformerRef.current.rotateEnabled(false)
            } else {
                transformerRef.current.resizeEnabled(true)
                transformerRef.current.rotateEnabled(true)
            }

            // transformerRef.current.enabledAnchors([]);
        }
    }, [stage.selectedShapes]);


    // new code 
    const getLineGuideStops = (skipShape, stageref) => {
        if (isCropping) return;
        // Stage boundaries
        const vertical = [rectProps.x, stageref.width() / 2, rectProps.tempWidth + rectProps.x];
        const horizontal = [rectProps.y, stageref.height() / 2, rectProps.tempHeight + rectProps.y];

        // Get the group containing the shapes
        const group = stageref.children[0].children[1];
        group.children.forEach((guideItem) => {
            if (stage.selectedShapes.map((data) => data.attrs.id).includes(guideItem.attrs.id)) {
                return;
            }

            // if (guideItem === skipShape) {
            //     return;
            // }
            const box = guideItem.getClientRect();
            vertical.push(box.x, box.x + box.width, box.x + box.width / 2);
            horizontal.push(box.y, box.y + box.height, box.y + box.height / 2);
        });

        return {
            vertical: vertical.flat(),
            horizontal: horizontal.flat(),
        };
    };

    const getObjectSnappingEdges = (node) => {
        if (isCropping) return;
        const box = node.getClientRect();
        const absPos = node.absolutePosition();

        return {
            vertical: [
                {
                    guide: Math.round(box.x),
                    offset: Math.round(absPos.x - box.x),
                    snap: 'start',
                },
                {
                    guide: Math.round(box.x + box.width / 2),
                    offset: Math.round(absPos.x - box.x - box.width / 2),
                    snap: 'center',
                },
                {
                    guide: Math.round(box.x + box.width),
                    offset: Math.round(absPos.x - box.x - box.width),
                    snap: 'end',
                },
            ],
            horizontal: [
                {
                    guide: Math.round(box.y),
                    offset: Math.round(absPos.y - box.y),
                    snap: 'start',
                },
                {
                    guide: Math.round(box.y + box.height / 2),
                    offset: Math.round(absPos.y - box.y - box.height / 2),
                    snap: 'center',
                },
                {
                    guide: Math.round(box.y + box.height),
                    offset: Math.round(absPos.y - box.y - box.height),
                    snap: 'end',
                },
            ],
        };
    };

    const getGuides = (lineGuideStops, itemBounds) => {
        if (isCropping) return;
        const resultV = [];
        const resultH = [];

        lineGuideStops.vertical.forEach((lineGuide) => {
            itemBounds.vertical.forEach((itemBound) => {
                const diff = Math.abs(lineGuide - itemBound.guide);
                if (diff < GUIDELINE_OFFSET) {
                    resultV.push({
                        lineGuide: lineGuide,
                        diff: diff,
                        snap: itemBound.snap,
                        offset: itemBound.offset,
                    });
                }
            });
        });

        lineGuideStops.horizontal.forEach((lineGuide) => {
            itemBounds.horizontal.forEach((itemBound) => {
                const diff = Math.abs(lineGuide - itemBound.guide);
                if (diff < GUIDELINE_OFFSET) {
                    resultH.push({
                        lineGuide: lineGuide,
                        diff: diff,
                        snap: itemBound.snap,
                        offset: itemBound.offset,
                    });
                }
            });
        });

        const guides = [];
        const minV = resultV.sort((a, b) => a.diff - b.diff)[0];
        const minH = resultH.sort((a, b) => a.diff - b.diff)[0];

        if (minV) {
            guides.push({
                lineGuide: minV.lineGuide,
                offset: minV.offset,
                orientation: 'V',
                snap: minV.snap,
            });
        }
        if (minH) {
            guides.push({
                lineGuide: minH.lineGuide,
                offset: minH.offset,
                orientation: 'H',
                snap: minH.snap,
            });
        }
        return guides;
    };

    const drawGuides = (guides, layer) => {
        if (isCropping) return;
        guides.forEach((lg) => {
            if (lg.orientation === 'H') {
                const line = new Konva.Line({
                    points: [-6000, 0, 6000, 0],
                    stroke: 'rgb(0, 161, 255)',
                    strokeWidth: 1,
                    name: 'guid-line',
                    dash: [4, 6],
                });
                layer.add(line);
                line.absolutePosition({
                    x: 0,
                    y: lg.lineGuide,
                });
            } else if (lg.orientation === 'V') {
                const line = new Konva.Line({
                    points: [0, -6000, 0, 6000],
                    stroke: 'rgb(0, 161, 255)',
                    strokeWidth: 1,
                    name: 'guid-line',
                    dash: [4, 6],
                });
                layer.add(line);
                line.absolutePosition({
                    x: lg.lineGuide,
                    y: 0,
                });
            }
        });
    };

    const handleMouseDown = (e) => {
        if (isCropping) return;
        if (e.target === e.target.getStage()) {
            const pos = e.target.getStage().getPointerPosition();
            startPoint.current = pos;
            setSelecting(true);
            setSelectionRect({
                visible: true,
                x: pos.x,
                y: pos.y,
                width: 0,
                height: 0
            });
        }
    };

    const handleMouseMove = (e) => {
        if (isCropping) return;
        if (!selecting) return;

        const pos = e.target.getStage().getPointerPosition();
        setSelectionRect({
            visible: true,
            x: Math.min(pos.x, startPoint.current.x),
            y: Math.min(pos.y, startPoint.current.y),
            width: Math.abs(pos.x - startPoint.current.x),
            height: Math.abs(pos.y - startPoint.current.y)
        });
    };

    const handleMouseUp = (e) => {
        if (isCropping) return;
        setSelecting(false);
        if (!selectionRect.visible) return;

        const stage = e.target.getStage();
        const shapes = stage.find('.shape');
        const box = {
            x: selectionRect.x,
            y: selectionRect.y,
            width: selectionRect.width,
            height: selectionRect.height
        };
        const selected = shapes.filter((shape) =>
            Konva.Util.haveIntersection(box, shape.getClientRect())
        );
        setMainStage(prevState => {
            const updatedState = [...prevState];
            updatedState[index] = {
                ...updatedState[index],
                selectedShapes: selected
            };
            return updatedState;
        });
        // setSelectedShapes(selected);
        setSelectionRect({ ...selectionRect, visible: false });
    };

    const handleDragMove = (e, type) => {
        if (isCropping) return;

        const layer = type === 'drag' ? e.target.getLayer() : e.target.children[0].getLayer();
        layer.find('.guid-line').forEach((l) => l.destroy());

        const targetNode = type === 'drag' ? e.target : e.target.children[0];

        if (type === 'drag') {

            // Drag-specific logic
            const lineGuideStops = getLineGuideStops(targetNode, stage.stageref.current);
            const itemBounds = getObjectSnappingEdges(targetNode);
            const guides = getGuides(lineGuideStops, itemBounds);

            if (!guides.length) {
                return;
            }

            drawGuides(guides, layer);

            const absPos = targetNode.absolutePosition();
            const originalPos = { ...absPos };

            guides.forEach((lg) => {
                switch (lg.orientation) {
                    case 'V':
                        absPos.x = lg.lineGuide + lg.offset;
                        break;
                    case 'H':
                        absPos.y = lg.lineGuide + lg.offset;
                        break;
                }
            });

            // Apply position only to the dragged shape
            targetNode.absolutePosition(absPos);
            layer.batchDraw();

        } else if (type === 'transform') {
            // Transform-specific logic
            const lineGuideStops = getLineGuideStops(targetNode, stage.stageref.current);
            const itemBounds = getObjectSnappingEdges(targetNode);
            const guides = getGuides(lineGuideStops, itemBounds);

            if (!guides.length) {
                return;
            }

            drawGuides(guides, layer);

            const absPos = targetNode.absolutePosition();
            const originalPos = { ...absPos };

            guides.forEach((lg) => {
                switch (lg.orientation) {
                    case 'V':
                        absPos.snapX = lg.snap;
                        absPos.x = lg.lineGuide + lg.offset;
                        break;
                    case 'H':
                        absPos.snapY = lg.snap;
                        absPos.y = lg.lineGuide + lg.offset;
                        break;
                }
            });

            const diff = {
                x: originalPos.x - absPos.x,
                y: originalPos.y - absPos.y
            };

            // Apply to all selected shapes during transform
            stage.selectedShapes.forEach((child) => {
                let childData = child.absolutePosition();
                child.absolutePosition({
                    x: childData.x - diff.x + (absPos.snapX === 'start' ? -1 : absPos.snapX === 'end' ? 1 : 0),
                    y: childData.y - diff.y + (absPos.snapY === 'start' ? -1 : absPos.snapY === 'end' ? 1 : 0)
                });
                child.getLayer().batchDraw();
            });
        }
    };

    const handleClick = (e) => {
        if (isCropping) return;
        if (selectionRect.visible) return;

        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setMainStage(prevState => {
                const updatedState = [...prevState];
                updatedState[index] = {
                    ...updatedState[index],
                    selectedShapes: []
                };
                return updatedState;
            });
            // setSelectedShapes([]);
            return;
        }

        const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
        const isSelected = stage.selectedShapes.includes(e.target);

        if (!metaPressed && !isSelected) {
            setMainStage(prevState => {
                const updatedState = [...prevState];
                updatedState[index] = {
                    ...updatedState[index],
                    selectedShapes: [e.target]
                };
                return updatedState;
            });
            // setSelectedShapes([e.target]);
        } else if (metaPressed && isSelected) {
            setMainStage(prevState => {
                const updatedState = [...prevState];
                updatedState[index] = {
                    ...updatedState[index],
                    selectedShapes: stage.selectedShapes.filter(shape => shape !== e.target)
                };
                return updatedState;
            });
            // setSelectedShapes(selectedShapes.filter(shape => shape !== e.target));
        } else if (metaPressed && !isSelected) {
            setMainStage(prevState => {
                const updatedState = [...prevState];
                updatedState[index] = {
                    ...updatedState[index],
                    selectedShapes: [...stage.selectedShapes, e.target]
                };
                return updatedState;
            });
            // setSelectedShapes([...selectedShapes, e.target]);
        }

    };

    const handleSelectShape = (shape) => {
        if (isCropping) return;
        setMainStage(prevState => {
            const updatedState = [...prevState];
            updatedState[index] = {
                ...updatedState[index],
                selectedShapes: [shape]
            };
            return updatedState;
        });
    };

    const handleUpdateShape = (updatedShape) => {
        if (isCropping) return;
        stage.shapes = stage.shapes.map((shape) =>
            shape.id === updatedShape.id ? updatedShape : shape
        )
        setMainStage(prevState => {
            const updatedState = [...prevState];
            updatedState[index] = {
                ...updatedState[index],
                shapes: stage.shapes
            };
            return updatedState;
        });

        // setShapes((prevShapes) =>
        //   prevShapes.map((shape) =>
        //     shape.id === updatedShape.id ? updatedShape : shape
        //   )
        // );
    };

    const generateMainStageString = (stages) => {
        if (isCropping) return;
        return stages
            .map(stage =>
                stage.stageref.current?.children[0]?.children[1]?.children
                    ?.map(child => JSON.stringify(child.attrs))
                    .join("") || ""
            )
            .join("");
    };

    const handleDrag = (e) => {
        if (isCropping) return;
        console.log(selectedIndex);
        const layer = e.target.getLayer();
        layer.find('.guid-line').forEach((l) => l.destroy());
        const newMainStageString = generateMainStageString(mainStage);
        setMainStageString(newMainStageString);
    };

    const handleDragStart = (e) => {
        if (isCropping) return;
        const shape = e.target;
        if (stage.selectedShapes.length <= 1) {

            setMainStage(prevState => {
                const updatedState = [...prevState];
                updatedState[index] = {
                    ...updatedState[index],
                    selectedShapes: [shape]
                };
                return updatedState;
            })
            // Ensure the transformer is attached to the shape
            if (transformerRef.current) {
                transformerRef.current.nodes([shape]);
                transformerRef.current.getLayer().batchDraw();
            };
        }

    };

    const handleShapeDragMove = (e) => {
        if (isCropping) return;
        if (stage.selectedShapes.length > 1) return
        // Call handleDragMove with 'drag' type
        handleDragMove(e, 'drag');
    };

    return (
        <div
            // minHeight: "90vh"
            style={{ width: "100%", height: "100%" }}

            className="relative"
            onDrop={(e) => {
                console.log("onDrop", mainStage[selectedIndex]);
                if (isCropping) return;
                stage.dragRect.current = mainStage[selectedIndex].dragRect.current;
                setSelectedIndex(index);
                e.preventDefault();
                stage.stageref.current.setPointersPositions(e);
                const pointerPosition = stage.stageref.current.getPointerPosition();

                if (stage.dragRect.current) {
                    const dropX = (pointerPosition.x - rectProps.x) / scale.scaleX;
                    const dropY = (pointerPosition.y - rectProps.y) / scale.scaleY;

                    // Check if dropping over a shape-widget
                    let isOverShapeWidget = false;
                    let shapeWidget = null;
                    let shapeWidgetData = [];

                    mainStage[selectedIndex].stageref.current.children[0].children[1].children.forEach(shape => {
                        // shape = shape.attrs;
                        if (shape.attrs.title === 'shape-widget') {
                            const shapeLeft = shape.attrs.x;
                            const shapeTop = shape.attrs.y;
                            const shapeRight = shape.attrs.x + (shape.attrs.width * (shape.attrs.scaleX || 1));
                            const shapeBottom = shape.attrs.y + (shape.attrs.height * (shape.attrs.scaleY || 1));

                            // Check if drop position is within shape-widget bounds
                            if (dropX >= shapeLeft && dropX <= shapeRight &&
                                dropY >= shapeTop && dropY <= shapeBottom) {
                                isOverShapeWidget = true;
                                shapeWidget = shape.attrs;
                                shapeWidgetData = shape.children[0].dataArray;
                            }
                        }
                    });

                    let newShape = {
                        x: dropX,
                        y: dropY,
                        ...stage.dragRect.current,
                        id: uuid()
                    };

                    // If dropping stock-photo or upload-photo over shape-widget, convert to masked-image
                    if (isOverShapeWidget && shapeWidget?.isMasked &&
                        (stage.dragRect.current.htmlType === 'stock-photo' ||
                            stage.dragRect.current.htmlType === 'upload-photo')) {
                        newShape = {
                            src: newShape.src,
                            height: Number(shapeWidget.height),
                            width: Number(shapeWidget.width),
                            x: shapeWidget.x,
                            y: shapeWidget.y,
                            scaleX: shapeWidget.scaleX,
                            scaleY: shapeWidget.scaleY,
                            skewX: shapeWidget.skewX,
                            skewY: shapeWidget.skewY,
                            title: 'masked-image',
                            layer: "masked-image",
                            htmlType: 'masked-image',
                            type: "img",
                            // svgPath: shapeWidget.data[0],
                            data: shapeWidget.data,
                            maskData: shapeWidgetData,
                            maskType: shapeWidget.maskType,
                            draggable: true,
                            visible: true,
                            id: uuid() // Ensure unique ID for new masked-image
                        };

                        // Update mainStage by removing the shape-widget and adding the new masked-image
                        mainStage[selectedIndex].selectedShapes = [];
                        setMainStage(prevState => {
                            const updatedState = [...prevState];
                            // Remove the shape-widget that was converted
                            const updatedShapes = updatedState[index].shapes.filter(
                                shape => shape.id !== shapeWidget.id
                            );
                            // Add the new masked-image
                            updatedState[index] = {
                                ...updatedState[index],
                                shapes: [...updatedShapes, newShape]
                            };
                            return updatedState;
                        });
                    } else {
                        // If not converting to masked-image, just add the new shape as before
                        setMainStage(prevState => {
                            const updatedState = [...prevState];
                            updatedState[index] = {
                                ...updatedState[index],
                                shapes: [...updatedState[index].shapes, newShape]
                            };
                            return updatedState;
                        });
                    }

                    stage.dragRect.current = null;
                }
            }}
            onDragOver={(e) => e.preventDefault()}
        >
            <div ref={demo}></div>
            <StagePageMenu setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex} rectProps={rectProps} mainStage={mainStage} setMainStage={setMainStage} index={index} />
            <div onClick={() => { setSelectedIndex(index) }}>
                {width && height && <Stage
                    width={width}
                    height={height}
                    style={{ width: "100%", height: "100%" }}
                    ref={stage.stageref}
                    className="#c0c0c080"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onClick={handleClick}
                >
                    <Layer>
                        <Rect
                            x={rectProps.x}
                            y={rectProps.y}
                            width={rectProps.tempWidth}
                            height={rectProps.tempHeight}
                            fill={stage.background}
                            listening={false}
                        />
                        <Group
                            x={rectProps.x}
                            y={rectProps.y}
                            fill={stage.background}
                            width={rectProps.tempWidth}
                            height={rectProps.tempHeight}
                            scaleX={scale.scaleX}
                            scaleY={scale.scaleY}
                            zIndex={1}
                            id={uuid()}
                        >
                            {stage.shapes.map((shape) => {
                                switch (shape.title) {
                                    case 'link-tags':
                                        return <LinkArea onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable setMainStage={setMainStage} selectedIndex={selectedIndex} mainStage={mainStage} mainStageString={mainStageString} setMainStageString={setMainStageString} />;
                                    default:
                                        return null;
                                }
                            })}
                        </Group>
                        <Rect
                            id="boundary"
                            x={rectProps.x}
                            y={rectProps.y}
                            width={rectProps.tempWidth}
                            height={rectProps.tempHeight}
                            stroke={isSelected ? "#7b39ed" : "#999"}
                            strokeWidth={2}
                            // fill={stage.background}
                            shadowBlur={5}
                            shadowColor="rgba(0,0,0,0.2)"
                            listening={false}
                        />
                        <Line
                            name="workspace-background"
                            points={[
                                0, 0,
                                width, 0,
                                width, height,
                                0, height,
                                0, 0,
                                rectProps.x, rectProps.y,
                                rectProps.x, rectProps.y + rectProps.tempHeight,
                                rectProps.x + rectProps.tempWidth, rectProps.y + rectProps.tempHeight,
                                rectProps.x + rectProps.tempWidth, rectProps.y,
                                rectProps.x, rectProps.y,
                            ]}
                            listening={false}
                            closed={true}
                            fill="#c0c0c090"
                        />
                        {selecting && (
                            <Rect
                                x={selectionRect.x}
                                y={selectionRect.y}
                                width={selectionRect.width}
                                height={selectionRect.height}
                                fill="rgba(0, 161, 255, 0.3)"
                                stroke="blue"

                                strokeWidth={1}
                            />
                        )}
                        {stage.selectedShapes.length > 0 && (
                            <Transformer
                                ref={transformerRef}
                                onTransformEnd={handleDrag}
                                onDragMove={(event) => handleDragMove(event, 'transform')}
                                boundBoxFunc={(oldBox, newBox) => {
                                    const minSize = stage.selectedShapes[0]?.attrs.type === 'text' ? 30 : 50;
                                    if (newBox.width < minSize || newBox.height < (stage.selectedShapes[0]?.attrs.type === 'text' ? 10 : 50)) {
                                        return oldBox;
                                    }
                                    return newBox;
                                }}
                                enabledAnchors={
                                    stage.selectedShapes[0]?.attrs.type === 'text'
                                        ? ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'middle-left', 'middle-right']
                                        : undefined
                                }
                                rotationSnapTolerance={stage.selectedShapes[0]?.attrs.htmlType === 'tag' ? false : undefined}
                                keepRatio={false}
                                flipEnabled={false}
                            />
                        )}
                    </Layer>
                </Stage>}
            </div>
        </div>
    )
}