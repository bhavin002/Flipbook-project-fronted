import React, { useEffect, useRef, useState } from 'react';

const PageWrapper = ({ children, onPageLoad, pageNumber, isVisible }) => {
    const ref = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!ref.current) return;

        const images = ref.current.querySelectorAll('img');
        const totalImages = images.length;

        if (totalImages === 0) {
            setIsLoaded(true);
            onPageLoad(pageNumber);
            return;
        }

        let loadedCount = 0;
        const handleImageLoad = () => {
            loadedCount++;
            if (loadedCount === totalImages) {
                setIsLoaded(true);
                onPageLoad(pageNumber);
            }
        };

        images.forEach((img) => {
            if (img.complete) {
                handleImageLoad();
            } else {
                img.addEventListener('load', handleImageLoad);
                img.addEventListener('error', handleImageLoad); // Count errors as loaded to avoid hanging
            }
        });

        return () => {
            images.forEach((img) => {
                img.removeEventListener('load', handleImageLoad);
                img.removeEventListener('error', handleImageLoad);
            });
        };
    }, []); // Run once on mount

    return (
        <div ref={ref} style={{ width: '100%', height: '100%' }}>
            {children}
        </div>
    );
};

export default PageWrapper;
