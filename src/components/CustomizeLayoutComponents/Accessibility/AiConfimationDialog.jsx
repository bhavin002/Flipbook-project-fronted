import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

export default function AiConfimationDialog({ 
    isConfirmModalOpen, 
    setIsConfirmModalOpen, 
    title = "Confirm Action", 
    description = "Are you sure you want to proceed with this action?",
    primaryButton = "Yes",
    secondaryButton = "No",
}) {
    return (
        <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline">
                        {secondaryButton}
                    </Button>
                    <Button>
                        {primaryButton}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}