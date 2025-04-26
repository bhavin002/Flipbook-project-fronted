import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { getData } from '@/utils/datas';

function NavItem({ item, isSelected, onClick }) {
    const { icon: Icon, label } = item;

    return (
        <div className='flex flex-col items-center'>
            <Button
                className={`shadow-none [&_svg]:size-5 ${isSelected ? "bg-violet-400 hover:bg-violet-400" : "hover:bg-violet-400"}`}
                onClick={onClick}
            >
                <Icon />
            </Button>
            <p className="text-xs text-white mt-1">{label}</p>
        </div>
    );
};

export default function SidebarNavigation({ windowInnerWidth, currentView, setCurrentView, mainStage, setSelectedShape, selectedSubMenu, setSelectedSubMenu, selectedIndex, isSidebarOpen, setIsSidebarOpen, setSelectedItem }) {
    const { setOpen, setSelectedItem: setGlobalSelectedItem, selectedItem, open } = useSidebar();
    const navItems = getData('editorNavItems');

    useEffect(() => {
        setGlobalSelectedItem('templates');
    }, []);

    useEffect(() => {
        setIsSidebarOpen(open);
    }, [open, setIsSidebarOpen]);

    useEffect(() => {
        if (!mainStage[selectedIndex].selectedShapes.length) {
            setSelectedShape(mainStage[selectedIndex].selectedShapes)
            setSelectedSubMenu(null);
            return;
        }
        if (mainStage[selectedIndex].selectedShapes.length === 1 && (mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "go-to-url" || mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "popup-frame" || mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "spotlight" || mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "photo-slideshow")) {
            setSelectedShape(mainStage[selectedIndex].selectedShapes)
            if (!isSidebarOpen) {
                setSelectedItem("interactions")
                setIsSidebarOpen(true);
                setOpen(true);
            }
            windowInnerWidth >= 1024 && setSelectedSubMenu("hyperlink");
        } else if (mainStage[selectedIndex].selectedShapes.length === 1 && mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "go-to-button-link") {
            setSelectedShape(mainStage[selectedIndex].selectedShapes)
            if (!isSidebarOpen) {
                setSelectedItem("interactions")
                setIsSidebarOpen(true);
                setOpen(true);
            }
            windowInnerWidth >= 1024 && setSelectedSubMenu("link");
        } else if (mainStage[selectedIndex].selectedShapes.length === 1 && mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "link-tag") {
            setSelectedShape(mainStage[selectedIndex].selectedShapes)
            if (!isSidebarOpen) {
                setSelectedItem("interactions")
                setIsSidebarOpen(true);
                setOpen(true);
            }
            windowInnerWidth >= 1024 && setSelectedSubMenu("tag");
        } else if (mainStage[selectedIndex].selectedShapes.length === 1 && (mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "square-caption")) {
            setSelectedShape(mainStage[selectedIndex].selectedShapes)
            if (!isSidebarOpen) {
                setSelectedItem("interactions")
                setIsSidebarOpen(true);
                setOpen(true);
            }
            windowInnerWidth >= 1024 && setSelectedSubMenu("caption");
        } else if (mainStage[selectedIndex].selectedShapes.length === 1 && (mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "embed-code")) {
            setSelectedShape(mainStage[selectedIndex].selectedShapes)
            if (!isSidebarOpen) {
                setSelectedItem("interactions")
                setIsSidebarOpen(true);
                setOpen(true);
            }
            windowInnerWidth >= 1024 && setSelectedSubMenu("embed");
        } else if (mainStage[selectedIndex].selectedShapes.length === 1 && (mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "slideshow")) {
            setSelectedShape(mainStage[selectedIndex].selectedShapes)
            if (!isSidebarOpen) {
                setSelectedItem("interactions")
                setIsSidebarOpen(true);
                setOpen(true);
            }
            windowInnerWidth >= 1024 && setSelectedSubMenu("slideshow");
        } else if (mainStage[selectedIndex].selectedShapes.length === 1 && (mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "video-embed")) {
            setSelectedShape(mainStage[selectedIndex].selectedShapes)
            if (!isSidebarOpen) {
                setSelectedItem("interactions")
                setIsSidebarOpen(true);
                setOpen(true);
            }
            windowInnerWidth >= 1024 && setSelectedSubMenu("video-embed");
        } else if (mainStage[selectedIndex].selectedShapes.length === 1 && (mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "video-button")) {
            setSelectedShape(mainStage[selectedIndex].selectedShapes)
            if (!isSidebarOpen) {
                setSelectedItem("interactions")
                setIsSidebarOpen(true);
                setOpen(true);
            }
            windowInnerWidth >= 1024 && setSelectedSubMenu("video-button");
        } else if (mainStage[selectedIndex].selectedShapes.length === 1 && (mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "audio-button")) {
            setSelectedShape(mainStage[selectedIndex].selectedShapes)
            if (!isSidebarOpen) {
                setSelectedItem("interactions")
                setIsSidebarOpen(true);
                setOpen(true);
            }
            windowInnerWidth >= 1024 && setSelectedSubMenu("audio-button");
        } else if (mainStage[selectedIndex].selectedShapes.length === 1 && (mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "shop-area" || mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "shop-button")) {
            setSelectedShape(mainStage[selectedIndex].selectedShapes)
            if (!isSidebarOpen) {
                setSelectedItem("interactions")
                setIsSidebarOpen(true);
                setOpen(true);
            }
            windowInnerWidth >= 1024 && setSelectedSubMenu("shopping-list");
        } else if (mainStage[selectedIndex].selectedShapes.length === 1 && (mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "product-tag")) {
            setSelectedShape(mainStage[selectedIndex].selectedShapes)
            if (!isSidebarOpen) {
                setSelectedItem("interactions")
                setIsSidebarOpen(true);
                setOpen(true);
            }
            windowInnerWidth >= 1024 && setSelectedSubMenu("product-tag");
        } else if (mainStage[selectedIndex].selectedShapes.length === 1 && (mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "quiz")) {
            setSelectedShape(mainStage[selectedIndex].selectedShapes)
            if (!isSidebarOpen) {
                setSelectedItem("interactions")
                setIsSidebarOpen(true);
                setOpen(true);
            }
            windowInnerWidth >= 1024 && setSelectedSubMenu("quiz");
        } else if (mainStage[selectedIndex].selectedShapes.length === 1 && (mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "question")) {
            setSelectedShape(mainStage[selectedIndex].selectedShapes)
            if (!isSidebarOpen) {
                setSelectedItem("interactions")
                setIsSidebarOpen(true);
                setOpen(true);
            }
            windowInnerWidth >= 1024 && setSelectedSubMenu("question");
        } else if (mainStage[selectedIndex].selectedShapes.length === 1 && (mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "contact-form")) {
            setSelectedShape(mainStage[selectedIndex].selectedShapes)
            if (!isSidebarOpen) {
                setSelectedItem("interactions")
                setIsSidebarOpen(true);
                setOpen(true);
            }
            windowInnerWidth >= 1024 && setSelectedSubMenu("contact-form");
        } else if (mainStage[selectedIndex].selectedShapes.length === 1 && (mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "go-to-previous-page" || mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "go-to-next-page" || mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "go-to-first-page" || mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "go-to-last-page")) {
            setSelectedShape(mainStage[selectedIndex].selectedShapes)
            if (!isSidebarOpen) {
                setSelectedItem("interactions")
                setIsSidebarOpen(true);
                setOpen(true);
            }
            windowInnerWidth >= 1024 && setSelectedSubMenu("page-options");
        } else if (mainStage[selectedIndex].selectedShapes.length === 1 && (mainStage[selectedIndex].selectedShapes[0].attrs.htmlType === "go-to-page")) {
            setSelectedShape(mainStage[selectedIndex].selectedShapes)
            if (!isSidebarOpen) {
                setSelectedItem("interactions")
                setIsSidebarOpen(true);
                setOpen(true);
            }
            windowInnerWidth >= 1024 && setSelectedSubMenu("go-to-page");
        } else if (mainStage[selectedIndex].selectedShapes.every(e => e.attrs.htmlType === "text")) {
            setSelectedShape(mainStage[selectedIndex].selectedShapes)
            if (!isSidebarOpen) {
                setSelectedItem("interactions")
                setIsSidebarOpen(true);
                setOpen(true);
            }
            windowInnerWidth >= 1024 && setSelectedSubMenu("text");
        } else {
            setSelectedSubMenu(null);
            setSelectedShape(mainStage[selectedIndex].selectedShapes)
        }
    }, [mainStage[selectedIndex].selectedShapes])

    const handleItemClick = (itemId) => {
        if (selectedItem === itemId) {
            if (selectedSubMenu) {
                setSelectedSubMenu(null);
                return;
            }
            if (currentView) {
                setCurrentView(null);
                return;
            }
            const newOpenState = !open;
            setOpen(newOpenState);
            setIsSidebarOpen(newOpenState);
        } else {
            if (selectedSubMenu) {
                setSelectedSubMenu(null);
            }
            setGlobalSelectedItem(itemId);
            setOpen(true);
            setIsSidebarOpen(true);
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] w-[75px] flex-col items-center bg-primary py-4 z-[11] ">
            <div className="space-y-3 w-full">
                {navItems.map(item => (
                    <NavItem
                        key={item.id}
                        item={item}
                        isSelected={selectedItem === item.id}
                        onClick={() => handleItemClick(item.id)}
                    />
                ))}
            </div>
        </div>
    );
};