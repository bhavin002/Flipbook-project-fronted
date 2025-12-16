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

export default function ShapeWidget({ shape, flipbookRef }) {

    const [isHovered, setIsHovered] = useState(false);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false });

    // Handle click actions
    const handleClick = () => {
        setTooltipPos(prev => ({ ...prev, visible: false }));
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
        if (e.pointerType === 'mouse') {
            setTooltipPos({
                x: e.clientX + 15,
                y: e.clientY + 5,
                visible: true
            });
        }
    };

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
                onPointerMove={handleMouseMove}
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
                    cursor: cursorStyle,
                }}
            >
                <svg
                    height={shape.height}
                    width={shape.width}
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        width: `${shape.width}px`,
                        height: `${shape.height}px`,
                        position: "relative",
                        zIndex: 0,
                    }}
                >
                    {shape.data.map((element, index) => {
                        if (element.type === 'path') {
                            return <path
                                key={`path-${index}`}
                                d={element.data}
                                stroke={shape.stroke ? shape.fill : shape.stroke}
                                fill={shape.stroke ? shape.stroke : shape.fill}
                                strokeWidth={shape.strokeWidth || 0}
                            />;
                        }
                        else if (element.type === 'rect') {
                            return <rect
                                key={`rect-${index}`}
                                x={Number(element.x) || 0}
                                y={Number(element.y) || 0}
                                width={Number(element.width)}
                                height={Number(element.height)}
                                stroke={shape.stroke ? shape.fill : shape.stroke}
                                fill={shape.stroke ? shape.stroke : shape.fill}
                                strokeWidth={shape.strokeWidth || 0}
                            />;
                        } else if (element.type === 'polygon') {
                            return <polygon
                                key={`polygon-${index}`}
                                points={element.points}
                                stroke={shape.stroke ? shape.fill : shape.stroke}
                                fill={shape.stroke ? shape.stroke : shape.fill}
                                strokeWidth={shape.strokeWidth || 0}
                            />;
                        } else if (element.type === 'circle') {
                            return <circle
                                key={`circle-${index}`}
                                cx={Number(element.cx) || 0}
                                cy={Number(element.cy) || 0}
                                r={Number(element.r) || 0}
                                stroke={shape.stroke ? shape.fill : shape.stroke}
                                fill={shape.stroke ? shape.stroke : shape.fill}
                                strokeWidth={shape.strokeWidth || 0}
                            />;
                        } else if (element.type === 'ellipse') {
                            return <ellipse
                                key={`ellipse-${index}`}
                                cx={Number(element.cx) || 0}
                                cy={Number(element.cy) || 0}
                                rx={Number(element.rx) || 0}
                                ry={Number(element.ry) || 0}
                                stroke={shape.stroke ? shape.fill : shape.stroke}
                                fill={shape.stroke ? shape.stroke : shape.fill}
                                strokeWidth={shape.strokeWidth || 0}
                            />;
                        }
                    })}
                </svg>
                {/* Hover overlay for open-overlay action */}
                {isHovered && shape.htmlData?.action === 'open-overlay' && (
                    <div style={hoverOverlayStyles} />
                )}
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