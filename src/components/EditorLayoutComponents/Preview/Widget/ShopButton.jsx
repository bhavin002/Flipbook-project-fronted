import React, { useState, useEffect } from 'react';
import { showModal } from '@/utils/ShowModal';
import ShopAreaModal from './ShopAreaModal';

export default function ShopButton({ shape, visibilitySettings, flipbookId, currentPages }) {
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
        if (shape.htmlType === 'shop-button' && shape.htmlData?.variantId) {
            showModal(ShopAreaModal, shape.htmlData, flipbookId);
        }   
    };  
    return (
        <div onClick={handleClick} className={visibilitySettings.showAnimateInteraction ? animationClass : ""} style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
            cursor: "pointer",
            '--ping-color': shape.fill || '#ff0000',
            '--ping-radius': shape.effect?.individualCorners ? `${shape.effect?.topLeftRadius / 1.5 || 0}px ${shape.effect?.topRightRadius / 1.5 || 0}px ${shape.effect?.bottomRightRadius / 1.5 || 0}px ${shape.effect?.bottomLeftRadius / 1.5 || 0}px` : `${shape.effect?.cornerRadius / 1.5 || 0}px`,
            }}>
            <div
                style={{
                    width: `100%`,
                    height: `100%`,
                    backgroundColor: shape.fill,
                    opacity: shape.opacity,
                    display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                }}
            />
            <img
                src={shape.src}
                alt={shape.title}
                style={{
                    width: `30px`,
                    height: `30px`,
                    position: "absolute",
                    display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                }}
            />
        </div>
    );
} 