
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical } from "lucide-react";
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
            className={`flex items-center justify-between`}
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


export default function ProductTag() {
    const [productImages, setProductImages] = useState([]);
    // Sample images - in a real app these would come from file uploads
    const sampleImages = [
        { id: '1', name: 'Image 1.jpg', url: 'https://cdn.flipsnack.com/collections/uploads/1500b2e0589f1cb5dcdbab1f49929443_t' },
        { id: '2', name: 'Image 2.jpg', url: 'https://cdn.flipsnack.com/collections/uploads/1500b2e0589f1cb5dcdbab1f49929443_t' },
        { id: '3', name: 'Image 3.jpg', url: 'https://cdn.flipsnack.com/collections/uploads/1500b2e0589f1cb5dcdbab1f49929443_t' },
    ];

    const handleUploadImage = () => {
        if (productImages.length === 0) {
            setProductImages(sampleImages);
        } else {
            // In a real implementation, this would handle adding new images
            const newId = (Math.max(...productImages.map(img => parseInt(img.id))) + 1).toString();
            setProductImages([
                ...productImages,
                {
                    id: newId,
                    name: `Image ${newId}.jpg`,
                    url: 'https://cdn.flipsnack.com/collections/uploads/1500b2e0589f1cb5dcdbab1f49929443_t'
                }
            ]);
        }
    };

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
        <div className="p-6 space-y-2 w-full">
            <Label className="text-lg">Product Tag</Label>
            <div className="space-y-2">
                <div>
                    <Label htmlFor="product-title" className="text-xs">Product title</Label>
                    <Input
                        type="text"
                        id="product-title"
                        defaultValue="My product title"
                        placeholder="My product title"
                        className="placeholder:text-[#d8dce3]" />
                </div>
                <div>
                    <Label htmlFor="product-description" className="text-xs">Product description</Label>
                    <Textarea
                        id="product-description"
                        placeholder="My product description"
                        defaultValue="My product description"
                        className="resize-none placeholder:text-gray-300"
                        rows={4}
                    />
                </div>
                <div className="flex justify-between">
                    <div>
                        <Label htmlFor="product-price" className="text-xs">Price</Label>
                        <Input
                            type="text"
                            id="product-price"
                            className="w-[100px]" />
                    </div>
                    <div>
                        <Label htmlFor="discount-price" className="text-xs">Discount price</Label>
                        <Input
                            type="text"
                            id="discount-price"
                            className="w-[100px]" />
                    </div>
                </div>
                <div>
                    <Label htmlFor="product-url" className="text-xs">Product URL</Label>
                    <Input
                        type="text"
                        id="product-url"
                        defaultValue="http://www.mywebsite.com"
                        placeholder="http://www.mywebsite.com"
                        className="placeholder:text-[#d8dce3]" />
                </div>
                <div>
                    <Label htmlFor="button-label" className="text-xs">Button Label</Label>
                    <Input
                        type="text"
                        id="button-label"
                        defaultValue="Shop this item"
                        placeholder="Shop this item"
                        className="placeholder:text-[#d8dce3]" />
                </div>
                {
                    productImages.length > 0 && <div className="space-y-1">
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
                    </div>
                }
                <div className="pt-2">
                    <Button
                        className="text-black hover:text-primary"
                        variant="outline"
                        onClick={handleUploadImage}
                    >
                        Upload images
                    </Button>
                </div>
            </div>
        </div>
    )
}