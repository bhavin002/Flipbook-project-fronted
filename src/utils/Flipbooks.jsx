import MyFlipbookDropdown from '../components/AppLayoutComponents/Sidebar/Home/MyFlipbooks/MyFlipbookDropdown'
import ShareFlipbookDialog from '../components/AppLayoutComponents/Sidebar/Home/MyFlipbooks/ShareFlipbookDialog'
import { useEffect, useState } from 'react';
import { getData } from '@/utils/datas';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Checkbox } from "@/components/ui/checkbox";
import { X, Trash2, Clock, Globe, Users, EyeOff, LockKeyhole, SquareMinus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MoveToFolderDropdown from '@/components/AppLayoutComponents/Sidebar/Home/MyFlipbooks/MoveToFolderDropdown';
import ConfirmationDialog from "@/utils/ConfirmationDialog";
import { MoveToTrashFlipbookApi, DeleteFlipbookApi, RecoverFlipbookApi } from "@/service/flipbook.service";
import { toast } from "sonner";
import { useAuth } from '@/context/AuthContext';

export default function Flipbooks({ isLoading, flipbooks, isSidebarOpen, setFlipbooks, isTrash = false, isFolder = false, view }) {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [selectedFlipbooks, setSelectedFlipbooks] = useState([]);
    const [isTrashModalOpen, setIsTrashModalOpen] = useState(false);
    const [isDeleteForeverModalOpen, setIsDeleteForeverModalOpen] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const router = useNavigate();
    const location = useLocation();
    const [flipbookId, setFlipbookId] = useState(null);

    const isAllSelected = selectedFlipbooks.length === flipbooks.length && flipbooks.length > 0;

    useEffect(() => {
        setSelectedFlipbooks([]);
    }, [location.pathname]);

    const unpublishedButtons = getData('unpublishedButtons');
    const publishedButtons = getData('publishedButtons');
    const templateButtons = getData('templateButtons');
    const bookshelfButtons = getData('bookshelfButtons');
    const { permissions } = useAuth();
    const canBulkOperate = !!permissions?.trash;

    const handleItemClick = (action, flipbookId, flipbookState) => {
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
            if (flipbookState === "Bookshelf") {
                router(`/shelf/details/${flipbookId}`)
            } else {
                router(`/details/${flipbookId}`)
            }
        } else if (action === "stats") {
            if (flipbookState === "Bookshelf") {
                router(`/shelf/stats/${flipbookId}`)
            } else {
                router(`/stats/${flipbookId}`)
            }
        } else if (action === "customize") {
            if (flipbookState === "Bookshelf") {
                router(`/shelf/customize/${flipbookId}`)
            } else {
                router(`/customize/${flipbookId}`)
            }
        } else if (action === "edit") {
            if (flipbookState === "Bookshelf") {
                router(`/shelf/select/${flipbookId}`);
            } else {
                router(`/editor/${flipbookId}`)
            }
        } else if (action === "use-template") {
            router(`/editor/${flipbookId}`)
        } else if (action === "view") {
            if (flipbookState === "Bookshelf") {
                window.open(`${import.meta.env.VITE_WEBSITE_URL}/public/bookshelf/${flipbookId}`, '_blank');
            } else {
                window.open(`${import.meta.env.VITE_WEBSITE_URL}/public/flipbook/${flipbookId}`, '_blank');
            }
        } else {
            console.error("Invalid action:", action);
        }
    };

    const getButtonsForStatus = (status) => {
        if (isTrash) {
            return [];
        }

        let buttons = [];
        switch (status) {
            case 'Draft':
                buttons = publishedButtons;
                break;
            case 'Published':
                buttons = publishedButtons;
                break;
            case 'Not Published':
                buttons = unpublishedButtons;
                break;
            case 'Template':
                buttons = templateButtons;
                break;
            case "Bookshelf":
                buttons = bookshelfButtons;
                break;
            default:
                buttons = [];
        }

        if (!permissions?.flipbookDetails) {
            buttons = buttons.filter(btn => btn.value === 'view');
        }

        return buttons;
    };

    const getStatusBadgeStyle = (status) => {
        switch (status) {
            case 'Draft':
                return 'bg-purple-100/50 text-purple-700 border border-purple-300';
            case 'Published':
                return 'bg-green-100/50 text-green-700 border border-green-300';
            case 'Not Published':
                return 'bg-red-100/50 text-red-700 border border-red-300';
            case 'Template':
                return 'bg-[#ebd6ff] text-[#7a1f5b] border border-[#e0b3ff]';
            case 'Bookshelf':
                return 'bg-yellow-100/50 text-yellow-700 border border-yellow-300';
            case 'Deleted':
                return 'bg-gray-100/50 text-gray-700 border border-gray-300';
            default:
                return 'bg-gray-100/50 text-gray-700 border border-gray-300';
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
            case 'Bookshelf':
                return 'Bookshelf';
            default:
                return 'Unknown';
        }
    };

    const getVisibilityIcon = (visibilityStatus) => {
        switch (visibilityStatus) {
            case 'Public':
                return <Globe className='w-4 h-4' />;
            case 'Unlisted':
                return <EyeOff className='w-4 h-4' />;
            case 'Password Protected':
                return <LockKeyhole className='w-4 h-4' />;
            case 'Private':
                return <Users className='w-4 h-4' />;
            case 'Readers Only':
                return <img src="/assets/reader.svg" className="w-5 h-5" />
        }
    };

    const handleFlipbookSelection = (e, flipbookId) => {
        if (!canBulkOperate) return;
        if (e) e.stopPropagation();

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

    const handleSelectAll = () => {
        if (!canBulkOperate) return;
        if (isAllSelected) {
            setSelectedFlipbooks([]);
        } else {
            setSelectedFlipbooks(flipbooks.map(flipbook => flipbook._id));
        }
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

    const ListSkeleton = () => (
        <div className="bg-white rounded-md overflow-hidden border border-gray-200 animate-pulse">
            {/* Mobile & Tablet Skeleton */}
            <div className="block lg:hidden">
                <div className="flex items-start gap-0">
                    <div className="flex-shrink-0 w-28 h-32 bg-gray-200"></div>
                    <div className="flex-1 p-3 space-y-3">
                        <div className="flex gap-2">
                            <div className="h-4 w-16 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                        <div className="mt-4 h-3 w-full bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>

            {/* Desktop Skeleton */}
            <div className="hidden lg:flex items-center gap-3 p-0 mr-2">
                <div className="flex-shrink-0 w-28 h-32 bg-gray-200"></div>
                <div className="flex-1 space-y-2 py-2">
                    <div className="flex gap-2">
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                        <div className="h-4 w-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                </div>
                <div className="flex items-center gap-2 pr-2">
                    <div className="h-8 w-20 bg-gray-200 rounded hidden xl:block"></div>
                    <div className="h-8 w-20 bg-gray-200 rounded hidden xl:block"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        const isSelectionMode = selectedFlipbooks.length > 0;

        return (
            <div className="md:p-6 p-3 max-w-[100vw] overflow-auto space-y-4 pt-0">
                <div className="space-y-3 sm:space-y-4">
                    {isLoading
                        ? [...Array(6)].map((_, index) => <ListSkeleton key={index} />)
                        : flipbooks.map((flipbook) => {
                            const isSelected = selectedFlipbooks.includes(flipbook._id);
                            const status = flipbook.tag ? flipbook.tag : flipbook.flipbookState;
                            const actionButtons = getButtonsForStatus(status);

                            return (
                                <div
                                    key={flipbook._id}
                                    className={`bg-white rounded-md overflow-hidden border ${isSelected ? 'border-primary' : 'border-gray-200'} cursor-pointer group relative`}
                                    onClick={() => canBulkOperate && handleFlipbookSelection(null, flipbook._id)}
                                >
                                    {isSelected && (
                                        <div className="absolute inset-0 bg-primary/5 z-10 flex items-center justify-center">
                                        </div>
                                    )}

                                    {/* Mobile & Tablet View */}
                                    <div className="block lg:hidden">
                                        {/* First Section: Image + Details */}
                                        <div className="flex items-start gap-0">
                                            <div className="flex-shrink-0 relative h-full bg-gray-50">
                                                <img
                                                    src={`${flipbook.thumbnail ? flipbook.thumbnail : "/assets/book_thumbnail.jpg"}`}
                                                    alt="Flipbook Cover"
                                                    className="w-28 h-32 object-contain"
                                                />
                                                {canBulkOperate && (isSelectionMode || !isSelectionMode) && (
                                                    <div
                                                        className={`absolute inset-0 bg-black/50 flex p-2 transition-opacity ${isSelectionMode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                                                    >
                                                        <Checkbox
                                                            checked={isSelected}
                                                            className="h-5 w-5 border-2 border-white data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0 flex flex-col justify-between p-3 relative">
                                                <div className="space-y-1.5">
                                                    {permissions.flipbookDetails && (
                                                        <div className="flex items-center gap-2 flex-wrap pr-8">
                                                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded inline-flex items-center ${getStatusBadgeStyle(status)}`}>
                                                                {getStatusDisplayText(status)}
                                                            </span>
                                                            {getVisibilityIcon(flipbook.visibilityStatus)}
                                                        </div>
                                                    )}
                                                    <h3 title={flipbook.name} className="font-semibold text-gray-900 text-sm truncate pr-8">
                                                        {flipbook.name}
                                                    </h3>
                                                </div>

                                                <div className="flex items-end justify-between gap-2 mt-2">
                                                    <p className="text-xs text-gray-600 break-words flex-1">
                                                        Created: {format(flipbook.createdAt, "MMM d, yyyy")} by {flipbook.createdBy.firstName} {flipbook.createdBy.lastName}
                                                    </p>
                                                </div>
                                                {permissions.flipbookDetails && !isSelectionMode && (
                                                    <div onClick={(e) => e.stopPropagation()} className="absolute top-2 right-1">
                                                        <MyFlipbookDropdown status={status} flipbook={flipbook} setFlipbooks={setFlipbooks} isTrash={isTrash} isMobile={true} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Desktop View */}
                                    <div className="hidden lg:flex items-center gap-3 mr-2">
                                        <div className="flex-shrink-0 relative h-full bg-gray-50">
                                            <img
                                                src={`${flipbook.thumbnail ? flipbook.thumbnail : "/assets/book_thumbnail.jpg"}`}
                                                alt="Flipbook Cover"
                                                className="w-28 h-32 object-contain"
                                            />
                                            {canBulkOperate && (isSelectionMode || !isSelectionMode) && (
                                                <div
                                                    className={`absolute inset-0 bg-black/50 flex p-2 transition-opacity ${isSelectionMode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                                                >
                                                    <Checkbox
                                                        checked={isSelected}
                                                        className="h-5 w-5 border-2 border-white data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0 space-y-1.5 py-2">
                                            {permissions.flipbookDetails && (
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded inline-flex items-center ${getStatusBadgeStyle(status)}`}>
                                                        {getStatusDisplayText(status)}
                                                    </span>
                                                    {getVisibilityIcon(flipbook.visibilityStatus)}
                                                </div>
                                            )}
                                            <h3 title={flipbook.name} className="font-semibold text-gray-900 text-base truncate">
                                                {flipbook.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 break-words">
                                                Created: {format(flipbook.createdAt, "MMM d, yyyy")} by {flipbook.createdBy.firstName} {flipbook.createdBy.lastName}
                                            </p>
                                        </div>

                                        {permissions.flipbookDetails && !isSelectionMode && (
                                            <div className="flex ml-auto items-center gap-2 pr-2 flex-wrap">
                                                {actionButtons.map((btn, index) => {
                                                    const isShare = btn.value === 'share';
                                                    if (isShare) {
                                                        return (
                                                            <Button
                                                                key={index}
                                                                variant="ghost"
                                                                size="sm"
                                                                className="border border-primary text-primary"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleItemClick(btn.value, flipbook._id, status);
                                                                }}
                                                            >
                                                                {btn.title}
                                                            </Button>
                                                        );
                                                    } else {
                                                        return (
                                                            <Button
                                                                key={index}
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleItemClick(btn.value, flipbook._id, status);
                                                                }}
                                                            >
                                                                {btn.title}
                                                            </Button>
                                                        );
                                                    }
                                                })}

                                                <div onClick={(e) => e.stopPropagation()}>
                                                    <MyFlipbookDropdown status={status} flipbook={flipbook} setFlipbooks={setFlipbooks} isTrash={isTrash} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
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

            {canBulkOperate && selectedFlipbooks.length > 0 && (
                <div className="fixed bottom-[100px] md:bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 px-3 sm:px-4 py-2 rounded-lg shadow-lg flex items-center justify-between w-[90%] sm:w-96 max-w-md z-50 border border-violet-200">
                    <div className="flex items-center gap-2 sm:gap-3">
                        {isAllSelected ? (
                            <Checkbox
                                checked={true}
                                className="h-5 w-5 border-2 border-violet-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                onCheckedChange={handleSelectAll}
                            />
                        ) : (
                            <SquareMinus
                                onClick={handleSelectAll}
                                color="#7b39ed"
                                className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer flex-shrink-0"
                            />
                        )}
                    </div>
                    <span className="font-medium text-violet-900 text-sm sm:text-base">({selectedFlipbooks.length}) selected</span>

                    <div className="flex items-center gap-2 sm:gap-3">
                        {
                            isTrash ? <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    title="Recover"
                                    onClick={handleRecover}
                                    disabled={actionLoading}
                                    className="h-8 w-8 sm:h-10 sm:w-10"
                                >
                                    <Clock className={`h-4 w-4 sm:h-5 sm:w-5 ${actionLoading ? 'animate-spin' : ''}`} />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    title="Delete forever"
                                    onClick={() => setIsDeleteForeverModalOpen(true)}
                                    className="h-8 w-8 sm:h-10 sm:w-10"
                                >
                                    <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    title="Clear selection"
                                    onClick={clearSelection}
                                    className="h-8 w-8 sm:h-10 sm:w-10"
                                >
                                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                                </Button>
                            </> : <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    title="Move to trash"
                                    onClick={() => setIsTrashModalOpen(true)}
                                    className="h-8 w-8 sm:h-10 sm:w-10"
                                >
                                    <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    title="Clear selection"
                                    onClick={clearSelection}
                                    className="h-8 w-8 sm:h-10 sm:w-10"
                                >
                                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
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