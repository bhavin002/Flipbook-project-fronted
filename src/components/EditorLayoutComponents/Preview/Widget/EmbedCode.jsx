import React from 'react';

export default function EmbedCode({ shape }) {
    console.log("shape EmbedCode ?", shape);
    if (shape?.htmlData?.embedCode) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
                overflow: "hidden"
            }}>
                <div
                    className="embed-code-1"
                    dangerouslySetInnerHTML={{ __html: shape.htmlData.embedCode }}
                />
            </div>
        )
    } else {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
                backgroundImage: (shape.htmlData?.coverImage?.url && shape.htmlData.embedCode) ? `url(${shape.htmlData.coverImage.url})` : "",
            }}>
                <div
                    style={{
                        width: `100%`,
                        height: `100%`,
                        backgroundColor: shape.fill,
                        opacity: shape.opacity,
                        display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                    }}
                />
                <img
                    src={shape.src}
                    alt={shape.title}
                    style={{
                        width: `30px`,
                        height: `30px`,
                        position: "absolute",
                        display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                    }}
                />
            </div>
        );
    }
} 