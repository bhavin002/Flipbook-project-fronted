import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Caption() {
    return (
        <div className="p-6 space-y-2">
            <Label className="text-lg">Caption</Label>
            <div className="space-y-2">
                <div>
                    <Label htmlFor="Caption-text" className="text-xs">Text</Label>
                    <Input
                        type="text"
                        id="Caption-text"
                        placeholder="Set your text"
                        defaultValue="Add text here"
                        className="placeholder:text-[#d8dce3]" />
                </div>
                <div>
                    <Label htmlFor="Caption-url" className="text-xs">URL</Label>
                    <Input
                        type="text"
                        id="Caption-url"
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