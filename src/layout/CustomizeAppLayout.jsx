import { useState } from "react";
import ProfileDropDownCom from "../components/AppLayoutComponents/ProfileDropDownCom"
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useViewMode } from "@/context/ViewModeContext";
import { Eye, Share2 } from "lucide-react";
import PreviewDialog from "@/components/EditorLayoutComponents/Preview/PreviewDialog";

export default function CustomizeAppLayout() {
    const { activeTab, setActiveTab } = useViewMode();
    const navigate = useNavigate();
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const { id } = useParams();

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

    const onPublish = () => {
        navigate(`/editor/${id}`, {
            state: {
                publish: true
            }
        })
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="fixed top-0 left-0 right-0 z-10 bg-white">
                <div className="flex h-16 w-full justify-between shrink-0 items-center px-4 md:px-6">
                    <div className="cursor-pointer" onClick={() => {
                        navigate("/myflipbooks")
                    }}>
                        <img src="/assets/logo.png" width={200} alt="Logo" />
                    </div>
                    <div className="relative lg:flex gap-6 hidden">
                        <div className="flex items-center space-x-2">
                            <TabButton label="Desktop" />
                            <TabButton label="Mobile" />
                        </div>
                    </div>
                    <div className="flex md:gap-6 gap-2 items-center">
                        <Button className="max-md:hidden" onClick={() => onPublish()}>
                            Share now
                        </Button>
                        <Button className="max-md:block hidden" variant="outline" onClick={() => setIsPreviewOpen(true)}>
                            <Eye />
                        </Button>
                        <Button className="max-md:block hidden" onClick={() => onPublish()} >
                            <Share2 />
                        </Button>
                        <ProfileDropDownCom />
                    </div>
                </div>
            </header>

            <div className="flex-1 max-md:flex mt-[64px] flex overflow-y-auto">
                <Outlet />
            </div>
            <PreviewDialog
                open={isPreviewOpen}
                onOpenChange={setIsPreviewOpen}
                flipbookId={id}
            />
        </div>

    )
}