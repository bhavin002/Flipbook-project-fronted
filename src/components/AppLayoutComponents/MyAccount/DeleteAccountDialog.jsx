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

export default function DeleteAccountDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="bg-red-600 text-white hover:bg-red-500 hover:text-white">Delete account</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Delete account</DialogTitle>
                    <DialogDescription className="space-y-4">
                    <p>Deleting your account will erase all your data and content forever. This includes flipbooks, statistics, teammates, settings, and more.</p> <br/>
                    Do you want to continue?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline">
                        Cancle
                    </Button>
                    <Button variant="ghost" className="bg-red-600 text-white hover:bg-red-500 hover:text-white">
                        Delete account
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}