import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PageNavigationActions } from '../Helper/PageNavigationActions';

export default function GoToPreviousPage({ shape, visibilitySettings, flipbookRef, currentPages }) {
    const [animationClass, setAnimationClass] = useState('');
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false });

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
        setTooltipPos(prev => ({ ...prev, visible: false }));
        PageNavigationActions.goToPreviousPage(flipbookRef);
    };

    const handleMouseMove = (e) => {
        if (e.pointerType === 'mouse') {
            setTooltipPos({
                x: e.clientX + 15,
                y: e.clientY + 5,
                visible: true
            });
        }
    };

    const handleMouseLeave = () => {
        setTooltipPos(prev => ({ ...prev, visible: false }));
    };

    const tooltipText = shape.htmlData?.tooltip || "Go to previous page";

    return (
        <>
            <div
                onClick={handleClick}
                onPointerMove={handleMouseMove}
                onPointerLeave={handleMouseLeave}
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
                onClick={handleClick}
                onPointerMove={handleMouseMove}
                onPointerLeave={handleMouseLeave}
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
            {tooltipPos.visible && createPortal(
                <div
                    className="bg-white text-black text-sm px-2 py-1 rounded-lg shadow-md border-none font-medium z-[9999]"
                    style={{
                        position: 'fixed',
                        left: tooltipPos.x,
                        top: tooltipPos.y,
                        pointerEvents: 'none',
                    }}
                >
                    <p>{tooltipText}</p>
                </div>,
                document.body
            )}
        </>
    );
} 