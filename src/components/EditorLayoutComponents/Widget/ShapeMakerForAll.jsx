import React from 'react';
import { Group, Path, Rect, Line } from 'react-konva';

export default function ShapeMakerForAll({ shape, handleDragStart, handleDrag, onSelect, ...props }) {
    const group = React.useRef();

    const handleGroupClick = (e) => {
        e.cancelBubble = true;
        if (onSelect) {
            onSelect(e.currentTarget);
        }
    };

    return (
        <Group
            ref={group}
            draggable
            onClick={handleGroupClick}
            onTap={handleGroupClick}
            onDragStart={handleDragStart}
            onDragEnd={handleDrag}
            {...props}
            {...shape}
            name="shape"
        >

            {shape.data.map((element, index) => {
                if (element.type === 'path') {
                    return (
                        <Path
                            key={`path-${index}`}
                            data={element.data}
                            strokeWidth={shape.strokeWidth}
                            x={0}
                            y={0}
                            stroke={shape.stroke ? shape.fill : shape.stroke}
                            fill={shape.stroke ? shape.stroke : shape.fill}
                            draggable={false}
                        />
                    );
                } else if (element.type === 'rect') {
                    return (
                        <Rect
                            key={`rect-${index}`}
                            x={Number(element.x) || 0}
                            y={Number(element.y) || 0}
                            width={Number(element.width)}
                            height={Number(element.height)}
                            stroke={shape.stroke ? shape.fill : shape.stroke}
                            fill={shape.stroke ? shape.stroke : shape.fill}
                            strokeWidth={shape.strokeWidth}
                            draggable={false}
                        />
                    );
                } else if (element.type === 'polygon') {
                    return (
                        <Line
                            key={`polygon-${index}`}
                            points={element.points}
                            stroke={shape.stroke ? shape.fill : shape.stroke}
                            fill={shape.stroke ? shape.stroke : shape.fill}
                            strokeWidth={shape.strokeWidth}
                            closed
                            draggable={false}
                        />
                    );
                } else if (element.type === 'circle') {
                    return (
                        <Path
                            key={`circle-${index}`}
                            data={`M ${element.cx - element.r}, ${element.cy}
                                   a ${element.r},${element.r} 0 1,0 ${element.r * 2},0
                                   a ${element.r},${element.r} 0 1,0 ${-element.r * 2},0`}
                            strokeWidth={shape.strokeWidth}
                            x={0}
                            y={0}
                            stroke={shape.stroke ? shape.fill : shape.stroke}
                            fill={shape.stroke ? shape.stroke : shape.fill}
                            draggable={false}
                        />
                    );
                } else if (element.type === 'ellipse') {
                    return (
                        <Path
                            key={`ellipse-${index}`}
                            data={`M ${element.cx - element.rx}, ${element.cy}
                                   a ${element.rx},${element.ry} 0 1,0 ${element.rx * 2},0
                                      a ${element.rx},${element.ry} 0 1,0 ${-element.rx * 2},0`}
                            strokeWidth={shape.strokeWidth}
                            x={0}
                            y={0}
                            stroke={shape.stroke ? shape.fill : shape.stroke}
                            fill={shape.stroke ? shape.stroke : shape.fill}
                            draggable={false}
                        />
                    );
                }
                return null;
            })}
            <Rect
                x={0}
                y={0}
                width={shape.width || 100} // Default width if not provided
                height={shape.height || 100} // Default height if not provided
                // Uncomment and set width and height if needed
                // width={shape.width}
                // height={shape.height}
                fill="transparent"
            />
        </Group>
    );
};