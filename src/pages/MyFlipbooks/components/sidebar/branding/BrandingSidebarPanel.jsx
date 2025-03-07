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

export default function BrandingSidebarPanel() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const brandingMenuItems = [
        {
            id: 'brand-profile',
            label: 'Brand Profile',
            path: '/branding/profile',
            subItems: [
                { id: 'settings', label: 'Settings', path: '/branding/profile/settings' },
                { id: 'personalization', label: 'Personalization', path: '/branding/profile/personalization' }
            ]
        },
        {
            id: 'fonts',
            label: 'Fonts',
            path: '/branding/fonts',
            subItems: []
        },
        {
            id: 'colors',
            label: 'Colors',
            path: '/branding/colors',
            subItems: []
        },
        {
            id: 'logos',
            label: 'Brand logos',
            path: '/branding/logos',
            subItems: []
        },
        {
            id: 'text-styles',
            label: 'Typography',
            path: '/branding/text-styles',
            subItems: []
        }
    ];

    const [selectedMainItem, setSelectedMainItem] = useState('brand-profile');
    const [selectedSubItem, setSelectedSubItem] = useState('settings');
    const [isProfileOpen, setIsProfileOpen] = useState(true);

    // Set initial selection based on URL path when component mounts or URL changes
    useEffect(() => {
        const currentPath = location.pathname;
        
        // Check if path includes brand profile
        if (currentPath.includes('/branding/profile/')) {
            setIsProfileOpen(true);
            setSelectedMainItem('brand-profile');
            
            // Determine which profile sub-item is selected
            const profileItem = brandingMenuItems.find(item => item.id === 'brand-profile');
            const matchedSubItem = profileItem.subItems.find(subItem => 
                currentPath === subItem.path
            );
            
            if (matchedSubItem) {
                setSelectedSubItem(matchedSubItem.id);
            }
        } else {
            // For non-profile items
            const matchedItem = brandingMenuItems.find(item => 
                currentPath === item.path || 
                (item.path !== '/branding/profile' && currentPath.startsWith(item.path))
            );
            
            if (matchedItem) {
                setSelectedMainItem(matchedItem.id);
                setSelectedSubItem(null);
                
                // Close profile dropdown if open
                if (isProfileOpen && matchedItem.id !== 'brand-profile') {
                    setIsProfileOpen(false);
                }
            }
        }
    }, [location.pathname]);

    const handleMainItemSelect = (itemId) => {
        const selectedItem = brandingMenuItems.find(item => item.id === itemId);
        
        if (itemId === 'brand-profile') {
            // Toggle profile dropdown
            if (!isProfileOpen) {
                setIsProfileOpen(true);
                setSelectedMainItem('brand-profile');
                
                // Navigate to first sub-item by default
                const firstSubItem = selectedItem.subItems[0];
                setSelectedSubItem(firstSubItem.id);
                navigate(firstSubItem.path);
            } else {
                // If already open and clicked again, close it
                setIsProfileOpen(false);
            }
        } else {
            // For non-profile items, navigate directly
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
        
        // Find the path for the selected sub-item
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