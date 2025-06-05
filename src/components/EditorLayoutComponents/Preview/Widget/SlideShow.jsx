import React, { useState, useEffect, useRef } from 'react';

export default function SlideShow({ shape }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);
    const { htmlData } = shape || {};
    
    const images = htmlData?.images || [];
    const hideControls = htmlData?.hideControls ?? false;
    const autoplaySlideshow = htmlData?.autoplaySlideshow ?? false;
    const slideDuration = htmlData?.slideDuration || 6;
    const imageProperties = htmlData?.imagePropeties || "fit-to-frame";

    useEffect(() => {
        if (!autoplaySlideshow || isPaused || images.length <= 1) {
            clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, slideDuration * 1000);

        return () => clearInterval(intervalRef.current);
    }, [autoplaySlideshow, isPaused, slideDuration, images.length]);

    const goToNextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const goToPrevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    const togglePause = () => setIsPaused((prev) => !prev);

    const getImageFitClass = () => {
        return {
            "fit-to-frame": "object-contain",
            "scale-to-fill": "object-cover"
        }[imageProperties] || "object-contain";
    };

    const shapeStyles = {
        width: `${shape?.width || 0}px`,
        height: `${shape?.height || 0}px`,
        position: "absolute",
        left: `${shape?.x || 0}px`,
        top: `${shape?.y || 0}px`,
        transformOrigin: "0 0",
        transform: `rotate(${shape?.rotation || 0}deg)
            scaleX(${shape?.scaleX || 1})
            scaleY(${shape?.scaleY || 1})
            skewX(${shape?.skewX || 0}deg)
            skewY(${shape?.skewY || 0}deg)
            translate(${shape?.offsetX || 0}px, ${shape?.offsetY || 0}px)`,
        backgroundColor: shape?.fill || "transparent",
        opacity: shape?.opacity ?? 1,
        display: shape?.visible === false ? "none" : "flex",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center"
    };

    return (
        <div style={shapeStyles} className="slideshow-container">
            {images.length > 0 && (
                <div className="relative w-full h-full">
                    <img
                        src={images[currentIndex]?.url}
                        alt={images[currentIndex]?.fileName || "Slideshow image"}
                        className={`w-full h-full ${getImageFitClass()}`}
                        onError={(e) => { e.target.src = "/fallback-image.png"; }}
                    />
                    
                    {!hideControls && images.length > 1 && (
                        <div className="absolute inset-0 flex items-center justify-between p-2 pointer-events-none">
                            <button 
                                onClick={goToPrevSlide}
                                className="pointer-events-auto bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60 focus:outline-none"
                                aria-label="Previous slide"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button 
                                onClick={goToNextSlide}
                                className="pointer-events-auto bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60 focus:outline-none"
                                aria-label="Next slide"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {autoplaySlideshow && images.length > 1 && (
                        <button 
                            onClick={togglePause}
                            className="absolute bottom-2 right-2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60 focus:outline-none"
                            aria-label={isPaused ? "Play" : "Pause"}
                        >
                            {isPaused ? (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                </svg>
                            )}
                        </button>
                    )}

                    {images.length > 1 && (
                        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 p-2">
                            {images.map((_, index) => (
                                <button
                                    key={images[index]?.fileId || index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                        currentIndex === index 
                                            ? "bg-white scale-125" 
                                            : "bg-white bg-opacity-50 hover:bg-opacity-75"
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}