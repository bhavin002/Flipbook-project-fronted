import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { CreateMediaFolderApi } from "@/service/mediaFolder.service";
import { useState } from "react";
import { toast } from "sonner";
import LoadingButton from "@/utils/LoadingButton";

export default function CreateMediaFolderDialog({
    isCreateFolderModalOpen,
    setIsCreateFolderModalOpen,
    scope,
    onFolderCreated = () => { }
}) {
    const [folderName, setFolderName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateFolder = async () => {
        if (!folderName.trim()) {
            toast.error("Please enter a folder name");
            return;
        }

        setIsLoading(true);
        try {
            const response = await CreateMediaFolderApi({
                name: folderName.trim(),
                scope: scope
            });

            toast.success("Folder created", {
                description: response.message
            });

            onFolderCreated(response.data);
            setFolderName("");
            setIsCreateFolderModalOpen(false);
        } catch (error) {
            toast.error("Folder creation failed", {
                description: error.message || "Oops! Something went wrong."
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setFolderName("");
        setIsCreateFolderModalOpen(false);
    };
    return (
        <Dialog open={isCreateFolderModalOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Create new folder</DialogTitle>
                    <DialogDescription className="sr-only">
                        Description
                    </DialogDescription>
                </DialogHeader>
                <Input
                    placeholder="Folder Name"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    autoFocus
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleCreateFolder();
                        }
                    }}
                />
                <DialogFooter className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreateFolder}
                        disabled={isLoading || !folderName.trim()}
                    >
                        {isLoading ? (
                            <LoadingButton />
                        ) : (
                            "Create Folder"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}