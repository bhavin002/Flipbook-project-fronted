import * as React from "react"
import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePickerModal } from "./DateRangePickerModal";
import { format } from "date-fns";

export default function FilterSelectCom({ label, options, value, onChange, placeholder }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayValue, setDisplayValue] = useState(value);

    const handleValueChange = (newValue) => {
        if (newValue === "custom") {
            setIsModalOpen(true);
        } else {
            setDisplayValue(newValue);
            onChange(newValue);
        }
    };

    const handleApplyDateRange = (dateRange) => {
        if (dateRange?.from && dateRange?.to) {
            const formattedValue = `${format(dateRange.from, "yyyy-MM-dd")} - ${format(dateRange.to, "yyyy-MM-dd")}`;
            setDisplayValue(formattedValue);
            onChange(formattedValue);
        }
        setIsModalOpen(false);
    };

    useEffect(() => {
        setDisplayValue(value);
    }, [value]);

    return (
        <div>
            <Label className="text-right">
                {label}
            </Label>
            <div className="mt-3">
                <Select value={displayValue} onValueChange={handleValueChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={placeholder || "Select an option"} />
                    </SelectTrigger>
                    <SelectContent className="w-full" style={{ width: "var(--radix-select-trigger-width)" }}>
                        <SelectGroup>
                            {options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                        {displayValue && !options.find(opt => opt.value === displayValue) && (
                            <SelectItem value={displayValue} disabled>
                                {displayValue}
                            </SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>
            <DateRangePickerModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                value={undefined}
                onApply={handleApplyDateRange}
            />
        </div>
    );
};