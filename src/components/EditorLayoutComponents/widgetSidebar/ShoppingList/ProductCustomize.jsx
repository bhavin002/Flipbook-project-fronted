import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PanelBottom, Pencil } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";


export default function ProductCustomize({
    setIsProductDialogOpen
}) {
    const [buttonColor, setButtonColor] = useState("#ffffff");
    const [labelColor, setLabelColor] = useState("#000000");
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const buttonColorInputRef = useRef(null);
    const labelColorInputRef = useRef(null);

    const handleButtonColorClick = () => {
        setIsColorPickerOpen(true);
        setTimeout(() => buttonColorInputRef.current?.click(), 10);
    };

    const handleLabelColorClick = () => {
        setIsColorPickerOpen(true);
        setTimeout(() => labelColorInputRef.current?.click(), 10);
    };

    return (
        <Tabs defaultValue="open-overlay">
            <TabsList className="w-full">
                <TabsTrigger className="items-center gap-2 w-full" value="open-overlay">
                    <span className="text-xs">Open overlay</span>
                </TabsTrigger>
                <TabsTrigger className="items-center gap-2 w-full" value="add-directly">
                    <span className="text-xs">Add directly to list</span>
                </TabsTrigger>
            </TabsList>
            <TabsContent value="open-overlay" className="my-2 border rounded-sm">
                <div className="flex gap-2 p-2">
                    <img src="https://cdn.flipsnack.com/collections/uploads/b113ac9c0373728d4a3f2c0f49951273_t" className="w-[80px] h-[80px] rounded-[4px]" />
                    <div className="flex flex-col gap-1 w-full">
                        <p className="text-sm font-semibold">Product 1</p>
                        <p className="text-sm text-gray-50">ABC123</p>
                        <p className="text-sm text-gray-50">1200 INR</p>
                        <Button size="sm" variant="outline" className="w-full text-black hover:text-primary" onClick={() => setIsProductDialogOpen(true)}>
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
                            <div>
                                <Label htmlFor="primary-button-label" className="text-xs">Button label</Label>
                                <Input
                                    type="text"
                                    id="primary-button-label"
                                    defaultValue="Shop this item"
                                    placeholder="Shop this item"
                                    className="placeholder:text-[#d8dce3]" />
                            </div>
                            <div>
                                <Label className="text-xs">Button color</Label>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        value={buttonColor}
                                        onChange={(e) => setButtonColor(e.target.value)}
                                        className="pr-12"
                                    />
                                    <div
                                        className={`absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded cursor-pointer`}
                                        style={{ backgroundColor: buttonColor }}
                                        onClick={handleButtonColorClick}
                                    />
                                    {isColorPickerOpen && (
                                        <input
                                            ref={buttonColorInputRef}
                                            type="color"
                                            value={buttonColor}
                                            onChange={(e) => setButtonColor(e.target.value)}
                                            className="opacity-0 absolute w-1 h-1 right-3 top-1/2 -translate-y-1/2"
                                        />
                                    )}
                                </div>
                            </div>
                            <div>
                                <Label className="text-xs">label color</Label>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        value={labelColor}
                                        onChange={(e) => setLabelColor(e.target.value)}
                                        className="pr-12"
                                    />
                                    <div
                                        className={`absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded cursor-pointer`}
                                        style={{ backgroundColor: labelColor }}
                                        onClick={handleLabelColorClick}
                                    />
                                    {isColorPickerOpen && (
                                        <Input
                                            ref={labelColorInputRef}
                                            type="color"
                                            value={labelColor}
                                            onChange={(e) => setLabelColor(e.target.value)}
                                            className="opacity-0 absolute w-1 h-1 right-3 top-1/2 -translate-y-1/2"
                                        />
                                    )}
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="primary-button-tooltip" className="text-xs">Tooltip</Label>
                                <Input
                                    type="text"
                                    id="primary-button-tooltip"
                                    defaultValue="Click to view this product"
                                    placeholder="Click to view this product"
                                    className="placeholder:text-[#d8dce3]" />
                            </div>
                            <div className="flex gap-2 ml-3 py-2">
                                <Switch className="data-[state=checked]:bg-violet-600" />
                                <Label className="text-sm">Secondary button</Label>
                            </div>
                            <div>
                                <Label htmlFor="button-link" className="text-xs">Button link</Label>
                                <Input
                                    type="text"
                                    id="button-link"
                                    placeholder="https://example.com/example"
                                    className="placeholder:text-[#d8dce3]" />
                            </div>
                            <div>
                                <Label htmlFor="secondary-button-label" className="text-xs">Button label</Label>
                                <Input
                                    type="text"
                                    id="secondary-button-label"
                                    defaultValue="View more"
                                    placeholder="View more"
                                    className="placeholder:text-[#d8dce3]" />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </TabsContent>
            <TabsContent value="add-directly" className="my-2 border rounded-sm">
                <div className="flex gap-2 p-2">
                    <img src="https://cdn.flipsnack.com/collections/uploads/b113ac9c0373728d4a3f2c0f49951273_t" className="w-[80px] h-[80px] rounded-[4px]" />
                    <div className="flex flex-col gap-1 w-full">
                        <p className="text-sm font-semibold">Product 1</p>
                        <p className="text-sm text-gray-50">ABC123</p>
                        <p className="text-sm text-gray-50">1200 INR</p>
                        <Button size="sm" variant="outline" className="w-full text-black hover:text-primary" onClick={() => setIsProductDialogOpen(true)}>
                            <Pencil /> Edit product
                        </Button>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    )
}