import React from 'react';

export default function VideoEmbed({ shape, isVisible }) {
    let embedUrl = null;

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
            }}>
            {
                embedUrl ?
                    (isVisible ? <iframe
                        src={embedUrl}
                        allowFullScreen
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        title={shape.title || "Embedded Video"}
                        width="100%"
                        height="100%"
                    /> : <div style={{ width: '100%', height: '100%', background: 'black' }} />) :
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
            }
        </div>
    );
}