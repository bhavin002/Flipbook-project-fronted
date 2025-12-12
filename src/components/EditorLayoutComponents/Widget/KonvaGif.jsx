import React, { useEffect, useMemo, useRef } from 'react';
import { Group, Image, Rect } from 'react-konva';
import 'gifler';
import { EffectEvent } from '@/utils/EffectEvent';

export default function KonvaGif({
    shape,
    isCropping,
    handleDragStart,
    handleDrag,
    onSelect,
    index, imageLoadCounterPageWise, setImageLoadCounterPageWise,
    ...props
}) {
    const imageRef = useRef(null);
    const rectRef = useRef(null);
    const groupRef = useRef();
    const clipGroupRef = useRef();

    // Create a canvas for GIF rendering
    const canvas = useMemo(() => {
        const node = document.createElement('canvas');
        return node;
    }, []);
    console.log("imageLoadCounterPageWise", imageLoadCounterPageWise);

    // Handle GIF animation
    useEffect(() => {
        let anim;
        try {
            // const imgSrc = `${import.meta.env.VITE_API_URL}/file/image?src=${encodeURIComponent(shape.src)}`
            setImageLoadCounterPageWise((prev) => ({
                ...prev,
                [index]: (prev[index] || 0) + 1,
            }));
            const imgSrc = shape?.src;

            window.gifler(imgSrc).get((a) => {
                anim = a;

                // Set canvas dimensions to match shape
                canvas.width = shape.width || anim.frames[0].width;
                canvas.height = shape.height || anim.frames[0].height;
                anim.animateInCanvas(canvas);
                anim.onDrawFrame = (ctx, frame) => {
                    ctx.drawImage(frame.buffer, frame.x, frame.y);
                    if (imageRef.current && imageRef.current.getLayer()) {
                        imageRef.current.getLayer().draw();
                    }
                };
                setTimeout(() => {
                    setImageLoadCounterPageWise((prev) => ({
                        ...prev,
                        [index]: (prev[index] || 0) - 1,
                    }));
                }, 0);
            })
        } catch (error) {
            setImageLoadCounterPageWise((prev) => ({
                ...prev,
                [index]: (prev[index] || 0) - 1,
            }));
        }

        return () => {
            if (anim) {
                anim.stop();
            }
        };
    }, [canvas, shape.width, shape.height]);

    // Apply effects and cropping
    useEffect(() => {
        if (!imageRef.current) return;
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

        EffectEvent(shape, rectNode, node);
        node.getLayer()?.batchDraw();
    }, [
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
            onSelect(e.currentTarget);
        }
    };

    const shapeWidth = shape?.width || canvas.width || 0;
    const shapeHeight = shape?.height || canvas.height || 0;
    const shapeEffect = shape?.effect || {};
    const shapeCornerRadius = shapeEffect.cornerRadius || 0;
    const maxRadius = Math.min(shapeWidth / 2, shapeHeight / 2); // Cap radius to half the smallest dimension

    // Limit each corner radius to prevent overextension
    const getRadius = (r) => Math.min(r || 0, maxRadius);

    const topLeftRadius = shapeEffect.individualCorners ? getRadius(shapeEffect.topLeftRadius) : getRadius(shapeCornerRadius);
    const topRightRadius = shapeEffect.individualCorners ? getRadius(shapeEffect.topRightRadius) : getRadius(shapeCornerRadius);
    const bottomRightRadius = shapeEffect.individualCorners ? getRadius(shapeEffect.bottomRightRadius) : getRadius(shapeCornerRadius);
    const bottomLeftRadius = shapeEffect.individualCorners ? getRadius(shapeEffect.bottomLeftRadius) : getRadius(shapeCornerRadius);
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
            {/* Rectangle with shadow */}
            <Rect
                ref={rectRef}
                x={0 + 2}
                y={0 + 2}
                width={shapeWidth - 4}
                height={shapeHeight - 4}
                cornerRadius={[
                    topLeftRadius,
                    topRightRadius,
                    bottomRightRadius,
                    bottomLeftRadius,
                ]}
                fill={'transparent'}
            />

            {/* Content Group (Handles Flip) */}
            <Group
                width={shapeWidth}
                height={shapeHeight}
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
                        image={canvas}
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
                            width={shapeWidth - borderWidth}
                            height={shapeHeight - borderWidth}
                            cornerRadius={borderRadii}
                            stroke={borderColor}
                            strokeWidth={borderWidth}
                            lineCap={lineCap}
                            listening={false}
                        />
                    )}
                </Group>
            </Group>
        </Group>
    );
}