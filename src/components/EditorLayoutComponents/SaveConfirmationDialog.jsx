import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function SaveConfirmationDialog({
    isOpen,
    onOpenChange,
    onSave,
    onDiscard,
    isLoading
}) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Save Changes?</DialogTitle>
                    <DialogDescription>
                        <p>Do you want to save your latest changes before leaving?</p>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={onDiscard}
                        disabled={isLoading}
                    >
                        No
                    </Button>
                    <Button
                        onClick={onSave}
                        disabled={isLoading}
                    >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Yes
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}