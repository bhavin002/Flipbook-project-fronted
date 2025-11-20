import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const PopupFrameModal = ({ open, onOpenChange, htmlData }) => {

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
      <DialogContent className="h-[60vh] max-w-[80vw] z-[100] overflow-y-scroll">
        <div className="flex justify-center w-full mt-4">
          {embedCode && (
            <div
              dangerouslySetInnerHTML={{ __html: embedCode }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopupFrameModal;