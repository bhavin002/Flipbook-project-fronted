
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function VideoWidget() {
    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Label className="text-lg">Video Widget</Label>
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
                    <Label htmlFor="video-tooltip" className="text-xs">Tooltip</Label>
                    <Input
                        type="text"
                        id="video-tooltip"
                        defaultValue="Video widget"
                        placeholder="Video Widget"
                        className="placeholder:text-[#d8dce3]" />
                </div>
            </div>
        </div>
    )
}