import React, { useState, useEffect } from 'react';
import ProductTagModal from './ProductTagModal';
import { showModal } from '@/utils/ShowModal';

export default function ProductTag({ shape, visibilitySettings, currentPages }) {
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        if (visibilitySettings.showAnimateInteraction) {
            setAnimationClass('ping-product-initial');
            const timer = setTimeout(() => {
                setAnimationClass('ping-product-hover');
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [visibilitySettings.showAnimateInteraction, currentPages]);

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
            className={visibilitySettings.showAnimateInteraction ? animationClass : ""}
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
                cursor: 'pointer',
                '--ping-color': shape.fill || '#ff0000',
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
    );
} 