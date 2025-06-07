import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addIntercationDataToMainStage } from "@/utils/Helper";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const embedCodePattern = /^(<(iframe|embed)[\s\S]*?>([\s\S]*?<\/(iframe|embed)>)?|<div[\s\S]*?<\/div>[\s\S]*<script[\s\S]*?<\/script>)$/;

const popupFrameSchema = z.object({
    tooltip: z.string().optional(),
    embedCode: z.string()
        .refine(code => {
            return code === "" || embedCodePattern.test(code);
        }, {
            message: "Please enter a valid embed code (iframe, embed tags, or div with script)"
        })
});

export default function PopupFrame({ mainStage, setMainStage, selectedShape, selectedIndex }) {
    const [isEmbedCodeValid, setIsEmbedCodeValid] = useState(false);
    const [isEmbedCodeTouched, setIsEmbedCodeTouched] = useState(false);

    const initialTooltip = selectedShape[0]?.attrs?.htmlData?.tooltip || "";
    const initialEmbedCode = selectedShape[0]?.attrs?.htmlData?.embedCode || "";

    const form = useForm({
        resolver: zodResolver(popupFrameSchema),
        defaultValues: {
            tooltip: initialTooltip,
            embedCode: initialEmbedCode
        },
        mode: "onChange"
    });

    useEffect(() => {
        if (selectedShape[0]?.attrs?.htmlData) {
            const newTooltip = selectedShape[0]?.attrs?.htmlData?.tooltip || "";
            const newEmbedCode = selectedShape[0]?.attrs?.htmlData?.embedCode || "";

            form.setValue("tooltip", newTooltip);
            form.setValue("embedCode", newEmbedCode, { shouldValidate: true });

            setIsEmbedCodeValid(!!newEmbedCode && embedCodePattern.test(newEmbedCode));
            setIsEmbedCodeTouched(false);
        } else {
            form.setValue("tooltip", "");
            form.setValue("embedCode", "");

            setIsEmbedCodeValid(false);
            setIsEmbedCodeTouched(false);
        }
    }, [selectedShape, form]);

    const updateMainStage = (data) => {
        if (isEmbedCodeValid || !data.embedCode) {
            const output = {
                data: {
                    action: "popup-frame",
                    tooltip: data.tooltip,
                    embedCode: data.embedCode
                }
            };
            addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
        }
    };

    const { watch, formState } = form;
    const formValues = watch();

    useEffect(() => {
        const currentEmbedCode = formValues.embedCode;
        const isValid = currentEmbedCode && embedCodePattern.test(currentEmbedCode);
        setIsEmbedCodeValid(isValid);

        if (isEmbedCodeTouched && !isValid && currentEmbedCode) {
            form.setError("embedCode", {
                type: "manual",
                message: "Please enter a valid embed code (iframe, embed tags, or div with script)"
            });
        } else if (isValid || !currentEmbedCode) {
            form.clearErrors("embedCode");
        }
    }, [formValues.embedCode, isEmbedCodeTouched, form]);

    const handleEmbedCodeChange = (e) => {
        if (!isEmbedCodeTouched) {
            setIsEmbedCodeTouched(true);
        }

        const value = e.target.value;
        form.setValue("embedCode", value, { shouldValidate: true });

        const isValid = value && embedCodePattern.test(value);
        setIsEmbedCodeValid(isValid);
    };

    const handleEmbedCodeBlur = () => {
        setIsEmbedCodeTouched(true);
        const values = form.getValues();
        const isValid = values.embedCode && embedCodePattern.test(values.embedCode);
        setIsEmbedCodeValid(isValid);

        if (isValid || !values.embedCode) {
            updateMainStage(values);
        }
    };

    const handleTooltipBlur = () => {
        const values = form.getValues();
        if (isEmbedCodeValid || !values.embedCode) {
            updateMainStage(values);
        }
    };

    const showEmbedCodeError = isEmbedCodeTouched && formState.errors.embedCode;

    return (
        <>
            <Form {...form}>
                <FormField
                    control={form.control}
                    name="tooltip"
                    render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="popup-frame-tooltip" className="text-xs">Tooltip</Label>
                            <FormControl>
                                <Input
                                    type="text"
                                    id="popup-frame-tooltip"
                                    placeholder="Popup frame"
                                    className="placeholder:text-[#d8dce3]"
                                    {...field}
                                    onBlur={handleTooltipBlur}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="embedCode"
                    render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="popup-frame-code" className="text-xs">Popup frame code</Label>
                            <FormControl>
                                <Textarea
                                    id="popup-frame-code"
                                    placeholder="Embed code (iframe, embed, or div with script)"
                                    className={`resize-none placeholder:text-[#d8dce3] ${showEmbedCodeError ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}`}
                                    rows={4}
                                    {...field}
                                    onChange={handleEmbedCodeChange}
                                    onBlur={handleEmbedCodeBlur}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </Form>

            <a
                href="https://example.com/popup-frame-guide"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium cursor-pointer hover:underline"
            >
                Find out how it works
            </a>
        </>

    );
}