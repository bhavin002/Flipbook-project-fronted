import React from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const SpotlightModal = ({ open, onOpenChange, htmlData }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] max-w-[80vw] z-[100]">
        <div className="flex justify-center w-full">
          <img src={htmlData.spotlightImage.url} alt="placeholder" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpotlightModal;