import { useState } from "react";
import { DateRangePickerModal } from "../Filter/DateRangePickerModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import GenericSelection from "@/utils/GenericSelection";
import FlipbookSummary from "./Statistics/FlipbookSummary";
import OrdersTable from "./Statistics/OrdersTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Quiz from "./Statistics/Quiz";
import Question from "./Statistics/Question";
import ContactForm from "./Statistics/ContactForm";

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
    }];

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
                <GenericSelection
                    options={options}
                    selectedValues={statisticsFilter}
                    onChange={setStatisticsFilter}
                    allLabel="All statistics"
                />
            </div>
            <FlipbookSummary />
            <OrdersTable />
            <Card>
                <CardHeader>
                    <CardTitle>Form responses</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="quiz" className="flex flex-col h-full">
                        <TabsList className="overflow-x-auto max-md:w-full w-fit justify-start overflow-y-hidden">
                            <TabsTrigger value="quiz">
                                Quiz
                            </TabsTrigger>
                            <TabsTrigger value="question">
                                Question
                            </TabsTrigger>
                            <TabsTrigger value="contact-form">
                                Contact form
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="quiz" className="h-full mt-4">
                            <Quiz />
                        </TabsContent>
                        <TabsContent value="question" className="h-full mt-4">
                            <Question />
                        </TabsContent>
                        <TabsContent value="contact-form" className="h-full mt-4">
                            <ContactForm />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
            <DateRangePickerModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                value={displayValue}
                onApply={handleApplyDateRange}
            />
        </div>
    )
}