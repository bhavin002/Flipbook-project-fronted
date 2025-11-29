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
    const handleConfirm = (e) => {
        // Prevent event propagation
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        if (onConfirm) {
            onConfirm(e);
        } else {
            setIsConfirmModalOpen(false);
        }
    };

    const handleCancel = (e) => {
        // Prevent event propagation
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        if (onCancel) {
            onCancel(e);
        } else {
            setIsConfirmModalOpen(false);
        }
    };

    // Function to handle dialog close via the X button or clicking outside
    const handleOpenChange = (open,e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        if (!open && onCancel) {
            onCancel();
        } else {
            setIsConfirmModalOpen(open);
        }
    };

    return (
        <Dialog 
            open={isConfirmModalOpen} 
            onOpenChange={handleOpenChange}
            onClick={(e) => e.stopPropagation()} // Prevent clicks from reaching parent
        >
            <DialogContent 
                className="sm:max-w-[540px] w-[90vw]"
                onClick={(e) => e.stopPropagation()} // Prevent clicks from reaching parent
            >
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