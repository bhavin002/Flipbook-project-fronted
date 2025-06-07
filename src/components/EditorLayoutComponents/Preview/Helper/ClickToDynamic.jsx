import LinkModal from "../Widget/LinkModal";
import { createRoot } from 'react-dom/client';
import PopupFrameModal from "../Widget/PopupFrameModal";
import SpotlightModal from "../Widget/SpotlightModal";
import PhotoSlideShow from "../Widget/PhotoSlideShow";
import VideoButtonModal from "../Widget/VideoButtonModal";
import { PageNavigationActions } from './PageNavigationActions';

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
        showModal(PopupFrameModal, htmlData);
    },
    'spotlight': (htmlData) => {
        console.log("spotlight htmlData ??", htmlData)
        showModal(SpotlightModal, htmlData);
    },
    'photo-slideshow': (htmlData) => {
        showModal(PhotoSlideShow, htmlData);
    },
};

const actionHandlers = {
    'go-to-button-link': (htmlData) => {
        const { url, openIn } = htmlData || {};
        if (url) {
            if (openIn === "new-tab") {
                window.open(url, "_blank");
            } else {
                window.location.href = url;
            }
        }
    },
};

const modalHandlers = { 
    'link-tag': (htmlData) => {
        showModal(LinkModal, htmlData);
    },
    'square-caption': (htmlData) => {
        showModal(LinkModal, htmlData);
    },
    'rounded-caption': (htmlData) => {
        showModal(LinkModal, htmlData);
    },
    'video-button': (htmlData) => {
        showModal(VideoButtonModal, htmlData);
    }
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

export default function ClickToDynamic(shape, flipbookRef) {
    console.log("ClickToDynamic shape ???", shape)
    const { htmlType, htmlData } = shape;

    if (htmlType === 'link-area') {
        if (htmlData?.action && linkAreaActionHandlers[htmlData.action]) {
            linkAreaActionHandlers[htmlData.action](htmlData, flipbookRef);
            return;
        }
        if (htmlData?.action && linkAreaModalHandlers[htmlData.action]) {
            linkAreaModalHandlers[htmlData.action](htmlData);
            return;
        }
    }

    if (htmlType && actionHandlers[htmlType]) {
        actionHandlers[htmlType](htmlData);
        return;
    }

    if (htmlType && modalHandlers[htmlType]) {
        modalHandlers[htmlType](htmlData);
        return;
    }
}