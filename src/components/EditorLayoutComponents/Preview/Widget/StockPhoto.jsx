import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import PopupFrameModal from "./PopupFrameModal";
import SpotlightModal from "./SpotlightModal";
import OverlayModal from "./OverlayModal";
import { PageNavigationActions } from '../Helper/PageNavigationActions';
import { showModal } from "@/utils/ShowModal";

// Helper function to parse hex color to RGB
function parseHexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}

// Action handlers for different action types
const actionHandlers = {
    "open-link": (htmlData) => {
        const { url } = htmlData || {};
        if (url) {
            window.open(url, "_blank");
        }
    },

    "go-to-page": (htmlData, flipbookRef) => {
        if (htmlData?.pageNumber) {
            PageNavigationActions.goToPage(flipbookRef, htmlData.pageNumber);
        }
    },

    "open-overlay": (htmlData) => {
        return true; // Indicates modal should be shown
    },

    "spotlight": (htmlData) => {
        return true; // Indicates modal should be shown
    },

    "popup-frame": (htmlData) => {
        return true; // Indicates modal should be shown
    },
};

// Modal handlers for different action types
const modalHandlers = {
    'open-overlay': (htmlData) => {
        showModal(OverlayModal, htmlData);
    },
    'spotlight': (htmlData) => {
        showModal(SpotlightModal, htmlData);
    },
    'popup-frame': (htmlData) => {
        showModal(PopupFrameModal, htmlData);
    },
};

export default function StockPhoto({ shape, flipbookRef }) {

    const [isHovered, setIsHovered] = useState(false);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false });

    // Handle click actions
    const handleClick = () => {
        if (shape.htmlData?.action) {
            const action = shape.htmlData.action;


            if (actionHandlers[action]) {
                const shouldShowModal = actionHandlers[action](shape.htmlData, flipbookRef);


                // If action handler returns true, show modal
                if (shouldShowModal && modalHandlers[action]) {
                    modalHandlers[action](shape.htmlData);
                }
            }
        }
    };

    // Handle hover effects for open-overlay action
    const handleMouseEnter = () => {
        if (shape.htmlData?.action === 'open-overlay') {
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        if (shape.htmlData?.action === 'open-overlay') {
            setIsHovered(false);
        }
        setTooltipPos(prev => ({ ...prev, visible: false }));
    };

    const handleMouseMove = (e) => {
        if (!shape.htmlData?.tooltip) return;
        setTooltipPos({
            x: e.clientX + 15,
            y: e.clientY + 5,
            visible: true
        });
    };

    let crop = {};

    let directUrl = shape.src;
    if (typeof shape.src === 'string' && shape.src.includes('src=')) {
        const match = shape.src.match(/src=([^&]+)/);
        if (match && match[1]) {
            directUrl = decodeURIComponent(match[1]);
        }
    }

    if (shape.cropImage) {
        try {
            crop = JSON.parse(shape.cropImage).attrs;
        } catch (e) {
            console.error("Failed to parse cropImage:", e);
        }
    }

    let effect = {};
    if (shape.effect) {
        try {
            effect = shape.effect;
        } catch (e) {
            console.error("Failed to parse effect:", e);
        }
    }

    // Use crop dimensions if valid, otherwise fall back to shape dimensions
    const displayWidth = crop.width && crop.height ? crop.width : shape.width;
    const displayHeight = crop.height && crop.width ? crop.height : shape.height;

    const shapeWidth = shape.width || 0;
    const shapeHeight = shape.height || 0;
    const maxRadius = Math.min(shapeWidth / 2, shapeHeight / 2);
    const getRadius = (r) => Math.min(r || 0, maxRadius);

    // Build effect-related styles
    const effectStyles = {};
    // Corner radius
    if (effect.individualCorners) {
        effectStyles.borderTopLeftRadius = `${getRadius(effect.topLeftRadius)}px`;
        effectStyles.borderTopRightRadius = `${getRadius(effect.topRightRadius)}px`;
        effectStyles.borderBottomRightRadius = `${getRadius(effect.bottomRightRadius)}px`;
        effectStyles.borderBottomLeftRadius = `${getRadius(effect.bottomLeftRadius)}px`;
    } else {
        const r = getRadius(effect.cornerRadius);
        effectStyles.borderRadius = `${r}px`;
        effectStyles.borderTopLeftRadius = `${r}px`;
        effectStyles.borderTopRightRadius = `${r}px`;
        effectStyles.borderBottomRightRadius = `${r}px`;
        effectStyles.borderBottomLeftRadius = `${r}px`;
    }
    // Border styles
    const borderWidth = effect.isBorderEnabled ? (effect.borderWidth || 0) : 0;
    const borderColor = effect.isBorderEnabled ? (effect.borderColor || 'black') : 'transparent';

    // Shadow (applied to image)
    if (effect.isShadowEnabled) {
        const shadowOpacity = (effect.shadowOpacity || 0) / 100;
        const shadowColor = effect.shadowColor || '#000000';
        effectStyles.boxShadow = `${effect.shadowOffsetX || 0}px ${effect.shadowOffsetY || 0}px ${effect.shadowBlur || 0}px rgba(${parseHexToRgb(shadowColor)}, ${shadowOpacity})`;
        effectStyles.backgroundColor = `rgba(${parseHexToRgb(shadowColor)}, ${shadowOpacity})`;
    }
    // Filters (applied to image)
    const filters = [];
    if (effect.brightness) filters.push(`brightness(${effect.brightness / 100 + 1})`);
    if (effect.contrast) filters.push(`contrast(${effect.contrast / 100 + 1})`);
    if (effect.saturation) filters.push(`saturate(${effect.saturation / 100 + 1})`);
    if (effect.blur) filters.push(`blur(${effect.blur / 100 + 1}px)`);
    if (effect.grayscale) filters.push(`grayscale(${effect.grayscale / 100 + 1})`);
    if (filters.length > 0) {
        effectStyles.filter = filters.join(' ');
    }

    // opacity
    if (shape.opacity !== undefined) {
        effectStyles.opacity = shape.opacity;
    }

    // Transform for outer container (without flip)
    const outerTransform = `rotate(${shape.rotation || 0}deg)
        scaleX(${shape.scaleX || 1})
        scaleY(${shape.scaleY || 1})
        skewX(${shape.skewX || 0}deg)
        skewY(${shape.skewY || 0}deg)
        translate(${shape.offsetX || 0}px, ${shape.offsetY || 0}px)`;

    // Add cursor pointer if action exists
    const cursorStyle = shape.htmlData?.action ? "pointer" : "default";

    // Hover overlay styles for open-overlay action
    const hoverOverlayStyles = {};
    if (isHovered && shape.htmlData?.action === 'open-overlay') {
        const { hoverColor, hoverOpacity } = shape.htmlData;
        if (hoverColor && hoverOpacity !== undefined) {
            const opacity = Math.min(Math.max(hoverOpacity, 0), 100) / 100;
            hoverOverlayStyles.backgroundColor = `rgba(${parseHexToRgb(hoverColor)}, ${opacity})`;
            hoverOverlayStyles.position = 'absolute';
            hoverOverlayStyles.top = '0';
            hoverOverlayStyles.left = '0';
            hoverOverlayStyles.width = '100%';
            hoverOverlayStyles.height = '100%';
            hoverOverlayStyles.zIndex = '1';
            hoverOverlayStyles.pointerEvents = 'none';
        }
    }

    return (
        <>
            <div
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                style={{
                    height: `${displayHeight}px`,
                    width: `${displayWidth}px`,
                    position: "absolute",
                    left: `${shape.x + ((crop.width && crop.height ? crop.x || 0 : 0) * (shape.scaleX || 1))}px`,
                    top: `${shape.y + ((crop.width && crop.height ? crop.y || 0 : 0) * (shape.scaleY || 1))}px`,
                    transformOrigin: "0 0",
                    transform: outerTransform,
                    display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                    cursor: cursorStyle,
                }}
            >
                <div style={{
                    width: `100%`,
                    height: `100%`,
                    position: "relative",
                    transform: `scaleX(${shape.flipX ? -1 : 1}) scaleY(${shape.flipY ? -1 : 1})`,
                    transformOrigin: "center center",
                }}>
                    <div style={{
                        width: `calc(100% - ${crop.x * -1 || 0}px - ${(crop.width - shape.width - crop.x * -1) || 0}px)`,
                        height: `calc(100% - ${crop.y * -1 || 0}px - ${(crop.height - shape.height - crop.y * -1) || 0}px)`,
                        left: `${crop.x * -1 || 0}px`,
                        top: `${crop.y * -1 || 0}px`,
                        position: "absolute",
                        backgroundColor: shape.fill || 'white',
                        overflow: "hidden",
                        boxShadow: effectStyles.boxShadow || 'none',
                        borderRadius: effectStyles.borderRadius || '0px',
                        borderTopLeftRadius: effectStyles.borderTopLeftRadius || '0px',
                        borderTopRightRadius: effectStyles.borderTopRightRadius || '0px',
                        borderBottomRightRadius: effectStyles.borderBottomRightRadius || '0px',
                        borderBottomLeftRadius: effectStyles.borderBottomLeftRadius || '0px',
                        borderWidth: `${borderWidth}px`,
                        borderStyle: 'solid',
                        borderColor: borderColor,
                        boxSizing: 'border-box',
                    }}>
                        <img
                            className="stock-photo"
                            src={directUrl}
                            alt={shape.title}
                            style={{
                                position: "absolute",
                                left: `${(crop.x || 0) - borderWidth}px`,
                                top: `${(crop.y || 0) - borderWidth}px`,
                                height: `${displayHeight}px`,
                                width: `${displayWidth}px`,
                                transformOrigin: "0 0",
                                display: "block",
                                clipPath: crop.width && crop.height && crop.x && crop.y
                                    ? `inset(${crop.y * -1}px ${crop.width - shape.width - crop.x * -1}px ${crop.height - shape.height - crop.y * -1}px ${crop.x * -1}px)`
                                    : 'none',
                                ...effectStyles,
                                boxShadow: 'none',
                                borderRadius: '0px',
                            }}
                        />
                        {/* Hover overlay for open-overlay action */}
                        {isHovered && shape.htmlData?.action === 'open-overlay' && (
                            <div style={hoverOverlayStyles} />
                        )}
                    </div>
                </div>
            </div>
            {shape.htmlData?.tooltip && tooltipPos.visible && createPortal(
                <div
                    className="bg-white text-black text-sm px-2 py-1 rounded-lg shadow-md border-none font-medium z-[9999]"
                    style={{
                        position: 'fixed',
                        left: tooltipPos.x,
                        top: tooltipPos.y,
                        pointerEvents: 'none',
                    }}
                >
                    <p>{shape.htmlData.tooltip}</p>
                </div>,
                document.body
            )}
        </>
    );
}