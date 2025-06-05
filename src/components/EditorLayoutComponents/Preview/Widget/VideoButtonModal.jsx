import React, { useEffect, useState } from 'react';

const VideoButtonModal = ({ isOpen, onClose, htmlData }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    const getDimensions = () => {
        const size = htmlData?.size || "853x480";
        const [width, height] = size.split('x').map(Number);
        return { width: width || 853, height: height || 480 };
    };

    const { width, height } = getDimensions();

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 backdrop-blur-sm flex justify-center items-center transition-opacity duration-300 ease-in-out"
            style={{ opacity: isVisible ? 1 : 0 }}
            onClick={onClose}
        >
            <div
                className="bg-white p-5 rounded-lg shadow-lg flex flex-col gap-5 transform transition-all duration-300 ease-in-out"
                style={{
                    transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(-16px)',
                    width: `${width + 40}px`,
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                }}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center">
                    <span className="text-base text-gray-800">
                        {htmlData?.videoButtonTooltip || "YouTube Video"}
                    </span>
                    <button
                        className="text-2xl cursor-pointer p-0 w-6 h-6 leading-6 hover:text-gray-500 transition-colors duration-200"
                        onClick={onClose}
                        aria-label="Close video modal"
                    >
                        ×
                    </button>
                </div>
                <div className="flex justify-center w-full overflow-hidden">
                    <iframe
                        src={htmlData?.url}
                        allowFullScreen
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        title={htmlData?.videoButtonTooltip || "Video"}
                        width={width}
                        height={height}
                        className="rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default VideoButtonModal;