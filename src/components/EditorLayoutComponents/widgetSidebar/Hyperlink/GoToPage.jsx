import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GoToPage() {
    return (
        <div>
            <Label htmlFor="page-number" className="text-xs">Page number (1 - 1)</Label>
            <Input
                type="number"
                id="page-number"
                defaultValue={1}
                min={0}
            />
        </div>
    )
}