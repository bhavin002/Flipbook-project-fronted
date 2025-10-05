import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import FlipbookSummary from "./Statistics/FlipbookSummary";
import { GetFlipbookStatisticsApi } from "@/service/flipbook.publish.service";
import FlipbookStatistics from "@/utils/FlipbookStatistics";
import CountryViewsTable from "./Statistics/CountryViewsTable";
import DevicePieChart from "./Statistics/DevicePieChart";
import { DateRangePickerModal } from "@/components/AppLayoutComponents/Filter/DateRangePickerModal";
import { useBookshelf } from "@/context/BookshelfContext";

export default function Statistics({ flipbookId }) {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayValue, setDisplayValue] = useState({
        from: oneMonthAgo,
        to: today,
    });
    const [stats, setStats] = useState(null);
    const [loadingStats, setLoadingStats] = useState(true);
    const { bookshelfSettings } = useBookshelf();


    useEffect(() => {
        async function fetchStats() {
            setLoadingStats(true);
            try {
                const payload = {
                    startDate: displayValue.from ? format(displayValue.from, "yyyy-MM-dd") : undefined,
                    endDate: displayValue.to ? format(displayValue.to, "yyyy-MM-dd") : undefined,
                };
                const response = await GetFlipbookStatisticsApi(flipbookId, payload);
                setStats(response.data);
            } catch (e) {
                setStats(null);
            } finally {
                setLoadingStats(false);
            }
        }
        if (flipbookId && displayValue.from && displayValue.to) fetchStats();
    }, [flipbookId, displayValue]);

    const handleApplyDateRange = (dateRange) => {
        if (dateRange?.from && dateRange?.to) {
            setDisplayValue(dateRange);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="py-6 max-w-[100vw] overflow-auto space-y-4">
            <div className="p-4 md:p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Statistics <span className="text-primary">{bookshelfSettings?.bookshelfName || "New Flipbook"}</span></h1>
                <p className="text-sm md:text-base text-gray-500">Key performance indicators for your flipbook, for a selected date range</p>
            </div>
            <div className="flex gap-2 flex-wrap">
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
            </div>
            <FlipbookSummary
                viewsCount={stats?.totalViews || 0}
                impressionCount={stats?.totalImpressions || 0}
                orderCount={stats?.orderCount || 0}
                orderValues={stats?.orderTotals || []}
                loadingStats={loadingStats}
            />
            <div className="mt-8">
                <DevicePieChart deviceCounts={stats?.deviceCounts || {}} loading={loadingStats} />
            </div>
            <div className="mt-8">
                <CountryViewsTable countryViews={stats?.countryViews || []} loading={loadingStats} />
            </div>
            <div className="mt-8">
                <FlipbookStatistics statsData={stats?.dayWiseStats || []} dates={displayValue} loading={loadingStats} />
            </div>
            <DateRangePickerModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                value={displayValue}
                onApply={handleApplyDateRange}
            />
        </div>
    )
}