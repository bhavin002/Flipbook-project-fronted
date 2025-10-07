import { v4 as uuid } from "uuid";
import svgItems from "./svgItems";
const iconsWithIsMasked = [1, 83, 355];

const parseSVG = (svgString, shapeAttrs = {}) => {
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
            const stroke = path.getAttribute('stroke') || shapeAttrs.stroke || 'none';
            const fill = path.getAttribute('fill') || shapeAttrs.fill || '#757575';
            elements.push({
                type: 'path',
                data: path.getAttribute('d') || '',
            });
        });

        // Extract <rect> elements
        const rects = doc.querySelectorAll('rect');
        rects.forEach((rect) => {
            const stroke = rect.getAttribute('stroke') || shapeAttrs.stroke || 'none';
            const fill = rect.getAttribute('fill') || shapeAttrs.fill || '#757575';
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
            const stroke = polygon.getAttribute('stroke') || shapeAttrs.stroke || 'none';
            const fill = polygon.getAttribute('fill') || shapeAttrs.fill || '#757575';
            elements.push({
                type: 'polygon',
                points,
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