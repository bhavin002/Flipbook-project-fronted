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
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getData } from "@/utils/datas";

export default function FilterActivity() {
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const activityOptions = getData("activityOptions")
    const teammateOptions = getData("teammateOptions")

    const formatDateDisplay = (date) => {
        if (!date) return "Pick a date"
        return format(date, "MMM d, yyyy")
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
                        <Select defaultValue="all-activities">
                            <SelectTrigger id="activity" className="w-full sm:w-[180px] md:w-[200px]">
                                <SelectValue placeholder="Select activity" />
                            </SelectTrigger>
                            <SelectContent>
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
                        <Select defaultValue="all-teammates">
                            <SelectTrigger id="teammates" className="w-full sm:w-[180px] md:w-[200px]">
                                <SelectValue placeholder="Select teammate" />
                            </SelectTrigger>
                            <SelectContent>
                                {teammateOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="h-10">Apply</Button>
                    <Button variant="outline" className="h-10">Download CSV</Button>
                </div>
            </CardContent>
        </Card>
    )
}