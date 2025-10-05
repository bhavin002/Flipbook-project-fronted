import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

const OverlayModal = ({ open, onOpenChange, htmlData }) => {
  const { title, description } = htmlData || {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[420px]">
        <DialogHeader>
          {title && (
            <DialogTitle
              className="text-base"
            >
              {title}
            </DialogTitle>
          )}
          {description && (
            <DialogDescription className="mt-2 text-sm text-gray-600">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="default"
            className="bg-black text-white hover:bg-gray-700"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OverlayModal; 