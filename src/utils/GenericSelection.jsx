import { Button } from "@/components/ui/button"
import * as React from "react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect, useRef } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ListFilter, Search, X } from "lucide-react"

export default function GenericSelection({
    options,
    selectedValues,
    onChange,
    allLabel = "All items",
    searchPlaceholder = "Search...",
    checkboxes = [],
    defaultAllSelected = true
}) {
    const [open, setOpen] = useState(false);
    // Initialize allSelected based on whether selectedValues is empty
    const [allSelected, setAllSelected] = useState(defaultAllSelected && selectedValues.length === 0);
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef(null);

    // Update allSelected when selectedValues changes
    useEffect(() => {
        if (selectedValues.length === 0 && defaultAllSelected) {
            setAllSelected(true);
        } else if (selectedValues.length > 0) {
            setAllSelected(false);
        }
    }, [selectedValues, defaultAllSelected]);

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

    const handleItemChange = (option, checked) => {
        if (checked) {
            setAllSelected(false);
            onChange([...selectedValues, option.label]);
        } else {
            const newSelection = selectedValues.filter(item => item !== option.label);
            onChange(newSelection);
            if (newSelection.length === 0 && defaultAllSelected) {
                setAllSelected(true);
            }
        }
    };

    const clearSelection = (e) => {
        e.stopPropagation();
        e.preventDefault();
        onChange([]);
        if (defaultAllSelected) {
            setAllSelected(true);
        }
    };

    const displayContent = () => {
        if (allSelected || selectedValues.length === 0) {
            return allLabel;
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

    const handleOpenChange = (isOpen) => {
        setOpen(isOpen);
        if (isOpen && searchInputRef.current) {
            setTimeout(() => searchInputRef.current.focus(), 0);
        }
    };

    const filteredCategories = options.map(category => {
        const categoryKey = Object.keys(category).find(key => key !== 'name') || 'items';
        const items = category[categoryKey] || [];

        return {
            ...category,
            [categoryKey]: items.filter(item =>
                item.label.toLowerCase().includes(searchQuery.toLowerCase())
            )
        };
    }).filter(category => {
        const categoryKey = Object.keys(category).find(key => key !== 'name') || 'items';
        return category[categoryKey].length > 0;
    });

    return (
        <div className="space-y-3">
            <DropdownMenu open={open} onOpenChange={handleOpenChange}>
                <div className="relative">
                    <DropdownMenuTrigger className="min-w-[10rem]" asChild>
                        <Button variant="outline" className="w-full justify-between">
                            <span className="truncate">{displayContent()}</span>
                            <ListFilter />
                        </Button>
                    </DropdownMenuTrigger>

                    {selectedValues.length > 0 && (
                        <div
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
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
                            placeholder={searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                    </div>

                    <div className="max-h-52 overflow-auto">
                        {(searchQuery === "" && defaultAllSelected) && (
                            <div className="px-2 pt-1 pb-2 mb-1 border-b">
                                <DropdownMenuCheckboxItem
                                    checked={allSelected}
                                    onCheckedChange={handleAllChange}
                                    onSelect={handleSelect}
                                >
                                    {allLabel}
                                </DropdownMenuCheckboxItem>
                            </div>
                        )}

                        {filteredCategories.map((category, categoryIndex) => {
                            const categoryKey = Object.keys(category).find(key => key !== 'name') || 'items';
                            const items = category[categoryKey] || [];

                            if (items.length === 0) return null;

                            return (
                                <div
                                    key={category.name || categoryIndex}
                                    className={`px-2 pt-1 pb-1 ${categoryIndex < filteredCategories.length - 1 ? 'mb-1 border-b' : ''}`}
                                >
                                    {category.name && (
                                        <div className="text-sm font-medium mb-1">{category.name}</div>
                                    )}
                                    {items.map((item) => (
                                        <DropdownMenuCheckboxItem
                                            key={item.value}
                                            checked={selectedValues.includes(item.label)}
                                            onCheckedChange={(checked) => handleItemChange(item, checked)}
                                            onSelect={handleSelect}
                                        >
                                            {item.label}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </div>
                            );
                        })}

                        {searchQuery !== "" && filteredCategories.length === 0 && (
                            <div className="text-center py-2 text-sm text-muted-foreground">
                                No items found
                            </div>
                        )}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>

            {checkboxes.map((checkbox, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                        id={checkbox.id}
                        checked={checkbox.checked}
                        onCheckedChange={checkbox.onChange}
                    />
                    <Label htmlFor={checkbox.id} className="text-sm font-medium leading-none">
                        {checkbox.label}
                    </Label>
                </div>
            ))}
        </div>
    );
}