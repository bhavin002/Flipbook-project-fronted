import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
} from "@/components/ui/sidebar";
import { getData } from "@/utils/datas";

export default function BrandingSidebarPanel() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const brandingMenuItems = getData('brandingMenuItems');

    const [selectedMainItem, setSelectedMainItem] = useState('brand-profile');
    const [selectedSubItem, setSelectedSubItem] = useState('settings');
    const [isProfileOpen, setIsProfileOpen] = useState(true);

    useEffect(() => {
        const currentPath = location.pathname;
        
        if (currentPath.includes('/branding/profile/')) {
            setIsProfileOpen(true);
            setSelectedMainItem('brand-profile');
            
            const profileItem = brandingMenuItems.find(item => item.id === 'brand-profile');
            const matchedSubItem = profileItem.subItems.find(subItem => 
                currentPath === subItem.path
            );
            
            if (matchedSubItem) {
                setSelectedSubItem(matchedSubItem.id);
            }
        } else {
            const matchedItem = brandingMenuItems.find(item => 
                currentPath === item.path || 
                (item.path !== '/branding/profile' && currentPath.startsWith(item.path))
            );
            
            if (matchedItem) {
                setSelectedMainItem(matchedItem.id);
                setSelectedSubItem(null);
                
                if (isProfileOpen && matchedItem.id !== 'brand-profile') {
                    setIsProfileOpen(false);
                }
            }
        }
    }, [location.pathname]);

    const handleMainItemSelect = (itemId) => {
        const selectedItem = brandingMenuItems.find(item => item.id === itemId);
        
        if (itemId === 'brand-profile') {
            if (!isProfileOpen) {
                setIsProfileOpen(true);
                setSelectedMainItem('brand-profile');
                
                const firstSubItem = selectedItem.subItems[0];
                setSelectedSubItem(firstSubItem.id);
                navigate(firstSubItem.path);
            } else {
                setIsProfileOpen(false);
            }
        } else {
            setSelectedMainItem(itemId);
            setSelectedSubItem(null);
            
            if (isProfileOpen) {
                setIsProfileOpen(false);
            }
            
            navigate(selectedItem.path);
        }
    };

    const handleSubItemSelect = (subItemId) => {
        setSelectedSubItem(subItemId);
        setSelectedMainItem('brand-profile');
        
        const profileItem = brandingMenuItems.find(item => item.id === 'brand-profile');
        const selectedSubItem = profileItem.subItems.find(subItem => subItem.id === subItemId);
        
        if (selectedSubItem) {
            navigate(selectedSubItem.path);
        }
    };

    return (
        <SidebarContent className="flex-1">
            <SidebarGroup>
                <SidebarGroupLabel className="items-center text-xl py-8">
                    Branding
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {brandingMenuItems.map((item) => (
                            <SidebarMenuItem key={item.id}>
                                {item.id === 'brand-profile' ? (
                                    <Collapsible
                                        open={isProfileOpen}
                                        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                                    >
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                isActive={selectedMainItem === item.id && !selectedSubItem}
                                                onClick={() => handleMainItemSelect(item.id)}
                                            >
                                                <ChevronRight className="transition-transform" />
                                                {item.label}
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.subItems.map((subItem) => (
                                                    <SidebarMenuButton
                                                        key={subItem.id}
                                                        isActive={selectedSubItem === subItem.id}
                                                        onClick={() => handleSubItemSelect(subItem.id)}
                                                    >
                                                        {subItem.label}
                                                    </SidebarMenuButton>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </Collapsible>
                                ) : (
                                    <SidebarMenuButton
                                        isActive={selectedMainItem === item.id}
                                        onClick={() => handleMainItemSelect(item.id)}
                                    >
                                        {item.label}
                                    </SidebarMenuButton>
                                )}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    );
}