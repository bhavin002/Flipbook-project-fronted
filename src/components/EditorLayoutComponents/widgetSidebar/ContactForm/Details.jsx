import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CustomerDetailsFields from "@/utils/CustomerDetailsFields";
import { Separator } from "@/components/ui/separator";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export default function Details({ form }) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <FormField
                    control={form.control}
                    name="formTitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xs">Form title</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Untitled form"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xs">Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Use a maximum of 128 characters"
                                    className="resize-none"
                                    rows={2}
                                    maxLength={128}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <CustomerDetailsFields form={form} />
            </div>
        </div>
    )
}