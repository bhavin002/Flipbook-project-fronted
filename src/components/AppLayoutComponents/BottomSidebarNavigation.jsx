import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerContent,
} from "@/components/ui/drawer";
import { useNavigate, useLocation } from 'react-router-dom';
import HomeDrawerPanel from '../AppLayoutComponents/BottomSidebar/HomeDrawerPanel';
import BrandingDrawerPanel from '../AppLayoutComponents/BottomSidebar/BrandingDrawerPanel';
import SettingsDrawerPanel from '../AppLayoutComponents/BottomSidebar/SettingsDrawerPanel';
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
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(null);
    const defaultRoutes = getData('defaultRoutes');
    const bottomNavItems = getData('bottomNavItems');
    const permissions = getData('permission');
    const [lastVisitedPaths, setLastVisitedPaths] = useState({ ...defaultRoutes });

    const filteredBottomNavItems = bottomNavItems.filter(item => {
        if (!item.permission) return true;
        return permissions[item.permission] === true;
    });

    const getPathSection = (path) => {
        const sections = filteredBottomNavItems.map(item => ({
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
        const currentNavItem = filteredBottomNavItems.find(item => item.id === itemId);
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
        const onCloseDrawer = () => setIsDrawerOpen(false);
        switch (selectedItem) {
            case 'home':
                return <HomeDrawerPanel onCloseDrawer={onCloseDrawer} />;
            case 'branding':
                return <BrandingDrawerPanel onCloseDrawer={onCloseDrawer} />;
            case 'settings':
                return <SettingsDrawerPanel onCloseDrawer={onCloseDrawer} />;
            default:
                return null;
        }
    };

    return (
        <>
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <nav className="fixed bottom-0 left-0 right-0 md:hidden flex py-3 items-center justify-around bg-primary md:h-16 z-10">
                    {filteredBottomNavItems.map(item => (
                        <NavItem
                            key={item.id}
                            item={item}
                            isSelected={selectedItem === item.id}
                            onClick={() => handleItemClick(item.id)}
                        />
                    ))}
                </nav>

                <DrawerContent className="max-h-[85vh] rounded-t-xl flex flex-col">
                    {renderDrawerPanel()}
                </DrawerContent>
            </Drawer>
        </>
    );
}