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

export default function BrandingSidebarPanel() {
    const brandingMenuItems = [
        {
            id: 'brand-profile',
            label: 'Brand Profile',
            subItems: [
                { id: 'settings', label: 'Settings' },
                { id: 'personalization', label: 'Personalization' }
            ]
        },
        {
            id: 'fonts',
            label: 'Fonts',
            subItems: []
        },
        {
            id: 'colors',
            label: 'Colors',
            subItems: []
        },
        {
            id: 'brand-logos',
            label: 'Brand logos',
            subItems: []
        },
        {
            id: 'typography',
            label: 'Typography',
            subItems: []
        }
    ];

    const [selectedMainItem, setSelectedMainItem] = useState('brand-profile');
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
    )
}