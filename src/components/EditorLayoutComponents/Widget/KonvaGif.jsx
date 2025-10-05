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
                setImageLoadCounterPageWise((prev) => ({
                    ...prev,
                    [index]: (prev[index] || 0) + 1,
                }));
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
            }).catch((error) => {
                setImageLoadCounterPageWise(prev => prev - 1)
            });
        } catch (error) {
            setImageLoadCounterPageWise(prev => prev - 1)
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
    const shapeWidth = shape?.width || canvas.width || 0;
    const shapeHeight = shape?.height || canvas.height || 0;

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
                fill={shape?.effect?.shadowColor || '#000000'}
            />

            {/* Nested Group with clipping */}
            <Group
                x={0}
                y={0}
                width={shapeWidth}
                height={shapeHeight}
                ref={clipGroupRef}
                // fill={"#00000000"}
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
                    width={shapeWidth}
                    height={shapeHeight}
                    // fill={shape.fill || "#00000000"}
                    zIndex={0}
                    x={shape.flipX ? shapeWidth : 0}
                    y={shape.flipY ? shapeHeight : 0}
                    scaleX={shape.flipX ? -1 : 1}
                    scaleY={shape.flipY ? -1 : 1}
                />
                <Image
                    image={canvas}
                    x={0}
                    y={0}
                    scaleX={1}
                    scaleY={1}
                    width={shapeWidth}
                    height={shapeHeight}
                    ref={imageRef}
                    zIndex={1}
                />
            </Group>
        </Group>
    );
}