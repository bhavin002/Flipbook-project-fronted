import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { v4 as uuid } from "uuid";
import shapes from '@/utils/shapes';

const ShapesView = ({ setIsEditorDrawerOpen, setMainStage, mainStage, selectedIndex, onBackClick }) => {
    return (
        <div className="px-6 pt-6 pb-2 space-y-4 flex flex-col h-[100vh]">
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    className="text-primary"
                    onClick={onBackClick}
                >
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                Shapes
            </div>
            <div className="h-0 overflow-y-auto flex-grow">
                <div className="flex flex-wrap">
                    {shapes.map((shape) => {
                        return (
                            <div key={shape.id} className="shape-element-box">
                                <div className="shape-element">
                                    <div
                                        key={shape.id}
                                        className="flex justify-center items-center"
                                        style={{
                                            height: shape.height || '54px',
                                            width: shape.width || '54px'
                                        }}
                                        draggable
                                        onDragStart={(e) => {
                                            mainStage[selectedIndex].dragRect.current = shape?.attrs;
                                        }}
                                        onClick={() => {
                                            if (shape?.attrs) {
                                                // Get the group from the stage
                                                let group = mainStage[selectedIndex].stageref.current.children[0].children[1];

                                                // Calculate the center of the group
                                                const groupWidth = group.width();
                                                const groupHeight = group.height();
                                                const dropX = (groupWidth / 2) / group.scaleX() - ((shape?.attrs.width || 50) * (shape?.attrs.scaleX || 1)) / 2;
                                                const dropY = (groupHeight / 2) / group.scaleY() - ((shape?.attrs.height || 50) * (shape?.attrs.scaleY || 1)) / 2;

                                                // Create new shape at the center of the group
                                                let newShape = {
                                                    x: dropX,
                                                    y: dropY,
                                                    ...shape?.attrs,
                                                    id: uuid()
                                                };
                                                // Add the new shape at the center of the group
                                                setMainStage(prevState => {
                                                    const updatedState = [...prevState];
                                                    updatedState[selectedIndex] = {
                                                        ...updatedState[selectedIndex],
                                                        shapes: [...updatedState[selectedIndex].shapes, newShape]
                                                    };
                                                    return updatedState;
                                                });

                                                // Select the newly added shape
                                                setTimeout(() => {
                                                    mainStage[selectedIndex].stageref.current.children[0].children[1].children.forEach((child) => {
                                                        if (child.attrs.id === newShape.id) {
                                                            setMainStage(prevState => {
                                                                const updatedState = [...prevState];
                                                                updatedState[selectedIndex] = {
                                                                    ...updatedState[selectedIndex],
                                                                    selectedShapes: [child]
                                                                };
                                                                return updatedState;
                                                            });
                                                        }
                                                    });
                                                }, 100);

                                                setIsEditorDrawerOpen(false);
                                            }
                                        }}
                                        dangerouslySetInnerHTML={{ __html: shape.svg }}
                                    ></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default ShapesView; 