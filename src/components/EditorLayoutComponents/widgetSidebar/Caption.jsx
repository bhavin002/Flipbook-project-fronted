import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { addIntercationDataToMainStage } from "@/utils/Helper";
import CornerRadiusControl from "@/utils/CornerRadiusControl";

const URL_PATTERN = /^(https?:\/\/)([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\/[a-zA-Z0-9_\-.~!*'();:@&=+$,/?%#[\]]*)?$/;
const DOMAIN_PATTERN = /^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\/[a-zA-Z0-9_\-.~!*'();:@&=+$,/?%#[\]]*)?$/;

const captionSchema = z.object({
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

export default function Caption({ 
    selectedShape, 
    setMainStage, 
    mainStage, 
    selectedIndex 
}) {
    const [useIndividualCorners, setUseIndividualCorners] = useState(false);
    const [cornerRadius, setCornerRadius] = useState(0);
    const [topLeftRadius, setTopLeftRadius] = useState(0);
    const [topRightRadius, setTopRightRadius] = useState(0);
    const [bottomRightRadius, setBottomRightRadius] = useState(0);
    const [bottomLeftRadius, setBottomLeftRadius] = useState(0);
    
    const initialText = selectedShape[0]?.attrs?.htmlData?.text || "Add text here";
    const initialUrl = selectedShape[0]?.attrs?.htmlData?.url || "";
    const initialButtonLabel = selectedShape[0]?.attrs?.htmlData?.buttonLabel || "Open link";
    
    const [isUrlValid, setIsUrlValid] = useState(!!initialUrl && URL_PATTERN.test(initialUrl));
    const [rawUrlValue, setRawUrlValue] = useState(initialUrl);
    const [isUrlTouched, setIsUrlTouched] = useState(false);

    const form = useForm({
        resolver: zodResolver(captionSchema),
        defaultValues: {
            text: initialText,
            url: initialUrl,
            buttonLabel: initialButtonLabel
        },
        mode: "onChange"
    });

    useEffect(() => {
        if (selectedShape.length && selectedShape[0]) {
            const effect = selectedShape[0].attrs.effect || {};
            const hasIndividualCorners = effect.individualCorners

            setUseIndividualCorners(hasIndividualCorners);
            setCornerRadius(effect.cornerRadius || 0);
            if (hasIndividualCorners) {
                setTopLeftRadius(effect.topLeftRadius || 0);
                setTopRightRadius(effect.topRightRadius || 0);
                setBottomRightRadius(effect.bottomRightRadius || 0);
                setBottomLeftRadius(effect.bottomLeftRadius || 0);
            } else {
                const uniformRadius = effect.cornerRadius || 0;
                setTopLeftRadius(uniformRadius);
                setTopRightRadius(uniformRadius);
                setBottomRightRadius(uniformRadius);
                setBottomLeftRadius(uniformRadius);
            }
            
            if (selectedShape[0]?.attrs?.htmlData) {
                const newText = selectedShape[0]?.attrs?.htmlData?.text || "Add text here";
                const newUrl = selectedShape[0]?.attrs?.htmlData?.url || "";
                const newButtonLabel = selectedShape[0]?.attrs?.htmlData?.buttonLabel || "Open link";

                setRawUrlValue(newUrl);
                form.setValue("text", newText);
                form.setValue("url", newUrl, { shouldValidate: true });
                form.setValue("buttonLabel", newButtonLabel);

                setIsUrlValid(!!newUrl && URL_PATTERN.test(newUrl));
                setIsUrlTouched(false);
            }else{
                form.setValue("text", "Add text here");
                setRawUrlValue("");
                form.setValue("url", "", { shouldValidate: true });
                form.setValue("buttonLabel", "Open link");
                
                setIsUrlValid(false);
                setIsUrlTouched(false);
            }
        }
    }, [selectedShape, form]);

    useEffect(() => {
        if (!selectedShape.length || !mainStage[selectedIndex]?.shapes) return;

        const updatedMainStage = [...mainStage];
        updatedMainStage[selectedIndex].shapes = mainStage[selectedIndex].shapes.map(element => {
            const matchingShape = selectedShape.find(selShape => selShape.attrs.id === element.id);
            if (matchingShape) {
                return {
                    ...element,
                    effect: {
                        cornerRadius: cornerRadius,
                        individualCorners: useIndividualCorners,
                        topLeftRadius: useIndividualCorners ? topLeftRadius : cornerRadius,
                        topRightRadius: useIndividualCorners ? topRightRadius : cornerRadius,
                        bottomRightRadius: useIndividualCorners ? bottomRightRadius : cornerRadius,
                        bottomLeftRadius: useIndividualCorners ? bottomLeftRadius : cornerRadius,
                    }
                };
            }
            return element;
        });

        setMainStage(updatedMainStage);
    }, [
        cornerRadius, useIndividualCorners, topLeftRadius, topRightRadius,
        bottomRightRadius, bottomLeftRadius
    ]);

    const updateMainStage = (data) => {
        const output = {
            data: {
                action: "caption",
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
            <Label className="text-lg">Caption</Label>
            <Form {...form}>
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="Caption-text" className="text-xs">Text</Label>
                                <FormControl>
                                    <Input
                                        type="text"
                                        id="Caption-text"
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
                                <Label htmlFor="Caption-url" className="text-xs">URL</Label>
                                <FormControl>
                                    <Input
                                        type="text"
                                        id="Caption-url"
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

            <CornerRadiusControl 
                useIndividualCorners={useIndividualCorners}
                setUseIndividualCorners={setUseIndividualCorners}
                cornerRadius={cornerRadius}
                setCornerRadius={setCornerRadius}
                topLeftRadius={topLeftRadius}
                setTopLeftRadius={setTopLeftRadius}
                topRightRadius={topRightRadius}
                setTopRightRadius={setTopRightRadius}
                bottomRightRadius={bottomRightRadius}
                setBottomRightRadius={setBottomRightRadius}
                bottomLeftRadius={bottomLeftRadius}
                setBottomLeftRadius={setBottomLeftRadius}
            />
        </div>
    )
}