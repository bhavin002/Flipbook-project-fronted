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
                    {shape.data.map((element, index) => {
                        if (element.type === 'path') {
                            return <path d={element.data} />
                        }
                        else if (element.type === 'rect') {
                            return <rect
                                key={`rect-${index}`}
                                x={Number(element.x) || 0}
                                y={Number(element.y) || 0}
                                width={Number(element.width)}
                                height={Number(element.height)}
                            />
                        } else if (element.type === 'polygon') {
                            return <polygon
                                key={`polygon-${index}`}
                                points={element.points}
                            />
                        } else if (element.type === 'circle') {
                            return <circle
                                key={`circle-${index}`}
                                cx={Number(element.cx) || 0}
                                cy={Number(element.cy) || 0}
                                r={Number(element.r) || 0}
                            />
                        } else if (element.type === 'ellipse') {
                            return <ellipse
                                key={`ellipse-${index}`}
                                cx={Number(element.cx) || 0}
                                cy={Number(element.cy) || 0}
                                rx={Number(element.rx) || 0}
                                ry={Number(element.ry) || 0}
                            />
                        }
                    })}
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