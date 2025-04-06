
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
            <p className="text-xs text-white mt-1">{item.label}</p>
        </div>
    );
}


export default function BottomEditorPanel() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const menuItems = getData('editorBottomNavItems')

    const handleItemClick = (itemValue) => {
        setSelectedItem(itemValue);

        // Toggle drawer if clicked on the same item, otherwise open it
        if (selectedItem === itemValue) {
            setIsDrawerOpen(!isDrawerOpen);
        } else {
            setIsDrawerOpen(true);
        }

        // Ensure the item is active in the accordion
        if (!activeValues.includes(itemValue)) {
            setActiveValues([...activeValues, itemValue]);
        }
    };

    const renderDrawerContent = () => {
        const item = menuItems.find(item => item.value === selectedItem);
        if (!item) return null;
        return (
            <>
                {item.component}
            </>
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
            </DrawerContent>
        </Drawer>
    )
}