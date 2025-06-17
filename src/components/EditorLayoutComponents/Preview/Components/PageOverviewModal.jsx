import React from 'react';
import { Dialog, DialogContent} from '@/components/ui/dialog';

const PageOverviewModal = ({ isOpen, onClose }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <h1>Page Overview Modal</h1>
            </DialogContent>
        </Dialog>
    );
};

export default PageOverviewModal;