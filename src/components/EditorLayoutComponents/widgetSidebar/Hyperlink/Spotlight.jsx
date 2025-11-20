import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { addIntercationDataToMainStage } from "@/utils/Helper";
import { DeleteSingleMediaApi, UploadSingleMediaApi } from "@/service/widgetMedia.service";
import { toast } from "sonner";
import ConfirmationDialog from "@/utils/ConfirmationDialog";
import { SingleFileUploadSkeleton } from "@/utils/Skeleton";
import LoadingButton from "@/utils/LoadingButton";

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

const spotlightSchema = z.object({
    tooltip: z.string().optional(),
    showBackground: z.boolean().default(false).optional(),
    imageSize: z.enum(["small", "medium", "large"]).default("medium"),
    imageProperties: z.enum(["fit-to-frame", "scale-to-fill"]).default("fit-to-frame"),
    spotlightImage: imageSchema
});

export default function Spotlight({ mainStage, setMainStage, selectedShape, selectedIndex }) {
    const [hasImage, setHasImage] = useState(false);
    const [imageData, setImageData] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isDeleteImageLoading, setIsDeleteImageLoading] = useState(false);
    const fileInputRef = useRef(null);

    const initialTooltip = selectedShape[0]?.attrs?.htmlData?.tooltip || "";
    const initialShowBackground = selectedShape[0]?.attrs?.htmlData?.showBackground || false;
    const initialImageSize = selectedShape[0]?.attrs?.htmlData?.imageSize || "medium";
    const initialImageProperties = selectedShape[0]?.attrs?.htmlData?.imageProperties || "fit-to-frame";
    const initialImageData = selectedShape[0]?.attrs?.htmlData?.spotlightImage || null;

    const form = useForm({
        resolver: zodResolver(spotlightSchema),
        defaultValues: {
            tooltip: initialTooltip,
            showBackground: initialShowBackground,
            imageSize: initialImageSize,
            imageProperties: initialImageProperties,
            spotlightImage: initialImageData
        },
        mode: "onChange"
    });

    useEffect(() => {
        if (selectedShape[0]?.attrs?.htmlData) {
            const htmlData = selectedShape[0]?.attrs?.htmlData;
            const newTooltip = htmlData.tooltip || "";
            const newShowBackground = htmlData.showBackground || false;
            const newImageSize = htmlData.imageSize || "medium";
            const newImageProperties = htmlData.imageProperties || "fit-to-frame";
            const newSpotlightImage = htmlData.spotlightImage || null;

            form.setValue("tooltip", newTooltip);
            form.setValue("showBackground", newShowBackground);
            form.setValue("imageSize", newImageSize);
            form.setValue("imageProperties", newImageProperties);
            form.setValue("spotlightImage", newSpotlightImage);

            if (newSpotlightImage) {
                setHasImage(true);
                setImageData(newSpotlightImage);
            } else {
                setHasImage(false);
                setImageData(null);
            }
        } else {
            form.setValue("tooltip", "");
            form.setValue("showBackground", false);
            form.setValue("imageSize", "medium");
            form.setValue("imageProperties", "fit-to-frame");
            form.setValue("spotlightImage", null);

            setHasImage(false);
            setImageData(null);
        }
    }, [selectedShape, form]);

    const updateMainStage = (data) => {
        const output = {
            data: {
                action: "spotlight",
                tooltip: data.tooltip,
                showBackground: data.showBackground,
                imageSize: data.imageSize,
                imageProperties: data.imageProperties,
                spotlightImage: data.spotlightImage
            }
        };
        addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
    };

    const handleInputChange = (field, value) => {
        form.setValue(field, value);
        const values = form.getValues();
        updateMainStage(values);
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
                form.setValue("spotlightImage", newImageData);

                mainStage[selectedIndex].stageref.current.children[0].children[1].children.find(e => {
                    if (e.attrs.id === selectedShape[0].attrs.id) {
                        e.attrs.htmlData = {
                            ...e.attrs.htmlData,
                            spotlightImage: newImageData
                        }
                        e.attrs.htmlType = selectedShape[0].attrs.htmlType;
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
                    delete e.attrs.htmlData.spotlightImage;
                }
            });
            mainStage[selectedIndex].shapes = mainStage[selectedIndex].stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) || [];
            const temp = JSON.parse(JSON.stringify(mainStage[selectedIndex]))
            temp.selectedShapes = [];
            temp.stageref = null;
            setMainStage([...mainStage]);

            setHasImage(false);
            setImageData(null);
            form.setValue("spotlightImage", null);
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

    return (
        <>
            <Form {...form}>
                <FormField
                    control={form.control}
                    name="tooltip"
                    render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="spotlight-tooltip" className="text-xs">Tooltip</Label>
                            <FormControl>
                                <Input
                                    id="spotlight-tooltip"
                                    placeholder="Spotlight"
                                    className="placeholder:text-[#d8dce3]"
                                    {...field}
                                    onChange={(e) => handleInputChange("tooltip", e.target.value)}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {hasImage && imageData && (
                    <>
                        <FormField
                            control={form.control}
                            name="showBackground"
                            render={({ field }) => (
                                <FormItem className="flex items-center gap-2 space-y-0 py-2">
                                    <FormControl>
                                        <Checkbox
                                            id="show-bg"
                                            className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
                                            checked={field.value}
                                            onCheckedChange={(checked) => handleInputChange("showBackground", checked)}
                                        />
                                    </FormControl>
                                    <Label htmlFor="show-bg" className="text-sm font-medium leading-none">
                                        Show background
                                    </Label>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="imageSize"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <Label className="text-xs">
                                        Image size
                                    </Label>
                                    <FormControl>
                                        <ToggleGroup
                                            id="image-size"
                                            type="single"
                                            variant="outline"
                                            value={field.value}
                                            onValueChange={(value) => {
                                                if (value) handleInputChange("imageSize", value);
                                            }}
                                            className="w-fit"
                                        >
                                            <ToggleGroupItem
                                                value="small"
                                                className="h-8 px-4 text-xs rounded-full focus:ring-0 focus:ring-offset-0"
                                            >
                                                Small
                                            </ToggleGroupItem>
                                            <ToggleGroupItem
                                                value="medium"
                                                className="h-8 px-4 text-xs rounded-full focus:ring-0 focus:ring-offset-0"
                                            >
                                                Medium
                                            </ToggleGroupItem>
                                            <ToggleGroupItem
                                                value="large"
                                                className="h-8 px-4 text-xs rounded-full focus:ring-0 focus:ring-offset-0"
                                            >
                                                Large
                                            </ToggleGroupItem>
                                        </ToggleGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="imageProperties"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <Label className="text-xs">
                                        Image properties
                                    </Label>
                                    <FormControl>
                                        <ToggleGroup
                                            id="image-properties"
                                            type="single"
                                            variant="outline"
                                            value={field.value}
                                            onValueChange={(value) => {
                                                if (value) handleInputChange("imageProperties", value);
                                            }}
                                            className="w-fit"
                                        >
                                            <ToggleGroupItem
                                                value="fit-to-frame"
                                                className="h-8 px-4 text-xs rounded-full focus:ring-0 focus:ring-offset-0"
                                            >
                                                Fit to frame
                                            </ToggleGroupItem>
                                            <ToggleGroupItem
                                                value="scale-to-fill"
                                                className="h-8 px-4 text-xs rounded-full focus:ring-0 focus:ring-offset-0"
                                            >
                                                Scale to fill
                                            </ToggleGroupItem>
                                        </ToggleGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <div className="space-y-1">
                            <Label className="text-xs">
                                Image preview
                            </Label>
                            {isUploading ? (
                                <SingleFileUploadSkeleton />
                            ) : (
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2 items-center w-[80%]">
                                        <img
                                            src={imageData.url}
                                            className="w-[50px] h-[40px] object-cover rounded-sm"
                                            alt="Spotlight"
                                        />
                                        <p className="text-sm truncate">{imageData.name}</p>
                                    </div>
                                    <Button variant="ghost" onClick={confirmDeleteImage}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </>
                )}

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
                    {
                        isUploading ? <LoadingButton buttonLabel="Uploading" /> : "Upload images"
                    }
                </Button>
            </Form>

            <ConfirmationDialog
                isConfirmModalOpen={isConfirmModalOpen}
                setIsConfirmModalOpen={setIsConfirmModalOpen}
                title="Delete Spotlight Image"
                description="Are you sure you want to delete this spotlight image?"
                onConfirm={handleDeleteImage}
                isLoading={isDeleteImageLoading}
            />
        </>
    );
}