import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import * as React from "react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function CreatedByFilter({ label, options, selectedValues, onChange }){
    // Create display text using labels instead of values
    const getDisplayText = () => {
        if (selectedValues.length === 0) return "All";
        
        // Map selected values (IDs) back to their labels for display
        const selectedLabels = selectedValues
            .map(value => options.find(option => option.value === value)?.label)
            .filter(Boolean); // Remove any undefined values
        
        return selectedLabels.join(", ");
    };

    return (
        <div>
            <Label className="text-right">
                {label}
            </Label>
            <div className="mt-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            <span className="truncate max-w-xs">{getDisplayText()}</span>
                            {selectedValues.length > 0 && (
                                <Badge variant="secondary" className="ml-2">{selectedValues.length}</Badge>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-full" style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}>
                        {options.map((option) => (
                            <DropdownMenuCheckboxItem
                                key={option.value}
                                checked={selectedValues.includes(option.value)} // Check using value (ID)
                                value={option.value}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        onChange([...selectedValues, option.value]); // Store value (ID)
                                    } else {
                                        onChange(selectedValues.filter(item => item !== option.value)); // Filter by value (ID)
                                    }
                                }}
                            >
                                {option.label}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};