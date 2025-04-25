import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Tag() {
    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Label className="text-lg">Tag</Label>
            <div className="space-y-2">
                <div>
                    <Label htmlFor="tag-text" className="text-xs">Text</Label>
                    <Input
                        type="text"
                        id="tag-text"
                        placeholder="Set your text"
                        className="placeholder:text-[#d8dce3]" />
                </div>
                <div>
                    <Label htmlFor="tag-url" className="text-xs">URL</Label>
                    <Input
                        type="text"
                        id="tag-url"
                        placeholder="Set your URL"
                        className="placeholder:text-[#d8dce3]" />
                </div>
                <div>
                    <Label htmlFor="button-label" className="text-xs">Button label</Label>
                    <Input
                        type="text"
                        id="button-label"
                        placeholder="Set your label"
                        defaultValue="Open link"
                        disabled
                        className="placeholder:text-[#d8dce3]" />
                </div>
            </div>
        </div>
    )
}