
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PageOptions({ action }) {
    const pageOptions = {
        "go-to-previous-page": "Go to previous page",
        "go-to-next-page": "Go to next page",
        "go-to-first-page": "Go to first page",
        "go-to-last-page": "Go to last page"
    }
    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Label className="text-lg">Page Options</Label>
            <div className="space-y-2">
                <div>
                    <Label htmlFor="page-options-tooltip" className="text-xs">Tooltip</Label>
                    <Input
                        type="text"
                        id="page-options-tooltip"
                        defaultValue={pageOptions[action]}
                        placeholder={pageOptions[action]}
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