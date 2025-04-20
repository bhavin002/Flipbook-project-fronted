import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PhoneNumber() {
    return (
        <div>
            <Label htmlFor="phone-number" className="text-xs">Phone Number</Label>
            <Input
                type="text"
                id="phone-number"
                placeholder="Enter phone number"
                className="placeholder:text-[#d8dce3]" />
        </div>
    )
}