import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

const LinkModal = ({ open, onOpenChange, htmlData}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[300px]">
        <DialogHeader>
          <DialogTitle className="text-base text-gray-800">
            {htmlData?.text}
          </DialogTitle>
        </DialogHeader>
        <Button
          className="bg-black text-white hover:bg-gray-700"
          onClick={() => {
            if (htmlData?.url) {
              window.open(htmlData.url, '_blank');
            }
            onOpenChange(false);
          }}
        >
          {htmlData?.buttonLabel}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LinkModal;