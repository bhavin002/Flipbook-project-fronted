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

export default function SaveAsTemplateDialog({ isSaveAsTemplateModalOpen, setIsSaveAsTemplateModalOpen }) {
    return (
        <Dialog open={isSaveAsTemplateModalOpen} onOpenChange={setIsSaveAsTemplateModalOpen}>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>SAVE TEMPLATE</DialogTitle>
                    <DialogDescription>
                        You're about to create a template. All edits you make afterwards will be updated as part of the template.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">
                            Title <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="title"
                            value="New flipbook"
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
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline">
                        Close
                    </Button>
                    <Button>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}