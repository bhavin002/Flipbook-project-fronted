import React, { useState, useEffect } from 'react';
import { showModal } from '@/utils/ShowModal';
import ShopAreaModal from './ShopAreaModal';
import { useShopSettings } from '@/context/ShopSettingsContext';

export default function ShopButton({ shape, visibilitySettings, flipbookId, isVisible, isPublicView }) {
    const [animationClass, setAnimationClass] = useState('');
    const { getCurrentCurrency } = useShopSettings();
    const [svgUrl, setSvgUrl] = useState(null);

    const labelColor = shape.data?.labelColor || '#ffffff';
    const buttonColor = shape.data?.buttonColor || '#000000';
    const labelText = shape.data?.label || "Shop this item";

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

    useEffect(() => {
        const updateSvgImage = () => {
            if (shape.src && shape.src.startsWith('<svg')) {
                const randomizeColors = (svgString) => {
                    return svgString.replace(/fill="(.*?)"|stroke="(.*?)"/g, (match, fill, stroke) => {
                        if (fill) return `fill="${labelColor}"`;
                        if (stroke) return `stroke="${labelColor}"`;
                        return match;
                    });
                };
                const modifiedSvg = randomizeColors(shape.src);
                const blob = new Blob([modifiedSvg], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(blob);
                setSvgUrl(url);
                return () => URL.revokeObjectURL(url);
            } else {
                setSvgUrl(shape.src);
            }
        };
        updateSvgImage();
    }, [shape.src, labelColor]);

    const handleClick = () => {
        if (shape.htmlType === 'shop-button' && shape.htmlData?.variantId) {
            showModal(ShopAreaModal, shape.htmlData, flipbookId, getCurrentCurrency(), isPublicView);
        }
    };

    const baseHeight = shape.height;
    const iconSize = baseHeight * 0.45;
    const fontSize = baseHeight * 0.32;
    const gap = baseHeight * 0.08;
    const cornerRadius = 10;

    return (
        <div
            onClick={handleClick}
            className={visibilitySettings.showAnimateInteraction ? animationClass : ""}
            style={{
                '--sx': shape.scaleX || 1,
                '--sy': shape.scaleY || 1,
                '--ping-color': buttonColor,
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
                display: ('visible' in shape)
                    ? (shape.visible ? "block" : "none")
                    : "block",
            }}
        >
            {/* Button Background - Matching Editor Rect */}
            <div
                style={{
                    position: 'absolute',
                    top: '10px',
                    left: 0,
                    width: '100%',
                    height: `${baseHeight - 18}px`,
                    backgroundColor: buttonColor,
                    borderRadius: `${cornerRadius}px`,
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    opacity: shape.opacity,
                }}
            />

            {/* Content Row - Centered Icon + Text */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: `${gap}px`,
                    pointerEvents: 'none',
                }}
            >
                {svgUrl && (
                    <img
                        src={svgUrl}
                        alt=""
                        style={{
                            width: `${iconSize}px`,
                            height: `${iconSize}px`,
                            objectFit: 'contain',
                        }}
                    />
                )}
                <span
                    style={{
                        color: labelColor,
                        fontSize: `${fontSize}px`,
                        // fontWeight: 'bold',
                        // fontFamily: 'Inter, Roboto, sans-serif',
                        whiteSpace: 'nowrap',
                        // transform: 'translateY(1px)', // Align with Editor's +8/2 offset
                    }}
                >
                    {labelText}
                </span>
            </div>
        </div>
    );
}
