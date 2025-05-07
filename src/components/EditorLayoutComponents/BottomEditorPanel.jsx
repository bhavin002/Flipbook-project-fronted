
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerContent,
} from "@/components/ui/drawer";
import { Component, LayoutPanelLeft, SquareMousePointer, Type, Upload } from 'lucide-react';
import TemplateSidebarPanel from './Templates/TemplateSidebarPanel';
import InteractionsSidebarPanel from './Interactions/InteractionsSidebarPanel';
import TextSidebarPanel from './Text/TextSidebarPanel';
import UploadsSidebarPanel from './Uploads/UploadsSidebarPanel';
import ElementsSidebarPanel from './Elements/ElementsSidebarPanel';

function NavItem({ item, isSelected, onClick }) {
    return (
        <div className='flex flex-col items-center'>
            <Button
                className={`shadow-none [&_svg]:size-5 ${isSelected ? "bg-violet-400 hover:bg-violet-400" : "hover:bg-violet-400"}`}
                onClick={onClick}
            >
                {item.icon}
                <span className="sr-only">{item.label}</span>
            </Button>
            <p className="text-xs text-white mt-1">{item.label}</p>
        </div>
    );
}


export default function BottomEditorPanel({ isEditorDrawerOpen, setIsEditorDrawerOpen, setMainStage, mainStage, selectedIndex, currentView, setCurrentView }) {
    const [selectedItem, setSelectedItem] = useState(null);

    const editorBottomNavItems = [
        {
            value: "Templates",
            icon: <LayoutPanelLeft />,
            label: "Templates",
            component: <TemplateSidebarPanel />
        },
        {
            value: "interactions",
            icon: <SquareMousePointer />,
            label: "Interactions",
            component: <InteractionsSidebarPanel setIsEditorDrawerOpen={setIsEditorDrawerOpen} setMainStage={setMainStage} mainStage={mainStage} selectedIndex={selectedIndex} />
        },
        {
            value: "text",
            icon: <Type />,
            label: "Text",
            component: <TextSidebarPanel setIsEditorDrawerOpen={setIsEditorDrawerOpen} mainStage={mainStage} selectedIndex={selectedIndex} setMainStage={setMainStage}/>
        },
        {
            value: "uploads",
            icon: <Upload />,
            label: "Uploads",
            component: <UploadsSidebarPanel mainStage={mainStage} selectedIndex={selectedIndex} setMainStage={setMainStage} setIsEditorDrawerOpen={setIsEditorDrawerOpen}/>
        },
        {
            value: "elements",
            icon: <Component />,
            label: "Elements",
            component: <ElementsSidebarPanel setIsEditorDrawerOpen={setIsEditorDrawerOpen} setMainStage={setMainStage} mainStage={mainStage} selectedIndex={selectedIndex} currentView={currentView} setCurrentView={setCurrentView} />
        }
    ];

    const handleItemClick = (itemValue) => {
        setSelectedItem(itemValue);

        // Toggle drawer if clicked on the same item, otherwise open it
        if (selectedItem === itemValue) {
            setIsEditorDrawerOpen(!isEditorDrawerOpen);
        } else {
            setIsEditorDrawerOpen(true);
        }
    };

    const renderDrawerContent = () => {
        const item = editorBottomNavItems.find(item => item.value === selectedItem);
        if (!item) return null;
        return (
            <>
                {item.component}
            </>
        );
    };


    return (
        <Drawer open={isEditorDrawerOpen} onOpenChange={setIsEditorDrawerOpen}>
            <nav className="fixed bottom-0 left-0 right-0 lg:hidden flex py-3 items-center justify-around bg-primary lg:h-16 z-10">
                {editorBottomNavItems.map(item => (
                    <NavItem
                        key={item.value}
                        item={item}
                        isSelected={selectedItem === item.value}
                        onClick={() => handleItemClick(item.value)}
                    />
                ))}
            </nav>

            <DrawerContent className="max-h-[85vh] rounded-t-xl flex flex-col">
                {renderDrawerContent()}
            </DrawerContent>
        </Drawer>
    )
}