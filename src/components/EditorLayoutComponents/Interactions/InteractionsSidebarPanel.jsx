import { getData } from "@/utils/datas";
import { Crown } from "lucide-react";
import { v4 as uuid } from "uuid";

export default function InteractionsSidebarPanel({ setMainStage, mainStage, selectedIndex }) {

    const elements = getData('interactions');

    return (
        <div className="px-6 pt-6 pb-2 space-y-4 flex flex-col h-[100vh]">
            <div className="h-0 overflow-y-auto flex-grow">
                <div className="space-y-4">
                    {elements.map((element, index) => (
                        <div key={index}>
                            <div className="mb-2 text-sm font-semibold">{element.title}</div>
                            <div className="grid grid-cols-3 gap-4">
                                {element.widget.map((item, itemIndex) => (
                                    <div key={itemIndex} className="cursor-pointer flex flex-col items-center" draggable
                                        onDragStart={() => {
                                            mainStage[selectedIndex].dragRect.current = item.attrs;
                                        }}
                                        onClick={() => {
                                            if (item.attrs) {
                                                // Get the group from the stage
                                                let group = mainStage[selectedIndex].stageref.current.children[0].children[1];

                                                // Calculate the center of the group
                                                const groupX = group.x();
                                                const groupY = group.y();
                                                const groupWidth = group.width();
                                                const groupHeight = group.height();
                                                const dropX = (groupWidth / 2 ) / group.scaleX() - (item.attrs.width  || 50) / 2;
                                                const dropY = (groupHeight / 2 ) / group.scaleY() - (item.attrs.height || 50) / 2;

                                                let isOverShapeWidget = false;
                                                let shapeWidget = null;
                                                let shapeWidgetData = [];

                                                // Check if the drop position overlaps with a shape-widget
                                                mainStage[selectedIndex].stageref.current.children[0].children[1].children.forEach(shape => {
                                                    if (shape.attrs.title === 'shape-widget') {
                                                        const shapeLeft = shape.attrs.x;
                                                        const shapeTop = shape.attrs.y;
                                                        const shapeRight = shape.attrs.x + (shape.attrs.width * (shape.attrs.scaleX || 1));
                                                        const shapeBottom = shape.attrs.y + (shape.attrs.height * (shape.attrs.scaleY || 1));

                                                        // Check if drop position is within shape-widget bounds
                                                        if (dropX >= shapeLeft && dropX <= shapeRight && dropY >= shapeTop && dropY <= shapeBottom) {
                                                            isOverShapeWidget = true;
                                                            shapeWidget = shape.attrs;
                                                            shapeWidgetData = shape.children[0].dataArray;
                                                        }
                                                    }
                                                });

                                                // Create new shape at the center of the group
                                                let newShape = {
                                                    x: dropX,
                                                    y: dropY,
                                                    ...item.attrs,
                                                    id: uuid()
                                                };

                                                // Handle masked image case
                                                if (isOverShapeWidget && shapeWidget?.isMasked &&
                                                    (stage.dragRect.current.htmlType === 'stock-photo' || stage.dragRect.current.htmlType === 'upload-photo')) {
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
                                                        layer: 'masked-image',
                                                        htmlType: 'masked-image',
                                                        type: 'img',
                                                        data: shapeWidget.data,
                                                        maskData: shapeWidgetData,
                                                        maskType: shapeWidget.maskType,
                                                        draggable: true,
                                                        visible: true,
                                                        id: uuid()
                                                    };

                                                    // Update mainStage by removing the shape-widget and adding the new masked-image
                                                    mainStage[selectedIndex].selectedShapes = [];
                                                    setMainStage(prevState => {
                                                        const updatedState = [...prevState];
                                                        const updatedShapes = updatedState[selectedIndex].shapes.filter(
                                                            shape => shape.id !== shapeWidget.id
                                                        );
                                                        updatedState[selectedIndex] = {
                                                            ...updatedState[selectedIndex],
                                                            shapes: [...updatedShapes, newShape]
                                                        };
                                                        return updatedState;
                                                    });
                                                } else {
                                                    // Add the new shape at the center of the group
                                                    setMainStage(prevState => {
                                                        const updatedState = [...prevState];
                                                        updatedState[selectedIndex] = {
                                                            ...updatedState[selectedIndex],
                                                            shapes: [...updatedState[selectedIndex].shapes, newShape]
                                                        };
                                                        return updatedState;
                                                    });
                                                }

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
                                            }
                                        }}

                                    >
                                        <div className="rounded-lg h-14 w-full bg-primary hover:bg-violet-700 flex justify-center items-center relative">
                                            {item.isUpgrade && (
                                                <div className="absolute top-1 right-1">
                                                    <Crown className="h-4 w-4 text-amber-400 shrink-0" />
                                                </div>
                                            )}
                                            <div className="w-10 h-8 relative flex justify-center items-center"
                                                dangerouslySetInnerHTML={{ __html: item.icon }}>
                                            </div>
                                        </div>
                                        {element.isTextShow && (
                                            <div className="text-center mt-2 text-xs">{item.text}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}