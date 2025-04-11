import React, { useEffect, useRef, useState } from 'react';
import { Image, Group } from 'react-konva';

const MaskedImage = ({
  shape,
  onSelect,
  handleDragStart,
  handleDrag,
  ...props
}) => {
  const groupRef = useRef();
  const imageRef = useRef();
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!shape.src) return;

    const img = new window.Image();
    img.src = shape.src;
    img.crossOrigin = 'Anonymous';
    img.onload = () => setImage(img);
  }, [shape.src]);

  const getClipFunc = (D) => {
    const $ = shape.maskData;
    if ($) {
      var W = $;
      D.beginPath();
      for (var G = 0; G < W.length; G++) {
        var I = W[G].command
          , F = W[G].points;
        switch (I) {
          case "L":
            D.lineTo(F[0], F[1]);
            break;
          case "M":
            D.moveTo(F[0], F[1]);
            break;
          case "C":
            D.bezierCurveTo(F[0], F[1], F[2], F[3], F[4], F[5]);
            break;
          case "Q":
            D.quadraticCurveTo(F[0], F[1], F[2], F[3]);
            break;
          case "A":
            var B = F[0]
              , J = F[1]
              , r0 = F[2]
              , n0 = F[3]
              , t0 = F[4]
              , q = F[5]
              , e0 = F[6]
              , i0 = F[7]
              , l0 = r0 > n0 ? r0 : n0
              , h0 = r0 > n0 ? 1 : r0 / n0
              , v0 = r0 > n0 ? n0 / r0 : 1;
            D.translate(B, J),
              D.rotate(e0),
              D.scale(h0, v0),
              D.arc(0, 0, l0, t0, t0 + q, 1 - i0),
              D.scale(1 / h0, 1 / v0),
              D.rotate(-e0),
              D.translate(-B, -J);
            break;
          case "z":
            D.closePath()
        }
      }
    }
  };
  const handleGroupClick = (e) => {
    e.cancelBubble = true;
    onSelect?.(e.currentTarget);
  };

  return (
    <Group
      ref={groupRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDrag}
      onClick={handleGroupClick}
      onTap={handleGroupClick}
      clipFunc={getClipFunc}
      name="shape"
      id={shape.id}
      {...shape}
      {...props}
    >
      <Image
        ref={imageRef}
        image={image}
        width={shape.width}
        height={shape.height}
      />
    </Group >
  );
};

export default MaskedImage;