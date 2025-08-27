import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { addIntercationDataToMainStage } from "@/utils/Helper";

const URL_PATTERN = /^(https?:\/\/)([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\/[a-zA-Z0-9_\-.~!*'();:@&=+$,\/?%#[\]]*)?$/;
const DOMAIN_PATTERN = /^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\/[a-zA-Z0-9_\-.~!*'();:@&=+$,\/?%#[\]]*)?$/;

const schema = z.object({
    url: z.string()
        .trim()
        .min(1, { message: "URL is required" })
        .transform(val => {
            if (!val.startsWith('http://') && !val.startsWith('https://')) {
                return `https://${val}`;
            }
            return val;
        })
        .refine(url => URL_PATTERN.test(url), { message: "Please enter a valid URL format" }),
    tooltip: z.string().trim().optional().transform((val) => val ?? ""),
});

export default function OpenLink({
    selectedShape,
    setMainStage,
    mainStage,
    selectedIndex,
    isRemovedInteraction
}) {
    const initialUrl = selectedShape[0]?.attrs?.htmlData?.url || "";
    const initialTooltip = selectedShape[0]?.attrs?.htmlData?.tooltip || "";

    const [isUrlValid, setIsUrlValid] = useState(false);
    const [rawInputValue, setRawInputValue] = useState(initialUrl);
    const [rawTooltipValue, setRawTooltipValue] = useState(initialTooltip);
    const [isTouched, setIsTouched] = useState(false);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            url: initialUrl,
            tooltip: initialTooltip,
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (isRemovedInteraction) {
            setRawInputValue("");
            setRawTooltipValue("");
        }
    }, [isRemovedInteraction])

    useEffect(() => {
        if (selectedShape[0]?.attrs?.htmlData) {
            const newUrl = selectedShape[0]?.attrs?.htmlData?.url || "";
            const newTooltip = selectedShape[0]?.attrs?.htmlData?.tooltip || "";

            setRawInputValue(newUrl);
            setRawTooltipValue(newTooltip);
            form.setValue("url", newUrl, { shouldValidate: true });
            form.setValue("tooltip", newTooltip);

            if (URL_PATTERN.test(newUrl)) {
                setIsUrlValid(true);
            } else {
                setIsUrlValid(false);
            }

            setIsTouched(false);
        } else {
            setRawInputValue("");
            setRawTooltipValue("");
            form.setValue("url", "", { shouldValidate: true });
            form.setValue("tooltip", "");
            setIsUrlValid(false);
            setIsTouched(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedShape]);

    const updateMainStage = (data) => {
        if (!isUrlValid) return;
        const output = {
            data: {
                action: "open-link",
                url: data.url,
                tooltip: data.tooltip || "",
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

    const handleTooltipChange = (e) => {
        const value = e.target.value;
        setRawTooltipValue(value);
        form.setValue("tooltip", value, { shouldValidate: false });
        if (isUrlValid) {
            updateMainStage({ ...formValues, tooltip: value });
        }
    };

    const showError = isTouched && formState.errors.url;

    return (
        <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                control={form.control}
                name="url"
                render={() => (
                    <FormItem className="my-1 space-y-1">
                        <Label htmlFor="open-link-url" className="text-xs">Link URL</Label>
                        <FormControl>
                            <Input
                                type="text"
                                id="open-link-url"
                                placeholder="Set your URL (e.g., example.com)"
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
                render={() => (
                    <FormItem className="my-1 space-y-1">
                        <Label htmlFor="open-link-tooltip" className="text-xs">Tooltip</Label>
                        <FormControl>
                            <Input
                                type="text"
                                id="open-link-tooltip"
                                placeholder="Enter tooltip text"
                                className="placeholder:text-gray-400"
                                value={rawTooltipValue}
                                onChange={handleTooltipChange}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
        </Form>
    )
}