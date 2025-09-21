import React, { useEffect, useState, useRef } from 'react';
import { Image } from 'react-konva';

export default function LinkButton({ shape, handleDragStart, handleDrag, ...props }) {
    const [image, setImage] = useState(null);
    const imageRef = useRef(null);

    useEffect(() => {
        if (shape.src) {
            const img = new window.Image();
            img.src = shape.src;
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                setImage(img);
            };
        }
    }, [shape.src]);

    useEffect(() => {
        if (imageRef.current) {
            const konvaImageNode = imageRef.current;
            if (shape && shape.cropImage) {
                try {
                    const cropImage = JSON.parse(shape.cropImage);
                    if (cropImage && cropImage.attrs) {
                        konvaImageNode.cropTransform({ ...cropImage.attrs });
                    }
                } catch (error) {
                    console.error("Error parsing cropImage:", error);
                }
            }
        }
    }, [image, shape]);
    if (!image) {
        return null;
    }

    return (
        <Image
            {...props}
            {...shape}
            onDragStart={handleDragStart}
            onDragEnd={handleDrag}
            name="shape"
            image={image}
            draggable={true}
            ref={imageRef}
        />
    );
}
