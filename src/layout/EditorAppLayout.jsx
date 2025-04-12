import { useEffect, useState } from "react";
import ProfileDropDownCom from "../components/AppLayoutComponents/ProfileDropDownCom"
import { Outlet } from "react-router-dom";
import PublishFlipbookDialog from "@/components/AppLayoutComponents/Sidebar/Home/MyFlipbooks/PublishFlipbookDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CloudUpload, Download, Eye, SlidersHorizontal } from "lucide-react";
import ShareDropDownCom from "@/components/EditorLayoutComponents/ShareDropDownCom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/utils/AppSidebar";
import EditorSidebarNavigation from "@/components/EditorLayoutComponents/EditorSidebarNavigation";
import BottomEditorPanel from "@/components/EditorLayoutComponents/BottomEditorPanel";
import ShapeEditorLayout from "@/components/EditorLayoutComponents/Widget/ShapeEditorLayout";

export default function EditorAppLayout({ isSidebarOpen, setIsSidebarOpen }) {
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedShape, setSelectedShape] = useState([]);
    const [currentView, setCurrentView] = useState(null)
    const [mainStage, setMainStage] = useState([{
        "stageref": null,
        "CANVAS_WIDTH": 1632,
        "CANVAS_HEIGHT": 1056,
        "shapes": [
            {
                "draggable": true,
                "x": 434.83008356546094,
                "y": 283.873247414282,
                "width": 160,
                "height": 26,
                "fill": "#7bc2ff",
                "opacity": 0.3,
                "type": "rect",
                "title": "link-tags",
                "visible": true,
                "layer": "Link",
                "htmlType": "go-to-url",
                "id": "c786ef1f-37e5-44b6-8a81-0c073efe036b",
                "name": "shape",
                "rotation": 0,
                "scaleX": 2.3635097493036152,
                "scaleY": 6.473258078064039,
                "skewX": 0,
                "skewY": 0
            }
        ],
        "selectedShapes": [],
        "background": "#fff",
        "dragRect": {
            "current": null
        },
        "dragImg": {
            "current": null
        }
    }]);
    const [selectedSubMenu, setSelectedSubMenu] = useState(null);

    return (
        <div className="flex flex-col min-h-screen">
            <header className="fixed top-0 left-0 right-0 z-10 bg-white max-md:space-y-4">
                <div className="flex h-16 w-full justify-between shrink-0 items-center px-4 md:px-6">
                    <div>
                        <img src="/src/assets/logo.png" width={200} alt="Logo" />
                    </div>
                    <div className="relative md:flex hidden">
                        <div className="flex items-center gap-2">
                            <Input type="text" placeholder="Flipbook name" className="w-56" />
                            <Button variant="outline">
                                <CloudUpload />
                            </Button>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="flex gap-2">
                            <div className="flex gap-2 max-lg:hidden">
                                <Button variant="outline">
                                    <SlidersHorizontal />
                                </Button>
                                <Button variant="outline">
                                    <Download />
                                </Button>
                                <Button variant="outline">
                                    <Eye /> Preview
                                </Button>
                            </div>
                            <Button className="hidden max-lg:block">
                                <ShareDropDownCom />
                            </Button>
                            <Button className="max-lg:hidden" onClick={() => setIsPublishModalOpen(true)}>
                                Share now
                            </Button>
                        </div>
                        <ProfileDropDownCom />
                    </div>
                </div>
                <div className="relative md:flex px-4">
                    <div className="hidden items-center gap-2 max-md:flex">
                        <Input type="text" placeholder="Flipbook name" />
                        <Button variant="outline">
                            <CloudUpload />
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex-1 max-md:flex md:mt-[64px] max-md:mt-[156px] max-md:mb-[80px] overflow-y-auto">
                <div className="flex flex-1">
                    <div className="hidden relative md:flex h-[calc(var(--vh, 1vh) * 100 - 64px)] flex-col items-center justify-between overflow-hidden">
                        <SidebarProvider value={{ selectedItem, setSelectedItem, width: "23rem" }}>
                            <EditorSidebarNavigation currentView={currentView} setCurrentView={setCurrentView} mainStage={mainStage} setSelectedShape={setSelectedShape} selectedSubMenu={selectedSubMenu} setSelectedSubMenu={setSelectedSubMenu} selectedIndex={selectedIndex} setSelectedItem={setSelectedItem} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                            <AppSidebar currentView={currentView}  setCurrentView={setCurrentView} mainStage={mainStage} selectedIndex={selectedIndex} />
                            <ShapeEditorLayout mainStage={mainStage} selectedIndex={selectedIndex} setMainStage={setMainStage} selectedSubMenu={selectedSubMenu} selectedShape={selectedShape} />
                        </SidebarProvider>
                    </div>

                    <div className="flex flex-1 flex-col md:max-h-[calc(100vh-64px)] md:overflow-y-auto">
                        <Outlet context={{ isSidebarOpen, selectedShape, selectedIndex, setSelectedIndex, mainStage, setMainStage, selectedSubMenu, setSelectedSubMenu }} />
                    </div>
                </div>
            </div>
            <PublishFlipbookDialog
                isPublishModalOpen={isPublishModalOpen}
                setIsPublishModalOpen={setIsPublishModalOpen}
            />
            <BottomEditorPanel />
        </div>
    )
}