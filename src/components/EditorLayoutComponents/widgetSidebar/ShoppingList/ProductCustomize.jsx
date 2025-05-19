import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Camera, PanelBottom, Pencil } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useRef, useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormItem, FormField } from "@/components/ui/form";
import { addIntercationDataToMainStage } from "@/utils/Helper";

// Zod schema for validation
const COLOR_PATTERN = /^#[0-9A-Fa-f]{6}$/;
const URL_PATTERN = /^(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\/[a-zA-Z0-9_\-.~!*'();:@&=+$,/?%#[\]]*)?$/;

const customizeSchema = z.object({
    buttonLabel: z
        .string()
        .trim()
        .min(1, { message: "Button label is required" })
        .max(50, { message: "Button label must be 50 characters or less" }),
    buttonColor: z
        .string()
        .trim()
        .regex(COLOR_PATTERN, { message: "Invalid hex color format (e.g., #ffffff)" }),
    labelColor: z
        .string()
        .trim()
        .regex(COLOR_PATTERN, { message: "Invalid hex color format (e.g., #ffffff)" }),
    tooltip: z
        .string()
        .trim()
        .min(1, { message: "Tooltip is required" })
        .max(100, { message: "Tooltip must be 100 characters or less" }),
    secondaryButton: z.boolean(),
    secondaryButtonLink: z
        .string()
        .trim()
        .optional()
        .refine(
            (val) => !val || URL_PATTERN.test(val),
            { message: "Please enter a valid URL format" }
        ),
    secondaryButtonLabel: z
        .string()
        .trim()
        .min(1, { message: "Secondary button label is required" })
        .max(50, { message: "Secondary button label must be 50 characters or less" }),
});

export default function ProductCustomize({
    mainStage,
    setMainStage,
    selectedShape,
    selectedIndex,
    setIsProductDialogOpen,
}) {
    const initialData = selectedShape[0]?.attrs?.htmlData?.customizeButton || {
        buttonLabel: "Shop this item",
        buttonColor: "#ffffff",
        labelColor: "#000000",
        tooltip: "Click to view this product",
        secondaryButton: false,
        secondaryButtonLink: "",
        secondaryButtonLabel: "View more",
    };

    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isTouched, setIsTouched] = useState({
        buttonLabel: false,
        buttonColor: false,
        labelColor: false,
        tooltip: false,
        secondaryButtonLink: false,
        secondaryButtonLabel: false,
    });

    const buttonColorInputRef = useRef(null);
    const labelColorInputRef = useRef(null);

    const form = useForm({
        resolver: zodResolver(customizeSchema),
        defaultValues: {
            buttonLabel: initialData.buttonLabel,
            buttonColor: initialData.buttonColor,
            labelColor: initialData.labelColor,
            tooltip: initialData.tooltip,
            secondaryButton: initialData.secondaryButton,
            secondaryButtonLink: initialData.secondaryButtonLink,
            secondaryButtonLabel: initialData.secondaryButtonLabel,
        },
        mode: "onChange",
    });

    const { watch, formState } = form;
    const formValues = watch();

    useEffect(() => {
        if (selectedShape[0]?.attrs?.htmlData?.customizeButton) {
            const newData = selectedShape[0]?.attrs?.htmlData?.customizeButton;
            form.setValue("buttonLabel", newData.buttonLabel, { shouldValidate: true });
            form.setValue("buttonColor", newData.buttonColor, { shouldValidate: true });
            form.setValue("labelColor", newData.labelColor, { shouldValidate: true });
            form.setValue("tooltip", newData.tooltip, { shouldValidate: true });
            form.setValue("secondaryButton", newData.secondaryButton, { shouldValidate: true });
            form.setValue("secondaryButtonLink", newData.secondaryButtonLink, { shouldValidate: true });
            form.setValue("secondaryButtonLabel", newData.secondaryButtonLabel, { shouldValidate: true });
            setIsTouched({
                buttonLabel: false,
                buttonColor: false,
                labelColor: false,
                tooltip: false,
                secondaryButtonLink: false,
                secondaryButtonLabel: false,
            });
        } else {
            form.reset({
                buttonLabel: "Shop this item",
                buttonColor: "#ffffff",
                labelColor: "#000000",
                tooltip: "Click to view this product",
                secondaryButton: false,
                secondaryButtonLink: "",
                secondaryButtonLabel: "View more",
            });
            setIsTouched({
                buttonLabel: false,
                buttonColor: false,
                labelColor: false,
                tooltip: false,
                secondaryButtonLink: false,
                secondaryButtonLabel: false,
            });
        }
    }, [selectedShape, form]);

    useEffect(() => {
        setIsFormValid(formState.isValid);
    }, [formState]);

    const updateMainStage = (data) => {
        if (!isFormValid) return;
        const output = {
            data: {
                action: "customize-button",
                customizeButton: {
                    buttonLabel: data.buttonLabel,
                    buttonColor: data.buttonColor,
                    labelColor: data.labelColor,
                    tooltip: data.tooltip,
                    secondaryButton: data.secondaryButton,
                    secondaryButtonLink: data.secondaryButtonLink,
                    secondaryButtonLabel: data.secondaryButtonLabel,
                },
            },
        };
        addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
    };

    const onSubmit = (data) => {
        if (isFormValid) {
            updateMainStage(data);
        }
    };

    const handleButtonColorClick = () => {
        setIsColorPickerOpen(true);
        setTimeout(() => buttonColorInputRef.current?.click(), 10);
    };

    const handleLabelColorClick = () => {
        setIsColorPickerOpen(true);
        setTimeout(() => labelColorInputRef.current?.click(), 10);
    };

    const handleInputChange = (fieldName, value) => {
        if (!isTouched[fieldName]) {
            setIsTouched((prev) => ({ ...prev, [fieldName]: true }));
        }
        form.setValue(fieldName, value, { shouldValidate: true });
    };

    const handleColorChange = (fieldName, value) => {
        if (!isTouched[fieldName]) {
            setIsTouched((prev) => ({ ...prev, [fieldName]: true }));
        }
        form.setValue(fieldName, value, { shouldValidate: true });
        if (formState.isValid) {
            updateMainStage({ ...formValues, [fieldName]: value });
        }
    };

    const handleSwitchChange = (checked) => {
        form.setValue("secondaryButton", checked, { shouldValidate: true });
        if (isFormValid) {
            updateMainStage({ ...formValues, secondaryButton: checked });
        }
    };

    return (
        <Tabs defaultValue="open-overlay" className="w-full">
            <TabsList className="w-full">
                <TabsTrigger className="items-center gap-2 w-full" value="open-overlay">
                    <span className="text-xs">Open overlay</span>
                </TabsTrigger>
                <TabsTrigger className="items-center gap-2 w-full" value="add-directly">
                    <span className="text-xs">Add directly to list</span>
                </TabsTrigger>
            </TabsList>
            <div className="flex-grow overflow-y-auto w-full">
                <TabsContent value="open-overlay" className="my-2 border rounded-sm">
                    <div className="flex gap-2 p-2">
                        {selectedShape[0].attrs.htmlData.productImage ? (
                            <img
                                src={selectedShape[0].attrs.htmlData.productImage}
                                className="w-[80px] h-[80px] rounded-[4px]"
                            />
                        ) : (
                            <div className="flex w-[100px] h-[80px] rounded-[4px] items-center justify-center border">
                                <Camera className="w-10 h-10" />
                            </div>
                        )}
                        <div className="flex flex-col gap-1 w-full justify-around">
                            <p className="text-sm font-semibold">
                                {selectedShape[0].attrs.htmlData.productTitle || "Untitled product"}
                            </p>
                            <p className="text-sm text-gray-50">{selectedShape[0].attrs.htmlData.sku || ""}</p>
                            <Button
                                size="sm"
                                variant="outline"
                                className="w-full text-black hover:text-primary"
                                onClick={() => setIsProductDialogOpen(true)}
                            >
                                <Pencil /> Edit product
                            </Button>
                        </div>
                    </div>
                    <Separator />
                    <Accordion type="single" collapsible className="mx-2">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <div className="flex gap-2 items-center">
                                    <PanelBottom className="w-5 h-5" /> Customize shop button
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-2">
                                <Form {...form}>
                                    <FormField
                                        control={form.control}
                                        name="buttonLabel"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label htmlFor="primary-button-label" className="text-xs">
                                                    Button label
                                                </Label>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        id="primary-button-label"
                                                        placeholder="Shop this item"
                                                        className={`placeholder:text-[#d8dce3] ${isTouched.buttonLabel && formState.errors.buttonLabel
                                                                ? "border-red-500 focus:outline-none focus-visible:ring-0"
                                                                : ""
                                                            }`}
                                                        value={field.value}
                                                        onChange={(e) => handleInputChange("buttonLabel", e.target.value)}
                                                        onBlur={() => {
                                                            setIsTouched((prev) => ({ ...prev, buttonLabel: true }));
                                                            if (isFormValid) {
                                                                form.handleSubmit(onSubmit)();
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="buttonColor"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label className="text-xs">Button color</Label>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type="text"
                                                            value={field.value}
                                                            onChange={(e) => handleInputChange("buttonColor", e.target.value)}
                                                            className={`pr-12 ${isTouched.buttonColor && formState.errors.buttonColor
                                                                    ? "border-red-500 focus:outline-none focus-visible:ring-0"
                                                                    : ""
                                                                }`}
                                                            onBlur={() => {
                                                                setIsTouched((prev) => ({ ...prev, buttonColor: true }));
                                                                if (isFormValid) {
                                                                    form.handleSubmit(onSubmit)();
                                                                }
                                                            }}
                                                        />
                                                        <div
                                                            className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded cursor-pointer"
                                                            style={{ backgroundColor: field.value }}
                                                            onClick={handleButtonColorClick}
                                                        />
                                                        {isColorPickerOpen && (
                                                            <input
                                                                ref={buttonColorInputRef}
                                                                type="color"
                                                                value={field.value}
                                                                onChange={(e) => handleColorChange("buttonColor", e.target.value)}
                                                                onBlur={() => {
                                                                    setIsTouched((prev) => ({ ...prev, buttonColor: true }));
                                                                    if (isFormValid) {
                                                                        form.handleSubmit(onSubmit)();
                                                                    }
                                                                }}
                                                                className="opacity-0 absolute w-1 h-1 right-3 top-1/2 -translate-y-1/2"
                                                            />
                                                        )}
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="labelColor"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label className="text-xs">Label color</Label>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type="text"
                                                            value={field.value}
                                                            onChange={(e) => handleInputChange("labelColor", e.target.value)}
                                                            className={`pr-12 ${isTouched.labelColor && formState.errors.labelColor
                                                                    ? "border-red-500 focus:outline-none focus-visible:ring-0"
                                                                    : ""
                                                                }`}
                                                            onBlur={() => {
                                                                setIsTouched((prev) => ({ ...prev, labelColor: true }));
                                                                if (isFormValid) {
                                                                    form.handleSubmit(onSubmit)();
                                                                }
                                                            }}
                                                        />
                                                        <div
                                                            className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded cursor-pointer"
                                                            style={{ backgroundColor: field.value }}
                                                            onClick={handleLabelColorClick}
                                                        />
                                                        {isColorPickerOpen && (
                                                            <input
                                                                ref={labelColorInputRef}
                                                                type="color"
                                                                value={field.value}
                                                                onChange={(e) => handleColorChange("labelColor", e.target.value)}
                                                                onBlur={() => {
                                                                    setIsTouched((prev) => ({ ...prev, labelColor: true }));
                                                                    if (isFormValid) {
                                                                        form.handleSubmit(onSubmit)();
                                                                    }
                                                                }}
                                                                className="opacity-0 absolute w-1 h-1 right-3 top-1/2 -translate-y-1/2"
                                                            />
                                                        )}
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="tooltip"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label htmlFor="primary-button-tooltip" className="text-xs">
                                                    Tooltip
                                                </Label>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        id="primary-button-tooltip"
                                                        placeholder="Click to view this product"
                                                        className={`placeholder:text-[#d8dce3] ${isTouched.tooltip && formState.errors.tooltip
                                                                ? "border-red-500 focus:outline-none focus-visible:ring-0"
                                                                : ""
                                                            }`}
                                                        value={field.value}
                                                        onChange={(e) => handleInputChange("tooltip", e.target.value)}
                                                        onBlur={() => {
                                                            setIsTouched((prev) => ({ ...prev, tooltip: true }));
                                                            if (isFormValid) {
                                                                form.handleSubmit(onSubmit)();
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="secondaryButton"
                                        render={({ field }) => (
                                            <FormItem className="ml-3 py-2">
                                                <div className="flex items-center gap-2">
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={handleSwitchChange}
                                                            className="data-[state=checked]:bg-violet-600"
                                                        />
                                                    </FormControl>
                                                    <Label className="text-sm">Secondary button</Label>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="secondaryButtonLink"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label htmlFor="button-link" className="text-xs">
                                                    Button link
                                                </Label>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        id="button-link"
                                                        placeholder="https://example.com/example"
                                                        className={`placeholder:text-[#d8dce3] ${isTouched.secondaryButtonLink && formState.errors.secondaryButtonLink
                                                                ? "border-red-500 focus:outline-none focus-visible:ring-0"
                                                                : ""
                                                            }`}
                                                        value={field.value}
                                                        onChange={(e) => handleInputChange("secondaryButtonLink", e.target.value)}
                                                        onBlur={() => {
                                                            setIsTouched((prev) => ({ ...prev, secondaryButtonLink: true }));
                                                            if (isFormValid) {
                                                                form.handleSubmit(onSubmit)();
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="secondaryButtonLabel"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label htmlFor="secondary-button-label" className="text-xs">
                                                    Secondary button label
                                                </Label>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        id="secondary-button-label"
                                                        placeholder="View more"
                                                        className={`placeholder:text-[#d8dce3] ${isTouched.secondaryButtonLabel && formState.errors.secondaryButtonLabel
                                                                ? "border-red-500 focus:outline-none focus-visible:ring-0"
                                                                : ""
                                                            }`}
                                                        value={field.value}
                                                        onChange={(e) => handleInputChange("secondaryButtonLabel", e.target.value)}
                                                        onBlur={() => {
                                                            setIsTouched((prev) => ({ ...prev, secondaryButtonLabel: true }));
                                                            if (isFormValid) {
                                                                form.handleSubmit(onSubmit)();
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </Form>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </TabsContent>
                <TabsContent value="add-directly" className="my-2 border rounded-sm">
                    <div className="flex gap-2 p-2">
                        {selectedShape[0].attrs.htmlData.productImage ? (
                            <img
                                src={selectedShape[0].attrs.htmlData.productImage}
                                className="w-[80px] h-[80px] rounded-[4px]"
                            />
                        ) : (
                            <div className="flex w-[100px] h-[80px] rounded-[4px] items-center justify-center border">
                                <Camera className="w-10 h-10" />
                            </div>
                        )}
                        <div className="flex flex-col gap-1 w-full justify-around">
                            <p className="text-sm font-semibold">
                                {selectedShape[0].attrs.htmlData.productTitle || "Untitled product"}
                            </p>
                            <p className="text-sm text-gray-50">{selectedShape[0].attrs.htmlData.sku || ""}</p>
                            <Button
                                size="sm"
                                variant="outline"
                                className="w-full text-black hover:text-primary"
                                onClick={() => setIsProductDialogOpen(true)}
                            >
                                <Pencil /> Edit product
                            </Button>
                        </div>
                    </div>
                </TabsContent>
            </div>
        </Tabs>
    );
}