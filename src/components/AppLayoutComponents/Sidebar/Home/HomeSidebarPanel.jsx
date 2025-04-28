import React, { useEffect, useState } from "react"
import { ChevronRight, Folder, FolderPlus } from "lucide-react"
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
import { GetWorkspaceFoldersApi } from "@/service/folder.service";
import { toast } from "sonner";
import { FolderSkeleton } from "@/utils/Skeleton";

export default function HomeSidebarPanel() {
    const [isLoading, setIsLoading] = useState(false);
    const [folders, setFolders] = useState([]);
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);

    const getFolders = async () => {
        setIsLoading(true);
        try {
            const response = await GetWorkspaceFoldersApi();
            setFolders(response.data);
        } catch (error) {
            toast.error("Folder fetch failed", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getFolders();
    }, []);

    const sidebarSections = getData('sidebarSections');

    const [selectedItem, setSelectedItem] = useState({
        sectionId: "flipbooks-team",
        folderId: null
    });

    const handleItemSelect = (sectionId, folderId = null) => {
        setSelectedItem({ sectionId, folderId });
    };

    const normalFolders = folders.filter(folder => folder.folderScope === 0);
    const templateFolders = folders.filter(folder => folder.folderScope === 1);

    return (
        <>
            <SidebarContent className="flex-1">
                {[
                    {
                        sectionIcon: BookOpen,
                        sectionLabel: 'Flipbooks',
                        sectionType: 'flipbooks',
                        folderData: normalFolders
                    },
                    {
                        sectionIcon: LayoutPanelLeft,
                        sectionLabel: 'Template',
                        sectionType: 'template',
                        folderData: templateFolders
                    }
                ].map(({ sectionIcon: SectionIcon, sectionLabel, sectionType, folderData }) => (
                    <SidebarGroup key={sectionLabel}>
                        <SidebarGroupLabel className="items-center">
                            <SectionIcon className="mr-1" /> <p className="text-[14px]">{sectionLabel}</p>
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {sidebarSections
                                    .filter(section => section.type === sectionType)
                                    .map(section => (
                                        <SidebarMenuItem key={section.id}>
                                            <Collapsible
                                                className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                                                defaultOpen={true}
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
                                                            <div
                                                                className="w-6 h-6 hover:bg-[#8e65ff] flex items-center justify-center rounded-sm"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setIsCreateFolderModalOpen(true);
                                                                }}
                                                            >
                                                                <FolderPlus className="w-4 h-4" />
                                                            </div>
                                                        </div>
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        <div className="max-h-[150px] overflow-y-auto">
                                                        {isLoading ? (
                                                            <div className="mt-1">
                                                                {Array(3).fill().map((_, index) => (
                                                                    <FolderSkeleton key={`skeleton-${index}`} />
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            folderData.length > 0 ? folderData.map(folder => (
                                                                <SidebarMenuButton
                                                                    key={folder._id}
                                                                    isActive={selectedItem.folderId === folder._id}
                                                                    onClick={() => handleItemSelect(section.id, folder._id)}
                                                                >
                                                                    <Folder />
                                                                    <div className="flex items-center justify-between w-full">
                                                                        <p className="truncate text-xs w-[110px]">{folder.name}</p>
                                                                        <FolderDropdown />
                                                                    </div>
                                                                </SidebarMenuButton>
                                                            )) : (
                                                                <p className="text-white text-xs py-2 px-3 text-center">No folders found</p>
                                                            )
                                                        )}
                                                        </div>
                                                        
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
            <CreateFolderDialog
                isCreateFolderModalOpen={isCreateFolderModalOpen}
                setIsCreateFolderModalOpen={setIsCreateFolderModalOpen}
                onFolderCreated={
                    (folder) => {
                        debugger
                        console.log("folder", folder);
                        setFolders(prevFolders => [...prevFolders, folder]);
                    }
                }
            />
        </>
    )
}