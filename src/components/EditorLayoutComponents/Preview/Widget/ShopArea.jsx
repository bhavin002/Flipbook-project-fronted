import React from 'react';
import ShopAreaModal from './ShopAreaModal';
import { showModal } from '@/utils/ShowModal';

export default function ShopArea({ shape, visibilitySettings }) {
    const handleClick = () => {
        if (shape.htmlType === 'shop-area') {
            showModal(ShopAreaModal, shape.htmlData);
        }
    };
    return (
        <div
            onClick={handleClick}
            className={visibilitySettings.showAnimateInteraction ? "ping" : ""}
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
                cursor: "pointer",
            }}
        />
    );
} 