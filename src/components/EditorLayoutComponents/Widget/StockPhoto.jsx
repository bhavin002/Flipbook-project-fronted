import { EffectEvent } from '@/utils/EffectEvent';
import React, { useEffect, useState, useRef } from 'react';
import { Group, Image, Rect } from 'react-konva';

export default function StockPhoto({
    shape,
    isCropping,
    handleDragStart,
    handleDrag,
    onSelect,
    ...props
}) {
    const [loadedImage, setLoadedImage] = useState(null);
    const imageRef = useRef(null);
    const rectRef = useRef(null);
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
        if (!loadedImage || !imageRef.current || !rectRef.current) return;
        const node = imageRef.current;
        const rectNode = rectRef.current;

        if (shape && shape.cropImage) {
            try {
                const cropImage =
                    typeof shape.cropImage === 'string'
                        ? JSON.parse(shape.cropImage)
                        : shape.cropImage;
                if (cropImage && cropImage.attrs) {
                    node.cropTransform({ ...cropImage.attrs });
                }
            } catch (error) {
                console.error('Error parsing cropImage:', error);
            }
        }

        // Apply opacity
        if (shape?.effect?.opacity !== undefined) {
            node.opacity(shape.effect.opacity / 100); // Scale 0-100 to 0-1
        }

        EffectEvent(shape, rectNode, node);
        node.getLayer()?.batchDraw();
    }, [
        loadedImage,
        isCropping,
        shape,
        shape?.fill,
        shape?.effect?.brightness,
        shape?.effect?.contrast,
        shape?.effect?.saturation,
        shape?.effect?.sepia,
        shape?.effect?.tint,
        shape?.effect?.blur,
        shape?.effect?.vignette,
        shape?.effect?.grayscale,
        shape?.effect?.hueRotate,
        shape?.effect?.invert,
        shape?.effect?.temperature,
        shape?.effect?.opacity,
    ]);

    const handleGroupClick = (e) => {
        e.cancelBubble = true;
        if (onSelect) {
            onSelect(e.currentTarget);
        }
    };

    const shapeEffect = shape?.effect || {};
    const shapeCornerRadius = shapeEffect.cornerRadius || 0;
    const topLeftRadius = shapeEffect.individualCorners
        ? shapeEffect.topLeftRadius || 0
        : shapeCornerRadius;
    const topRightRadius = shapeEffect.individualCorners
        ? shapeEffect.topRightRadius || 0
        : shapeCornerRadius;
    const bottomRightRadius = shapeEffect.individualCorners
        ? shapeEffect.bottomRightRadius || 0
        : shapeCornerRadius;
    const bottomLeftRadius = shapeEffect.individualCorners
        ? shapeEffect.bottomLeftRadius || 0
        : shapeCornerRadius;
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
            <Rect
                ref={rectRef}
                x={0}
                y={0}
                width={shapeWidth}
                height={shapeHeight}
                cornerRadius={[topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius]}
                fill="#000000"
            />
            <Group
                x={0}
                y={0}
                width={shapeWidth}
                height={shapeHeight}
                ref={clipGroupRef}
                clipFunc={(ctx) => {
                    ctx.beginPath();
                    ctx.moveTo(topLeftRadius, 0);
                    ctx.lineTo(shapeWidth - topRightRadius, 0);
                    ctx.quadraticCurveTo(shapeWidth, 0, shapeWidth, topRightRadius);
                    ctx.lineTo(shapeWidth, shapeHeight - bottomRightRadius);
                    ctx.quadraticCurveTo(
                        shapeWidth,
                        shapeHeight,
                        shapeWidth - bottomRightRadius,
                        shapeHeight
                    );
                    ctx.lineTo(bottomLeftRadius, shapeHeight);
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