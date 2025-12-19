import React from 'react';
import { Arc } from 'react-konva';

export default function Tag({ shape, handleDragStart, handleDrag, ...props }) {
    return (
        <Arc
            {...props}
            {...(shape && {
                ...shape,
                innerRadius: Math.max(0, shape.innerRadius || 0),
                outerRadius: Math.max(0, shape.outerRadius || 0)
            })}
            onDragStart={handleDragStart}
            onDragEnd={handleDrag}
            name="shape"
        />
    );
};
