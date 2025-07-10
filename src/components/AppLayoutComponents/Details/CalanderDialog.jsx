import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Pencil } from "lucide-react";
import { UpdateFlipbookDetailsApi } from "@/service/flipbook.publish.service";
import { toast } from "sonner";
import LoadingButton from "@/utils/LoadingButton";

export function CalanderDialog({ flipbookId, publishedOn, setFlipbookDetails }) {
    const [date, setDate] = useState(publishedOn ? new Date(publishedOn) : new Date());
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleApply = async () => {
        if (!date) return;
        setLoading(true);
        try {
            const response = await UpdateFlipbookDetailsApi({
                flipbookId,
                publishedOn: date.toISOString().split("T")[0],
            });
            toast.success("Published date updated");
            setOpen(false);
            if (setFlipbookDetails) setFlipbookDetails(response.data);
        } catch (err) {
            toast.error("Failed to update published date", { description: err?.message || "Something went wrong." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md w-auto">
                <DialogHeader>
                    <DialogTitle className="sr-only">Title</DialogTitle>
                    <DialogDescription className="sr-only">
                        Description
                    </DialogDescription>
                </DialogHeader>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                />
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={handleApply} disabled={loading || !date}>
                        {loading ? <LoadingButton /> : "Apply"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}