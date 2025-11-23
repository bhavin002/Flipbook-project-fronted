import React, { useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Eye,
    Info
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
import { getData } from '@/utils/datas';
import FlipBookPreview from '@/components/EditorLayoutComponents/Preview/Components/FlipBookPreview';
import { useParams } from 'react-router-dom';

export default function Customize() {
    const [activeValues, setActiveValues] = useState(["appearance"]);
    const { id } = useParams();
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

    const menuItems = getData('customizeMenuItems')

    const handleValueChange = (values) => {
        setActiveValues(values);
    };

    React.useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex w-full">
            <div className="lg:w-[35%] md:w-[50%] max-md:w-full bg-primary flex flex-col p-4">
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
                {/* <div className="flex items-center gap-2 text-white pt-3">
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
                </div> */}
            </div>

            {isLargeScreen && (
                <Card className="lg:w-[65%] md:w-[50%]  shadow-sm flex-grow rounded-none relative overflow-hidden">
                    <FlipBookPreview flipbookId={id} component={"customize"} />
                </Card>
            )}
        </div>
    );
}