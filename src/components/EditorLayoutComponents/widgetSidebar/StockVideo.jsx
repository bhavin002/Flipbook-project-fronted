
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function StockVideo() {
    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Label className="text-lg">Video Widget</Label>
            <div className="space-y-2">
                <div className="flex items-center gap-1">
                    <Checkbox
                        id="hide-background"
                        className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
                    />
                    <Label htmlFor="hide-background" className="text-sm font-medium leading-none">Individual Corners</Label>
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-1">
                    <Checkbox
                        id="show-controls"
                        className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
                    />
                    <Label htmlFor="show-controls" className="text-sm font-medium leading-none">Show controls</Label>
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-1">
                    <Checkbox
                        id="auto-play"
                        className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
                    />
                    <Label htmlFor="auto-play" className="text-sm font-medium leading-none">Autoplay</Label>
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-1">
                    <Checkbox
                        id="mute"
                        className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
                    />
                    <Label htmlFor="mute" className="text-sm font-medium leading-none">Mute</Label>
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-1">
                    <Checkbox
                        id="loop"
                        className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
                    />
                    <Label htmlFor="loop" className="text-sm font-medium leading-none">Loop</Label>
                </div>
            </div>
        </div>
    )
}