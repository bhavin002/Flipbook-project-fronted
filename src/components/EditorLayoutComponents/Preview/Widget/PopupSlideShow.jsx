import React, { useState } from 'react';
import { createPortal } from 'react-dom';

export default function PopupSlideShow({ shape }) {
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false });

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

    const handleMouseLeave = () => {
        setTooltipPos(prev => ({ ...prev, visible: false }));
    };

    return (
        <>
            <div
                onPointerMove={handleMouseMove}
                onPointerLeave={handleMouseLeave}
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
                }}
            />
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