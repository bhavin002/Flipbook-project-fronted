import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Chart({ chart }) {
    return (
        <div>
            <Label className="text-xs">Tooltip</Label>
            <Input
                type="text"
                id="go-to-pofile-tooltip"
                placeholder={`${chart} chart`}
                className="placeholder:text-[#d8dce3]" />
        </div>
    )
}