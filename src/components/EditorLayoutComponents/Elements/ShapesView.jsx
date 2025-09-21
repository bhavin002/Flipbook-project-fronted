import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getData } from '@/utils/datas';
import { v4 as uuid } from "uuid";

const ShapesView = ({ setIsEditorDrawerOpen, setMainStage, mainStage, selectedIndex, onBackClick }) => {
    const svgItems = getData("svgItems");
    const shapes = [
        {
            id: uuid(),
            svg: svgItems["icon-1"],
            attrs: {
                width: 55,
                height: 55,
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                type: "shape",
                isMasked: false,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-1"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        }
        ,
        {
            id: uuid(),
            svg: svgItems["icon-2"],
            attrs: {
                width: 55,
                height: 55,
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                stroke: "#00000000",
                type: "shape",
                draggable: true,
                strokeWidth: 5,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-2"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-5"],
            attrs: {
                width: 55,
                height: 55,
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                type: "shape",
                isMasked: false,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-5"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-6"],
            attrs: {
                width: 55,
                height: 55,
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                stroke: "#00000000",
                type: "shape",
                strokeWidth: 5,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-6"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-9"],
            attrs: {
                width: 55,
                height: 55,
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                type: "shape",
                isMasked: false,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-9"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-10"],
            attrs: {
                width: 55,
                height: 55,
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                stroke: "#00000000",
                strokeWidth: 5,
                type: "shape",
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-10"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-13"],
            attrs: {
                width: 55,
                height: 55,
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                type: "shape",
                isMasked: false,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-13"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-14"],
            attrs: {
                width: 55,
                height: 55,
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                stroke: "#00000000",
                type: "shape",
                strokeWidth: 5,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-14"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-33"],
            attrs: {
                width: 55,
                height: 55,
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                type: "shape",
                strokeWidth: 5,
                isMasked: false,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-33"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-41"],
            attrs: {
                width: 55,
                height: 55,
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                stroke: "#00000000",
                type: "shape",
                strokeWidth: 2,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-41"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-21"],
            attrs: {
                fill: "#757575",
                type: "shape",
                strokeWidth: 5,
                width: 54,
                height: 54,
                scaleX: 5,
                scaleY: 5,
                isMasked: false,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-21"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-22"],
            attrs: {
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                stroke: "#00000000",
                type: "shape",
                strokeWidth: 5,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-22"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-25"],
            attrs: {
                fill: "#757575",
                type: "shape",
                strokeWidth: 5,
                height: 55,
                width: 55,
                scaleX: 5,
                scaleY: 5,
                isMasked: false,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-25"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-26"],
            attrs: {
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                stroke: "#00000000",
                type: "shape",
                strokeWidth: 5,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-26"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-29"],
            attrs: {
                fill: "#757575",
                type: "shape",
                strokeWidth: 5,
                height: 55,
                width: 55,
                scaleX: 5,
                scaleY: 5,
                isMasked: false,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-29"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-30"],
            attrs: {
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                stroke: "#00000000",
                type: "shape",
                strokeWidth: 5,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-30"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-4"],
            attrs: {
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                type: "shape",
                strokeWidth: 5,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-4"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-8"],
            attrs: {
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                type: "shape",
                strokeWidth: 5,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-8"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-12"],
            attrs: {
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                type: "shape",
                strokeWidth: 5,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-12"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-16"],
            attrs: {
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                type: "shape",
                strokeWidth: 5,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-16"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-24"],
            attrs: {
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                type: "shape",
                strokeWidth: 5,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-24"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            width: "37px",
            svg: svgItems["icon-28"],
            attrs: {
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                type: "shape",
                strokeWidth: 5,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-28"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            height: "29px",
            svg: svgItems["icon-32"],
            attrs: {
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                type: "shape",
                strokeWidth: 5,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-32"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-42"],
            attrs: {
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                type: "shape",
                strokeWidth: 5,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-42"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-43"],
            attrs: {
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                type: "shape",
                strokeWidth: 5,
                height: 26,
                width: 51,
                isMasked: false,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-43"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            height: "27px",
            svg: svgItems["icon-44"],
            attrs: {
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                stroke: "#00000000",
                type: "shape",
                strokeWidth: 5,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-44"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            height: "27px",
            svg: svgItems["icon-45"],
            attrs: {
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                type: "shape",
                strokeWidth: 5,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-45"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-46"],
            attrs: {
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                type: "shape",
                strokeWidth: 5,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-46"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-47"],
            attrs: {
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                type: "shape",
                strokeWidth: 5,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-47"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-49"],
            attrs: {
                scaleX: 5,
                scaleY: 5,
                fill: "#757575",
                type: "shape",
                strokeWidth: 5,
                draggable: true,
                visible: true,
                data: (() => {
                    const svgString = svgItems["icon-49"];
                    const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                    const paths = [...pathMatches].map(match => match[1]);
                    return paths && paths.length ? paths : []; // Return the extracted `d` value or null
                })(),
                htmlType: "shape-widget",
                sidebar: "shape-action",
                title: "shape-widget",
                layer: "Shape"
            },
        },
    ];
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