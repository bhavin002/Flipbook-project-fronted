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

export default function GoToPage({
    selectedShape,
    setMainStage,
    mainStage,
    selectedIndex,
}) {
    const pageOption = getData("pageOption") || [];
    const [pageAction, setPageAction] = useState("go-to-page");
    const [tooltipValue, setTooltipValue] = useState("");
    const maxPageNumber = mainStage.length;
    const [pageNumber, setPageNumber] = useState(
        selectedShape?.[0]?.attrs?.htmlData?.pageNumber || 1
    );

    const tooltips = {
        "go-to-page": "Go to page",
        "go-to-next-page": "Go to next page",
        "go-to-previous-page": "Go to previous page",
        "go-to-first-page": "Go to first page",
        "go-to-last-page": "Go to last page"
    };

    useEffect(() => {
        const pageAction = selectedShape?.[0]?.attrs?.htmlData?.pageAction || "go-to-page";
        const currentTooltip = selectedShape?.[0]?.attrs?.htmlData?.tooltip;
        const currentPageNumber = selectedShape?.[0]?.attrs?.htmlData?.pageNumber || 1;
        setPageAction(pageAction);
        setTooltipValue(currentTooltip ?? (tooltips[pageAction] || "Go to page"));
        setPageNumber(Math.min(Math.max(currentPageNumber, 1), maxPageNumber));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedShape]);

    useEffect(() => {
        // keep pageNumber within bounds if max pages changes
        setPageNumber(prev => Math.min(Math.max(prev, 1), maxPageNumber));
    }, [maxPageNumber]);

    const updateGoToPageInMainStage = (actionValue, pageNumberValue, tooltipValue) => {
        if (!selectedShape.length || !mainStage[selectedIndex]?.shapes) return;

        const updatedMainStage = [...mainStage];
        updatedMainStage[selectedIndex].shapes = mainStage[selectedIndex].shapes.map(element => {
            const matchingShape = selectedShape.find(selShape => selShape.attrs.id === element.id);
            if (matchingShape) {
                return {
                    ...element,
                    htmlData: {
                        ...element.htmlData,
                        action: actionValue,
                        pageNumber: pageNumberValue,
                        tooltip: tooltipValue
                    }
                };
            }
            return element;
        });

        setMainStage(updatedMainStage);
    };

    const handleActionChange = (value) => {
        setPageAction(value);
        const nextTooltip = tooltips[value] || "Go to page";
        setTooltipValue(nextTooltip);
        updateGoToPageInMainStage(value, pageNumber, nextTooltip);
    };

    const handlePageNumberChange = (e) => {
        const val = parseInt(e.target.value, 10);
        if (isNaN(val)) return;
        const clamped = Math.min(Math.max(val, 1), maxPageNumber);
        setPageNumber(clamped);
        updateGoToPageInMainStage(pageAction, clamped, tooltipValue);
    };

    const handleTooltipChange = (e) => {
        const val = e.target.value;
        setTooltipValue(val);
        updateGoToPageInMainStage(pageAction, pageNumber, val);
    };

    return (
        <>
            <div>
                <Label className="text-xs">Option</Label>
                <Select
                    defaultValue="go-to-page"
                    value={pageAction}
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
                <Label htmlFor="page-number" className="text-xs">Page number (1 - {maxPageNumber})</Label>
                <Input
                    type="number"
                    id="page-number"
                    value={pageNumber}
                    onChange={handlePageNumberChange}
                    min={1}
                    max={maxPageNumber}
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