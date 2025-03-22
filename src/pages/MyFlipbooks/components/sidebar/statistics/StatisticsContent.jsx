import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Info } from "lucide-react"
import { useState } from "react"
import { DateRangePickerModal } from "../../Filter/DateRangePickerModal"
import TopFlipbooks from "./TopFlipbooks"
import Summary from "./Summary"

export default function StatisticsContent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayValue, setDisplayValue] = useState({
        from: new Date(),
        to: new Date(),
    });

    const handleApplyDateRange = (dateRange) => {
        if (dateRange?.from && dateRange?.to) {
            setDisplayValue(dateRange);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="p-6 max-w-[100vw] overflow-auto space-y-4">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Workspace statistics</h1>
                <p className="text-gray-500">A performance overview for all your flipbooks, for a selected data range</p>
            </div>
            <div className="p-4 bg-[#fff4d7] text-sm flex items-center gap-2 rounded-lg flex-wrap">
                <p>Order emails received this month: <span className="font-semibold">0/1000.</span></p>
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
                            <p className="text-sm">Counter gets reset every month.</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <p>Exceeding the limit will result in an extra fee. </p>
            </div>
            <Button
                id="date"
                variant={"outline"}
                className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !displayValue && "text-muted-foreground"
                )}
                onClick={() => setIsModalOpen(true)}
            >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {displayValue?.from ? (
                    displayValue.to ? (
                        <>
                            {format(displayValue.from, "LLL dd, y")} -{" "}
                            {format(displayValue.to, "LLL dd, y")}
                        </>
                    ) : (
                        format(displayValue.from, "LLL dd, y")
                    )
                ) : (
                    <span>Pick a date</span>
                )}
            </Button>
            <DateRangePickerModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                value={displayValue}
                onApply={handleApplyDateRange}
            />
            <Summary />
            <TopFlipbooks/>
        </div>
    )
}