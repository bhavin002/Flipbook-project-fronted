import { Button } from "@/components/ui/button"
import * as React from "react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"


export default function ReaderSelection({ options, selectedValues, onChange }) {
    const [open, setOpen] = useState(false);
    const [allSelected, setAllSelected] = useState(selectedValues.length === 0);

    useEffect(() => {
        if (selectedValues.length === 0 && !allSelected) {
            setAllSelected(true);
        }
    }, [selectedValues, allSelected]);

    const handleSelect = (e) => {
        e.preventDefault();
    };

    const handleAllChange = (checked) => {
        if (checked) {
            setAllSelected(true);
            onChange([]);
        } else {
            setAllSelected(false);
        }
    };

    const handleReaderChange = (option, checked) => {
        if (checked) {
            setAllSelected(false);
            onChange([...selectedValues, option.label]);
        } else {
            const newSelection = selectedValues.filter(item => item !== option.label);
            onChange(newSelection);
            if (newSelection.length === 0) {
                setAllSelected(true);
            }
        }
    };

    const displayContent = () => {
        if (allSelected) {
            return "All readers";
        }

        if (selectedValues.length <= 3) {
            return selectedValues.join(", ");
        }

        return (
            <div className="flex items-center space-x-2">
                <span className="truncate">{selectedValues.slice(0, 3).join(", ")}</span>
                <Badge variant="secondary">+{selectedValues.length - 3}</Badge>
            </div>
        );
    };

    return (
        <div className="space-y-3">
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                        <span className="truncate">{displayContent()}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="start"
                    className="w-full max-h-52 overflow-auto"
                    style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}
                    onCloseAutoFocus={(e) => e.preventDefault()}
                    onSelect={handleSelect}
                >
                    <div className="px-2 pt-1 pb-2 mb-1 border-b">
                        <DropdownMenuCheckboxItem
                            checked={allSelected}
                            onCheckedChange={handleAllChange}
                            onSelect={handleSelect}
                        >
                            All readers
                        </DropdownMenuCheckboxItem>
                    </div>
                    <div className="px-2 pt-1 pb-1">
                        <div className="text-sm font-medium mb-1">Specific readers</div>
                        {options.map((option) => (
                            <DropdownMenuCheckboxItem
                                key={option.value}
                                checked={selectedValues.includes(option.label)}
                                onCheckedChange={(checked) => handleReaderChange(option, checked)}
                                onSelect={handleSelect}
                            >
                                {option.label}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="notification"
                />
                <Label htmlFor="notification" className="text-sm font-medium leading-none">
                    Send a notification to selected readers
                </Label>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="track"
                />
                <Label htmlFor="track" className="text-sm font-medium leading-none">
                    Track each reader individually
                </Label>
            </div>
        </div>
    );
}