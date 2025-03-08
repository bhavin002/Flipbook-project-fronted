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
                <div
                    className="w-6 h-6 hover:bg-[#8e65ff] flex items-center justify-center rounded-sm"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <FolderPlus className="w-4 h-4" />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
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