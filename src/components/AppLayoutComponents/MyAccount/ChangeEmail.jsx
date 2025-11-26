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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ChangeEmail() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Change</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Change your email address</DialogTitle>
                    <DialogDescription className="sr-only">
                        Description
                    </DialogDescription>
                </DialogHeader>
                <Label>
                    Email
                </Label>
                <Input type="email" placeholder="Email" defaultValue="bhavin@flipdrag.com" />
                <DialogFooter>
                    <Button variant="outline">Cancle</Button>
                    <Button>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}