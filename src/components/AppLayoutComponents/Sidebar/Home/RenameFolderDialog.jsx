import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RenameWorkspaceFolderApi } from "@/service/folder.service";
import { toast } from "sonner";
import LoadingButton from "@/utils/LoadingButton";

export default function RenameFolderDialog({
    isRenameModalOpen,
    setIsRenameModalOpen,
    folder,
    onFolderRenamed
}) {
    const [newFolderName, setNewFolderName] = useState(folder?.name || "");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isRenameModalOpen && folder) {
            setNewFolderName(folder.name || "");
        }
    }, [isRenameModalOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newFolderName.trim()) {
            toast.error("Please enter a folder name");
            return;
        }

        setIsLoading(true);
        try {
            const response = await RenameWorkspaceFolderApi(folder._id, { name: newFolderName });
            onFolderRenamed(response.data);
            toast.success("Folder update", {
                description: response.message
            })
            setIsRenameModalOpen(false);
        } catch (error) {
            toast.error("Failed to rename folder", {
                description: error.message || "Something went wrong",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isRenameModalOpen} onOpenChange={setIsRenameModalOpen}>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Rename Folder</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <Input
                            placeholder="Enter folder name"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsRenameModalOpen(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading || !newFolderName.trim()}>
                            {
                                isLoading ? <LoadingButton /> : `Rename`
                            }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}