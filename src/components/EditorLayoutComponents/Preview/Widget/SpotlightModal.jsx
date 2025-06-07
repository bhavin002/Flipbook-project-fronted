import React from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const getImageSizeClass = (size) => {
  switch (size) {
    case 'small':
      return 'max-w-[200px] max-h-[200px]';
    case 'medium':
      return 'max-w-[300px] max-h-[300px]';
    case 'large':
      return 'max-w-[500px] max-h-[500px]';
    default:
      return 'max-w-[500px] max-h-[500px]';
  }
};

const getImageFitClass = (properties) => {
  switch (properties) {
    case 'fit-to-frame':
      return 'object-contain';
    case 'scale-to-fill':
      return 'object-cover';
    default:
      return 'object-contain';
  }
};

const SpotlightModal = ({ open, onOpenChange, htmlData }) => {
  const imageSizeClass = getImageSizeClass(htmlData?.imageSize);
  const imageFitClass = getImageFitClass(htmlData?.imageProperties);
  const backgroundClass = htmlData?.showBackground ? 'bg-white' : 'bg-transparent shadow-none text-white border-0 overflow-hidden';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`max-h-[80vh] max-w-[80vw] z-[100] overflow-y-scroll ${backgroundClass}`}>
        <div className="flex justify-center w-full">
          <img 
            src={htmlData.spotlightImage.url} 
            alt={htmlData.spotlightImage.name || "spotlight image"} 
            className={`${imageSizeClass} ${imageFitClass} w-full h-full`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpotlightModal;