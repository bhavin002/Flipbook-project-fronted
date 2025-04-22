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
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox";
import ProductAttributes from "./ProductAttributes";
import { useState } from "react";

export default function AdvancedOptions() {
    const [qtyOption, setQtyOption] = useState(false);
    const [minMaxQty, setMinMaxQty] = useState(false);
    const [customizeProduct, setCustomizeProduct] = useState(false);
    const [paidPersonalization, setPaidPersonalization] = useState(false);
    return (
        <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-md pt-0 pl-1 font-semibold" iconClassName="text-black">
                        Advanced options
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 px-1">
                            <div className="flex justify-between">
                                <Label className="text-sm">Quantity options</Label>
                                <Switch
                                    checked={qtyOption}
                                    onCheckedChange={setQtyOption}
                                />
                            </div>
                            <p className="text-sm">
                                Set limits on product quantities with minimum and maximum options.
                                Minimum is least amount that can be bought. Maximum is most.
                            </p>
                            {
                                qtyOption && <>

                                    <div className='flex gap-2 items-center'>
                                        <Switch
                                            id="min-max-quantity"
                                            checked={minMaxQty}
                                            onCheckedChange={setMinMaxQty}
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
                                                <Label htmlFor="minimum-quantity" className="text-xs">Minimum</Label>
                                                <Input
                                                    type="number"
                                                    id="minimum-quantity"
                                                    defaultValue={4}
                                                    min={0}
                                                />
                                            </div>
                                            <div className="w-[50%]">
                                                <Label htmlFor="maximum-quantity" className="text-xs">Maximum</Label>
                                                <Input
                                                    type="number"
                                                    id="maximum-quantity"
                                                    defaultValue={20}
                                                    min={0}
                                                />
                                            </div>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <Switch id="restrict-mcq-multiples"
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
                                                        <p className="text-sm">Enforce orders for this product to be multiples of the Minimum Order Quantity (MOQ). E.g. If the MOQ is 100, acceptable order quantities include 100, 200,300, etc.</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </>
                                    }
                                </>
                            }
                        </div>
                        <Separator className="my-5" />
                        <div className="space-y-4 px-1">
                            <div className="flex justify-between">
                                <Label className="text-sm">Customizable product</Label>
                                <Switch
                                    checked={customizeProduct}
                                    onCheckedChange={setCustomizeProduct}
                                />
                            </div>
                            <p className="text-sm">
                                Do you sell customizable products like mugs, street name cards, etc.? Use this option.
                            </p>
                            {
                                customizeProduct && <>
                                    <div className="space-y-1">
                                        <div className='flex gap-2 items-center'>
                                            <Label htmlFor="personalization-instructions" className="text-xs">
                                                Personalization instructions for buyers
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
                                                        <p className="text-sm">Provide details for how customers should customize this product (e.g., name, message, or other instructions).</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                        <Input
                                            type="text"
                                            id="personalization-instructions"
                                            defaultValue="Write your message"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <Checkbox
                                            id="personalization-required"
                                        />
                                        <Label htmlFor="personalization-required" className="text-sm font-medium leading-none">
                                            Make personalization required.
                                        </Label>
                                    </div>
                                    <div className="flex justify-between">
                                        <Label className="text-sm mt-2">Paid personalization</Label>
                                        <Switch
                                            checked={paidPersonalization}
                                            onCheckedChange={setPaidPersonalization}
                                        />
                                    </div>
                                    <p className="text-sm">
                                        Activate paid personalization to let customers add custom text for an additional fee.
                                    </p>
                                    {paidPersonalization && <div>
                                        <div className="flex gap-4">
                                            <div className="w-[40%]">
                                                <Label className="text-xs">Select pricing method</Label>
                                                <Select defaultValue="flat-fee">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a layout view" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="flat-fee">
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
                                                            <SelectItem value="per-character">
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
                                            </div>
                                            <div className="w-[30%]">
                                                <Label htmlFor="paid-personalization-price" className="text-xs">Price (USD)</Label>
                                                <Input
                                                    type="number"
                                                    id="paid-personalization-price"
                                                    defaultValue={2.5}
                                                    min={0}
                                                />
                                            </div>
                                            <div className="w-[30%]">
                                                <Label htmlFor="paid-personalization-character-limit" className="text-xs">Character limit</Label>
                                                <Input
                                                    type="number"
                                                    id="paid-personalization-character-limit"
                                                    defaultValue={20}
                                                    min={0}
                                                />
                                            </div>
                                        </div>
                                    </div>}
                                </>
                            }
                        </div>
                        <Separator className="my-5" />
                        <div className="space-y-4 px-1">
                            <div className="flex justify-between">
                                <Label className="text-sm">Product attributes</Label>
                            </div>
                            <p className="text-sm">
                                Does your product come in different variations, like Size, Color or Material? Add them here.
                            </p>
                            <ProductAttributes />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}