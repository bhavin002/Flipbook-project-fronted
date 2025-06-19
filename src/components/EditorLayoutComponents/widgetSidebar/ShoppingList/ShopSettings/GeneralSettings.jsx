import React from 'react';
import { Button } from "@/components/ui/button";
import { MailCheck, Plus, ShoppingBag, ShoppingCart, Heart, Star, GripVertical, Trash2, CircleCheckBig, Smile, ShieldAlert, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import CustomerDetailsFields from "@/utils/CustomerDetailsFields";
import MaskInput from "@/utils/MaskInput";
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
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

function SortableEmailField({ field, index, form, onDelete }) {
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
                    {...form.register(`conditionalInboxOptions.${index}.option`)}
                    placeholder="Option name (e.g., Country)"
                />
                <FormMessage />
            </div>

            <div className="flex-1">
                <Input
                    type="text"
                    {...form.register(`conditionalInboxOptions.${index}.emails.0`)}
                    placeholder="Email address"
                />
                <FormMessage />
            </div>

            <Button
                variant="ghost"
                onClick={() => onDelete(index)}
                className="h-8 w-8 p-0"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default function GeneralSettings({ form, clearErrors }) {
    const { formState: { errors } } = form;
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const addEmailField = () => {
        const newField = {
            id: `field-${Date.now()}`,
            option: "",
            emails: [""],
        };
        form.setValue("conditionalInboxOptions", [...form.getValues("conditionalInboxOptions"), newField]);
    };

    const handleDeleteField = (index) => {
        const updatedFields = form.getValues("conditionalInboxOptions").filter((_, i) => i !== index);
        form.setValue("conditionalInboxOptions", updatedFields);
    };

    function handleDragEnd(event) {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const items = form.getValues("conditionalInboxOptions");
            const oldIndex = items.findIndex(item => item.id === active.id);
            const newIndex = items.findIndex(item => item.id === over.id);
            form.setValue("conditionalInboxOptions", arrayMove(items, oldIndex, newIndex));
        }
    }

    const handleMinimumOrderValueChange = (checked) => {
        clearErrors("minimumOrderValue");
        form.setValue("hasMinimumOrderValue", checked);
        if (!checked) {
            form.setValue("minimumOrderValue", 0);
        }
    };

    const handlePrivacyPolicyChange = (checked) => {
        clearErrors(["privacyPolicyCompanyName", "privacyPolicyLink"]);
        form.setValue("showPrivacyPolicy", checked);
        if (checked) {
            form.setValue("privacyPolicyCompanyName", "SG");
            form.setValue("privacyPolicyLink", "https://example.com/privacy");
        } else {
            form.setValue("privacyPolicyCompanyName", "");
            form.setValue("privacyPolicyLink", "");
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2 items-center">
                <MailCheck className="h-5 w-5" />
                <span className="text-sm font-semibold">Shop appearance</span>
            </div>
            <p className="text-sm text-gray-500">
                Change how the shop appears in your flipbook. E.g. shopping cart or wishlist.
            </p>
            <FormField
                control={form.control}
                name="shopAppearance"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <div className="flex justify-around items-center border rounded-md">
                                <Button
                                    variant={field.value === 1 ? "default" : "ghost"}
                                    className="w-full [&_svg]:size-5 border-r rounded-r-none"
                                    onClick={() => field.onChange(1)}
                                >
                                    <ShoppingBag />
                                </Button>
                                <Button
                                    variant={field.value === 2 ? "default" : "ghost"}
                                    className="w-full [&_svg]:size-5 border-r rounded-r-none"
                                    onClick={() => field.onChange(2)}
                                >
                                    <ShoppingCart />
                                </Button>
                                <Button
                                    variant={field.value === 3 ? "default" : "ghost"}
                                    className="w-full [&_svg]:size-5 border-r rounded-r-none"
                                    onClick={() => field.onChange(3)}
                                >
                                    <Heart />
                                </Button>
                                <Button
                                    variant={field.value === 4 ? "default" : "ghost"}
                                    className="w-full [&_svg]:size-5 border-r rounded-r-none"
                                    onClick={() => field.onChange(4)}
                                >
                                    <Star />
                                </Button>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Separator className="my-4" />
            <div className="space-y-4">
                <div className="flex gap-2 items-center">
                    <MailCheck className="h-5 w-5" />
                    <span className="text-sm font-semibold">Shop email</span>
                </div>
                <p className="text-sm text-gray-500">
                    Setup the way you wish to receive your orders.
                </p>
                <FormField
                    control={form.control}
                    name="shopEmailType"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <RadioGroup
                                    value={field.value.toString()}
                                    onValueChange={(value) => field.onChange(parseInt(value))}
                                    className="space-y-2"
                                >
                                    <div className="flex items-start space-x-2">
                                        <RadioGroupItem value="0" id="simple" />
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="simple" className="font-medium">Simple inbox</Label>
                                            <p className="text-sm text-gray-500">Add one or more email addresses, and ensure all parties receive the orders.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <RadioGroupItem value="1" id="conditional" />
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="conditional" className="font-medium">Conditional inbox</Label>
                                            <p className="text-sm text-gray-500">Do you want to receive orders on different email addresses based on buyer selection? Define your options below.</p>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {form.watch("shopEmailType") === 0 ? (
                    <FormField
                        control={form.control}
                        name="simpleInboxEmails"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs">Email <span>*</span></FormLabel>
                                <FormControl>
                                    <MaskInput
                                        value={field.value}
                                        onChange={(emails) => field.onChange(emails)}
                                        placeholder="Type email and press Enter"
                                        className={errors.simpleInboxEmails ? "border-red-500" : ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ) : (
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="conditionalInboxDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Tell buyers to select one of your options</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="E.g. Select location"
                                            {...field}
                                            className={errors.conditionalInboxDescription ? "border-red-500" : ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="space-y-2">
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                                modifiers={[restrictToVerticalAxis]}
                            >
                                <SortableContext
                                    items={form.getValues("conditionalInboxOptions").map(field => field.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {form.getValues("conditionalInboxOptions").length > 0 && (
                                        <div className="flex mb-2 px-8">
                                            <div className="flex-1">
                                                <Label className="text-xs text-gray-500">Option</Label>
                                            </div>
                                            <div className="flex-1">
                                                <Label className="text-xs text-gray-500">Email address</Label>
                                            </div>
                                        </div>
                                    )}
                                    {form.getValues("conditionalInboxOptions").map((field, index) => (
                                        <SortableEmailField
                                            key={field.id}
                                            field={field}
                                            index={index}
                                            form={form}
                                            onDelete={handleDeleteField}
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
            <Separator className="my-4" />
            <div className="space-y-4">
                <div className="flex gap-2 items-center">
                    <CircleCheckBig className="h-5 w-5" />
                    <span className="text-sm font-semibold">Confirmation modal</span>
                </div>
                <p className="text-sm text-gray-500">
                    Customise the message buyers see after sending an order.
                </p>
                <div className="flex items-center gap-2 ml-3">
                    <FormField
                        control={form.control}
                        name="showOrderNumber"
                        render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel className="text-sm font-medium">
                                    Show background
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="orderConfirmationMessage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xs">Order confirmation message</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Thank you for ordering. We will contact you soon!"
                                    className={`resize-none ${errors.orderConfirmationMessage ? "border-red-500" : ""}`}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="text-sm font-semibold">Minimum order value</span>
                    </div>
                    <Switch
                        checked={form.watch("hasMinimumOrderValue")}
                        onCheckedChange={handleMinimumOrderValueChange}
                    />
                </div>
                <p className="text-sm text-gray-500">
                    Require a minimum order amount before customers can complete their purchase.
                </p>
                {form.watch("hasMinimumOrderValue") && (
                    <FormField
                        control={form.control}
                        name="minimumOrderValue"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs">Minimum order value (INR)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                        className={errors.minimumOrderValue ? "border-red-500" : ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
                <div className="flex gap-2 items-center">
                    <Smile className="h-5 w-5" />
                    <span className="text-sm font-semibold">Customer details</span>
                </div>
                <p className="text-sm text-gray-500">
                    Add the contact fields that you want your customers to complete before sending an order.
                </p>
                <FormField
                    control={form.control}
                    name="contactTitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xs">Section title</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Contact details"
                                    {...field}
                                    className={errors.contactTitle ? "border-red-500" : ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contactDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xs">Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="To send the order you must enter your contact details."
                                    className={`resize-none ${errors.contactDescription ? "border-red-500" : ""}`}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex gap-2 items-center'>
                    <Label className="text-gray-700">Fields</Label>
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
                <CustomerDetailsFields form={form} />
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <ShieldAlert className="h-5 w-5" />
                        <span className="text-sm font-semibold">Add Privacy Policy link</span>
                    </div>
                    <Switch
                        checked={form.watch("showPrivacyPolicy")}
                        onCheckedChange={handlePrivacyPolicyChange}
                    />
                </div>
                <p className="text-sm text-gray-500">
                    Having in mind applicable privacy laws and regulations, we recommend adding your privacy and policy link when collecting personal information.
                </p>
                {form.watch("showPrivacyPolicy") && (
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="privacyPolicyCompanyName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Company name <span>*</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="E.g. SG"
                                            {...field}
                                            className={errors.privacyPolicyCompanyName ? "border-red-500" : ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="privacyPolicyLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Privacy Policy link <span>*</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="E.g. https://example.com/privacy"
                                            {...field}
                                            className={errors.privacyPolicyLink ? "border-red-500" : ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}