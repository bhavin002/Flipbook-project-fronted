
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react";

export default function Video() {
    const [selectedOption, setSelectedOption] = useState("853-480");
    const options = [
        { value: "560-315", label: "560 x 315" },
        { value: "640-360", label: "640 x 360" },
        { value: "853-480", label: "853 x 480" },
        { value: "1280-720", label: "1280 x 720" },
        { value: "full-screen", label: "Open in full screen" },
    ];
    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Label className="text-lg">Video</Label>
            <div className="space-y-2">
                <div>
                    <Label htmlFor="video-url" className="text-xs">URL</Label>
                    <Input
                        type="text"
                        id="video-url"
                        placeholder="YouTube / Vimeo URL / Your own URL"
                        className="placeholder:text-[#d8dce3]" />
                </div>
                <div>
                    <Label htmlFor="url" className="text-xs">size</Label>
                    <Select
                        value={selectedOption}
                        onValueChange={(value) => setSelectedOption(value)}
                    >
                        <SelectTrigger id="tab" className="w-full">
                            <SelectValue placeholder="Select tab" />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="video-tooltip" className="text-xs">Tooltip</Label>
                    <Input
                        type="text"
                        id="video-tooltip"
                        defaultValue="Video"
                        placeholder="Video"
                        className="placeholder:text-[#d8dce3]" />
                </div>
            </div>
        </div>
    )
}