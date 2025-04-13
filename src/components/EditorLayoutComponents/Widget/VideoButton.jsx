import React, { useEffect, useState } from "react";
import { Group, Image, Rect, Text } from "react-konva";

export default function VideoButton({ shape, onSelect, handleDragStart, handleDrag, ...props }) {
    const [image, setImage] = useState(null);
    const [dimensions, setDimensions] = useState({
        width: shape.width,
        height: shape.height,
        scaleX: shape.scaleX || 1,
        scaleY: shape.scaleY || 1,
    });
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

    const handleTransform = (e) => {
        const node = e.currentTarget;
        setDimensions({
            width: node.width(),
            height: node.height(),
            scaleX: node.scaleX(),
            scaleY: node.scaleY()
        });
    };

    const getImageProps = () => {
        const { width, height, scaleX, scaleY } = dimensions;
        return {
            x: width / 2 - (30 / scaleX / 2),
            y: height / 2 - (30 / scaleY / 2),
            width: 30 / scaleX,
            height: 30 / scaleY
        };
    };

    return (
        <Group
            ref={group}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDrag}
            onClick={handleGroupClick}
            onTap={handleGroupClick}
            onTransform={handleTransform}
            onTransformEnd={handleTransform}
            {...props}
            {...shape}
            name="shape"
        >
            <Rect
                fill={shape.fill}
                x={0}
                y={0}
                width={shape.width}
                height={shape.height}
            />
            <Image
                image={image}
                {...getImageProps()}
            />
        </Group>
    );
}