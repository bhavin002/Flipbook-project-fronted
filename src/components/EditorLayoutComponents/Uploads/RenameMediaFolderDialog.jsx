import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { RenameMediaFolderApi } from "@/service/mediaFolder.service";

export default function RenameMediaFolderDialog({ 
  isRenameModalOpen, 
  setIsRenameModalOpen, 
  folder, 
  onFolderRenamed,
  onClose 
}) {
  const [newFolderName, setNewFolderName] = useState(folder?.name || "");
  const [isRenaming, setIsRenaming] = useState(false);

  const handleRename = async (e) => {
    e?.stopPropagation?.();
    
    if (!newFolderName.trim()) {
      toast.error("Folder name cannot be empty");
      return;
    }

    setIsRenaming(true);
    try {
      const response = await RenameMediaFolderApi(folder._id, { name: newFolderName });
      
      toast.success("Folder renamed", {
        description: response.message || "Folder successfully renamed"
      });
      
      if (onFolderRenamed) {
        onFolderRenamed({
          ...folder,
          name: newFolderName
        });
      }
      
      handleClose(e);
    } catch (error) {
      toast.error("Failed to rename folder", {
        description: error.message || "Something went wrong"
      });
    } finally {
      setIsRenaming(false);
    }
  };

  const handleClose = (e) => {
    e?.stopPropagation?.();
    setIsRenameModalOpen(false);
    if (onClose) onClose(e);
  };

  return (
    <Dialog 
      open={isRenameModalOpen} 
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <DialogContent className="sm:max-w-[540px] w-[90vw]" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Rename Folder</DialogTitle>
          <DialogDescription>
            Enter a new name for your folder.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            className="col-span-3"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleClose}
            disabled={isRenaming}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleRename}
            disabled={isRenaming}
          >
            {isRenaming ? "Renaming..." : "Rename"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}