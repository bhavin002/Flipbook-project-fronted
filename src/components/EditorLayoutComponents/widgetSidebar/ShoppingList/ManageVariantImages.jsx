import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, ChevronLeft, ChevronRight, Eye, EyeOff, GripVertical, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";
import { ProductImageUploadApi } from "@/service/product.service";

function SortableImageItem({ image, onDelete }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
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
            className={`flex items-center justify-between p-2 ${isDragging ? "bg-gray-50" : ""}`}
        >
            <div className="flex gap-2 items-center w-full">
                <button
                    type="button"
                    className="cursor-grab focus:outline-none flex-shrink-0"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical className="h-4 w-4 text-gray-400" />
                </button>
                <img
                    src={image.imageLink}
                    className="w-[50px] h-[40px] object-cover rounded-sm flex-shrink-0"
                    alt={image.name}
                />
                <p className="text-sm truncate flex-1 min-w-0">{image.name}</p>
                <Button variant="ghost" onClick={() => onDelete(image.id)} className="flex-shrink-0">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export default function ManageVariantImages({ attributes, variants, setValue, watch }) {
    console.log("watch ??", watch("variantImages"));
    const [selectedAttributeId, setSelectedAttributeId] = useState(attributes.find(attr => attr.name === watch("variantImages")?.selectedAttribute)?.id);
    const [selectedAttributeName, setSelectedAttributeName] = useState(watch("variantImages")?.selectedAttribute || "");
    const [isLinkImagesOpen, setIsLinkImagesOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [variantVisibility, setVariantVisibility] = useState({});
    const [optionImages, setOptionImages] = useState({});
    const [uploadingStates, setUploadingStates] = useState({});
    const [variantData, setVariantData] = useState([]); // Add local state to track variant data
    const fileInputRefs = useRef({});
    const rowsPerPage = 10;
    const maxImagesPerOption = 3;

    useEffect(() => {
        const initialVisibility = variants.reduce((acc, variant) => ({
            ...acc,
            [variant.variant]: variant.visibility ?? true,
        }), {});
        setVariantVisibility(initialVisibility);

        // Initialize local variant data
        const initialVariants = variants.map((variant) => ({
            variantName: variant.variant,
            price: variant.price || "",
            discountPrice: variant.discountPrice || "",
            sku: variant.sku || "",
            visibility: initialVisibility[variant.variant] ?? true,
        }));
        setVariantData(initialVariants);
        setValue("productVariants", initialVariants);
    }, [variants, setValue]);

    useEffect(() => {
        if (selectedAttributeId) {
            const selectedAttribute = attributes.find((attr) => attr.id === selectedAttributeId);
            if (selectedAttribute) {
                setSelectedAttributeName(selectedAttribute.name);
    
                // Get existing variantImages from watch
                const variantImages = watch("variantImages");
    
                setOptionImages((prev) => {
                    const initialOptionImages = {};
                    selectedAttribute.options.forEach((option) => {
                        // Check if this option has images in variantImages
                        const existingImages =
                            variantImages?.attributeValues
                                ?.find((attrVal) => attrVal.value === option)
                                ?.image.map((img) => ({
                                    id: img.imageId,
                                    imageLink: img.url,
                                    name: img.url.split("/").pop(), // Extract name from URL or adjust as needed
                                })) || [];
    
                        initialOptionImages[option] = existingImages.length > 0 ? existingImages : prev[option] || [];
                    });
                    return initialOptionImages;
                });
            }
        }
    }, [selectedAttributeId, attributes]);

    useEffect(() => {
        if (selectedAttributeId && selectedAttributeName) {
            const attributeValues = Object.entries(optionImages).map(([value, images]) => ({
                value,
                image: images.map((img) => ({
                    imageId: img.id,
                    url: img.imageLink,
                })),
            }));

            setValue("variantImages", {
                selectedAttribute: selectedAttributeName,
                attributeValues,
            });
        } else {
            setValue("variantImages", null);
        }
    }, [selectedAttributeId, selectedAttributeName, optionImages, setValue]);

    const attributesWithOptions = attributes.filter((attr) => attr.options.length > 0);
    const hasOptions = attributes.some((attr) => attr.options.length > 0);
    const selectedAttribute = attributes.find((attr) => attr.id === selectedAttributeId);
    const totalVariants = variants.length;
    const totalPages = Math.ceil(totalVariants / rowsPerPage);
    const paginatedVariants = variants.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const handleBackToProduct = useCallback(() => {
        setIsLinkImagesOpen(false);
    }, []);

    const toggleVariantVisibility = useCallback((variantName) => {
        setVariantVisibility((prev) => {
            const newVisibility = { ...prev, [variantName]: !prev[variantName] };

            // Update local variant data
            setVariantData(prevData => {
                const updatedVariants = prevData.map(variant => {
                    if (variant.variantName === variantName) {
                        return {
                            ...variant,
                            visibility: !prev[variantName]
                        };
                    }
                    return variant;
                });

                // Update form value
                setValue("productVariants", updatedVariants);

                return updatedVariants;
            });

            return newVisibility;
        });
    }, [setValue]);

    const handleAttributeChange = useCallback((value) => {
        if (value === "") {
            setSelectedAttributeId(null);
            setSelectedAttributeName("");
            setValue("variantImages", null);
        } else {
            const attribute = attributes.find((attr) => attr.id === value);
            setSelectedAttributeId(value);
            setSelectedAttributeName(attribute?.name || "");
        }
    }, [attributes, setValue]);

    // Handle variant data changes
    const handleVariantDataChange = useCallback((variantName, field, value) => {
        setVariantData(prevData => {
            const updatedVariants = prevData.map(variant => {
                if (variant.variantName === variantName) {
                    return {
                        ...variant,
                        [field]: value
                    };
                }
                return variant;
            });

            // Update form value
            setValue("productVariants", updatedVariants);

            return updatedVariants;
        });
    }, [setValue]);

    const handleFileChange = useCallback(async (e, option) => {
        const files = e.target.files;
        if (!files.length) return;

        const currentImageCount = optionImages[option]?.length || 0;
        const newImageCount = files.length;

        if (currentImageCount + newImageCount > maxImagesPerOption) {
            toast.error("Maximum 3 images allowed", {
                description: `You already have ${currentImageCount} image(s). You can upload up to ${maxImagesPerOption - currentImageCount} more.`,
            });
            if (fileInputRefs.current[option]) {
                fileInputRefs.current[option].value = "";
            }
            return;
        }

        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append("files", file);
        });

        if (files.length > 0) {
            setUploadingStates((prev) => ({ ...prev, [option]: true }));
            try {
                const response = await ProductImageUploadApi(formData);
                const imageResponseData = response.data;

                setOptionImages((prev) => ({
                    ...prev,
                    [option]: [...prev[option], ...imageResponseData],
                }));

                if (fileInputRefs.current[option]) {
                    fileInputRefs.current[option].value = "";
                }
            } catch (error) {
                toast.error("Upload failed", {
                    description: error.message || "Oops! Something went wrong.",
                });

                if (fileInputRefs.current[option]) {
                    fileInputRefs.current[option].value = "";
                }
            } finally {
                setUploadingStates((prev) => ({ ...prev, [option]: false }));
            }
        }
    }, [optionImages, maxImagesPerOption]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = useCallback((event, option) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setOptionImages((prev) => {
                const images = [...prev[option]];
                const oldIndex = images.findIndex((img) => img.id === active.id);
                const newIndex = images.findIndex((img) => img.id === over.id);
                const [movedImage] = images.splice(oldIndex, 1);
                images.splice(newIndex, 0, movedImage);
                return { ...prev, [option]: images };
            });
        }
    }, []);

    const handleDeleteImage = useCallback((option, imageId) => {
        setOptionImages((prev) => ({
            ...prev,
            [option]: prev[option].filter((img) => img.id !== imageId),
        }));
    }, []);

    return (
        <>
            {hasOptions && (
                <div className="space-y-2">
                    <Label className="text-lg font-semibold">Manage variant images</Label>
                    <p className="text-sm text-muted-foreground">
                        By default, product variations use parent images. Choose an attribute for custom variant images that link images to all associated variants.{" "}
                        <a className="text-primary cursor-pointer">Learn more</a>
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="w-32">
                            <Label>Select attribute</Label>
                        </div>
                        <div className="flex-1">
                            <Select
                                value={selectedAttributeId || ""}
                                onValueChange={handleAttributeChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select attribute" />
                                </SelectTrigger>
                                <SelectContent>
                                    {attributesWithOptions.map((attr) => (
                                        <SelectItem key={attr.id} value={attr.id}>
                                            {attr.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button
                            variant="default"
                            size="sm"
                            type="button"
                            disabled={!selectedAttributeId}
                            onClick={() => setIsLinkImagesOpen(true)}
                        >
                            <Plus className="mr-1 h-4 w-4" /> Link images
                        </Button>
                    </div>
                </div>
            )}

            {variants.length > 0 && (
                <div className="space-y-2 mt-4">
                    <Label className="text-lg font-semibold">Product variants</Label>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Variant</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Discount price</TableHead>
                                <TableHead>SKU</TableHead>
                                <TableHead>Visibility</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedVariants.map((variant, index) => {
                                // Find the corresponding data in our local state
                                const variantDataItem = variantData.find(v => v.variantName === variant.variant) || {
                                    price: variant.price || "",
                                    discountPrice: variant.discountPrice || "",
                                    sku: variant.sku || ""
                                };

                                return (
                                    <TableRow
                                        key={index}
                                        className={!variantVisibility[variant.variant] ? "bg-muted/50" : ""}
                                    >
                                        <TableCell className={!variantVisibility[variant.variant] ? "text-gray-500" : ""}>
                                            {variant.variant}
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                type="text"
                                                value={variantDataItem.price}
                                                className={`w-24 ${!variantVisibility[variant.variant] ? "bg-gray-50" : ""}`}
                                                disabled={!variantVisibility[variant.variant]}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    const numericValue = newValue === "" ? "" : parseFloat(newValue);
                                                    handleVariantDataChange(variant.variant, "price", numericValue);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                type="text"
                                                value={variantDataItem.discountPrice}
                                                className={`w-24 ${!variantVisibility[variant.variant] ? "bg-gray-50" : ""}`}
                                                disabled={!variantVisibility[variant.variant]}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    const numericValue = newValue === "" ? "" : parseFloat(newValue);
                                                    handleVariantDataChange(variant.variant, "discountPrice", numericValue);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                type="text"
                                                value={variantDataItem.sku}
                                                className={`w-24 ${!variantVisibility[variant.variant] ? "bg-gray-50" : ""}`}
                                                disabled={!variantVisibility[variant.variant]}
                                                onChange={(e) => {
                                                    handleVariantDataChange(variant.variant, "sku", e.target.value);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                type="button"
                                                onClick={() => toggleVariantVisibility(variant.variant)}
                                            >
                                                {variantVisibility[variant.variant] ? (
                                                    <Eye className="h-4 w-4" />
                                                ) : (
                                                    <EyeOff className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <div className="flex items-center justify-end">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                {`${(page - 1) * rowsPerPage + 1}-${Math.min(page * rowsPerPage, totalVariants)} of ${totalVariants}`}
                            </span>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                disabled={page === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                type="button"
                                size="sm"
                                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                                disabled={page === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <Dialog open={isLinkImagesOpen} onOpenChange={setIsLinkImagesOpen}>
                <DialogContent className="sm:max-w-[540px] w-[90vw] p-0 overflow-hidden">
                    <DialogHeader className="p-6 pb-2">
                        <DialogTitle className="text-xl font-semibold">Link Images</DialogTitle>
                    </DialogHeader>
                    <div className="px-6 py-2">
                        <p className="text-sm text-muted-foreground">
                            Upload up to 3 images per attribute option. The uploaded images will link to all the product variants that contain that option.
                        </p>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-1/3">Attribute option</TableHead>
                                    <TableHead className="w-2/3">Option images</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {selectedAttribute?.options.map((option, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="w-1/3">{option}</TableCell>
                                        <TableCell className="w-2/3">
                                            <DndContext
                                                sensors={sensors}
                                                collisionDetection={closestCenter}
                                                onDragEnd={(event) => handleDragEnd(event, option)}
                                                modifiers={[restrictToVerticalAxis]}
                                            >
                                                <SortableContext
                                                    items={(optionImages[option] || []).map((img) => img.id)}
                                                    strategy={verticalListSortingStrategy}
                                                >
                                                    <div className="space-y-2 mb-2 w-[330px]">
                                                        {(optionImages[option] || []).map((image) => (
                                                            <SortableImageItem
                                                                key={image.id}
                                                                image={image}
                                                                onDelete={() => handleDeleteImage(option, image.id)}
                                                            />
                                                        ))}
                                                    </div>
                                                </SortableContext>
                                            </DndContext>
                                            <input
                                                type="file"
                                                ref={(el) => (fileInputRefs.current[option] = el)}
                                                onChange={(e) => handleFileChange(e, option)}
                                                accept="image/*"
                                                multiple
                                                className="hidden"
                                            />
                                            <Button
                                                variant="outline"
                                                disabled={uploadingStates[option] || (optionImages[option]?.length >= maxImagesPerOption)}
                                                onClick={() => fileInputRefs.current[option]?.click()}
                                            >
                                                {uploadingStates[option] ? "Uploading..." : "Upload images"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <DialogFooter className="p-4 border-t">
                        <Button variant="outline" onClick={handleBackToProduct}>
                            <ChevronLeft className="mr-1 h-4 w-4" /> Back to product
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}