import { EffectEvent } from '@/utils/EffectEvent';
import React, { useEffect, useRef } from 'react';
import { Rect } from 'react-konva';

export default function Hyperlink({ onDragMove, shape, mainStage, setMainStage, handleDragStart, selectedIndex, mainStageString, setMainStageString, handleDrag, ...props }) {
    const rectRef = useRef(null);
    useEffect(() => {
        if (!rectRef || !rectRef.current) return;
        const node = rectRef.current;
        EffectEvent(shape, node);
    }, [
        rectRef,
        shape.effect?.filterData,
        shape.effect?.blurRadius,
        shape.effect?.brightness,
        shape.effect?.borderWidth,
        shape.effect?.borderColor,
        shape.effect?.cornerRadius,
        shape.effect?.shadowEnabled,
        shape.effect?.shadowBlur,
        shape.effect?.offsetX,
        shape.effect?.offsetY,
        shape.effect?.opacity,
        shape.effect?.color
    ]);
    return (
        <Rect
            ref={rectRef}
            {...props}
            {...(shape && {
                ...shape,
                filters: undefined,
                width: Math.max(0, shape.width || 0),
                height: Math.max(0, shape.height || 0),
                cornerRadius: shape.cornerRadius ? (Array.isArray(shape.cornerRadius) ? shape.cornerRadius.map(r => Math.max(0, r)) : Math.max(0, shape.cornerRadius)) : 0
            })} // Exclude filters explicitly and ensure non-negative cornerRadius and dimensions
            onDragStart={handleDragStart}
            onDragMove={onDragMove}
            onDragEnd={handleDrag}
            name="shape"
        />
    );
};
