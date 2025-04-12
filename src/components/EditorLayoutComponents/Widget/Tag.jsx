import React from 'react';
import { Arc } from 'react-konva';

export default function Tag({ shape, handleDragStart, handleDrag, ...props }) {
    return (
        <Arc
            {...props}
            {...shape}
            onDragStart={handleDragStart}
            onDragEnd={handleDrag}
            name="shape"
        />
    );
};
