import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OpenLink() {
    return (
        <>
            <div>
                <Label htmlFor="open-link-url" className="text-xs">Link URL</Label>
                <Input
                    type="text"
                    id="open-link-url"/>
            </div>
            <div>
                <Label htmlFor="open-link-tooltip" className="text-xs">Tooltip</Label>
                <Input
                    type="text"
                    id="open-link-tooltip"/>
            </div>
        </>
    )
}