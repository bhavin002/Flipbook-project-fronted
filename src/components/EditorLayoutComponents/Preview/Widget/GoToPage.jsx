import React, { useState, useEffect } from 'react';
import { PageNavigationActions } from '../Helper/PageNavigationActions';

export default function GoToPage({ shape, visibilitySettings, flipbookRef, currentPages }) {
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        if (visibilitySettings.showAnimateInteraction) {
            setAnimationClass('ping-initial');
            const timer = setTimeout(() => {
                setAnimationClass('ping-hover');
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [visibilitySettings.showAnimateInteraction, currentPages]);

    const handleClick = () => {
        if (shape.htmlData?.pageNumber) {
            PageNavigationActions.goToPage(flipbookRef, shape.htmlData.pageNumber);
        }
    };

    return (
        <>
            <div
                onClick={handleClick}
                className={visibilitySettings.showAnimateInteraction ? animationClass : ""}
                style={{
                    width: `${shape.width}px`,
                    height: `${shape.height}px`,
                    backgroundColor: shape.fill,
                    opacity: shape.opacity,
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
                    borderRadius: shape.effect?.individualCorners ? `${shape.effect?.topLeftRadius / 1.5 || 0}px ${shape.effect?.topRightRadius / 1.5 || 0}px ${shape.effect?.bottomRightRadius / 1.5 || 0}px ${shape.effect?.bottomLeftRadius / 1.5 || 0}px` : `${shape.effect?.cornerRadius / 1.5 || 0}px`,
                    '--ping-color': shape.fill || '#ff0000',
                    '--ping-radius': shape.effect?.individualCorners ? `${shape.effect?.topLeftRadius / 1.5 || 0}px ${shape.effect?.topRightRadius / 1.5 || 0}px ${shape.effect?.bottomRightRadius / 1.5 || 0}px ${shape.effect?.bottomLeftRadius / 1.5 || 0}px` : `${shape.effect?.cornerRadius / 1.5 || 0}px`,
                }}
            />
            <img    
                title={shape.htmlData?.tooltip || "Go to page"}
                src={shape.src}
                alt={shape.title}
                style={{
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
                    display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                    cursor: "pointer",
                }}
            />
        </>
    );
} 