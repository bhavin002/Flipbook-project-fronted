import ReactDOMServer from "react-dom/server";

export default function JsonToHtml(pageData) {
    const parseData = pageData.map((page) => convertToHtml(JSON.parse(page.pageData)))
    return parseData;
}

function convertToHtml(page) {
    return page.shapes.map((shape) => {
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
        if (shape.htmlType === "rounded-caption") {
            return { html: ReactDOMServer.renderToStaticMarkup(roundedCaption(shape)), shape };
        }
        if (shape.htmlType === "embed-code") {
            return { html: ReactDOMServer.renderToStaticMarkup(embedCode(shape)), shape };
        }
        if (shape.htmlType === "spotlight") {
            return { html: ReactDOMServer.renderToStaticMarkup(spotlight(shape)), shape };
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
            return { html: ReactDOMServer.renderToStaticMarkup(uploadPhoto(shape)), shape };
        }
        if (shape.htmlType === "upload-video") {
            return { html: ReactDOMServer.renderToStaticMarkup(uploadVideo(shape)), shape };
        }
        if (shape.htmlType === "stock-photo") {
            return { html: ReactDOMServer.renderToStaticMarkup(stockPhoto(shape)), shape };
        }
        if (shape.htmlType === "stock-video") {
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
}

function goToUrl(shape) {
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
                scaleX(${shape.scaleX})
                scaleY(${shape.scaleY})
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
            href={shape.htmlData?.url}
            target={shape.htmlData?.openIn == "new-tab" ? "_blank" : "_self"}

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
            href={shape.htmlData?.url}
            target={shape.htmlData?.openIn == "new-tab" ? "_blank" : "_self"}
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
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
      scaleX(${shape.scaleX})
      scaleY(${shape.scaleY})
      skewX(${shape.skewX || 0}deg)
      skewY(${shape.skewY || 0}deg)
      translate(${shape.offsetX || 0}px, ${shape.offsetY || 0}px)`,
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
              scaleX(${shape.scaleX})
              scaleY(${shape.scaleY})
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

function popUpFrame(shape) {
    return (
        <div
            title={shape.htmlData.popupFrameTooltip}
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
          skewX(${shape.skewX || 0}deg)
          skewY(${shape.skewY || 0}deg)
          translate(${shape.offsetX || 0}px, ${shape.offsetY || 0}px)`,
                display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
            }}
        />
    );
}

function spotlight(shape) {
    return (
        <div
            title={shape.htmlData.spotLightTooltip}
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
          skewX(${shape.skewX || 0}deg)
          skewY(${shape.skewY || 0}deg)
          translate(${shape.offsetX || 0}px, ${shape.offsetY || 0}px)`,
                display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
            }}
        />
    );
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
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
            title={shape.htmlData.photoSlideShowTooltip}
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
          skewX(${shape.skewX || 0}deg)
          skewY(${shape.skewY || 0}deg)
          translate(${shape.offsetX || 0}px, ${shape.offsetY || 0}px)`,
                display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
            }}
        />
    );
}

function videoEmbed(shape) {
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
          skewX(${shape.skewX || 0}deg)
          skewY(${shape.skewY || 0}deg)
          translate(${shape.offsetX || 0}px, ${shape.offsetY || 0}px)`,
                background: "black"
            }}>
            {
                shape.htmlData.url ? <iframe src={shape.htmlData.url} allowfullscreen="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="Long Drive Mashup 4 | Non-Stop JukeBox | AK Music | Road Trip Mashup | Romantic LoFi, Chill" data-gtm-yt-inspected-21="true" width="100%" height="100%" /> :
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
                title={shape.htmlData.videoButtonTooltip}
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
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
            scaleX(${shape.scaleX})
            scaleY(${shape.scaleY})
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
          skewX(${shape.skewX || 0}deg)
          skewY(${shape.skewY || 0}deg)
          translate(${shape.offsetX || 0}px, ${shape.offsetY || 0}px)`,
                    display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                }}
            />
        </div>
    );
}

function goToNextPage(shape) {
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
          skewX(${shape.skewX || 0}deg)
          skewY(${shape.skewY || 0}deg)
          translate(${shape.offsetX || 0}px, ${shape.offsetY || 0}px)`,
                    display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                }}
            />
        </div>
    );
}

function goToPage(shape) {
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
          skewX(${shape.skewX || 0}deg)
          skewY(${shape.skewY || 0}deg)
          translate(${shape.offsetX || 0}px, ${shape.offsetY || 0}px)`,
                    display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                }}
            />
        </div>
    );
}

function goToFirstPage(shape) {
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
          skewX(${shape.skewX || 0}deg)
          skewY(${shape.skewY || 0}deg)
          translate(${shape.offsetX || 0}px, ${shape.offsetY || 0}px)`,
                    display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                }}
            />
        </div>
    );
}

function goToLastPage(shape) {
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
          skewX(${shape.skewX || 0}deg)
          skewY(${shape.skewY || 0}deg)
          translate(${shape.offsetX || 0}px, ${shape.offsetY || 0}px)`,
                    display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
                }}
            />
        </div>
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
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
              scaleX(${shape.scaleX})
              scaleY(${shape.scaleY})
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

function uploadPhoto(shape) {
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
            scaleX(${shape.scaleX})
            scaleY(${shape.scaleY})
            skewX(${shape.skewX || 0}deg)
            skewY(${shape.skewY || 0}deg)
            translate(${shape.offsetX || 0}px, ${shape.offsetY || 0}px)`,
                display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
            }}
        />
    );
}

function uploadVideo(shape) {
    return (
        <video
            src={shape.src}
            alt={shape.title}
            height={shape.height}
            width={shape.width}
            controls="true"
            playsInline="true"
            muted="true"
            volume="1"
            style={{
                position: "absolute",
                left: `${shape.x}px`,
                top: `${shape.y}px`,
                transformOrigin: "0 0",
                transform: `rotate(${shape.rotation || 0}deg)
            scaleX(${shape.scaleX})
            scaleY(${shape.scaleY})
            skewX(${shape.skewX || 0}deg)
            skewY(${shape.skewY || 0}deg)
            translate(${shape.offsetX || 0}px, ${shape.offsetY || 0}px)`,
                display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
            }}
        ></video>
    );
}

function stockPhoto(shape) {
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
            scaleX(${shape.scaleX})
            scaleY(${shape.scaleY})
            skewX(${shape.skewX || 0}deg)
            skewY(${shape.skewY || 0}deg)
            translate(${shape.offsetX || 0}px, ${shape.offsetY || 0}px)`,
                display: ('visible' in shape) ? shape.visible ? "block" : "none" : "block",
            }}
        />
    );
}

function stockVideo(shape) {
    return (
        <video
            src={shape.src}
            alt={shape.title}
            height={shape.height}
            width={shape.width}
            controls="true"
            playsInline="true"
            muted="true"
            volume="1"
            style={{
                position: "absolute",
                left: `${shape.x}px`,
                top: `${shape.y}px`,
                transformOrigin: "0 0",
                transform: `rotate(${shape.rotation || 0}deg)
            scaleX(${shape.scaleX})
            scaleY(${shape.scaleY})
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
            scaleX(${shape.scaleX})
            scaleY(${shape.scaleY})
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
            scaleX(${shape.scaleX})
            scaleY(${shape.scaleY})
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
          scaleX(${shape.scaleX})
          scaleY(${shape.scaleY})
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