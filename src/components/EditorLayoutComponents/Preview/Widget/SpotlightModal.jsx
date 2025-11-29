import React from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const getImageSizeClass = (size) => {
  switch (size) {
    case 'small':
      return 'max-h-[200px]';
    case 'medium':
      return 'max-h-[300px]';
    case 'large':
      return 'max-h-[calc(80vh-48px-20px)]';
    default:
      return 'max-h-[calc(80vh-48px-20px)]';
  }
};

const getImageFitClass = (properties) => {
  switch (properties) {
    case 'fit-to-frame':
      return 'object-contain';
    case 'scale-to-fill':
      return 'object-cover w-full h-full';
    default:
      return 'object-contain';
  }
};

const SpotlightModal = ({ open, onOpenChange, htmlData }) => {
  const imageSizeClass = getImageSizeClass(htmlData?.imageSize);
  const imageFitClass = getImageFitClass(htmlData?.imageProperties);
  const backgroundClass = htmlData?.showBackground 
    ? 'bg-white border border-gray-200 shadow-lg' 
    : 'bg-transparent shadow-none border-0 text-white';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`max-h-[80vh] max-w-[80vw] z-[100] overflow-hidden rounded-lg ${backgroundClass}`}>
        <div className="flex justify-center w-full p-2">
          <img 
            src={htmlData?.spotlightImage?.url} 
            alt={htmlData?.spotlightImage?.name || "spotlight image"} 
            className={`${imageSizeClass} ${imageFitClass} rounded-md`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpotlightModal;