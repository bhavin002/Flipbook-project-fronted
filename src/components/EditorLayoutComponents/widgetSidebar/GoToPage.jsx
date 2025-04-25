
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GoToPage() {
    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Label className="text-lg">Go To Page</Label>
            <div className="space-y-2">
                <div>
                    <Label htmlFor="page-number" className="text-xs">Page number (1-1)</Label>
                    <Input
                        type="number"
                        id="page-number"
                        defaultValue={1}
                        min={0}
                        className="placeholder:text-[#d8dce3]" />
                </div>
            </div>
            <div className="space-y-2">
                <div>
                    <Label htmlFor="go-to-page-tooltip" className="text-xs">Tooltip</Label>
                    <Input
                        type="text"
                        id="go-to-page-tooltip"
                        defaultValue="Go to page"
                        placeholder="Tooltip"
                        className="placeholder:text-[#d8dce3]" />
                </div>
            </div>
            <div>
                <Label htmlFor="corner-radius" className="text-xs">Corner roundness</Label>
                <Input
                    type="number"
                    id="corner-radius"
                    defaultValue={3}
                    min={0}
                    className="placeholder:text-[#d8dce3]" />
            </div>
        </div>
    )
}