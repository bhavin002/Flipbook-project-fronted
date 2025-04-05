import {
    Dialog,
    DialogContent,
    DialogDescription,
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
                    className="w-8 h-8 hover:bg-[#8e65ff] flex items-center justify-center rounded-sm cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <FolderPlus className="w-5 h-5" />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Create new folder</DialogTitle>
                    <DialogDescription className="sr-only">
                        Description
                    </DialogDescription>
                </DialogHeader>
                <Input placeholder="Folder Name" />
                <DialogFooter>
                    <Button>Create Folder</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}