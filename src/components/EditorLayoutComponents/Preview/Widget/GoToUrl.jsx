import React from 'react';
import { createRoot } from 'react-dom/client';
import PopupFrameModal from "./PopupFrameModal";
import SpotlightModal from "./SpotlightModal";
import PhotoSlideShow from "./PhotoSlideShow";
import { PageNavigationActions } from '../Helper/PageNavigationActions';

const linkAreaActionHandlers = {
    "send-email": (htmlData) => {
        const { email } = htmlData || {};
        if (email) {
            window.location.href = `mailto:${email}`;
        }
    },

    'go-to-url': (htmlData) => {
        const { url, openIn } = htmlData || {};
        if (url) {
            if (openIn === "new-tab") {
                window.open(url, "_blank");
            } else {
                window.location.href = url;
            }
        }
    },

    'go-to-profile': (htmlData) => {
        const url = import.meta.env.VITE_APP_URL + "/account/details";
        window.open(url, "_blank");
    },

    'download-pdf': (htmlData) => {
        console.log('Download PDF action triggered');
    },

    'go-to-next-page': (htmlData, flipbookRef) => {
        PageNavigationActions.goToNextPage(flipbookRef);
    },

    'go-to-previous-page': (htmlData, flipbookRef) => {
        PageNavigationActions.goToPreviousPage(flipbookRef);
    },

    'go-to-first-page': (htmlData, flipbookRef) => {
        PageNavigationActions.goToFirstPage(flipbookRef);
    },

    'go-to-last-page': (htmlData, flipbookRef) => {
        PageNavigationActions.goToLastPage(flipbookRef);
    },

    'go-to-page': (htmlData, flipbookRef) => {
        if (htmlData?.pageNumber) {
            PageNavigationActions.goToPage(flipbookRef, htmlData.pageNumber);
        }
    },

    'phone-number': (htmlData) => {
        const { phoneNumber } = htmlData || {};
        if (phoneNumber) {
            window.location.href = `tel:${phoneNumber}`;
        }
    },
};

const linkAreaModalHandlers = {
    'popup-frame': (htmlData) => {
        if (htmlData?.url) {
            showModal(PopupFrameModal, htmlData);
        }
    },
    'spotlight': (htmlData) => {
        showModal(SpotlightModal, htmlData);
    },
    'photo-slideshow': (htmlData) => {
        showModal(PhotoSlideShow, htmlData);
    },
};

function showModal(ModalComponent, htmlData) {
    const modalRoot = document.createElement('div');
    modalRoot.id = 'dynamic-modal-root';
    modalRoot.style.position = 'relative';
    modalRoot.style.zIndex = '100';
    document.body.appendChild(modalRoot);

    const root = createRoot(modalRoot);

    const handleClose = () => {
        root.unmount();
        document.body.removeChild(modalRoot);
    };

    root.render(
        <ModalComponent
            open={true}
            onOpenChange={(open) => {
                if (!open) handleClose();
            }}
            htmlData={htmlData}
        />
    );
}

export default function GoToUrl({ shape, visibilitySettings, flipbookRef }) {
    const handleClick = () => {
        if (shape.htmlType === 'link-area') {
            if (shape.htmlData?.action && linkAreaActionHandlers[shape.htmlData.action]) {
                linkAreaActionHandlers[shape.htmlData.action](shape.htmlData, flipbookRef);
                return;
            }
            if (shape.htmlData?.action && linkAreaModalHandlers[shape.htmlData.action]) {
                linkAreaModalHandlers[shape.htmlData.action](shape.htmlData);
                return;
            }
        }
    };

    return (
        <a
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
    )
} 