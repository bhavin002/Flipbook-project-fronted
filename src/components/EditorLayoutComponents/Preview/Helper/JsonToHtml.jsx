import ReactDOMServer from "react-dom/server";
import React from "react";

const JsonToHtml = (pageData) => {
    if (!pageData) return [];
    const parseData = pageData.map((page) => convertToHtml(JSON.parse(page.pageData), page._id));
    return parseData;
};

function convertToHtml(page, pageId) {

    const pageData = page.shapes.map((shape) => {
        if (shape.htmlType === "link-area") {
            console.log("shape", shape);
            return { html: ReactDOMServer.renderToStaticMarkup(goToUrl(shape)), shape };
        }
        if (shape.htmlType === "go-to-button-link") {
            return { html: ReactDOMServer.renderToStaticMarkup(goToButtonLink(shape)), shape };
        }
        if (shape.htmlType === "link-tag") {
            return { html: ReactDOMServer.renderToStaticMarkup(tag(shape)), shape };
        }
        if (shape.htmlType === "square-caption") {
            return { html: ReactDOMServer.renderToStaticMarkup(squareCaption(shape)), shape };
        }
        if (shape.htmlType === "embed-code") {
            return { html: ReactDOMServer.renderToStaticMarkup(embedCode(shape)), shape };
        }
        if (shape.htmlType === "slideshow") {
            return { html: ReactDOMServer.renderToStaticMarkup(slideshow(shape)), shape };
        }
        if (shape.htmlType === "popup-slideshow") {
            return { html: ReactDOMServer.renderToStaticMarkup(popupSlideShow(shape)), shape };
        }
        if (shape.htmlType === "video-embed") {
            return { html: ReactDOMServer.renderToStaticMarkup(videoEmbed(shape)), shape };
        }
        if (shape.htmlType === "video-button") {
            return { html: ReactDOMServer.renderToStaticMarkup(videoButton(shape)), shape };
        }
        if (shape.htmlType === "audio-button") {
            return { html: ReactDOMServer.renderToStaticMarkup(audioButton(shape)), shape };
        }
        if (shape.htmlType === "product-tag") {
            return { html: ReactDOMServer.renderToStaticMarkup(productTag(shape)), shape };
        }
        if (shape.htmlType === "shop-area") {
            return { html: ReactDOMServer.renderToStaticMarkup(shopArea(shape)), shape };
        }
        if (shape.htmlType === "shop-button") {
            return { html: ReactDOMServer.renderToStaticMarkup(shopButton(shape)), shape };
        }
        if (shape.htmlType === "go-to-previous-page") {
            return { html: ReactDOMServer.renderToStaticMarkup(goToPreviousPage(shape)), shape };
        }
        if (shape.htmlType === "go-to-next-page") {
            return { html: ReactDOMServer.renderToStaticMarkup(goToNextPage(shape)), shape };
        }
        if (shape.htmlType === "go-to-page") {
            return { html: ReactDOMServer.renderToStaticMarkup(goToPage(shape)), shape };
        }
        if (shape.htmlType === "go-to-first-page") {
            return { html: ReactDOMServer.renderToStaticMarkup(goToFirstPage(shape)), shape };
        }
        if (shape.htmlType === "go-to-last-page") {
            return { html: ReactDOMServer.renderToStaticMarkup(goToLastPage(shape)), shape };
        }
        if (shape.htmlType === "quiz") {
            return { html: ReactDOMServer.renderToStaticMarkup(quiz(shape)), shape };
        }
        if (shape.htmlType === "question") {
            return { html: ReactDOMServer.renderToStaticMarkup(question(shape)), shape };
        }
        if (shape.htmlType === "contact-form") {
            return { html: ReactDOMServer.renderToStaticMarkup(contactForm(shape)), shape };
        }
        if (shape.htmlType === "text") {
            return { html: ReactDOMServer.renderToStaticMarkup(text(shape)), shape };
        }
        if (shape.htmlType === "upload-photo") {
            return { html: ReactDOMServer.renderToStaticMarkup(stockPhoto(shape)), shape };
        }
        if (shape.htmlType === "stock-photo") {
            return { html: ReactDOMServer.renderToStaticMarkup(stockPhoto(shape)), shape };
        }
        if (shape.htmlType === "stock-video") {
            console.log("stock-video ??", shape)
            return { html: ReactDOMServer.renderToStaticMarkup(stockVideo(shape)), shape };
        }
        if (shape.htmlType === "stock-gif") {
            return { html: ReactDOMServer.renderToStaticMarkup(stockGif(shape)), shape };
        }
        if (shape.htmlType === "stock-sticker") {
            return { html: ReactDOMServer.renderToStaticMarkup(stockSticker(shape)), shape };
        }
        if (shape.htmlType === "shape-widget") {
            return { html: ReactDOMServer.renderToStaticMarkup(shapeWidget(shape)), shape };
        }
        if (shape.htmlType === "masked-image") {
            return { html: ReactDOMServer.renderToStaticMarkup(MaskedImageWidget(shape)), shape };
        }
        return "";
    })
    return {
        pageId: pageId,
        pageData: pageData,
        background: page.background,
        width: page.CANVAS_WIDTH,
        height: page.CANVAS_HEIGHT,
    }

}

function goToUrl(shape) {
    return (
        <a
            className="ping"
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
    );
}

function goToButtonLink(shape) {
    return (
        <a title={shape.htmlData?.tooltip}
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
        </ a>
    );
}

function tag(shape) {
    return (
        <a
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
            }}
        >
        </a>
    );
}

function squareCaption(shape) {
    return (
        <a
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
            }}>
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
    );
}

function roundedCaption(shape) {
    return (
        <div>
            <div
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
                    borderRadius: `${shape.cornerRadius}px`,
                }}
            />
            <img
                src={shape.src}
                alt={shape.title}
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
                }}
            />
        </div>
    );
}

function embedCode(shape) {
    if (shape?.htmlData?.embedCode) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
                overflow: "hidden"
            }}>
                <div
                    className="embed-code-1"
                    dangerouslySetInnerHTML={{ __html: shape.htmlData.embedCode }}
                />
            </div>
        )
    } else {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
                backgroundImage: (shape.htmlData.coverImage.url && shape.htmlData.embedCode) ? `url(${shape.htmlData.coverImage.url})` : "",
            }}>
                <div
                    style={{
                        width: `100%`,
                        height: `100%`,
                        backgroundColor: shape.fill,
                        opacity: shape.opacity,
                        display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                    }}
                />
                <img
                    src={shape.src}
                    alt={shape.title}
                    style={{
                        width: `30px`,
                        height: `30px`,
                        position: "absolute",
                        display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                    }}
                />
            </div>
        );
    }
}

function slideshow(shape) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
        }}
        >
            <div
                style={{
                    width: `100%`,
                    height: `100%`,
                    backgroundColor: shape.fill,
                    opacity: shape.opacity,
                    display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                }}
            />
            <img
                src={shape.src}
                alt={shape.title}
                style={{
                    width: `30px`,
                    height: `30px`,
                    position: "absolute",
                    display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                }}
            />
        </div>
    );
}

function popupSlideShow(shape) {
    return (
        <div
            title={shape.htmlData?.tooltip}
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
    );
}

function videoEmbed(shape) {
    let embedUrl = null;

    if (shape.htmlData?.url) {
        const url = shape.htmlData.url;
        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(youtubeRegex);

        if (match) {
            const videoId = match[1];
            embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
        } else {
            embedUrl = url;
        }
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
            }}>
            {
                embedUrl ?
                    <iframe
                        src={embedUrl}
                        allowFullScreen
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        title={shape.title || "Embedded Video"}
                        width="100%"
                        height="100%"
                    /> :
                    <>
                        <div
                            style={{
                                width: `100%`,
                                height: `100%`,
                                backgroundColor: shape.fill,
                                opacity: shape.opacity,
                                display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                            }}
                        />
                        <img
                            src={shape.src}
                            alt={shape.title}
                            style={{
                                width: `30px`,
                                height: `30px`,
                                position: "absolute",
                                display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                            }}
                        />
                    </>
            }
        </div>
    );
}

function videoButton(shape) {
    return (
        <div id={shape.id}>
            <div
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
                }}
            />
            <img
                src={shape.src}
                alt={shape.title}
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
                }}
            />
        </div>
    );
}

function audioButton(shape) {
    return (
        <div>
            <div
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
            <img
                src={shape.src}
                alt={shape.title}
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
                }}
            />
        </div>
    );
}

function productTag(shape) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            fill={shape.fill}
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
            }}
        >
            {shape.data.map((path) => {
                return <path d={path} />;
            })}
        </svg>
    );
}

function shopArea(shape) {
    return (
        <div
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
    );
}

function shopButton(shape) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
        }}>
            <div
                style={{
                    width: `100%`,
                    height: `100%`,
                    backgroundColor: shape.fill,
                    opacity: shape.opacity,
                    display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                }}
            />
            <img
                src={shape.src}
                alt={shape.title}
                style={{
                    width: `30px`,
                    height: `30px`,
                    position: "absolute",
                    display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                }}
            />
        </div>
    );
}

function goToPreviousPage(shape) {
    return (
        <>
            <div
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
                }}
            />
            <img
                title={shape.htmlData?.tooltip || "Go to previous page"}
                src={shape.src}
                alt={shape.title}
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
                }}
            />
        </>

    );
}

function goToNextPage(shape) {
    return (
        <>
            <div
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
                }}
            />
            <img
                title={shape.htmlData?.tooltip || "Go to next page"}
                src={shape.src}
                alt={shape.title}
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
                }}
            />
        </>
    );
}

function goToPage(shape) {
    return (
        <>
            <div
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
                }}
            />
            <img
                title={shape.htmlData?.tooltip || "Go to page"}
                src={shape.src}
                alt={shape.title}
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
                }}
            />
        </>
    );
}

function goToFirstPage(shape) {
    return (
        <>
            <div
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
                }}
            />
            <img
                title={shape.htmlData?.tooltip || "Go to first page"}
                src={shape.src}
                alt={shape.title}
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
                }}
            />
        </>
    );
}

function goToLastPage(shape) {
    return (
        <>
            <div
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
                }}
            />
            <img
                title={shape.htmlData?.tooltip || "Go to last page"}
                src={shape.src}
                alt={shape.title}
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
                }}
            />
        </>
    );
}

function quiz(shape) {
    return (
        <div
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
    );
}

function question(shape) {
    return (
        <div
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
    );
}

function contactForm(shape) {
    return (
        <div
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
    );
}

function text(shape) {
    return (
        <p
            style={{
                width: `${shape.width}px`,
                height: `${shape.height}px`,
                color: shape.fill,
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
                fontFamily: shape.fontFamily,
                fontSize: `${shape.fontSize}px`,
                textDecoration: shape.textDecoration,
                letterSpacing: `${shape.letterSpacing}px`,
                lineHeight: shape.lineHeight,
                textAlign: shape.align,
                fontWeight: shape.fontStyle?.split(" ").includes("bold")
                    ? "bold"
                    : "normal",
                fontStyle: shape.fontStyle?.split(" ").includes("italic")
                    ? "italic"
                    : "normal",
                wordBreak: 'break-word'
            }}
        >
            {shape.text}
        </p>
    );
}

function stockPhoto(shape) {
    console.log("stockPhoto 2222 ???", shape);
    let crop = {};
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

    // Build effect-related styles
    const effectStyles = {};
    // Corner radius
    if (effect.individualCorners) {
        effectStyles.borderTopLeftRadius = `${effect.topLeftRadius || 0}px`;
        effectStyles.borderTopRightRadius = `${effect.topRightRadius || 0}px`;
        effectStyles.borderBottomRightRadius = `${effect.bottomRightRadius || 0}px`;
        effectStyles.borderBottomLeftRadius = `${effect.bottomLeftRadius || 0}px`;
    } else {
        effectStyles.borderRadius = `${effect.cornerRadius || 0}px`;
    }
    // Shadow (applied to image)
    if (effect.isShadowEnabled) {
        const shadowOpacity = (effect.shadowOpacity || 0) / 100;
        const shadowColor = effect.shadowColor || '#000000';
        effectStyles.boxShadow = `${effect.shadowOffsetX || 0}px ${effect.shadowOffsetY || 0}px ${effect.shadowBlur || 0}px rgba(${parseHexToRgb(shadowColor)}, ${shadowOpacity})`;
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

    // Common transform for both container and image
    const transform = `rotate(${shape.rotation || 0}deg)
        scaleX(${shape.scaleX || 1})
        scaleY(${shape.scaleY || 1})
        skewX(${shape.skewX || 0}deg)
        skewY(${shape.skewY || 0}deg)
        translate(${shape.offsetX || 0}px, ${shape.offsetY || 0}px)`;

    return (
        <div
            style={{
                height: `${displayHeight}px`,
                width: `${displayWidth}px`,
                position: "absolute",
                left: `${shape.x + ((crop.width && crop.height ? crop.x || 0 : 0) * (shape.scaleX || 1))}px`,
                top: `${shape.y + ((crop.width && crop.height ? crop.y || 0 : 0) * (shape.scaleY || 1))}px`,
                transformOrigin: "0 0",
                transform,
                display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                // effectStyles.boxShadow
            }}
        >
            <div style={{
                width: `calc(100% - ${crop.x * -1 || 0}px - ${(crop.width - shape.width - crop.x * -1) || 0}px)`,
                height: `calc(100% - ${crop.y * -1 || 0}px - ${(crop.height - shape.height - crop.y * -1) || 0}px)`,
                left: `${crop.x * -1 || 0}px`,
                top: `${crop.y * -1 || 0}px`,
                position: "absolute",
                backgroundColor: "white",
                overflow: "hidden",
                boxShadow: effectStyles.boxShadow || 'none',
                borderRadius: effectStyles.borderRadius || '0px',
            }}>

                <img
                    className="stock-photo"
                    src={shape.src}
                    alt={shape.title}
                    style={{
                        position: "absolute",
                        left: `${crop.x || 0}px`,
                        top: `${crop.y || 0}px`,
                        height: `${displayHeight}px`,
                        width: `${displayWidth}px`,
                        transformOrigin: "0 0",
                        display: "block",
                        clipPath: crop.width && crop.height && crop.x && crop.y
                            ? `inset(${crop.y * -1}px ${crop.width - shape.width - crop.x * -1}px ${crop.height - shape.height - crop.y * -1}px ${crop.x * -1}px)`
                            : 'none',
                        ...effectStyles, // Apply corner radius, filters, and shadow to image
                        boxShadow: 'none',
                        borderRadius: '0px',
                    }}
                />
            </div>
        </div>
    );
}

// Helper function to parse hex color to RGB
function parseHexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}
function stockVideo(shape) {
    console.log("stockVideo 2222 ???", shape);
    return (
        <video
            src={shape.src}
            alt={shape.title}
            controls="true"
            playsInline="true"
            muted="true"
            volume="1"
            style={{
                height: `${shape.height}px`,
                width: `${shape.width}px`,
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
        ></video>
    );
}

function stockGif(shape) {
    return (
        <img
            src={shape.src}
            alt={shape.title}
            style={{
                height: `${shape.height}px`,
                width: `${shape.width}px`,
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
    );
}

function stockSticker(shape) {
    return (
        <img
            src={shape.src}
            alt={shape.title}
            style={{
                height: `${shape.height}px`,
                width: `${shape.width}px`,
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
    );
}

function shapeWidget(shape) {
    return (
        <svg
            height={shape.height}
            width={shape.width}
            xmlns="http://www.w3.org/2000/svg"
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
            }}
        >
            {shape.data.map((path) => {
                return <path d={path} stroke={shape.stroke ? shape.fill : shape.stroke}
                    fill={shape.stroke ? shape.stroke : shape.fill} strokeWidth={shape.strokeWidth || 0} />;
            })}
        </svg>
    );
}

function MaskedImageWidget(shape) {
    const maskId = `mask-${shape.id}`;
    return (
        <svg
            height={shape.height}
            width={shape.width}
            xmlns="http://www.w3.org/2000/svg"
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
                display: shape.visible ? "block" : "none",
            }}
        >
            <defs>
                <clipPath id={maskId}>
                    <path d={shape.data} />
                </clipPath>
            </defs>
            <image
                href={shape.src}
                width={shape.width}
                height={shape.height}
                clipPath={shape.maskData ? `url(#${maskId})` : undefined}
                preserveAspectRatio="none"
            />
        </svg>
    );
}

export default JsonToHtml;