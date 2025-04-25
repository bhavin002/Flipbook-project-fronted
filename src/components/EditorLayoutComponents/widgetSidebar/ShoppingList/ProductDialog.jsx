import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { getData } from "@/utils/datas";
import { Plus, Trash2, GripVertical } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
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

// Sortable image item component
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
                    className="cursor-grab focus:outline-none"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical className="h-4 w-4 text-gray-400" />
                </button>
                <img src={image.url} className="w-[50px] h-[40px] object-cover rounded-sm" alt={image.name} />
                <p className="text-sm truncate">{image.name}</p>
            </div>
            <Button variant="ghost" onClick={() => onDelete(image.id)}>
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default function ProductDialog({
    isProductDialogOpen,
    setIsProductDialogOpen
}) {
    const [onSale, setIsSale] = useState(false);
    const currencyData = getData("currency") || [];

    // Added for image handling
    const [productImages, setProductImages] = useState([
        { id: '1', name: '152 (4).jpg', url: 'https://cdn.flipsnack.com/collections/uploads/1500b2e0589f1cb5dcdbab1f49929443_t' },
        { id: '2', name: '152 (4).jpg', url: 'https://cdn.flipsnack.com/collections/uploads/1500b2e0589f1cb5dcdbab1f49929443_t' },
        { id: '3', name: '152 (4).jpg', url: 'https://cdn.flipsnack.com/collections/uploads/1500b2e0589f1cb5dcdbab1f49929443_t' },
    ]);

    const handleDeleteImage = (id) => {
        setProductImages(productImages.filter(image => image.id !== id));
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
            setProductImages((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return (
        <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
            <DialogContent className="sm:max-w-[640px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Product details</DialogTitle>
                    <DialogDescription className="sr-only">
                        Description
                    </DialogDescription>
                </DialogHeader>
                <div className="lg:max-h-[calc(100vh-150px)] max-lg:max-h-[calc(100vh-300px)] overflow-y-auto">
                    <div className="space-y-2 px-1">
                        <div className="flex gap-4">
                            <div className="w-[60%]">
                                <Label htmlFor="product-title" className="text-xs">Product title</Label>
                                <Input
                                    type="text"
                                    id="product-title"
                                    placeholder="ex. Product 1"
                                />
                            </div>
                            <div className="w-[40%]">
                                <Label htmlFor="sku" className="text-xs">SKU</Label>
                                <Input
                                    type="text"
                                    id="sku"
                                    placeholder="ex. 123ABC"
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
                            />
                        </div>
                    </div>
                    <Separator className="my-5" />
                    <div className="space-y-4 px-1" >
                        <Label className="text-md font-semibold">Pricing</Label>
                        <div className="flex gap-4">
                            <div className="w-[50%]">
                                <Label htmlFor="product-price" className="text-xs">price</Label>
                                <Input
                                    type="text"
                                    id="product-price" />
                            </div>
                            <div className="w-[50%]">
                                <div className='flex gap-2 items-center mt-1 mb-1'>
                                    <Label htmlFor="sku" className="text-xs">Currency</Label>
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
                                <Select defaultValue="inr">
                                    <SelectTrigger id="currency" className="w-full">
                                        <SelectValue placeholder="Select currency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {currencyData.map(option => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Switch
                                    id="on-sale"
                                    checked={onSale}
                                    onCheckedChange={setIsSale}
                                />
                                <Label htmlFor="on-sale" className="ml-3 text-gray-700">
                                    On sale
                                </Label>
                            </div>
                            {onSale && <div className="w-[50%]">
                                <Label htmlFor="discount-product-price" className="text-xs">Discount price</Label>
                                <Input
                                    type="text"
                                    id="discount-product-price" />
                            </div>
                            }
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
                        <Button
                            variant="outline"
                            disabled={productImages.length >= 3}
                        >
                            Upload images
                        </Button>
                    </div>
                    <Separator className="my-5" />
                    <AdvancedOptions />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsProductDialogOpen(false)}>
                        Cancle
                    </Button>
                    <Button>
                        Save product
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}