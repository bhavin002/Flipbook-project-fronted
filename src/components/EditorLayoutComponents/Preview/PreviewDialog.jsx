import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import FlipBook from "./Components/FlipBook"

export default function PreviewDialog({ flipbookId, open, onOpenChange }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-h-[90vh] max-w-[90vw] p-0" id="preview-dialog">
                <DialogHeader className="sr-only">
                    <DialogTitle>Preview</DialogTitle>
                    <DialogDescription>
                        Description
                    </DialogDescription>
                </DialogHeader>
                <FlipBook flipbookId={flipbookId} />
            </DialogContent>
        </Dialog>
    )
}