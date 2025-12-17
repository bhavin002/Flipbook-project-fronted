import React, { useState, useEffect } from 'react';

export default function VideoEmbed({ shape, isVisible }) {
    const [isLoading, setIsLoading] = useState(true);
    let embedUrl = null;
    
    useEffect(() => {
        setIsLoading(true);
        if (isVisible && embedUrl) {
            const timer = setTimeout(() => setIsLoading(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, embedUrl]);

    if (shape.htmlData?.url) {
        const url = shape.htmlData.url;
        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(youtubeRegex);

        if (match) {
            const videoId = match[1];
            embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
        } else {
            embedUrl = url;
        }
    }

    return (
        <div
            style={{
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
            }}>
            {embedUrl ? (
                <div style={{
                    position: 'relative',
                    width: `${shape.width * shape.scaleX}px`,
                    height: `${shape.height * shape.scaleY}px`
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: isLoading ? 1 : 0,
                        transition: 'opacity 0.5s ease',
                        pointerEvents: isLoading ? 'auto' : 'none',
                        zIndex: 1
                    }}>
                        <img 
                            src="/assets/icons/Play.svg" 
                            alt="Play" 
                            style={{ width: '60px', height: '60px' }}
                        />
                    </div>
                    {isVisible && (
                        <iframe
                            style={{
                                width: '100%',
                                height: '100%',
                                opacity: isLoading ? 0 : 1,
                                transition: 'opacity 0.5s ease'
                            }}
                            src={embedUrl}
                            allowFullScreen
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            title={shape.title || "Embedded Video"}
                        />
                    )}
                </div>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
}