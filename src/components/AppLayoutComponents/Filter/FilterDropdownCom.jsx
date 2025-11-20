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

export default function FilterDropdownCom({ label, options, selectedValues, onChange }){
    const displayText = selectedValues.length ? selectedValues.join(", ") : "All";
    return (
        <div>
            <Label className="text-right">
                {label}
            </Label>
            <div className="mt-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            <span className="truncate max-w-xs">{displayText}</span>
                            {selectedValues.length > 0 && (
                                <Badge variant="secondary" className="ml-2">{selectedValues.length}</Badge>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-full" style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}>
                        {options.map((option) => (
                            <DropdownMenuCheckboxItem
                                key={option.value}
                                checked={selectedValues.includes(option.label)}
                                value={option.value}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        onChange([...selectedValues, option.label]);
                                    } else {
                                        onChange(selectedValues.filter(item => item !== option.label));
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