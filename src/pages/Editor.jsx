import { useOutletContext } from "react-router-dom";
import StageComponent from "../components/EditorLayoutComponents/StageComponent";
import { useEffect, useRef, useState } from "react";
import TopToolbar from "../components/EditorLayoutComponents/TopToolbar";
import PanelRight from "@/components/EditorLayoutComponents/PanelRight";
import LateralPanelRightPages from "@/components/EditorLayoutComponents/LateralPanelRightPages";
import LateralPanelRightLayer from "@/components/EditorLayoutComponents/LateralPanelRightLayer";
import { Redo, Undo, ZoomIn, ZoomOut } from "lucide-react";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Editor() {
    const { selectedIndex, selectedShape, setSelectedIndex, mainStage, setMainStage, isSidebarOpen } = useOutletContext();
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
    const [selectedAlignType, setSelectedAlignType] = useState("");
    const [isRightLateralCollapse, setIsRightLateralCollapse] = useState(false);
    const [currentRightPanel, setCurrentRightPanel] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [redoStack, setRedoStack] = useState([]); // Stack for redo
    const [isUndoAction, setIsUndoAction] = useState(false); // Stack for redo
    const [isRedoAction, setIsRedoAction] = useState(false); // Stack for redo
    const [zoomper, setZoomper] = useState(50);

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

    return (
        <div className="flex w-full flex-col h-full">
            <TopToolbar selectedShape={selectedShape} setMainStage={setMainStage} mainStage={mainStage} selectedIndex={selectedIndex} />
            <div className="flex w-full flex-grow">
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
                                        <div ref={(el) => (autoScroll.current[index] = el)} style={{}}>
                                            <StageComponent zoomper={zoomper} isRightLateralCollapse={isRightLateralCollapse} isCropping={isCropping} stage={stage} parentRef={parentRef} mainStageString={mainStageString} setMainStageString={setMainStageString} rectProps={rectProps} setRectProps={setRectProps} scale={scale} isSelected={selectedIndex === index} setScale={setScale} selectedIndex={selectedIndex} index={index} mainStage={mainStage} setMainStage={setMainStage} setSelectedIndex={setSelectedIndex} selectedAlignType={selectedAlignType} setSelectedAlignType={setSelectedAlignType} isSidebarOpen={isSidebarOpen} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                {isRightLateralCollapse && currentRightPanel == 'Pages' && <LateralPanelRightPages isSidebarOpen={isSidebarOpen} setCurrentRightPanel={setCurrentRightPanel} mainStage={mainStage} isExpanded={isExpanded} index={selectedIndex} setIsExpanded={setIsExpanded} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} setIsRightLateralCollapse={setIsRightLateralCollapse} setMainStage={setMainStage} />}
                {isRightLateralCollapse && currentRightPanel == 'Layers' && <LateralPanelRightLayer setCurrentRightPanel={setCurrentRightPanel} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} setSelectedAlignType={setSelectedAlignType} isExpanded={isExpanded} setIsExpanded={setIsExpanded} setIsRightLateralCollapse={setIsRightLateralCollapse} />}
                <PanelRight currentRightPanel={currentRightPanel} setCurrentRightPanel={setCurrentRightPanel} isRightLateralCollapse={isRightLateralCollapse} setIsRightLateralCollapse={setIsRightLateralCollapse} />
                <div className="fixed flex items-center bottom-[10px] right-[80px] gap-2">
                    <div className="flex items-center bg-white rounded-sm border border-gray-200">
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
                </div>
            </div>
        </div>
    )
}