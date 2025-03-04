import React, { useState } from 'react';
import { Home, Bot, BarChart2, Diamond, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

function NavItem({ item, isSelected, onClick }) {
    const { icon: Icon, label } = item;

    return (
        <div className='flex flex-col items-center'>
            <Button
                className={`shadow-none [&_svg]:size-5 ${isSelected ? "bg-violet-400 hover:bg-violet-400" : "hover:bg-violet-400"}`}
                onClick={onClick}
            >
                <Icon/>
            </Button>
            <p className="text-xs text-white mt-1">{label}</p>
        </div>
    );
}

export default function BottomSidebarNavigation() {
    const [selectedItem, setSelectedItem] = useState('home');

    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'automation', icon: Bot, label: 'Automation' },
        { id: 'statistics', icon: BarChart2, label: 'Statistics' },
        { id: 'branding', icon: Diamond, label: 'Branding' },
        { id: 'settings', icon: Settings, label: 'Settings' }
    ];

    const handleItemClick = (itemId) => {
        setSelectedItem(itemId);
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 md:hidden flex py-3 items-center justify-around bg-primary md:h-16">
            {navItems.map(item => (
                <NavItem
                    key={item.id}
                    item={item}
                    isSelected={selectedItem === item.id}
                    onClick={() => handleItemClick(item.id)}
                />
            ))}
        </nav>
    );
}