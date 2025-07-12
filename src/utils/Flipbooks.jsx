import MyFlipbookDropdown from '../components/AppLayoutComponents/Sidebar/Home/MyFlipbooks/MyFlipbookDropdown'
import ShareFlipbookDialog from '../components/AppLayoutComponents/Sidebar/Home/MyFlipbooks/ShareFlipbookDialog'
import { useEffect, useState } from 'react';
import PublishFlipbookDialog from '../components/AppLayoutComponents/Sidebar/Home/MyFlipbooks/PublishFlipbookDialog'
import { getData } from '@/utils/datas';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Checkbox } from "@/components/ui/checkbox";
import { X, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MoveToFolderDropdown from '@/components/AppLayoutComponents/Sidebar/Home/MyFlipbooks/MoveToFolderDropdown';
import ConfirmationDialog from "@/utils/ConfirmationDialog";
import { MoveToTrashFlipbookApi, DeleteFlipbookApi, RecoverFlipbookApi } from "@/service/flipbook.service";
import { toast } from "sonner";

export default function Flipbooks({ isLoading, flipbooks, isSidebarOpen, setFlipbooks, isTrash = false, isFolder = false, view }) {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [selectedFlipbooks, setSelectedFlipbooks] = useState([]);
    const [isTrashModalOpen, setIsTrashModalOpen] = useState(false);
    const [isDeleteForeverModalOpen, setIsDeleteForeverModalOpen] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const router = useNavigate();
    const location = useLocation();
    const [flipbookId, setFlipbookId] = useState(null);

    useEffect(() => {
        setSelectedFlipbooks([]);
    }, [location.pathname]);

    const unpublishedButtons = getData('unpublishedButtons');
    const publishedButtons = getData('publishedButtons');
    const templateButtons = getData('templateButtons');

    const handleItemClick = (action, flipbookId) => {
        if (action === 'share') {
            setFlipbookId(flipbookId)
            setIsShareModalOpen(true);
        } else if (action === 'publish') {
            router(`/editor/${flipbookId}`, {
                state: {
                    publish: true
                }
            })
        } else if (action === "details") {
            router(`/details/${flipbookId}`)
        } else if (action === "stats") {
            router(`/stats/${flipbookId}`)
        } else if (action === "customize") {
            router(`/customize/${flipbookId}`)
        } else if (action === "edit") {
            router(`/editor/${flipbookId}`)
        } else if (action === "use-template") {
            router(`/editor/${flipbookId}`)
        } else if (action === "view") {
            window.open(`/public-flipbook/${flipbookId}`, '_blank');
        } else {
            console.error("Invalid action:", action);
        }
    };

    const getButtonsForStatus = (status) => {
        console.log("status", status);
        if (isTrash) {
            return [];
        }

        switch (status) {
            case 'Draft':
                return publishedButtons;
            case 'Published':
                return publishedButtons;
            case 'Not Published':
                return unpublishedButtons;
            case 'Template':
                return templateButtons;
        }
    };

    const getStatusBadgeStyle = (status) => {
        switch (status) {
            case 'Draft':
                return 'bg-purple-100/50 text-purple-700';
            case 'Published':
                return 'bg-green-100/50 text-green-700';
            case 'Not Published':
                return 'bg-red-100/50 text-red-700';
            case 'Template':
                return 'bg-[#ebd6ff] text-[#7a1f5b]';
            case 'Deleted':
                return 'bg-gray-100/50 text-gray-700';
            default:
                return 'bg-gray-100/50 text-gray-700';
        }
    };

    const getStatusDisplayText = (status) => {
        switch (status) {
            case 'Draft':
                return 'Draft';
            case 'Published':
                return 'Published';
            case 'Not Published':
                return 'Not published';
            case 'Template':
                return 'Template';
            case 'Deleted':
                return 'Deleted';
            default:
                return 'Unknown';
        }
    };

    const handleFlipbookSelection = (e, flipbookId) => {
        e.stopPropagation();

        setSelectedFlipbooks(prev => {
            if (prev.includes(flipbookId)) {
                return prev.filter(id => id !== flipbookId);
            } else {
                return [...prev, flipbookId];
            }
        });
    };

    const clearSelection = () => {
        setSelectedFlipbooks([]);
    };

    // Handle multiple flipbooks move to trash
    const handleTrashConfirmation = async (confirmed) => {
        if (confirmed) {
            setActionLoading(true);
            try {
                const response = await MoveToTrashFlipbookApi({
                    flipbookIds: selectedFlipbooks
                });

                setFlipbooks(prev => prev.filter(item => !selectedFlipbooks.includes(item._id)));

                toast.success("Flipbooks moved to trash", {
                    description: response.message || `${selectedFlipbooks.length} flipbooks were successfully moved to trash`
                });

                clearSelection();
                setIsTrashModalOpen(false);
            } catch (error) {
                toast.error("Failed to move flipbooks to trash", {
                    description: error.message || "Something went wrong",
                });
            } finally {
                setActionLoading(false);
            }
        } else {
            setIsTrashModalOpen(false);
        }
    };

    // Handle multiple flipbooks delete forever
    const handleDeleteForeverConfirmation = async (confirmed) => {
        if (confirmed) {
            setActionLoading(true);
            try {
                const response = await DeleteFlipbookApi({
                    flipbookIds: selectedFlipbooks
                });

                setFlipbooks(prev => prev.filter(item => !selectedFlipbooks.includes(item._id)));

                toast.success("Flipbooks deleted permanently", {
                    description: response.message || `${selectedFlipbooks.length} flipbooks were permanently deleted`
                });

                clearSelection();
                setIsDeleteForeverModalOpen(false);
            } catch (error) {
                toast.error("Failed to delete flipbooks", {
                    description: error.message || "Something went wrong",
                });
            } finally {
                setActionLoading(false);
            }
        } else {
            setIsDeleteForeverModalOpen(false);
        }
    };

    // Handle multiple flipbooks recover - directly without confirmation
    const handleRecover = async () => {
        setActionLoading(true);
        try {
            const response = await RecoverFlipbookApi({
                flipbookIds: selectedFlipbooks
            });

            setFlipbooks(prev => prev.filter(item => !selectedFlipbooks.includes(item._id)));

            toast.success("Flipbooks recovered", {
                description: response.message || `${selectedFlipbooks.length} flipbooks were successfully recovered`
            });

            clearSelection();
        } catch (error) {
            toast.error("Failed to recover flipbooks", {
                description: error.message || "Something went wrong",
            });
        } finally {
            setActionLoading(false);
        }
    };

    const SkeletonCard = () => (
        <div className="bg-white rounded-xl overflow-hidden shadow-md border border-violet-100 animate-pulse">
            <div className="relative bg-[#ede9f5] h-[200px]"></div>
            <div className="px-4 pt-4 mt-[-15px] rounded-t-xl z-[11] relative bg-white">
                <div className="flex items-center justify-between">
                    <div className="h-6 bg-[#ede9f5] rounded w-3/4"></div>
                    <div className="h-8 w-8 bg-[#ede9f5] rounded-full"></div>
                </div>
                <div className="h-4 bg-[#ede9f5] rounded w-1/2 mt-2"></div>
                <div className="flex gap-2 justify-center py-3 flex-wrap">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="h-8 w-8 bg-[#ede9f5] rounded-lg"></div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 ${isSidebarOpen ? "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" : "lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"} gap-4 p-6`}>
                    {[...Array(6)].map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            );
        }

        return (
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 ${isSidebarOpen ? "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" : "lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"} gap-4 p-6`}>
                {flipbooks.map((flipbook) => {
                    const isSelected = selectedFlipbooks.includes(flipbook._id);

                    return (
                        <div
                            key={flipbook._id}
                            className="bg-white opacity-0 animate-fade-in rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-violet-100 relative group"
                        >
                            <div
                                className={`absolute inset-0 bg-black/40 opacity-0 ${isSelected ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity z-10 flex items-center justify-center`}
                                onClick={(e) => handleFlipbookSelection(e, flipbook._id)}
                            >
                                <div className="absolute top-3 left-3 transform transition-transform duration-200">
                                    <Checkbox
                                        checked={isSelected}
                                        className="h-5 w-5 border-2 border-white data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                        onClick={(e) => e.stopPropagation()}
                                        onCheckedChange={() => {
                                            handleFlipbookSelection({ stopPropagation: () => { } }, flipbook._id);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="relative bg-[#ede9f5] backdrop-blur-sm p-3">
                                <img
                                    src={`${flipbook.thumbnail ? flipbook.thumbnail : "/src/assets/book_thumbnail.jpg"}`}
                                    alt="Flipbook Cover"
                                    className={`max-h-[200px] h-full m-auto transition-transform duration-500 rounded-t-md`}
                                />
                            </div>

                            <div className="px-4 pt-4 mt-[-15px] space-y-1 rounded-t-xl z-[11] relative bg-white h-full">
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-sm inline-flex items-center ${getStatusBadgeStyle(flipbook.tag ? flipbook.tag : flipbook.flipbookState)}`}>
                                    <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70"></span>
                                    {getStatusDisplayText(flipbook.tag ? flipbook.tag : flipbook.flipbookState)}
                                </span>
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-violet-900 transition-colors duration-200 hover:text-violet-600">
                                        {flipbook.name}
                                    </h3>
                                    <MyFlipbookDropdown status={flipbook.tag ? flipbook.tag : flipbook.flipbookState} flipbook={flipbook} setFlipbooks={setFlipbooks} isTrash={isTrash} />
                                </div>

                                <p className="text-sm text-violet-600">
                                    Created: {format(flipbook.createdAt, "MMM d, yyyy")} by {flipbook.createdBy.firstName} {flipbook.createdBy.lastName}
                                </p>

                                <div className="flex gap-2 justify-center py-3 flex-wrap">
                                    {getButtonsForStatus(flipbook.tag ? flipbook.tag : flipbook.flipbookState).map((btn, index) => (
                                        <button
                                            key={index}
                                            className={`p-2 hover:-translate-y-[1px] rounded-lg ${btn.color} ${btn.bg} ${btn.hover} hover:scale-110 transition-all duration-200`}
                                            title={btn.title}
                                            onClick={() => handleItemClick(btn.value, flipbook._id)}
                                        >
                                            <btn.icon size={16} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <>
            {renderContent()}
            <ShareFlipbookDialog isShareModalOpen={isShareModalOpen} setIsShareModalOpen={setIsShareModalOpen} flipbookId={flipbookId} />

            <ConfirmationDialog
                isConfirmModalOpen={isTrashModalOpen}
                setIsConfirmModalOpen={setIsTrashModalOpen}
                title="Move to Trash"
                description={`Are you sure you want to move ${selectedFlipbooks.length} flipbook${selectedFlipbooks.length > 1 ? 's' : ''} to Trash?`}
                isLoading={actionLoading}
                onConfirm={() => handleTrashConfirmation(true)}
                onCancel={() => handleTrashConfirmation(false)}
            />

            <ConfirmationDialog
                isConfirmModalOpen={isDeleteForeverModalOpen}
                setIsConfirmModalOpen={setIsDeleteForeverModalOpen}
                title="Delete Forever"
                description={`Are you sure you want to permanently delete ${selectedFlipbooks.length} flipbook${selectedFlipbooks.length > 1 ? 's' : ''}? This action cannot be undone.`}
                isLoading={actionLoading}
                onConfirm={() => handleDeleteForeverConfirmation(true)}
                onCancel={() => handleDeleteForeverConfirmation(false)}
            />

            {selectedFlipbooks.length > 0 && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg flex items-center justify-between w-96 z-50 border border-violet-200">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={selectedFlipbooks.length > 0}
                            className="h-5 w-5 border-2 border-violet-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            onCheckedChange={(checked) => {
                                if (!checked) {
                                    setSelectedFlipbooks([]);
                                }
                            }}
                        />
                    </div>
                    <span className="font-medium text-violet-900">({selectedFlipbooks.length}) selected</span>

                    <div className="flex items-center gap-3">
                        {
                            isTrash ? <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    title="Recover"
                                    onClick={handleRecover}
                                    disabled={actionLoading}
                                >
                                    <Clock className={`${actionLoading ? 'animate-spin' : ''}`} />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    title="Delete forever"
                                    onClick={() => setIsDeleteForeverModalOpen(true)}
                                >
                                    <Trash2 />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    title="Clear selection"
                                    onClick={clearSelection}
                                >
                                    <X />
                                </Button>
                            </> : <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    title="Move to trash"
                                    onClick={() => setIsTrashModalOpen(true)}
                                >
                                    <Trash2 />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    title="Clear selection"
                                    onClick={clearSelection}
                                >
                                    <X />
                                </Button>
                                <MoveToFolderDropdown clearSelection={clearSelection} view={view} isFolder={isFolder} selectedFlipbooks={selectedFlipbooks} setFlipbooks={setFlipbooks} />
                            </>
                        }
                    </div>
                </div>
            )}
        </>
    );
}