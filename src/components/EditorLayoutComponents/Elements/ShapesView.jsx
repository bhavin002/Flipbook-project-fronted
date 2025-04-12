import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getData } from '@/utils/datas';
import { v4 as uuid } from "uuid";

const ShapesView = ({ mainStage, selectedIndex, onBackClick }) => {
    const svgItems = getData("svgItems");
    const shapes = [
        {
            id: uuid(),
            svg: svgItems["icon-1"],
            attrs: {
                width: 55,
                height: 55,
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Square Filled",
            },
        }
        ,
        {
            id: uuid(),
            svg: svgItems["icon-2"],
            attrs: {
                width: 55,
                height: 55,
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Square Outline",
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-5"],
            attrs: {
                width: 55,
                height: 55,
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Rounded Square Filled",
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-6"],
            attrs: {
                width: 55,
                height: 55,
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Rounded Square Outline",
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-9"],
            attrs: {
                width: 55,
                height: 55,
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Triangle Filled",
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-10"],
            attrs: {
                width: 55,
                height: 55,
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Triangle Outline",
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-13"],
            attrs: {
                width: 55,
                height: 55,
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Filled",
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-14"],
            attrs: {
                width: 55,
                height: 55,
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-33"],
            attrs: {
                width: 55,
                height: 55,
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-41"],
            attrs: {
                width: 55,
                height: 55,
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-22"],
            attrs: {
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-26"],
            attrs: {
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-30"],
            attrs: {
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-4"],
            attrs: {
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-8"],
            attrs: {
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-12"],
            attrs: {
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-16"],
            attrs: {
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-24"],
            attrs: {
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
            },
        },
        {
            id: uuid(),
            width: "37px",
            svg: svgItems["icon-28"],
            attrs: {
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
            },
        },
        {
            id: uuid(),
            height: "29px",
            svg: svgItems["icon-32"],
            attrs: {
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-42"],
            attrs: {
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-43"],
            attrs: {
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
            },
        },
        {
            id: uuid(),
            height: "27px",
            svg: svgItems["icon-44"],
            attrs: {
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
            },
        },
        {
            id: uuid(),
            height: "27px",
            svg: svgItems["icon-45"],
            attrs: {
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-46"],
            attrs: {
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-47"],
            attrs: {
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
            },
        },
        {
            id: uuid(),
            svg: svgItems["icon-49"],
            attrs: {
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
                action: "shape-action",
                title: "shape-widget",
                layer: "Circle Outline",
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