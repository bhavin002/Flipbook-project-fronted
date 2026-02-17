import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import { getData } from '@/utils/datas';
import { useAuth } from '@/context/AuthContext';
import { useTrialExpiration } from '@/hooks/useTrialExpiration';

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

export default function SidebarNavigation({ setIsSidebarOpen }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { setOpen, setSelectedItem: setGlobalSelectedItem, selectedItem, open } = useSidebar();
    const defaultRoutes = getData('defaultRoutes');
    const navItems = getData('navItems');
    const { permissions } = useAuth();
    const { shouldShowBanner } = useTrialExpiration();

    const filteredNavItems = navItems.filter(item => {
        if (!item.permission) return true;
        return permissions[item.permission] === true;
    });

    const [lastVisitedPaths, setLastVisitedPaths] = useState({ ...defaultRoutes });
    const [activeSection, setActiveSection] = useState(null);

    const getPathSection = (path) => {
        const sections = filteredNavItems.map(item => ({
            id: item.id,
            basePath: item.path.split('/').slice(0, 2).join('/')
        }));

        return sections.find(section => path.startsWith(section.basePath))?.id;
    };

    useEffect(() => {
        const currentPath = location.pathname;
        const currentPathBase = currentPath.split('/').slice(0, 2).join('/');
        const pathsToCloseSidebarWithSelecteSidebarTab = ["/statistics", "/automation", "/details", "/embed", "/trackable-links", "/stats", "/send-email", "/download-qr", "/account", "/shelf"];
        const pathsToCloseSidebarWithoutSelecteSidebarTab = ["/details", "/embed", "/trackable-links", "/stats", "/send-email", "/download-qr", "/account", "/shelf/details", "/shelf/embed", "/shelf/stats", "/shelf/send-email", "/shelf/download-qr"];

        if (pathsToCloseSidebarWithSelecteSidebarTab.includes(currentPathBase)) {
            setOpen(false);

            if (pathsToCloseSidebarWithoutSelecteSidebarTab.includes(currentPathBase)) {
                setGlobalSelectedItem(null);
            } else {
                const currentSection = getPathSection(currentPath);
                if (currentSection) {
                    setGlobalSelectedItem(currentSection);
                }
            }
        } else {
            const currentSection = getPathSection(currentPath);

            if (currentSection) {
                setActiveSection(currentSection);

                setLastVisitedPaths(prev => ({
                    ...prev,
                    [currentSection]: currentPath
                }));

                if (currentSection !== selectedItem) {
                    setGlobalSelectedItem(currentSection);
                }
            }
        }
    }, [location.pathname]);

    useEffect(() => {
        setIsSidebarOpen(open);
    }, [open, setIsSidebarOpen]);

    const handleItemClick = (itemId) => {
        const currentPath = location.pathname;
        const currentSection = getPathSection(currentPath);

        if (itemId === currentSection) {
            const newOpenState = !open;
            setOpen(newOpenState);
            setIsSidebarOpen(newOpenState);

            return;
        }

        setGlobalSelectedItem(itemId);

        const shouldOpenSidebar = ['home', 'branding', 'settings'].includes(itemId);
        setOpen(shouldOpenSidebar);
        setIsSidebarOpen(shouldOpenSidebar);

        if (itemId !== activeSection) {
            navigate(defaultRoutes[itemId]);
        } else {
            navigate(lastVisitedPaths[itemId]);
        }
    };

    return (
        <div className={`flex ${shouldShowBanner ? "h-[calc(100vh-104px)]" : "h-[calc(100vh-64px)]"} w-[75px] flex-col items-center justify-between bg-primary py-4 z-[11]`}>
            <div className="items-center flex flex-col">
                {filteredNavItems.slice(0, 1).map(item => (
                    <NavItem
                        key={item.id}
                        item={item}
                        isSelected={selectedItem === item.id}
                        onClick={() => handleItemClick(item.id)}
                    />
                ))}
            </div>
            <div className="space-y-3 w-full">
                {filteredNavItems.slice(1).map(item => (
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