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
import SelectRole from "./SelectRole";

export default function InviteTeammateDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Add teammate
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Add user</DialogTitle>
                    <DialogDescription className="sr-only">
                        Description
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="Email"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role" className="text-sm font-medium">
                            Select a role
                        </Label>
                        <SelectRole />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>
                        Send invite
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}