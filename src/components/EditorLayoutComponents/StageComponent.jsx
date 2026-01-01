import { useEffect, useRef, useState } from "react";
import { Layer, Rect, Stage, Group, Line, Transformer } from "react-konva";
import { v4 as uuid } from "uuid";
import StagePageMenu from "./StagePageMenu";
import ShapeMakerForAll from "./Widget/ShapeMakerForAll";
import MaskedImage from "./Widget/MaskedImage";
import StockPhoto from "./Widget/StockPhoto";
import Tag from "./Widget/Tag";
import EmbedCode from "./Widget/EmbedCode";
import SlideShow from "./Widget/SlideShow";
import VideoButton from "./Widget/VideoButton";
import ShopButton from "./Widget/ShopButton";
import RingShape from "./Widget/RingShape";
import Hyperlink from "./Widget/Hyperlink";
import StockVideo from "./Widget/StockVideo";
import KonavGif from "./Widget/KonvaGif";
import MaskedKonvaGif from "./Widget/MaskedKonvaGif";
import KonvaText from "./Widget/KonvaText";
import UploadPhoto from "./Widget/UploadPhoto";
import { GetPageByIndexApi, GetTemplateApi } from "@/service/template.service";
import ConfirmationDialog from "@/utils/ConfirmationDialog";
import { toast } from "sonner";
import { Loader } from "@/components/ui/loader";

export default function StageComponent({ imageLoadCounterPageWise, setImageLoadCounterPageWise, prevSelectedIndex, isCropping, zoomper, stage, isRightLateralCollapse, parentRef, mainStageString, setMainStageString, mainStage, setMainStage, selectedAlignType, setSelectedAlignType, selectedIndex, index, scale, setScale, rectProps, setRectProps, setSelectedIndex, isSelected, isSidebarOpen, pageCounter, setPageCounter, setIsInitialLoad, setIsAnyChangeMadeInStage, isPublishModalOpenInternal, isSavingTemplateInternal }) {
    // Consistent Refs Initialization
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
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const [isPageModalOpen, setIsPageModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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

    useEffect(() => {
        if (isCropping) return;
        const updateRectSize = () => {
            const parentWidth = parentRef.current?.getBoundingClientRect().width;
            const parentHeight = parentRef.current?.getBoundingClientRect().height;

            if (!parentWidth || !parentHeight) return;

            setWidth(parentWidth);
            setHeight(parentHeight);

            // Calculate the aspect ratio of the mainStage
            const stageAspectRatio = mainStage[0].CANVAS_WIDTH / mainStage[0].CANVAS_HEIGHT;

            // Minimum height constraint
            let newHeight = Math.max(parentHeight, 300);

            // Calculate scaled dimensions based on aspect ratio
            let tempWidth, tempHeight;

            // Check if width or height is the limiting factor
            if (parentWidth / newHeight >= stageAspectRatio) {
                tempHeight = newHeight * (newHeight < 400 ? 0.7 : 0.8);
                tempWidth = tempHeight * stageAspectRatio;
            } else {
                tempWidth = parentWidth * (newHeight < 400 ? 0.8 : 0.8);
                tempHeight = tempWidth / stageAspectRatio;
            }

            // Calculate position to center the canvas
            const x = (parentWidth - tempWidth) / 2;
            const y = (newHeight - tempHeight) / 2;
            const scaleX = tempWidth / mainStage[0].CANVAS_WIDTH;
            const scaleY = tempHeight / mainStage[0].CANVAS_HEIGHT;
            setRectProps({ x, y, size: Math.min(tempWidth, tempHeight), tempWidth, tempHeight });
            setScale({ scaleX, scaleY });
        };
        setTimeout(() => {
            updateRectSize();
        }, 20)
        window.addEventListener("resize", updateRectSize);

        return () => window.removeEventListener("resize", updateRectSize);
    }, [width, height, mainStage, isSidebarOpen, isRightLateralCollapse, zoomper]);

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
                        let offsetX = (child2.offsetX() || 0) * child2.scaleX();
                        let offsetY = (child2.offsetY() || 0) * child2.scaleY();

                        switch (selectedAlignType) {
                            case "alignLeft":
                                child2.attrs.x = 0.001 + offsetX;
                                break;
                            case "alignMiddle":
                                child2.attrs.x = (parentWidth - shapeWidth) / 2 + offsetX;
                                break;
                            case "alignRight":
                                child2.attrs.x = parentWidth - shapeWidth + offsetX;
                                break;
                            case "alignTop":
                                child2.attrs.y = 0.001 + offsetY;
                                break;
                            case "alignBottom":
                                child2.attrs.y = parentHeight - shapeHeight + offsetY;
                                break;
                            case "alignCenter":
                                child2.attrs.y = (parentHeight - shapeHeight) / 2 + offsetY;
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

                const getVisualX = (s) => s.attrs.x - (s.offsetX() || 0) * s.scaleX();
                const getVisualY = (s) => s.attrs.y - (s.offsetY() || 0) * s.scaleY();
                const getVisualWidth = (s) => s.width() * s.scaleX();
                const getVisualHeight = (s) => s.height() * s.scaleY();

                switch (selectedAlignType) {
                    case "alignLeft":
                        const leftmostX = Math.min(...selectedStageShapes.map(shape => getVisualX(shape)));
                        selectedStageShapes.forEach(shape => shape.attrs.x -= leftmostX);
                        break;

                    case "alignRight":
                        const rightmostX = Math.max(...selectedStageShapes.map(shape =>
                            getVisualX(shape) + getVisualWidth(shape)
                        ));
                        selectedStageShapes.forEach(shape => {
                            shape.attrs.x += parentWidth - rightmostX;
                        });
                        break;

                    case "alignMiddle":
                        const minX = Math.min(...selectedStageShapes.map(shape => getVisualX(shape)));
                        const maxX = Math.max(...selectedStageShapes.map(shape =>
                            getVisualX(shape) + getVisualWidth(shape)
                        ));
                        const widthTr = maxX - minX;
                        selectedStageShapes.forEach(shape => {
                            shape.attrs.x += (parentWidth / 2) - minX - (widthTr / 2);
                        });
                        break;

                    case "alignTop":
                        const topY = Math.min(...selectedStageShapes.map(shape => getVisualY(shape)));
                        selectedStageShapes.forEach(shape => shape.attrs.y -= topY);
                        break;

                    case "alignBottom":
                        const bottomY = Math.max(...selectedStageShapes.map(shape =>
                            getVisualY(shape) + getVisualHeight(shape)
                        ));
                        selectedStageShapes.forEach(shape => {
                            shape.attrs.y += parentHeight - bottomY;
                        });
                        break;

                    case "alignCenter":
                        const minY = Math.min(...selectedStageShapes.map(shape => getVisualY(shape)));
                        const maxY = Math.max(...selectedStageShapes.map(shape =>
                            getVisualY(shape) + getVisualHeight(shape)
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
                    stroke: '#8B5CF6',
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
                    stroke: '#8B5CF6',
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
        // if (!e.target.attrs.draggable || e.target === e.target.getStage()) {
        // if (!e.target.attrs.draggable) {
        //     if (e.target === e.target.getStage()) {
        const stage = e.target.getStage();
        const shapes = stage.find('.shape');
        const pos = e.target.getStage().getPointerPosition();
        startPoint.current = pos;
        const selected = shapes.filter((shape) =>
            shape.attrs.draggable && Konva.Util.haveIntersection({
                x: pos.x,
                y: pos.y,
                width: 0,
                height: 0
            }, shape.getClientRect())
        );
        if (selected.length > 0) return;
        setSelecting(true);
        setSelectionRect({
            // visible: true,
            x: pos.x,
            y: pos.y,
            width: 0,
            height: 0
        });
    }
    //     }
    // };

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
        if (!selectionRect.visible || !selectionRect.width || !selectionRect.height) {
            const clickedOnEmpty = e.target === e.target.getStage();
            if (clickedOnEmpty) {
                setSelectionRect({ ...selectionRect, visible: false });
                setMainStage(prevState => {
                    const updatedState = [...prevState];
                    updatedState[index] = {
                        ...updatedState[index],
                        selectedShapes: []
                    };
                    return updatedState;
                });
            }
            return;
        };

        const stage = e.target.getStage();
        const shapes = stage.find('.shape');
        // const shapes = mainStage[index].stageref.current.children[0].children[1].children;
        const box = {
            x: selectionRect.x,
            y: selectionRect.y,
            width: selectionRect.width,
            height: selectionRect.height
        };
        const selected = shapes.filter((shape) =>
            shape.attrs.draggable && Konva.Util.haveIntersection(box, shape.getClientRect())
        );
        // setMainStage(prevState => {
        //     const updatedState = [...prevState];
        //     updatedState[index] = {
        //         ...updatedState[index],
        //         selectedShapes: selected
        //     };
        //     return updatedState;
        // });
        const nextMainStage = [...mainStage];
        nextMainStage[index] = {
            ...nextMainStage[index],
            selectedShapes: selected,
        };
        setTimeout(() => {

            setMainStage(nextMainStage);
            // setSelectedShapes(selected);
            setSelectionRect({ ...selectionRect, visible: false });
        }, 0);
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

    //         }
    //     }
    // }, [stageRef.current]);

    useEffect(() => {
        if (isPublishModalOpenInternal) {
            if (imageLoadCounterPageWise[pageCounter] === undefined) {
                imageLoadCounterPageWise[pageCounter] = 0;
            }
        }
    }, [isPublishModalOpenInternal]);
    useEffect(() => {
        if ((isPublishModalOpenInternal || isSavingTemplateInternal) && imageLoadCounterPageWise[pageCounter] !== undefined && !imageLoadCounterPageWise[pageCounter]) {
            const stage = stageRef.current;
            if (stage) {
                const layers = stage.getLayers();
                if (layers.length > 0) {
                    let a = async () => {
                        setIsInitialLoad(true);
                        const currentShapes = stage.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs)));
                        const thumbnailBlob = await generateThumbnails(stage, pageCounter === 0);

                        setMainStage(prevState => {
                            const updatedState = [...prevState];
                            updatedState[index] = { ...updatedState[index], thumbnails: thumbnailBlob, shapes: currentShapes };
                            return updatedState;
                        });
                        const nextPage = mainStage.length <= (pageCounter + 1) ? pageCounter : pageCounter + 1;
                        setSelectedIndex(nextPage);
                        setPageCounter(nextPage);
                        if (imageLoadCounterPageWise[nextPage] === undefined) {
                            imageLoadCounterPageWise[nextPage] = 0;
                        }
                    }
                    setTimeout(() => {
                        a();
                    }, 100);
                }
            }
        }
    }, [isPublishModalOpenInternal, isSavingTemplateInternal, imageLoadCounterPageWise, pageCounter, stageRef.current]);

    const cloneStageElements = (stage) => {
        const layer = stage.children[0];
        const bg = layer.children[0];
        const target = layer.children[1];

        const targetWidth = target.width() / target.scaleX();
        const targetHeight = target.height() / target.scaleY();

        const clonedNode = target.clone({ x: 0, y: 0, scaleX: 1, scaleY: 1 });
        const clonedBg = bg.clone({
            width: targetWidth,
            height: targetHeight,
            x: 0,
            y: 0
        });

        // Create a new parent group cleanly
        const group = new window.Konva.Group({
            width: targetWidth,
            height: targetHeight,
            x: 0,
            y: 0
        });

        group.add(clonedBg);
        group.add(clonedNode);

        return { group, targetWidth, targetHeight };
    };


    async function generateThumbnails(stage, isFirstPage = false) {
        if (!stage) return null;

        const { group, targetWidth, targetHeight } = cloneStageElements(stage);

        const dataUrl = await group.toDataURL({
            x: 0,
            y: 0,
            width: targetWidth,
            height: targetHeight,
            pixelRatio: isFirstPage ? 1 : 0.4,
            mimeType: "image/jpeg",
            quality: isFirstPage ? 1 : 0.1  // ⭐ 1st page = clear | others compressed
        });

        return await (await fetch(dataUrl)).blob();
    }

    const handleSelectShape = (shape, e) => {
        if (isCropping) return;
        const metaPressed = e && (e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey);

        setMainStage(prevState => {
            const updatedState = [...prevState];
            const currentStage = updatedState[index];
            const currentSelected = currentStage.selectedShapes || [];

            if (metaPressed) {
                const isSelected = currentSelected.includes(shape);
                if (isSelected) {
                    currentStage.selectedShapes = currentSelected.filter(s => s !== shape);
                } else {
                    currentStage.selectedShapes = [...currentSelected, shape];
                }
            } else {
                currentStage.selectedShapes = [shape];
            }
            return updatedState;
        });
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
            return;
        }

        // If propagation wasn't canceled by a widget, handle it here
        handleSelectShape(e.target, e);
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
    };

    const generateMainStageString = (stages) => {
        if (isCropping) return;
        return stages
            .map(stage =>
                // stage.stageref && stage.stageref.current ? stage.stageref.current?.children[0]?.children[1]?.children
                //     ?.map(child => JSON.stringify(child.attrs))
                //     .join("") || "":
                (stage.shapes || []).map(child => JSON.stringify(child)).join("")
            )
            .join("" + selectedIndex + "");
    };

    // (shape align issue in below logic)

    const handleDrag = (e) => {
        if (isCropping) return;
        const layer = e.target.getLayer();
        layer.find('.guid-line').forEach((l) => l.destroy());

        // setMainStage(prevState => {
        //     const updatedState = [...prevState];
        //     updatedState[index] = {
        //         ...updatedState[index],
        //         shapes: 
        //     };
        //     return updatedState;
        // });
        // Read from Konva nodes and commit immutable shapes array so React re-renders
        const konvaChildren = stage.stageref.current.children[0].children[1].children;
        const newShapes = konvaChildren.map((child) => ({ ...child.attrs }));

        const nextMainStage = [...mainStage];
        nextMainStage[index] = {
            ...nextMainStage[index],
            shapes: newShapes,
        };
        setMainStage(nextMainStage);
        setIsAnyChangeMadeInStage(true);
        const newMainStageString = generateMainStageString(nextMainStage);
        setMainStageString(newMainStageString);
    };

    // const handleDrag = (e) => {
    //     if (isCropping) return;
    //     const layer = e.target.getLayer();
    //     layer.find('.guid-line').forEach((l) => l.destroy());
    //     const newMainStageString = generateMainStageString(mainStage);
    //     setMainStageString(newMainStageString);
    // };

    const handleDragStart = (e) => {
        if (isCropping) return;
        const shape = e.target;
        if (stage.selectedShapes.length <= 1) {

            // Ensure the transformer is attached to the shape
            // setMainS 
            if (transformerRef.current) {
                transformerRef.current.nodes([shape]);
                transformerRef.current.getLayer().batchDraw();
            };
            stage.selectedShapes = [shape];
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
            style={{
                width: "100%", height: "100%",
                transformOrigin: "top center",
                // transformOrigin: "0 left",
                transform: `scale(${50 / zoomper})`,

            }}
            className="relative"
            onDrop={async (e) => {
                if (isCropping) return;
                const interval = setInterval(() => {
                    if (mainStage[selectedIndex].dragRect.current === null) return;
                    clearInterval(interval);
                    stage.dragRect.current = mainStage[selectedIndex].dragRect.current;
                    setSelectedIndex(index);
                    e.preventDefault();

                    if (stage.dragRect.current.type === 'drag-template') {
                        setIsTemplateModalOpen(true);
                        return;
                    }

                    if (stage.dragRect.current.type === 'drag-page') {
                        setIsPageModalOpen(true);
                        return;
                    }

                    stage.stageref.current.setPointersPositions(e);
                    const pointerPosition = stage.stageref.current.getPointerPosition();

                    if (stage.dragRect.current) {
                        const dropX = (pointerPosition.x - rectProps.x) / scale.scaleX;
                        const dropY = (pointerPosition.y - rectProps.y) / scale.scaleY;

                        // Check if dropping over a shape-widget or masked-image
                        let isOverShapeWidget = false;
                        let isOverMaskedImage = false;
                        let targetShape = null;
                        let shapeWidgetData = [];

                        mainStage[selectedIndex].stageref.current.children[0].children[1].children.forEach(shape => {
                            const shapeLeft = shape.attrs.x;
                            const shapeRight = shape.attrs.x + (shape.attrs.width * (shape.attrs.scaleX || 1));
                            const shapeTop = shape.attrs.y;
                            const shapeBottom = shape.attrs.y + (shape.attrs.height * (shape.attrs.scaleY || 1));

                            if (dropX >= shapeLeft && dropX <= shapeRight && dropY >= shapeTop && dropY <= shapeBottom) {
                                if (shape.attrs.title === 'shape-widget') {
                                    isOverShapeWidget = true;
                                    targetShape = shape.attrs;
                                    // shapeWidgetData = shape.children[0].dataArray;
                                    shapeWidgetData = shape.children.map(child => child.dataArray ? child.dataArray : null).filter(data => data !== null);
                                } else if (shape.attrs.isMasked && (shape.attrs.title === 'masked-image' || shape.attrs.title === 'masked-gif' || shape.attrs.title === 'masked-sticker')) {
                                    isOverMaskedImage = true;
                                    targetShape = shape.attrs;
                                }
                            }
                        });

                        // Variable to hold the new shape
                        let newShape = null;

                        // Handle the drop
                        if (isOverMaskedImage && (stage.dragRect.current.htmlType === 'stock-photo' || stage.dragRect.current.htmlType === 'stock-gif' || stage.dragRect.current.htmlType === 'stock-sticker' || stage.dragRect.current.htmlType === 'upload-photo')) {
                            // Replace the existing masked-image
                            mainStage[selectedIndex].selectedShapes = [];
                            const htmlType = stage.dragRect.current.htmlType;
                            const typeMapping = {
                                'upload-photo': 'masked-image',
                                'stock-gif': 'masked-gif',
                                'stock-photo': 'masked-image',
                                'stock-sticker': 'masked-sticker'
                            };

                            const layerMapping = {
                                'upload-photo': 'Masked Image',
                                'stock-gif': 'Masked Gif',
                                'stock-photo': 'Masked Image',
                                'stock-sticker': 'Masked Sticker'
                            };

                            const shapeType = typeMapping[htmlType] || 'masked-sticker'; // Default to 'masked-sticker' for unknown types
                            const layerType = layerMapping[htmlType] || 'Masked Sticker';
                            setMainStage(prevState => {
                                const updatedState = [...prevState];
                                const updatedShapes = updatedState[index].shapes.map((shape, idx) => {
                                    if (shape.id !== targetShape.id) return shape;
                                    const shapeNode = updatedState[index].stageref.current.children[0].children[1].children[idx].attrs;
                                    return {
                                        ...shape,
                                        title: shapeType,
                                        layer: layerType,
                                        htmlType: shapeType,
                                        x: shapeNode.x,
                                        y: shapeNode.y,
                                        scaleX: shapeNode.scaleX,
                                        scaleY: shapeNode.scaleY,
                                        width: shapeNode.width,
                                        height: shapeNode.height,
                                        src: stage.dragRect.current.src,
                                        type: 'img',
                                    };
                                });
                                updatedState[index] = {
                                    ...updatedState[index],
                                    shapes: updatedShapes,
                                };
                                return updatedState;
                            });
                        } else if (isOverShapeWidget && targetShape?.isMasked && (stage.dragRect.current.htmlType === 'stock-photo' || stage.dragRect.current.htmlType === 'stock-gif' || stage.dragRect.current.htmlType === 'stock-sticker' || stage.dragRect.current.htmlType === 'upload-photo')) {
                            // Create a new masked-image
                            const htmlType = stage.dragRect.current.htmlType;
                            const typeMapping = {
                                'upload-photo': 'masked-image',
                                'stock-gif': 'masked-gif',
                                'stock-photo': 'masked-image',
                                'stock-sticker': 'masked-sticker'
                            };

                            const layerMapping = {
                                'upload-photo': 'Masked Image',
                                'stock-gif': 'Masked Gif',
                                'stock-photo': 'Masked Image',
                                'stock-sticker': 'Masked Sticker'
                            };

                            const shapeType = typeMapping[htmlType] || 'masked-sticker'; // Default to 'masked-sticker' for unknown types
                            const layerType = layerMapping[htmlType] || 'Masked Sticker';

                            newShape = {
                                src: stage.dragRect.current.src,
                                height: Number(targetShape.height),
                                width: Number(targetShape.width),
                                x: targetShape.x,
                                y: targetShape.y,
                                scaleX: targetShape.scaleX,
                                scaleY: targetShape.scaleY,
                                skewX: targetShape.skewX,
                                skewY: targetShape.skewY,
                                title: shapeType,
                                layer: layerType,
                                htmlType: shapeType,
                                type: 'img',
                                isMasked: true,
                                data: targetShape.data,
                                maskData: shapeWidgetData,
                                maskType: targetShape.maskType,
                                draggable: true,
                                visible: true,
                                id: uuid(),
                            };
                            mainStage[selectedIndex].selectedShapes = [];
                            setMainStage(prevState => {
                                const updatedState = [...prevState];
                                const updatedShapes = updatedState[index].shapes.filter(shape => shape.id !== targetShape.id);
                                updatedState[index] = {
                                    ...updatedState[index],
                                    shapes: [...updatedShapes, newShape],
                                };
                                return updatedState;
                            });
                        } else {
                            // Default case: Add a new shape (non-masked)
                            newShape = {
                                x: dropX,
                                y: dropY,
                                ...stage.dragRect.current,
                                id: uuid(),
                            };

                            setMainStage(prevState => {
                                const updatedState = [...prevState];
                                updatedState[index] = {
                                    ...updatedState[index],
                                    shapes: [...updatedState[index].shapes, newShape],
                                };
                                return updatedState;
                            });
                        }

                        // If a new shape was created, select it after a delay
                        if (newShape) {
                            setTimeout(() => {
                                stage.stageref.current.children[0].children[1].children.forEach((child) => {
                                    if (child.attrs.id === newShape.id) {
                                        setMainStage(prevState => {
                                            const updatedState = [...prevState];
                                            updatedState[index] = {
                                                ...updatedState[index],
                                                selectedShapes: [child],
                                            };
                                            return updatedState;
                                        });
                                    }
                                });
                            }, 100);
                        }

                        stage.dragRect.current = null;
                    }
                }, 500);
                setTimeout(() => {
                    clearInterval(interval);
                }, 4000);
            }}
            onDragOver={(e) => e.preventDefault()}
        >
            <div ref={demo}></div>
            {!((index == selectedIndex || index == selectedIndex - 1 || index == selectedIndex + 1) && width && height) &&
                <>

                    <div className='absolute flex justify-between z-[111] border-2 border-primary' style={{ width: rectProps.tempWidth, height: rectProps.tempHeight, left: rectProps.x, top: (rectProps.y) }}><Loader /></div>
                </>
            }
            {!!(imageLoadCounterPageWise[index]) &&
                <>

                    <div className='absolute flex justify-between z-[111] border-2 border-primary' style={{ width: rectProps.tempWidth, height: rectProps.tempHeight, left: rectProps.x, top: (rectProps.y) }}><Loader /> </div>
                </>

            }


            <StagePageMenu setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex} rectProps={rectProps} mainStage={mainStage} setMainStage={setMainStage} index={index} />
            <ConfirmationDialog
                isConfirmModalOpen={isTemplateModalOpen}
                setIsConfirmModalOpen={setIsTemplateModalOpen}
                title="Apply Template"
                description="Applying a template will replace the content on the current page and will add new pages if needed. Other pages won't be changed."
                isLoading={isLoading}
                onConfirm={async () => {
                    try {
                        setIsLoading(true);
                        const response = await GetTemplateApi(stage.dragRect.current.templateId, false);
                        const validPageData = response.data.pages;
                        const newStageData = validPageData.map(e => JSON.parse(e.pageData));
                        mainStage.forEach(e => {
                            e.shapes = e.stageref && e.stageref.current ? e.stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) : e.shapes;
                        })
                        newStageData.forEach(e => {
                            e.shapes.forEach(shape => {
                                shape.id = uuid();
                            })
                        })
                        mainStage.splice(index, 1, ...newStageData)
                        setMainStage([...mainStage]);
                        stage.dragRect.current = null;
                    } catch (error) {
                        toast.error(error.message || 'Something went wrong');
                    } finally {
                        setIsLoading(false);
                        setIsTemplateModalOpen(false);
                    }
                }}
                onCancel={() => {
                    stage.dragRect.current = null;
                    setIsTemplateModalOpen(false);
                }}
            />
            <ConfirmationDialog
                isConfirmModalOpen={isPageModalOpen}
                setIsConfirmModalOpen={setIsPageModalOpen}
                title="Apply Page"
                description="Applying a page will replace the content on the current page. Other pages won't be changed."
                isLoading={isLoading}
                onConfirm={async () => {
                    try {
                        setIsLoading(true);
                        const response = await GetPageByIndexApi(stage.dragRect.current.templateId, stage.dragRect.current.pageIndex);
                        const newStageData = JSON.parse(response.data.pageData);
                        newStageData.shapes.forEach(shape => {
                            shape.id = uuid();
                        });
                        mainStage.splice(index, 1, newStageData)
                        setMainStage([...mainStage]);
                        stage.dragRect.current = null;
                    } catch (error) {
                        toast.error(error.message || 'Something went wrong');
                    } finally {
                        setIsLoading(false);
                        setIsPageModalOpen(false);
                    }
                }}
                onCancel={() => {
                    stage.dragRect.current = null;
                    setIsPageModalOpen(false);
                }}
            />
            <div onClick={() => setSelectedIndex(index)} >
                {(width && height) ? <Stage
                    // scaleX={zoomper / 50}
                    // scaleY={zoomper / 50}
                    width={width}
                    height={height}
                    style={{ width: "100%", height: "100%" }}
                    ref={stage.stageref}
                    className="#c0c0c080"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onClick={handleClick}
                    onTap={(event) => {
                        handleClick(event);
                    }}
                >
                    <Layer>
                        <Rect
                            x={rectProps.x}
                            y={rectProps.y}
                            width={Math.max(0, rectProps.tempWidth || 0)}
                            height={Math.max(0, rectProps.tempHeight || 0)}
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
                                    case 'hyperlink':
                                        return <Hyperlink onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable setMainStage={setMainStage} selectedIndex={selectedIndex} mainStage={mainStage} mainStageString={mainStageString} setMainStageString={setMainStageString} />;
                                    case 'stock-photo':
                                        return <StockPhoto index={index} imageLoadCounterPageWise={imageLoadCounterPageWise} setImageLoadCounterPageWise={setImageLoadCounterPageWise} isCropping={isCropping} onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable onSelect={handleSelectShape} />
                                    case 'upload-photo':
                                        return <UploadPhoto index={index} imageLoadCounterPageWise={imageLoadCounterPageWise} setImageLoadCounterPageWise={setImageLoadCounterPageWise} isCropping={isCropping} onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable onSelect={handleSelectShape} />
                                    case 'shape-widget':
                                        return <ShapeMakerForAll onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable onSelect={handleSelectShape} />
                                    case 'link-button':
                                        return <StockPhoto index={index} imageLoadCounterPageWise={imageLoadCounterPageWise} setImageLoadCounterPageWise={setImageLoadCounterPageWise} isCropping={isCropping} onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable onSelect={handleSelectShape} />
                                    case 'tag':
                                        return <Tag onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable />;
                                    case 'caption':
                                        return <StockPhoto index={index} imageLoadCounterPageWise={imageLoadCounterPageWise} setImageLoadCounterPageWise={setImageLoadCounterPageWise} isCropping={isCropping} onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable onSelect={handleSelectShape} />
                                    case 'embed-code':
                                        return <EmbedCode index={index} imageLoadCounterPageWise={imageLoadCounterPageWise} setImageLoadCounterPageWise={setImageLoadCounterPageWise} onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable onSelect={handleSelectShape} />;
                                    case 'slideshow':
                                        return <SlideShow index={index} imageLoadCounterPageWise={imageLoadCounterPageWise} setImageLoadCounterPageWise={setImageLoadCounterPageWise} onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable onSelect={handleSelectShape} />;
                                    case 'video-embed':
                                        return <VideoButton index={index} imageLoadCounterPageWise={imageLoadCounterPageWise} setImageLoadCounterPageWise={setImageLoadCounterPageWise} onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable onSelect={handleSelectShape} />
                                    case 'video-button':
                                        return <StockPhoto index={index} imageLoadCounterPageWise={imageLoadCounterPageWise} setImageLoadCounterPageWise={setImageLoadCounterPageWise} isCropping={isCropping} onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable onSelect={handleSelectShape} />
                                    case 'audio-button':
                                        return <StockPhoto index={index} imageLoadCounterPageWise={imageLoadCounterPageWise} setImageLoadCounterPageWise={setImageLoadCounterPageWise} isCropping={isCropping} onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable onSelect={handleSelectShape} />
                                    case 'shop-area':
                                        return <Hyperlink onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable />;
                                    case 'shop-button':
                                        return <ShopButton index={index} imageLoadCounterPageWise={imageLoadCounterPageWise} setImageLoadCounterPageWise={setImageLoadCounterPageWise} onDragMove={handleShapeDragMove} mainStage={mainStage} handleDragStart={handleDragStart} handleDrag={handleDrag} selectedIndex={selectedIndex} key={shape.id} shape={shape} draggable onSelect={handleSelectShape} />;
                                    case 'product-tag':
                                        return <RingShape index={index} imageLoadCounterPageWise={imageLoadCounterPageWise} setImageLoadCounterPageWise={setImageLoadCounterPageWise} onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable onSelect={handleSelectShape} />;
                                    case 'quiz':
                                        return <Hyperlink onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable />
                                    case 'question':
                                        return <Hyperlink onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable />
                                    case 'contact-form':
                                        return <Hyperlink onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable />
                                    case 'page-options':
                                        return <StockPhoto index={index} imageLoadCounterPageWise={imageLoadCounterPageWise} setImageLoadCounterPageWise={setImageLoadCounterPageWise} isCropping={isCropping} onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable onSelect={handleSelectShape} />
                                    case 'go-to-page':
                                        return <StockPhoto index={index} imageLoadCounterPageWise={imageLoadCounterPageWise} setImageLoadCounterPageWise={setImageLoadCounterPageWise} isCropping={isCropping} onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable onSelect={handleSelectShape} />
                                    case 'stock-video':
                                        return <StockVideo index={index} imageLoadCounterPageWise={imageLoadCounterPageWise} setImageLoadCounterPageWise={setImageLoadCounterPageWise} onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handelDrag={handleDrag} shape={shape} draggable onSelect={handleSelectShape} />
                                    case 'stock-gif':
                                        return <KonavGif index={index} imageLoadCounterPageWise={imageLoadCounterPageWise} setImageLoadCounterPageWise={setImageLoadCounterPageWise} onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable onSelect={handleSelectShape} />
                                    case 'stock-sticker':
                                        return <KonavGif index={index} imageLoadCounterPageWise={imageLoadCounterPageWise} setImageLoadCounterPageWise={setImageLoadCounterPageWise} onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable onSelect={handleSelectShape} />
                                    case 'masked-image':
                                        return (
                                            <MaskedImage index={index} imageLoadCounterPageWise={imageLoadCounterPageWise} setImageLoadCounterPageWise={setImageLoadCounterPageWise}
                                                isCropping={isCropping} onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable onSelect={handleSelectShape}
                                            />
                                        );
                                    case 'masked-gif':
                                        return (
                                            <MaskedKonvaGif index={index} imageLoadCounterPageWise={imageLoadCounterPageWise} setImageLoadCounterPageWise={setImageLoadCounterPageWise}
                                                isCropping={isCropping} onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable onSelect={handleSelectShape}
                                            />
                                        );
                                    case 'masked-sticker':
                                        return (
                                            <MaskedKonvaGif index={index} imageLoadCounterPageWise={imageLoadCounterPageWise} setImageLoadCounterPageWise={setImageLoadCounterPageWise}
                                                isCropping={isCropping} onDragMove={handleShapeDragMove} key={shape.id} handleDragStart={handleDragStart} handleDrag={handleDrag} shape={shape} draggable onSelect={handleSelectShape}
                                            />
                                        );
                                    case 'text':
                                        return <KonvaText onDragMove={handleShapeDragMove}
                                            demo={demo}
                                            handleDragStart={handleDragStart}
                                            handleDrag={handleDrag}
                                            scale={scale}
                                            key={shape.id}
                                            shape={shape}
                                            onChange={handleUpdateShape}
                                        />;
                                    default:
                                        return null;
                                }
                            })}
                        </Group>
                        <Rect
                            id="boundary"
                            x={rectProps.x}
                            y={rectProps.y}
                            width={Math.max(0, rectProps.tempWidth || 0)}
                            height={Math.max(0, rectProps.tempHeight || 0)}
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
                            fill="#f3f4f6c4"
                        />
                        {selecting && (
                            <Rect
                                x={selectionRect.x}
                                y={selectionRect.y}
                                width={Math.max(0, selectionRect.width || 0)}
                                height={Math.max(0, selectionRect.height || 0)}
                                fill="rgba(0, 161, 255, 0.3)"
                                stroke="blue"

                                strokeWidth={1}
                            />
                        )}
                        {stage.selectedShapes.length > 0 && !isCropping && (
                            <Transformer
                                ref={transformerRef}
                                rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315]}
                                borderStroke="#8B5CF6"
                                borderStrokeWidth={2}
                                anchorFill="#ffffff"
                                anchorStroke="#A78BFA"
                                anchorStrokeWidth={1}
                                anchorSize={10}
                                anchorCornerRadius={4}
                                rotateAnchorOffset={28}
                                rotateAnchorCursor="grab"
                                onTransformEnd={handleDrag}
                                onDragMove={(event) => handleDragMove(event, 'transform')}
                                keepRatio={['link-area', 'shop-area', 'quiz', 'question', 'contact-form'].includes(stage.selectedShapes[0]?.attrs.htmlType) ? false : true}
                                rotationSnapTolerance={stage.selectedShapes[0]?.attrs.htmlType === 'tag' ? false : undefined}
                                flipEnabled={false}
                                enabledAnchors={
                                    stage.selectedShapes[0]?.attrs.htmlType === 'shop-button' ? ['top-left', 'top-right', 'bottom-left', 'bottom-right'] : undefined
                                }

                                boundBoxFunc={(oldBox, newBox) => {
                                    if (stage.selectedShapes[0]?.attrs.type === 'text') {
                                        if (newBox.width < 10 || newBox.height < 10) return oldBox;
                                    }
                                    return newBox;
                                }}
                            />

                        )}
                    </Layer>
                </Stage> : ''}
            </div>
        </div >

    )
}