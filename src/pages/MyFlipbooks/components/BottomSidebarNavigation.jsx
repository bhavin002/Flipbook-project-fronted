import React, { useState } from 'react';
import { Home, Bot, BarChart2, Diamond, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerClose
} from "@/components/ui/drawer";
import { X } from 'lucide-react';
import DrawerHomeSidebarPanel from './BottomSidebar/DrawerHomeSidebarPanel';

function NavItem({ item, isSelected, onClick, isDrawerTrigger = false }) {
    const { icon: Icon, label } = item;

    const ButtonContent = () => (
        <>
            <Icon />
            <span className="sr-only">{label}</span>
        </>
    );

    if (isDrawerTrigger) {
        return (
            <div className='flex flex-col items-center'>
                <DrawerTrigger asChild>
                    <Button
                        className={`shadow-none [&_svg]:size-5 ${isSelected ? "bg-violet-400 hover:bg-violet-400" : "hover:bg-violet-400"}`}
                        onClick={onClick}
                    >
                        <ButtonContent />
                    </Button>
                </DrawerTrigger>
                <p className="text-xs text-white mt-1">{label}</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center'>
            <Button
                className={`shadow-none [&_svg]:size-5 ${isSelected ? "bg-violet-400 hover:bg-violet-400" : "hover:bg-violet-400"}`}
                onClick={onClick}
            >
                <ButtonContent />
            </Button>
            <p className="text-xs text-white mt-1">{label}</p>
        </div>
    );
}

export default function BottomSidebarNavigation() {
    const [selectedItem, setSelectedItem] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'automation', icon: Bot, label: 'Automation' },
        { id: 'statistics', icon: BarChart2, label: 'Statistics' },
        { id: 'branding', icon: Diamond, label: 'Branding' },
        { id: 'settings', icon: Settings, label: 'Settings' }
    ];

    const handleItemClick = (itemId) => {
        setSelectedItem(itemId);

        // For non-home items, close the drawer if it's open
        if (itemId !== 'home' && isDrawerOpen) {
            setIsDrawerOpen(false);
        }
    };

    const handleHomeClick = () => {
        handleItemClick('home');
        setIsDrawerOpen(true);
    };

    return (
        <>
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <nav className="fixed bottom-0 left-0 right-0 md:hidden flex py-3 items-center justify-around bg-primary md:h-16 z-10">
                    {navItems.map(item => (
                        item.id === 'home' ? (
                            <NavItem
                                key={item.id}
                                item={item}
                                isSelected={selectedItem === item.id}
                                onClick={handleHomeClick}
                                isDrawerTrigger={true}
                            />
                        ) : (
                            <NavItem
                                key={item.id}
                                item={item}
                                isSelected={selectedItem === item.id}
                                onClick={() => handleItemClick(item.id)}
                            />
                        )
                    ))}
                </nav>

                <DrawerContent className="h-[85vh] max-h-[85vh] rounded-t-xl flex flex-col">
                    <DrawerHomeSidebarPanel />
                </DrawerContent>
            </Drawer>
        </>
    );
}