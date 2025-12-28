import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

const getImageSizeInPx = (size) => {
    switch (size) {
        case 'small':
            return 200;
        case 'medium':
            return 300;
        case 'large':
            return 500;
        default:
            return 300;
    }
};

const getImageFitClass = (properties) => {
    switch (properties) {
        case 'fit-to-frame':
            return 'object-contain';
        case 'scale-to-fill':
            return 'object-cover';
        default:
            return 'object-contain';
    }
};

const PhotoSlideShow = ({ open, onOpenChange, htmlData, container }) => {
    const images = htmlData?.images || [];
    const [currentIndex, setCurrentIndex] = useState(images.length > 1 ? 1 : 0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const intervalRef = useRef(null);

    const hideControls = htmlData?.hideControls ?? false;
    const autoplaySlideshow = htmlData?.autoplaySlideshow ?? false;
    const imageProperties = htmlData?.imageProperties || "fit-to-frame";
    const imageSize = htmlData?.imageSize || "medium";
    const slideDuration = htmlData?.slideDuration?.[0] || 6;
    const showBackground = htmlData?.showBackground ?? true;

    const imageFitClass = getImageFitClass(imageProperties);
    const imageSizeInPx = getImageSizeInPx(imageSize);
    const backgroundClass = showBackground
        ? 'bg-white border border-gray-200 shadow-lg'
        : 'bg-transparent shadow-none border-0 text-white';

    // Create slides with clones for infinite loop
    const slidesWithClones = images.length > 1
        ? [images[images.length - 1], ...images, images[0]]
        : images;

    // Reset index when images change or dialog opens
    useEffect(() => {
        if (open) {
            setCurrentIndex(images.length > 1 ? 1 : 0);
            setIsTransitioning(false);
        }
    }, [open, images.length]);


    useEffect(() => {
        if (!autoplaySlideshow || images.length <= 1 || !open) {
            clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = setInterval(() => {
            goToNextSlide();
        }, slideDuration * 1000);

        return () => clearInterval(intervalRef.current);
    }, [autoplaySlideshow, images.length, open, slideDuration]);

    const goToNextSlide = () => {
        if (isTransitioning || images.length <= 1) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
    };

    const goToPrevSlide = () => {
        if (isTransitioning || images.length <= 1) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev - 1);
    };

    const goToSlide = (index) => {
        if (isTransitioning || images.length <= 1) return;
        setIsTransitioning(true);
        setCurrentIndex(index + 1);
    };

    // Handle transition end and reset to actual slide
    useEffect(() => {
        if (!isTransitioning || images.length <= 1) return;

        const transitionEndTimeout = setTimeout(() => {
            // If we're at the cloned last slide, jump to the real first slide
            if (currentIndex === slidesWithClones.length - 1) {
                setIsTransitioning(false);
                // Use setTimeout to ensure browser repaints before next transition
                setTimeout(() => setCurrentIndex(1), 50);
            }
            // If we're at the cloned first slide, jump to the real last slide
            else if (currentIndex === 0) {
                setIsTransitioning(false);
                // Use setTimeout to ensure browser repaints before next transition
                setTimeout(() => setCurrentIndex(images.length), 50);
            } else {
                setIsTransitioning(false);
            }
        }, 300); // Match the CSS transition duration

        return () => clearTimeout(transitionEndTimeout);
    }, [currentIndex, isTransitioning, images.length, slidesWithClones.length]);

    // Get the actual index for indicator
    const getActualIndex = () => {
        if (currentIndex === 0) return images.length - 1;
        if (currentIndex === slidesWithClones.length - 1) return 0;
        return currentIndex - 1;
    };

    // Calculate container dimensions based on image size
    const containerDimensions = {
        height: imageProperties === 'scale-to-fill' ? imageSizeInPx : 'auto',
        maxHeight: imageSizeInPx,
        width: '100%',
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={`max-h-[80vh] max-w-[80vw] z-[10000] overflow-hidden rounded-lg ${backgroundClass}`} container={container}>
                {images.length > 0 && (
                    <div className="relative w-full h-full flex items-center justify-center p-2">
                        <div
                            className="relative overflow-hidden"
                            style={containerDimensions}
                        >
                            <div
                                className="flex"
                                style={{
                                    transform: `translateX(-${currentIndex * 100}%)`,
                                    transition: isTransitioning ? 'transform 300ms ease-in-out' : 'none'
                                }}
                            >
                                {slidesWithClones.map((img, idx) => (
                                    <div
                                        key={`${img?.fileId || 'img'}-${idx}`}
                                        className="flex-shrink-0"
                                        style={{
                                            width: '100%',
                                            height: imageProperties === 'scale-to-fill' ? imageSizeInPx : 'auto',
                                        }}
                                    >
                                        <img
                                            src={img?.url}
                                            alt={img?.fileName || `Slide ${idx}`}
                                            className={`${imageFitClass} w-full h-full rounded-md`}
                                            style={{
                                                maxHeight: imageSizeInPx,
                                            }}
                                            onError={(e) => { e.target.src = "/fallback-image.png"; }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {!hideControls && images.length > 1 && (
                            <div className="absolute inset-0 flex items-center justify-between px-4">
                                <button
                                    onClick={goToPrevSlide}
                                    disabled={isTransitioning}
                                    className="bg-[#ffffff40] rounded-full p-1"
                                    aria-label="Previous slide"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <ChevronLeft className="w-6 h-6 text-black" />
                                </button>
                                <button
                                    onClick={goToNextSlide}
                                    disabled={isTransitioning}
                                    className="bg-[#ffffff40] rounded-full p-1"
                                    aria-label="Next slide"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <ChevronRight className="w-6 h-6 text-black" />
                                </button>
                            </div>
                        )}

                        {images.length > 1 && !hideControls && (
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                {images.map((_, index) => (
                                    <button
                                        key={images[index]?.fileId || index}
                                        onClick={() => goToSlide(index)}
                                        disabled={isTransitioning}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${getActualIndex() === index
                                            ? "bg-primary scale-125"
                                            : "bg-white bg-opacity-50 hover:bg-opacity-75"
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                        style={{ cursor: 'pointer' }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default PhotoSlideShow;