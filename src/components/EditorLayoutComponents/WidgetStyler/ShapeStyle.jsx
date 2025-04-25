import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";

export default function ShapeStyle() {
    const [shadowColor, setShadowColor] = useState("#ffffff");
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [isShadowEnabled, setIsShadowEnabled] = useState(true);
    const colorInputRef = useRef(null);

    const handleColorClick = () => {
        if (!isShadowEnabled) return;

        setIsColorPickerOpen(true);
        setTimeout(() => colorInputRef.current?.click(), 10);
    };

    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Label className="text-lg">Shape style</Label>
            <div>
                <Label className="text-xs">Corner roundness</Label>
                <Input
                    type="number"
                    defaultValue={0}
                    className="text-white"
                />
            </div>
            <div className="flex items-center gap-1">
                <Checkbox
                    id="shadow"
                    className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
                    checked={isShadowEnabled}
                    onCheckedChange={setIsShadowEnabled}
                />
                <Label htmlFor="shadow" className="text-sm font-medium leading-none">
                    Shadow
                </Label>
            </div>
            <div className="space-y-2">
                <div>
                    <Label className="text-xs">Color</Label>
                    <div className="relative">
                        <Input
                            type="text"
                            value={shadowColor}
                            onChange={(e) => setShadowColor(e.target.value)}
                            className="pr-12"
                            disabled={!isShadowEnabled}
                        />
                        <div
                            className={`absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded ${isShadowEnabled ? "cursor-pointer" : "cursor-not-allowed"}`}
                            style={{ backgroundColor: shadowColor }}
                            onClick={handleColorClick}
                        />
                        {isColorPickerOpen && isShadowEnabled && (
                            <input
                                ref={colorInputRef}
                                type="color"
                                value={shadowColor}
                                onChange={(e) => setShadowColor(e.target.value)}
                                className="opacity-0 absolute w-1 h-1 right-3 top-1/2 -translate-y-1/2"
                            />
                        )}
                    </div>
                </div>
                <div className="flex gap-4">
                    <div>
                        <Label className="text-xs">Opacity:</Label>
                        <Input
                            type="number"
                            defaultValue={60}
                            disabled={!isShadowEnabled}
                        />
                    </div>
                    <div>
                        <Label className="text-xs">X</Label>
                        <Input
                            type="number"
                            defaultValue={0}
                            disabled={!isShadowEnabled}
                        />
                    </div>
                    <div>
                        <Label className="text-xs">Y</Label>
                        <Input
                            type="number"
                            defaultValue={0}
                            disabled={!isShadowEnabled}
                        />
                    </div>
                </div>
                <div>
                    <Label className="text-xs">Blur:</Label>
                    <Input
                        type="number"
                        defaultValue={10}
                        className="w-24"
                        disabled={!isShadowEnabled}
                    />
                </div>
            </div>
        </div>
    )
}