
import React, { useEffect, useMemo, useRef } from 'react';
import { Image } from 'react-konva';
import "gifler";

export default function KonavGif({ shape, handleDragStart, handleDrag, ...props }) {

    const imageRef = useRef(null);

    const canvas = useMemo(() => {
        const node = document.createElement("canvas");
        return node;
    }, []);

    useEffect(() => {
        let anim;
        try {
            window.gifler(shape.src).get(a => {
                anim = a;
                anim.animateInCanvas(canvas);
                anim.onDrawFrame = (ctx, frame) => {
                    ctx.drawImage(frame.buffer, frame.x, frame.y);
                    if (imageRef.current && imageRef.current.getLayer()) {
                        imageRef.current.getLayer().draw();
                    }
                };
            });
        } catch (error) {
            console.error("Error loading GIF:", error);
        }

        return () => {
            if (anim) {
                anim.stop();
            }
        };
    }, [shape.src, canvas]);

    // return <Image image={canvas} ref={imageRef} />;

    return (
        <Image
            {...props}
            {...shape}
            onDragStart={handleDragStart}
            onDragEnd={handleDrag}
            name="shape"
            image={canvas}
            ref={imageRef}
        />
    );
}