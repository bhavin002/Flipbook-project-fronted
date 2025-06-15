import React from 'react';

export default function StockVideo({ shape }) {
    return (
        <video
            src={shape.src}
            alt={shape.title}
            controls="true"
            playsInline="true"
            muted="true"
            volume="1"
            style={{
                height: `${shape.height}px`,
                width: `${shape.width}px`,
                position: "absolute",
                left: `${shape.x}px`,
                top: `${shape.y}px`,
                transformOrigin: "0 0",
                transform: `rotate(${shape.rotation || 0}deg)
            scaleX(${shape.scaleX || 1})
            scaleY(${shape.scaleY || 1})
            skewX(${shape.skewX || 0}deg)
            skewY(${shape.skewY || 0}deg)
            translate(${shape.offsetX || 0}px, ${shape.offsetY || 0}px)`,
                display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                cursor: 'pointer'
            }}
        ></video>
    );
} 