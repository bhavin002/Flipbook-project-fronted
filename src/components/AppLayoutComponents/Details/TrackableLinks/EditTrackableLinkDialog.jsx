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
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, Info, Pencil } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useState } from "react";
import { format } from "date-fns"


export default function EditTrackableLinkDialog() {
    const [toDate, setToDate] = useState(new Date())

    const formatDateDisplay = (date) => {
        if (!date) return "Pick a date"
        return format(date, "MMM d, yyyy")
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
            <Button variant="ghost" size="sm"><Pencil /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Edit trackable link</DialogTitle>
                    <DialogDescription className="sr-only">
                        Discription
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                        Name*
                    </Label>
                    <Input
                        id="name"
                        placeholder="e.g John"
                        defaultValue="John"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="link" className="text-sm font-medium">
                    Link*
                    </Label>
                    <Input
                        id="link"
                        placeholder="Use a maximum of 256 characters"
                        defaultValue="10d43b21-f9c0-4d4b-9d76-d3072c949e4f"
                    />
                    <p className="text-xs"> <span className="font-semibold">Preview: </span>https://flipdrag.com</p>
                </div>
                <div className="space-y-1">
                    <Label className="text-sm font-medium">
                        Link notifications
                    </Label>
                    <p className="text-sm text-gray-500">Receive an email notification when the publication is first opened or if it stays unopened until a set date.</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                        Send notifications to email*
                    </Label>
                    <Input
                        id="email"
                        placeholder="Email"
                        defaultValue="hopoleh620@oziere.com"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="first-open"
                        checked={true}
                    />
                    <Label htmlFor="first-open" className="text-sm font-medium leading-none">
                        First open
                    </Label>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-gray-500 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent
                                side="right"
                                align="center"
                                className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
                            >
                                <p className="text-sm">This option will become inactive in 30 days. If the link was not opened in 30 days, you can activate the option again.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="flex items-center flex-wrap max-md:space-y-2 space-x-2">
                    <Checkbox
                        id="open-by"
                        checked={true}
                    />
                    <Label htmlFor="open-by" className="text-sm font-medium leading-none">
                        If not open by :
                    </Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full sm:w-[160px] justify-start text-left font-normal"
                                )}
                            >
                                <CalendarIcon className="h-4 w-4" />
                                {formatDateDisplay(toDate)}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={toDate}
                                onSelect={setToDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}