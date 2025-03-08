import React, { useEffect } from 'react';
import { Home, Bot, BarChart2, Diamond, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { useNavigate, useLocation } from 'react-router-dom';

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
                <Icon />
            </Button>
            <p className="text-xs text-white mt-1">{label}</p>
        </div>
    );
};

export default function SidebarNavigation({ setIsSidebarOpen,isSidebarOpen }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { setOpen, setSelectedItem: setGlobalSelectedItem, selectedItem,open } = useSidebar();
    console.log("open from SidebarNavigation", open);
    const navItems = [
        { id: 'home', icon: Home, label: 'Home', path: '/my-flipbooks' },
        { id: 'automation', icon: Bot, label: 'Automation', path: '/automation' },
        { id: 'statistics', icon: BarChart2, label: 'Statistics', path: '/statistics' },
        { id: 'branding', icon: Diamond, label: 'Branding', path: '/branding/profile/settings' },
        { id: 'settings', icon: Settings, label: 'Settings', path: '/settings/workspace' },
    ];

    // Set initial selection based on current URL path
    useEffect(() => {
        const currentPath = location.pathname;
        setIsSidebarOpen(open);
        const matchedItem = navItems.find(item =>
            currentPath.startsWith(item.path.split('/').slice(0, 2).join('/'))
        );

        if (matchedItem && matchedItem.id !== selectedItem) {
            setGlobalSelectedItem(matchedItem.id);

            if (['home', 'branding', 'settings'].includes(matchedItem.id)) {
                setOpen(true);
                setIsSidebarOpen(true);
            } else {
                setOpen(false);
                setIsSidebarOpen(false);
            }
        }
    }, [location.pathname, setGlobalSelectedItem, setOpen, setIsSidebarOpen, selectedItem]);

    const handleItemClick = (itemId, path) => {
        setGlobalSelectedItem(itemId);

        if (['home', 'branding', 'settings'].includes(itemId)) {
            setOpen(true);
            setIsSidebarOpen(true);
        } else {
            setOpen(false);
            setIsSidebarOpen(false);
        }

        navigate(path);
    };

    return (
        <div className="flex h-[calc(100vh-64px)] w-[75px] flex-col items-center justify-between bg-primary py-4 z-[11]">
            <div className="items-center flex flex-col">
                {navItems.slice(0, 1).map(item => (
                    <NavItem
                        key={item.id}
                        item={item}
                        isSelected={selectedItem === item.id}
                        onClick={() => handleItemClick(item.id, item.path)}
                    />
                ))}
            </div>
            <div className="space-y-3 w-full">
                {navItems.slice(1).map(item => (
                    <NavItem
                        key={item.id}
                        item={item}
                        isSelected={selectedItem === item.id}
                        onClick={() => handleItemClick(item.id, item.path)}
                    />
                ))}
            </div>
        </div>
    );
};