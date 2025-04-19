import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function PopupFrame() {
    return (
        <>
            <div>
                <Label htmlFor="popup-frame-tooltip" className="text-xs">Tooltip</Label>
                <Input
                    type="text"
                    id="popup-frame-tooltip"
                    placeholder="Popup frame"
                    className="placeholder:text-[#d8dce3]" />
            </div>
            <div>
                <Label htmlFor="popup-frame-code" className="text-xs">Popup frame code</Label>
                <Textarea
                    id="popup-frame-code"
                    placeholder="Embed code"
                    className="resize-none placeholder:text-[#d8dce3]"
                    rows={4}
                />
            </div>
            <a target="_blank" className="text-sm font-medium cursor-pointer hover:underline">Find out how it works</a>
        </>


    )
}