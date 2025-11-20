import LinkModal from "./LinkModal";
import { showModal } from "@/utils/ShowModal";

export default function Tag({ shape, visibilitySettings }) {
    const handleClick = () => {
        if (shape.htmlType === 'link-tag' && shape.htmlData?.url) {
            showModal(LinkModal, shape.htmlData);
        }
    };

    return (
        <a
            onClick={handleClick}
            className={visibilitySettings.showAnimateInteraction ? "ping" : ""}
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
            }}
        >
        </a>
    )
}