import React, { useRef, useEffect } from 'react';

export default function StockVideo({ shape, isVisible }) {

    console.log("shape StockVideo ??? ", shape)

    const videoRef = useRef(null);

    const {
        showControls = false,
        autoPlay = false,
        mute = false,
        loop = false
    } = shape.htmlData || {};

    useEffect(() => {
        if (isVisible && autoPlay) {
            videoRef.current?.play().catch(() => { });
        } else if (!isVisible) {
            videoRef.current?.pause();
        }
    }, [isVisible, autoPlay]);

    const handleVideoClick = () => {
        if (!showControls && videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    };

    return (
        <video
            ref={videoRef}
            src={shape.src}
            alt={shape.title}
            controls={showControls}
            autoPlay={autoPlay}
            muted={mute}
            loop={loop}
            playsInline={true}
            volume={mute ? 0 : 1}
            onClick={handleVideoClick}
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
        />
    );
}