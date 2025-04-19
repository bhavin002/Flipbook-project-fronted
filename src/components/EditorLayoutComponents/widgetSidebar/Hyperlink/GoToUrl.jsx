import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react";

export default function GoToUrl() {
    const [selectedTab, setSelectedTab] = useState("new-tab");
    const tabs = [
        { value: "new-tab", label: "New tab" },
        { value: "same-tab", label: "Same tab" },
    ];
    return (
        <>
            <div>
                <Label htmlFor="url" className="text-xs">URL</Label>
                <Input
                    type="text"
                    id="url"
                    placeholder="Set your URL"
                    className="placeholder:text-[#d8dce3]" />
            </div>
            <div>
                <Label htmlFor="url" className="text-xs">Open in</Label>
                <Select
                    defaultValue="new-tab"
                    value={selectedTab}
                    onValueChange={(value) => setSelectedTab(value)}
                >
                    <SelectTrigger id="tab" className="w-full">
                        <SelectValue placeholder="Select tab" />
                    </SelectTrigger>
                    <SelectContent>
                        {tabs.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </>

    )
}