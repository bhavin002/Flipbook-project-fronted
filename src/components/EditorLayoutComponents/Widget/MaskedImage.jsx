import { EffectEvent } from '@/utils/EffectEvent';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Group, Rect } from 'react-konva';

const MaskedImage = ({
  shape,
  isCropping,
  onSelect,
  handleDragStart,
  handleDrag,
  index,
  imageLoadCounterPageWise,
  setImageLoadCounterPageWise,
  ...props
}) => {
  const groupRef = useRef();
  const imageRef = useRef();
  const rectRef = useRef();
  const [image, setImage] = useState(null);

  // -------------------------------
  // Load the image
  // -------------------------------
  useEffect(() => {
    if (!shape?.src) return;

    const img = new window.Image();
    img.crossOrigin = 'Anonymous';
    img.src = shape.src;

    setImageLoadCounterPageWise((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 1,
    }));

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
    };
  }, [shape?.src]);

  // -------------------------------
  // Apply effects and cropping
  // -------------------------------
  useEffect(() => {
    if (!image || !imageRef.current) return;

    const node = imageRef.current;
    const rectNode = rectRef.current;

    // Apply cropping
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

    // Apply effects
    EffectEvent(shape, rectNode, node);
    node.getLayer()?.batchDraw();
  }, [image, isCropping, shape]);

  // -------------------------------
  // Mask Clip Function (supports multiple masks)
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
  // Group click handler
  // -------------------------------
  const handleGroupClick = (e) => {
    e.cancelBubble = true;
    onSelect?.(e.currentTarget);
  };

  // -------------------------------
  // Shape dimensions and effects
  // -------------------------------
  const shapeWidth = shape?.width || image?.width || 0;
  const shapeHeight = shape?.height || image?.height || 0;

  if (!image) return null;

  // -------------------------------
  // JSX Render
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
      <Rect
        x={0}
        y={0}
        width={Math.max(0, shape.width || 100)}
        height={Math.max(0, shape.height || 100)}
        fill="transparent"
      />
      <Group
        draggable={false}
        clipFunc={shape.maskData ? getClipFunc : null}
        width={shapeWidth}
        height={shapeHeight}
        fill={shape.fill || 'transparent'}
        x={shape.flipX ? shapeWidth : 0}
        y={shape.flipY ? shapeHeight : 0}
        scaleX={shape.flipX ? -1 : 1}
        scaleY={shape.flipY ? -1 : 1}
      >
        <Group>
          <Rect
            draggable={false}
            x={0}
            y={0}
            width={Math.max(0, shapeWidth)}
            height={Math.max(0, shapeHeight)}
            fill={shape.fill || 'transparent'}
          />
          <Image
            draggable={false}
            ref={imageRef}
            image={image}
            x={0}
            y={0}
            width={shapeWidth}
            height={shapeHeight}
          />
        </Group>

      </Group>

    </Group>
  );
};

export default MaskedImage;
