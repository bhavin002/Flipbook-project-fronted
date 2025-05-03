import { useState, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Info, Trash2 } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { addIntercationDataToMainStage } from "@/utils/Helper";
import { DeleteSingleMediaApi, UploadSingleMediaApi } from "@/service/widgetMedia.service";
import { toast } from "sonner";
import ConfirmationDialog from "@/utils/ConfirmationDialog";
import { SingleFileUploadSkeleton } from "@/utils/Skeleton";

const IMAGE_MAX_SIZE = 5 * 1024 * 1024;

const imageSchema = z
    .instanceof(File)
    .optional()
    .refine((file) => !file || !file.size || file.type.startsWith("image/"), {
        message: "Only image files are allowed"
    })
    .refine((file) => !file || !file.size || file.size <= IMAGE_MAX_SIZE, {
        message: `File size must be less than ${IMAGE_MAX_SIZE / 1024 / 1024} MB`
    });

const embedSchema = z.object({
    embedCode: z.string()
        .refine(code => {
            return code === "" || /^<(iframe|embed)[\s\S]*?>([\s\S]*?<\/(iframe|embed)>)?$/.test(code);
        }, {
            message: "Please enter a valid embed code (iframe or embed tags)"
        }),
    coverImage: imageSchema
});

export default function Embed({ mainStage, setMainStage, selectedShape, selectedIndex }) {
    const [hasImage, setHasImage] = useState(false);
    const [imageData, setImageData] = useState(null);
    const [isEmbedCodeValid, setIsEmbedCodeValid] = useState(false);
    const [isEmbedCodeTouched, setIsEmbedCodeTouched] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isDeleteImageLoading, setIsDeleteImageLoading] = useState(false);
    const fileInputRef = useRef(null);

    const initialEmbedCode = selectedShape[0]?.attrs?.htmlData?.embedCode || "";
    const initialImageData = selectedShape[0]?.attrs?.htmlData?.coverImage || null;

    const form = useForm({
        resolver: zodResolver(embedSchema),
        defaultValues: {
            embedCode: initialEmbedCode,
            coverImage: initialImageData
        },
        mode: "onChange"
    });

    useEffect(() => {
        if (selectedShape[0]?.attrs?.htmlData) {
            const newEmbedCode = selectedShape[0]?.attrs?.htmlData?.embedCode || "";
            const newCoverImage = selectedShape[0]?.attrs?.htmlData?.coverImage || null;

            form.setValue("embedCode", newEmbedCode, { shouldValidate: true });
            form.setValue("coverImage", newCoverImage);

            setIsEmbedCodeValid(!!newEmbedCode && /^<(iframe|embed)[\s\S]*?>([\s\S]*?<\/(iframe|embed)>)?$/.test(newEmbedCode));
            setIsEmbedCodeTouched(false);

            if (newCoverImage) {
                setHasImage(true);
                setImageData(newCoverImage);
            } else {
                setHasImage(false);
                setImageData(null);
            }
        } else {
            form.setValue("embedCode", "");
            form.setValue("coverImage", null);

            setIsEmbedCodeValid(false);
            setIsEmbedCodeTouched(false);
            setHasImage(false);
            setImageData(null);
        }
    }, [selectedShape, form]);

    const updateMainStage = (data) => {
        if (isEmbedCodeValid || !data.embedCode) {
            const output = {
                data: {
                    embedCode: data.embedCode,
                    coverImage: data.coverImage
                }
            };
            addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
        }
    };

    const { watch, formState } = form;
    const formValues = watch();

    useEffect(() => {
        const currentEmbedCode = formValues.embedCode;
        const isValid = currentEmbedCode && /^<(iframe|embed)[\s\S]*?>([\s\S]*?<\/(iframe|embed)>)?$/.test(currentEmbedCode);
        setIsEmbedCodeValid(isValid);

        if (isEmbedCodeTouched && !isValid && currentEmbedCode) {
            form.setError("embedCode", {
                type: "manual",
                message: "Please enter a valid embed code (iframe or embed tags)"
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

        const isValid = value && /^<(iframe|embed)[\s\S]*?>([\s\S]*?<\/(iframe|embed)>)?$/.test(value);
        setIsEmbedCodeValid(isValid);
    };

    const handleEmbedCodeBlur = () => {
        setIsEmbedCodeTouched(true);
        const values = form.getValues();
        const isValid = values.embedCode && /^<(iframe|embed)[\s\S]*?>([\s\S]*?<\/(iframe|embed)>)?$/.test(values.embedCode);
        setIsEmbedCodeValid(isValid);

        if (isValid || !values.embedCode) {
            updateMainStage(values);
        }
    };

    const handleUploadImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        if (file) {
            setIsUploading(true);
            try {
                const response = await UploadSingleMediaApi(formData);
                const imageResponseData = response.data;

                const newImageData = {
                    fileId: imageResponseData.fileId,
                    url: imageResponseData.url,
                    name: imageResponseData.fileName
                };

                setImageData(newImageData);
                setHasImage(true);
                form.setValue("coverImage", newImageData);

                mainStage[selectedIndex].stageref.current.children[0].children[1].children.find(e => {
                    if (e.attrs.id === selectedShape[0].attrs.id) {
                        e.attrs.htmlData = {
                            ...e.attrs.htmlData,
                            coverImage: newImageData
                        }
                        e.attrs.htmlType = selectedShape[0].attrs.htmlType;
                        e.attrs.fill = "#ffffffa6";
                        return true;
                    }
                });
                mainStage[selectedIndex].shapes = mainStage[selectedIndex].stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) || [];
                const temp = JSON.parse(JSON.stringify(mainStage[selectedIndex]))
                temp.selectedShapes = [];
                temp.stageref = null;
                setMainStage([...mainStage]);
            } catch (error) {
                if (error instanceof z.ZodError) {
                    toast.error("Validation Error", {
                        description: error.errors[0].message || "Invalid file format or size.",
                    });
                } else {
                    toast.error("Upload failed", {
                        description: error.message || "Oops! Something went wrong.",
                    });
                }

                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            } finally {
                setIsUploading(false);
            }
        }
    };

    const confirmDeleteImage = () => {
        setIsConfirmModalOpen(true);
    };

    const handleDeleteImage = async () => {
        try {
            setIsDeleteImageLoading(true);
            await DeleteSingleMediaApi(imageData.fileId);
            mainStage[selectedIndex].stageref.current.children[0].children[1].children.find(e => {
                if (e.attrs.id === selectedShape[0].attrs.id) {
                    delete e.attrs.htmlData.coverImage;
                }
            });
            mainStage[selectedIndex].shapes = mainStage[selectedIndex].stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) || [];
            const temp = JSON.parse(JSON.stringify(mainStage[selectedIndex]))
            temp.selectedShapes = [];
            temp.stageref = null;
            setMainStage([...mainStage]);

            setHasImage(false);
            setImageData(null);
            form.setValue("coverImage", null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            setIsConfirmModalOpen(false);
        } catch (error) {
            toast.error("Failed to delete image", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsDeleteImageLoading(false);
        }

    };

    const showEmbedCodeError = isEmbedCodeTouched && formState.errors.embedCode;

    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Label className="text-lg">Embed</Label>
            <Form {...form}>
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="embedCode"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="popup-frame-code" className="text-xs">Embed code</Label>
                                <FormControl>
                                    <Textarea
                                        id="popup-frame-code"
                                        placeholder="Embed code"
                                        className={`resize-none placeholder:text-gray-300 ${showEmbedCodeError ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}`}
                                        rows={4}
                                        {...field}
                                        onChange={handleEmbedCodeChange}
                                        onBlur={handleEmbedCodeBlur}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className="space-y-2">
                        <div className="flex items-center gap-1">
                            <Label className="text-xs">
                                Cover image
                            </Label>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info className="h-3 w-3 cursor-pointer" />
                                    </TooltipTrigger>
                                    <TooltipContent
                                        side="right"
                                        align="center"
                                        className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
                                    >
                                        <p className="text-sm">The cover image shows as a placeholder when the flipbook is downloaded (PDF, JPG, PNG).</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        {isUploading ? (
                            <SingleFileUploadSkeleton />
                        ) : hasImage && imageData ? (
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2 items-center w-[80%]">
                                    <img
                                        src={imageData.url}
                                        className="w-[50px] h-[40px] object-cover rounded-sm"
                                        alt="Cover"
                                    />
                                    <p className="text-sm truncate">{imageData.name}</p>
                                </div>
                                <Button variant="ghost" onClick={confirmDeleteImage}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : null}

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        <Button
                            className="w-full text-black hover:text-primary"
                            variant="outline"
                            onClick={handleUploadImage}
                            disabled={hasImage || isUploading}
                        >
                            Upload image
                        </Button>
                    </div>
                </div>
            </Form>

            <ConfirmationDialog
                isConfirmModalOpen={isConfirmModalOpen}
                setIsConfirmModalOpen={setIsConfirmModalOpen}
                title="Delete Cover Image"
                description="Are you sure you want to delete this cover image?"
                onConfirm={handleDeleteImage}
                isLoading={isDeleteImageLoading}
            />
        </div>
    );
}