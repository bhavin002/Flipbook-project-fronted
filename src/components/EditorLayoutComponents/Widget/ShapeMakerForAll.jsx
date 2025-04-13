import React from 'react';
import { Group, Path, Shape } from 'react-konva';

export default function ShapeMakerForAll({ shape, handleDragStart, handleDrag, onSelect, ...props }) {
    const group = React.useRef();
    const handleGroupClick = (e) => {
        e.cancelBubble = true;
        if (onSelect) {
            onSelect(e.currentTarget);
        }
    };
    return (
        <>
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
                {shape.data.map(element => {
                    return (<Path
                        // {...shape}
                        strokeWidth={shape.strokeWidth}
                        x={0}
                        y={0}
                        stroke={shape.stroke ? shape.fill : shape.stroke}
                        fill={shape.stroke ? shape.stroke : shape.fill}
                        draggable={false}
                        data={element}
                    />)
                })}

            </Group>
        </>
    );
};
