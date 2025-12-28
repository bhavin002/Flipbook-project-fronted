import React, { useState, useEffect } from 'react';
import { showModal } from '@/utils/ShowModal';
import ShopAreaModal from './ShopAreaModal';

export default function ShopButton({ shape, visibilitySettings, flipbookId, isVisible }) {
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        if (visibilitySettings.showAnimateInteraction && isVisible) {
            setAnimationClass('ping-initial');
            const timer = setTimeout(() => {
                setAnimationClass('ping-hover');
            }, 1500);
            return () => clearTimeout(timer);
        } else {
            setAnimationClass('');
        }
    }, [visibilitySettings.showAnimateInteraction, isVisible]);

    const handleClick = () => {
        if (shape.htmlType === 'shop-button' && shape.htmlData?.variantId) {
            showModal(ShopAreaModal, shape.htmlData, flipbookId);
        }
    };
    return (
        <div
            onClick={handleClick}
            className={visibilitySettings.showAnimateInteraction ? animationClass : ""}
            style={{
                '--sx': shape.scaleX || 1,
                '--sy': shape.scaleY || 1,
                '--ping-color': shape.fill || '#ff0000',
                '--ping-radius': shape.effect?.individualCorners ? `${shape.effect?.topLeftRadius / 1.5 || 0}px ${shape.effect?.topRightRadius / 1.5 || 0}px ${shape.effect?.bottomRightRadius / 1.5 || 0}px ${shape.effect?.bottomLeftRadius / 1.5 || 0}px` : `${shape.effect?.cornerRadius / 1.5 || 0}px`,
                position: "absolute",
                left: `${shape.x}px`,
                top: `${shape.y}px`,
                width: `${shape.width}px`,
                height: `${shape.height}px`,
                cursor: "pointer",
                transformOrigin: "0 0",
                transform: `
                    rotate(${shape.rotation || 0}deg)
                    scaleX(var(--sx))
                    scaleY(var(--sy))
                    skewX(${shape.skewX || 0}deg)
                    skewY(${shape.skewY || 0}deg)
                    translate(${shape.offsetX || 0}px, ${shape.offsetY || 0}px)
                    `,
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: shape.fill,
                    opacity: shape.opacity,
                    overflow: "hidden",
                    display: ('visible' in shape)
                        ? shape.visible ? "flex" : "none"
                        : "flex",
                }}
            >
                <img
                    src={shape.src}
                    alt={shape.title || ""}
                    style={{
                        maxWidth: "300px",
                        maxHeight: "50px",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                        display: "block",
                        transformOrigin: "center",
                        transform: `scaleX(calc(1 / var(--sx))) scaleY(calc(1 / var(--sy)))`,
                        filter: (!shape.fill || ['#ffffff', 'white', '#fff', 'rgb(255, 255, 255)', 'rgba(255, 255, 255, 1)'].includes(shape.fill?.toLowerCase())) ? 'invert(1)' : 'none'

                    }}
                />
            </div>
        </div>

    );
} 