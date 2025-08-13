import React from 'react';

// Helper function to parse hex color to RGB
function parseHexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}

export default function StockGif({ shape }) {
    let crop = {};

    let directUrl = shape.src;
    if (typeof shape.src === 'string' && shape.src.includes('src=')) {
        const match = shape.src.match(/src=([^&]+)/);
        if (match && match[1]) {
            directUrl = decodeURIComponent(match[1]);
        }
    }

    if (shape.cropImage) {
        try {
            crop = JSON.parse(shape.cropImage).attrs;
        } catch (e) {
            console.error("Failed to parse cropImage:", e);
        }
    }

    let effect = {};
    if (shape.effect) {
        try {
            effect = shape.effect;
        } catch (e) {
            console.error("Failed to parse effect:", e);
        }
    }

    // Use crop dimensions if valid, otherwise fall back to shape dimensions
    const displayWidth = crop.width && crop.height ? crop.width : shape.width;
    const displayHeight = crop.height && crop.width ? crop.height : shape.height;

    // Build effect-related styles
    const effectStyles = {};
    // Corner radius
    if (effect.individualCorners) {
        effectStyles.borderTopLeftRadius = `${effect.topLeftRadius || 0}px`;
        effectStyles.borderTopRightRadius = `${effect.topRightRadius || 0}px`;
        effectStyles.borderBottomRightRadius = `${effect.bottomRightRadius || 0}px`;
        effectStyles.borderBottomLeftRadius = `${effect.bottomLeftRadius || 0}px`;
    } else {
        effectStyles.borderRadius = `${effect.cornerRadius || 0}px`;
        effectStyles.borderTopLeftRadius = `none`;
        effectStyles.borderTopRightRadius = `none`;
        effectStyles.borderBottomRightRadius = `none`;
        effectStyles.borderBottomLeftRadius = `none`;
    }
    // Shadow (applied to image)
    if (effect.isShadowEnabled) {
        const shadowOpacity = (effect.shadowOpacity || 0) / 100;
        const shadowColor = effect.shadowColor || '#000000';
        effectStyles.boxShadow = `${effect.shadowOffsetX || 0}px ${effect.shadowOffsetY || 0}px ${effect.shadowBlur || 0}px rgba(${parseHexToRgb(shadowColor)}, ${shadowOpacity})`;
        effectStyles.backgroundColor = `rgba(${parseHexToRgb(shadowColor)}, ${shadowOpacity})`;
    }
    // Filters (applied to image)
    const filters = [];
    if (effect.brightness) filters.push(`brightness(${effect.brightness / 100 + 1})`);
    if (effect.contrast) filters.push(`contrast(${effect.contrast / 100 + 1})`);
    if (effect.saturation) filters.push(`saturate(${effect.saturation / 100 + 1})`);
    if (effect.blur) filters.push(`blur(${effect.blur / 100 + 1}px)`);
    if (effect.grayscale) filters.push(`grayscale(${effect.grayscale / 100 + 1})`);
    if (filters.length > 0) {
        effectStyles.filter = filters.join(' ');
    }

    // opacity
    if (shape.opacity !== undefined) {
        effectStyles.opacity = shape.opacity;
    }

    // Common transform for both container and image
    const transform = `rotate(${shape.rotation || 0}deg)
        scaleX(${shape.scaleX || 1})
        scaleY(${shape.scaleY || 1})
        skewX(${shape.skewX || 0}deg)
        skewY(${shape.skewY || 0}deg)
        translate(${shape.offsetX || 0}px, ${shape.offsetY || 0}px)`;

    return (
        <div
            style={{
                height: `${displayHeight}px`,
                width: `${displayWidth}px`,
                position: "absolute",
                left: `${shape.x + ((crop.width && crop.height ? crop.x || 0 : 0) * (shape.scaleX || 1))}px`,
                top: `${shape.y + ((crop.width && crop.height ? crop.y || 0 : 0) * (shape.scaleY || 1))}px`,
                transformOrigin: "0 0",
                transform,
                display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
            }}
        >
            <div style={{
                width: `calc(100% - ${crop.x * -1 || 0}px - ${(crop.width - shape.width - crop.x * -1) || 0}px)`,
                height: `calc(100% - ${crop.y * -1 || 0}px - ${(crop.height - shape.height - crop.y * -1) || 0}px)`,
                left: `${crop.x * -1 || 0}px`,
                top: `${crop.y * -1 || 0}px`,
                position: "absolute",
                backgroundColor: effectStyles.backgroundColor || 'white',
                overflow: "hidden",
                boxShadow: effectStyles.boxShadow || 'none',
                borderRadius: effectStyles.borderRadius || '0px',
                borderTopLeftRadius: effectStyles.borderTopLeftRadius || '0px',
                borderTopRightRadius: effectStyles.borderTopRightRadius || '0px',
                borderBottomRightRadius: effectStyles.borderBottomRightRadius || '0px',
                borderBottomLeftRadius: effectStyles.borderBottomLeftRadius || '0px',
            }}>
                <img
                    className="stock-photo"
                    src={directUrl}
                    alt={shape.title}
                    style={{
                        position: "absolute",
                        left: `${crop.x || 0}px`,
                        top: `${crop.y || 0}px`,
                        height: `${displayHeight}px`,
                        width: `${displayWidth}px`,
                        transformOrigin: "0 0",
                        display: "block",
                        clipPath: crop.width && crop.height && crop.x && crop.y
                            ? `inset(${crop.y * -1}px ${crop.width - shape.width - crop.x * -1}px ${crop.height - shape.height - crop.y * -1}px ${crop.x * -1}px)`
                            : 'none',
                        ...effectStyles,
                        boxShadow: 'none',
                        borderRadius: '0px',
                    }}
                />
            </div>
        </div>
    );
}