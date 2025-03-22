import { useState } from "react";
import { DateRangePickerModal } from "../Filter/DateRangePickerModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import GenericSelection from "@/utils/GenericSelection";
import Summary from "../Sidebar/Statistics/Summary";
import FlipbookStatistics from "@/utils/FlipbookStatistics";
import FlipbookSummary from "./Statistics/FlipbookSummary";

export default function Statistics() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statisticsFilter, setStatisticsFilter] = useState([]);
    const [displayValue, setDisplayValue] = useState({
        from: new Date(),
        to: new Date(),
    });

    const options = [{
        name: "Trackable links",
        groups: [
            { value: 'bv', label: 'bv' },
            { value: 'sg', label: 'sg' },
            { value: 'up', label: 'up' }
        ]
    }]

    const handleApplyDateRange = (dateRange) => {
        if (dateRange?.from && dateRange?.to) {
            setDisplayValue(dateRange);
        }
        setIsModalOpen(false);
    };
    return (
        <div className="py-6 max-w-[100vw] overflow-auto space-y-4">
            <div className="p-4 md:p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-xl md:text-2xl font-bold mb-2">Statistics New flipbook</h1>
                <p className="text-sm md:text-base text-gray-500">Key performance indicators for your flipbook, for a selected date range</p>
            </div>
            <div className="flex gap-2">
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
                <GenericSelection
                    options={options}
                    selectedValues={statisticsFilter}
                    onChange={setStatisticsFilter}
                    allLabel="All statistics"
                />
            </div>
            <FlipbookSummary/>
            <DateRangePickerModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                value={displayValue}
                onApply={handleApplyDateRange}
            />

        </div>
    )
}