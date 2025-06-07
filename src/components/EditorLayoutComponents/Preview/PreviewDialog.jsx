import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import FlipBookPreview from "./Components/FlipBookPreview"

export default function PreviewDialog({ flipbookId, open, onOpenChange }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange} className="">
            <DialogContent className="min-h-[90vh] max-w-[90vw] p-0 overflow-hidden">
                <DialogHeader className="sr-only">
                    <DialogTitle>Preview</DialogTitle>
                    <DialogDescription>
                        Description
                    </DialogDescription>
                </DialogHeader>
                <FlipBookPreview flipbookId={flipbookId} />
            </DialogContent>
        </Dialog>
    )
}