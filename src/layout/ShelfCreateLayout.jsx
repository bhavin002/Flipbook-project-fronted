import ProfileDropDownCom from "../components/AppLayoutComponents/ProfileDropDownCom"
import { Outlet, useNavigate, useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, createContext, useContext, useEffect } from "react";
import PublishShelfDailog from "../components/ShelfLayoutComponents/PublishShelfDailog";
import { GetShelfFlipbookIdsApi } from "@/service/bookshelf.service";
import { toast } from "sonner";

export const ShelfCreateContext = createContext();
export const useShelfCreate = () => useContext(ShelfCreateContext);

export default function ShelfCreateLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState(location.pathname.includes("organize") ? "Organize" : "Select");
    const [selectedFlipbooks, setSelectedFlipbooks] = useState([]); 
    const [orderedFlipbooks, setOrderedFlipbooks] = useState([]); 
    const [isPublishShelfModalOpen, setIsPublishShelfModalOpen] = useState(false);
    const [shelfData, setShelfData] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const isEditMode = Boolean(id);
    console.log("book shelf id ShelfCreateLayout", id, "isEditMode:", isEditMode);

    // Fetch shelf data if in edit mode
    useEffect(() => {
        const fetchShelfData = async () => {
            if (!isEditMode) return;
            
            setLoading(true);
            try {
                const response = await GetShelfFlipbookIdsApi(id);
                setShelfData(response.data);
            } catch (error) {
                toast.error("Failed to fetch shelf data", {
                    description: error.message
                });
            } finally {
                setLoading(false);
            }
        };

        fetchShelfData();
    }, [id, isEditMode]);

    useEffect(() => {
        if (activeTab === "Organize") {
            setOrderedFlipbooks(selectedFlipbooks);
        }
    }, [selectedFlipbooks, activeTab]);
    
    const isSelectStep = activeTab === "Select";
    const canProceed = selectedFlipbooks.length > 0;

    const handleTabClick = (label) => {
        setActiveTab(label);
        if (label === "Select") {
            navigate(isEditMode ? `/shelf/select/${id}` : "/shelf/select");
        } else if (label === "Organize" && canProceed) {
            if (orderedFlipbooks.length === 0) setOrderedFlipbooks(selectedFlipbooks);
            navigate(isEditMode ? `/shelf/organize/${id}` : "/shelf/organize");
        }
    };

    const handleNextOrShare = () => {
        if (isSelectStep && canProceed) {
            setActiveTab("Organize");
            setOrderedFlipbooks(selectedFlipbooks);
            navigate(isEditMode ? `/shelf/organize/${id}` : "/shelf/organize");
        } else if (!isSelectStep && canProceed) {
            setIsPublishShelfModalOpen(true);
        }
    };

    const TabButton = ({ label }) => (
        <button
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${activeTab === label
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            onClick={() => handleTabClick(label)}
            disabled={label === "Organize" && !canProceed}
        >
            {label}
        </button>
    );

    return (
        <ShelfCreateContext.Provider value={{
            selectedFlipbooks, setSelectedFlipbooks,
            orderedFlipbooks, setOrderedFlipbooks,
            canProceed,
            isEditMode,
            shelfData,
            loading
        }}>
            <div className="flex flex-col min-h-screen">
                <header className="fixed top-0 left-0 right-0 z-10 bg-white">
                    <div className="flex h-16 w-full justify-between shrink-0 items-center px-4 md:px-6">
                        <div className="cursor-pointer" onClick={() => {
                            navigate("/myflipbooks")
                        }}>
                            <img src="/src/assets/logo.png" width={200} alt="Logo" />
                        </div>
                        <div className="relative lg:flex gap-6 hidden">
                            <div className="flex items-center space-x-2">
                                <TabButton label="Select" />
                                <TabButton label="Organize" />
                            </div>
                        </div>
                        <div className="flex md:gap-6 gap-2 items-center">
                            <Button
                                className="max-md:hidden"
                                onClick={handleNextOrShare}
                                disabled={!canProceed}
                            >
                                {isSelectStep ? "Next step" : (isEditMode ? "Update now" : "Share now")}
                            </Button>
                            <Button
                                className="max-md:block hidden"
                                onClick={handleNextOrShare}
                                disabled={!canProceed}
                            >
                                <ArrowRight />
                            </Button>
                            <ProfileDropDownCom />
                        </div>
                    </div>
                </header>

                <div className="max-md:flex mt-[64px] flex overflow-y-auto h-[calc(100vh-64px)]">
                    <Outlet />
                </div>
                <PublishShelfDailog
                    isPublishShelfModalOpen={isPublishShelfModalOpen}
                    setIsPublishShelfModalOpen={setIsPublishShelfModalOpen}
                />
            </div>
        </ShelfCreateContext.Provider>
    )
}