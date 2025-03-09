import React, { useState } from "react";
import { ChevronRight, Folder, BookOpen, Users, UserCheck, LayoutPanelLeft, Trash, Crown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CreateFolderDialog from "../sidebar/home/CreateFolderDialog";
import FolderDropdown from "../sidebar/home/FolderDropdown";
import { getData } from "@/utils/datas";

export default function HomeDrawerPanel() {
  const sidebarSections = getData('sidebarSections');

  const [selectedItem, setSelectedItem] = useState({
    sectionId: "flipbooks-team",
    folderId: null
  });

  const handleItemSelect = (sectionId, folderId = null) => {
    setSelectedItem({ sectionId, folderId });
  };

  const MenuButton = ({ isActive, onClick, children }) => {
    return (
      <button
        className={`flex items-center w-full p-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : ""
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
          { sectionIcon: BookOpen, sectionLabel: 'Flipbooks', sectionType: 'flipbooks' },
          { sectionIcon: LayoutPanelLeft, sectionLabel: 'Template', sectionType: 'template' }
        ].map(({ sectionIcon: SectionIcon, sectionLabel, sectionType }) => (
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
                      defaultOpen={selectedItem.sectionId === section.id}
                    >
                      <CollapsibleTrigger asChild>
                        <MenuButton
                          isActive={selectedItem.sectionId === section.id && !selectedItem.folderId}
                          onClick={() => handleItemSelect(section.id)}
                        >
                          <ChevronRight className="h-4 w-4 transition-transform mr-1" />
                          <section.icon className="h-4 w-4 mr-2" />
                          <div className="flex items-center justify-between w-full">
                            {section.label}
                            <div onClick={(e) => e.preventDefault()}>
                              <CreateFolderDialog />
                            </div>
                          </div>
                        </MenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="pl-6 mt-1 space-y-1">
                          {section.folders.map(folder => (
                            <MenuButton
                              key={folder.id}
                              isActive={selectedItem.folderId === folder.id}
                              onClick={() => handleItemSelect(section.id, folder.id)}
                            >
                              <Folder className="h-4 w-4 mr-2" />
                              <div className="flex items-center justify-between w-full">
                                {folder.name}
                                <div onClick={(e) => e.preventDefault()}>
                                  <FolderDropdown />
                                </div>
                              </div>
                            </MenuButton>
                          ))}
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
    </div>
  );
}