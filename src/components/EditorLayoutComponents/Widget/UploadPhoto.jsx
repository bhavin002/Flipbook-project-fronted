import { EffectEvent } from '@/utils/EffectEvent';
import { isPngImage } from '@/utils/Helper';
import React, { useEffect, useState, useRef } from 'react';
import { Group, Image, Rect } from 'react-konva';

// Utility function to check if image is PNG


export default function UploadPhoto({
    shape,
    isCropping,
    handleDragStart,
    handleDrag,
    onSelect,
    index, imageLoadCounterPageWise, setImageLoadCounterPageWise,
    ...props
}) {
    const [loadedImage, setLoadedImage] = useState(null);
    const imageRef = useRef(null);
    const ractRef = useRef(null);
    const groupRef = useRef();
    const [isPng, setIsPng] = useState(false);

    useEffect(() => {
        const checkPng = async () => {
            if (shape?.src) {
                const result = await isPngImage(shape.src);
                setIsPng(result);
            }
        };
        checkPng();
    }, [shape?.src]);

    useEffect(() => {
        if (shape && shape.src) {
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
                setLoadedImage(img);
            };
            img.onerror = () => {
                setImageLoadCounterPageWise((prev) => ({
                    ...prev,
                    [index]: (prev[index] || 1) - 1,
                }));
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
        shape?.effect?.borderStyle,
        shape?.effect?.borderRoundedCorners,
        shape?.effect?.cornerRadius,
        shape?.effect?.individualCorners,
        shape?.effect?.topLeftRadius,
        shape?.effect?.topRightRadius,
        shape?.effect?.bottomRightRadius,
        shape?.effect?.bottomLeftRadius,
    ]);

    const handleGroupClick = (e) => {
        e.cancelBubble = true;
        if (onSelect) {
            onSelect(e.currentTarget, e);
        }
    };


    const shapeWidth = shape?.width || loadedImage?.width || 0;
    const shapeHeight = shape?.height || loadedImage?.height || 0;
    const shapeEffect = shape?.effect || {};
    const shapeCornerRadius = shapeEffect.cornerRadius || 0;
    const maxRadius = Math.max(0, Math.min(shapeWidth / 2, shapeHeight / 2)); // Cap radius to half the smallest dimension

    // Limit each corner radius to prevent overextension and ensure it's not negative
    const getRadius = (r) => Math.max(0, Math.min(r || 0, maxRadius));

    const topLeftRadius = shapeEffect.individualCorners ? getRadius(shapeEffect.topLeftRadius) : getRadius(shapeCornerRadius);
    const topRightRadius = shapeEffect.individualCorners ? getRadius(shapeEffect.topRightRadius) : getRadius(shapeCornerRadius);
    const bottomRightRadius = shapeEffect.individualCorners ? getRadius(shapeEffect.bottomRightRadius) : getRadius(shapeCornerRadius);
    const bottomLeftRadius = shapeEffect.individualCorners ? getRadius(shapeEffect.bottomLeftRadius) : getRadius(shapeCornerRadius);

    if (!loadedImage) return null;

    // Check if this is a PNG image - use transparent fill to preserve transparency
    const shadowRectFill = isPng ? 'transparent' : '#000000';

    const borderWidth = shapeEffect.isBorderEnabled ? (shapeEffect.borderWidth || 0) : 0;
    const borderColor = shapeEffect.isBorderEnabled ? (shapeEffect.borderColor || 'black') : 'transparent';
    const lineCap = shapeEffect.borderRoundedCorners ? 'round' : 'butt';

    // Calculate border radii for the border Rect so its outer edge matches the clip path.
    // The border is drawn centered on the path.
    // Outer edge radius = Path Radius + BorderWidth / 2.
    // We want Outer Edge Radius = Clip Radius.
    // So Path Radius = Clip Radius - BorderWidth / 2.
    const getBorderRectRadius = (clipRadius) => Math.max(0, clipRadius - borderWidth / 2);

    const borderRadii = [
        getBorderRectRadius(topLeftRadius),
        getBorderRectRadius(topRightRadius),
        getBorderRectRadius(bottomRightRadius),
        getBorderRectRadius(bottomLeftRadius)
    ];

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
            {/* Rectangle with shadow (Background) - Transparent for PNG to preserve transparency */}
            <Rect
                ref={ractRef}
                x={2}
                y={2}
                width={Math.max(0, shapeWidth - 4)}
                height={Math.max(0, shapeHeight - 4)}
                cornerRadius={[topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius]}
                fill={shadowRectFill}
                listening={false}
            />

            {/* Content Group (Handles Flip) */}
            <Group
                width={shapeWidth}
                height={shapeHeight}
                fill={'z'}
                x={shape.flipX ? shapeWidth : 0}
                y={shape.flipY ? shapeHeight : 0}
                scaleX={shape.flipX ? -1 : 1}
                scaleY={shape.flipY ? -1 : 1}
            >
                {/* Clipped Image Group */}
                <Group
                    clipFunc={(ctx) => {
                        ctx.beginPath();
                        ctx.moveTo(topLeftRadius, 0);
                        ctx.lineTo(shapeWidth - topRightRadius, 0);
                        ctx.arcTo(shapeWidth, 0, shapeWidth, topRightRadius, topRightRadius);
                        ctx.lineTo(shapeWidth, shapeHeight - bottomRightRadius);
                        ctx.arcTo(shapeWidth, shapeHeight, shapeWidth - bottomRightRadius, shapeHeight, bottomRightRadius);
                        ctx.lineTo(bottomLeftRadius, shapeHeight);
                        ctx.arcTo(0, shapeHeight, 0, shapeHeight - bottomLeftRadius, bottomLeftRadius);
                        ctx.lineTo(0, topLeftRadius);
                        ctx.arcTo(0, 0, topLeftRadius, 0, topLeftRadius);
                        ctx.closePath();
                    }}
                >
                    <Rect
                        x={0}
                        y={0}
                        width={shapeWidth}
                        height={shapeHeight}
                        fill={shape.fill || 'white'}
                    />
                    <Image
                        image={loadedImage}
                        x={0}
                        y={0}
                        width={shapeWidth}
                        height={shapeHeight}
                        ref={imageRef}
                    />
                    {shapeEffect.isBorderEnabled && borderWidth > 0 && (
                        <Rect
                            x={borderWidth / 2}
                            y={borderWidth / 2}
                            width={Math.max(0, shapeWidth - borderWidth)}
                            height={Math.max(0, shapeHeight - borderWidth)}
                            cornerRadius={borderRadii}
                            stroke={borderColor}
                            strokeWidth={borderWidth}
                            lineCap={lineCap}
                            listening={false}
                        />
                    )}
                </Group>

                {/* Border Rect (Overlay - Always on top) */}
            </Group>
        </Group>
    );
}