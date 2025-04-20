import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SendEmail() {
    return (
        <div>
            <Label htmlFor="email" className="text-xs">Email</Label>
            <Input
                type="text"
                id="email"
                placeholder="Recipient email"
                className="placeholder:text-[#d8dce3]" />
        </div>
    )
}