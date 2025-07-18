import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import LoadingButton from "@/utils/LoadingButton";
import { toast } from "sonner";
import { UpdateFlipbookApi } from "@/service/flipbook.service";

export default function RenameFlipbookDialog({ isRenameModalOpen, setIsRenameModalOpen, flipbook, setFlipbooks }) {
    const [flipbookName, setFlipbookName] = useState("");
    const [flipbookDescription, setFlipbookDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isRenameModalOpen && flipbook) {
            setFlipbookName(flipbook.name || "");
            setFlipbookDescription(flipbook.description || "");
        }
    }, [isRenameModalOpen, flipbook]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!flipbookName.trim()) {
            toast.error("Flipbook name required", {
                description: "Please enter a name for your flipbook"
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await UpdateFlipbookApi(flipbook._id, {
                name: flipbookName,
                description: flipbookDescription
            });
            toast.success("Flipbook renamed", {
                description: response.message || "Flipbook has been renamed successfully"
            });
            if (setFlipbooks) {
                setFlipbooks(prev => prev.map(f => f._id === response.data._id ? {
                    ...f,
                    name: response.data.name,
                    description: response.data.description
                } : f));
            }
            setIsRenameModalOpen(false);
        } catch (error) {
            toast.error("Failed to rename flipbook", {
                description: error.message || "Something went wrong"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setIsRenameModalOpen(false);
    };

    return (
        <Dialog open={isRenameModalOpen} onOpenChange={setIsRenameModalOpen}>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>RENAME FLIPBOOK</DialogTitle>
                    <DialogDescription>
                        Change the name and description of your flipbook
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">
                                Title <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="title"
                                value={flipbookName}
                                onChange={(e) => setFlipbookName(e.target.value)}
                                placeholder="Flipbook name"
                                autoFocus
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                value={flipbookDescription}
                                onChange={(e) => setFlipbookDescription(e.target.value)}
                                placeholder="Use a maximum of 256 characters"
                                className="resize-none"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading || !flipbookName.trim()}>
                            {isLoading ? <LoadingButton /> : 'Save'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}