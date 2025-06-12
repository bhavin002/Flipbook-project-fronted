import { useState } from "react";
import ProfileDropDownCom from "../components/AppLayoutComponents/ProfileDropDownCom"
import { Outlet, useNavigate } from "react-router-dom";
import PublishFlipbookDialog from "@/components/AppLayoutComponents/Sidebar/Home/MyFlipbooks/PublishFlipbookDialog";
import { Button } from "@/components/ui/button";
import BottomCustomizePanel from "@/components/CustomizeLayoutComponents/BottomCustomizePanel";
import { useViewMode } from "@/context/ViewModeContext";

export default function CustomizeAppLayout() {
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
    const { activeTab, setActiveTab } = useViewMode();
    const navigate = useNavigate();

    const TabButton = ({ label }) => (
        <button
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${activeTab === label
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            onClick={() => setActiveTab(label)}
        >
            {label}
        </button>
    );

    return (
        <div className="flex flex-col min-h-screen">
            <header className="fixed top-0 left-0 right-0 z-10 bg-white">
                <div className="flex h-16 w-full justify-between shrink-0 items-center px-4 md:px-6">
                    <div className="cursor-pointer" onClick={() => {
                        navigate("/myflipbooks")
                    }}>
                        <img src="/src/assets/logo.png" width={200} alt="Logo" />
                    </div>
                    <div className="relative md:flex gap-6 hidden">
                        <div className="flex items-center space-x-2">
                            <TabButton label="Desktop" />
                            <TabButton label="Mobile" />
                        </div>
                    </div>
                    <div className="flex md:gap-6 gap-2 items-center">
                        <Button onClick={() => setIsPublishModalOpen(true)}>
                            Share now
                        </Button>
                        <ProfileDropDownCom />
                    </div>
                </div>
            </header>

            <div className="flex-1 max-md:flex mt-[64px] max-lg:mb-[80px] flex overflow-y-auto">
                <Outlet />
            </div>
            <PublishFlipbookDialog
                isPublishModalOpen={isPublishModalOpen}
                setIsPublishModalOpen={setIsPublishModalOpen}
            />
            <BottomCustomizePanel />
        </div>
    )
}