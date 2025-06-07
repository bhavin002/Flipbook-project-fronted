import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

const getImageSizeClass = (size) => {
  switch (size) {
    case 'small':
      return 'max-w-[200px] max-h-[200px]';
    case 'medium':
      return 'max-w-[300px] max-h-[300px]';
    case 'large':
      return 'max-w-[500px] max-h-[500px]';
    default:
      return 'max-w-[500px] max-h-[500px]';
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

const PhotoSlideShow = ({ open, onOpenChange, htmlData }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = htmlData?.images || [];
    const hideControls = htmlData?.hideControls ?? false;
    const autoplaySlideshow = htmlData?.autoplaySlideshow ?? false;
    const imageProperties = htmlData?.imageProperties || "fit-to-frame";
    const imageSize = htmlData?.imageSize || "medium";
    const slideDuration = htmlData?.slideDuration?.[0] || 6;
    const showBackground = htmlData?.showBackground ?? true;

    const imageSizeClass = getImageSizeClass(imageSize);
    const imageFitClass = getImageFitClass(imageProperties);
    const backgroundClass = showBackground 
        ? 'bg-white border border-gray-200 shadow-lg' 
        : 'bg-transparent shadow-none border-0 text-white';
    const iconColor = showBackground ? 'text-gray-800' : 'text-white';

    useEffect(() => {
        if (!autoplaySlideshow || images.length <= 1 || !open) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, slideDuration * 1000);

        return () => clearInterval(interval);
    }, [autoplaySlideshow, images.length, open, slideDuration, currentIndex]);

    const goToNextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const goToPrevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={`max-h-[80vh] max-w-[80vw] z-[100] overflow-hidden rounded-lg ${backgroundClass}`}>
                {images.length > 0 && (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img
                            src={images[currentIndex]?.url}
                            alt={images[currentIndex]?.fileName || "Slideshow image"}
                            className={`${imageSizeClass} ${imageFitClass} w-full h-full rounded-md`}
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
            </DialogContent>
        </Dialog>
    );
};

export default PhotoSlideShow;