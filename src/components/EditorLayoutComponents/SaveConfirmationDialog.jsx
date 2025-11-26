import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/utils/LoadingButton";

export default function SaveConfirmationDialog({
    isOpen,
    onOpenChange,
    onSave,
    onCancel,
    isLoading = false
}) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Save Changes</DialogTitle>
                    <DialogDescription>
                        You have unsaved changes. Do you want to save your changes before leaving?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onSave}
                        disabled={isLoading}
                    >
                        {isLoading ? <LoadingButton buttonLabel="Saving..." /> : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}