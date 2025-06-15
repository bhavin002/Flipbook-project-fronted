import React from 'react';
import ProductTagModal from './ProductTagModal';
import { showModal } from '@/utils/ShowModal';

export default function ProductTag({ shape, visibilitySettings }) {
    const handleClick = () => {
        if (shape.htmlType === 'product-tag') {
            showModal(ProductTagModal, shape.htmlData);
        }
    };
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            fill={shape.fill}
            onClick={handleClick}
            className={visibilitySettings.showAnimateInteraction ? "ping rounded-full" : ""}
            style={{
                height: "51px",
                width: "51px",
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
                cursor: 'pointer'
            }}
        >
            {shape.data.map((path, index) => (
                <path key={index} d={path} />
            ))}
        </svg>
    );
} 