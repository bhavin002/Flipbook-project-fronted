import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SlideShow({ shape }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);
    const { htmlData } = shape || {};
    
    const images = htmlData?.images || [];
    const hideControls = htmlData?.hideControls ?? false;
    const autoplaySlideshow = htmlData?.autoplaySlideshow ?? false;
    const slideDuration = htmlData?.slideDuration?.[0] || 6;
    const imageProperties = htmlData?.imageProperties || "fit-to-frame";

    useEffect(() => {
        if (!autoplaySlideshow || images.length <= 1) {
            clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, slideDuration * 1000);

        return () => clearInterval(intervalRef.current);
    }, [autoplaySlideshow, slideDuration, images.length]);

    const goToNextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const goToPrevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

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
    const iconColor = imageProperties === 'scale-to-fill' ? 'text-white' : 'text-gray-800';

    return (
        <div style={shapeStyles} className={`slideshow-container`}>
            {images.length > 0 && (
                <div className="relative w-full h-full flex items-center justify-center">
                    <img
                        src={images[currentIndex]?.url}
                        alt={images[currentIndex]?.fileName || "Slideshow image"}
                        className={`w-full h-full ${getImageFitClass()} rounded-md`}
                        onError={(e) => { e.target.src = "/fallback-image.png"; }}
                    />
                    
                    {!hideControls && images.length > 1 && (
                        <div className="absolute inset-0 flex items-center justify-between px-4">
                            <button 
                                onClick={goToPrevSlide}
                                className=""
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className={`w-6 h-6 ${iconColor}`} />
                            </button>
                            <button 
                                onClick={goToNextSlide}
                                className=""
                                aria-label="Next slide"
                            >
                                <ChevronRight className={`w-6 h-6 ${iconColor}`} />
                            </button>
                        </div>
                    )}

                    {images.length > 1 && (
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                            {images.map((_, index) => (
                                <button
                                    key={images[index]?.fileId || index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        currentIndex === index 
                                            ? "bg-primary scale-125" 
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