import React, { useState, useEffect, useRef } from "react";

export default function SlideShow({ shape }) {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const intervalRef = useRef(null);
    const { htmlData } = shape || {};

    const images = htmlData?.images || [];
    const hideControls = htmlData?.hideControls ?? false;
    const autoplaySlideshow = htmlData?.autoplaySlideshow ?? false;
    const slideDuration = htmlData?.slideDuration?.[0] || 6;
    const imageProperties = htmlData?.imageProperties || "fit-to-frame";

    const slidesWithClones = images.length > 1 
        ? [images[images.length - 1], ...images, images[0]]
        : images;

    useEffect(() => {
        if (!autoplaySlideshow || images.length <= 1) {
            clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = setInterval(() => {
            goToNextSlide();
        }, slideDuration * 1000);

        return () => clearInterval(intervalRef.current);
    }, [autoplaySlideshow, slideDuration, images.length]);

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

    
    useEffect(() => {
        if (!isTransitioning || images.length <= 1) return;

        const transitionEndTimeout = setTimeout(() => {
            
            if (currentIndex === slidesWithClones.length - 1) {
                setIsTransitioning(false);
                setCurrentIndex(1);
            }
            
            else if (currentIndex === 0) {
                setIsTransitioning(false);
                setCurrentIndex(images.length);
            } else {
                setIsTransitioning(false);
            }
        }, 300); 

        return () => clearTimeout(transitionEndTimeout);
    }, [currentIndex, isTransitioning, images.length, slidesWithClones.length]);

    const getImageFitClass = () =>
        ({
            "fit-to-frame": "object-contain",
            "scale-to-fill": "object-cover",
        }[imageProperties] || "object-contain");

    
    const getActualIndex = () => {
        if (currentIndex === 0) return images.length - 1;
        if (currentIndex === slidesWithClones.length - 1) return 0;
        return currentIndex - 1;
    };

    
    const shapeStyles = {
        position: "absolute",
        left: `${shape?.x || 0}px`,
        top: `${shape?.y || 0}px`,
        transformOrigin: "0 0",
        transform: `rotate(${shape?.rotation || 0}deg)
            skewX(${shape?.skewX || 0}deg)
            skewY(${shape?.skewY || 0}deg)
            translate(${shape?.offsetX || 0}px, ${shape?.offsetY || 0}px)`,
        backgroundColor: shape?.fill || "transparent",
        opacity: shape?.opacity ?? 1,
        display: shape?.visible === false ? "none" : "flex",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    };

    return (
        <div style={shapeStyles} className="relative slideshow-container">

            <div
                className="relative w-full h-full overflow-hidden"
                style={{
                    height: shape?.height * shape?.scaleY || 400,
                    width: shape?.width * shape?.scaleX || 600,
                }}
            >
                {!hideControls && images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-4 z-50">
                        <button
                            onClick={goToPrevSlide}
                            disabled={isTransitioning}
                            aria-label="Previous slide"
                            style={{ cursor: 'pointer' }}
                        >
                            <svg aria-hidden="true" width="88" height="88" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill="#FFFFFF"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M31.3138 39.4453C30.5737 40.1853 29.374 40.1852 28.634 39.4452L12.7973 23.6076C11.9093 22.7196 11.9094 21.2799 12.7973 20.3919L28.634 4.55524C29.374 3.81524 30.5738 3.81524 31.3138 4.55524C32.0538 5.29524 32.0538 6.49502 31.3138 7.23501L16.549 21.9998L31.3138 36.7655C32.0538 37.5055 32.0538 38.7053 31.3138 39.4453Z"
                                />
                                <path
                                    fill="#000000"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M32.7279 40.8595C31.2068 42.3805 28.7407 42.3805 27.2197 40.8594L11.383 25.0218C9.71408 23.3527 9.71412 20.6467 11.3831 18.9777L27.2198 3.14103C28.7409 1.61998 31.207 1.61998 32.728 3.14103L31.3138 4.55524C30.5738 3.81524 29.374 3.81524 28.634 4.55524L12.7973 20.3919C11.9094 21.2799 11.9093 22.7196 12.7973 23.6076L28.634 39.4452C29.374 40.1852 30.5737 40.1853 31.3138 39.4453C32.0538 38.7053 32.0538 37.5055 31.3138 36.7655L16.549 21.9998L31.3138 7.23501C32.0538 6.49502 32.0538 5.29524 31.3138 4.55524L32.728 3.14103C34.2491 4.66208 34.2491 7.12818 32.728 8.64923L19.3774 21.9999L32.7281 35.3513C34.2491 36.8724 34.249 39.3385 32.7279 40.8595Z"
                                    fillOpacity="0.2"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={goToNextSlide}
                            disabled={isTransitioning}
                            aria-label="Next slide"
                            style={{ cursor: 'pointer' }}
                        >
                            <svg aria-hidden="true" width="88" height="88" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill="#FFFFFF"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12.6864 4.5552C13.4264 3.81523 14.6262 3.81526 15.3662 4.55528L31.2028 20.3929C32.0908 21.2809 32.0908 22.7206 31.2028 23.6086L15.3661 39.4452C14.6261 40.1852 13.4263 40.1852 12.6863 39.4452C11.9463 38.7052 11.9463 37.5055 12.6863 36.7655L27.4512 22.0007L12.6863 7.23497C11.9463 6.49495 11.9464 5.29518 12.6864 4.5552Z"
                                />
                                <path
                                    fill="#000000"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M11.2721 40.8595C9.75109 39.3384 9.75108 36.8723 11.2721 35.3513L24.6228 22.0006L11.2721 8.64915C9.75105 7.12806 9.75112 4.66195 11.2722 3.14095C12.7933 1.61995 15.2594 1.62002 16.7804 3.14111L32.6171 18.9787C34.2861 20.6478 34.286 23.3538 32.617 25.0228L16.7803 40.8595C15.2593 42.3805 12.7932 42.3805 11.2721 40.8595ZM12.6863 36.7655C11.9463 37.5055 11.9463 38.7052 12.6863 39.4452C13.4263 40.1852 14.6261 40.1852 15.3661 39.4452L31.2028 23.6086C32.0908 22.7206 32.0908 21.2809 31.2028 20.3929L15.3662 4.55528C14.6262 3.81526 13.4264 3.81523 12.6864 4.5552C11.9464 5.29518 11.9463 6.49495 12.6863 7.23497L27.4512 22.0007L12.6863 36.7655Z"
                                    fillOpacity="0.2"
                                />
                            </svg>
                        </button>
                    </div>
                )}

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
                                width: shape?.width * shape?.scaleX || 600,
                                height: shape?.height * shape?.scaleY || 400,
                            }}
                        >
                            <img
                                src={img?.url || `https://picsum.photos/600/400?random=${idx}`}
                                alt={img?.fileName || `Slide ${idx}`}
                                className={`${getImageFitClass()} w-full h-full`}
                                onError={(e) =>
                                    (e.target.src = "https://via.placeholder.com/600x400?text=Image+Not+Found")
                                }
                            />
                        </div>
                    ))}
                </div>

                {!hideControls && images.length > 1 && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-50">
                        {images.map((_, index) => (
                            <button
                                key={images[index]?.fileId || index}
                                onClick={() => goToSlide(index)}
                                disabled={isTransitioning}
                                className={`w-5 h-5 rounded-full transition-all duration-300 ${
                                    getActualIndex() === index
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

        </div>
    );
}