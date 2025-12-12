import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const PopupFrameModal = ({ open, onOpenChange, htmlData, container }) => {

  const { embedCode } = htmlData;

  useEffect(() => {
    if (open && embedCode) {
      const script = document.createElement('script');
      script.src = "https://js.feedspace.io/v1/embed/embed.min.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [open, embedCode]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[60vh] max-w-[80vw] z-[10000] overflow-y-scroll" container={container}>
        <div className="flex justify-center w-full mt-4">
          {embedCode && (
            <div className='embed-code-1 flex justify-center items-center'
              style={{
                width: '100%',
                height: '100%',
              }}
              dangerouslySetInnerHTML={{ __html: embedCode }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopupFrameModal;