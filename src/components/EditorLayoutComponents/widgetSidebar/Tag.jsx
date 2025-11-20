import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { addIntercationDataToMainStage } from "@/utils/Helper";

const URL_PATTERN = /^(https?:\/\/)([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\/[a-zA-Z0-9_\-.~!*'();:@&=+$,/?%#[\]]*)?$/;
const DOMAIN_PATTERN = /^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\/[a-zA-Z0-9_\-.~!*'();:@&=+$,/?%#[\]]*)?$/;

const tagSchema = z.object({
    text: z.string().default(""),
    url: z.string()
        .optional()
        .transform(val => {
            if (!val) return "";
            if (!val.startsWith('http://') && !val.startsWith('https://')) {
                return `https://${val}`;
            }
            return val;
        })
        .refine(url => !url || URL_PATTERN.test(url), {
            message: "Please enter a valid URL format"
        }),
    buttonLabel: z.string().default("Open link")
});

export default function Tag({ mainStage, setMainStage, selectedShape, selectedIndex }) {
    const initialText = selectedShape[0]?.attrs?.htmlData?.text || "";
    const initialUrl = selectedShape[0]?.attrs?.htmlData?.url || "";
    const initialButtonLabel = selectedShape[0]?.attrs?.htmlData?.buttonLabel || "Open link";
    
    const [isUrlValid, setIsUrlValid] = useState(!!initialUrl && URL_PATTERN.test(initialUrl));
    const [rawUrlValue, setRawUrlValue] = useState(initialUrl);
    const [isUrlTouched, setIsUrlTouched] = useState(false);

    const form = useForm({
        resolver: zodResolver(tagSchema),
        defaultValues: {
            text: initialText,
            url: initialUrl,
            buttonLabel: initialButtonLabel
        },
        mode: "onChange"
    });

    useEffect(() => {
        if (selectedShape[0]?.attrs?.htmlData) {
            const newText = selectedShape[0]?.attrs?.htmlData?.text || "";
            const newUrl = selectedShape[0]?.attrs?.htmlData?.url || "";
            const newButtonLabel = selectedShape[0]?.attrs?.htmlData?.buttonLabel || "Open link";

            setRawUrlValue(newUrl);
            form.setValue("text", newText);
            form.setValue("url", newUrl, { shouldValidate: true });
            form.setValue("buttonLabel", newButtonLabel);

            setIsUrlValid(!!newUrl && URL_PATTERN.test(newUrl));
            setIsUrlTouched(false);
        } else {
            form.setValue("text", "");
            setRawUrlValue("");
            form.setValue("url", "", { shouldValidate: true });
            form.setValue("buttonLabel", "Open link");
            
            setIsUrlValid(false);
            setIsUrlTouched(false);
        }
    }, [selectedShape, form]);

    const updateMainStage = (data) => {
        const output = {
            data: {
                action: "tag",
                text: data.text,
                url: data.url,
                buttonLabel: isUrlValid ? data.buttonLabel : "Open link"
            }
        };
        
        addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
    };

    const { watch, formState } = form;
    const formValues = watch();

    useEffect(() => {
        const currentUrl = formValues.url;
        const isValid = currentUrl && URL_PATTERN.test(currentUrl);
        setIsUrlValid(isValid);
    }, [formValues.url]);

    const handleTextChange = (e) => {
        const value = e.target.value;
        form.setValue("text", value);
        updateMainStage({ ...formValues, text: value });
    };

    const handleUrlChange = (e) => {
        if (!isUrlTouched) {
            setIsUrlTouched(true);
        }

        const value = e.target.value;
        setRawUrlValue(value);

        if (value && !value.startsWith('http://') && !value.startsWith('https://') && DOMAIN_PATTERN.test(value)) {
            form.setValue("url", `https://${value}`, { shouldValidate: true });
        } else {
            form.setValue("url", value, { shouldValidate: true });
        }
        
    };

    const handleButtonLabelChange = (e) => {
        const value = e.target.value;
        form.setValue("buttonLabel", value);
        if (isUrlValid) {
            updateMainStage({ ...formValues, buttonLabel: value });
        }
    };

    const handleUrlBlur = () => {
        setIsUrlTouched(true);
        updateMainStage(form.getValues());
        
        const formValue = form.getValues("url");
        if (formValue !== rawUrlValue) {
            setRawUrlValue(formValue);
        }
    };

    const showUrlError = isUrlTouched && formState.errors.url;

    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Label className="text-lg">Tag</Label>
            <Form {...form}>
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="tag-text" className="text-xs">Text</Label>
                                <FormControl>
                                    <Input
                                        type="text"
                                        id="tag-text"
                                        placeholder="Set your text"
                                        className="placeholder:text-[#d8dce3]"
                                        {...field}
                                        onChange={handleTextChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="tag-url" className="text-xs">URL</Label>
                                <FormControl>
                                    <Input
                                        type="text"
                                        id="tag-url"
                                        placeholder="Set your URL"
                                        className={`placeholder:text-[#d8dce3] ${showUrlError ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}`}
                                        value={rawUrlValue}
                                        onChange={handleUrlChange}
                                        onBlur={handleUrlBlur}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="buttonLabel"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="button-label" className="text-xs">Button label</Label>
                                <FormControl>
                                    <Input
                                        type="text"
                                        id="button-label"
                                        placeholder="Set your label"
                                        className="placeholder:text-[#d8dce3]"
                                        disabled={!isUrlValid}
                                        {...field}
                                        onChange={handleButtonLabelChange}
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