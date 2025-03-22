import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';

export default function DeleteTrackableLinkDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="hover:text-red-500" size="sm">
                    <Trash2 />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Delete trackable link</DialogTitle>
                    <DialogDescription>
                    Are you sure you want to delete this trackable link?
                    <br/>
                    The link won't work, but we'll keep its stats in the overall direct link statistics.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline">
                        No
                    </Button>
                    <Button>
                        Yes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}