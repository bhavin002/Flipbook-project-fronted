import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getData } from "@/utils/datas";
import { useState, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function GoToPage() {
    const pageOption = getData("pageOption") || [];
    const [selectedAction, setSelectedAction] = useState("go-to-page");
    const [tooltipValue, setTooltipValue] = useState("");

    const tooltips = {
        "go-to-page": "Go to page",
        "go-to-next-page": "Go to next page",
        "go-to-previous-page": "Go to previous page",
        "go-to-first-page": "Go to first page",
        "go-to-last-page": "Go to last page"
    };

    useEffect(() => {
        setTooltipValue(tooltips[selectedAction] || "Go to page");
    }, [selectedAction]);

    const handleActionChange = (value) => {
        setSelectedAction(value);
    };

    const handleTooltipChange = (e) => {
        setTooltipValue(e.target.value);
    };

    return (
        <>
            <div>
                <Label className="text-xs">Option</Label>
                <Select
                    defaultValue="go-to-page"
                    value={selectedAction}
                    onValueChange={handleActionChange}
                >
                    <SelectTrigger id="action" className="w-full">
                        <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                        {pageOption.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="page-number" className="text-xs">Page number (1-1)</Label>
                <Input
                    type="number"
                    id="page-number"
                    defaultValue={1}
                    min={0}
                    className="placeholder:text-gray-400" />
            </div>
            <div>
                <Label htmlFor="go-to-page-tooltip" className="text-xs">Tooltip</Label>
                <Input
                    type="text"
                    id="go-to-page-tooltip"
                    value={tooltipValue}
                    onChange={handleTooltipChange}
                    placeholder="Enter tooltip text"
                    className="placeholder:text-gray-400" />
            </div>
        </>
    );
}