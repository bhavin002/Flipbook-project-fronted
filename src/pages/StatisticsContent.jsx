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
import { useState, useEffect } from "react"
import { DateRangePickerModal } from "../components/AppLayoutComponents/Filter/DateRangePickerModal"
import TopFlipbooks from "../components/AppLayoutComponents/Sidebar/Statistics/TopFlipbooks"
import Summary from "../components/AppLayoutComponents/Sidebar/Statistics/Summary"
import { GetWorkspaceFlipbookStatisticsApi } from "@/service/flipbook.publish.service"
import DevicePieChart from "../components/AppLayoutComponents/Details/Statistics/DevicePieChart"
import CountryViewsTable from "../components/AppLayoutComponents/Details/Statistics/CountryViewsTable"
import FlipbookStatistics from "@/utils/FlipbookStatistics"

export default function StatisticsContent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);
    const [displayValue, setDisplayValue] = useState({
        from: oneMonthAgo,
        to: today,
    });
    const [stats, setStats] = useState(null);
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            setLoadingStats(true);
            try {
                const payload = {
                    startDate: displayValue.from ? format(displayValue.from, "yyyy-MM-dd") : undefined,
                    endDate: displayValue.to ? format(displayValue.to, "yyyy-MM-dd") : undefined,
                };
                const response = await GetWorkspaceFlipbookStatisticsApi(payload);
                setStats(response.data);
            } catch (e) {
                setStats(null);
            } finally {
                setLoadingStats(false);
            }
        }
        if (displayValue.from && displayValue.to) fetchStats();
    }, [displayValue]);

    const handleApplyDateRange = (dateRange) => {
        if (dateRange?.from && dateRange?.to) {
            setDisplayValue(dateRange);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="md:p-6 p-3 max-w-[100vw] overflow-auto space-y-4 pt-0">
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
            <Summary
                totalImpressions={stats?.totalImpressions || 0}
                totalViews={stats?.totalViews || 0}
                totalDownloads={stats?.totalDownloads || 0}
                loading={loadingStats}
            />
            <TopFlipbooks topFlipbooks={stats?.topFlipbooks || []} loading={loadingStats} />
            <div className="mt-8">
                <DevicePieChart deviceCounts={stats?.deviceCounts || {}} loading={loadingStats} />
            </div>
            <div className="mt-8">
                <CountryViewsTable countryViews={stats?.countryViews || []} loading={loadingStats} />
            </div>
            <div className="mt-8">
                <FlipbookStatistics statsData={stats?.dayWiseStats || []} dates={displayValue} loading={loadingStats} />
            </div>
        </div>
    )
}