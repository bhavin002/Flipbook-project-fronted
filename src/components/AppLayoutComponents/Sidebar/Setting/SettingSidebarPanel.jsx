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

export default function SettingSidebarPanel() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const settingMenuItems = getData('settingMenuItems');

    const [selectedMainItem, setSelectedMainItem] = useState('workspace');
    const [selectedSubItem, setSelectedSubItem] = useState(null);
    const [isBillingOpen, setIsBillingOpen] = useState(false);

    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath.includes('/settings/billing/')) {
            setIsBillingOpen(true);
            setSelectedMainItem('billing');
            const billingItem = settingMenuItems.find(item => item.id === 'billing');
            const matchedSubItem = billingItem.subItems.find(subItem => 
                currentPath === subItem.path
            );
            
            if (matchedSubItem) {
                setSelectedSubItem(matchedSubItem.id);
            }
        } else {
            const matchedItem = settingMenuItems.find(item => 
                currentPath === item.path
            );
            
            if (matchedItem) {
                setSelectedMainItem(matchedItem.id);
                setSelectedSubItem(null);
                
                if (isBillingOpen && matchedItem.id !== 'billing') {
                    setIsBillingOpen(false);
                }
            }
        }
    }, [location.pathname]);

    const handleMainItemSelect = (itemId) => {
        const selectedItem = settingMenuItems.find(item => item.id === itemId);
        
        if (itemId === 'billing') {
            if (!isBillingOpen) {
                setIsBillingOpen(true);
                setSelectedMainItem('billing');
                
                const firstSubItem = selectedItem.subItems[0];
                setSelectedSubItem(firstSubItem.id);
                navigate(firstSubItem.path);
            } else {
                setIsBillingOpen(false);
            }
        } else {
            setSelectedMainItem(itemId);
            setSelectedSubItem(null);
            
            if (isBillingOpen) {
                setIsBillingOpen(false);
            }
            
            navigate(selectedItem.path);
        }
    };

    const handleSubItemSelect = (subItemId) => {
        setSelectedSubItem(subItemId);
        setSelectedMainItem('billing');
        
        const billingItem = settingMenuItems.find(item => item.id === 'billing');
        const selectedSubItem = billingItem.subItems.find(subItem => subItem.id === subItemId);
        
        if (selectedSubItem) {
            navigate(selectedSubItem.path);
        }
    };

    return (
        <SidebarContent className="flex-1">
            <SidebarGroup>
                <SidebarGroupLabel className="items-center text-xl py-8">
                    Settings
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {settingMenuItems.map((item) => (
                            <SidebarMenuItem key={item.id}>
                                {item.id === 'billing' ? (
                                    <Collapsible
                                        open={isBillingOpen}
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