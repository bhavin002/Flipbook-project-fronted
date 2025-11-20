import { v4 as uuid } from "uuid";
import svgItems from "./svgItems";
const iconsWithIsMasked = [1, 5, 9, 13, 33, 21, 25, 29, 43, 72, 76, 79, 80, 82, 83, 86, 87, 88,
    89, 90, 91, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110,
    111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129,
    130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148,
    149, 150, 151, 153, 155, 156, 157, 159, 160, 161, 162, 163, 164, 165, 167, 168, 169, 170, 171,
    172, 176, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 193, 194, 195, 196, 197, 198,
    199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 227, 228, 229, 230,
    231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249,
    250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268,
    269, 270, 271, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288,
    289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307,
    308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326,
    327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 349, 350, 355,
    359, 360, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 391, 394,
    395, 396, 397, 398, 399, 400, 401, 404, 406, 422, 426, 449, 450, 452, 459, 460, 463, 465, 476,
    478, 479, 482, 484, 490, 494, 496, 498, 500, 502, 504, 506, 508, 521, 522, 523, 524, 525, 526,
    527, 534, 535, 536, 537, 538, 539, 540];

const parseSVG = (svgString) => {
    const elements = [];
    let viewBoxDimensions = { width: 55, height: 55 }; // Default fallback dimensions

    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgString, 'image/svg+xml');

        // Check for parsing errors
        const parserError = doc.querySelector('parsererror');
        if (parserError) {
            console.error('SVG Parsing Error:', parserError.textContent);
            return { elements, viewBoxDimensions };
        }

        // Extract viewBox dimensions
        const svgElement = doc.querySelector('svg');
        const viewBox = svgElement?.getAttribute('viewBox');
        if (viewBox) {
            const [, , width, height] = viewBox.split(/\s+/).map(Number);
            if (!isNaN(width) && !isNaN(height)) {
                viewBoxDimensions = { width, height };
            }
        }

        // Extract <path> elements
        const paths = doc.querySelectorAll('path');
        paths.forEach((path) => {
            elements.push({
                type: 'path',
                data: path.getAttribute('d') || '',
            });
        });

        // Extract <rect> elements
        const rects = doc.querySelectorAll('rect');
        rects.forEach((rect) => {
            elements.push({
                type: 'rect',
                x: parseFloat(rect.getAttribute('x')) || 0,
                y: parseFloat(rect.getAttribute('y')) || 0,
                width: parseFloat(rect.getAttribute('width')) || 0,
                height: parseFloat(rect.getAttribute('height')) || 0,
            });
        });

        // Extract <polygon> elements
        const polygons = doc.querySelectorAll('polygon');
        polygons.forEach((polygon) => {
            const pointsString = polygon.getAttribute('points')?.trim();
            const points = pointsString
                ? pointsString
                    .split(/\s+/)
                    .flatMap((point) => point.split(',').map(Number))
                    .filter((num) => !isNaN(num))
                : [];
            elements.push({
                type: 'polygon',
                points,
            });
        });

        //circle
        const circles = doc.querySelectorAll('circle');
        circles.forEach((circle) => {
            const cx = parseFloat(circle.getAttribute('cx')) || 0;
            const cy = parseFloat(circle.getAttribute('cy')) || 0;
            const r = parseFloat(circle.getAttribute('r')) || 0;
            elements.push({
                type: 'circle',
                cx,
                cy,
                r,
            });
        });

        //ellipse
        const ellipses = doc.querySelectorAll('ellipse');
        ellipses.forEach((ellipse) => {
            const cx = parseFloat(ellipse.getAttribute('cx')) || 0;
            const cy = parseFloat(ellipse.getAttribute('cy')) || 0;
            const rx = parseFloat(ellipse.getAttribute('rx')) || 0;
            const ry = parseFloat(ellipse.getAttribute('ry')) || 0;
            elements.push({
                type: 'ellipse',
                cx,
                cy,
                rx,
                ry,
            });
        });

    } catch (error) {
        console.error('Error parsing SVG:', error);
    }

    return { elements, viewBoxDimensions };
};

// Factory function to generate shape configurations
const createShapeConfig = (iconKey, customAttrs = {}) => {
    const iconNumber = parseInt(iconKey.split('-')[1], 10); // Extract number from "icon-1", "icon-2", etc.
    const { elements, viewBoxDimensions } = parseSVG(svgItems[iconKey], {
        fill: customAttrs.fill || '#757575',
        stroke: customAttrs.stroke || '#00000000',
        strokeWidth: customAttrs.strokeWidth || 5,
    });

    const defaultAttrs = {
        width: viewBoxDimensions.width, // Use viewBox width
        height: viewBoxDimensions.height, // Use viewBox height
        scaleX: 5,
        scaleY: 5,
        fill: '#757575',
        type: 'shape',
        strokeWidth: 5,
        draggable: true,
        visible: true,
        data: elements,
        htmlType: 'shape-widget',
        sidebar: 'shape-action',
        title: 'shape-widget',
        layer: 'Shape',
        ...(iconsWithIsMasked.includes(iconNumber) ? { isMasked: false } : {}), // Conditionally include isMasked
    };

    return {
        id: uuid(),
        svg: svgItems[iconKey],
        attrs: {
            ...defaultAttrs,
            ...customAttrs, // Allow overriding default attributes
        },
    };
};

const shapeConfigOverrides = {
  2: { stroke: "#00000000" },
  6: { stroke: "#00000000" },
  10: { stroke: "#00000000" },
  14: { stroke: "#00000000" },
  22: { stroke: "#00000000" },
  26: { stroke: "#00000000" },
  30: { stroke: "#00000000" },
  41: { stroke: "#00000000" },
  44: { stroke: "#00000000" },
};

// ✅ Generate shapes only for existing icons
const shapes = Object.keys(svgItems)
  .filter((key) => key.startsWith("icon-")) // only icon keys
  .map((key) => {
    const num = parseInt(key.split("-")[1], 10);
    const customAttrs = shapeConfigOverrides[num] || {};
    return createShapeConfig(key, customAttrs);
  });

export default shapes;