import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GetActivityLogFilterApi } from "@/service/activityLog.service";

export default function FilterActivity({ onFilterChange }) {
    const [fromDate, setFromDate] = useState(new Date("2025-04-16"))
    const [toDate, setToDate] = useState(new Date())
    const [activityOptions, setActivityOptions] = useState([])
    const [teammateOptions, setTeammateOptions] = useState([])
    const [selectedActivity, setSelectedActivity] = useState("all")
    const [selectedTeammate, setSelectedTeammate] = useState("all")

    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                const response = await GetActivityLogFilterApi();
                setActivityOptions(response.data.activity.map(activity => ({
                    value: activity,
                    label: activity
                })));
                setTeammateOptions(response.data.teammate.map(teammate => ({
                    value: teammate.id,
                    label: teammate.name
                })));
            } catch (error) {
                console.error("Error fetching filter data:", error);
            }
        };
        fetchFilterData();
    }, []);

    const formatDateDisplay = (date) => {
        if (!date) return "Pick a date"
        return format(date, "MMM d, yyyy")
    }

    const handleApplyFilter = () => {
        onFilterChange({
            activityType: selectedActivity,
            from: format(fromDate, "yyyy-MM-dd"),
            to: format(toDate, "yyyy-MM-dd"),
            userId: selectedTeammate,
            page: 1,
            perPage: 30
        });
    }

    return (
         <Card>
            <CardHeader>
                <CardTitle>User logs</CardTitle>
                <CardDescription>
                    You can select logs interval up to 90 days.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm mb-4">Filter by</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row md:flex-wrap gap-4 items-end">
                    <div className="space-y-1">
                        <p className="text-xs">From date</p>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full sm:w-[160px] justify-start text-left font-normal"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formatDateDisplay(fromDate)}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={fromDate}
                                    onSelect={setFromDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs">To date</p>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full sm:w-[160px] justify-start text-left font-normal"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
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
                    <div className="space-y-1">
                        <p className="text-xs">Activity</p>
                        <Select value={selectedActivity} onValueChange={setSelectedActivity}>
                            <SelectTrigger id="activity" className="w-full sm:w-[180px] md:w-[200px]">
                                <SelectValue placeholder="Select activity" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Activities</SelectItem>
                                {activityOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs">Teammates</p>
                        <Select value={selectedTeammate} onValueChange={setSelectedTeammate}>
                            <SelectTrigger id="teammates" className="w-full sm:w-[180px] md:w-[200px]">
                                <SelectValue placeholder="Select teammate" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Teammates</SelectItem>
                                {teammateOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="h-10" onClick={handleApplyFilter}>Apply</Button>
                    <Button variant="outline" className="h-10">Download CSV</Button>
                </div>
            </CardContent>
        </Card>
    )
}