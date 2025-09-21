export default function GoToButtonLink({ shape, visibilitySettings }) {
    const handleClick = () => {
        const { url, openIn } = shape.htmlData || {};
        if (url) {
            if (openIn === "new-tab") {
                window.open(url, "_blank");
            } else {
                window.location.href = url;
            }
        }
    };

    return (
        <a 
            onClick={handleClick}
            title={shape.htmlData?.tooltip}
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
                borderRadius: shape.effect?.individualCorners ? `${shape.effect?.topLeftRadius / 1.5 || 0}px ${shape.effect?.topRightRadius / 1.5 || 0}px ${shape.effect?.bottomRightRadius / 1.5 || 0}px ${shape.effect?.bottomLeftRadius / 1.5 || 0}px` : `${shape.effect?.cornerRadius / 1.5 || 0}px`,
                cursor: "pointer",
            }}            >
            <img
                src={shape.src}
                alt={shape.title}
                style={{
                    width: `${shape.width}px`,
                    height: `${shape.height}px`,
                    position: "absolute",
                }}
            />
        </a>
    )
}