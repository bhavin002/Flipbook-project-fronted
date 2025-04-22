import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreditCard, MailCheck, Plus, ShoppingBag, ShoppingCart, GripVertical, Trash2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Heart, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import MaskInputEmail from "@/utils/MaskInputEmail";
import { Input } from "@/components/ui/input";
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

// Sortable email field component
function SortableEmailField({ field, onDelete, onKeyChange, onValueChange }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: field.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-start gap-2 mb-3 ${isDragging ? 'bg-gray-50' : ''}`}
        >
            <button
                className="cursor-grab focus:outline-none"
                {...attributes}
                {...listeners}
            >
                <GripVertical className="h-4 w-4 text-gray-400 mt-2" />
            </button>

            <div className="flex-1">
                <Input
                    type="text"
                    value={field.key}
                    onChange={(e) => onKeyChange(field.id, e.target.value)}
                    placeholder="Option name (e.g., Country)"
                />
            </div>

            <div className="flex-1">
                <MaskInputEmail className="" />
            </div>

            <Button
                variant="ghost"
                onClick={() => onDelete(field.id)}
                className="h-8 w-8 p-0"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default function ShopSettings() {
    const [emailOption, setEmailOption] = useState("simple");
    const [emailFields, setEmailFields] = useState([]);

    // DnD setup
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const addEmailField = () => {
        const newId = `field-${Date.now()}`;
        const newField = {
            id: newId,
            key: "",
            value: "",
        };

        setEmailFields([...emailFields, newField]);
    };

    const handleDeleteField = (id) => {
        setEmailFields(emailFields.filter(field => field.id !== id));
    };

    const handleKeyChange = (id, newKey) => {
        setEmailFields(emailFields.map(field =>
            field.id === id ? { ...field, key: newKey } : field
        ));
    };

    const handleValueChange = (id, newValue) => {
        setEmailFields(emailFields.map(field =>
            field.id === id ? { ...field, value: newValue } : field
        ));
    };

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setEmailFields((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="w-full text-black hover:text-primary"
                    variant="outline"
                >
                    <CreditCard />
                    Shop settings
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[640px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Shop settings</DialogTitle>
                    <DialogDescription className="sr-only">
                        Description
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[calc(100vh-150px)] overflow-y-auto">
                    <Tabs defaultValue="general">
                        <TabsList>
                            <TabsTrigger value="general">
                                General
                            </TabsTrigger>
                            <TabsTrigger value="order-options">
                                Order options
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="general" className="my-4 px-2">
                            <div className="space-y-4">
                                <div className="flex gap-2 items-center">
                                    <MailCheck className="h-5 w-5" />  <span className="text-sm font-semibold">Shop appearance</span>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Change how the shop appears in your flipbook. E.g. shopping cart or wishlist.
                                </p>
                                <div className="flex justify-around items-center border rounded-md">
                                    <Button variant="ghost" className="w-full [&_svg]:size-5 border-r rounded-r-none">
                                        <ShoppingBag />
                                    </Button>
                                    <Button variant="ghost" className="w-full [&_svg]:size-5 border-r rounded-r-none">
                                        <ShoppingCart />
                                    </Button>
                                    <Button variant="ghost" className="w-full [&_svg]:size-5 border-r rounded-r-none">
                                        <Heart />
                                    </Button>
                                    <Button variant="ghost" className="w-full [&_svg]:size-5 border-r rounded-r-none">
                                        <Star />
                                    </Button>
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="space-y-4">
                                <div className="flex gap-2 items-center">
                                    <MailCheck className="h-5 w-5" /> <span className="text-sm font-semibold">Shop email</span>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Setup the way you wish to receive your orders.
                                </p>
                                <div className="space-y-2">
                                    <div className="ml-3">
                                        <RadioGroup
                                            value={emailOption}
                                            onValueChange={setEmailOption}
                                            className="space-y-2"
                                        >
                                            <div className="flex items-start space-x-2">
                                                <RadioGroupItem value="simple" id="simple" />
                                                <div className="grid gap-1.5">
                                                    <Label htmlFor="simple" className="font-medium">Simple inbox</Label>
                                                    <p className="text-sm text-gray-500">Add one or more email addresses, and ensure all parties receive the orders.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-2">
                                                <RadioGroupItem value="conditional" id="conditional" />
                                                <div className="grid gap-1.5">
                                                    <Label htmlFor="conditional" className="font-medium">Conditional inbox</Label>
                                                    <p className="text-sm text-gray-500">Do you want to receive orders on different email addresses based on buyer selection? Define your options below. <a className="text-sm font-medium text-purple-600 cursor-pointer hover:underline">Learn more</a></p>
                                                </div>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    <div>
                                        {emailOption === "simple" ? (
                                            <>
                                                <Label htmlFor="email" className="text-xs">
                                                    Email <span>*</span>
                                                </Label>
                                                <MaskInputEmail />
                                            </>
                                        ) : (
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="selection-option" className="text-xs">
                                                        Tell buyers to select one of your options
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        id="selection-option"
                                                        defaultValue="Country"
                                                        placeholder="E.g. Select location"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="mb-2">
                                                        <Label className="flex justify-between text-xs">
                                                            <span>Email options</span>
                                                        </Label>
                                                    </div>

                                                    <DndContext
                                                        sensors={sensors}
                                                        collisionDetection={closestCenter}
                                                        onDragEnd={handleDragEnd}
                                                        modifiers={[restrictToVerticalAxis]}
                                                    >
                                                        <SortableContext
                                                            items={emailFields.map(field => field.id)}
                                                            strategy={verticalListSortingStrategy}
                                                        >
                                                            {emailFields.map((field) => (
                                                                <SortableEmailField
                                                                    key={field.id}
                                                                    field={field}
                                                                    onDelete={handleDeleteField}
                                                                    onKeyChange={handleKeyChange}
                                                                    onValueChange={handleValueChange}
                                                                />
                                                            ))}
                                                        </SortableContext>
                                                    </DndContext>

                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={addEmailField}
                                                    >
                                                        <Plus className="mr-1 h-4 w-4" /> Add field
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
                <DialogFooter>
                    <Button variant="outline">
                        Cancel
                    </Button>
                    <Button>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}