import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ContactFormDialog from "./ContactForm/ContactFormDialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { addIntercationDataToMainStage } from "@/utils/Helper";

const contactFormSchema = z.object({
    tooltip: z.string().default("Click to fill contact form"),
})

export default function ContactForm({ selectedShape, mainStage, setMainStage, selectedIndex, flipbookId }) {
    const initialTooltip = selectedShape[0]?.attrs?.htmlData?.tooltip || "Click to fill contact form";

    const form = useForm({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            tooltip: initialTooltip,
        },
        mode: "onChange"
    });

    useEffect(() => {
        if (selectedShape[0]?.attrs?.htmlData) {
            const newTooltip = selectedShape[0]?.attrs?.htmlData?.tooltip || "Click to fill contact form";
            form.setValue("tooltip", newTooltip);
        } else {
            form.setValue("tooltip", "Click to fill contact form");
        }
    }, [selectedShape, form]);

    const updateMainStage = (data) => {
        const output = {
            data: {
                tooltip: data.tooltip,
            }
        };
        addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
    };

    const handleTooltipChange = (e) => {
        const value = e.target.value;
        form.setValue("tooltip", value);
        setTimeout(() => {
            updateMainStage(form.getValues());
        }, 0);
    };

    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Label className="text-lg">Contact Form</Label>
            <p className="text-sm">Gather information and enhance communication. Perfect for feedback and inquiries.</p>
            <ContactFormDialog
                selectedShape={selectedShape}
                mainStage={mainStage}
                setMainStage={setMainStage}
                selectedIndex={selectedIndex}
                flipbookId={flipbookId}
            />

            <Form {...form}>
                <div className="mt-2">
                    <FormField
                        control={form.control}
                        name="tooltip"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <Label htmlFor="contact-form-tooltip" className="text-xs">Tooltip</Label>
                                <FormControl>
                                    <Input
                                        type="text"
                                        id="contact-form-tooltip"
                                        placeholder="Click to fill contact form"
                                        className="placeholder:text-gray-400"
                                        {...field}
                                        onChange={handleTooltipChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </Form>
        </div>
    )
}