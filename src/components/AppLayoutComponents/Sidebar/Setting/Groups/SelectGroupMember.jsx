import { Button } from "@/components/ui/button"
import * as React from "react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useState, useRef } from "react"
import { Search, X } from "lucide-react"

export default function SelectGroupMember({ options, selectedValues, onChange }) {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef(null);

    const handleSelect = (e) => {
        e.preventDefault();
    };

    const handleReaderChange = (option, checked) => {
        if (checked) {
            onChange([...selectedValues, option.value]);
        } else {
            const newSelection = selectedValues.filter(item => item !== option.value);
            onChange(newSelection);
        }
    };

    const clearSelection = (e) => {
        e.stopPropagation();
        e.preventDefault();
        onChange([]);
    };

    const displayContent = () => {
        if (selectedValues.length === 0) {
            return "Select readers";
        }
        
        // Get display names for selected readers
        const selectedLabels = selectedValues.map(value => {
            const option = options.find(opt => opt.value === value);
            return option ? option.label : value;
        });
        
        if (selectedLabels.length <= 3) {
            return selectedLabels.join(", ");
        }
        return (
            <div className="flex items-center space-x-2">
                <span className="truncate">{selectedLabels.slice(0, 3).join(", ")}</span>
                <Badge variant="secondary">+{selectedLabels.length - 3}</Badge>
            </div>
        );
    };

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenChange = (isOpen) => {
        setOpen(isOpen);
        if (isOpen && searchInputRef.current) {
            setTimeout(() => searchInputRef.current.focus(), 0);
        }
    };

    return (
        <div className="space-y-3">
            <DropdownMenu open={open} onOpenChange={handleOpenChange}>
                <div className="relative">
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            <span className="truncate">{displayContent()}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    
                    {selectedValues.length > 0 && (
                        <div 
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            onClick={clearSelection}
                        >
                            <X className="h-4 w-4 opacity-70 hover:opacity-100" />
                        </div>
                    )}
                </div>
                <DropdownMenuContent
                    align="start"
                    className="w-full p-0"
                    style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}
                    onCloseAutoFocus={(e) => e.preventDefault()}
                    onSelect={handleSelect}
                >
                    <div className="flex items-center border-b p-2">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <input
                            ref={searchInputRef}
                            className="flex h-8 w-full rounded-md bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Search readers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                    </div>
                    
                    <div className="max-h-52 overflow-auto py-1">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <DropdownMenuCheckboxItem
                                    key={option.value}
                                    checked={selectedValues.includes(option.value)}
                                    onCheckedChange={(checked) => handleReaderChange(option, checked)}
                                    onSelect={handleSelect}
                                >
                                    {option.label}
                                </DropdownMenuCheckboxItem>
                            ))
                        ) : (
                            <div className="text-center py-2 text-sm text-muted-foreground">
                                No readers found
                            </div>
                        )}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}