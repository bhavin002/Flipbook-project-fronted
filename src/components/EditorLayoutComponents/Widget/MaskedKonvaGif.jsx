import React, { useEffect, useMemo, useRef } from 'react';
import { Group, Image, Rect } from 'react-konva';
import 'gifler';

export default function MaskedKonvaGif({
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

    // Create a canvas for GIF rendering
    const canvas = useMemo(() => {
        const node = document.createElement('canvas');
        return node;
    }, []);

    // Handle GIF animation
    useEffect(() => {
        let anim;
        try {
            if (!shape.src.includes('.gif')) return;
            setImageLoadCounterPageWise((prev) => ({
                ...prev,
                [index]: (prev[index] || 0) + 1,
            }));
            window.gifler(shape.src).get((a) => {
                anim = a;
                setImageLoadCounterPageWise((prev) => ({
                    ...prev,
                    [index]: (prev[index] || 1) - 1,
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
                setImageLoadCounterPageWise((prev) => ({
                    ...prev,
                    [index]: (prev[index] || 1) - 1,
                }));
            })
        } catch (error) {
            setImageLoadCounterPageWise((prev) => ({
                ...prev,
                [index]: (prev[index] || 1) - 1,
            }));
            console.error('Error loading GIF:', error);
        }

        return () => {
            if (anim) {
                anim.stop();
            }
        };
    }, [shape.src, canvas, shape.width, shape.height]);

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

        // EffectEvent(shape, rectNode, node);
        // node.getLayer()?.batchDraw();
    }, [
        isCropping,
        shape,
        shape?.fill,
        shape?.effect?.opacity,
    ]);

    const handleGroupClick = (e) => {
        e.cancelBubble = true;
        if (onSelect) {
            onSelect(e.currentTarget);
        }
    };

    const getClipFunc = (ctx) => {
        const maskData = shape.maskData;
        if (maskData) {
            var paths = maskData;
            ctx.beginPath();
            for (var i = 0; i < paths.length; i++) {
                var cmd = paths[i].command;
                var points = paths[i].points;
                switch (cmd) {
                    case "L":
                        ctx.lineTo(points[0], points[1]);
                        break;
                    case "M":
                        ctx.moveTo(points[0], points[1]);
                        break;
                    case "C":
                        ctx.bezierCurveTo(points[0], points[1], points[2], points[3], points[4], points[5]);
                        break;
                    case "Q":
                        ctx.quadraticCurveTo(points[0], points[1], points[2], points[3]);
                        break;
                    case "A":
                        var cx = points[0],
                            cy = points[1],
                            rx = points[2],
                            ry = points[3],
                            sa = points[4],
                            ea = points[5],
                            rot = points[6],
                            counterclockwise = points[7],
                            r = rx > ry ? rx : ry,
                            scaleX = rx > ry ? 1 : rx / ry,
                            scaleY = rx > ry ? ry / rx : 1;
                        ctx.translate(cx, cy);
                        ctx.rotate(rot);
                        ctx.scale(scaleX, scaleY);
                        ctx.arc(0, 0, r, sa, sa + ea, 1 - counterclockwise);
                        ctx.scale(1 / scaleX, 1 / scaleY);
                        ctx.rotate(-rot);
                        ctx.translate(-cx, -cy);
                        break;
                    case "z":
                        ctx.closePath();
                        break;
                }
            }
        }
    };

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
            name="shape"
            id={shape.id}
            clipFunc={shape.maskData ? getClipFunc : null}
            {...shape}
            {...props}
        >
            {/* Rectangle with shadow */}
            <Rect
                ref={rectRef}
                x={0 + 2}
                y={0 + 2}
                width={shapeWidth - 4}
                height={shapeHeight - 4}
                fill="#000000"
            />

            {/* Nested Group with clipping */}
            <Group
                clipFunc={shape.maskData ? getClipFunc : null}
                x={0}
                y={0}
                width={shapeWidth}
                height={shapeHeight}
                fill={shape.fill || 'white'}
                scaleX={shape.flipX ? -1 : 1}
                scaleY={shape.flipY ? -1 : 1}
                offsetX={shape.flipX ? shapeWidth : 0}
                offsetY={shape.flipY ? shapeHeight : 0}
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
                    ref={imageRef}
                    image={canvas}
                    x={0}
                    y={0}
                    width={shapeWidth}
                    height={shapeHeight}
                    scaleX={1}
                    scaleY={1}
                    zIndex={1}
                />
            </Group>
        </Group>
    );
}