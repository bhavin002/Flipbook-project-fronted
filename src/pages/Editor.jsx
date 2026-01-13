import { useLocation, useOutletContext } from "react-router-dom";
import StageComponent from "../components/EditorLayoutComponents/StageComponent";
import { useEffect, useRef, useState } from "react";
import TopToolbar from "../components/EditorLayoutComponents/TopToolbar";
import PanelRight from "@/components/EditorLayoutComponents/PanelRight";
import LateralPanelRightPages from "@/components/EditorLayoutComponents/LateralPanelRightPages";
import LateralPanelRightLayer from "@/components/EditorLayoutComponents/LateralPanelRightLayer";
import { BookOpen, Layers, Redo, Undo } from "lucide-react";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { EffectEvent } from "@/utils/EffectEvent";
import { deleteShape, handlePasteShapes } from "@/utils/Helper";
import { Loader } from "@/components/ui/loader";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import "../utils/KonvaImageCrop";

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};
export default function Editor() {
    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const { setIsShapeDrawerOpen, selectedIndex, selectedShape, setSelectedIndex, mainStage, setMainStage, isSidebarOpen, selectedSubMenu, setSelectedSubMenu, isInitialLoad, setIsInitialLoad, isPublishModalOpen, setIsPublishModalOpen, isSavingTemplateInternal, setIsSavingTemplateInternal, pageCounter, setPageCounter, imageLoadCounterPageWise, setImageLoadCounterPageWise, isFormCustomize, isAnyChangeMadeInStage, setIsAnyChangeMadeInStage, stageWidth, stageHeight, flipbookId, setLatestSettings, setLatestJson } = useOutletContext();
    const location = useLocation();
    const autoScroll = useRef([]);

    const parentRef = useRef(null);
    const childRef = useRef(null);
    const [rectProps, setRectProps] = useState({ x: 0, y: 0, size: 0, tempWidth: 0, tempHeight: 0 });
    const [scale, setScale] = useState({ scaleX: 1, scaleY: 1 });
    const [mainStageString, setMainStageString] = useState("");
    const [isCropping, setIsCropping] = useState(false);
    const allowHtmlTypesForCrop = ['stock-photo', 'stock-gif', 'stock-sticker', 'masked-image', 'masked-gif', 'masked-sticker', 'upload-photo'];
    const [selectedAlignType, setSelectedAlignType] = useState("");
    const [isRightLateralCollapse, setIsRightLateralCollapse] = useState(false);
    const [currentRightPanel, setCurrentRightPanel] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [redoStack, setRedoStack] = useState([]); // Stack for redo
    const [zoomper, setZoomper] = useState(50);
    const [isPageShow, setIsPageShow] = useState(null);
    const scrollRef = useRef(null);
    const prevSelectedIndex = usePrevious(selectedIndex);
    const [undoStack, setUndoStack] = useState([]);
    const [isUndoAction, setIsUndoAction] = useState(true); // Stack for redo
    const [isRedoAction, setIsRedoAction] = useState(true); // Stack for redo
    const [isPublishModalOpenInternal, setIsPublishModalOpenInternal] = useState(false); // Stack for redo
    const lastScrollTop = useRef(0);
    const scrollTimeout = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const generateMainStageString = (stages) => {
        // if (isCropping) return;
        return stages
            .map(stage => {
                // stage.shapes = stage.stageref && stage.stageref.curren ? stage.stageref.current?.children[0]?.children[1]?.children
                //     ?.map(child => JSON.stringify(child.attrs)) : []
                //     .join("") || "" :
                return (stage.shapes || []).map(child => JSON.stringify(child)).join("") || "[]"
            })
            .join("" + selectedIndex + "");
    };
    const debouncedUpdate = useRef(
        debounce((newMainStageString) => {
            setMainStageString(newMainStageString);
        }, 300)
    ).current;

    useEffect(() => {
        setUndoStack([{ stages: JSON.parse(JSON.stringify(mainStage)), selectedIndex }]);
        const newMainStageString = generateMainStageString(mainStage);
        debouncedUpdate(newMainStageString);
    }, []);

    useEffect(() => {

        // mainStage[selectedIndex].shapes = mainStage[selectedIndex].stageref && mainStage[selectedIndex].stageref.current &&  mainStage[selectedIndex].stageref.current.children[0].children[1].children.map(e => e.attrs)
        const newMainStageString = generateMainStageString(mainStage);
        if (newMainStageString !== mainStageString) {

            debouncedUpdate(newMainStageString);
            undoStack.length > 1 && setIsAnyChangeMadeInStage(true);
        }
    }, [mainStage]);
    useEffect(() => {
        setTimeout(() => {
            setSelectedIndex(0);
            setPageCounter(0);
            setIsPublishModalOpenInternal(isPublishModalOpen)
        }, isFormCustomize ? 500 : 0);
    }, [isPublishModalOpen]);
    useEffect(() => {
        // ---- Debounce ----
        // const handle = setTimeout(() => {
        //     if (scrollRef.current) {
        //         const container = scrollRef.current;
        //         const containerWidth = container.offsetWidth;
        //         const contentWidth = container.scrollWidth;

        //         // Smooth center scrolling
        //         container.scrollTo({
        //             left: (contentWidth - containerWidth) / 2,
        //             behavior: "smooth"
        //         });
        //     }

        //     // Smooth scroll to selected element
        //     autoScroll.current[selectedIndex]?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "nearest",
        //         inline: "center"
        //     });

        // }, 200); // debounced 150ms for smoothness

        // return () => clearTimeout(handle);
    }, [zoomper, selectedIndex]);


    useEffect(() => {
        if (mainStageString == "") return;
        if (!isUndoAction && !isRedoAction) {
            updateMainStage(mainStage);
        }
        setIsUndoAction(false);
        setIsRedoAction(false);

        // Handel UNDO and REDo max 10 10 state  
    }, [mainStageString]);
    useEffect(() => {
        const handleScroll = () => {
            if (!childRef.current) return;

            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }

            // થોડું delay (e.g. 150ms) પછી actual logic run કરવું
            scrollTimeout.current = setTimeout(() => {
                const totalHeight = childRef.current.scrollHeight;
                const scrollTop = childRef.current.scrollTop;
                const stageHeight = totalHeight / mainStage.length;

                // Direction check
                const direction = scrollTop > lastScrollTop.current ? "down" : "up";
                lastScrollTop.current = scrollTop;

                let index;
                if (direction === "down") {
                    index = Math.floor((scrollTop + stageHeight / 3) / stageHeight);
                } else {
                    index = Math.floor((scrollTop + stageHeight * 0.6) / stageHeight);
                }

                if (index >= 0 && index < mainStage.length && index !== selectedIndex) {
                    setSelectedIndex(index);
                }
            }, 300); // <- delay adjust કરી શકો (150-300ms)
        };

        const refEl = childRef.current;
        if (refEl) {
            refEl.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (refEl) {
                refEl.removeEventListener("scroll", handleScroll);
            }
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, [mainStage.length, selectedIndex]);


    useEffect(() => {
        autoScroll.current[selectedIndex]?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'center'
        });
        if (selectedIndex) {
            // mainStage[prevSelectedIndex].shapes = mainStage[prevSelectedIndex].stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) || []
        }
    }, [selectedIndex])
    const MAX_HISTORY = 100; // Maximum states to store

    // Update mainStage and maintain history
    const updateMainStage = () => {
        const temp = JSON.parse(JSON.stringify(mainStage));
        temp.forEach(stage => {
            // let newObj = typeof (stage.stageref?.current) === 'string' ? JSON.parse(stage.stageref?.current) : stage.stageref?.current;
            // stage.shapes =
            // newObj ? newObj?.children[0]?.children[1]?.children.map(e => JSON.parse(JSON.stringify(e.attrs))) || [] : stage.shapes
            stage.shapes.forEach(element => {
                element.visible = (element.visible == null || element.visible == undefined) ? true : element.visible;
            });
            stage.stageref = null;
            // stage.stageref && (stage.stageref.current = newObj);
            stage.selectedShapes = [];
        })
        // if (!(temp.some(e => e.shapes && e.shapes.length))) return;
        undoStack.push({ stages: temp, selectedIndex });
        if (undoStack.length > MAX_HISTORY) undoStack.shift(); // Keep max 10 states
        setUndoStack(undoStack);

        // Clear redo stack when a new action occurs
        setRedoStack([]);
    };
    const selectAllShapes = (currentStageIndex) => {
        const updatedStage = [...mainStage];
        const currentStage = updatedStage[currentStageIndex];

        // Select all shapes in the current stage
        currentStage.selectedShapes = currentStage.stageref.current
            .children[0]
            .children[1]
            .children.map(node => node);
        setMainStage(updatedStage);

    };
    // Undo functionality
    const handleUndo = () => {
        if (isCropping) return;
        if (undoStack.length === 1) return; // No states to undo
        const temp = JSON.parse(JSON.stringify(mainStage));
        temp.forEach(stage => {
            // let newObj = typeof (stage.stageref?.current) === 'string' ? JSON.parse(stage.stageref?.current) : stage.stageref?.current;
            // stage.shapes = newObj ? newObj?.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) || [] : stage.shapes;
            stage.shapes.forEach(element => {
                element.visible = (element.visible == null || element.visible == undefined) ? true : element.visible;
            });
            stage.stageref = null;
            // stage.stageref = { current: newObj };
            stage.selectedShapes = [];
        })

        const data = undoStack.pop();

        const previousState = undoStack[undoStack.length - 1].stages;
        // setIsChangeStack(false);
        const temp1 = JSON.parse(JSON.stringify(previousState));
        temp1.forEach(stage => {
            // let newObj = typeof (stage.stageref?.current) === 'string' ? JSON.parse(stage.stageref?.current) : stage.stageref?.current
            // stage.shapes = newObj ? newObj?.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) || [] : stage.shapes;
            stage.shapes.forEach(element => {
                element.visible = (element.visible == null || element.visible == undefined) ? true : element.visible;
            });
            stage.stageref = null;
            // stage.stageref = { current: newObj };
            stage.selectedShapes = [];
        })
        temp1.forEach(e => {
            e.shapes.forEach(e => {
                e.id = uuid();
            })
        })
        redoStack.unshift({ stages: temp, selectedIndex: data.selectedIndex });
        setSelectedIndex(undoStack[undoStack.length - 1].selectedIndex)
        setIsUndoAction(true);
        setMainStage(temp1); // Set mainStage to the previous state
        setUndoStack([...undoStack]); // Remove last state from undo stack
        setRedoStack([...redoStack]); // Push current state to redo stack
    };

    // Redo functionality
    const handleRedo = () => {
        if (isCropping) return;
        setIsRedoAction(true);
        if (redoStack.length === 0) return; // No states to redo
        const temp = JSON.parse(JSON.stringify(mainStage));
        temp.forEach(stage => {
            // let newObj = typeof (stage.stageref?.current) === 'string' ? JSON.parse(stage.stageref?.current) : stage.stageref?.current;
            // stage.shapes = newObj ? newObj?.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) || [] : stage.shapes;
            stage.shapes.forEach(element => {
                element.visible = (element.visible == null || element.visible == undefined) ? true : element.visible;
            });
            stage.stageref = null;
            // stage.stageref = { current: newObj };
            stage.selectedShapes = [];
        })
        const temp2 = JSON.parse(JSON.stringify(redoStack[0].stages));
        temp2.forEach(stage => {
            // let newObj = typeof (stage.stageref?.current) === 'string' ? JSON.parse(stage.stageref?.current) : stage.stageref?.current;
            // stage.shapes = newObj ? newObj?.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) || [] : stage.shapes;
            stage.shapes.forEach(element => {
                element.visible = (element.visible == null || element.visible == undefined) ? true : element.visible;
            });
            stage.stageref = null;
            // stage.stageref = { current: newObj };
            stage.selectedShapes = [];
        })
        const nextState = redoStack[0].stages;
        undoStack.push(redoStack[0]);
        setSelectedIndex(redoStack[0].selectedIndex);
        redoStack.shift();

        setRedoStack(redoStack); // Remove first state from redo stack
        setUndoStack(undoStack); // Push current state to undo stack
        setMainStage(temp2); // Set mainStage to the next state
    };

    // Nudge selected shapes with arrow keys by fixed step
    const moveSelectedShapes = (deltaX, deltaY) => {
        if (isCropping) return;
        const stageObj = mainStage[selectedIndex];
        if (!stageObj || !stageObj.selectedShapes || stageObj.selectedShapes.length === 0) return;

        // Move selected Konva nodes
        stageObj.selectedShapes.forEach((node) => {
            if (!node || typeof node.x !== 'function' || typeof node.y !== 'function') return;
            node.x(node.x() + deltaX);
            node.y(node.y() + deltaY);
            if (node.getLayer) {
                const layer = node.getLayer();
                if (layer) layer.batchDraw();
            }
        });

        // Commit immutable shapes array from current Konva nodes so React updates and history tracks
        const konvaChildren = stageObj?.stageref?.current?.children?.[0]?.children?.[1]?.children || [];
        const newShapes = konvaChildren.map((child) => ({ ...child.attrs }));
        const nextMainStage = [...mainStage];
        nextMainStage[selectedIndex] = {
            ...nextMainStage[selectedIndex],
            shapes: newShapes,
        };
        setMainStage(nextMainStage);
    };


    useEffect(() => {
        const handleKeyboardShortcuts = (event) => {
            // Check if the active element is an input, textarea, or other editable element
            const isInputFocused =
                document.activeElement.tagName === 'INPUT' ||
                document.activeElement.tagName === 'TEXTAREA' ||
                document.activeElement.isContentEditable;

            if ((event.ctrlKey || event.metaKey) && !isInputFocused) {
                if (event.key === 'a' || event.key === 'A') {
                    event.preventDefault(); // Prevent default browser select all
                    selectAllShapes(selectedIndex);
                    return;
                }
                if (event.key === 'z' || event.key === 'Z') {
                    event.preventDefault(); // Prevent the default browser undo action
                    handleUndo();
                    return;
                }
                if (event.key === 'y' || event.key === 'Y') {
                    event.preventDefault();
                    handleRedo();
                    return;
                }
                if (event.key === 'c' || event.key === 'C') {
                    event.preventDefault();
                    const stageObj = mainStage[selectedIndex];
                    if (stageObj && stageObj.selectedShapes && stageObj.selectedShapes.length > 0) {
                        const clipboardData = {
                            shapes: stageObj.selectedShapes.map(node => ({ ...node.attrs })),
                            sourceStageIndex: selectedIndex,
                            sourceFlipbookId: location.pathname
                        };
                        localStorage.setItem('flipbook_clipboard', JSON.stringify(clipboardData));
                    }
                    return;
                }
                if (event.key === 'v' || event.key === 'V') {
                    event.preventDefault();
                    const savedClipboard = localStorage.getItem('flipbook_clipboard');
                    if (savedClipboard) {
                        try {
                            const currentClipboard = JSON.parse(savedClipboard);
                            handlePasteShapes(currentClipboard, selectedIndex, setMainStage, setIsLoading, location.pathname);
                        } catch (err) {
                            console.error("Paste error:", err);
                        }
                    }
                    return;
                }
            }

            // Arrow keys to nudge selection by 10 units when not typing
            if (!isInputFocused) {
                const STEP = 1;
                if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    moveSelectedShapes(-STEP, 0);
                } else if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    moveSelectedShapes(STEP, 0);
                } else if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    moveSelectedShapes(0, -STEP);
                } else if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    moveSelectedShapes(0, STEP);
                }
            }
        };

        document.addEventListener('keydown', handleKeyboardShortcuts);
        return () => {
            document.removeEventListener('keydown', handleKeyboardShortcuts);
        };
    }, [handleUndo, handleRedo, selectedIndex, mainStage, setMainStage]);

    // useEffect(() => {
    //     autoScroll.current[selectedIndex].scrollIntoView({
    //         behavior: 'smooth',
    //         block: 'center',
    //     });
    // }, [selectedIndex])

    useEffect(() => {
        const handleDeleteShape = (event) => {
            // Check if the focused element is not an input field or textarea
            if (
                event.key === 'Delete' &&
                document.activeElement.tagName !== 'INPUT' &&
                document.activeElement.tagName !== 'TEXTAREA'
            ) {
                deleteShape(mainStage, setMainStage, selectedIndex);
            }
        };

        // Add event listener to the document
        document.addEventListener('keydown', handleDeleteShape);

        // Cleanup event listener on unmount
        return () => {
            document.removeEventListener('keydown', handleDeleteShape);
        };
    }, [mainStage, setMainStage, selectedIndex]);
    // Add this useEffect hook after your other useEffect hooks (around line 770)
    useEffect(() => {
        let zoomTimeout = null;
        let accumulatedDelta = 0;
        let gestureZoom = null;

        const handleWheel = (e) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const delta = -e.deltaY * 0.15;
                accumulatedDelta += delta;

                clearTimeout(zoomTimeout);
                zoomTimeout = setTimeout(() => {
                    setZoomper((prevZoom) => {
                        let newZoom = prevZoom + accumulatedDelta;
                        newZoom = Math.min(200, Math.max(50, newZoom));
                        return Math.floor(newZoom);
                    });
                    accumulatedDelta = 0;
                }, 10);
            }
        };

        const handleKey = (e) => {
            if (!e.ctrlKey && !e.metaKey) return;

            if (e.key === "0") {
                e.preventDefault();
                setZoomper(50);
                return;
            }

            if (e.key === "=" || e.key === "+") {
                e.preventDefault();
                setZoomper((z) => Math.min(200, z + 10));
                return;
            }

            if (e.key === "-") {
                e.preventDefault();
                setZoomper((z) => Math.max(50, z - 10));
            }
        };

        // 🔥 TOUCHPAD PINCH–ZOOM FIX
        const handleGestureStart = (e) => {
            e.preventDefault();
            gestureZoom = zoomper;
        };

        const handleGestureChange = (e) => {
            e.preventDefault();
            if (gestureZoom == null) return;

            // e.scale → >1 => zoom in, <1 => zoom out
            const zoomValue = gestureZoom * e.scale;
            const safeZoom = Math.min(200, Math.max(50, zoomValue));

            setZoomper(Math.floor(safeZoom));
        };

        const handleGestureEnd = () => {
            gestureZoom = null;
        };

        const container = childRef.current;
        if (container) {
            container.addEventListener("wheel", handleWheel, { passive: false });
            window.addEventListener("keydown", handleKey);

            // 🔥 ADD THESE
            container.addEventListener("gesturestart", handleGestureStart, { passive: false });
            container.addEventListener("gesturechange", handleGestureChange, { passive: false });
            container.addEventListener("gestureend", handleGestureEnd, { passive: false });
        }

        return () => {
            if (container) {
                container.removeEventListener("wheel", handleWheel);
                container.removeEventListener("gesturestart", handleGestureStart);
                container.removeEventListener("gesturechange", handleGestureChange);
                container.removeEventListener("gestureend", handleGestureEnd);
            }
            window.removeEventListener("keydown", handleKey);
            clearTimeout(zoomTimeout);
        };
    }, [childRef]);


    const handleCrop = () => {
        const stage = mainStage[selectedIndex];
        const selectedShape = stage.selectedShapes[0];

        if (stage.selectedShapes.length === 1 && allowHtmlTypesForCrop.includes(selectedShape.attrs.htmlType)) {
            if (selectedShape && selectedShape.getParent()) {
                if (selectedShape?.children?.length) {
                    // Save pre-crop snapshot to allow perfect cancel/restore
                    const container = selectedShape.children[1];
                    let imageNode = container.children[1];
                    // Support for nested structure in StockPhoto (Container -> ClipGroup -> Image)
                    if (imageNode?.getClassName() !== 'Image' && container.children[0]?.children?.[1]?.getClassName() === 'Image') {
                        imageNode = container.children[0].children[1];
                    }
                    try {
                        selectedShape._preCropSnapshot = {
                            selectedAttrs: JSON.parse(JSON.stringify(selectedShape.attrs)),
                            containerAttrs: JSON.parse(JSON.stringify(container.attrs)),
                            imageAttrs: JSON.parse(JSON.stringify(imageNode.attrs)),
                            imageCropTransform: imageNode.getCropTransform ? JSON.parse(JSON.stringify(imageNode.getCropTransform())) : null,
                            labelVisible: selectedShape.children[0]?.visible ? selectedShape.children[0].visible() : true,
                        };
                    } catch (_) {
                        // Fallback shallow save if deep clone fails
                        selectedShape._preCropSnapshot = {
                            selectedAttrs: { ...selectedShape.attrs },
                            containerAttrs: { ...container.attrs },
                            imageAttrs: { ...imageNode.attrs },
                            imageCropTransform: imageNode.getCropTransform ? imageNode.getCropTransform() : null,
                            labelVisible: selectedShape.children[0]?.visible ? selectedShape.children[0].visible() : true,
                        };
                    }
                    selectedShape.children[1].children[0].children[1].cropStart();
                    selectedShape.children[0].visible(false);
                    selectedShape.children[1]?.children[0]?.children[1].visible(false);
                }
                setIsCropping(true);
            }
        }
    };

    const handleCropEnd = () => {
        let x = [];
        const currentStageShapes = mainStage[selectedIndex]?.stageref?.current?.children[0]?.children[1]?.children || [];

        currentStageShapes.forEach((selectedShapeData) => {
            const isSelectedShape = selectedShapeData.attrs.id === mainStage[selectedIndex]?.selectedShapes[0]?.attrs?.id;

            if (isSelectedShape && allowHtmlTypesForCrop.includes(selectedShapeData.attrs.htmlType) && selectedShapeData?.children?.length) {
                const container = selectedShapeData.children[1];
                let imageNode = container.children[1];
                // Support for nested structure in StockPhoto (Container -> ClipGroup -> Image)
                if (imageNode?.getClassName() !== 'Image' && container.children[0]?.children?.[1]?.getClassName() === 'Image') {
                    imageNode = container.children[0].children[1];
                }

                // End crop mode if it's active
                if (imageNode.cropEnd) imageNode.cropEnd();
                if (typeof (imageNode.attrs.cropImage) === 'string') {
                    // If cropImage is string (invalid state?), just push original attrs
                    x.push(selectedShapeData.attrs);
                    return;
                }

                // Store the cropped image
                selectedShapeData.attrs.cropImage = imageNode.attrs.cropImage;

                // Calculate old scales
                const oldX = selectedShapeData.attrs.scaleX || 1;
                const oldY = selectedShapeData.attrs.scaleY || 1;
                const oldScaleX = oldX;
                const oldScaleY = oldY;

                // Adjust position based on inner image
                const isFlipX = selectedShapeData.attrs.flipX;
                const isFlipY = selectedShapeData.attrs.flipY;
                const shapeWidth = selectedShapeData.attrs.width;
                const shapeHeight = selectedShapeData.attrs.height;
                const imgX = imageNode.attrs.x;
                const imgY = imageNode.attrs.y;
                const imgW = imageNode.attrs.width;
                const imgH = imageNode.attrs.height;

                const rotation = selectedShapeData.attrs.rotation || 0;

                // Calculate local offset (unrotated, but scaled)
                let offsetX, offsetY;

                if (isFlipX) {
                    offsetX = (shapeWidth - imgX - imgW) * oldX;
                } else {
                    offsetX = imgX * oldX;
                }

                if (isFlipY) {
                    offsetY = (shapeHeight - imgY - imgH) * oldY;
                } else {
                    offsetY = imgY * oldY;
                }

                // Apply rotation to the local offset vector to get global displacement
                const rad = rotation * (Math.PI / 180);
                const rotatedX = offsetX * Math.cos(rad) - offsetY * Math.sin(rad);
                const rotatedY = offsetX * Math.sin(rad) + offsetY * Math.cos(rad);

                const newX = selectedShapeData.attrs.x + rotatedX;
                const newY = selectedShapeData.attrs.y + rotatedY;

                selectedShapeData.x((newX === undefined || isNaN(newX)) ? selectedShapeData.attrs.x : newX);
                selectedShapeData.y((newY === undefined || isNaN(newY)) ? selectedShapeData.attrs.y : newY);

                // Update container dimensions to match the cropped image size
                // This prevents the transformer from becoming huge by keeping scale consistent (resize behavior)
                selectedShapeData.width(imgW);
                selectedShapeData.height(imgH);

                // Restore original scale (maintain user's zoom level) instead of skewing scale
                selectedShapeData.scaleX(oldX);
                selectedShapeData.scaleY(oldY);

                // Update image node dimensions to fill the new container size
                imageNode.width(imgW);
                imageNode.height(imgH);

                // Recalculate crop image values
                // Since we restored scale to oldScale, the ratio is 1, essentially preserving the crop as-is
                const cropImg = selectedShapeData.attrs.cropImage;
                if (cropImg) {
                    const currentScaleX = selectedShapeData.scaleX() || 1;
                    const currentScaleY = selectedShapeData.scaleY() || 1;

                    cropImg.x(((cropImg.x() || 0) * oldX) / currentScaleX || 0);
                    cropImg.y(((cropImg.y() || 0) * oldY) / currentScaleY || 0);

                    cropImg.scaleX((cropImg.scaleX() || 1) * oldScaleX / currentScaleX);
                    cropImg.scaleY((cropImg.scaleY() || 1) * oldScaleY / currentScaleY);

                    cropImg.width(cropImg.width() * (cropImg.scaleX() || 1));
                    cropImg.height(cropImg.height() * (cropImg.scaleY() || 1));

                    cropImg.scaleX(1);
                    cropImg.scaleY(1);
                }

                // Reset positions and visibility
                imageNode.x(0);
                imageNode.y(0);

                // Correctly position container based on flip state to prevent jumping
                // Flipped groups need to be offset by their width/height to stay in the visible area
                container.x(isFlipX ? imgW : 0);
                container.y(isFlipY ? imgH : 0);

                // Update background/border rect (first child) to match new dimensions
                if (selectedShapeData.children[0]) {
                    selectedShapeData.children[0].width(imgW - 4);
                    selectedShapeData.children[0].height(imgH - 4);
                    selectedShapeData.children[0].visible(true);
                }

                imageNode.visible(true);

                EffectEvent(selectedShapeData.attrs, imageNode);
            }

            x.push(selectedShapeData.attrs);
        });

        mainStage[selectedIndex].shapes = x;

        mainStage.forEach(e => (e.selectedShapes = []));
        setMainStage([...mainStage]);
        setIsCropping(false);
    };

    const handleCropCancel = () => {
        let x = [];
        mainStage[selectedIndex]?.stageref?.current?.children[0]?.children[1]?.children.forEach((selectedShapeData) => {
            if (
                allowHtmlTypesForCrop.includes(selectedShapeData.attrs.htmlType) &&
                selectedShapeData?.children?.length
            ) {
                if (mainStage[selectedIndex].selectedShapes.length && mainStage[selectedIndex].selectedShapes[0].attrs.id !== selectedShapeData.attrs.id) {
                    x.push(selectedShapeData.attrs);
                    return;
                }
                const container = selectedShapeData.children[1];
                let imageNode = container.children[1];
                // Support for nested structure in StockPhoto (Container -> ClipGroup -> Image)
                if (imageNode?.getClassName() !== 'Image' && container.children[0]?.children?.[1]?.getClassName() === 'Image') {
                    imageNode = container.children[0].children[1];
                }

                // End crop mode if it's active
                if (imageNode.cropEnd) imageNode.cropEnd();

                const snap = selectedShapeData._preCropSnapshot;
                if (snap) {
                    selectedShapeData.setAttrs(snap.selectedAttrs || {});
                    container.setAttrs(snap.containerAttrs || {});
                    const preservedImageInstance = imageNode.image && imageNode.image();
                    const imageAttrsToRestore = { ...(snap.imageAttrs || {}) };
                    if ('image' in imageAttrsToRestore) delete imageAttrsToRestore.image;
                    imageNode.setAttrs(imageAttrsToRestore);
                    if (preservedImageInstance) imageNode.image(preservedImageInstance);
                    if (imageNode.setCropTransform) {
                        imageNode.setCropTransform(snap.imageCropTransform || false);
                    }
                    if (selectedShapeData.children[0] && selectedShapeData.children[0].visible) {
                        selectedShapeData.children[0].visible(!!snap.labelVisible);
                    }
                    imageNode.visible(true);
                    if (typeof EffectEvent === 'function') {
                        EffectEvent(selectedShapeData.attrs, imageNode);
                    }

                    delete selectedShapeData._preCropSnapshot;
                } else {
                    if (selectedShapeData.children[0] && selectedShapeData.children[0].visible) {
                        selectedShapeData.children[0].visible(true);
                    }
                    imageNode.visible(true);
                }
                imageNode.width(selectedShapeData.width());
                imageNode.height(selectedShapeData.height());
                selectedShapeData.children[0].visible(true);
                imageNode.visible(true);
            }
            x.push(selectedShapeData.attrs);
        });
        mainStage[selectedIndex].shapes = x;
        mainStage.forEach(e => (e.selectedShapes = []));
        setMainStage([...mainStage]);
        setIsCropping(false);
    }

    return (
        <div className="flex w-full flex-col h-full">
            <TopToolbar setIsShapeDrawerOpen={setIsShapeDrawerOpen} isCropping={isCropping} handleCrop={handleCrop} handleCropEnd={handleCropEnd} handleCropCancel={handleCropCancel} selectedSubMenu={selectedSubMenu} setSelectedSubMenu={setSelectedSubMenu} selectedShape={selectedShape} setMainStage={setMainStage} mainStage={mainStage} selectedIndex={selectedIndex} stageWidth={stageWidth} stageHeight={stageHeight} />
            <div className="flex w-full flex-grow relative">
                {((mainStage.length !== pageCounter - 1) && !isInitialLoad) && <>
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-40 pointer-events-auto" />
                    <div className="absolute top-0 left-0 w-full z-50">
                        <Progress
                            value={(pageCounter / (mainStage.length + 1)) * 100}
                            className="w-full rounded-none h-1 transition-all duration-500 ease-out"
                        />
                    </div>
                </>}
                <div style={{ userSelect: 'none' }} className="flex flex-col overflow-hidden relative flex-grow w-full" >
                    <div style={{
                        position: 'absolute',
                        top: '0px',
                        left: '0px',
                        width: "100%",
                        height: "100%",
                        overflow: "auto",
                    }} ref={childRef}>
                        {/* {mainStage.length !== pageCounter - 1 && <div className="h-full w-full fixed"><Loader /></div>} */}
                        <div ref={parentRef}
                            style={{
                                width: "100%",
                                height: "100%",
                                transformOrigin: "top center",
                                transform: `scale(${zoomper / 50})`,
                                // transition: "transform 0.22s cubic-bezier(0.25, 0.1, 0.25, 1)",
                                willChange: "transform"
                            }}
                            className="relative"
                        >
                            {

                                mainStage.map((stage, index) => {
                                    if (((isPublishModalOpenInternal && index === pageCounter) || (isSavingTemplateInternal && index === pageCounter) || (!isPublishModalOpenInternal && !isSavingTemplateInternal && (index === prevSelectedIndex || index === selectedIndex || index === selectedIndex - 1 || index === selectedIndex + 1)))) {
                                        return (
                                            <div key={index} ref={(el) => (autoScroll.current[index] = el)} style={{ height: "100%", width: "100%" }} className="relative">
                                                <StageComponent imageLoadCounterPageWise={imageLoadCounterPageWise} setImageLoadCounterPageWise={setImageLoadCounterPageWise} prevSelectedIndex={prevSelectedIndex} pageCounter={pageCounter} setPageCounter={setPageCounter} setIsInitialLoad={setIsInitialLoad} zoomper={zoomper} isRightLateralCollapse={isRightLateralCollapse} isCropping={isCropping} stage={stage} parentRef={parentRef} mainStageString={mainStageString} setMainStageString={setMainStageString} rectProps={rectProps} setRectProps={setRectProps} scale={scale} isSelected={selectedIndex === index} setScale={setScale} selectedIndex={selectedIndex} index={index} mainStage={mainStage} setMainStage={setMainStage} setSelectedIndex={setSelectedIndex} selectedAlignType={selectedAlignType} setSelectedAlignType={setSelectedAlignType} isSidebarOpen={isSidebarOpen} setIsAnyChangeMadeInStage={setIsAnyChangeMadeInStage} isPublishModalOpenInternal={isPublishModalOpenInternal} isSavingTemplateInternal={isSavingTemplateInternal} flipbookId={flipbookId} setLatestSettings={setLatestSettings} setLatestJson={setLatestJson} />
                                            </div>
                                        )
                                    } else return (
                                        <div key={index} style={{
                                            height: "100%", width: "100%", transformOrigin: "top center",
                                            transform: `scale(${50 / zoomper})`,
                                        }} className="relative" >
                                            <div className="absolute flex justify-between z-[111] text-primary font-[500] text-[14px]" style={{ width: rectProps.tempWidth, height: rectProps.tempHeight, left: rectProps.x, top: (rectProps.y - 30) }}><span>Page {index + 1} / {mainStage.length}</span></div>
                                            <div className='absolute flex justify-between z-[111] border-2 border-primary' style={{ width: rectProps.tempWidth, height: rectProps.tempHeight, left: rectProps.x, top: (rectProps.y) }}>   <Loader /></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="absolute lg:hidden bottom-[10px] left-[10px] z-10">
                    <div className="flex items-center bg-white rounded-sm border border-gray-200">
                        <Button className="flex items-center border-r" variant="ghost" onClick={() => {
                            setIsPageShow("Pages")
                        }}>
                            <BookOpen className="w-4 h-4" /> Pages
                        </Button>
                        <Button className="flex items-center" variant="ghost" onClick={() => {
                            setIsExpanded(false)
                            setIsPageShow("Layers")
                        }}>
                            <Layers className="w-4 h-4" /> Layers
                        </Button>
                    </div>
                </div>
                <div className="absolute lg:hidden bottom-[10px] right-[10px] z-10">
                    <div className="flex items-center bg-white rounded-sm border border-gray-200">
                        <Button variant="ghost" onClick={handleUndo} disabled={undoStack.length <= 1}>
                            <Undo className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" onClick={handleRedo} disabled={redoStack.length === 0}>
                            <Redo className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                {isPageShow == 'Pages' &&
                    <div className="absolute lg:hidden top-0 right-0 z-10 bottom-0">
                        <LateralPanelRightPages setIsPageShow={setIsPageShow} isSidebarOpen={isSidebarOpen} setCurrentRightPanel={setCurrentRightPanel} mainStage={mainStage} isExpanded={isExpanded} index={selectedIndex} setIsExpanded={setIsExpanded} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} setIsRightLateralCollapse={setIsRightLateralCollapse} setMainStage={setMainStage} />
                    </div>
                }
                {isPageShow == 'Layers' &&
                    <div className="absolute lg:hidden top-0 right-0 z-10 bottom-0">
                        <LateralPanelRightLayer selectedShape={selectedShape} setIsPageShow={setIsPageShow} setCurrentRightPanel={setCurrentRightPanel} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} setSelectedAlignType={setSelectedAlignType} isExpanded={isExpanded} setIsExpanded={setIsExpanded} setIsRightLateralCollapse={setIsRightLateralCollapse} />
                    </div>
                }
                {isRightLateralCollapse && currentRightPanel == 'Pages' &&
                    <LateralPanelRightPages isSidebarOpen={isSidebarOpen} setIsPageShow={setIsPageShow} setCurrentRightPanel={setCurrentRightPanel} mainStage={mainStage} isExpanded={isExpanded} index={selectedIndex} setIsExpanded={setIsExpanded} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} setIsRightLateralCollapse={setIsRightLateralCollapse} setMainStage={setMainStage} />
                }
                {isRightLateralCollapse && currentRightPanel == 'Layers' &&
                    <LateralPanelRightLayer selectedShape={selectedShape} setIsPageShow={setIsPageShow} setCurrentRightPanel={setCurrentRightPanel} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} setSelectedAlignType={setSelectedAlignType} isExpanded={isExpanded} setIsExpanded={setIsExpanded} setIsRightLateralCollapse={setIsRightLateralCollapse} />
                }
                <PanelRight isCropping={isCropping} currentRightPanel={currentRightPanel} setCurrentRightPanel={setCurrentRightPanel} isRightLateralCollapse={isRightLateralCollapse} setIsRightLateralCollapse={setIsRightLateralCollapse} />
                {!isCropping && <div className="fixed flex items-center bottom-[10px] right-[80px] gap-2 max-lg:hidden">
                    <div className="flex items-center bg-white rounded-sm border border-gray-200 ">
                        <Button size="xs" variant="ghost" onClick={handleUndo} disabled={undoStack.length <= 1}>
                            <Undo className="w-4 h-4" />
                        </Button>
                        <Button size="xs" variant="ghost" onClick={handleRedo} disabled={redoStack.length === 0}>
                            <Redo className="w-4 h-4" />
                        </Button>
                    </div>
                    {/* <div className="flex items-center bg-white rounded-sm border border-gray-200">
                        <Button size="xs" variant="ghost" onClick={() => {
                            if (zoomper - 10 >= 50) {
                                setZoomper((zoomper - 10) < 50 ? 50 : zoomper - 10);
                            }
                        }} disabled={zoomper === 50}>
                            <ZoomOut className="w-4 h-4" />
                        </Button>

                        <Label className="text-xs px-2">{zoomper}%</Label>

                        <Button size="xs" variant="ghost" onClick={() => {
                            if (zoomper + 10 <= 200) {
                                setZoomper(zoomper + 10 > 200 ? 200 : zoomper + 10);
                            }
                        }} disabled={zoomper === 200}>
                            <ZoomIn className="w-4 h-4" />
                        </Button>
                    </div> */}
                    <div className="flex items-center bg-white rounded-sm border border-gray-200 px-4 py-[6px] gap-2 w-[200px]">

                        {/* Slider */}
                        <Slider
                            value={[zoomper]}
                            min={50}
                            max={200}
                            step={1}
                            onValueChange={(val) => setZoomper(val[0])}
                            className="w-full cursor-pointer"
                        />

                        {/* Percentage */}
                        <span className="text-black text-sm font-medium">
                            {zoomper}%
                        </span>
                    </div>
                </div>}
                {isLoading && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                        <Loader />
                    </div>
                )}
            </div>
        </div >
    )
}