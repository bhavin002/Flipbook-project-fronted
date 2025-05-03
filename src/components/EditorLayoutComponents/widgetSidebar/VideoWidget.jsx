import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { addIntercationDataToMainStage } from "@/utils/Helper";

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
    tooltip: z.string().default("Video widget"),
    autoPlay: z.boolean().default(false),
    mute: z.boolean().default(false),
    loop: z.boolean().default(false)
});

export default function VideoWidget({ mainStage, setMainStage, selectedShape, selectedIndex }) {
    const [isUrlValid, setIsUrlValid] = useState(false);
    const [rawInputValue, setRawInputValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const initialUrl = selectedShape?.[0]?.attrs?.htmlData?.url || "";
    const initialTooltip = selectedShape?.[0]?.attrs?.htmlData?.tooltip || "Video widget";
    const initialAutoPlay = selectedShape?.[0]?.attrs?.htmlData?.autoPlay || false;
    const initialMute = selectedShape?.[0]?.attrs?.htmlData?.mute || false;
    const initialLoop = selectedShape?.[0]?.attrs?.htmlData?.loop || false;

    const form = useForm({
        resolver: zodResolver(videoSchema),
        defaultValues: {
            url: initialUrl,
            tooltip: initialTooltip,
            autoPlay: initialAutoPlay,
            mute: initialMute,
            loop: initialLoop
        },
        mode: "onChange"
    });

    useEffect(() => {
        if (selectedShape.length && selectedShape[0]) {
            if (selectedShape[0]?.attrs?.htmlData) {
                const newUrl = selectedShape[0]?.attrs?.htmlData?.url || "";
                const newTooltip = selectedShape[0]?.attrs?.htmlData?.tooltip || "Video widget";
                const newAutoPlay = selectedShape[0]?.attrs?.htmlData?.autoPlay || false;
                const newMute = selectedShape[0]?.attrs?.htmlData?.mute || false;
                const newLoop = selectedShape[0]?.attrs?.htmlData?.loop || false;

                setRawInputValue(newUrl);
                form.setValue("url", newUrl, { shouldValidate: true });
                form.setValue("tooltip", newTooltip);
                form.setValue("autoPlay", newAutoPlay);
                form.setValue("mute", newMute);
                form.setValue("loop", newLoop);

                if (YOUTUBE_PATTERN.test(newUrl) || VIMEO_PATTERN.test(newUrl) || GENERAL_VIDEO_PATTERN.test(newUrl)) {
                    setIsUrlValid(true);
                } else {
                    setIsUrlValid(false);
                }

                setIsTouched(false);
            } else {
                setRawInputValue("");
                form.setValue("url", "", { shouldValidate: true });
                form.setValue("tooltip", "Video widget");
                form.setValue("autoPlay", false);
                form.setValue("mute", false);
                form.setValue("loop", false);
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
                tooltip: data.tooltip,
                autoPlay: data.autoPlay,
                mute: data.mute,
                loop: data.loop
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

        if (!value.startsWith('http://') && !value.startsWith('https://')) {
            form.setValue("url", `https://${value}`, { shouldValidate: true });
        } else {
            form.setValue("url", value, { shouldValidate: true });
        }
    };

    const handleTooltipChange = (e) => {
        const value = e.target.value;
        form.setValue("tooltip", value);
        setTimeout(() => {
            updateMainStage(form.getValues(), true);
        }, 0);
    };

    const handleCheckboxChange = (field, value) => {
        form.setValue(field, value);
        setTimeout(() => {
            updateMainStage(form.getValues(), true);
        }, 0);
    };

    const showError = isTouched && formState.errors.url;

    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Label className="text-lg">Video Widget</Label>
            <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="url"
                        render={() => (
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
                        name="tooltip"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="video-tooltip" className="text-xs">Tooltip</Label>
                                <FormControl>
                                    <Input
                                        type="text"
                                        id="video-tooltip"
                                        placeholder="Video Widget"
                                        className="placeholder:text-gray-400"
                                        {...field}
                                        onChange={handleTooltipChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {isUrlValid && (
                        <>
                            <FormField
                                control={form.control}
                                name="autoPlay"
                                render={({ field }) => (
                                    <FormItem >
                                        <div className="flex items-center gap-1">
                                            <FormControl>
                                                <Checkbox
                                                    id="auto-play"
                                                    className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => handleCheckboxChange("autoPlay", checked)}
                                                />
                                            </FormControl>
                                            <Label htmlFor="auto-play" className="text-sm font-medium leading-none">Autoplay</Label>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="mute"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center gap-1">
                                            <FormControl>
                                                <Checkbox
                                                    id="mute"
                                                    className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => handleCheckboxChange("mute", checked)}
                                                />
                                            </FormControl>
                                            <Label htmlFor="mute" className="text-sm font-medium leading-none">Mute</Label>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="loop"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center gap-1">
                                            <FormControl>
                                                <Checkbox
                                                    id="loop"
                                                    className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => handleCheckboxChange("loop", checked)}
                                                />
                                            </FormControl>
                                            <Label htmlFor="loop" className="text-sm font-medium leading-none">Loop</Label>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                </div>
            </Form>
        </div>
    );
}