import React, { useState, useEffect } from 'react';

export default function EmbedCode({ shape, isVisible }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        if (isVisible && shape?.htmlData?.embedCode) {
            const timer = setTimeout(() => setIsLoading(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, shape?.htmlData?.embedCode]);

    if (shape?.htmlData?.embedCode) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // width: `${shape.width}px`,
                // height: `${shape.height}px`,
                position: "absolute",
                left: `${shape.x}px`,
                top: `${shape.y}px`,
                transformOrigin: "0 0",
                transform: `rotate(${shape.rotation || 0}deg)
                skewX(${shape.skewX || 0}deg)
                skewY(${shape.skewY || 0}deg)
                translate(${shape.offsetX || 0}px, ${shape.offsetY || 0}px)`,
                overflow: "hidden"
            }}>
                <style>{`
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.5; }
                    }
                `}</style>
                <div style={{ position: 'relative', width: `${shape.width * shape.scaleX}px`, height: `${shape.height * shape.scaleY}px` }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: shape.htmlData?.coverImage?.url ? `url(${shape.htmlData.coverImage.url})` : 'none',
                        backgroundColor: shape.htmlData?.coverImage?.url ? 'transparent' : '#f0f0f0',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: isLoading ? 1 : 0,
                        transition: 'opacity 0.5s ease',
                        pointerEvents: isLoading ? 'auto' : 'none',
                        zIndex: 1
                    }} />
                    {isVisible && (
                        <div
                            className="embed-code-1"
                            style={{
                                width: '100%',
                                height: '100%',
                                opacity: isLoading ? 0 : 1,
                                transition: 'opacity 0.5s ease'
                            }}
                            dangerouslySetInnerHTML={{ __html: shape.htmlData.embedCode }}
                        />
                    )}
                </div>
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
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
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
