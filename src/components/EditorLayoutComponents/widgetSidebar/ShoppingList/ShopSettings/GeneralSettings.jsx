
import { Button } from "@/components/ui/button";
import { MailCheck, Plus, ShoppingBag, ShoppingCart, GripVertical, Trash2, CircleCheckBig, Smile, ShieldAlert } from "lucide-react";
import { Heart, Star, Info } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import CustomerDetailsFields from "./CustomerDetailsFields";

function SortableEmailField({ field, onDelete, onKeyChange }) {
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

export default function GeneralSettings() {
    const [emailOption, setEmailOption] = useState("simple");
    const [emailFields, setEmailFields] = useState([]);
    const [minimumOrderValue, setMinimumOrderValue] = useState(false);
    const [privacyLink, setPrivacyLink] = useState(false);

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
        <>
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
                            <div className="space-y-2">
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
                                            {emailFields.length > 0 && (
                                                <div className="flex mb-2 px-8">
                                                    <div className="flex-1">
                                                        <Label className="text-xs text-gray-500">Option</Label>
                                                    </div>
                                                    <div className="flex-1">
                                                        <Label className="text-xs text-gray-500">Email address</Label>
                                                    </div>
                                                </div>
                                            )}
                                            {emailFields.map((field) => (
                                                <SortableEmailField
                                                    key={field.id}
                                                    field={field}
                                                    onDelete={handleDeleteField}
                                                    onKeyChange={handleKeyChange}
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
            <Separator className="my-4" />
            <div className="space-y-4">
                <div className="flex gap-2 items-center">
                    <CircleCheckBig className="h-5 w-5" />  <span className="text-sm font-semibold">Confirmation modal</span>
                </div>
                <p className="text-sm text-gray-500">
                    Customise the message buyers see after sending an order.
                </p>
                <div className="flex items-center gap-2 ml-3">
                    <Checkbox
                        id="show-bg"
                    />
                    <Label htmlFor="show-bg" className="text-sm font-medium leading-none">
                        Show background
                    </Label>
                </div>
                <div>
                    <Label htmlFor="order-confirmation-message" className="text-xs">Order confirmation message</Label>
                    <Textarea
                        type="text"
                        id="order-confirmation-message"
                        defaultValue="Are you sure to confirm this order?"
                        placeholder="Thank you for ordering. We will contact you soon!"
                        className="resize-none"
                    />
                </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <ShoppingCart className="h-5 w-5" />  <span className="text-sm font-semibold">Minimum order value</span>
                    </div>
                    <Switch
                        checked={minimumOrderValue}
                        onCheckedChange={setMinimumOrderValue}
                    />
                </div>
                <p className="text-sm text-gray-500">
                    Require a minimum order amount before customers can complete their purchase.
                </p>
                {minimumOrderValue && <div>
                    <Label htmlFor="minimum-order-value" className="text-xs">Minimum order value (INR)</Label>
                    <Input
                        type="text"
                        id="minimum-order-value"
                    />
                </div>}
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
                <div className="flex gap-2 items-center">
                    <Smile className="h-5 w-5" /> <span className="text-sm font-semibold">Customer details</span>
                </div>
                <p className="text-sm text-gray-500">
                    Add the contact fields that you want your customers to complete before sending an order.
                </p>
                <div className="space-y-2">
                    <div>
                        <Label htmlFor="section-title" className="text-xs">Section title</Label>
                        <Input
                            type="text"
                            id="section-title"
                            defaultValue="Contact details"
                            placeholder="Contact details"
                        />
                    </div>
                    <div>
                        <Label htmlFor="section-description" className="text-xs">Description</Label>
                        <Textarea
                            id="section-description"
                            defaultValue="To send the order you must enter your contact details. Once we receive your order, we will get back to you as soon as possible."
                            placeholder="To send the order you must enter your contact details. Once we receive your order, we will get back to you as soon as possible."
                            className="resize-none"
                        />
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <Label htmlFor="min-max-quantity" className="text-gray-700">
                        Fields
                    </Label>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="h-4 w-4 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent
                                side="right"
                                align="center"
                                className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
                            >
                                <p className="text-sm">Select what information you want to collect from your buyers when they place an order.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <CustomerDetailsFields />
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <ShieldAlert className="h-5 w-5" />  <span className="text-sm font-semibold">Add Privacy Policy link</span>
                    </div>
                    <Switch
                        checked={privacyLink}
                        onCheckedChange={setPrivacyLink}
                    />
                </div>
                <p className="text-sm text-gray-500">
                    Having in mind applicable privacy laws and regulations, we recommend adding your privacy and policy link when collecting personal information.
                </p>
                {privacyLink && <div className="space-y-2">
                    <div>
                        <Label htmlFor="company-name" className="text-xs">Company name</Label>
                        <Input
                            type="text"
                            id="company-name"
                            placeholder="E.g. Flipsnack"
                        />
                    </div>
                    <div>
                        <Label htmlFor="privacy-policy" className="text-xs">Privacy Policy link</Label>
                        <Input
                            type="text"
                            id="privacy-policy"
                            placeholder="E.g. www.flipsnack.com/privacy-policy"
                        />
                    </div>
                </div>}
            </div>
        </>)
}