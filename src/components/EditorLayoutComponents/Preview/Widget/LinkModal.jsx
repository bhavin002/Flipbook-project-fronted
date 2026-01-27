import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { getContrastTextColor } from '@/utils/colorUtils';

const LinkModal = ({ open, onOpenChange, htmlData, container, visibilitySettings }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[300px] z-[10000]" container={container}>
        <DialogHeader>
          <DialogTitle className="text-base text-gray-800">
            {htmlData?.text}
          </DialogTitle>
        </DialogHeader>
        {htmlData.url && <Button
          className="w-full"
          style={{
            backgroundColor: visibilitySettings?.playerAccentColorHash,
            color: getContrastTextColor(visibilitySettings?.playerAccentColorHash)
          }}
          onClick={() => {
            if (htmlData?.url) {
              let url = htmlData.url;
              if (!/^https?:\/\//i.test(url)) {
                url = 'https://' + url;
              }
              window.open(url, '_blank');
            }
            onOpenChange(false);
          }}
        >
          {htmlData?.buttonLabel}
        </Button>}
      </DialogContent>
    </Dialog>
  );
};

export default LinkModal;