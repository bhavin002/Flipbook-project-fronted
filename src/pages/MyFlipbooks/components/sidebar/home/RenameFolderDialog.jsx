

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

export default function RenameFolderDialog({ isRenameModalOpen, setIsRenameModalOpen }) {
    return (
        <Dialog open={isRenameModalOpen} onOpenChange={setIsRenameModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rename Folder</DialogTitle>
                </DialogHeader>
                <Input value="Folder 1" placeholder="Enter new folder name" />
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>OK</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}