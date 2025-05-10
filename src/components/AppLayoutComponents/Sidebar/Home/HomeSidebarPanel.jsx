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
import { GetWorkspaceFoldersApi } from "@/service/folder.service";
import { toast } from "sonner";
import { FolderSkeleton } from "@/utils/Skeleton";

export default function HomeSidebarPanel() {
    const [isLoading, setIsLoading] = useState(false);
    const [folders, setFolders] = useState([]);
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

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

    // Detect current section and folder based on URL path
    const detectCurrentSelection = () => {
        const path = location.pathname;
        
        // Extract folder ID if present in the path
        const folderIdMatch = path.match(/\/folder\/([^/]+)/);
        const folderId = folderIdMatch ? folderIdMatch[1] : null;
        
        if (path.includes('/myflipbooks/template/folder/')) {
            return { sectionId: "template-team", folderId };
        } else if (path.includes('/myflipbooks/folder/')) {
            return { sectionId: "flipbooks-team", folderId };
        } else if (path.includes('/myflipbooks/template')) {
            return { sectionId: "template-team", folderId: null };
        } else if (path.includes('/myflipbooks/shared-with-me')) {
            return { sectionId: "share-with-me", folderId: null };
        } else if (path.includes('/myflipbooks/trash')) {
            return { sectionId: "trash", folderId: null };
        } else if (path.includes('/myflipbooks')) {
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
                navigate(`/myflipbooks/folder/${folderId}`);
            }
        } else if (sectionId === "flipbooks-team") {
            navigate("/myflipbooks");
        } else if (sectionId === "template-team") {
            navigate("/myflipbooks/template");
        } else if (sectionId === "share-with-me") {
            navigate("/myflipbooks/shared-with-me");
        } else if (sectionId === "trash") {
            navigate("/myflipbooks/trash");
        }
    };

    const handleFolderRenamed = (updatedFolder) => {
        setFolders(prevFolders =>
            prevFolders.map(folder =>
                folder._id === updatedFolder._id ? updatedFolder : folder
            )
        );
    };

    const handleFolderDeleted = (folderId) => {
        setFolders(prevFolders =>
            prevFolders.filter(folder => folder._id !== folderId)
        );

        if (selectedItem.folderId === folderId) {
            setSelectedItem({
                ...selectedItem,
                folderId: null
            });
            
            // Navigate back to root based on current section
            if (selectedItem.sectionId === "template-team") {
                navigate("/myflipbooks/template");
            } else {
                navigate("/myflipbooks");
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
                ].map(({ sectionIcon: SectionIcon, sectionLabel, sectionType, sectionId, folderData }) => (
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
                                                            <div
                                                                className="w-6 h-6 hover:bg-[#8e65ff] flex items-center justify-center rounded-sm"
                                                                onClick={(e) => handleCreateFolder(e, sectionType)}
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
                                onClick={() => navigate('/settings/teammates')}
                            >
                                <Users />
                                Invite teammates
                            </Button>
                            <Button
                                className="w-full bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-600 hover:to-indigo-700"
                                onClick={() => navigate('/settings/billing/subscription')}
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
                folderScope={folderScope}
                onFolderCreated={(folder) => {
                    setFolders(prevFolders => [...prevFolders, folder]);
                }}
            />
        </>
    )
}