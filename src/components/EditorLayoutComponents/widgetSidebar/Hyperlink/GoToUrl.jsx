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

const urlSchema = z.object({
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
    openIn: z.enum(["new-tab", "same-tab"])
});

export default function GoToUrl({ mainStage, setMainStage, selectedShape, selectedIndex }) {
    const initialUrl = selectedShape[0]?.attrs?.htmlData?.url || "";
    const initialOpenIn = selectedShape[0]?.attrs?.htmlData?.openIn || "new-tab";
    const [isUrlValid, setIsUrlValid] = useState(false);
    const [rawInputValue, setRawInputValue] = useState(initialUrl);
    const [isTouched, setIsTouched] = useState(false);

    const form = useForm({
        resolver: zodResolver(urlSchema),
        defaultValues: {
            url: initialUrl,
            openIn: initialOpenIn
        },
        mode: "onChange"
    });

    useEffect(() => {
        if (selectedShape[0]?.attrs?.htmlData) {
            const newUrl = selectedShape[0]?.attrs?.htmlData?.url || "";
            const newOpenIn = selectedShape[0]?.attrs?.htmlData?.openIn || "new-tab";

            setRawInputValue(newUrl);
            form.setValue("url", newUrl, { shouldValidate: true });
            form.setValue("openIn", newOpenIn);

            if (URL_PATTERN.test(newUrl)) {
                setIsUrlValid(true);
            } else {
                setIsUrlValid(false);
            }

            setIsTouched(false);
        } else {
            setRawInputValue("");
            form.setValue("url", "", { shouldValidate: true });
            form.setValue("openIn", "new-tab");
            setIsUrlValid(false);
            setIsTouched(false);
        }
    }, [selectedShape, form]);

    const updateMainStage = (data) => {
        if (!isUrlValid) return;
        const output = {
            data: {
                action: "go-to-url",
                url: data.url,
                openIn: data.openIn
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

    const handleInputChange = (e) => {
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
        if (isUrlValid) {
            updateMainStage({ ...formValues, openIn: value });
        }
    };


    const showError = isTouched && formState.errors.url;

    return (
        <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                    <FormItem className="mb-4">
                        <Label htmlFor="url" className="text-xs">URL</Label>
                        <FormControl>
                            <Input
                                type="text"
                                id="url"
                                placeholder="Set your URL (e.g., example.com)"
                                className={`placeholder:text-gray-400 ${showError ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}`}
                                onChange={handleInputChange}
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
                name="openIn"
                render={({ field }) => (
                    <FormItem>
                        <Label htmlFor="tab" className="text-xs">Open in</Label>
                        <Select
                            value={field.value}
                            onValueChange={(value) => handleTabChange(value)}
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
        </Form>
    );
}