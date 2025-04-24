import { EffectEvent } from '@/utils/EffectEvent';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Group, Rect } from 'react-konva';

const MaskedImage = ({
  shape,
  isCropping,
  onSelect,
  handleDragStart,
  handleDrag,
  ...props
}) => {
  const groupRef = useRef();
  const imageRef = useRef();
  const rectRef = useRef();
  const [image, setImage] = useState(null);

  // Load the image
  useEffect(() => {
    if (!shape?.src) return;

    const img = new window.Image();
    img.src = shape.src;
    img.crossOrigin = 'Anonymous';
    img.onload = () => setImage(img);
  }, [shape?.src]);

  // Apply effects and cropping
  useEffect(() => {
    if (!image || !imageRef.current) return;

    const node = imageRef.current;
    const rectNode = rectRef.current;

    // Apply cropping if available
    if (shape && shape.cropImage) {
      try {
        const cropImage = typeof shape.cropImage === 'string'
          ? JSON.parse(shape.cropImage)
          : shape.cropImage;

        if (cropImage && cropImage.attrs) {
          // Apply cropping attributes to the image node
          // groupRef.current.attrs.scaleX *= cropImage.attrs.scaleX || 1;
          // groupRef.current.attrs.scaleY *= cropImage.attrs.scaleY || 1;
          // cropImage.attrs.scaleX = 1;
          // cropImage.attrs.scaleY = 1
          node.cropTransform({ ...cropImage.attrs });
        }
      } catch (error) {
        console.error("Error parsing cropImage:", error);
      }
    }

    // Apply effects
    EffectEvent(shape, rectNode, node);
    node.getLayer()?.batchDraw();
  }, [
    image,
    isCropping,
    shape,
  ]);

  // Get the mask clipping function
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

  const handleGroupClick = (e) => {
    e.cancelBubble = true;
    onSelect?.(e.currentTarget);
  };

  // Get shape dimensions
  const shapeWidth = shape?.width || image?.width || 0;
  const shapeHeight = shape?.height || image?.height || 0;

  console.log(shape);

  // Get corner radius values from shape effect
  const shapeEffect = shape?.effect || {};
  if (!image) return null;

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
      {/* Shadow Rectangle */}
      <Rect
        ref={rectRef}
        x={0 + 2}
        y={0 + 2}
        width={shapeWidth - 4}
        height={shapeHeight - 4}
        fill="#000000"
      />

      {/* Masked Image Group */}
      <Group
        clipFunc={shape.maskData ? getClipFunc : null}
        x={0}
        y={0}
        width={shapeWidth}
        height={shapeHeight}
        fill={shape.fill || 'white'}
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
          image={image}
          x={shape.flipX ? shapeWidth : 0}
          y={shape.flipY ? shapeHeight : 0}
          width={shapeWidth}
          height={shapeHeight}
          scaleX={shape.flipX ? -1 : 1}
          scaleY={shape.flipY ? -1 : 1}
          zIndex={1}
        />
      </Group>
    </Group>
  );
};

export default MaskedImage;