import React, { useState } from "react"
import { ChevronRight, Folder } from "lucide-react"
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
import { BookOpen } from 'lucide-react';
import { Users } from 'lucide-react';
import { UserCheck } from 'lucide-react';
import { LayoutPanelLeft } from 'lucide-react';
import { Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Crown } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import CreateFolderDialog from "./CreateFolderDialog";
import FolderDropdown from "./FolderDropdown";
import { getData } from "@/utils/datas";

export default function HomeSidebarPanel() {
    const sidebarSections = getData('sidebarSections');

    const [selectedItem, setSelectedItem] = useState({
        sectionId: "flipbooks-team",
        folderId: null
    });

    const handleItemSelect = (sectionId, folderId = null) => {
        setSelectedItem({ sectionId, folderId });
    };
    return (
        <>
            <SidebarContent className="flex-1">
                {[
                    { sectionIcon: BookOpen, sectionLabel: 'Flipbooks', sectionType: 'flipbooks' },
                    { sectionIcon: LayoutPanelLeft, sectionLabel: 'Template', sectionType: 'template' }
                ].map(({ sectionIcon: SectionIcon, sectionLabel, sectionType }) => (
                    <SidebarGroup key={sectionLabel}>
                        <SidebarGroupLabel className="items-center">
                            <SectionIcon className="mr-1" /> {sectionLabel}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {sidebarSections
                                    .filter(section => section.type === sectionType)
                                    .map(section => (
                                        <SidebarMenuItem key={section.id}>
                                            <Collapsible
                                                className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                                                defaultOpen={selectedItem.sectionId === section.id}
                                            >
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton
                                                        onClick={() => handleItemSelect(section.id)}
                                                        isActive={selectedItem.sectionId === section.id && !selectedItem.folderId}
                                                    >
                                                        <ChevronRight className="transition-transform" />
                                                        <section.icon />
                                                        <div className="flex items-center justify-between w-full">
                                                            {section.label}
                                                            <CreateFolderDialog />
                                                        </div>
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {section.folders.map(folder => (
                                                            <SidebarMenuButton
                                                                key={folder.id}
                                                                isActive={selectedItem.folderId === folder.id}
                                                                onClick={() => handleItemSelect(section.id, folder.id)}
                                                            >
                                                                <Folder />
                                                                <div className="flex items-center justify-between w-full">
                                                                    {folder.name}
                                                                    <FolderDropdown />
                                                                </div>
                                                            </SidebarMenuButton>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </Collapsible>
                                        </SidebarMenuItem>
                                    ))}
                                {sectionType === 'flipbooks' && (
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            onClick={() => handleItemSelect('share-with-me')}
                                            isActive={selectedItem.sectionId === 'share-with-me'}
                                        >
                                            <UserCheck />
                                            Share with me
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarContent>
                <Separator />
                <SidebarGroup>
                    <SidebarGroupContent className="space-y-2">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={() => handleItemSelect('trash')}
                                    isActive={selectedItem.sectionId === 'trash'}
                                >
                                    <Trash />
                                    Trash
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <div className="space-y-2">
                            <Button
                                className="w-full bg-violet-700"
                            >
                                <Users />
                                Invite teammates
                            </Button>
                            <Button
                                className="w-full bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-600 hover:to-indigo-700"
                            >
                                <Crown />Upgrade
                            </Button>
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </>
    )
}