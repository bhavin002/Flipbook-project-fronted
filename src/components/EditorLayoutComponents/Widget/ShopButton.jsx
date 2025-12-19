import React, { useEffect, useState } from "react";
import { Group, Image, Rect } from "react-konva";

export default function ShopButton({ mainStage, selectedIndex, shape, handleDragStart, handleDrag, onSelect,
    index, imageLoadCounterPageWise, setImageLoadCounterPageWise,
    ...props }) {
    const [image, setImage] = useState(null);
    const [colors, setColors] = useState({
        labelColor: shape?.data?.labelColor || '#ffffff',
        buttonColor: shape?.data?.buttonColor || '#000000',
    });

    useEffect(() => {
        const newShape = mainStage[selectedIndex].shapes.find(ele => ele.id === shape.id);
        if (newShape) {
            setColors({
                labelColor: newShape?.data?.labelColor || '#ffffff',
                buttonColor: newShape?.data?.buttonColor || '#000000',
            });
        }
    }, [mainStage, selectedIndex, shape.id]);

    const [dimensions, setDimensions] = useState({
        width: shape.width,
        height: shape.height,
        scaleX: shape.scaleX || 1,
        scaleY: shape.scaleY || 1,
    });
    const group = React.useRef();

    const randomizeColors = (svgString) => {
        return svgString.replace(/fill="(.*?)"|stroke="(.*?)"/g, (match, fill, stroke) => {
            if (fill) {
                return `fill="${colors.labelColor}"`;
            } else if (stroke) {
                return `stroke="${colors.labelColor}"`;
            }
            return match;
        });
    };

    const updateSvgImage = () => {
        if (shape.src && shape.src.startsWith('<svg')) {
            const modifiedSvg = randomizeColors(shape.src);
            const blob = new Blob([modifiedSvg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);

            const img = new window.Image();
            img.src = url;
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
                setImage(img);
                URL.revokeObjectURL(url);
            };
            img.onerror = () => {
                setImageLoadCounterPageWise((prev) => ({
                    ...prev,
                    [index]: (prev[index] || 1) - 1,
                }));
            }
        } else if (shape.src) {
            const img = new window.Image();
            img.src = shape.src;
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
                setImage(img);
            };
            img.onerror = () => {
                setImageLoadCounterPageWise((prev) => ({
                    ...prev,
                    [index]: (prev[index] || 1) - 1,
                }));
            }
        }
    };

    // Update image when colors change
    useEffect(() => {
        updateSvgImage();
    }, [colors.labelColor, shape.src]);

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
            <Rect
                fill={colors.buttonColor}
                x={0}
                y={0}
                width={Math.max(0, shape.width || 0)}
                height={Math.max(0, shape.height || 0)}
            />
            <Image
                image={image}
                {...getImageProps()}
            />
        </Group>
    );
}