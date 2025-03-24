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

export function CalanderDialog() {
    const [date, setDate] = useState(new Date());

    return (
        <Dialog>
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
                    <Button variant="outline">
                        Cancel
                    </Button>
                    <Button>
                        Apply
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}