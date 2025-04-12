import { EffectEvent } from '@/utils/EffectEvent';
import React, { useEffect, useState, useRef } from 'react';
import { Group, Image, Rect } from 'react-konva';

export default function StockPhoto({ shape, isCropping, handleDragStart, handleDrag, onSelect, ...props }) {
    const [loadedImage, setLoadedImage] = useState(null);
    const imageRef = useRef(null);
    const ractRef = useRef(null);
    const groupRef = useRef();
    const clipGroupRef = useRef();

    useEffect(() => {
        if (shape && shape.src) {
            const img = new window.Image();
            img.src = shape.src;
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                setLoadedImage(img);
            };
        }
    }, [shape?.src]);

    useEffect(() => {
        if (!loadedImage || !imageRef.current) return;
        const node = imageRef.current;
        const ractRefnode = ractRef.current;

        if (shape && shape.cropImage) {
            try {
                const cropImage = typeof shape.cropImage === 'string' ? JSON.parse(shape.cropImage) : shape.cropImage;
                if (cropImage && cropImage.attrs) {
                    node.cropTransform({ ...cropImage.attrs });
                }
            } catch (error) {
                console.error("Error parsing cropImage:", error);
            }
        }
        EffectEvent(shape, ractRefnode, node);
        node.getLayer()?.batchDraw();
    }, [
        loadedImage,
        isCropping,
        shape,
        shape?.fill,
        shape?.effect?.filterData,
        shape?.effect?.blurRadius,
        shape?.effect?.brightness,
        shape?.effect?.borderWidth,
        shape?.effect?.borderColor,
        shape?.effect?.cornerRadius,
        shape?.effect?.shadowEnabled,
        shape?.effect?.shadowBlur,
        shape?.effect?.offsetX,
        shape?.effect?.offsetY,
        shape?.effect?.opacity,
        shape?.effect?.color,
    ]);

    const handleGroupClick = (e) => {
        e.cancelBubble = true;
        if (onSelect) {
            onSelect(e.currentTarget);
        }
    };

    const shapeEffect = shape?.effect || {};
    const shapeCornerRadius = shapeEffect.cornerRadius || 0;
    const topLeftRadius = shapeEffect.individualCorners ? (shapeEffect.topLeftRadius || 0) : shapeCornerRadius;
    const topRightRadius = shapeEffect.individualCorners ? (shapeEffect.topRightRadius || 0) : shapeCornerRadius;
    const bottomRightRadius = shapeEffect.individualCorners ? (shapeEffect.bottomRightRadius || 0) : shapeCornerRadius;
    const bottomLeftRadius = shapeEffect.individualCorners ? (shapeEffect.bottomLeftRadius || 0) : shapeCornerRadius;
    const shapeWidth = shape?.width || loadedImage?.width || 0;
    const shapeHeight = shape?.height || loadedImage?.height || 0;

    if (!loadedImage) return null;

    return (
        <Group
            ref={groupRef}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDrag}
            onClick={handleGroupClick}
            onTap={handleGroupClick}
            {...props}
            {...shape}
            name="shape"
        >
            {/* Rectangle with shadow */}
            <Rect
                ref={ractRef}
                x={0 + 2}
                y={0 + 2}
                width={shapeWidth - 4}
                height={shapeHeight - 4}
                cornerRadius={shapeCornerRadius || [topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius]}
                fill="#000000"
            />

            {/* Nested Group with clipping */}
            <Group
                x={0}
                y={0}
                width={shapeWidth}
                height={shapeHeight}
                ref={clipGroupRef}
                fill={'#ffffff'}
                clipFunc={(ctx) => {
                    ctx.beginPath();
                    ctx.moveTo(topLeftRadius, 0);
                    ctx.lineTo(shapeWidth - topRightRadius, 0);
                    ctx.quadraticCurveTo(shapeWidth, 0, shapeWidth, topRightRadius);
                    ctx.lineTo(shapeWidth, shapeHeight - bottomRightRadius);
                    ctx.quadraticCurveTo(shapeWidth, shapeHeight, shapeWidth - bottomRightRadius, shapeHeight);
                    ctx.lineTo(bottomLeftRadius, shapeHeight); // Note: customLeftRadius seems to be a typo, should be bottomLeftRadius
                    ctx.quadraticCurveTo(0, shapeHeight, 0, shapeHeight - bottomLeftRadius);
                    ctx.lineTo(0, topLeftRadius);
                    ctx.quadraticCurveTo(0, 0, topLeftRadius, 0);
                    ctx.closePath();
                }}
            >
                <Rect
                    x={0}
                    y={0}
                    width={shapeWidth}
                    height={shapeHeight}
                    fill={shape.fill || 'white'}
                    zIndex={0}
                />
                <Image
                    image={loadedImage}
                    x={0}
                    y={0}
                    width={shapeWidth}
                    height={shapeHeight}
                    ref={imageRef}
                    zIndex={1}
                />


            </Group>
        </Group>
    );
}