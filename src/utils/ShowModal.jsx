import { createRoot } from 'react-dom/client';

export function showModal(ModalComponent, htmlData, flipbookId, currentCurrency) {
    const fullscreenElement = document.fullscreenElement;

    const modalRoot = document.createElement('div');
    modalRoot.id = 'dynamic-modal-root';
    modalRoot.style.position = 'relative';
    modalRoot.style.zIndex = '100';
    document.body.appendChild(modalRoot);

    const root = createRoot(modalRoot);

    const handleClose = () => {
        root.unmount();
        if (modalRoot.parentNode) {
            modalRoot.parentNode.removeChild(modalRoot);
        }
    };

    root.render(
        <ModalComponent
            open={true}
            onOpenChange={(open) => {
                if (!open) handleClose();
            }}
            htmlData={htmlData}
            flipbookId={flipbookId}
            currentCurrency={currentCurrency}
            container={fullscreenElement}
        />
    );
}