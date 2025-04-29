import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import LoadingButton from "./LoadingButton";

export default function ConfirmationDialog({
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    title = "Confirm Action",
    description = "Are you sure you want to proceed with this action?",
    onConfirm,
    onCancel,
    isLoading = false
}) {
    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        } else {
            setIsConfirmModalOpen(false);
        }
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            setIsConfirmModalOpen(false);
        }
    };

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
                    <Button
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isLoading}
                    >
                        No
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={isLoading}
                    >
                        {
                            isLoading ? <LoadingButton /> : "Yes"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}