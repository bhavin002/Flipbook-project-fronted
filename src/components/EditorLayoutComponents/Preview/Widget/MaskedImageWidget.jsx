import React from 'react';

export default function MaskedImageWidget({ shape }) {
    let directUrl = shape.src;
    if (typeof shape.src === 'string' && shape.src.includes('src=')) {
        const match = shape.src.match(/src=([^&]+)/);
        if (match && match[1]) {
            directUrl = decodeURIComponent(match[1]);
        }
    }

    const maskId = `mask-${shape.id}`;
    return (
        <svg
            height={shape.height}
            width={shape.width}
            xmlns="http://www.w3.org/2000/svg"
            style={{
                width: `${shape.width}px`,
                height: `${shape.height}px`,
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
                display: shape.visible ? "block" : "none",
            }}
        >
            <defs>
                <clipPath id={maskId}>
                    <path d={shape.data} />
                </clipPath>
            </defs>
            <image
                href={directUrl}
                width={shape.width}
                height={shape.height}
                clipPath={shape.maskData ? `url(#${maskId})` : undefined}
                preserveAspectRatio="none"
            />
        </svg>
    );
} 