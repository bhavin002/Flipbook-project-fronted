import React from 'react';
import ShopAreaModal from './ShopAreaModal';
import { showModal } from '@/utils/ShowModal';
import { useShopSettings } from '@/context/ShopSettingsContext';

export default function ShopArea({ shape, visibilitySettings, flipbookId }) {
    const { getCurrentCurrency } = useShopSettings();
    const handleClick = () => {
        if (shape.htmlType === 'shop-area' && shape.htmlData?.variantId) {
            showModal(ShopAreaModal, shape.htmlData, flipbookId, getCurrentCurrency());
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