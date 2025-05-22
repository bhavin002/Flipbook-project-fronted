import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import ProductAttributes from "./ProductAttributes";
import { restrictNumericInput } from "@/utils/Helper";
import { useRef } from "react";

export default function AdvancedOptions({ register, watch, setValue, errors, handleNumberInputChange, clearErrors }) {
    const quantityOption = watch("quantityOption");
    const minMaxQty = watch("enableMinMaxQuantity");
    const customizeProduct = watch("customizableProduct");
    const paidPersonalization = watch("paidPersonalization");
    const accordionRef = useRef(null);

    // Handle clearing fields and errors when switches are toggled off
    const handleQuantityOptionToggle = (checked) => {
        setValue("quantityOption", checked);
        if (!checked) {
            setValue("enableMinMaxQuantity", false);
            setValue("minQuantity", "0");
            setValue("maxQuantity", "0");
            setValue("restrictToMoqMultiples", false);
            clearErrors(["minQuantity", "maxQuantity"]); // Clear errors for these fields
        }
    };

    const handleCustomizeProductToggle = (checked) => {
        setValue("customizableProduct", checked);
        if (!checked) {
            setValue("instructionMessage", "");
            setValue("instructionMessageRequired", false);
            setValue("paidPersonalization", false);
            setValue("pricingMethod", "FLAT_FEE");
            setValue("personalizationPrice", "2.5");
            setValue("charLimit", "4");
            clearErrors(["instructionMessage", "personalizationPrice", "charLimit"]); // Clear errors for these fields
        }
    };

    const handlePaidPersonalizationToggle = (checked) => {
        setValue("paidPersonalization", checked);
        if (!checked) {
            setValue("pricingMethod", "FLAT_FEE");
            setValue("personalizationPrice", "2.5");
            setValue("charLimit", "4");
            clearErrors(["personalizationPrice", "charLimit"]); // Clear errors for these fields
        }
    };

    // Handle accordion open/close with smooth scroll
    const handleAccordionChange = (value) => {
        if (value === "item-1" && accordionRef.current) {
            setTimeout(() => {
                accordionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        }
    };

    return (
        <div className="space-y-4" ref={accordionRef}>
            <Accordion 
                type="single" 
                collapsible 
                className="w-full"
                onValueChange={handleAccordionChange}
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-md pt-0 pl-1 font-semibold" iconClassName="text-black">
                        Advanced options
                    </AccordionTrigger>
                    <AccordionContent>
                        {/* Rest of the content remains the same */}
                        <div className="space-y-4 px-1">
                            <div className="flex justify-between">
                                <Label className="text-sm">Quantity options</Label>
                                <Switch
                                    checked={quantityOption}
                                    onCheckedChange={handleQuantityOptionToggle}
                                />
                            </div>
                            <p className="text-sm">
                                Set limits on product quantities with minimum and maximum options.
                                Minimum is least amount that can be bought. Maximum is most.
                            </p>
                            {quantityOption && <>
                                <div className='flex gap-2 items-center'>
                                    <Switch
                                        id="min-max-quantity"
                                        checked={minMaxQty}
                                        onCheckedChange={(checked) => setValue("enableMinMaxQuantity", checked)}
                                    />
                                    <Label htmlFor="min-max-quantity" className="ml-3 text-gray-700">
                                        Enable min/max quantity
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
                                                <p className="text-sm">The currency you select will apply to all products added in your catalog. If you change it, it will also change for all products.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                {minMaxQty && <>
                                    <div className="flex gap-4">
                                        <div className="w-[50%]">
                                            <Label htmlFor="minimum-quantity" className={`text-xs ${errors.minQuantity ? "text-red-500" : ""}`}>Minimum</Label>
                                            <Input
                                                type="text"
                                                id="minimum-quantity"
                                                className={errors.minQuantity ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                                                {...register("minQuantity")}
                                                onChange={(e) => handleNumberInputChange(e, "minQuantity")}
                                                onKeyDown={(e) => restrictNumericInput(e, true)}
                                            />
                                            {errors.minQuantity && <p className="text-red-500 text-xs">{errors.minQuantity.message}</p>}
                                        </div>
                                        <div className="w-[50%]">
                                            <Label htmlFor="maximum-quantity" className={`text-xs ${errors.maxQuantity ? "text-red-500" : ""}`}>Maximum</Label>
                                            <Input
                                                type="text"
                                                id="maximum-quantity"
                                                className={errors.maxQuantity ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                                                {...register("maxQuantity")}
                                                onChange={(e) => handleNumberInputChange(e, "maxQuantity")}
                                                onKeyDown={(e) => restrictNumericInput(e, true)}
                                            />
                                            {errors.maxQuantity && <p className="text-red-500 text-xs">{errors.maxQuantity.message}</p>}
                                        </div>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <Switch
                                            id="restrict-mcq-multiples"
                                            checked={watch("restrictToMoqMultiples")}
                                            onCheckedChange={(checked) => setValue("restrictToMoqMultiples", checked)}
                                        />
                                        <Label htmlFor="restrict-mcq-multiples" className="ml-3 text-gray-700">
                                            Restrict to MOQ multiples
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
                                                    <p className="text-sm">Enforce orders for this personally added product to be multiples of the Minimum Order Quantity (MOQ). E.g. If the MOQ is 100, acceptable order quantities include 100, 200, 300, etc.</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </>}
                            </>}
                        </div>
                        <Separator className="my-5" />
                        <div className="space-y-4 px-1">
                            <div className="flex justify-between">
                                <Label className="text-sm">Customizable product</Label>
                                <Switch
                                    checked={customizeProduct}
                                    onCheckedChange={handleCustomizeProductToggle}
                                />
                            </div>
                            <p className="text-sm">
                                Do you sell customizable products like mugs, street name cards, etc.? Use this option.
                            </p>
                            {customizeProduct && <>
                                <div className="space-y-1">
                                    <div className='flex gap-2 items-center'>
                                        <Label htmlFor="personalization-instructions" className={`text-xs ${errors.instructionMessage ? "text-red-500" : ""}`}>
                                            Personalization instructions for buyers
                                        </Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info color={errors.instructionMessage ? "red" : "black"} className="h-4 w-4 cursor-pointer" />
                                                </TooltipTrigger>
                                                <TooltipContent
                                                    side="right"
                                                    align="center"
                                                    className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
                                                >
                                                    <p className="text-sm">Provide details for how customers should customize this product (e.g., name, message, or other instructions).</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="personalization-instructions"
                                        className={errors.instructionMessage ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                                        {...register("instructionMessage")}
                                    />
                                    {errors.instructionMessage && <p className="text-red-500 text-xs">{errors.instructionMessage.message}</p>}
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    <Checkbox
                                        id="personalization-required"
                                        checked={watch("instructionMessageRequired")}
                                        onCheckedChange={(checked) => setValue("instructionMessageRequired", checked)}
                                    />
                                    <Label htmlFor="personalization-required" className="text-sm font-medium leading-none">
                                        Make personalization required
                                    </Label>
                                </div>
                                <div className="flex justify-between">
                                    <Label className="text-sm mt-2">Paid personalization</Label>
                                    <Switch
                                        checked={paidPersonalization}
                                        onCheckedChange={handlePaidPersonalizationToggle}
                                    />
                                </div>
                                <p className="text-sm">
                                    Activate paid personalization to let customers add custom text for an additional fee.
                                </p>
                                {paidPersonalization && <div>
                                    <div className="flex gap-4">
                                        <div className="w-[36%]">
                                            <Label className="text-xs">Select pricing method</Label>
                                            <Select
                                                onValueChange={(value) => setValue("pricingMethod", value)}
                                                defaultValue="FLAT_FEE"
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a pricing method" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="FLAT_FEE">
                                                            <div className="flex gap-1">
                                                                Flat fee
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
                                                                            <p className="text-sm">Same price for any text length of the custom text</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="PER_CHAR">
                                                            <div className="flex gap-1">
                                                                Per character
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
                                                                            <p className="text-sm">Set a price per character, spaces are ignored </p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </div>
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            {errors.pricingMethod && <p className="text-red-500 text-xs">{errors.pricingMethod.message}</p>}
                                        </div>
                                        <div className="w-[32%]">
                                            <Label htmlFor="paid-personalization-price" className={`text-xs ${errors.personalizationPrice ? "text-red-500" : ""}`}>Price (USD)</Label>
                                            <Input
                                                type="text"
                                                id="paid-personalization-price"
                                                className={errors.personalizationPrice ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                                                {...register("personalizationPrice")}
                                                onChange={(e) => handleNumberInputChange(e, "personalizationPrice")}
                                                onKeyDown={(e) => restrictNumericInput(e, true)}
                                            />
                                            {errors.personalizationPrice && <p className="text-red-500 text-xs">{errors.personalizationPrice.message}</p>}
                                        </div>
                                        <div className="w-[32%]">
                                            <Label htmlFor="paid-personalization-character-limit" className={`text-xs ${errors.charLimit ? "text-red-500" : ""}`}>Character limit</Label>
                                            <Input
                                                type="text"
                                                id="paid-personalization-character-limit"
                                                className={errors.charLimit ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                                                {...register("charLimit")}
                                                onChange={(e) => handleNumberInputChange(e, "charLimit")}
                                                onKeyDown={(e) => restrictNumericInput(e, true)}
                                            />
                                            {errors.charLimit && <p className="text-red-500 text-xs">{errors.charLimit.message}</p>}
                                        </div>
                                    </div>
                                </div>}
                            </>}
                        </div>
                        <Separator className="my-5" />
                        <div className="space-y-4 px-1">
                            <div className="flex justify-between">
                                <Label className="text-sm">Product attributes</Label>
                            </div>
                            <p className="text-sm">
                                Does your product come in different variations, like Size, Color or Material? Add them here.
                            </p>
                            <ProductAttributes
                                setValue={setValue}
                                errors={errors}
                                watch={watch}
                            />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}