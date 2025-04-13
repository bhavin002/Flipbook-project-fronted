import React, { useEffect, useState } from "react";
import { Group, Ring } from "react-konva";

export default function RingShape({ shape, onSelect, handleDragStart, handleDrag, ...props }) {
    const [image, setImage] = useState(null);

    const group = React.useRef();

    useEffect(() => {
        if (shape.src) {
            const img = new window.Image();
            img.src = shape.src;
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                setImage(img);
            };
        }
    }, [shape.src]);

    if (!image) {
        return null;
    }

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
            <Ring
                fill={shape.fill}
                innerRadius={40}
                outerRadius={50}
                x={50}
                y={50}
            />
            <Ring
                fill={shape.fill}
                innerRadius={0}
                outerRadius={25}
                x={50}
                y={50}

            />
        </Group>
    );
}