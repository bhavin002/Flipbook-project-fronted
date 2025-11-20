import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function SessionConflictDialog({
    isOpen,
    onOpenChange,
    currentEditor,
    onBack,
    onTakeOver,
    isLoading = false
}) {
    const navigate = useNavigate()
    
    const handleOpenChange = (open) => {
        if (!open) {
            navigate('/myflipbooks/flipbooks')
        }
        onOpenChange?.(open)
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editing Session Conflict</DialogTitle>
                    <DialogDescription>
                        {currentEditor ? (
                            <>
                                <strong>{currentEditor}</strong> is currently working on this catalog. If you take over,
                                <strong> {currentEditor}</strong> will no longer be able to continue editing.
                            </>
                        ) : (
                            "This flipbook is already being edited in another session. Would you like to take over?"
                        )}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onBack}
                        disabled={isLoading}
                    >
                        Go Back
                    </Button>
                    <Button
                        onClick={onTakeOver}
                        disabled={isLoading}
                    >
                        {isLoading ? "Taking Over..." : "Take Over"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 