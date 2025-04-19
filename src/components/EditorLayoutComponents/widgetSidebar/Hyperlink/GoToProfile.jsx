import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GoToProfile() {
    return (
        <div>
            <Label htmlFor="go-to-pofile-tooltip" className="text-xs">Tooltip</Label>
            <Input
                type="text"
                id="go-to-pofile-tooltip"
                placeholder="Go to profile"
                className="placeholder:text-[#d8dce3]" />
        </div>
    )
}