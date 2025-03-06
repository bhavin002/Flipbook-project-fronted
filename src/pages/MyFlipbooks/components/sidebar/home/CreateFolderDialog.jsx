import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { FolderPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function CreateFolderDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <FolderPlus className="w-4 h-4" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create new folder</DialogTitle>
                </DialogHeader>
                <Input placeholder="Folder Name" />
                <DialogFooter>
                    <Button type="submit">Create Folder</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}