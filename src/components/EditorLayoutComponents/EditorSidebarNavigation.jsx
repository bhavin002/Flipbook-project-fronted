import React from 'react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { getData } from '@/utils/datas';

function NavItem({ item, isSelected, onClick }) {
    const { icon: Icon, label } = item;

    return (
        <div className='flex flex-col items-center'>
            <Button
                className={`shadow-none [&_svg]:size-5 ${isSelected ? "bg-violet-400 hover:bg-violet-400" : "hover:bg-violet-400"}`}
                onClick={onClick}
            >
                <Icon />
            </Button>
            <p className="text-xs text-white mt-1">{label}</p>
        </div>
    );
};

export default function SidebarNavigation({ setIsSidebarOpen }) {
    const { setOpen, setSelectedItem: setGlobalSelectedItem, selectedItem, open } = useSidebar();
    const navItems = getData('editorNavItems');

    React.useEffect(() => {
        setGlobalSelectedItem('templates');
    }, []);

    React.useEffect(() => {
        setIsSidebarOpen(open);
    }, [open, setIsSidebarOpen]);

    const handleItemClick = (itemId) => {
        if (selectedItem === itemId) {
            const newOpenState = !open;
            setOpen(newOpenState);
            setIsSidebarOpen(newOpenState);
        } else {
            setGlobalSelectedItem(itemId);
            setOpen(true);
            setIsSidebarOpen(true);
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] w-[75px] flex-col items-center bg-primary py-4 z-[11]">
            <div className="space-y-3 w-full">
                {navItems.map(item => (
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