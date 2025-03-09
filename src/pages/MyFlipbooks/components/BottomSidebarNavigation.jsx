import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerContent,
} from "@/components/ui/drawer";
import { useNavigate, useLocation } from 'react-router-dom';
import HomeDrawerPanel from './BottomSidebar/HomeDrawerPanel';
import BrandingDrawerPanel from './BottomSidebar/BrandingDrawerPanel';
import SettingsDrawerPanel from './BottomSidebar/SettingsDrawerPanel';
import { getData } from '@/utils/datas';

function NavItem({ item, isSelected, onClick }) {
    const { icon: Icon, label } = item;

    const ButtonContent = () => (
        <>
            <Icon />
            <span className="sr-only">{label}</span>
        </>
    );

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
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedItem, setSelectedItem] = useState('home');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(null);
    const defaultRoutes = getData('defaultRoutes');
    const bottomNavItems = getData('bottomNavItems');
    const [lastVisitedPaths, setLastVisitedPaths] = useState({ ...defaultRoutes });


    const getPathSection = (path) => {
        const sections = bottomNavItems.map(item => ({
            id: item.id,
            basePath: item.path.split('/').slice(0, 2).join('/')
        }));

        return sections.find(section => path.startsWith(section.basePath))?.id;
    };

    useEffect(() => {
        const currentPath = location.pathname;
        const currentSection = getPathSection(currentPath);

        if (currentSection) {
            setActiveSection(currentSection);
            setSelectedItem(currentSection);

            setLastVisitedPaths(prev => ({
                ...prev,
                [currentSection]: currentPath
            }));
        }
    }, [location.pathname]);

    const handleItemClick = (itemId) => {
        const currentNavItem = bottomNavItems.find(item => item.id === itemId);
        if (!currentNavItem) return;

        const currentPath = location.pathname;
        const currentSection = getPathSection(currentPath);

        if (itemId === currentSection) {
            if (currentNavItem.hasDrawer) {
                setIsDrawerOpen(!isDrawerOpen);
            }
            return;
        }

        setSelectedItem(itemId);

        if (currentNavItem.hasDrawer) {
            setIsDrawerOpen(true);
        } else {
            setIsDrawerOpen(false);
        }
        if (itemId !== activeSection) {
            navigate(defaultRoutes[itemId]);
        } else {
            navigate(lastVisitedPaths[itemId]);
        }
    };

    const renderDrawerPanel = () => {
        switch (selectedItem) {
            case 'home':
                return <HomeDrawerPanel />;
            case 'branding':
                return <BrandingDrawerPanel />;
            case 'settings':
                return <SettingsDrawerPanel />;
            default:
                return null;
        }
    };

    return (
        <>
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <nav className="fixed bottom-0 left-0 right-0 md:hidden flex py-3 items-center justify-around bg-primary md:h-16 z-10">
                    {bottomNavItems.map(item => (
                        <NavItem
                            key={item.id}
                            item={item}
                            isSelected={selectedItem === item.id}
                            onClick={() => handleItemClick(item.id)}
                        />
                    ))}
                </nav>

                <DrawerContent className="h-[85vh] max-h-[85vh] rounded-t-xl flex flex-col">
                    {renderDrawerPanel()}
                </DrawerContent>
            </Drawer>
        </>
    );
}