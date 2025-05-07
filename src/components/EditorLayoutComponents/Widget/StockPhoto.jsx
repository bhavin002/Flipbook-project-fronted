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
    const ractRef = useRef(null);
    const groupRef = useRef();
    const clipGroupRef = useRef();

    useEffect(() => {
        if (shape && shape.src) {
            const img = new window.Image();
            img.src = shape.src;
            // img.crossOrigin = 'Anonymous';
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
        shape?.effect?.brightness,
        shape?.effect?.contrast,
        shape?.effect?.saturation,
        shape?.effect?.blur,
        shape?.effect?.grayscale,
        shape?.effect?.opacity,
        shape?.effect?.shadowColor,
        shape?.effect?.shadowBlur,
        shape?.effect?.shadowOffsetX,
        shape?.effect?.shadowOffsetY,
        shape?.effect?.shadowOpacity,
        shape?.effect?.isShadowEnabled,
        shape?.effect?.borderColor,
        shape?.effect?.borderWidth,
        shape?.effect?.isBorderEnabled,
        shape?.effect?.cornerRadius,
    ]);

    const handleGroupClick = (e) => {
        e.cancelBubble = true;
        if (onSelect) {
            onSelect(e.currentTarget);
        }
    };
    
    
    const shapeWidth = shape?.width || loadedImage?.width || 0;
    const shapeHeight = shape?.height || loadedImage?.height || 0;
    const shapeEffect = shape?.effect || {};
    const shapeCornerRadius = shapeEffect.cornerRadius || 0;
    const maxRadius = Math.min(shapeWidth / 2, shapeHeight / 2); // Cap radius to half the smallest dimension
    
    // Limit each corner radius to prevent overextension
    const topLeftRadius = Math.min(
      shapeEffect.individualCorners ? (shapeEffect.topLeftRadius || 0) : shapeCornerRadius,
      maxRadius
    );
    const topRightRadius = Math.min(
      shapeEffect.individualCorners ? (shapeEffect.topRightRadius || 0) : shapeCornerRadius,
      maxRadius
    );
    const bottomRightRadius = Math.min(
      shapeEffect.individualCorners ? (shapeEffect.bottomRightRadius || 0) : shapeCornerRadius,
      maxRadius
    );
    const bottomLeftRadius = Math.min(
      shapeEffect.individualCorners ? (shapeEffect.bottomLeftRadius || 0) : shapeCornerRadius,
      maxRadius
    );

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
                    x={shape.flipX ? shapeWidth : 0} // Adjust x position for horizontal flip
                    y={shape.flipY ? shapeHeight : 0} // Adjust y position for vertical flip
                    width={shapeWidth}
                    height={shapeHeight}
                    scaleX={shape.flipX ? -1 : 1} // Apply horizontal flip
                    scaleY={shape.flipY ? -1 : 1} // Apply vertical flip
                    ref={imageRef}
                    zIndex={1}
                />


            </Group>
        </Group>
    );
}