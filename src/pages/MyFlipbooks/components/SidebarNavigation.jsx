import React, { useState } from 'react';
import { Home, Bot, BarChart2, Diamond, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar'

function NavItem({ item, isSelected, onClick, onMouseEnter, onMouseLeave }) {
    const { icon: Icon, label } = item;

    return (
        <div className='flex flex-col items-center'>
            <Button
                className={`shadow-none [&_svg]:size-5 ${isSelected ? "bg-violet-400 hover:bg-violet-400" : "hover:bg-violet-400"}`}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <Icon/>
            </Button>
            <p className="text-xs text-white mt-1">{label}</p>
        </div>
    );
};

export default function SidebarNavigation() {
    const [selectedItem, setSelectedItem] = useState('home');
    const { setOpen, setSelectedItem: setGlobalSelectedItem } = useSidebar();

    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'automation', icon: Bot, label: 'Automation' },
        { id: 'statistics', icon: BarChart2, label: 'Statistics' },
        { id: 'branding', icon: Diamond, label: 'Branding' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    const handleItemClick = (itemId) => {
        setSelectedItem(itemId);
        setGlobalSelectedItem(itemId);
        if (['home', 'branding', 'settings'].includes(itemId)) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] w-[75px] flex-col items-center justify-between bg-primary py-4 z-[11]">
            <div className="items-center flex flex-col">
                {navItems.slice(0, 1).map(item => (
                    <NavItem
                        key={item.id}
                        item={item}
                        isSelected={selectedItem === item.id}
                        onClick={() => handleItemClick(item.id)}
                    />
                ))}
            </div>
            <div className="space-y-3 w-full">
                {navItems.slice(1).map(item => (
                    <NavItem
                        key={item.id}
                        item={item}
                        isSelected={selectedItem === item.id}
                        onClick={() => handleItemClick(item.id)}
                    />
                ))}
            </div>
        </div>
    );
};