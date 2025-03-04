import React, { useState } from "react"
import { ChevronRight } from "lucide-react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
} from "@/components/ui/sidebar"

export default function SettingSidebarPanel() {
    const brandingMenuItems = [
        {
            id: 'workspace',
            label: 'Workspace',
            subItems: []
        },
        {
            id: 'general',
            label: 'General',
            subItems: []
        },
        {
            id: 'billing',
            label: 'Billing',
            subItems: []
        },
        {
            id: 'team-mates',
            label: 'Teammates',
            subItems: []
        },
        {
            id: 'readers',
            label: 'Readers',
            subItems: []
        },
        {
            id:'groups',
            label: 'Groups',
            subItems: []
        },
        {
            id:'single-sign-on',
            label: 'Single Sign-On',
            subItems: []
        },
        {
            id:'integrations',
            label: 'Integrations',
            subItems: []
        },
        {
            id:'workspace-access',
            label: 'Workspace Access',
            subItems: []
        },
        {
            id:'teammate-activity',
            label: 'Teammate Activity',
            subItems: []
        },
        {
            id:'permission-settings',
            label: 'Permission Settings',
            subItems: []
        },
        {
            id:'email-providers',
            label: 'Email Providers',
            subItems: []
        }
    ];

    const [selectedMainItem, setSelectedMainItem] = useState('workspace');
    const [selectedSubItem, setSelectedSubItem] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(true);

    const handleMainItemSelect = (itemId) => {
        if (selectedMainItem === itemId) {
            setSelectedMainItem(null);
            setSelectedSubItem(null);
        } else {
            setSelectedMainItem(itemId);
            setSelectedSubItem(null);
        }

        if (itemId === 'brand-profile') {
            setIsProfileOpen(!isProfileOpen);
        }
    };

    const handleSubItemSelect = (subItemId) => {
        setSelectedSubItem(subItemId);
        setSelectedMainItem('brand-profile');
    };

    return (
        <SidebarContent className="flex-1">
            <SidebarGroup>
                <SidebarGroupLabel className="items-center text-xl py-8">
                    Settings
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
    )
}