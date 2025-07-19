import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getData } from "@/utils/datas";

export default function SettingsDrawerPanel({ onCloseDrawer }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const settingMenuItems = getData('settingMenuItems');

  const [selectedMainItem, setSelectedMainItem] = useState('workspace');
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [isBillingOpen, setIsBillingOpen] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname;
    
    if (currentPath.includes('/settings/billing/')) {
      setIsBillingOpen(true);
      setSelectedMainItem('billing');
      
      const billingItem = settingMenuItems.find(item => item.id === 'billing');
      const matchedSubItem = billingItem.subItems.find(subItem => 
        currentPath === subItem.path
      );
      
      if (matchedSubItem) {
        setSelectedSubItem(matchedSubItem.id);
      }
    } else {
      const matchedItem = settingMenuItems.find(item => 
        currentPath === item.path
      );
      
      if (matchedItem) {
        setSelectedMainItem(matchedItem.id);
        setSelectedSubItem(null);
        
        if (isBillingOpen && matchedItem.id !== 'billing') {
          setIsBillingOpen(false);
        }
      }
    }
  }, [location.pathname]);

  const handleMainItemSelect = (itemId) => {
    const selectedItem = settingMenuItems.find(item => item.id === itemId);
    
    if (itemId === 'billing') {
      if (!isBillingOpen) {
        setIsBillingOpen(true);
        setSelectedMainItem('billing');
        
        const firstSubItem = selectedItem.subItems[0];
        setSelectedSubItem(firstSubItem.id);
        navigate(firstSubItem.path);
      } else {
        setIsBillingOpen(false);
      }
    } else {
      setSelectedMainItem(itemId);
      setSelectedSubItem(null);
      
      if (isBillingOpen) {
        setIsBillingOpen(false);
      }
      
      navigate(selectedItem.path);
      if (onCloseDrawer) onCloseDrawer();
    }
  };

  const handleSubItemSelect = (subItemId) => {
    setSelectedSubItem(subItemId);
    setSelectedMainItem('billing');
    
    const billingItem = settingMenuItems.find(item => item.id === 'billing');
    const selectedSubItem = billingItem.subItems.find(subItem => subItem.id === subItemId);
    
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

  return (
    <div className="flex flex-col h-full max-h-[calc(85vh-24px)]">
      <div className="flex items-center text-xl p-4 font-medium border-b">
        Settings
      </div>
      
      <ScrollArea className="flex-1 px-2 py-2">
        <div className="space-y-1">
          {settingMenuItems.map((item) => (
            <div key={item.id}>
              {item.id === 'billing' ? (
                <Collapsible
                  open={isBillingOpen}
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