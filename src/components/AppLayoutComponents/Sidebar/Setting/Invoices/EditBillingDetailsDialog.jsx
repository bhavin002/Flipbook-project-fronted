import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function EditBillingDetailsDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="mt-2">
                    Edit billing details
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Billing details</DialogTitle>
                    <DialogDescription >
                        Specify your company name, add a billing contact, or include other information on your invoices.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-2 mt-4">
                    <Label htmlFor="billing-details">
                        Billing details
                    </Label>
                    <Textarea
                        id="billing-details"
                        placeholder="Enter biling details"
                        className="resize-none"
                        rows={4}
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}