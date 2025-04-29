import React, { useEffect, useState } from "react";
import { ChevronRight, Folder, BookOpen, Users, UserCheck, LayoutPanelLeft, Trash, Crown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FolderDropdown from "../Sidebar/Home/FolderDropdown";
import { getData } from "@/utils/datas";
import { toast } from "sonner";
import CreateFolderDialog from "../Sidebar/Home/CreateFolderDialog";
import { GetWorkspaceFoldersApi } from "@/service/folder.service";
import { FolderSkeleton } from "@/utils/Skeleton";
import { FolderPlus } from "lucide-react";
import {
  SidebarMenuButton,
  SidebarMenuSub,
} from "@/components/ui/sidebar";



export default function HomeDrawerPanel() {
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
    }
  };

  const normalFolders = folders.filter(folder => folder.folderScope === 0);
  const templateFolders = folders.filter(folder => folder.folderScope === 1);

  const MenuButton = ({ isActive, onClick, children }) => {
    return (
      <button
        className={`flex items-center w-full p-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : ""
          }`}
        onClick={(e) => {
          if (!e.isDefaultPrevented()) {
            onClick(e);
          }
        }}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(85vh-24px)]">
      <div className="flex-1 overflow-y-auto">
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
          <div key={sectionLabel} className="mb-4">
            <div className="px-3 py-2 text-sm font-medium flex items-center">
              <SectionIcon className="mr-1 h-4 w-4" /> {sectionLabel}
            </div>
            <div className="space-y-1">
              {sidebarSections
                .filter(section => section.type === sectionType)
                .map(section => (
                  <div key={section.id} className="px-2">
                    <Collapsible
                      className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                      defaultOpen={true}
                    >
                      <CollapsibleTrigger asChild>
                        <MenuButton
                          onClick={() => handleItemSelect(section.id)}
                          isActive={selectedItem.sectionId === section.id && !selectedItem.folderId}
                        >
                          <ChevronRight className="h-4 w-4 transition-transform mr-1" />
                          <section.icon className="h-4 w-4 mr-1" />
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
                        </MenuButton>
                      </CollapsibleTrigger>
                      {/* <CollapsibleContent>
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
                      </CollapsibleContent> */}
                      <CollapsibleContent>
                        <div className="pl-6 mt-1 space-y-1">
                          {isLoading ? (
                            <div className="mt-1">
                              {Array(3).fill().map((_, index) => (
                                <FolderSkeleton key={`skeleton-${index}`} />
                              ))}
                            </div>
                          ) : (
                            folderData.length > 0 ? folderData.map(folder => (
                              <MenuButton
                                key={folder._id}
                                isActive={selectedItem.folderId === folder._id}
                                onClick={() => handleItemSelect(section.id, folder._id)}
                              >
                                <Folder className="h-4 w-4 mr-2" />
                                <div className="flex items-center justify-between w-full">
                                  {folder.name}
                                  <div onClick={(e) => e.preventDefault()}>
                                    <FolderDropdown
                                      folder={folder}
                                      onFolderRenamed={handleFolderRenamed}
                                      onFolderDeleted={handleFolderDeleted}
                                    />
                                  </div>
                                </div>
                              </MenuButton>
                            )) : (
                              <p className="text-white text-xs py-2 px-3 text-center">No folders found</p>
                            )
                          )
                          }
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                ))}
              {sectionType === 'flipbooks' && (
                <div className="px-2">
                  <MenuButton
                    isActive={selectedItem.sectionId === 'share-with-me'}
                    onClick={() => handleItemSelect('share-with-me')}
                  >
                    <UserCheck className="h-4 w-4 mr-2" />
                    Share with me
                  </MenuButton>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <Separator className="my-2" />
        <div className="p-2">
          <div className="space-y-1">
            <MenuButton
              isActive={selectedItem.sectionId === 'trash'}
              onClick={() => handleItemSelect('trash')}
            >
              <Trash className="h-4 w-4 mr-2" />
              Trash
            </MenuButton>
          </div>
          <div className="space-y-2 mt-2">
            <Button
              className="w-full bg-violet-700"
            >
              <Users className="h-4 w-4 mr-2" />
              Invite teammates
            </Button>
            <Button
              className="w-full bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-600 hover:to-indigo-700"
            >
              <Crown className="h-4 w-4 mr-2" />Upgrade
            </Button>
          </div>
        </div>
      </div>
      <CreateFolderDialog
        isCreateFolderModalOpen={isCreateFolderModalOpen}
        setIsCreateFolderModalOpen={setIsCreateFolderModalOpen}
        onFolderCreated={(folder) => {
          setFolders(prevFolders => [...prevFolders, folder]);
        }}
      />
    </div>
  );
}