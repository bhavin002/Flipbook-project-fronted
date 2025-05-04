import React, { useEffect, useRef, useState } from "react";
import { Group, Image, Rect } from "react-konva";

export default function SlideShow({ shape, onSelect, handleDragStart, handleDrag, ...props }) {
    const [image, setImage] = useState(null);
    const [bgImage, setBgImage] = useState(null);
    const [dimensions, setDimensions] = useState({
        width: shape.width,
        height: shape.height,
        scaleX: shape.scaleX || 1,
        scaleY: shape.scaleY || 1,
    });
    const group = useRef();
    const haveImages = shape?.htmlData?.images?.length > 0;

    useEffect(() => {
        if (shape.src) {
            const img = new window.Image();
            img.src = shape.src;
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                setImage(img);
            };
        }
        if (haveImages) {
            const img = new window.Image();
            img.src = `http://localhost:8080/api/v1/file/image?src=${encodeURIComponent(shape.htmlData.images[0].url)}`;
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                setBgImage(img);
            };
        }else{
            // shape.fill = "#ffffffa6";
            shape.src = "/src/assets/icons/SlideShow.svg";
        }
    }, [shape.src, shape?.htmlData?.images?.length]);

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

    const getImageProps = (isCheck) => {
        const { width, height, scaleX, scaleY } = dimensions;

        if (haveImages && isCheck) {
            return {
                x: 0,
                y: 0,
                width: width,
                height: height
            };
        } else {
            return {
                x: width / 2 - (50 / scaleX / 2),
                y: height / 2 - (50 / scaleY / 2),
                width: 50 / scaleX,
                height: 50 / scaleY
            };
        }

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
            {haveImages && (
                <Image
                    image={bgImage}
                    {...getImageProps(true)}
                />
            )}
            <Rect
                fill={shape.fill}
                x={0}
                y={0}
                width={shape.width}
                height={shape.height}
            />
            <Image
                image={image}
                {...getImageProps(false)}
            />
        </Group>
    );
}