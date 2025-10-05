import { v4 as uuid } from "uuid";
import svgItems from "./svgItems";


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
    {
        id: uuid(),
        svg: svgItems["icon-51"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-51"];
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
        svg: svgItems["icon-52"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-52"];
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
        svg: svgItems["icon-53"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-53"];
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
        svg: svgItems["icon-54"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-54"];
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
        svg: svgItems["icon-55"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-55"];
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
        svg: svgItems["icon-56"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-56"];
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
        svg: svgItems["icon-58"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-58"];
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
        svg: svgItems["icon-59"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-59"];
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
        svg: svgItems["icon-63"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-63"];
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
        svg: svgItems["icon-64"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-64"];
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
        svg: svgItems["icon-66"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-66"];
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
        svg: svgItems["icon-68"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-68"];
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
        svg: svgItems["icon-69"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-69"];
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
        svg: svgItems["icon-70"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-70"];
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
        svg: svgItems["icon-70"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-70"];
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
        svg: svgItems["icon-71"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-71"];
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
        svg: svgItems["icon-72"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-72"];
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
        svg: svgItems["icon-73"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-73"];
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
        svg: svgItems["icon-74"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-74"];
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
        svg: svgItems["icon-75"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-75"];
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
        svg: svgItems["icon-76"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-76"];
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
        svg: svgItems["icon-77"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-77"];
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
        svg: svgItems["icon-78"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-78"];
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
        svg: svgItems["icon-79"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-79"];
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
        svg: svgItems["icon-80"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-80"];
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
        svg: svgItems["icon-81"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-81"];
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
        svg: svgItems["icon-82"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-82"];
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
        svg: svgItems["icon-83"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-83"];
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
        svg: svgItems["icon-85"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-85"];
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
        svg: svgItems["icon-86"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-86"];
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
        svg: svgItems["icon-87"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-87"];
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
        svg: svgItems["icon-88"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-88"];
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
        svg: svgItems["icon-89"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-89"];
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
        svg: svgItems["icon-90"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-90"];
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
        svg: svgItems["icon-91"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-91"];
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
        svg: svgItems["icon-92"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-92"];
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
        svg: svgItems["icon-92"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-92"];
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
        svg: svgItems["icon-93"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-93"];
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
        svg: svgItems["icon-94"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-94"];
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
        svg: svgItems["icon-94"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-94"];
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
        svg: svgItems["icon-95"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-95"];
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
        svg: svgItems["icon-96"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-96"];
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
        svg: svgItems["icon-97"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-97"];
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
        svg: svgItems["icon-98"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-98"];
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
        svg: svgItems["icon-98"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-98"];
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
        svg: svgItems["icon-98"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-98"];
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
        svg: svgItems["icon-98"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-98"];
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
        svg: svgItems["icon-100"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-100"];
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
        svg: svgItems["icon-101"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-101"];
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
        svg: svgItems["icon-102"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-102"];
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
        svg: svgItems["icon-103"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-103"];
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
        svg: svgItems["icon-104"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-104"];
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
        svg: svgItems["icon-105"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-105"];
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
        svg: svgItems["icon-106"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-106"];
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
        svg: svgItems["icon-107"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-107"];
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
        svg: svgItems["icon-108"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-108"];
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
        svg: svgItems["icon-109"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-109"];
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
        svg: svgItems["icon-110"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-110"];
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
        svg: svgItems["icon-111"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-111"];
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
        svg: svgItems["icon-112"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-112"];
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
        svg: svgItems["icon-113"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-113"];
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
        svg: svgItems["icon-114"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-114"];
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
        svg: svgItems["icon-115"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-115"];
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
        svg: svgItems["icon-116"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-116"];
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
        svg: svgItems["icon-117"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-117"];
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
        svg: svgItems["icon-118"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-118"];
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
        svg: svgItems["icon-119"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-119"];
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
        svg: svgItems["icon-120"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-120"];
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
        svg: svgItems["icon-121"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-121"];
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
        svg: svgItems["icon-122"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-122"];
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
        svg: svgItems["icon-123"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-123"];
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
        svg: svgItems["icon-124"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-124"];
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
        svg: svgItems["icon-125"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-125"];
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
        svg: svgItems["icon-126"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-126"];
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
        svg: svgItems["icon-127"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-127"];
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
        svg: svgItems["icon-128"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-128"];
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
        svg: svgItems["icon-129"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-129"];
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
        svg: svgItems["icon-130"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-130"];
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
        svg: svgItems["icon-131"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-131"];
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
        svg: svgItems["icon-132"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-132"];
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
        svg: svgItems["icon-133"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-133"];
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
        svg: svgItems["icon-134"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-134"];
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
        svg: svgItems["icon-135"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-135"];
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
        svg: svgItems["icon-136"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-136"];
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
        svg: svgItems["icon-137"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-137"];
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
        svg: svgItems["icon-138"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-138"];
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
        svg: svgItems["icon-139"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-139"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-140"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-140"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-141"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-141"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-142"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-142"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-143"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-143"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-144"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-144"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-145"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-145"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-146"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-146"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-147"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-147"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-148"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-148"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-149"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-149"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-150"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-150"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-151"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-151"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-152"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-152"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-153"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-153"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-154"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-154"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-155"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-155"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-156"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-156"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-157"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-157"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-158"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-158"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-159"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-159"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-160"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-160"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-161"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-161"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-162"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-162"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-163"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-163"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-164"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-164"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-165"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-165"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-166"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-166"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-167"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-167"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-168"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-168"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-169"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-169"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-170"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-170"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-171"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-171"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-172"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-172"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-173"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-173"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-174"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-174"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-175"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-175"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-176"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-176"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-177"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-177"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-178"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-178"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-179"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-179"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-180"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-180"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-181"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-181"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-182"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-182"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-183"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-183"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-184"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-184"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-185"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-185"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-186"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-186"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-187"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-187"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-188"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-188"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-189"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-189"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-190"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-190"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-191"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-191"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-192"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-192"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-193"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-193"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-194"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-194"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-195"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-195"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-196"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-196"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-197"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-197"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-198"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-198"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-199"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-199"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-200"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-200"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-201"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-201"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-202"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-202"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-203"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-203"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-204"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-204"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-205"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-205"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-206"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-206"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-207"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-207"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-208"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-208"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-209"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-209"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-210"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-210"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-211"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-211"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-212"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-212"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-213"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-213"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-214"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-214"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-215"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-215"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-216"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-216"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-217"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-217"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-218"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-218"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-219"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-219"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-220"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-220"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-221"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-221"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-222"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-222"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-223"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-223"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-224"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-224"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-225"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-225"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-226"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-226"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-227"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-227"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-228"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-228"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-229"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-229"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-230"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-230"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-231"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-231"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-232"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-232"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-233"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-233"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-234"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-234"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-235"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-235"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-236"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-236"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-237"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-237"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-238"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-238"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-239"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-239"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-240"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-240"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-241"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-241"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-242"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-242"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-243"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-243"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-244"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-244"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-245"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-245"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-246"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-246"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-247"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-247"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-248"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-248"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-249"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-249"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-250"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-250"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-251"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-251"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-252"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-252"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-253"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-253"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-254"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-254"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-255"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-255"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-256"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-256"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-257"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-257"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-258"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-258"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-259"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-259"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-260"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-260"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-261"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-261"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-262"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-262"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-263"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-263"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-264"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-264"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-265"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-265"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-266"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-266"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-267"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-267"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-268"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-268"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-269"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-269"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-270"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-270"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-271"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-271"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-272"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-272"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-273"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-273"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-274"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-274"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-275"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-275"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-276"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-276"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-277"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-277"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-278"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-278"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-279"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-279"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-280"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-280"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-281"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-281"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-282"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-282"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-283"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-283"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-284"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-284"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-285"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-285"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-286"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-286"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-287"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-287"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-288"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-288"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-289"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-289"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-291"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-291"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-292"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-292"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-293"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-293"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-294"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-294"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-295"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-295"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-296"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-296"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-297"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-297"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-298"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-298"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-299"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-299"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-300"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-300"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-301"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-301"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-302"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-302"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-303"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-303"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-304"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-304"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-305"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-305"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-306"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-306"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-307"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-307"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-308"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-308"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-309"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-309"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-310"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-310"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-311"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-311"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-312"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-312"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-313"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-313"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-314"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-314"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-315"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-315"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-316"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-316"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-317"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-317"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-318"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-318"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-319"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-319"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-320"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-320"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-321"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-321"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-322"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-322"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-323"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-323"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-324"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-324"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-325"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-325"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-326"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-326"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-327"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-327"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-328"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-328"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-329"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-329"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-330"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-330"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-331"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-331"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-332"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-332"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-333"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-333"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-334"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-334"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-335"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-335"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-336"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-336"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-337"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-337"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-338"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-338"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-339"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-339"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-340"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-340"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-341"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-341"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-342"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-342"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-343"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-343"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-344"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-344"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-345"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-345"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-346"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-346"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-347"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-347"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-348"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-348"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-349"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-349"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-350"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-350"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-351"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-351"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-352"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-352"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-353"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-353"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-354"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-354"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-355"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-355"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-356"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-356"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-357"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-357"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-358"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-358"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-359"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-359"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-360"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-360"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-361"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-361"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-362"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-362"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-363"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-363"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-364"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-364"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-365"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-365"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-366"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-366"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-367"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-367"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-368"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-368"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-369"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-369"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-370"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-370"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-371"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-371"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-372"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-372"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-373"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-373"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-374"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-374"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-375"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-375"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-376"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-376"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-377"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-377"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-378"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-378"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-379"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-379"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-380"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-380"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-381"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-381"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-382"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-382"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-383"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-383"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-384"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-384"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-386"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-386"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-387"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-387"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-388"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-388"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-389"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-389"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-390"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-390"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-391"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-391"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-392"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-392"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-393"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-393"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-394"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-394"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-395"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-395"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-396"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-396"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-397"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-397"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-398"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-398"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-399"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-399"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-400"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-400"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-401"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-401"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-402"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-402"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-403"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-403"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-404"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-404"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-405"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-405"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-406"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-406"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-407"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-407"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-408"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-408"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-409"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-409"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-410"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-410"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-411"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-411"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-412"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-412"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-413"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-413"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-414"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-414"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-415"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-415"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-416"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-416"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-417"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-417"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-418"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-418"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-419"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-419"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-420"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-420"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-421"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-421"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-422"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-422"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-423"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-423"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-424"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-424"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-425"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-425"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-426"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-426"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-427"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-427"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-428"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-428"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-429"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-429"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-430"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-430"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-431"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-431"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-432"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-432"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-433"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-433"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-434"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-434"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-435"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-435"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-436"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-436"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-437"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-437"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-438"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-438"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-439"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-439"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-440"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-440"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-441"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-441"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-442"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-442"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-443"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-443"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-444"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-444"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-445"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-445"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-446"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-446"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-447"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-447"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-448"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-448"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-449"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-449"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-450"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-450"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-451"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-451"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-452"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-452"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-453"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-453"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-454"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-454"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-455"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-455"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-456"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-456"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-457"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-457"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-458"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-458"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-459"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-459"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-460"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-460"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-461"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-461"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-462"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-462"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-463"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-463"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-464"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-464"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-465"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-465"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-466"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-466"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-467"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-467"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-468"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-468"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-469"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-469"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-470"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-470"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-471"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-471"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-472"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-472"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-473"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-473"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-474"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-474"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-475"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-475"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-476"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-476"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-477"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-477"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-478"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-478"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-479"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-479"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-480"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-480"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-481"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-481"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-482"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-482"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-483"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-483"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-484"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-484"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-485"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-485"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-486"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-486"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-487"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-487"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-488"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-488"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-489"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-489"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-490"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-490"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-491"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-491"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-492"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-492"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-493"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-493"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-494"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-494"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-495"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-495"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-496"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-496"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-497"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-497"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-498"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-498"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-499"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-499"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-500"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-500"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-501"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-501"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-502"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-502"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-503"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-503"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-504"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-504"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-505"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-505"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-506"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-506"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-507"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-507"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-508"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-508"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-509"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-509"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-510"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-510"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-511"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-511"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-512"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-512"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-513"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-513"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-514"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-514"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-515"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-515"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-516"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-516"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-517"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-517"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-518"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-518"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-519"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-519"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-520"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-520"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-521"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-521"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-522"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-522"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-523"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-523"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-524"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-524"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-525"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-525"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-526"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-526"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-527"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-527"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-528"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-528"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-529"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-529"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-530"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-530"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-531"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-531"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-532"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-532"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-533"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-533"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-534"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-534"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-535"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-535"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-536"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-536"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-537"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-537"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-538"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-538"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-539"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-539"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    {
        id: uuid(),
        svg: svgItems["icon-540"],
        attrs: {
            scaleX: 5,
            scaleY: 5,
            fill: "#757575",
            type: "shape",
            strokeWidth: 5,
            draggable: true,
            visible: true,
            data: (() => {
                const svgString = svgItems["icon-540"];
                const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
                const paths = [...pathMatches].map(match => match[1]);
                return paths && paths.length ? paths : [];
            })(),
            htmlType: "shape-widget",
            sidebar: "shape-action",
            title: "shape-widget",
            layer: "Shape"
        },
    },
    // {
    //     id: uuid(),
    //     svg: svgItems["icon-541"],
    //     attrs: {
    //         scaleX: 5,
    //         scaleY: 5,
    //         fill: "#757575",
    //         type: "shape",
    //         strokeWidth: 5,
    //         draggable: true,
    //         visible: true,
    //         data: (() => {
    //             const svgString = svgItems["icon-541"];
    //             const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
    //             const paths = [...pathMatches].map(match => match[1]);
    //             return paths && paths.length ? paths : [];
    //         })(),
    //         htmlType: "shape-widget",
    //         sidebar: "shape-action",
    //         title: "shape-widget",
    //         layer: "Shape"
    //     },
    // },
    // {
    //     id: uuid(),
    //     svg: svgItems["icon-542"],
    //     attrs: {
    //         scaleX: 5,
    //         scaleY: 5,
    //         fill: "#757575",
    //         type: "shape",
    //         strokeWidth: 5,
    //         draggable: true,
    //         visible: true,
    //         data: (() => {
    //             const svgString = svgItems["icon-542"];
    //             const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
    //             const paths = [...pathMatches].map(match => match[1]);
    //             return paths && paths.length ? paths : [];
    //         })(),
    //         htmlType: "shape-widget",
    //         sidebar: "shape-action",
    //         title: "shape-widget",
    //         layer: "Shape"
    //     },
    // },
    // {
    //     id: uuid(),
    //     svg: svgItems["icon-543"],
    //     attrs: {
    //         scaleX: 5,
    //         scaleY: 5,
    //         fill: "#757575",
    //         type: "shape",
    //         strokeWidth: 5,
    //         draggable: true,
    //         visible: true,
    //         data: (() => {
    //             const svgString = svgItems["icon-543"];
    //             const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
    //             const paths = [...pathMatches].map(match => match[1]);
    //             return paths && paths.length ? paths : [];
    //         })(),
    //         htmlType: "shape-widget",
    //         sidebar: "shape-action",
    //         title: "shape-widget",
    //         layer: "Shape"
    //     },
    // },
    // {
    //     id: uuid(),
    //     svg: svgItems["icon-544"],
    //     attrs: {
    //         scaleX: 5,
    //         scaleY: 5,
    //         fill: "#757575",
    //         type: "shape",
    //         strokeWidth: 5,
    //         draggable: true,
    //         visible: true,
    //         data: (() => {
    //             const svgString = svgItems["icon-544"];
    //             const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
    //             const paths = [...pathMatches].map(match => match[1]);
    //             return paths && paths.length ? paths : [];
    //         })(),
    //         htmlType: "shape-widget",
    //         sidebar: "shape-action",
    //         title: "shape-widget",
    //         layer: "Shape"
    //     },
    // },
    // {
    //     id: uuid(),
    //     svg: svgItems["icon-545"],
    //     attrs: {
    //         scaleX: 5,
    //         scaleY: 5,
    //         fill: "#757575",
    //         type: "shape",
    //         strokeWidth: 5,
    //         draggable: true,
    //         visible: true,
    //         data: (() => {
    //             const svgString = svgItems["icon-545"];
    //             const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
    //             const paths = [...pathMatches].map(match => match[1]);
    //             return paths && paths.length ? paths : [];
    //         })(),
    //         htmlType: "shape-widget",
    //         sidebar: "shape-action",
    //         title: "shape-widget",
    //         layer: "Shape"
    //     },
    // },
    // {
    //     id: uuid(),
    //     svg: svgItems["icon-546"],
    //     attrs: {
    //         scaleX: 5,
    //         scaleY: 5,
    //         fill: "#757575",
    //         type: "shape",
    //         strokeWidth: 5,
    //         draggable: true,
    //         visible: true,
    //         data: (() => {
    //             const svgString = svgItems["icon-546"];
    //             const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
    //             const paths = [...pathMatches].map(match => match[1]);
    //             return paths && paths.length ? paths : [];
    //         })(),
    //         htmlType: "shape-widget",
    //         sidebar: "shape-action",
    //         title: "shape-widget",
    //         layer: "Shape"
    //     },
    // },
    // {
    //     id: uuid(),
    //     svg: svgItems["icon-547"],
    //     attrs: {
    //         scaleX: 5,
    //         scaleY: 5,
    //         fill: "#757575",
    //         type: "shape",
    //         strokeWidth: 5,
    //         draggable: true,
    //         visible: true,
    //         data: (() => {
    //             const svgString = svgItems["icon-547"];
    //             const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
    //             const paths = [...pathMatches].map(match => match[1]);
    //             return paths && paths.length ? paths : [];
    //         })(),
    //         htmlType: "shape-widget",
    //         sidebar: "shape-action",
    //         title: "shape-widget",
    //         layer: "Shape"
    //     },
    // },
    // {
    //     id: uuid(),
    //     svg: svgItems["icon-548"],
    //     attrs: {
    //         scaleX: 5,
    //         scaleY: 5,
    //         fill: "#757575",
    //         type: "shape",
    //         strokeWidth: 5,
    //         draggable: true,
    //         visible: true,
    //         data: (() => {
    //             const svgString = svgItems["icon-548"];
    //             const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
    //             const paths = [...pathMatches].map(match => match[1]);
    //             return paths && paths.length ? paths : [];
    //         })(),
    //         htmlType: "shape-widget",
    //         sidebar: "shape-action",
    //         title: "shape-widget",
    //         layer: "Shape"
    //     },
    // },
    // {
    //     id: uuid(),
    //     svg: svgItems["icon-549"],
    //     attrs: {
    //         scaleX: 5,
    //         scaleY: 5,
    //         fill: "#757575",
    //         type: "shape",
    //         strokeWidth: 5,
    //         draggable: true,
    //         visible: true,
    //         data: (() => {
    //             const svgString = svgItems["icon-549"];
    //             const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
    //             const paths = [...pathMatches].map(match => match[1]);
    //             return paths && paths.length ? paths : [];
    //         })(),
    //         htmlType: "shape-widget",
    //         sidebar: "shape-action",
    //         title: "shape-widget",
    //         layer: "Shape"
    //     },
    // },
    // {
    //     id: uuid(),
    //     svg: svgItems["icon-550"],
    //     attrs: {
    //         scaleX: 5,
    //         scaleY: 5,
    //         fill: "#757575",
    //         type: "shape",
    //         strokeWidth: 5,
    //         draggable: true,
    //         visible: true,
    //         data: (() => {
    //             const svgString = svgItems["icon-550"];
    //             const pathMatches = svgString.matchAll(/<path[^>]*d="([^"]*)"/g);
    //             const paths = [...pathMatches].map(match => match[1]);
    //             return paths && paths.length ? paths : [];
    //         })(),
    //         htmlType: "shape-widget",
    //         sidebar: "shape-action",
    //         title: "shape-widget",
    //         layer: "Shape"
    //     },
    // }
];

export default shapes;