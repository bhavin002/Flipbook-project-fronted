import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterSlider } from "@/components/ui/filterSlider";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Trash2, GripVertical } from "lucide-react";
import { useState } from "react";
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

export default function SlideShow() {
    const [imageSize, setImageSize] = useState("medium");
    const [imagePropertie, setImagePropertie] = useState("fit-to-frame");
    const [imagesUploaded, setImagesUploaded] = useState([]);
    const [showBackground, setShowBackground] = useState(false);
    const [hideControls, setHideControls] = useState(false);
    const [autoplaySlideshow, setAutoplaySlideshow] = useState(false);
    const [slideDuration, setSlideDuration] = useState([5]);

    // Sample images - in a real app these would come from file uploads
    const sampleImages = [
        { id: '1', name: 'Image 1.jpg', url: 'https://cdn.flipsnack.com/collections/uploads/1500b2e0589f1cb5dcdbab1f49929443_t' },
        { id: '2', name: 'Image 2.jpg', url: 'https://cdn.flipsnack.com/collections/uploads/1500b2e0589f1cb5dcdbab1f49929443_t' },
        { id: '3', name: 'Image 3.jpg', url: 'https://cdn.flipsnack.com/collections/uploads/1500b2e0589f1cb5dcdbab1f49929443_t' },
    ];

    const handleUploadImage = () => {
        if (imagesUploaded.length === 0) {
            setImagesUploaded(sampleImages);
        } else {
            // In a real implementation, this would handle adding new images
            const newId = (Math.max(...imagesUploaded.map(img => parseInt(img.id))) + 1).toString();
            setImagesUploaded([
                ...imagesUploaded,
                {
                    id: newId,
                    name: `Image ${newId}.jpg`,
                    url: 'https://cdn.flipsnack.com/collections/uploads/1500b2e0589f1cb5dcdbab1f49929443_t'
                }
            ]);
        }
    };

    const handleDeleteImage = (id) => {
        setImagesUploaded(imagesUploaded.filter(image => image.id !== id));
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
            setImagesUploaded((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Label className="text-lg">SlideShow</Label>
            {imagesUploaded.length > 0 && (
                <>
                    <div className="py-2 space-y-2">
                        <div className="flex items-center gap-1">
                            <Checkbox
                                id="hide-controls"
                                checked={hideControls}
                                onCheckedChange={setHideControls}
                                className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
                            />
                            <Label htmlFor="hide-controls" className="text-sm font-medium leading-none">
                                Hide controls
                            </Label>
                        </div>
                        <div className="flex items-center gap-1">
                            <Checkbox
                                id="autoplay-slideshow"
                                checked={autoplaySlideshow}
                                onCheckedChange={setAutoplaySlideshow}
                                className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
                            />
                            <Label htmlFor="autoplay-slideshow" className="text-sm font-medium leading-none">
                                Autoplay slideshow
                            </Label>
                        </div>

                        {autoplaySlideshow && (
                            <div>
                                <Label className="text-xs">
                                    Slide duration in seconds
                                </Label>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <FilterSlider
                                            value={slideDuration}
                                            onValueChange={setSlideDuration}
                                            max={10}
                                            min={0}
                                            step={1}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="w-16">
                                        <div className="border rounded flex items-center justify-between px-2 py-1">
                                            <span>{slideDuration}</span>
                                            <div className="flex flex-col">
                                                <button
                                                    className="h-3 flex items-center justify-center"
                                                    onClick={() => setSlideDuration([Math.min(slideDuration[0] + 1, 10)])}
                                                >
                                                    <span className="text-xs">▲</span>
                                                </button>
                                                <button
                                                    className="h-3 flex items-center justify-center"
                                                    onClick={() => setSlideDuration([Math.max(slideDuration[0] - 1, 0)])}
                                                >
                                                    <span className="text-xs">▼</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">
                            Image properties
                        </Label>
                        <ToggleGroup
                            id="image-properties"
                            type="single"
                            variant="outline"
                            value={imagePropertie}
                            onValueChange={(value) => {
                                if (value) setImagePropertie(value);
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
                    </div>
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
                                    items={imagesUploaded.map(img => img.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {imagesUploaded.map((image) => (
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
                </>
            )}
            <div className="pt-1">
                <Button
                    className="text-black hover:text-primary"
                    variant="outline"
                    onClick={handleUploadImage}
                >
                    Upload images
                </Button>
            </div>
        </div>
    )
}