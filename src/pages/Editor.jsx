import { useOutletContext } from "react-router-dom";
import StageComponent from "../components/EditorLayoutComponents/StageComponent";
import { useEffect, useRef, useState } from "react";
import TopToolbar from "../components/EditorLayoutComponents/TopToolbar";
import PanelRight from "@/components/EditorLayoutComponents/PanelRight";
import LateralPanelRightPages from "@/components/EditorLayoutComponents/LateralPanelRightPages";
import LateralPanelRightLayer from "@/components/EditorLayoutComponents/LateralPanelRightLayer";
import { BookOpen, Check, Crop, Layers, Redo, Undo, ZoomIn, ZoomOut } from "lucide-react";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Konva from 'konva';
import { EffectEvent } from "@/utils/EffectEvent";
import { deleteShape } from "@/utils/Helper";

(function (Konva) {
    'use strict';

    /**
     * Performs QR decomposition on a 2D transformation matrix.
     * @param {Array} a - The transformation matrix.
     * @returns {Object} - The decomposed transformation properties.
     */
    function qrDecompose(a) {
        let angle = Math.atan2(a[1], a[0]),
            denom = Math.pow(a[0], 2) + Math.pow(a[1], 2),
            scaleX = Math.sqrt(denom),
            scaleY = (a[0] * a[3] - a[2] * a[1]) / scaleX;
        return { rotation: angle / (Math.PI / 180), scaleX, scaleY, x: a[4], y: a[5] };
    }

    /**
     * Calculates the coordinates of an object relative to a group.
     * @param {Konva.Node} object - The object to calculate coordinates for.
     * @param {Konva.Group} group - The group to which the coordinates are relative.
     * @returns {Object} - The decomposed transformation properties.
     */
    function getGroupCoords(object, group) {
        let mB = object.getAbsoluteTransform().getMatrix();
        let mX = group.getAbsoluteTransform().getMatrix();

        let M = mB[0], N = mB[1], O = mB[2], P = mB[3], R = mB[4], S = mB[5],
            A = mX[0], B = mX[1], C = mX[2], D = mX[3], E = mX[4], F = mX[5],
            AD = A * D, BC = B * C,
            G = (C * N - M * D) / (BC - AD),
            H = (A * N - M * B) / (AD - BC),
            I = (C * P - O * D) / (BC - AD),
            J = (A * P - O * B) / (AD - BC),
            K = (C * (S - F) + D * (E - R)) / (BC - AD),
            L = (A * (S - F) + B * (E - R)) / (AD - BC);

        let matrix = [G, H, I, J, K, L];
        return qrDecompose(matrix);
    }

    /**
     * Sets the crop transform for the image.
     * @param {Object} value - The crop transform properties.
     */
    Konva.Image.prototype.setCropTransform = function (value) {
        if (value === false) {
            delete this._cropElement;
            return;
        }
        if (!this._cropElement) {
            this._cropElement = new Konva.Shape();
        }
        this._cropElement.setAttrs(value);
        this._cropElement.setAttrs({ offsetX: 0, offsetY: 0 });
    };

    /**
     * Gets the crop transform for the image.
     * @returns {Object} - The crop transform properties.
     */
    Konva.Image.prototype.getCropTransform = function () {
        return this._cropElement && this._cropElement.getAttrs();
    };

    /**
     * Sets or gets the crop transform for the image.
     * @param {Object} value - The crop transform properties.
     * @returns {Object} - The crop transform properties.
     */
    Konva.Image.prototype.cropTransform = function (value) {
        if (value) {
            this.setCropTransform(value);
        } else {
            return this.getCropTransform();
        }
    };

    /**
     * in this function work as constructer when image load to get data from image
     * and then set crop data to image
     * @param {Object} data - The crop transform properties.
     * @returns {Object} - The crop transform properties.
     **/
    Konva.Image.prototype.cropDataManage = function () {
        this.cropStart();
        this.cropEnd();
    };

    Konva.Image.prototype.cropStart = function () {
        const layer = this.getLayer();
        if (!layer) return;

        // Clear any existing transformers
        layer.children.forEach(child => {
            if (child instanceof Konva.Transformer) {
                child.detach();
                child.destroy();
            }
        });

        if (this.cropImage) return;
        if (!this._cropElement) {
            this.cropTransform({
                x: 0,
                y: 0,
                width: this.width(),
                height: this.height(),
                rotation: 0,
            });
        }

        // Disable dragging on the main image during cropping
        this.draggable(false);

        const transform = this.getAbsoluteTransform(),
            transform2 = this._cropElement.getAbsoluteTransform(),
            transform0 = layer.getAbsoluteTransform(),
            options = qrDecompose(transform0.copy().invert().multiply(transform).multiply(transform2).getMatrix());

        // Create the crop image
        this.cropImage = new Konva.Image({
            stroke: this.stroke(),
            strokeWidth: this.strokeWidth(),
            image: this.image(),
            opacity: 1, // Fully visible crop image
            draggable: true,
        });
        this.cropImage.isCroppingElement = true;

        this.cropImage.setAttrs(options);
        this.cropImage.setAttrs({
            width: this._cropElement.width(),
            height: this._cropElement.height(),
        });

        // Add crop image to the layer
        layer.add(this.cropImage);

        // Create the overlay with a cutout
        const stage = this.getStage();
        const stageWidth = stage.width();
        const stageHeight = stage.height();

        this.cropBackground = new Konva.Rect({
            x: 0,
            y: 0,
            width: layer.width(),
            height: layer.height(),
            fill: '#dedede9c', // Semi-transparent gray
        });

        // Add background rectangle to the layer
        layer.add(this.cropBackground);

        // Add overlay to the layer and position it
        // layer.add(this.overlay);
        // this.overlay.moveToTop(); // Move overlay to the top of the layer

        // Add transformers
        this.cropImageTransformer = new Konva.Transformer({
            rotateEnabled: false,
            borderDash: [5, 5],
            anchorSize: 21,
            anchorCornerRadius: 11,
            enabledAnchors: ['top-left', 'top-right', 'bottom-right', 'bottom-left']
        }).attachTo(this.cropImage);

        this.transformer = new Konva.Transformer({
            // resizeEnabled: false,
            // rotateEnabled: false
        }).attachTo(this);
        layer.add(this.cropImageTransformer, this.transformer);

        // Ensure transformers are above everything
        this.cropBackground.moveToTop(); // Ensure it stays below everything
        this.cropImage.moveToTop();
        this.cropImageTransformer.moveToTop();
        this.transformer.moveToTop();
        // Bind update functions
        this.cropUpdateBinded = this.cropUpdate.bind(this);
        this.resizAndCropUpdateBinded = function () {
            this.resize();
            this.cropUpdate();
        }.bind(this);

        this.resize();
        this.cropUpdate();

        // Update overlay when crop image is moved or transformed
        this.cropImage.on('dragmove transform', () => {
            this.cropBackground.draw(); // Redraw overlay to match new crop position/size
            layer.batchDraw();
        });

        this.cropImage.on('dragmove', this.cropUpdateBinded);
        this.cropImage.on('transform', this.cropUpdateBinded);
        this.on('dragmove', this.cropUpdateBinded);
        this.on('transform', this.resizAndCropUpdateBinded);

        // Add click event listener to the overlay
        // this.overlay.on('click tap', (e) => {
        //     console.log('Overlay clicked!'); // Debug log to confirm click detection
        //     this.cropEnd();
        // });
        // this.getStage().on('click tap', (e) => {
        //     // if (e.target !== this.cropImage) {
        //     console.log("click tap");
        //     this.cropEnd();
        //     // }
        // });

        // Debug: Log the layer children to verify z-index
        console.log('Layer children after setup:', layer.children.map(child => ({
            name: child.name(),
            zIndex: child.zIndex()
        })));

        layer.batchDraw();
    };

    /**
     * Ends the cropping process for the image.
     */
    Konva.Image.prototype.cropEnd = function () {
        if (this.cropImage) {
            if (this.transformer) {
                this.transformer.detach();
                this.transformer.destroy();
                delete this.transformer;
            }
            if (this.cropImageTransformer) {
                this.cropImageTransformer.detach();
                this.cropImageTransformer.destroy();
                delete this.cropImageTransformer;
            }
            this.cropImage.off('dragmove', this.cropUpdateBinded);
            this.cropImage.off('transform', this.cropUpdateBinded);
            this.off('dragmove', this.cropUpdateBinded);
            this.off('transform', this.resizAndCropUpdateBinded);
            if (this.cropImage.getParent()) {
                this.cropImage.remove();
            }
            delete this.cropImage;

            // Remove overlay and its event listener
            if (this.cropBackground) {
                this.cropBackground.off('click tap'); // Clean up event listener
                this.cropBackground.remove();
                delete this.cropBackground;
            }
            if (this.getStage()) {
                this.getStage().off('click tap'); // Clean up event listener
            }
            if (this._cropElement) {
                this.attrs.cropImage = this._cropElement;
            }
            const layer = this.getLayer();
            if (layer) {
                layer.batchDraw();
            }
            // Re-enable dragging
            // this.draggable(true);
        }
    };

    /**
     * Updates the crop transform based on the current crop image position and size.
     */
    Konva.Image.prototype.cropUpdate = function () {
        if (this.cropImage) {
            let options = getGroupCoords(this.cropImage, this);
            this.cropTransform(options);
            const layer = this.getLayer();
            if (layer) {
                // Re-apply effects after crop update
                EffectEvent(this.attrs, this); // Assuming attrs contains shape data
                layer.batchDraw();
            }
        }
    };

    /**
     * Resets the image to its original size.
     */
    Konva.Image.prototype.resize = function () {
        this.setAttrs({
            scaleX: 1,
            scaleY: 1,
            width: this.width() * this.scaleX(),
            height: this.height() * this.scaleY(),
        });
    };

    /**
     * Resets the crop transform for the image.
     */
    Konva.Image.prototype.cropReset = function () {
        if (this.cropImage) {
            this.cropEnd();
        }
        this.setCropTransform(false);
        const layer = this.getLayer();
        if (layer) {
            layer.batchDraw();
        }
    };

    /**
     * Custom scene function for rendering the image with cropping.
     * @param {CanvasRenderingContext2D} context - The canvas rendering context.
     */
    Konva.Image.prototype._sceneFunc = function (context) {
        let width = this.width(),
            height = this.height(),
            image = this.image(),
            cropWidth,
            cropHeight,
            params;

        context.save();
        context.beginPath();
        context.rect(0, 0, width, height);
        context.closePath();
        context.clip();
        if (this.hasFill() || this.hasStroke()) {
            context.fillStrokeShape(this);
        }

        if (image) {
            if (this._cropElement) {
                context.save();
                width = this._cropElement.width();
                height = this._cropElement.height();
                let transform = this._cropElement.getAbsoluteTransform();
                let m = transform.getMatrix();
                context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
            }

            cropWidth = this.cropWidth();
            cropHeight = this.cropHeight();
            if (cropWidth && cropHeight) {
                params = [image, this.cropX(), this.cropY(), cropWidth, cropHeight, 0, 0, width, height];
            } else {
                params = [image, 0, 0, width, height];
            }

            context.drawImage.apply(context, params);

            if (this._cropElement) {
                context.restore();
            }
        }
        context.strokeShape(this);
        context.restore();
    };
})(Konva);

export default function Editor() {
    const { setIsShapeDrawerOpen, selectedIndex, selectedShape, setSelectedIndex, mainStage, setMainStage, isSidebarOpen, selectedSubMenu, setSelectedSubMenu, setIsEditorDrawerOpen } = useOutletContext();
    const autoScroll = useRef([]);
    useEffect(() => {
        autoScroll.current[selectedIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    }, [selectedIndex])
    const parentRef = useRef(null);
    const [rectProps, setRectProps] = useState({ x: 0, y: 0, size: 0, tempWidth: 0, tempHeight: 0 });
    const [scale, setScale] = useState({ scaleX: 1, scaleY: 1 });
    const [mainStageString, setMainStageString] = useState("");
    const [isCropping, setIsCropping] = useState(false);
    const allowHtmlTypesForCrop = ['stock-photo', 'upload-photo', 'stock-gif', 'stock-sticker', 'masked-image'];
    const [selectedAlignType, setSelectedAlignType] = useState("");
    const [isRightLateralCollapse, setIsRightLateralCollapse] = useState(false);
    const [currentRightPanel, setCurrentRightPanel] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [redoStack, setRedoStack] = useState([]); // Stack for redo
    const [isUndoAction, setIsUndoAction] = useState(false); // Stack for redo
    const [isRedoAction, setIsRedoAction] = useState(false); // Stack for redo
    const [zoomper, setZoomper] = useState(50);
    const [isPageShow, setIsPageShow] = useState(null);

    const scrollRef = useRef(null);

    const [undoStack, setUndoStack] = useState([{ stages: mainStage, selectedIndex }]);

    const generateMainStageString = (stages) => {
        return stages
            .map(stage =>
                stage.stageref.current?.children[0]?.children[1]?.children
                    ?.map(child => JSON.stringify(child.attrs))
                    .join("") || ""
            )
            .join("");
    };

    useEffect(() => {
        setTimeout(() => {
            const newMainStageString = generateMainStageString(mainStage);
            if (mainStageString !== newMainStageString) {
                setMainStageString(newMainStageString);

            }
        }, 100);
    }, [mainStage]);
    useEffect(() => {
        setTimeout(() => {
            if (scrollRef.current) {
                const container = scrollRef.current;
                const containerWidth = container.offsetWidth;
                const contentWidth = container.scrollWidth;

                // Auto-center the scroll position
                container.scrollLeft = (contentWidth - containerWidth) / 2;
            }
        }, 100);
    }, [zoomper]); // Trigger whenever zoomper changes
    useEffect(() => {

        if (!isUndoAction && !isRedoAction) {
            updateMainStage(mainStage);
        }
        setIsUndoAction(false);
        setIsRedoAction(false);

        // Handel UNDO and REDo max 10 10 state  
    }, [mainStageString])
    const MAX_HISTORY = 10; // Maximum states to store

    // Update mainStage and maintain history
    const updateMainStage = () => {
        const temp = JSON.parse(JSON.stringify(mainStage));
        temp.forEach(stage => {
            let newObj = typeof (stage.stageref.current) === 'string' ? JSON.parse(stage.stageref.current) : stage.stageref.current;
            stage.shapes = newObj?.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) || []
            stage.shapes.forEach(element => {
                element.visible = (element.visible == null || element.visible == undefined) ? true : element.visible;
            });
            stage.stageref.current = newObj;
            stage.selectedShapes = [];
        })
        if (!(temp.some(e => e.shapes && e.shapes.length))) return;
        undoStack.push({ stages: temp, selectedIndex });
        if (undoStack.length > MAX_HISTORY) undoStack.shift(); // Keep max 10 states
        setUndoStack(undoStack);
        // console.log(undoStack);

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
        if (undoStack.length === 1) return; // No states to undo
        const temp = JSON.parse(JSON.stringify(mainStage));
        temp.forEach(stage => {
            let newObj = typeof (stage.stageref.current) === 'string' ? JSON.parse(stage.stageref.current) : stage.stageref.current;
            stage.shapes = newObj?.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) || [];
            stage.shapes.forEach(element => {
                element.visible = (element.visible == null || element.visible == undefined) ? true : element.visible;
            });
            stage.stageref.current = newObj;
            stage.selectedShapes = [];
        })

        // let deleteCount = isChangeStack ? 2 : 1;
        // deleteCount > 1 && undoStack.pop();
        // setTimeout(() => {
        // }, 500);
        undoStack.pop();

        const previousState = undoStack[undoStack.length - 1].stages;
        // setIsChangeStack(false);
        const temp1 = JSON.parse(JSON.stringify(previousState));
        setSelectedIndex(undoStack[undoStack.length - 1].selectedIndex)
        temp1.forEach(stage => {
            let newObj = typeof (stage.stageref.current) === 'string' ? JSON.parse(stage.stageref.current) : stage.stageref.current
            stage.shapes = newObj?.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) || [];
            stage.shapes.forEach(element => {
                element.visible = (element.visible == null || element.visible == undefined) ? true : element.visible;
            });
            stage.stageref.current = newObj;
            stage.selectedShapes = [];
        })
        previousState.forEach(e => {
            e.shapes.forEach(e => {
                e.id = uuid();
            })
        })
        redoStack.unshift({ stages: temp, selectedIndex });
        setIsUndoAction(true);
        setMainStage(previousState); // Set mainStage to the previous state
        setUndoStack([...undoStack]); // Remove last state from undo stack
        setRedoStack([...redoStack]); // Push current state to redo stack
    };

    // Redo functionality
    const handleRedo = () => {
        setIsRedoAction(true);
        if (redoStack.length === 0) return; // No states to redo
        const temp = JSON.parse(JSON.stringify(mainStage));
        temp.forEach(stage => {
            let newObj = typeof (stage.stageref.current) === 'string' ? JSON.parse(stage.stageref.current) : stage.stageref.current;
            stage.shapes = newObj?.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) || []
            stage.shapes.forEach(element => {
                element.visible = (element.visible == null || element.visible == undefined) ? true : element.visible;
            });
            stage.stageref.current = newObj;
            stage.selectedShapes = [];
        })
        const temp2 = JSON.parse(JSON.stringify(redoStack[0].stages));
        temp2.forEach(stage => {
            let newObj = typeof (stage.stageref.current) === 'string' ? JSON.parse(stage.stageref.current) : stage.stageref.current;
            stage.shapes = newObj?.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) || []
            stage.shapes.forEach(element => {
                element.visible = (element.visible == null || element.visible == undefined) ? true : element.visible;
            });
            stage.stageref.current = newObj;
            stage.selectedShapes = [];
        })
        const nextState = redoStack[0].stages;
        undoStack.push({ stages: temp2, selectedIndex });
        setSelectedIndex(redoStack[0].selectedIndex)
        redoStack.shift();

        setRedoStack(redoStack); // Remove first state from redo stack
        setUndoStack(undoStack); // Push current state to undo stack
        setMainStage(temp2); // Set mainStage to the next state
    };
    useEffect(() => {
        const handleKeyboardShortcuts = (event) => {
            if (event.key === 'a' || event.key === 'A') {
                event.preventDefault(); // Prevent default browser select all
                selectAllShapes(selectedIndex);
                return;
            }
            if (event.ctrlKey || event.metaKey) {
                if (event.key === "z" || event.key === "Z") {
                    event.preventDefault(); // Prevent the default browser undo action
                    handleUndo();
                } else if (event.key === "y" || event.key === "Y") {
                    event.preventDefault(); // Prevent the default browser redo action
                    handleRedo();
                }
            }
        };

        document.addEventListener("keydown", handleKeyboardShortcuts);
        return () => {
            document.removeEventListener("keydown", handleKeyboardShortcuts);
        };
    }, [handleUndo, handleRedo, selectedIndex, mainStage, setMainStage]);

    useEffect(() => {
        autoScroll.current[selectedIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    }, [selectedIndex])

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

    const handleCrop = () => {
        const stage = mainStage[selectedIndex];
        const selectedShape = stage.selectedShapes[0];

        if (stage.selectedShapes.length === 1 && allowHtmlTypesForCrop.includes(selectedShape.attrs.htmlType)) {
            if (selectedShape && selectedShape.getParent()) {
                if (selectedShape?.children?.length) {
                    selectedShape.children[1].children[1].cropStart();
                    selectedShape.children[0].visible(false);
                    selectedShape.children[1]?.children[1].visible(false);
                }
                setIsCropping(true);
            }
        }
    };

    const handleCropEnd = () => {
        let x = [];
        mainStage[selectedIndex]?.stageref?.current?.children[0]?.children[1]?.children.forEach((selectedShapeData) => {
            if (
                allowHtmlTypesForCrop.includes(selectedShapeData.attrs.htmlType) &&
                selectedShapeData?.children?.length
            ) {
                debugger;

                const container = selectedShapeData.children[1];
                const imageNode = container.children[1];

                // End crop mode if it's active
                if (imageNode.cropEnd) imageNode.cropEnd();

                // Store the cropped image
                selectedShapeData.attrs.cropImage = imageNode.attrs.cropImage;

                // Calculate old scales
                const oldX = selectedShapeData.attrs.scaleX || 1;
                const oldY = selectedShapeData.attrs.scaleY || 1;
                const oldScaleX = oldX;
                const oldScaleY = oldY;

                // Adjust position based on inner image
                const newX = selectedShapeData.attrs.x + (imageNode.attrs.x * oldX);
                const newY = selectedShapeData.attrs.y + (imageNode.attrs.y * oldY);
                selectedShapeData.x(newX || selectedShapeData.attrs.x);
                selectedShapeData.y(newY || selectedShapeData.attrs.y);

                // Scale adjustments based on image dimensions
                const scaleFactorX = (imageNode.attrs.width / selectedShapeData.attrs.width) * oldX;
                const scaleFactorY = (imageNode.attrs.height / selectedShapeData.attrs.height) * oldY;
                selectedShapeData.scaleX(scaleFactorX);
                selectedShapeData.scaleY(scaleFactorY);

                // Update image node dimensions
                imageNode.width(selectedShapeData.width());
                imageNode.height(selectedShapeData.height());

                // Recalculate crop image values
                const cropImg = selectedShapeData.attrs.cropImage;
                if (cropImg) {
                    cropImg.x(((cropImg.x() || 0) * oldX) / (selectedShapeData.attrs.scaleX || 1) || 0);
                    cropImg.y(((cropImg.y() || 0) * oldY) / (selectedShapeData.attrs.scaleY || 1) || 0);

                    cropImg.scaleX((cropImg.scaleX() || 1) * oldScaleX / (selectedShapeData.attrs.scaleX || 1));
                    cropImg.scaleY((cropImg.scaleY() || 1) * oldScaleY / (selectedShapeData.attrs.scaleY || 1));

                    cropImg.width(cropImg.width() * (cropImg.scaleX() || 1));
                    cropImg.height(cropImg.height() * (cropImg.scaleY() || 1));

                    cropImg.scaleX(1);
                    cropImg.scaleY(1);
                }

                // Reset positions and visibility
                imageNode.x(0);
                imageNode.y(0);
                container.x(0);
                container.y(0);
                selectedShapeData.children[0].visible(true);
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

    return (
        <div className="flex w-full flex-col h-full">
            <TopToolbar setIsShapeDrawerOpen={setIsShapeDrawerOpen} isCropping={isCropping} handleCrop={handleCrop} handleCropEnd={handleCropEnd} selectedSubMenu={selectedSubMenu} setSelectedSubMenu={setSelectedSubMenu} selectedShape={selectedShape} setMainStage={setMainStage} mainStage={mainStage} selectedIndex={selectedIndex} />
            <div className="flex w-full flex-grow relative">
                <div style={{ userSelect: 'none' }} className="flex flex-col overflow-y-auto relative flex-grow w-full overflow-auto" >
                    <div style={{
                        position: 'absolute',
                        top: '0px',
                        left: '0px',
                        transformOrigin: "0 0",
                        transform: `scale(${zoomper / 50})`,
                        width: "100%",
                        height: "100%",
                    }} ref={parentRef}>
                        <div style={{ width: "100%", height: "100%" }} className="relative" >
                            {
                                mainStage.map((stage, index) => {
                                    return (
                                        <div key={index} ref={(el) => (autoScroll.current[index] = el)} style={{}}>
                                            <StageComponent zoomper={zoomper} isRightLateralCollapse={isRightLateralCollapse} isCropping={isCropping} stage={stage} parentRef={parentRef} mainStageString={mainStageString} setMainStageString={setMainStageString} rectProps={rectProps} setRectProps={setRectProps} scale={scale} isSelected={selectedIndex === index} setScale={setScale} selectedIndex={selectedIndex} index={index} mainStage={mainStage} setMainStage={setMainStage} setSelectedIndex={setSelectedIndex} selectedAlignType={selectedAlignType} setSelectedAlignType={setSelectedAlignType} isSidebarOpen={isSidebarOpen} />
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
                            console.log('isPageShow page', isPageShow)
                            setIsPageShow("Pages")
                        }}>
                            <BookOpen className="w-4 h-4" /> Pages
                        </Button>
                        <Button className="flex items-center" variant="ghost" onClick={() => {
                            console.log('isPageShow layer', isPageShow)
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
                        <LateralPanelRightLayer setIsPageShow={setIsPageShow} setCurrentRightPanel={setCurrentRightPanel} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} setSelectedAlignType={setSelectedAlignType} isExpanded={isExpanded} setIsExpanded={setIsExpanded} setIsRightLateralCollapse={setIsRightLateralCollapse} />
                    </div>
                }
                {isRightLateralCollapse && currentRightPanel == 'Pages' &&
                    <LateralPanelRightPages isSidebarOpen={isSidebarOpen} setCurrentRightPanel={setCurrentRightPanel} mainStage={mainStage} isExpanded={isExpanded} index={selectedIndex} setIsExpanded={setIsExpanded} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} setIsRightLateralCollapse={setIsRightLateralCollapse} setMainStage={setMainStage} />
                }
                {isRightLateralCollapse && currentRightPanel == 'Layers' &&
                    <LateralPanelRightLayer setCurrentRightPanel={setCurrentRightPanel} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} setSelectedAlignType={setSelectedAlignType} isExpanded={isExpanded} setIsExpanded={setIsExpanded} setIsRightLateralCollapse={setIsRightLateralCollapse} />
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
                    <div className="flex items-center bg-white rounded-sm border border-gray-200">
                        <Button size="xs" variant="ghost" onClick={() => {
                            if (zoomper - 5 >= 50) {
                                setZoomper((zoomper - 5) < 50 ? 50 : zoomper - 5);
                            }
                        }} disabled={zoomper === 50}>
                            <ZoomOut className="w-4 h-4" />
                        </Button>

                        <Label className="text-xs px-2">{zoomper}%</Label>

                        <Button size="xs" variant="ghost" onClick={() => {
                            if (zoomper + 5 <= 100) {
                                setZoomper(zoomper + 5 > 100 ? 100 : zoomper + 5);
                            }
                        }} disabled={zoomper === 100}>
                            <ZoomIn className="w-4 h-4" />
                        </Button>
                    </div>
                </div>}
            </div>
        </div>
    )
}