import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { addIntercationDataToMainStage } from "@/utils/Helper";
import CornerRadiusControl from "@/utils/CornerRadiusControl";

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
    openIn: z.enum(["new-tab", "same-tab"])
});

export default function Link({ mainStage, setMainStage, selectedShape, selectedIndex }) {
    const [useIndividualCorners, setUseIndividualCorners] = useState(
        selectedShape?.[0]?.attrs?.effect?.individualCorners || false
    );
    
    const defaultCornerRadius = selectedShape?.[0]?.attrs?.effect?.cornerRadius || 0;
    const [cornerRadius, setCornerRadius] = useState(defaultCornerRadius);
    
    const [topLeftRadius, setTopLeftRadius] = useState(
        useIndividualCorners ? 
            selectedShape?.[0]?.attrs?.effect?.topLeftRadius || 0 : 
            defaultCornerRadius
    );
    
    const [topRightRadius, setTopRightRadius] = useState(
        useIndividualCorners ? 
            selectedShape?.[0]?.attrs?.effect?.topRightRadius || 0 : 
            defaultCornerRadius
    );
    
    const [bottomRightRadius, setBottomRightRadius] = useState(
        useIndividualCorners ? 
            selectedShape?.[0]?.attrs?.effect?.bottomRightRadius || 0 : 
            defaultCornerRadius
    );
    
    const [bottomLeftRadius, setBottomLeftRadius] = useState(
        useIndividualCorners ? 
            selectedShape?.[0]?.attrs?.effect?.bottomLeftRadius || 0 : 
            defaultCornerRadius
    );
    
    const initialUrl = selectedShape?.[0]?.attrs?.htmlData?.url || "";
    const initialTooltip = selectedShape?.[0]?.attrs?.htmlData?.tooltip || "Go to URL";
    const initialOpenIn = selectedShape?.[0]?.attrs?.htmlData?.openIn || "new-tab";
    
    const [isUrlValid, setIsUrlValid] = useState(
        !!initialUrl && URL_PATTERN.test(initialUrl)
    );
    const [rawInputValue, setRawInputValue] = useState(initialUrl);
    const [isTouched, setIsTouched] = useState(false);

    const form = useForm({
        resolver: zodResolver(linkSchema),
        defaultValues: {
            url: initialUrl,
            tooltip: initialTooltip,
            openIn: initialOpenIn
        },
        mode: "onChange"
    });

    useEffect(() => {
        if (selectedShape.length && selectedShape[0]) {
            const effect = selectedShape[0].attrs.effect || {};
            const hasIndividualCorners = effect.individualCorners;

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
                const newUrl = selectedShape[0]?.attrs?.htmlData?.url || "";
                const newTooltip = selectedShape[0]?.attrs?.htmlData?.tooltip || "Go to URL";
                const newOpenIn = selectedShape[0]?.attrs?.htmlData?.openIn || "new-tab";

                setRawInputValue(newUrl);
                form.setValue("url", newUrl, { shouldValidate: true });
                form.setValue("tooltip", newTooltip);
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
                form.setValue("tooltip", "Go to URL");
                form.setValue("openIn", "new-tab");
                setIsUrlValid(false);
                setIsTouched(false);
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

    const updateMainStage = (data, skipUrlValidation = false) => {
        if (!skipUrlValidation && !isUrlValid) return;
        
        const output = {
            data: {
                action: "link",
                url: data.url || "",
                tooltip: data.tooltip,
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
    );
}