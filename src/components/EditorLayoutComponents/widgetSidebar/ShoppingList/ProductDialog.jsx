import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, GripVertical } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch";
import { useState, useRef } from "react";
import { Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
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
import AdvancedOptions from "./AdvancedOptions";
import { AddProductApi, ProductImageUploadApi, updateProductApi } from "@/service/product.service";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@/utils/LoadingButton";
import { useCurrency } from "@/context/CurrencyContext";
import { addIntercationDataToMainStage, restrictNumericInput } from "@/utils/Helper";

const stringToNumberOrNull = (value) => {
    if (value === "" || value === null || value === undefined) return null;
    const num = parseFloat(value);
    return isNaN(num) ? null : num;
};

const numberAsStringSchema = z
    .string()
    .regex(/^$|^[0-9]*\.?[0-9]*$/, "Only numbers are allowed")
    .transform(stringToNumberOrNull)
    .nullable();

const positiveNumberAsStringSchema = numberAsStringSchema.refine(
    (val) => val === null || val >= 0,
    {
        message: "Value must be a non-negative number",
    }
);

const strictlyPositiveNumberAsStringSchema = numberAsStringSchema.refine(
    (val) => val === null || val > 0,
    {
        message: "Value must be greater than 0.",
    }
);

const productSchema = z.object({
    productTitle: z.string().optional(),
    sku: z.string().optional(),
    description: z.string().optional(),
    currencyId: z.string().min(1, "Currency is required"),
    price: positiveNumberAsStringSchema,
    onSale: z.boolean(),
    discountPrice: positiveNumberAsStringSchema,
    images: z.array(z.object({
        imageId: z.string(),
    })).max(3, "Maximum 3 images allowed").optional().default([]),
    quantityOption: z.boolean(),
    enableMinMaxQuantity: z.boolean(),
    minQuantity: positiveNumberAsStringSchema,
    maxQuantity: positiveNumberAsStringSchema,
    restrictToMoqMultiples: z.boolean(),
    customizableProduct: z.boolean(),
    instructionMessage: z.string().optional(),
    instructionMessageRequired: z.boolean(),
    paidPersonalization: z.boolean(),
    pricingMethod: z.enum(["FLAT_FEE", "PER_CHAR"]).optional(),
    personalizationPrice: strictlyPositiveNumberAsStringSchema,
    charLimit: strictlyPositiveNumberAsStringSchema,
    productAttributes: z.array(z.object({
        attributeName: z.string().min(1, "Attribute name is required"),
        optionValues: z.array(z.string().min(1, "Option value is required")),
    })).optional().default([]),
    productVariants: z.array(z.object({
        variantName: z.string().min(1, "Variant name is required"),
        price: numberAsStringSchema,
        discountPrice: numberAsStringSchema,
        sku: z.string().optional(),
        visibility: z.boolean()
    })).optional().default([]),
    variantImages: z.union([
        z.object({
            selectedAttribute: z.string().optional(),
            attributeValues: z.array(
                z.object({
                    value: z.string().min(1, "Value is required"),
                    image: z.array(
                        z.object({
                            imageId: z.string().min(1, "Image ID is required"),
                        })
                    ).optional()
                })
            ).optional()
        }).optional(),
        z.literal(null)
    ])
}).superRefine((data, ctx) => {

    if (data.price !== null && data.discountPrice !== null && data.discountPrice > data.price) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Discount price cannot be greater than the original price",
            path: ["discountPrice"]
        });
    }

    if (data.quantityOption && data.enableMinMaxQuantity && data.restrictToMoqMultiples) {
        if (data.minQuantity === null || data.minQuantity <= 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "The max. value must be a multiple of the min.",
                path: ["minQuantity"]
            });
        }
        if (data.maxQuantity === null || data.maxQuantity <= 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "",
                path: ["maxQuantity"]
            });
        }
        if (
            data.minQuantity !== null &&
            data.maxQuantity !== null &&
            data.maxQuantity < data.minQuantity
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Maximum quantity must be greater than or equal to minimum quantity",
                path: ["maxQuantity"]
            });
        }
    }

    if (data.customizableProduct && !data.instructionMessage) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "This field cannot be left empty. Please enter a value.",
            path: ["instructionMessage"]
        });
    }

    if (data.customizableProduct && data.paidPersonalization) {
        if (data.personalizationPrice === null || data.personalizationPrice <= 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Value must be greater than 0.",
                path: ["personalizationPrice"]
            });
        }
        if (data.charLimit === null || data.charLimit <= 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Value must be greater than 0.",
                path: ["charLimit"]
            });
        }
    }
});

function SortableImageItem({ image, onDelete }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: image.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center justify-between ${isDragging ? 'bg-gray-50' : ''}`}
        >
            <div className="flex gap-2 items-center">
                <button
                    type="button"
                    className="cursor-grab focus:outline-none"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical className="h-4 w-4 text-gray-400" />
                </button>
                <img src={image.imageLink} className="w-[50px] h-[40px] object-cover rounded-sm" alt={image.name} />
                <p className="text-sm truncate">{image.name}</p>
            </div>
            <Button variant="ghost" onClick={() => onDelete(image.id)}>
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default function ProductDialog({
    mainStage, setMainStage, selectedShape, selectedIndex, isProductDialogOpen, setIsProductDialogOpen, productData
}) {
    const { currencies, loading } = useCurrency();
    const [productImages, setProductImages] = useState(productData?.images.map(img => ({
        id: img.imageId,
        imageLink: img.imageLink,
        name: img.name
    })) || []);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    const { register, handleSubmit, watch, setValue, formState: { errors }, clearErrors, reset } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            productTitle: productData?.productTitle || "",
            sku: productData?.sku || "",
            description: productData?.description || "",
            currencyId: productData?.currencyId || currencies[0]?.value || "",
            price: productData?.price?.toString() || "",
            onSale: !!productData?.discountPrice,
            discountPrice: productData?.discountPrice?.toString() || "",
            images: productData?.images.map(img => ({
                imageId: img.imageId,
            })),
            quantityOption: productData?.quantityOption || false,
            enableMinMaxQuantity: productData?.enableMinMaxQuantity || false,
            minQuantity: productData?.minQuantity?.toString() || "0",
            maxQuantity: productData?.maxQuantity?.toString() || "0",
            restrictToMoqMultiples: productData?.restrictToMoqMultiples || false,
            customizableProduct: productData?.customizableProduct || false,
            instructionMessage: productData?.instructionMessage || "",
            instructionMessageRequired: productData?.instructionMessageRequired || false,
            paidPersonalization: productData?.paidPersonalization || false,
            pricingMethod: productData?.pricingMethod || "FLAT_FEE",
            personalizationPrice: productData?.personalizationPrice?.toString() || "2.5",
            charLimit: productData?.charLimit?.toString() || "4",
            productAttributes: productData?.productAttributes,
            productVariants: productData?.productVariants.map(variant => ({
                variantName: variant.variantName,
                price: variant.price?.toString(),
                discountPrice: variant.discountPrice?.toString(),
                sku: variant.sku || "",
                visibility: variant.visibility
            })),
            variantImages: productData?.variantImages || null
        }
    });

    console.log("errors ??",errors)

    const onSale = watch("onSale");

    const handleNumberInputChange = (e, fieldName) => {
        let { value } = e.target;
        if (value === "") {
            setValue(fieldName, value);
            clearErrors(fieldName);
            return;
        }
        const isIntegerField = ["charLimit", "minQuantity", "maxQuantity"].includes(fieldName);
        const regex = isIntegerField ? /^[0-9]*$/ : /^[0-9]*\.?[0-9]*$/;
        if (regex.test(value)) {
            setValue(fieldName, value);
            if (value !== "0" || !["minQuantity", "maxQuantity"].includes(fieldName)) {
                clearErrors(fieldName);
            }
        }
    };

    const handleDeleteImage = (id) => {
        const newImages = productImages.filter(image => image.id !== id);
        setProductImages(newImages);
        setValue("images", newImages.map(img => ({
            imageId: img.id
        })));
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
                const response = await ProductImageUploadApi(formData);
                const imageResponseData = response.data;
                const newImages = [...productImages, ...imageResponseData];
                setProductImages(newImages);
                setValue("images", newImages.map(img => ({
                    imageId: img.id,
                })));

                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            } catch (error) {
                toast.error("Upload failed", {
                    description: error.message || "Oops! Something went wrong.",
                });

                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            } finally {
                setIsUploading(false);
            }
        }
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
            setProductImages((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);
                setValue("images", newItems.map(img => ({
                    imageId: img.id,
                })));
                return newItems;
            });
        }
    }

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            let response;
            if (selectedShape[0].attrs?.htmlData?.variantId) {
                response = await updateProductApi(selectedShape[0].attrs?.htmlData?.variantId, data);
            } else {
                response = await AddProductApi(data);
            }

            const output = {
                data: {
                    variantId: response.data._id,
                    productTitle: response.data.productTitle,
                    sku: response.data.sku,
                    productImage: response.data.images[0]?.imageLink || "",
                    customizeButton: {
                        buttonLabel: "Shop this item",
                        buttonColor: "#ffffff",
                        labelColor: "#000000",
                        tooltip: "Click to view this product",
                        secondaryButton: false,
                        secondaryButtonLink: "",
                        secondaryButtonLabel: "View more"
                    }
                }
            };

            addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
            setIsProductDialogOpen(false);
        } catch (error) {
            toast.error("Failed to update or create product", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
            <DialogContent className="sm:max-w-[640px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Product Details</DialogTitle>
                    <DialogDescription className="sr-only">
                        Description
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="lg:max-h-[calc(100vh-150px)] max-lg:max-h-[calc(100vh-300px)] overflow-auto">
                        <div className="space-y-2 px-1">
                            <div className="flex gap-4">
                                <div className="w-[60%]">
                                    <Label htmlFor="product-title" className="text-xs">Product title</Label>
                                    <Input
                                        id="product-title"
                                        placeholder="ex. Product 1"
                                        {...register("productTitle")}
                                    />
                                </div>
                                <div className="w-[40%]">
                                    <Label htmlFor="sku" className="text-xs">SKU</Label>
                                    <Input
                                        id="sku"
                                        placeholder="ex. 123ABC"
                                        {...register("sku")}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="description" className="text-xs">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Description"
                                    className="resize-none"
                                    rows={4}
                                    {...register("description")}
                                />
                            </div>
                        </div>
                        <Separator className="my-5" />
                        <div className="space-y-4 px-1" >
                            <Label className="text-md font-semibold">Pricing</Label>
                            <div className="flex gap-4">
                                <div className="w-[50%]">
                                    <Label htmlFor="product-price" className={`text-xs ${errors.price ? "text-red-500" : ""}`}>
                                        Price
                                    </Label>
                                    <Input
                                        type="text"
                                        className={errors.price ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                                        id="product-price"
                                        {...register("price")}
                                        onChange={(e) => handleNumberInputChange(e, "price")}
                                        onKeyDown={(e) => restrictNumericInput(e, false)}
                                    />
                                    {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
                                </div>
                                <div className="w-[50%]">
                                    <div className='flex gap-2 items-center mt-1 mb-1'>
                                        <Label htmlFor="currency" className="text-xs">Currency</Label>
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
                                                    <p className="text-sm">The currency you select will apply to all products added in your catalog. If you change it, it will also change for all products.</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Select
                                        onValueChange={(value) => setValue("currencyId", value)}
                                        value={watch("currencyId")}
                                    >
                                        <SelectTrigger id="currency">
                                            <SelectValue placeholder="Select currency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {loading ? (
                                                <SelectItem value="loading" disabled>Loading...</SelectItem>
                                            ) : currencies.map(option => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.currencyId && <p className="text-red-500 text-xs">{errors.currencyId.message}</p>}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <Switch
                                        id="on-sale"
                                        checked={onSale}
                                        onCheckedChange={(checked) => setValue("onSale", checked)}
                                    />
                                    <Label htmlFor="on-sale" className="ml-3 text-gray-700">
                                        On sale
                                    </Label>
                                </div>
                                {onSale && (
                                    <div className="w-[50%]">
                                        <Label
                                            htmlFor="discount-product-price"
                                            className={`text-xs ${errors.discountPrice ? "text-red-500" : ""}`}
                                        >
                                            Discount price
                                        </Label>
                                        <Input
                                            type="text"
                                            className={errors.discountPrice ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                                            id="discount-product-price"
                                            {...register("discountPrice")}
                                            onChange={(e) => handleNumberInputChange(e, "discountPrice")}
                                            onKeyDown={(e) => restrictNumericInput(e, false)}
                                        />
                                        {errors.discountPrice && <p className="text-red-500 text-xs">{errors.discountPrice.message}</p>}
                                    </div>
                                )}
                            </div>
                        </div>
                        <Separator className="my-5" />
                        <div className="space-y-4 px-1">
                            <Label className="text-md font-semibold">Images ({productImages.length}/3)</Label>
                            <div className="space-y-2">
                                <DndContext
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragEnd={handleDragEnd}
                                    modifiers={[restrictToVerticalAxis]}
                                >
                                    <SortableContext
                                        items={productImages.map(img => img.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {productImages.map((image) => (
                                            <SortableImageItem
                                                key={image.id}
                                                image={image}
                                                onDelete={handleDeleteImage}
                                            />
                                        ))}
                                    </SortableContext>
                                </DndContext>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                multiple
                                className="hidden"
                            />
                            <Button
                                variant="outline"
                                type="button"
                                disabled={isUploading || productImages.length >= 3}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {isUploading ? "Uploading..." : "Upload images"}
                            </Button>
                            {errors.images && <p className="text-red-500 text-xs">{errors.images.message}</p>}
                        </div>
                        <Separator className="my-5" />
                        <AdvancedOptions
                            register={register}
                            watch={watch}
                            setValue={setValue}
                            errors={errors}
                            handleNumberInputChange={handleNumberInputChange}
                            clearErrors={clearErrors}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsProductDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <LoadingButton />
                                </>
                            ) : 'Save Product'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}