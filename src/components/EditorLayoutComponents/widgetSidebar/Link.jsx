import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { addIntercationDataToMainStage } from "@/utils/Helper";

const URL_PATTERN = /^(https?:\/\/)([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\/[a-zA-Z0-9_\-.~!*'();:@&=+$,/?%#[\]]*)?$/;
const DOMAIN_PATTERN = /^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\/[a-zA-Z0-9_\-.~!*'();:@&=+$,/?%#[\]]*)?$/;

const linkSchema = z.object({
    url: z.string()
        .trim()
        .min(1, { message: "URL is required" })
        .transform(val => {
            if (!val.startsWith('http://') && !val.startsWith('https://')) {
                return `https://${val}`;
            }
            return val;
        })
        .refine(url => URL_PATTERN.test(url), {
            message: "Please enter a valid URL format"
        }),
    tooltip: z.string().default("Go to URL"),
    openIn: z.enum(["new-tab", "same-tab"]),
    cornerRadius: z.number().int().min(0).default(3)
});

export default function Link({ mainStage, setMainStage, selectedShape, selectedIndex }) {
    const initialUrl = selectedShape[0]?.attrs?.htmlData?.url || "";
    const initialTooltip = selectedShape[0]?.attrs?.htmlData?.tooltip || "Go to URL";
    const initialOpenIn = selectedShape[0]?.attrs?.htmlData?.openIn || "new-tab";
    const initialCornerRadius = selectedShape[0]?.attrs?.htmlData?.cornerRadius || 3;
    
    const [isUrlValid, setIsUrlValid] = useState(false);
    const [rawInputValue, setRawInputValue] = useState(initialUrl);
    const [isTouched, setIsTouched] = useState(false);

    const form = useForm({
        resolver: zodResolver(linkSchema),
        defaultValues: {
            url: initialUrl,
            tooltip: initialTooltip,
            openIn: initialOpenIn,
            cornerRadius: initialCornerRadius
        },
        mode: "onChange"
    });

    useEffect(() => {
        if (selectedShape[0]?.attrs?.htmlData) {
            const newUrl = selectedShape[0]?.attrs?.htmlData?.url || "";
            const newTooltip = selectedShape[0]?.attrs?.htmlData?.tooltip || "Go to URL";
            const newOpenIn = selectedShape[0]?.attrs?.htmlData?.openIn || "new-tab";
            const newCornerRadius = selectedShape[0]?.attrs?.htmlData?.cornerRadius || 3;

            setRawInputValue(newUrl);
            form.setValue("url", newUrl, { shouldValidate: true });
            form.setValue("tooltip", newTooltip);
            form.setValue("openIn", newOpenIn);
            form.setValue("cornerRadius", newCornerRadius);

            if (URL_PATTERN.test(newUrl)) {
                setIsUrlValid(true);
            } else {
                setIsUrlValid(false);
            }

            setIsTouched(false);
        } else {
            setRawInputValue("");
            form.setValue("url", "", { shouldValidate: true });
            form.setValue("tooltip", "Go to URL");
            form.setValue("openIn", "new-tab");
            form.setValue("cornerRadius", 3);
            setIsUrlValid(false);
            setIsTouched(false);
        }
    }, [selectedShape, form]);

    const updateMainStage = (data, skipUrlValidation = false) => {
        if (!skipUrlValidation && !isUrlValid) return;
        
        const output = {
            data: {
                action: "link",
                url: data.url || "",
                tooltip: data.tooltip,
                openIn: data.openIn,
                cornerRadius: data.cornerRadius
            }
        };
        
        addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
    };

    const { watch, formState } = form;
    const formValues = watch();

    useEffect(() => {
        setIsUrlValid(formState.isValid);
    }, [formState]);

    const onSubmit = (data) => {
        if (isUrlValid) {
            updateMainStage(data);
        }
    };

    const handleUrlChange = (e) => {
        if (!isTouched) {
            setIsTouched(true);
        }

        const value = e.target.value;
        setRawInputValue(value);

        if (!value.startsWith('http://') && !value.startsWith('https://') && DOMAIN_PATTERN.test(value)) {
            form.setValue("url", `https://${value}`, { shouldValidate: true });
        } else {
            form.setValue("url", value, { shouldValidate: true });
        }
    };

    const handleTabChange = (value) => {
        form.setValue("openIn", value);
        updateMainStage({ ...formValues, openIn: value }, true);
    };

    const handleTooltipChange = (e) => {
        const value = e.target.value;
        form.setValue("tooltip", value);
        setTimeout(() => {
            updateMainStage(form.getValues(), true);
        }, 0);
    };

    const handleCornerRadiusChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 0) {
            form.setValue("cornerRadius", value);
            updateMainStage({ ...formValues, cornerRadius: value }, true);
        }
    };

    const showError = isTouched && formState.errors.url;

    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Label className="text-lg">Link</Label>
            <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="link-url" className="text-xs">URL</Label>
                                <FormControl>
                                    <Input
                                        type="text"
                                        id="link-url"
                                        placeholder="Set your URL"
                                        className={`placeholder:text-gray-400 ${showError ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}`}
                                        onChange={handleUrlChange}
                                        value={rawInputValue}
                                        onBlur={() => {
                                            setIsTouched(true);
                                            if (isUrlValid) {
                                                form.handleSubmit(onSubmit)();
                                                const formValue = form.getValues("url");
                                                if (formValue !== rawInputValue) {
                                                    setRawInputValue(formValue);
                                                }
                                            }
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="tooltip"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="link-tooltip" className="text-xs">Tooltip</Label>
                                <FormControl>
                                    <Input
                                        type="text"
                                        id="link-tooltip"
                                        placeholder="Set your tooltip"
                                        className="placeholder:text-gray-400"
                                        {...field}
                                        onChange={handleTooltipChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="openIn"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="tab" className="text-xs">Open in</Label>
                                <Select
                                    value={field.value}
                                    onValueChange={handleTabChange}
                                >
                                    <SelectTrigger id="tab" className="w-full">
                                        <SelectValue placeholder="Select tab" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="new-tab">New tab</SelectItem>
                                        <SelectItem value="same-tab">Same tab</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cornerRadius"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="corner-radius" className="text-xs">Corner roundness</Label>
                                <FormControl>
                                    <Input
                                        type="number"
                                        id="corner-radius"
                                        min={0}
                                        className="placeholder:text-gray-400"
                                        {...field}
                                        value={field.value}
                                        onChange={handleCornerRadiusChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </Form>
        </div>
    );
}