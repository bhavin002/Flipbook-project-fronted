import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CustomerDetailsFields from "@/utils/CustomerDetailsFields";
import { Separator } from "@/components/ui/separator";


export default function Details() {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div>
                    <Label htmlFor="form-title" className="text-xs">Form title</Label>
                    <Input
                        type="text"
                        id="form-title"
                        defaultValue="Untitled form"
                        placeholder="Untitled form"
                    />
                </div>
                <div>
                    <Label htmlFor="form-description" className="text-xs">Description</Label>
                    <Input
                        type="text"
                        id="form-description"
                        placeholder="Use a maximum of 128 characters"
                    />
                </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
                <div>
                    <Label htmlFor="question-tooltip" >
                        Customer details
                    </Label>
                    <p className="text-sm text-gray-500">
                        Add the contact fields that you want your customers to complete
                    </p>
                </div>
                <CustomerDetailsFields />
            </div>
        </div>
    )
}