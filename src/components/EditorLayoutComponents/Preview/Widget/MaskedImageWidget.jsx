import React from "react";
// Helper: parse HEX → RGB
function parseHexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}

export default function MaskedImageWidget({ shape, flipbookRef }) {


    // Extract direct image URL
    let directUrl = shape.src;
    if (typeof shape.src === "string" && shape.src.includes("src=")) {
        const match = shape.src.match(/src=([^&]+)/);
        if (match && match[1]) directUrl = decodeURIComponent(match[1]);
    }

    // Parse crop data
    let crop = {};
    if (shape.cropImage) {
        try {
            crop = JSON.parse(shape.cropImage).attrs;
        } catch (e) {
            console.error("Failed to parse cropImage:", e);
        }
    }

    // Parse effect data
    let effect = {};
    if (shape.effect) {
        try {
            effect = shape.effect;
        } catch (e) {
            console.error("Failed to parse effect:", e);
        }
    }

    // Dimensions
    const displayWidth = crop.width && crop.height ? crop.width : shape.width;
    const displayHeight = crop.height && crop.width ? crop.height : shape.height;

    // === Build visual effect styles ===
    const effectStyles = {};

    // Corner radius
    if (effect.individualCorners) {
        effectStyles.borderTopLeftRadius = `${effect.topLeftRadius || 0}px`;
        effectStyles.borderTopRightRadius = `${effect.topRightRadius || 0}px`;
        effectStyles.borderBottomRightRadius = `${effect.bottomRightRadius || 0}px`;
        effectStyles.borderBottomLeftRadius = `${effect.bottomLeftRadius || 0}px`;
    } else {
        effectStyles.borderRadius = `${effect.cornerRadius || 0}px`;
    }

    // Shadow
    if (effect.isShadowEnabled) {
        const shadowOpacity = (effect.shadowOpacity || 0) / 100;
        const shadowColor = effect.shadowColor || "#000000";
        effectStyles.boxShadow = `${effect.shadowOffsetX || 0}px ${effect.shadowOffsetY || 0}px ${effect.shadowBlur || 0
            }px rgba(${parseHexToRgb(shadowColor)}, ${shadowOpacity})`;
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
            {/* Cropped + Masked image */}
            <image
                href={directUrl}
                x={crop.x || 0}
                y={crop.y || 0}
                width={displayWidth}
                height={displayHeight}
                preserveAspectRatio="none"
                clipPath={shape.maskData ? `url(#${maskId})` : undefined}
                style={{
                    ...effectStyles,
                }}
            />
        </svg>
    );
} 