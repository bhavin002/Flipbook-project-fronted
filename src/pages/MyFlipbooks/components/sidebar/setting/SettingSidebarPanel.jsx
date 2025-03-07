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

export default function SettingSidebarPanel() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const settingMenuItems = [
        {
            id: 'workspace',
            label: 'Workspace',
            path: '/settings/workspace',
            subItems: []
        },
        {
            id: 'general',
            label: 'General',
            path: '/settings/general',
            subItems: []
        },
        {
            id: 'billing',
            label: 'Billing',
            path: '/settings/billing',
            subItems: [
                { id: 'subscription', label: 'Subscription', path: '/settings/billing/subscription' },
                { id: 'invoice', label: 'Billing History', path: '/settings/billing/invoice' }
            ]
        },
        {
            id: 'teammates',
            label: 'Teammates',
            path: '/settings/teammates',
            subItems: []
        },
        {
            id: 'readers',
            label: 'Readers',
            path: '/settings/readers',
            subItems: []
        },
        {
            id:'groups',
            label: 'Groups',
            path: '/settings/groups',
            subItems: []
        },
        {
            id:'sso',
            label: 'Single Sign-On',
            path: '/settings/sso',
            subItems: []
        },
        {
            id:'integrations',
            label: 'Integrations',
            path: '/settings/integrations',
            subItems: []
        },
        {
            id:'access',
            label: 'Workspace Access',
            path: '/settings/access',
            subItems: []
        },
        {
            id:'logs',
            label: 'Teammate Activity',
            path: '/settings/logs',
            subItems: []
        },
        {
            id:'permission-settings',
            label: 'Permission Settings',
            path: '/settings/permission-settings',
            subItems: []
        },
        {
            id:'email-provider',
            label: 'Email Providers',
            path: '/settings/email-provider',
            subItems: []
        }
    ];

    const [selectedMainItem, setSelectedMainItem] = useState('workspace');
    const [selectedSubItem, setSelectedSubItem] = useState(null);
    const [isBillingOpen, setIsBillingOpen] = useState(false);

    // Set initial selection based on URL path when component mounts or URL changes
    useEffect(() => {
        const currentPath = location.pathname;
        
        // Check if path includes billing
        if (currentPath.includes('/settings/billing/')) {
            setIsBillingOpen(true);
            setSelectedMainItem('billing');
            
            // Determine which billing sub-item is selected
            const billingItem = settingMenuItems.find(item => item.id === 'billing');
            const matchedSubItem = billingItem.subItems.find(subItem => 
                currentPath === subItem.path
            );
            
            if (matchedSubItem) {
                setSelectedSubItem(matchedSubItem.id);
            }
        } else {
            // For non-billing items
            const matchedItem = settingMenuItems.find(item => 
                currentPath === item.path
            );
            
            if (matchedItem) {
                setSelectedMainItem(matchedItem.id);
                setSelectedSubItem(null);
                
                // Close billing dropdown if open
                if (isBillingOpen && matchedItem.id !== 'billing') {
                    setIsBillingOpen(false);
                }
            }
        }
    }, [location.pathname]);

    const handleMainItemSelect = (itemId) => {
        const selectedItem = settingMenuItems.find(item => item.id === itemId);
        
        if (itemId === 'billing') {
            // Toggle billing dropdown
            if (!isBillingOpen) {
                setIsBillingOpen(true);
                setSelectedMainItem('billing');
                
                // Navigate to first sub-item by default
                const firstSubItem = selectedItem.subItems[0];
                setSelectedSubItem(firstSubItem.id);
                navigate(firstSubItem.path);
            } else {
                // If already open, close it or navigate to first sub-item
                setIsBillingOpen(false);
            }
        } else {
            // For non-billing items, navigate directly
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
        
        // Find the path for the selected sub-item
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