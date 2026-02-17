import ProfileDropDownCom from "../components/AppLayoutComponents/ProfileDropDownCom"
import { Outlet, useNavigate, useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, createContext, useContext, useEffect } from "react";
import PublishShelfDailog from "../components/ShelfLayoutComponents/PublishShelfDailog";
import { GetShelfFlipbookIdsApi } from "@/service/bookshelf.service";
import { toast } from "sonner";
import { useWorkspaces } from "@/context/WorkspaceContext";
import { GetPublicFlipbookForBookshelfApi } from "@/service/flipbook.publish.service";
import TrialExpirationBanner from "@/components/AppLayoutComponents/TrialExpirationBanner";
import { useTrialExpiration } from "@/hooks/useTrialExpiration";

export const ShelfCreateContext = createContext();
export const useShelfCreate = () => useContext(ShelfCreateContext);

export default function ShelfCreateLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("Select");
    const [selectedFlipbooks, setSelectedFlipbooks] = useState([]);
    const [orderedFlipbooks, setOrderedFlipbooks] = useState([]);
    const [isPublishShelfModalOpen, setIsPublishShelfModalOpen] = useState(false);
    const [shelfData, setShelfData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const { currentWorkspace } = useWorkspaces();
    const { shouldShowBanner } = useTrialExpiration();

    const isEditMode = Boolean(id);

    useEffect(() => {
        if (location.pathname.includes("organize")) {
            setActiveTab("Organize")
        }
        if (location.pathname.includes("select")) {
            setActiveTab("Select")
        }
    }, [location.pathname])

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
        const fetchFlipbooks = async () => {
            setLoading(true);
            try {
                const response = await GetPublicFlipbookForBookshelfApi(currentWorkspace._id);
                setData(response.data);
                if (isEditMode && shelfData && response.data.flipbooks) {
                    const flipbookIds = shelfData.flipbooks || [];

                    const flipbookMap = new Map();
                    response.data.flipbooks.forEach(fb => {
                        flipbookMap.set(fb._id, fb);
                    });

                    const preSelectedFlipbooks = flipbookIds
                        .map(id => flipbookMap.get(id))
                        .filter(Boolean);

                    setSelectedFlipbooks(preSelectedFlipbooks);
                }
            } catch (err) {
                toast.error("Error fetching flipbooks", {
                    description: err.message
                });
            } finally {
                setLoading(false);
            }
        };

        if (currentWorkspace && (!isEditMode || shelfData)) {
            fetchFlipbooks();
        }
    }, [currentWorkspace, isEditMode, shelfData, setSelectedFlipbooks]);

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
            loading,
            data
        }}>
            <div className="flex flex-col min-h-screen">
                <header className="fixed top-0 left-0 right-0 z-10 bg-white">
                    <div className="flex h-16 w-full justify-between shrink-0 items-center px-3 md:px-6">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div
                                className="relative flex items-center cursor-pointer"
                                onClick={() => navigate("/myflipbooks/flipbooks")}
                            >
                                <img src="/assets/logo.png" width={200} className="my-2" alt="Logo" />
                                {/* <span className="absolute -right-6 top-3 bg-purple-600 text-white text-[9px] font-bold px-1.5 py-[1px] rounded cursor-default">
                                    BETA
                                </span> */}
                            </div>
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
                <TrialExpirationBanner  />

                <div className={`max-md:flex ${shouldShowBanner ? "mt-[104px]" : "mt-[64px]"} flex overflow-y-auto ${shouldShowBanner ? "h-[calc(100vh-104px)]" : "h-[calc(100vh-64px)]"}`}>
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