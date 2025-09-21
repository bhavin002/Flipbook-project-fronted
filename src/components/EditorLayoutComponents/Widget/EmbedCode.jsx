import React, { useEffect, useState } from "react";
import { Group, Image, Rect, Text } from "react-konva";

export default function EmbedCode({ shape, onSelect, handleDragStart, handleDrag, ...props }) {
    const [image, setImage] = useState(null);
    const [bgImage, setBgImage] = useState(null);
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
        if (shape?.htmlData?.coverImage) {
            const img = new window.Image();
            // img.src = `http://localhost:8080/api/v1/file/image?src=${encodeURIComponent(shape.htmlData.coverImage.url)}`;
            // img.crossOrigin = 'Anonymous';
            shape.fill = "#ffffffa6";
            img.src = shape.htmlData.coverImage.url;
            img.onload = () => {
                setBgImage(img);
            };
        }else{
            // shape.fill = "#ffffffa6";
        }
    }, [shape.src, shape?.htmlData?.coverImage]);

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
            x: width / 2 - (50 / scaleX / 2),
            y: height / 2 - (50 / scaleY / 2),
            width: 50 / scaleX,
            height: 50 / scaleY
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
            {shape?.htmlData?.coverImage && (
                <Image
                    image={bgImage}
                    x={0}
                    y={0}
                    width={shape.width}
                    height={shape.height}
                />
            )}
            <Rect
                fill={shape.fill || "ffffffa6"}
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