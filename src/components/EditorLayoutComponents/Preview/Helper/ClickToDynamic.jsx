import LinkModal from "../Widget/LinkModal";
import { createRoot } from 'react-dom/client';
import PopupFrameModal from "../Widget/PopupFrameModal";
import SpotlightModal from "../Widget/SpotlightModal";
import PhotoSlideShow from "../Widget/PhotoSlideShow";
import VideoButtonModal from "../Widget/VideoButtonModal";

export default function ClickToDynamic(shape) {
    if (shape.htmlType === "go-to-url") {
        goToUrl(shape.htmlData);
    }
    if(shape.htmlType === "go-to-button-link"){
        goToButtonLink(shape.htmlData);
    }
    if(shape.htmlType === "tag"){
        goToTag(shape.htmlData);
    }
    if(shape.htmlType === "square-caption"){
        squareCaption(shape.htmlData);
    }
    if(shape.htmlType === "rounded-caption"){
        roundedCaption(shape.htmlData);
    }
    if(shape.htmlType === "popup-frame"){
        popupFrame(shape.htmlData);
    }
    if(shape.htmlType === "spotlight"){
        spotlight(shape.htmlData);
    }
    if(shape.htmlType === "popup-slideshow"){
        popupSlideshow(shape.htmlData);
    }
    if(shape.htmlType === "video-button"){
        videoButton(shape.htmlData);
    }
}

function goToUrl(htmlData) {
    const { url, openIn } = htmlData || {};
    if (url) {
        if (openIn === "new-tab") {
            window.open(url, "_blank");
        } else {
            window.location.href = url;
        }
    }
}

function goToButtonLink(htmlData) {
    const { url, openIn } = htmlData || {};
    if (url) {
        if (openIn === "new-tab") {
            window.open(url, "_blank");
        } else {
            window.location.href = url;
        }
    }
}

function goToTag(htmlData) {
    const modalRoot = document.createElement('div');
    modalRoot.id = 'dynamic-modal-root';
    document.body.appendChild(modalRoot);
    
    const root = createRoot(modalRoot);
    
    const handleButtonClick = () => {
        if (htmlData.url) {
            window.open(htmlData.url, "_blank");
        }
    };
    
    const handleClose = () => {
        root.unmount();
        document.body.removeChild(modalRoot);
    };
    
    root.render(
        <LinkModal 
            isOpen={true}
            onClose={handleClose}
            content={htmlData}
            buttonLabel={htmlData?.buttonLabel || "Redirect"}
            onButtonClick={handleButtonClick}
        />
    );
}

function squareCaption(htmlData) {
    const modalRoot = document.createElement('div');
    modalRoot.id = 'dynamic-modal-root';
    document.body.appendChild(modalRoot);
    
    const root = createRoot(modalRoot);
    
    const handleButtonClick = () => {
        if (htmlData.url) {
            window.open(htmlData.url, "_blank");
        }
    };
    
    const handleClose = () => {
        root.unmount();
        document.body.removeChild(modalRoot);
    };
    
    root.render(
        <LinkModal 
            isOpen={true}
            onClose={handleClose}
            content={htmlData}
            buttonLabel={htmlData?.buttonLabel || ""}
            onButtonClick={handleButtonClick}
        />
    );
}

function roundedCaption(htmlData) {
    const modalRoot = document.createElement('div');
    modalRoot.id = 'dynamic-modal-root';
    document.body.appendChild(modalRoot);
    
    const root = createRoot(modalRoot);
    
    const handleButtonClick = () => {
        if (htmlData.url) {
            window.open(htmlData.url, "_blank");
        }
    };
    
    const handleClose = () => {
        root.unmount();
        document.body.removeChild(modalRoot);
    };
    
    root.render(
        <LinkModal 
            isOpen={true}
            onClose={handleClose}
            content={htmlData}
            buttonLabel={htmlData?.buttonLabel || ""}
            onButtonClick={handleButtonClick}
        />
    );
}

function popupFrame(htmlData) {
    console.log("htmlData", htmlData);
    
    const modalRoot = document.createElement('div');
    modalRoot.id = 'dynamic-modal-root';
    document.body.appendChild(modalRoot);
    
    const root = createRoot(modalRoot);

    const handleClose = () => {
        root.unmount();
        document.body.removeChild(modalRoot);
    };
    
    root.render(
        <PopupFrameModal 
            isOpen={true}
            onClose={handleClose}
            embedCode={htmlData.embedCode}
        />
    );
}

function spotlight(htmlData) {
    console.log("htmlData", htmlData);
    const modalRoot = document.createElement('div');
    modalRoot.id = 'dynamic-modal-root';
    document.body.appendChild(modalRoot);
    
    const root = createRoot(modalRoot);

    const handleClose = () => {
        root.unmount();
        document.body.removeChild(modalRoot);
    };
    
    root.render(
        <SpotlightModal 
            isOpen={true}
            onClose={handleClose}
            htmlData={htmlData}
        />
    );
}

function popupSlideshow(htmlData){
    const modalRoot = document.createElement('div');
    modalRoot.id = 'dynamic-modal-root';
    document.body.appendChild(modalRoot);
    
    const root = createRoot(modalRoot);

    const handleClose = () => {
        root.unmount();
        document.body.removeChild(modalRoot);
    };
    
    root.render(
        <PhotoSlideShow 
            isOpen={true}
            onClose={handleClose}
            htmlData={htmlData}
        />
    );
}

function videoButton(htmlData){
    const modalRoot = document.createElement('div');
    modalRoot.id = 'dynamic-modal-root';
    document.body.appendChild(modalRoot);
    
    const root = createRoot(modalRoot);

    const handleClose = () => {
        root.unmount();
        document.body.removeChild(modalRoot);
    };
    
    root.render(
        <VideoButtonModal 
            isOpen={true}
            onClose={handleClose}
            htmlData={htmlData}
        />
    );
}