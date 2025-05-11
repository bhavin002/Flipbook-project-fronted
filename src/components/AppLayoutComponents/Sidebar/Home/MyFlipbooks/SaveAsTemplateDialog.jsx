import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import LoadingButton from "@/utils/LoadingButton";
import { SaveFlipbookAsTemplateApi } from "@/service/flipbook.service";
import { toast } from "sonner";

export default function SaveAsTemplateDialog({ isSaveAsTemplateModalOpen, setIsSaveAsTemplateModalOpen, flipbook }) {
    const [newFlipbookName, setNewFlipbookName] = useState(flipbook?.name || "");
    const [newFlipbookDescription, setNewFlipbookDescription] = useState(flipbook?.description || "");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isSaveAsTemplateModalOpen && flipbook) {
            setNewFlipbookName(flipbook.name || "");
            setNewFlipbookDescription(flipbook.description || "");
        }
    }, [isSaveAsTemplateModalOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newFlipbookName.trim()) {
            toast.error("Template name", {
                description: "Please enter a template name"
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await SaveFlipbookAsTemplateApi(flipbook._id, newFlipbookName, newFlipbookDescription);
            toast.success("Flipbook saved as template", {
                description: response.message
            })
            setIsSaveAsTemplateModalOpen(false);
        } catch (error) {
            toast.error("Failed to save flipbook as template", {
                description: error.message || "Something went wrong",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isSaveAsTemplateModalOpen} onOpenChange={setIsSaveAsTemplateModalOpen}>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>SAVE TEMPLATE</DialogTitle>
                    <DialogDescription>
                        You're about to create a template. All edits you make afterwards will be updated as part of the template.
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
                                value={newFlipbookName}
                                onChange={(e) => setNewFlipbookName(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="Use a maximum of 256 character"
                                className="resize-none"
                                onChange={(e) => setNewFlipbookDescription(e.target.value)}
                                value={newFlipbookDescription}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsSaveAsTemplateModalOpen(false)}
                            disabled={isLoading}>
                            Close
                        </Button>
                        <Button type="submit" disabled={isLoading || !newFlipbookName.trim()}>
                            {
                                isLoading ? <LoadingButton /> : `Save`
                            }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}