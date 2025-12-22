import React, { useEffect, useState } from "react";
import { Group, Image, Rect, Text } from "react-konva";

export default function StockVideo({ shape, onSelect, handleDragStart, handelDrag,
    index, imageLoadCounterPageWise, setImageLoadCounterPageWise,
    ...props }) {
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
        if (shape.iconSrc) {
            const img = new window.Image();
            img.src = shape.iconSrc;
            setImageLoadCounterPageWise((prev) => ({
                ...prev,
                [index]: (prev[index] || 0) + 1,
            }));
            // img.crossOrigin = 'Anonymous';
            img.onload = () => {
                setImageLoadCounterPageWise((prev) => ({
                    ...prev,
                    [index]: (prev[index] || 1) - 1,
                }));
                setImage(img);
            };
            img.onerror = () => {
                setImageLoadCounterPageWise((prev) => ({
                    ...prev,
                    [index]: (prev[index] || 1) - 1,
                }));
            };
        }
    }, [shape.iconSrc]);

    useEffect(() => {
        if (shape.bgImage) {
            const img = new window.Image();
            img.src = shape.bgImage;
            setImageLoadCounterPageWise((prev) => ({
                ...prev,
                [index]: (prev[index] || 0) + 1,
            }));
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                setImageLoadCounterPageWise((prev) => ({
                    ...prev,
                    [index]: (prev[index] || 1) - 1,
                }));
                setBgImage(img);
            };
            img.onerror = () => {
                setImageLoadCounterPageWise((prev) => ({
                    ...prev,
                    [index]: (prev[index] || 1) - 1,
                }));
            };
        }
    }, [shape.bgImage]);

    if (!image) {
        return null;
    }

    if (!bgImage) {
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
            x: width / 2 - (100 / scaleX / 2),
            y: height / 2 - (100 / scaleY / 2),
            width: 100 / scaleX,
            height: 100 / scaleY
        };
    };

    return (
        <Group
            ref={group}
            onDragStart={handleDragStart}
            draggable
            onDragEnd={handelDrag}
            onClick={handleGroupClick}
            onTap={handleGroupClick}
            onTransform={handleTransform}
            onTransformEnd={handleTransform}
            {...props}
            {...shape}
            name="shape"
        >
            <Image
                image={bgImage}
                {...getImageProps()}
                x={0}
                y={0}
                width={shape.width}
                height={shape.height}
            />
            {/* <Rect
                fill={shape.fill}
                x={0}
                y={0}
                width={shape.width}
                height={shape.height}
            /> */}
            <Image
                image={image}
                {...getImageProps()}
            />
        </Group>
    );
}