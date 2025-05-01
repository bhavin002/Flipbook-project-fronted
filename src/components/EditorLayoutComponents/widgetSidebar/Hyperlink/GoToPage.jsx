import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { addIntercationDataToMainStage } from "@/utils/Helper";

export default function GoToPage({ mainStage, setMainStage, selectedShape, selectedIndex }) {
    const initialPageNumber = selectedShape[0]?.attrs?.htmlData?.pageNumber || 1;
    const maxPageNumber = mainStage.length;
    const [pageNumber, setPageNumber] = useState(initialPageNumber);
    const [previousPageNumber, setPreviousPageNumber] = useState(initialPageNumber);

    useEffect(() => {
        const newPageNumber = selectedShape[0]?.attrs?.htmlData?.pageNumber || 1;
        setPageNumber(newPageNumber);
        setPreviousPageNumber(newPageNumber);
    }, [selectedShape]);

    const updateMainStage = (value) => {
        const output = {
            data: {
                action: "go-to-page",
                pageNumber: value
            }
        };
        addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10) || 1;
        
        const validValue = Math.max(1, Math.min(value, maxPageNumber));
        
        setPageNumber(validValue);
        
        if (validValue !== previousPageNumber) {
            updateMainStage(validValue);
            setPreviousPageNumber(validValue);
        }
    };

    return (
        <div>
            <Label htmlFor="page-number" className="text-xs">Page number (1 - {maxPageNumber})</Label>
            <Input
                type="number"
                id="page-number"
                value={pageNumber}
                onChange={handleInputChange}
                min={1}
                max={maxPageNumber}
                className="placeholder:text-gray-400"
            />
        </div>
    );
}