import { FilterSlider } from "@/components/ui/filterSlider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";

export default function OpenOverlay() {
    const [selectedPopin, setSelectedPopin] = useState("on-click");
    const [selectedPosition, setSelectedPosition] = useState("bottom");
    const [opacity, setOpacity] = useState(30);
    const tabs = [
        { value: "on-click", label: "On click" },
        { value: "on-hover", label: "On hover" },
    ];
    const positions = [
        { value: "top-left", label: "Top left" },
        { value: "top", label: "Top" },
        { value: "top-right", label: "Top right" },
        { value: "right", label: "Right" },
        { value: "bottom-right", label: "Bottom right" },
        { value: "bottom", label: "Bottom" },
        { value: "bottom-left", label: "Bottom left" },
        { value: "left", label: "Left" },
        { value: "auto", label: "Auto" },
    ];
    const [hoverColor, setHoverColor] = useState("#ffffff");
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const colorInputRef = useRef(null);

    const handleColorClick = () => {
        setIsColorPickerOpen(true);
        setTimeout(() => colorInputRef.current?.click(), 10);
    };
    const handleOpacityChange = (value) => {
        setOpacity(value);
    };

    return (
        <>
            <div>
                <Label className="text-xs">Open popin on</Label>
                <Select
                    defaultValue="on-click"
                    value={selectedPopin}
                    onValueChange={(value) => setSelectedPopin(value)}
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
            <div>
                <Label className="text-xs">Popin positioning</Label>
                <Select
                    defaultValue="on-click"
                    value={selectedPosition}
                    onValueChange={(value) => setSelectedPosition(value)}
                >
                    <SelectTrigger id="tab" className="w-full">
                        <SelectValue placeholder="Select tab" />
                    </SelectTrigger>
                    <SelectContent>
                        {positions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="open-overlay-tooltip" className="text-xs">Tooltip</Label>
                <Input
                    type="text"
                    id="open-overlay-tooltip"
                    defaultValue="On click"
                    className="placeholder:text-gray-400" />
            </div>
            <div>
                <Label htmlFor="open-overlay-title" className="text-xs">Title</Label>
                <Input
                    type="text"
                    id="open-overlay-title" />
            </div>
            <div>
                <Label htmlFor="open-overlay-description" className="text-xs">Description</Label>
                <Textarea
                    type="text"
                    id="open-overlay-description"
                    rows={4}
                    className="resize-none" />
            </div>
            <div>
                <Label className="text-xs">Hover color</Label>
                <div className="relative">
                    <Input
                        type="text"
                        value={hoverColor}
                        onChange={(e) => setHoverColor(e.target.value)}
                        className="pr-12"
                    />
                    <div
                        className={`absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded`}
                        style={{ backgroundColor: hoverColor }}
                        onClick={handleColorClick}
                    />
                    {isColorPickerOpen && (
                        <input
                            ref={colorInputRef}
                            type="color"
                            value={hoverColor}
                            onChange={(e) => setHoverColor(e.target.value)}
                            className="opacity-0 absolute w-1 h-1 right-3 top-1/2 -translate-y-1/2"
                        />
                    )}
                </div>
            </div>
            <div>
                <Label className="text-xs">Hover opacity</Label>
                <div className="py-2 px-1 flex gap-2 items-center">
                    <FilterSlider
                        min={0}
                        max={100}
                        value={[opacity]}
                        onValueChange={(values) => handleOpacityChange(values[0])}
                        className="w-full"
                    />
                    <div className="text-[12px]">{opacity}%</div>
                </div>
            </div>
        </>
    );
}