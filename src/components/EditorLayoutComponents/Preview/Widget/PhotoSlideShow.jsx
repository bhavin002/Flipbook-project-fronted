import React, { useState, useEffect, useRef } from 'react';

const PhotoSlideShow = ({ isOpen, onClose, htmlData }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    const images = htmlData?.images || [];
    const hideControls = htmlData?.hideControls ?? false;
    const autoplaySlideshow = htmlData?.autoplaySlideshow ?? false;
    const imageProperties = htmlData?.imagePropeties || "fit-to-frame";
    const imageSize = htmlData?.imageSize || "medium";
    const slideDuration = 6;

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!autoplaySlideshow || isPaused || images.length <= 1 || !isOpen) {
            clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, slideDuration * 1000);

        return () => clearInterval(intervalRef.current);
    }, [autoplaySlideshow, isPaused, images.length, isOpen]);

    const goToNextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const goToPrevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    const togglePause = () => setIsPaused((prev) => !prev);

    const getImageFitClass = () => {
        return {
            "fit-to-frame": "object-contain",
            "scale-to-fill": "object-cover"
        }[imageProperties] || "object-contain";
    };

    const getSizeClass = () => {
        return {
            small: "w-[400px] h-[300px]",
            medium: "w-[600px] h-[400px]",
            large: "w-[800px] h-[600px]"
        }[imageSize] || "w-[600px] h-[400px]";
    };

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 flex justify-center backdrop-blur-sm items-center transition-opacity duration-300 ease-in-out`}
            style={{ opacity: isVisible ? 1 : 0 }}
            onClick={onClose}
        >
            <div
                className={`bg-white rounded-lg shadow-lg flex flex-col transform transition-all duration-300 ease-in-out overflow-hidden ${getSizeClass()}`}
                style={{
                    transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(-16px)'
                }}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <span className="text-base text-gray-800">
                    </span>
                    <button
                        className="text-2xl cursor-pointer p-0 w-6 h-6 leading-6 hover:text-gray-500 transition-colors duration-200"
                        onClick={onClose}
                        aria-label="Close slideshow"
                    >
                        ×
                    </button>
                </div>

                {images.length > 0 && (
                    <div className="relative w-full h-full">
                        <img
                            src={images[currentIndex]?.url}
                            alt={images[currentIndex]?.fileName || "Slideshow image"}
                            className={`w-full h-full ${getImageFitClass()}`}
                            onError={(e) => { e.target.src = "/fallback-image.png"; }}
                        />

                        {!hideControls && images.length > 1 && (
                            <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
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
                                className="absolute bottom-4 right-4 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60 focus:outline-none"
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
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
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
        </div>
    );
};

export default PhotoSlideShow;