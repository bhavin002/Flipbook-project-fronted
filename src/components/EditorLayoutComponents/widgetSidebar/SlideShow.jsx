import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterSlider } from "@/components/ui/filterSlider";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Trash2, GripVertical } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "sonner";
import { addIntercationDataToMainStage } from "@/utils/Helper";
import { DeleteSingleMediaApi, UploadMultipleMediaApi } from "@/service/widgetMedia.service";
import ConfirmationDialog from "@/utils/ConfirmationDialog";
import LoadingButton from "@/utils/LoadingButton";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';

const slideshowSchema = z.object({
    hideControls: z.boolean().default(false).optional(),
    autoplaySlideshow: z.boolean().default(false).optional(),
    slideDuration: z.array(z.number()).default([5]).optional(),
    imageProperties: z.enum(["fit-to-frame", "scale-to-fill"]).default("fit-to-frame"),
    images: z.array(z.object({
        fileId: z.string(),
        url: z.string(),
        name: z.string()
    })).default([])
});

function SortableImageItem({ image, onDelete, isLoading }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: image.fileId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center justify-between`}
        >
            <div className="flex gap-2 items-center w-[80%]">
                <button
                    className="cursor-grab focus:outline-none"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical className="h-4 w-4 text-gray-400" />
                </button>
                <img src={image.url} className="w-[50px] h-[40px] object-cover rounded-sm" alt={image.fileName} />
                <p className="text-sm truncate">{image.fileName}</p>
            </div>
            <Button variant="ghost" onClick={() => onDelete(image.fileId)} disabled={isLoading}>
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default function SlideShow({ mainStage, setMainStage, selectedShape, selectedIndex }) {
    const [isUploading, setIsUploading] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [deleteImageId, setDeleteImageId] = useState(null);
    const [isDeleteImageLoading, setIsDeleteImageLoading] = useState(false);
    const fileInputRef = useRef(null);

    const initialHideControls = selectedShape[0]?.attrs?.htmlData?.hideControls || false;
    const initialAutoplay = selectedShape[0]?.attrs?.htmlData?.autoplaySlideshow || false;
    const initialSlideDuration = selectedShape[0]?.attrs?.htmlData?.slideDuration || [5];
    const initialImageProperties = selectedShape[0]?.attrs?.htmlData?.imageProperties || "fit-to-frame";
    const initialImages = selectedShape[0]?.attrs?.htmlData?.images || [];

    const form = useForm({
        resolver: zodResolver(slideshowSchema),
        defaultValues: {
            hideControls: initialHideControls,
            autoplaySlideshow: initialAutoplay,
            slideDuration: initialSlideDuration,
            imageProperties: initialImageProperties,
            images: initialImages
        },
        mode: "onChange"
    });

    useEffect(() => {
        if (selectedShape[0]?.attrs?.htmlData) {
            const htmlData = selectedShape[0]?.attrs?.htmlData;
            const newHideControls = htmlData.hideControls || false;
            const newAutoplay = htmlData.autoplaySlideshow || false;
            const newSlideDuration = htmlData.slideDuration || [5];
            const newImageProperties = htmlData.imageProperties || "fit-to-frame";
            const newImages = htmlData.images || [];

            form.setValue("hideControls", newHideControls);
            form.setValue("autoplaySlideshow", newAutoplay);
            form.setValue("slideDuration", newSlideDuration);
            form.setValue("imageProperties", newImageProperties);
            form.setValue("images", newImages);
        } else {
            form.setValue("hideControls", false);
            form.setValue("autoplaySlideshow", false);
            form.setValue("slideDuration", [5]);
            form.setValue("imageProperties", "fit-to-frame");
            form.setValue("images", []);
        }
    }, [selectedShape, form]);

    const updateMainStage = (data) => {
        const output = {
            data: {
                hideControls: data.hideControls,
                autoplaySlideshow: data.autoplaySlideshow,
                slideDuration: data.slideDuration,
                imageProperties: data.imageProperties,
                images: data.images
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
        const files = e.target.files;
        if (!files.length) return;

        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('files', file);
        });

        if (files.length > 0) {
            setIsUploading(true);
            try {
                const response = await UploadMultipleMediaApi(formData);
                const imageResponseData = response.data;

                const currentImages = form.getValues("images") || [];
                const newImages = [...currentImages, ...imageResponseData];

                form.setValue("images", newImages);
                handleInputChange("images", newImages);

                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
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

    const confirmDeleteImage = (id) => {
        setDeleteImageId(id);
        setIsConfirmModalOpen(true);
    };

    const handleDeleteImage = async () => {
        if (!deleteImageId) return;

        try {
            setIsDeleteImageLoading(true);
            await DeleteSingleMediaApi(deleteImageId);

            const currentImages = form.getValues("images") || [];
            const updatedImages = currentImages.filter(image => image.fileId !== deleteImageId);

            form.setValue("images", updatedImages);
            handleInputChange("images", updatedImages);

            setIsConfirmModalOpen(false);
        } catch (error) {
            toast.error("Failed to delete image", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsDeleteImageLoading(false);
            setDeleteImageId(null);
        }
    };

    // DnD setup
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            const currentImages = form.getValues("images") || [];
            const oldIndex = currentImages.findIndex(item => item.fileId === active.id);
            const newIndex = currentImages.findIndex(item => item.fileId === over.id);

            const reorderedImages = arrayMove(currentImages, oldIndex, newIndex);
            form.setValue("images", reorderedImages);
            handleInputChange("images", reorderedImages);
        }
    }
    
    const handleSlideDurationChange = (value) => {
        handleInputChange("slideDuration", value);
    };

    const handleSlideDurationIncrement = () => {
        const currentValue = form.getValues("slideDuration")[0];
        const newValue = Math.min(currentValue + 1, 10);
        handleInputChange("slideDuration", [newValue]);
    };

    const handleSlideDurationDecrement = () => {
        const currentValue = form.getValues("slideDuration")[0];
        const newValue = Math.max(currentValue - 1, 0);
        handleInputChange("slideDuration", [newValue]);
    };

    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Label className="text-lg">SlideShow</Label>
            
            <Form {...form}>
                {form.getValues("images").length > 0 && (
                    <>
                        <div className="py-2 space-y-2">
                            <FormField
                                control={form.control}
                                name="hideControls"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-1 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                id="hide-controls"
                                                className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
                                                checked={field.value}
                                                onCheckedChange={(checked) => handleInputChange("hideControls", checked)}
                                            />
                                        </FormControl>
                                        <Label htmlFor="hide-controls" className="text-sm font-medium leading-none">
                                            Hide controls
                                        </Label>
                                    </FormItem>
                                )}
                            />
                            
                            <FormField
                                control={form.control}
                                name="autoplaySlideshow"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-1 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                id="autoplay-slideshow"
                                                className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
                                                checked={field.value}
                                                onCheckedChange={(checked) => handleInputChange("autoplaySlideshow", checked)}
                                            />
                                        </FormControl>
                                        <Label htmlFor="autoplay-slideshow" className="text-sm font-medium leading-none">
                                            Autoplay slideshow
                                        </Label>
                                    </FormItem>
                                )}
                            />

                            {form.watch("autoplaySlideshow") && (
                                <FormField
                                    control={form.control}
                                    name="slideDuration"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <Label className="text-xs">
                                                Slide duration in seconds
                                            </Label>
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1">
                                                    <FormControl>
                                                        <FilterSlider
                                                            value={field.value}
                                                            onValueChange={handleSlideDurationChange}
                                                            max={10}
                                                            min={0}
                                                            step={1}
                                                            className="w-full"
                                                        />
                                                    </FormControl>
                                                </div>
                                                <div className="w-16">
                                                    <div className="border rounded flex items-center justify-between px-2 py-1">
                                                        <span>{field.value[0]}</span>
                                                        <div className="flex flex-col">
                                                            <button
                                                                type="button"
                                                                className="h-3 flex items-center justify-center"
                                                                onClick={handleSlideDurationIncrement}
                                                            >
                                                                <span className="text-xs">▲</span>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="h-3 flex items-center justify-center"
                                                                onClick={handleSlideDurationDecrement}
                                                            >
                                                                <span className="text-xs">▼</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>
                        
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
                            <div className="space-y-2">
                                <DndContext
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragEnd={handleDragEnd}
                                    modifiers={[restrictToVerticalAxis]}
                                >
                                    <SortableContext
                                        items={form.getValues("images").map(img => img.fileId)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {form.getValues("images").map((image) => (
                                            <SortableImageItem
                                                key={image.fileId}
                                                image={image}
                                                onDelete={confirmDeleteImage}
                                                isLoading={isDeleteImageLoading && deleteImageId === image.fileId}
                                            />
                                        ))}
                                    </SortableContext>
                                </DndContext>
                            </div>
                        </div>
                    </>
                )}

                <div className="pt-1">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                    />
                    <Button
                        className="text-black hover:text-primary"
                        variant="outline"
                        onClick={handleUploadImage}
                        disabled={isUploading}
                    >
                        {isUploading ? <LoadingButton buttonLabel="Uploading" /> : "Upload images"}
                    </Button>
                </div>
            </Form>

            <ConfirmationDialog
                isConfirmModalOpen={isConfirmModalOpen}
                setIsConfirmModalOpen={setIsConfirmModalOpen}
                title="Delete Image"
                description="Are you sure you want to delete this image?"
                onConfirm={handleDeleteImage}
                isLoading={isDeleteImageLoading}
            />
        </div>
    );
}