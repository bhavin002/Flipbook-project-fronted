import React, { useState, useEffect } from 'react';
import LinkModal from "./LinkModal";
import { showModal } from "@/utils/ShowModal";

export default function Tag({ shape, visibilitySettings, isVisible }) {
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        if (visibilitySettings.showAnimateInteraction && isVisible) {
            setAnimationClass('ping-circle-initial');
            const timer = setTimeout(() => {
                setAnimationClass('ping-circle-hover');
            }, 1500);
            return () => clearTimeout(timer);
        } else {
            setAnimationClass('');
        }
    }, [visibilitySettings.showAnimateInteraction, isVisible]);

    const handleClick = () => {
        if (shape.htmlType === 'link-tag') {
            showModal(LinkModal, shape.htmlData, null, null, null, visibilitySettings);
        }
    };

    return (
        <a
            onClick={handleClick}
            className={visibilitySettings.showAnimateInteraction ? animationClass : ""}
            style={{
                width: `${shape.outerRadius * 2}px`,
                height: `${shape.outerRadius * 2}px`,
                borderColor: shape.fill,
                borderWidth: shape.outerRadius - shape.innerRadius,
                borderStyle: "solid",
                opacity: shape.opacity,
                borderRadius: "50%",
                position: "absolute",
                left: `${shape.x - (shape.outerRadius * shape.scaleX || 1)}px`,
                top: `${shape.y - (shape.outerRadius * shape.scaleY || 1)}px`,
                transformOrigin: "0 0",
                transform: `rotate(${shape.rotation || 0}deg)
                scaleX(${shape.scaleX || 1})
                scaleY(${shape.scaleY || 1})
                skewX(${shape.skewX || 0}deg)
                skewY(${shape.skewY || 0}deg)
                translate(${shape.offsetX || 0}px, ${shape.offsetY || 0}px)`,
                display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                cursor: "pointer",
                '--ping-color': shape.fill || '#ff0000',
            }}
        >
        </a>
    )
}