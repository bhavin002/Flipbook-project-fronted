
import React, { useState } from 'react';
import {
    Info,
} from "lucide-react";
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerContent,
} from "@/components/ui/drawer";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { getData } from '@/utils/datas';

function NavItem({ item, isSelected, onClick }) {
    return (
        <div className='flex flex-col items-center'>
            <Button
                className={`shadow-none [&_svg]:size-5 ${isSelected ? "bg-violet-400 hover:bg-violet-400" : "hover:bg-violet-400"}`}
                onClick={onClick}
            >
                {item.icon}
                <span className="sr-only">{item.label}</span>
            </Button>
            <p className="text-xs max-md:hidden text-white mt-1">{item.label}</p>
        </div>
    );
}

export default function BottomCustomizePanel() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const menuItems = getData('customizeMenuItems')

    const handleItemClick = (itemValue) => {
        setSelectedItem(itemValue);

        // Toggle drawer if clicked on the same item, otherwise open it
        if (selectedItem === itemValue) {
            setIsDrawerOpen(!isDrawerOpen);
        } else {
            setIsDrawerOpen(true);
        }
    };

    const renderDrawerContent = () => {
        const item = menuItems.find(item => item.value === selectedItem);
        if (!item) return null;

        return (
            <div className="p-4 overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    {item.icon}
                    {item.label}
                </h2>
                <div className="space-y-4">
                    {item.component}
                </div>
            </div>
        );
    };
    
    return (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <nav className="fixed bottom-0 left-0 right-0 lg:hidden flex py-3 items-center justify-around bg-primary lg:h-16 z-10">
                {menuItems.map(item => (
                    <NavItem
                        key={item.value}
                        item={item}
                        isSelected={selectedItem === item.value}
                        onClick={() => handleItemClick(item.value)}
                    />
                ))}
            </nav>

            <DrawerContent className="max-h-[85vh] rounded-t-xl flex flex-col">
                {renderDrawerContent()}

                {/* Preserve settings in drawer */}
                <div className="flex items-center gap-2 p-4 border-t mt-auto">
                    <Checkbox
                        id="mobile-preserve-settings"
                        className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary"
                    />
                    {/* <Label htmlFor="mobile-preserve-settings" className="text-sm font-medium">
                        Preserve settings
                    </Label> */}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="h-4 w-4 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent
                                side="top"
                                align="center"
                                className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
                            >
                                <p className="text-sm">Save precious time by saving these settings for all future flipbooks. Preserve settings is applied only for Appearance, Branding and Menu controls.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </DrawerContent>
        </Drawer>
    )
}