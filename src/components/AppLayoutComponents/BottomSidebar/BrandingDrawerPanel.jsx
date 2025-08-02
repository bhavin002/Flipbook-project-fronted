import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getData } from "@/utils/datas";

export default function BrandingDrawerPanel({ onCloseDrawer }) {
  const navigate = useNavigate();
  const location = useLocation();
  const permissions = getData("permission")
  
  const brandingMenuItems = getData('brandingMenuItems');

  const [selectedMainItem, setSelectedMainItem] = useState('brand-profile');
  const [selectedSubItem, setSelectedSubItem] = useState('settings');
  const [isProfileOpen, setIsProfileOpen] = useState(true);

  const filteredBrandingMenuItems = brandingMenuItems.filter(item => {
    if (item.id === 'brand-profile') {
      return permissions?.branding_profile;
    }
    return permissions?.branding;
  });

  useEffect(() => {
    const currentPath = location.pathname;
    
    if (currentPath.includes('/branding/profile/')) {
      setIsProfileOpen(true);
      setSelectedMainItem('brand-profile');
      
      const profileItem = filteredBrandingMenuItems.find(item => item.id === 'brand-profile');
      if (profileItem) {
        const matchedSubItem = profileItem.subItems.find(subItem => 
          currentPath === subItem.path
        );
        
        if (matchedSubItem) {
          setSelectedSubItem(matchedSubItem.id);
        }
      }
    } else {
      const matchedItem = filteredBrandingMenuItems.find(item => 
        currentPath === item.path || 
        (item.path !== '/branding/profile' && currentPath.startsWith(item.path))
      );
      
      if (matchedItem) {
        setSelectedMainItem(matchedItem.id);
        setSelectedSubItem(null);
        
        if (isProfileOpen && matchedItem.id !== 'brand-profile') {
          setIsProfileOpen(false);
        }
      }
    }
  }, [location.pathname, filteredBrandingMenuItems]);

  const handleMainItemSelect = (itemId) => {
    const selectedItem = filteredBrandingMenuItems.find(item => item.id === itemId);
    
    if (itemId === 'brand-profile') {
      if (!isProfileOpen) {
        // Open the collapsible and navigate to first sub-item
        setIsProfileOpen(true);
        setSelectedMainItem('brand-profile');
        
        const firstSubItem = selectedItem.subItems[0];
        setSelectedSubItem(firstSubItem.id);
        navigate(firstSubItem.path);
        if (onCloseDrawer) onCloseDrawer();
      } else {
        // Close the collapsible and navigate away from profile
        setIsProfileOpen(false);
        setSelectedSubItem(null);
        
        // Navigate to a non-profile page to avoid useEffect reopening it
        const nonProfileItem = filteredBrandingMenuItems.find(item => item.id !== 'brand-profile');
        if (nonProfileItem) {
          setSelectedMainItem(nonProfileItem.id);
          navigate(nonProfileItem.path);
          if (onCloseDrawer) onCloseDrawer();
        } else {
          setSelectedMainItem(null);
        }
      }
    } else {
      setSelectedMainItem(itemId);
      setSelectedSubItem(null);
      
      if (isProfileOpen) {
        setIsProfileOpen(false);
      }
      
      navigate(selectedItem.path);
      if (onCloseDrawer) onCloseDrawer();
    }
  };

  const handleSubItemSelect = (subItemId) => {
    setSelectedSubItem(subItemId);
    setSelectedMainItem('brand-profile');
    
    const profileItem = filteredBrandingMenuItems.find(item => item.id === 'brand-profile');
    const selectedSubItem = profileItem.subItems.find(subItem => subItem.id === subItemId);
    
    if (selectedSubItem) {
      navigate(selectedSubItem.path);
      if (onCloseDrawer) onCloseDrawer();
    }
  };

  const MenuButton = ({ isActive, onClick, children }) => {
    return (
      <button
        className={`flex items-center w-full p-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : ""
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  if (!permissions?.branding && !permissions?.branding_profile) {
    return null;
  }

  return (
    <div className="flex flex-col h-full max-h-[calc(85vh-24px)]">
      <div className="flex items-center text-xl p-4 font-medium border-b">
        Branding
      </div>
      
      <ScrollArea className="flex-1 px-2 py-2">
        <div className="space-y-1">
          {filteredBrandingMenuItems.map((item) => (
            <div key={item.id}>
              {item.id === 'brand-profile' ? (
                <Collapsible
                  open={isProfileOpen}
                  className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                >
                  <CollapsibleTrigger asChild>
                    <MenuButton
                      isActive={selectedMainItem === item.id && !selectedSubItem}
                      onClick={() => handleMainItemSelect(item.id)}
                    >
                      <ChevronRight className="h-4 w-4 transition-transform mr-2" />
                      {item.label}
                    </MenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="pl-6 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <MenuButton
                          key={subItem.id}
                          isActive={selectedSubItem === subItem.id}
                          onClick={() => handleSubItemSelect(subItem.id)}
                        >
                          {subItem.label}
                        </MenuButton>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <MenuButton
                  isActive={selectedMainItem === item.id}
                  onClick={() => handleMainItemSelect(item.id)}
                >
                  {item.label}
                </MenuButton>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}