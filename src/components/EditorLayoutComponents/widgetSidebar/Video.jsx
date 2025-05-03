import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { addIntercationDataToMainStage } from "@/utils/Helper";
import CornerRadiusControl from "@/utils/CornerRadiusControl";

// URL patterns for validation
const YOUTUBE_PATTERN = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}((\?|\&).*)?$/;
const VIMEO_PATTERN = /^(https?:\/\/)?(www\.)?(vimeo\.com\/)[0-9]+$/;
const GENERAL_VIDEO_PATTERN = /^(https?:\/\/)([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\/[a-zA-Z0-9_\-.~!*'();:@&=+$,/?%#[\]]*)?\.(mp4|webm|ogg|avi|mov|wmv|flv|mkv)$/i;

const videoSchema = z.object({
    url: z.string()
        .trim()
        .min(1, { message: "Video URL is required" })
        .transform(val => {
            if (!val.startsWith('http://') && !val.startsWith('https://')) {
                return `https://${val}`;
            }
            return val;
        })
        .refine(url => YOUTUBE_PATTERN.test(url) || VIMEO_PATTERN.test(url) || GENERAL_VIDEO_PATTERN.test(url), {
            message: "Please enter a valid YouTube, Vimeo, or video file URL"
        }),
    size: z.string().default("853-480"),
    tooltip: z.string().default("Video")
});

export default function Video({ mainStage, setMainStage, selectedShape, selectedIndex }) {
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
    
    const [isUrlValid, setIsUrlValid] = useState(false);
    const [rawInputValue, setRawInputValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const options = [
        { value: "560-315", label: "560 x 315" },
        { value: "640-360", label: "640 x 360" },
        { value: "853-480", label: "853 x 480" },
        { value: "1280-720", label: "1280 x 720" },
        { value: "full-screen", label: "Open in full screen" },
    ];

    const initialUrl = selectedShape?.[0]?.attrs?.htmlData?.url || "";
    const initialSize = selectedShape?.[0]?.attrs?.htmlData?.size || "853-480";
    const initialTooltip = selectedShape?.[0]?.attrs?.htmlData?.tooltip || "Video";

    const form = useForm({
        resolver: zodResolver(videoSchema),
        defaultValues: {
            url: initialUrl,
            size: initialSize,
            tooltip: initialTooltip
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
                const newSize = selectedShape[0]?.attrs?.htmlData?.size || "853-480";
                const newTooltip = selectedShape[0]?.attrs?.htmlData?.tooltip || "Video";

                setRawInputValue(newUrl);
                form.setValue("url", newUrl, { shouldValidate: true });
                form.setValue("size", newSize);
                form.setValue("tooltip", newTooltip);

                if (YOUTUBE_PATTERN.test(newUrl) || VIMEO_PATTERN.test(newUrl) || GENERAL_VIDEO_PATTERN.test(newUrl)) {
                    setIsUrlValid(true);
                } else {
                    setIsUrlValid(false);
                }

                setIsTouched(false);
            } else {
                setRawInputValue("");
                form.setValue("url", "", { shouldValidate: true });
                form.setValue("size", "853-480");
                form.setValue("tooltip", "Video");
                setIsUrlValid(false);
                setIsTouched(false);
            }
        }
    }, [selectedShape, form]);

    const updateMainStage = (data, skipUrlValidation = false) => {
        if (!skipUrlValidation && !isUrlValid) return;
        
        const output = {
            data: {
                url: data.url || "",
                size: data.size,
                tooltip: data.tooltip
            }
        };
        
        addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
    };

    const { watch, formState } = form;
    const formValues = watch();

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

        if (!value.startsWith('http://') && !value.startsWith('https://')) {
            form.setValue("url", `https://${value}`, { shouldValidate: true });
        } else {
            form.setValue("url", value, { shouldValidate: true });
        }
    };

    const handleSizeChange = (value) => {
        form.setValue("size", value);
        updateMainStage({ ...formValues, size: value }, true);
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
            <Label className="text-lg">Video</Label>
            <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="video-url" className="text-xs">URL</Label>
                                <FormControl>
                                    <Input
                                        type="text"
                                        id="video-url"
                                        placeholder="YouTube / Vimeo URL / Your own URL"
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
                        name="size"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="video-size" className="text-xs">Size</Label>
                                <Select
                                    value={field.value}
                                    onValueChange={handleSizeChange}
                                >
                                    <SelectTrigger id="video-size" className="w-full">
                                        <SelectValue placeholder="Select size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {options.map(option => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="tooltip"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="video-tooltip" className="text-xs">Tooltip</Label>
                                <FormControl>
                                    <Input
                                        type="text"
                                        id="video-tooltip"
                                        placeholder="Video"
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