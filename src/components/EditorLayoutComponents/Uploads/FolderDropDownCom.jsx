import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Users, FolderOpen, PencilLine, Trash2 } from 'lucide-react';
import RenameMediaFolderDialog from "./RenameMediaFolderDialog";
import { CopyToWorkspaceApi, DeleteMediaFolderApi } from "@/service/mediaFolder.service";
import { toast } from "sonner";
import ConfirmationDialog from "@/utils/ConfirmationDialog";

export default function FolderDropDownCom({ onOpenChange, folder, onFolderRenamed, onFolderDeleted, onFolderOpen }) {
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRenameClick = (e) => {
    e.stopPropagation();
    setIsRenameModalOpen(true);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const handleOpenClick = (e) => {
    e.stopPropagation();
    if (onFolderOpen && folder) {
      onFolderOpen(folder);
    }
  };

  const handleCopyToTeam = async (e) => {
    e.stopPropagation();
    try {
      await CopyToWorkspaceApi(folder._id);
      toast.success("Folder copied to team", {
        description: "Folder successfully copied to team"
      });
    } catch (error) {
      toast.error("Failed to copy folder", {
        description: error.message || "Something went wrong"
      });
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const response = await DeleteMediaFolderApi(folder._id);
      toast.success("Folder deleted", {
        description: response.message || "Folder successfully deleted"
      });
      if (onFolderDeleted) {
        onFolderDeleted(folder._id);
      }
    } catch (error) {
      toast.error("Failed to delete folder", {
        description: error.message || "Something went wrong"
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  const handleTriggerClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <DropdownMenu onOpenChange={onOpenChange}>
        <DropdownMenuTrigger asChild>
          <div className="hover:bg-sidebar p-1 rounded-md" onClick={handleTriggerClick}>
            <EllipsisVertical className="w-4 h-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" onClick={(e) => e.stopPropagation()}>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleCopyToTeam}>
              <Users className="mr-2 h-4 w-4" />
              <span>Copy to my team</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleOpenClick}>
              <FolderOpen className="mr-2 h-4 w-4" />
              <span>Open</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleRenameClick}>
              <PencilLine className="mr-2 h-4 w-4" />
              <span>Rename</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteClick}>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <RenameMediaFolderDialog
        isRenameModalOpen={isRenameModalOpen}
        setIsRenameModalOpen={setIsRenameModalOpen}
        folder={folder}
        onFolderRenamed={onFolderRenamed}
        onClose={(e) => {
          e?.stopPropagation?.();
          setIsRenameModalOpen(false);
        }}
      />

      <ConfirmationDialog
        isConfirmModalOpen={isDeleteModalOpen}
        setIsConfirmModalOpen={setIsDeleteModalOpen}
        title="Delete Folder"
        description={`Are you sure you want to delete the folder "${folder?.name}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </>
  );
}