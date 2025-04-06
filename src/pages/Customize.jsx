import React, { useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Info,
    Monitor,
    Smartphone
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getData } from '@/utils/datas';

export default function Customize() {
    const [activeValues, setActiveValues] = useState([]);

    const menuItems = getData('customizeMenuItems');

    const handleValueChange = (values) => {
        setActiveValues(values);
    };

    return (
        <div className="flex w-full">
            <div className="md:w-[40%] max-lg:hidden bg-primary flex flex-col p-4">
                <Accordion
                    type="multiple"
                    collapsible
                    className="w-full flex-grow h-0 overflow-y-auto"
                    value={activeValues}
                    onValueChange={handleValueChange}
                >
                    {menuItems.map((item) => (
                        <AccordionItem
                            key={item.value}
                            value={item.value}
                            className="border my-4 px-4 rounded-md"
                        >
                            <AccordionTrigger className="hover:no-underline">
                                <div className="flex justify-start items-center gap-2 text-white">
                                    {item.icon}
                                    {item.label}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-4 px-1">
                                {activeValues.includes(item.value) && item.component}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                <div className="flex items-center gap-2 text-white pt-3">
                    <Checkbox
                        id="preserve-settings"
                        className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary"
                    />
                    <Label htmlFor="preserve-settings" className="text-sm font-medium">
                        Preserve settings
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
                                <p className="text-sm">Save precious time by saving these settings for all future flipbooks. Preserve settings is applied only for Appearance, Branding and Menu controls.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            <Card className="shadow-sm flex-grow rounded-none max-md:w-full">
                <Tabs defaultValue="desktop" className="flex flex-col h-full max-lg:min-h-[70vh]">
                    <TabsList className="w-full rounded-none">
                        <TabsTrigger className="items-center gap-2 w-full" value="desktop">
                            <Monitor className="w-5 h-5" />
                            <span className="text-xs mt-1 lg:mt-0">Desktop</span>
                        </TabsTrigger>
                        <TabsTrigger className="items-center gap-2 w-full" value="mobile">
                            <Smartphone className="w-5 h-5" />
                            <span className="text-xs mt-1 lg:mt-0">Mobile</span>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="desktop" className="p-4 pb-0 flex-grow">
                        <div className="h-full w-full flex flex-col">
                            <div className="h-[90%] w-full bg-gray-500">
                            </div>
                            <div className="flex max-lg:p-4 flex-wrap md:justify-start justify-center items-center flex-grow gap-4">
                                <a className="text-sm font-medium text-purple-600 cursor-pointer hover:underline">View live</a>
                                <a className="text-sm font-medium text-purple-600 cursor-pointer hover:underline">Edit</a>
                                <a className="text-sm font-medium text-purple-600 cursor-pointer hover:underline">Customize</a>
                                <a className="text-sm font-medium text-purple-600 cursor-pointer hover:underline">Edit link name</a>
                                <a className="text-sm font-medium text-purple-600 cursor-pointer hover:underline">SEO</a>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="mobile" className="p-4 pb-0 flex-grow w-full">
                        <div className="h-full w-full flex flex-col">
                            <div className="h-[90%] md:w-[50%] md:m-auto bg-gray-500">
                            </div>
                            <div className="flex p-4 flex-wrap justify-center items-center flex-grow gap-4">
                                <a className="text-sm font-medium text-purple-600 cursor-pointer hover:underline">View live</a>
                                <a className="text-sm font-medium text-purple-600 cursor-pointer hover:underline">Edit</a>
                                <a className="text-sm font-medium text-purple-600 cursor-pointer hover:underline">Customize</a>
                                <a className="text-sm font-medium text-purple-600 cursor-pointer hover:underline">Edit link name</a>
                                <a className="text-sm font-medium text-purple-600 cursor-pointer hover:underline">SEO</a>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    );
}