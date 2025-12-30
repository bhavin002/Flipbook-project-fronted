import React, { useEffect, useMemo, useRef } from 'react';
import { Group, Image, Rect } from 'react-konva';
import 'gifler';

export default function MaskedKonvaGif({
    shape,
    isCropping,
    handleDragStart,
    handleDrag,
    onSelect,
    index,
    imageLoadCounterPageWise,
    setImageLoadCounterPageWise,
    ...props
}) {
    const imageRef = useRef(null);
    const rectRef = useRef(null);
    const groupRef = useRef();

    // Create canvas for GIF rendering
    const canvas = useMemo(() => {
        const node = document.createElement('canvas');
        return node;
    }, []);

    // -------------------------------
    // Handle GIF animation
    // -------------------------------
    useEffect(() => {
        let anim;
        try {
            if (!shape.src?.includes('.gif')) return;

            setImageLoadCounterPageWise((prev) => ({
                ...prev,
                [index]: (prev[index] || 0) + 1,
            }));

            window.gifler(shape.src)
                .get((a) => {
                    anim = a;
                    setImageLoadCounterPageWise((prev) => ({
                        ...prev,
                        [index]: (prev[index] || 1) - 1,
                    }));

                    // Set canvas dimensions
                    canvas.width = shape.width || anim.frames[0].width;
                    canvas.height = shape.height || anim.frames[0].height;

                    anim.animateInCanvas(canvas);

                    anim.onDrawFrame = (ctx, frame) => {
                        ctx.drawImage(frame.buffer, frame.x, frame.y);
                        if (imageRef.current && imageRef.current.getLayer()) {
                            imageRef.current.getLayer().draw();
                        }
                    };
                })
        } catch (error) {
            console.error('Error loading GIF:', error);
            setImageLoadCounterPageWise((prev) => ({
                ...prev,
                [index]: (prev[index] || 1) - 1,
            }));
        }

        return () => {
            if (anim) anim.stop();
        };
    }, [shape.src, canvas, shape.width, shape.height]);

    // -------------------------------
    // Apply cropping (optional)
    // -------------------------------
    useEffect(() => {
        if (!imageRef.current) return;
        const node = imageRef.current;

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
    }, [isCropping, shape]);

    // -------------------------------
    // Handle selection
    // -------------------------------
    const handleGroupClick = (e) => {
        e.cancelBubble = true;
        onSelect?.(e.currentTarget, e);
    };

    // -------------------------------
    // Multiple maskData clip function
    // -------------------------------
    const getClipFunc = (ctx) => {
        const allMasks = shape.maskData || [];
        ctx.beginPath();

        allMasks.forEach((maskData) => {
            if (!maskData) return;

            maskData.forEach(({ command: cmd, points }) => {
                switch (cmd) {
                    case 'M':
                        ctx.moveTo(points[0], points[1]);
                        break;
                    case 'L':
                        ctx.lineTo(points[0], points[1]);
                        break;
                    case 'C':
                        ctx.bezierCurveTo(
                            points[0], points[1],
                            points[2], points[3],
                            points[4], points[5]
                        );
                        break;
                    case 'Q':
                        ctx.quadraticCurveTo(points[0], points[1], points[2], points[3]);
                        break;
                    case 'A': {
                        const [cx, cy, rx, ry, sa, ea, rot, ccw] = points;
                        const r = Math.max(0, Math.max(rx, ry));
                        const scaleX = rx > ry ? 1 : (ry === 0 ? 1 : rx / ry);
                        const scaleY = rx > ry ? (rx === 0 ? 1 : ry / rx) : 1;

                        ctx.save();
                        ctx.translate(cx, cy);
                        ctx.rotate(rot);
                        ctx.scale(scaleX, scaleY);
                        ctx.arc(0, 0, r, sa, sa + ea, !ccw);
                        ctx.restore();
                        break;
                    }
                    case 'z':
                    case 'Z':
                        ctx.closePath();
                        break;
                }
            });
        });
    };

    // -------------------------------
    // Shape dimensions
    // -------------------------------
    const shapeWidth = shape?.width || canvas.width || 0;
    const shapeHeight = shape?.height || canvas.height || 0;

    // -------------------------------
    // Render
    // -------------------------------
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
            // clipFunc={shape.maskData ? getClipFunc : null}
            {...shape}
            {...props}
        >
            {/* Shadow rectangle */}
            <Rect
                x={0}
                y={0}
                width={Math.max(0, shape.width || 100)}
                height={Math.max(0, shape.height || 100)}
                fill="transparent"
            />
            {/* Masked GIF Group */}
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
                <Group>
                    <Rect
                        x={0}
                        y={0}
                        width={Math.max(0, shapeWidth)}
                        height={Math.max(0, shapeHeight)}
                        fill={shape.fill || 'white'}
                    />
                    <Image
                        ref={imageRef}
                        image={canvas}
                        x={0}
                        y={0}
                        width={shapeWidth}
                        height={shapeHeight}
                    />
                </Group>

            </Group>
        </Group>
    );
}
