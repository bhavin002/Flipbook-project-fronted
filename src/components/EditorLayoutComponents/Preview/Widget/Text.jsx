import React from 'react';

export default function Text({ shape }) {
    return (
        <p
            style={{
                width: `${shape.width}px`,
                height: `${shape.height}px`,
                color: shape.fill,
                opacity: shape.opacity,
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
                fontFamily: shape.fontFamily,
                fontSize: `${shape.fontSize}px`,
                textDecoration: shape.textDecoration,
                letterSpacing: `${shape.letterSpacing}px`,
                lineHeight: shape.lineHeight || 1,
                textAlign: shape.align,
                fontWeight: shape.fontStyle?.split(" ").includes("bold")
                    ? "bold"
                    : "normal",
                fontStyle: shape.fontStyle?.split(" ").includes("italic")
                    ? "italic"
                    : "normal",
                wordBreak: 'break-word'
            }}
        >
            {shape.text}
        </p>
    );
} 