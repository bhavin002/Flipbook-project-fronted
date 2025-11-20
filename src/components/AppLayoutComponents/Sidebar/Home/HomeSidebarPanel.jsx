import React, { useEffect, useState } from "react"
import { ChevronRight, Folder, FolderPlus } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
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
import { FolderSkeleton } from "@/utils/Skeleton";
import { triggerTrashRefresh } from "@/pages/Trash"
import { useFolders } from "@/context/FolderContext"
import { useAuth } from "@/context/AuthContext"

// New event for refreshing sidebar when folders are recovered
export const refreshSidebarEvent = new CustomEvent('refreshSidebar');

export function triggerSidebarRefresh() {
    window.dispatchEvent(refreshSidebarEvent);
}

export default function HomeSidebarPanel() {
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
    const [refreshCounter, setRefreshCounter] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const { folders, isLoading, refreshFolders, updateFolder, removeFolder, addFolder } = useFolders();
    const { permissions } = useAuth();

    useEffect(() => {
        refreshFolders();
    }, [refreshCounter]);

    // Listen for the refresh event
    useEffect(() => {
        const handleRefreshEvent = () => {
            setRefreshCounter(prev => prev + 1);
        };

        window.addEventListener('refreshSidebar', handleRefreshEvent);

        return () => {
            window.removeEventListener('refreshSidebar', handleRefreshEvent);
        };
    }, []);

    const sidebarSections = getData('sidebarSections');

    // Detect current section and folder based on URL path
    const detectCurrentSelection = () => {
        const path = location.pathname;

        // Extract folder ID if present in the path
        const flipbooksFolderMatch = path.match(/\/myflipbooks\/flipbooks\/folder\/([^/]+)/);
        const templateFolderMatch = path.match(/\/myflipbooks\/template\/folder\/([^/]+)/);
        const folderId = flipbooksFolderMatch ? flipbooksFolderMatch[1] : (templateFolderMatch ? templateFolderMatch[1] : null);

        if (path.includes('/myflipbooks/template/folder/')) {
            return { sectionId: "template-team", folderId };
        } else if (path.includes('/myflipbooks/flipbooks/folder/')) {
            return { sectionId: "flipbooks-team", folderId };
        } else if (path.includes('/myflipbooks/template')) {
            return { sectionId: "template-team", folderId: null };
        } else if (path.includes('/myflipbooks/shared-with-me')) {
            return { sectionId: "share-with-me", folderId: null };
        } else if (path.includes('/myflipbooks/trash')) {
            return { sectionId: "trash", folderId: null };
        } else if (path.includes('/myflipbooks/flipbooks')) {
            return { sectionId: "flipbooks-team", folderId: null };
        }

        return { sectionId: "flipbooks-team", folderId: null }; // Default
    };

    const [selectedItem, setSelectedItem] = useState(detectCurrentSelection());

    // Update selected item when URL changes
    useEffect(() => {
        const currentSelection = detectCurrentSelection();
        setSelectedItem(currentSelection);
    }, [location.pathname]);

    const handleItemSelect = (sectionId, folderId = null) => {
        setSelectedItem({ sectionId, folderId });

        if (folderId) {
            if (sectionId === "template-team") {
                navigate(`/myflipbooks/template/folder/${folderId}`);
            } else {
                navigate(`/myflipbooks/flipbooks/folder/${folderId}`);
            }
        } else if (sectionId === "flipbooks-team") {
            navigate("/myflipbooks/flipbooks");
        } else if (sectionId === "template-team") {
            navigate("/myflipbooks/template");
        } else if (sectionId === "share-with-me") {
            navigate("/myflipbooks/shared-with-me");
        } else if (sectionId === "trash") {
            navigate("/myflipbooks/trash");
        }
    };

    const handleFolderRenamed = (updatedFolder) => {
        updateFolder(updatedFolder);
    };

    const handleFolderDeleted = (folderId) => {
        removeFolder(folderId);

        if (location.pathname === "/myflipbooks/trash") {
            triggerTrashRefresh();
        }

        if (selectedItem.folderId === folderId) {
            setSelectedItem({
                ...selectedItem,
                folderId: null
            });
            if (selectedItem.sectionId === "template-team") {
                navigate("/myflipbooks/template");
            } else {
                navigate("/myflipbooks/flipbooks");
            }
        }
    };

    const normalFolders = folders.filter(folder => folder.folderScope === 0);
    const templateFolders = folders.filter(folder => folder.folderScope === 1);

    const handleCreateFolder = (event, sectionType) => {
        event.stopPropagation();
        // Set the scope based on section type for the create folder dialog
        setFolderScope(sectionType === 'template' ? 1 : 0);
        setIsCreateFolderModalOpen(true);
    };

    const [folderScope, setFolderScope] = useState(0); // Default to normal scope

    return (
        <>
            <SidebarContent className="flex-1">
                {[
                    {
                        sectionIcon: BookOpen,
                        sectionLabel: 'Flipbooks',
                        sectionType: 'flipbooks',
                        sectionId: 'flipbooks-team',
                        folderData: normalFolders
                    },
                    {
                        sectionIcon: LayoutPanelLeft,
                        sectionLabel: 'Template',
                        sectionType: 'template',
                        sectionId: 'template-team',
                        folderData: templateFolders
                    }
                ].filter(section => {
                    if (section.sectionType === 'template' && !permissions?.templates) {
                        return false;
                    }
                    return true;
                }).map(({ sectionIcon: SectionIcon, sectionLabel, sectionType, sectionId, folderData }) => (
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
                                                        onClick={() => handleItemSelect(sectionId)}
                                                        isActive={selectedItem.sectionId === sectionId && !selectedItem.folderId}
                                                    >
                                                        <ChevronRight className="transition-transform" />
                                                        <section.icon />
                                                        <div className="flex items-center justify-between w-full">
                                                            {section.label}
                                                            {permissions.createFolder && <div
                                                                className="w-6 h-6 hover:bg-[#8e65ff] flex items-center justify-center rounded-sm"
                                                                onClick={(e) => handleCreateFolder(e, sectionType)}
                                                            >
                                                                <FolderPlus className="w-4 h-4" />
                                                            </div>}
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
                                                                        onClick={() => handleItemSelect(sectionId, folder._id)}
                                                                        className="hover:bg-sidebar-accent/40"
                                                                    >
                                                                        <Folder />
                                                                        <div className="flex items-center justify-between w-full">
                                                                            <p className="truncate text-xs w-[110px]">{folder.name}</p>
                                                                            <FolderDropdown
                                                                                folder={folder}
                                                                                onFolderRenamed={handleFolderRenamed}
                                                                                onFolderDeleted={handleFolderDeleted}
                                                                            />
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
                {(permissions.trash || permissions.invite_teammate || permissions.upgradePlan) && <Separator />}
                <SidebarGroup>
                    <SidebarGroupContent className="space-y-2">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                {permissions.trash && <SidebarMenuButton
                                    onClick={() => handleItemSelect('trash')}
                                    isActive={selectedItem.sectionId === 'trash'}
                                >
                                    <Trash />
                                    Trash
                                </SidebarMenuButton>}
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <div className="space-y-2">
                            {permissions.invite_teammate && <Button
                                className="w-full bg-violet-700"
                                onClick={() => navigate('/settings/teammates')}
                            >
                                <Users />
                                Invite teammates
                            </Button>}
                            {permissions.upgradePlan && <Button
                                className="w-full bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-600 hover:to-indigo-700"
                                onClick={() => navigate('/settings/billing/subscription')}
                            >
                                <Crown />Upgrade
                            </Button>}
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <CreateFolderDialog
                isCreateFolderModalOpen={isCreateFolderModalOpen}
                setIsCreateFolderModalOpen={setIsCreateFolderModalOpen}
                folderScope={folderScope}
                onFolderCreated={(folder) => {
                    addFolder(folder);
                }}
            />
        </>
    )
}