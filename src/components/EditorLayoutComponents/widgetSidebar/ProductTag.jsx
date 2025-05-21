import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { addIntercationDataToMainStage } from "@/utils/Helper";
import { toast } from "sonner";
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

const URL_PATTERN = /^(https?:\/\/)([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\/[a-zA-Z0-9_\-.~!*'();:@&=+$,/?%#[\]]*)?$/;
const DOMAIN_PATTERN = /^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\/[a-zA-Z0-9_\-.~!*'();:@&=+$,/?%#[\]]*)?$/;

const productTagSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string(),
    price: z.number(),
    discountPrice: z.number(),
    productUrl: z.string()
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
    buttonLabel: z.string().default("Shop this item"),
    images: z.array(z.object({
        fileId: z.string(),
        url: z.string(),
        fileName: z.string()
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
                <img src={image.imageLink} className="w-[50px] h-[40px] object-cover rounded-sm" alt={image.fileName} />
                <p className="text-sm truncate">{image.fileName}</p>
            </div>
            <Button variant="ghost" onClick={() => onDelete(image.fileId)} disabled={isLoading}>
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default function ProductTag({ mainStage, setMainStage, selectedShape, selectedIndex }) {
    const [isUrlValid, setIsUrlValid] = useState(false);
    const [rawUrlValue, setRawUrlValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [deleteImageId, setDeleteImageId] = useState(null);
    const [isDeleteImageLoading, setIsDeleteImageLoading] = useState(false);
    const fileInputRef = useRef(null);
    
    const form = useForm({
        resolver: zodResolver(productTagSchema),
        defaultValues: {
            title: selectedShape?.[0]?.attrs?.htmlData?.title || "My product title",
            description: selectedShape?.[0]?.attrs?.htmlData?.description || "My product description",
            price: selectedShape?.[0]?.attrs?.htmlData?.price || "",
            discountPrice: selectedShape?.[0]?.attrs?.htmlData?.discountPrice || "",
            productUrl: selectedShape?.[0]?.attrs?.htmlData?.productUrl || "http://www.mywebsite.com",
            buttonLabel: selectedShape?.[0]?.attrs?.htmlData?.buttonLabel || "Shop this item",
            images: selectedShape?.[0]?.attrs?.htmlData?.images || []
        },
        mode: "onChange"
    });

    const { watch, formState } = form;
    const formValues = watch();

    useEffect(() => {
        if (selectedShape.length && selectedShape[0]?.attrs?.htmlData) {
            const htmlData = selectedShape[0]?.attrs?.htmlData;
            
            const newTitle = htmlData?.title || "My product title";
            const newDescription = htmlData?.description || "My product description";
            const newPrice = htmlData?.price || "";
            const newDiscountPrice = htmlData?.discountPrice || "";
            const newProductUrl = htmlData?.productUrl || "http://www.mywebsite.com";
            const newButtonLabel = htmlData?.buttonLabel || "Shop this item";
            const newImages = htmlData?.images || [];

            form.setValue("title", newTitle);
            form.setValue("description", newDescription);
            form.setValue("price", newPrice);
            form.setValue("discountPrice", newDiscountPrice);
            form.setValue("productUrl", newProductUrl);
            form.setValue("buttonLabel", newButtonLabel);
            form.setValue("images", newImages);
            
            setRawUrlValue(newProductUrl);
            
            if (URL_PATTERN.test(newProductUrl)) {
                setIsUrlValid(true);
            } else {
                setIsUrlValid(false);
            }
            
            setIsTouched(false);
        } else {
            form.setValue("title", "My product title");
            form.setValue("description", "My product description");
            form.setValue("price", "");
            form.setValue("discountPrice", "");
            form.setValue("productUrl", "http://www.mywebsite.com");
            form.setValue("buttonLabel", "Shop this item");
            form.setValue("images", []);
            
            setRawUrlValue("http://www.mywebsite.com");
            setIsUrlValid(true);
            setIsTouched(false);
        }
    }, [selectedShape, form]);

    useEffect(() => {
        setIsUrlValid(formState.isValid);
    }, [formState]);

    const updateMainStage = (data, skipUrlValidation = false) => {
        if (!skipUrlValidation && !isUrlValid) return;
        
        const output = {
            data: {
                title: data.title,
                description: data.description,
                price: data.price,
                discountPrice: data.discountPrice,
                productUrl: data.productUrl,
                buttonLabel: data.buttonLabel,
                images: data.images
            }
        };
        
        addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
    };

    const onSubmit = (data) => {
        if (isUrlValid) {
            updateMainStage(data);
        }
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
                updateMainStage({...form.getValues(), images: newImages}, true);

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
            updateMainStage({...form.getValues(), images: updatedImages}, true);

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

    const handleUrlChange = (e) => {
        if (!isTouched) {
            setIsTouched(true);
        }

        const value = e.target.value;
        setRawUrlValue(value);

        if (!value.startsWith('http://') && !value.startsWith('https://') && DOMAIN_PATTERN.test(value)) {
            form.setValue("productUrl", `https://${value}`, { shouldValidate: true });
        } else {
            form.setValue("productUrl", value, { shouldValidate: true });
        }
    };

    const handleInputChange = (field, value) => {
        form.setValue(field, value);
        setTimeout(() => {
            updateMainStage(form.getValues(), field !== "productUrl");
        }, 0);
    };

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
            updateMainStage({...form.getValues(), images: reorderedImages}, true);
        }
    }

    const showUrlError = isTouched && formState.errors.productUrl;

    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Label className="text-lg">Product Tag</Label>
            <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="product-title" className="text-xs">Product title</Label>
                                <FormControl>
                                    <Input
                                        type="text"
                                        id="product-title"
                                        placeholder="My product title"
                                        className="placeholder:text-[#d8dce3]"
                                        {...field}
                                        onChange={(e) => handleInputChange("title", e.target.value)}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="product-description" className="text-xs">Product description</Label>
                                <FormControl>
                                    <Textarea
                                        id="product-description"
                                        placeholder="My product description"
                                        className="resize-none placeholder:text-gray-300"
                                        rows={4}
                                        {...field}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    
                    <div className="flex justify-between">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="product-price" className="text-xs">Price</Label>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={0}
                                            id="product-price"
                                            className="w-[100px]"
                                            {...field}
                                            onChange={(e) => handleInputChange("price", e.target.value)}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="discountPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="discount-price" className="text-xs">Discount price</Label>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={0}
                                            id="discount-price"
                                            className="w-[100px]"
                                            {...field}
                                            onChange={(e) => handleInputChange("discountPrice", e.target.value)}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <FormField
                        control={form.control}
                        name="productUrl"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="product-url" className="text-xs">Product URL</Label>
                                <FormControl>
                                    <Input
                                        type="text"
                                        id="product-url"
                                        placeholder="http://www.mywebsite.com"
                                        className={`placeholder:text-[#d8dce3] ${showUrlError ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}`}
                                        value={rawUrlValue}
                                        onChange={handleUrlChange}
                                        onBlur={() => {
                                            setIsTouched(true);
                                            if (isUrlValid) {
                                                form.handleSubmit(onSubmit)();
                                                const formValue = form.getValues("productUrl");
                                                if (formValue !== rawUrlValue) {
                                                    setRawUrlValue(formValue);
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
                        name="buttonLabel"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="button-label" className="text-xs">Button Label</Label>
                                <FormControl>
                                    <Input
                                        type="text"
                                        id="button-label"
                                        placeholder="Shop this item"
                                        className="placeholder:text-[#d8dce3]"
                                        {...field}
                                        onChange={(e) => handleInputChange("buttonLabel", e.target.value)}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </Form>
            
            {form.getValues("images").length > 0 && (
                <div className="space-y-1">
                    <Label className="text-xs">
                        Product images
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
            )}
            
            <div className="pt-2">
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