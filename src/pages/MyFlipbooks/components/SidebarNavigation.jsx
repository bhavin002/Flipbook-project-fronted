import React, { useState } from 'react';
import { Home, Bot, BarChart2, Diamond, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

function NavItem({ item, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }) {
    const { icon: Icon, label } = item;

    return (
        <div className='flex flex-col items-center'>
            <Button
                className={`shadow-none [&_svg]:size-5 ${isSelected ? "bg-white hover:bg-white" : "hover:bg-white"}`}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <Icon
                    color={isSelected || isHovered ? "hsl(var(--primary))" : "white"}
                />
            </Button>
            <p className="text-xs text-white mt-1">{label}</p>
        </div>
    );
};

export default function SidebarNavigation() {
    const [selectedItem, setSelectedItem] = useState('home');
    const [hoveredItem, setHoveredItem] = useState(null);

    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'automation', icon: Bot, label: 'Automation' },
        { id: 'statistics', icon: BarChart2, label: 'Statistics' },
        { id: 'branding', icon: Diamond, label: 'Branding' },
        { id: 'settings', icon: Settings, label: 'Settings' }
    ];

    return (
        <div className="flex h-[calc(100vh-80px)] w-[75px] flex-col items-center justify-between bg-primary py-4 z-[11]">
            <div className="items-center flex flex-col">
                {navItems.slice(0, 1).map(item => (
                    <NavItem
                        key={item.id}
                        item={item}
                        isSelected={selectedItem === item.id}
                        isHovered={hoveredItem === item.id}
                        onClick={() => setSelectedItem(item.id)}
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                    />
                ))}
            </div>
            <div className="space-y-3 w-full">
                {navItems.slice(1).map(item => (
                    <NavItem
                        key={item.id}
                        item={item}
                        isSelected={selectedItem === item.id}
                        isHovered={hoveredItem === item.id}
                        onClick={() => setSelectedItem(item.id)}
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                    />
                ))}
            </div>
        </div>
    );
};