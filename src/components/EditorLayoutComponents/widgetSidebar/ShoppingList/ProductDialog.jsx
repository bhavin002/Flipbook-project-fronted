import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { getData } from "@/utils/datas";
import { Plus, Trash2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function ProductDialog() {
    const [onSale, setIsSale] = useState(false);
    const currencyData = getData("currency") || [];
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="w-full text-black hover:text-primary"
                    variant="outline"
                >
                    <Plus /> Add product
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[640px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Product details</DialogTitle>
                    <DialogDescription className="sr-only">
                        Description
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[calc(100vh-150px)] overflow-y-auto">
                    <div className="space-y-2">
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
                    <div className="space-y-6">
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
                    <div className="space-y-4">
                        <Label htmlFor="product-title" className="text-md">Images (3/3)</Label>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2 items-center ">
                                    <img src="https://cdn.flipsnack.com/collections/uploads/1500b2e0589f1cb5dcdbab1f49929443_t" className="w-[50px] h-[40px] object-cover rounded-sm" alt="Spotlight" />
                                    <p className="text-sm truncate">152 (4).jpg</p>
                                </div>
                                <Button variant="ghost">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2 items-center ">
                                    <img src="https://cdn.flipsnack.com/collections/uploads/1500b2e0589f1cb5dcdbab1f49929443_t" className="w-[50px] h-[40px] object-cover rounded-sm" alt="Spotlight" />
                                    <p className="text-sm truncate">152 (4).jpg</p>
                                </div>
                                <Button variant="ghost">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2 items-center ">
                                    <img src="https://cdn.flipsnack.com/collections/uploads/1500b2e0589f1cb5dcdbab1f49929443_t" className="w-[50px] h-[40px] object-cover rounded-sm" alt="Spotlight" />
                                    <p className="text-sm truncate">152 (4).jpg</p>
                                </div>
                                <Button variant="ghost">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            disabled
                        >
                            Upload images
                        </Button>
                    </div>
                    <Separator className="my-5" />
                    <div className="space-y-4">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-md pt-0" iconClassName="text-black">
                                    Advanced options
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <Label className="text-sm">Quantity options</Label>
                                            <Switch />
                                        </div>
                                        <p className="text-sm">
                                            Set limits on product quantities with minimum and maximum options.
                                            Minimum is least amount that can be bought. Maximum is most.
                                        </p>
                                        <div className='flex gap-2 items-center'>
                                            <Switch id="min-max-quantity" />
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
                                            <Switch id="min-max-quantity" />
                                            <Label htmlFor="min-max-quantity" className="ml-3 text-gray-700">
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
                                    </div>
                                    <Separator className="my-5" />
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <Label className="text-sm">Customizable product</Label>
                                            <Switch />
                                        </div>
                                        <p className="text-sm">
                                            Do you sell customizable products like mugs, street name cards, etc.? Use this option.
                                        </p>
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
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}