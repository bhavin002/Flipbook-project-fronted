import MyFlipbookDropdown from '../components/AppLayoutComponents/Sidebar/Home/MyFlipbooks/MyFlipbookDropdown'
import ShareFlipbookDialog from '../components/AppLayoutComponents/Sidebar/Home/MyFlipbooks/ShareFlipbookDialog'
import { useState } from 'react';
import PublishFlipbookDialog from '../components/AppLayoutComponents/Sidebar/Home/MyFlipbooks/PublishFlipbookDialog'
import { getData } from '@/utils/datas';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ZeroState from '@/utils/ZeroState';
import { Checkbox } from "@/components/ui/checkbox";
import { X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MoveToFolderDropdown from '@/components/AppLayoutComponents/Sidebar/Home/MyFlipbooks/MoveToFolderDropdown';

export default function Flipbooks({ isLoading, flipbooks, isSidebarOpen, setFlipbooks }) {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
    const [selectedFlipbooks, setSelectedFlipbooks] = useState([]);
    const router = useNavigate();

    const unpublishedButtons = getData('unpublishedButtons');
    const publishedButtons = getData('publishedButtons');

    const handleItemClick = (action, flipbookId) => {
        if (action === 'share') {
            setIsShareModalOpen(true);
        } else if (action === 'publish') {
            setIsPublishModalOpen(true);
        } else if (action === "details") {
            router(`/details/${flipbookId}`)
        } else if (action === "stats") {
            router(`/stats/${flipbookId}`)
        } else if (action === "customize") {
            router(`/customize/${flipbookId}`)
        } else if (action === "edit") {
            router(`/editor/${flipbookId}`)
        } else {
            console.error("Invalid action:", action);
        }
    };

    const getButtonsForStatus = (status) => {
        switch (status) {
            case 'draft':
                return publishedButtons;
            case 'published':
                return publishedButtons;
            case 'unpublished':
                return unpublishedButtons;
            default:
                return unpublishedButtons;
        }
    };

    const getStatusBadgeStyle = (status) => {
        switch (status) {
            case 'draft':
                return 'bg-purple-100/50 text-purple-700';
            case 'published':
                return 'bg-green-100/50 text-green-700';
            case 'unpublished':
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
            case 'draft':
                return 'Draft';
            case 'published':
                return 'Published';
            case 'unpublished':
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

    const handleDelete = () => {
        // Implement delete functionality here
        console.log("Deleting flipbooks:", selectedFlipbooks);
        // After deletion is complete, clear selection
        clearSelection();
    };

    const SkeletonCard = () => (
        <div className="bg-white rounded-xl overflow-hidden shadow-md border border-violet-100 animate-pulse">
            <div className="relative bg-gray-200 h-[200px]"></div>
            <div className="px-4 pt-4 mt-[-15px] rounded-t-xl z-[11] relative bg-white">
                <div className="flex items-center justify-between">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                <div className="flex gap-2 justify-center py-3 flex-wrap">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="h-8 w-8 bg-gray-200 rounded-lg"></div>
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

        if (flipbooks.length === 0) {
            return (
                <ZeroState
                    title="Folder is empty"
                    description="Get started on your first flipbook – just click the button below!"
                    actionLabel="From scratch"
                    onActionClick={() => router('/create')}
                />
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

                            <div className="relative bg-gray-200 backdrop-blur-sm">
                                <img
                                    src="/src/assets/profile.jpg"
                                    alt="Flipbook Cover"
                                    className={`max-h-[200px] h-full m-auto transition-transform duration-500`}
                                />
                            </div>

                            <div className="px-4 pt-4 mt-[-15px] space-y-1 rounded-t-xl z-[11] relative bg-white">
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-sm inline-flex items-center ${getStatusBadgeStyle(flipbook.tag ? flipbook.tag : flipbook.isPublished ? "published" : "unpublished")}`}>
                                    <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70"></span>
                                    {getStatusDisplayText(flipbook.tag ? flipbook.tag : flipbook.isPublished ? "published" : "unpublished")}
                                </span>
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-violet-900 transition-colors duration-200 hover:text-violet-600">
                                        {flipbook.name}
                                    </h3>
                                    <MyFlipbookDropdown status={flipbook.status} flipbook={flipbook} setFlipbooks={setFlipbooks} />
                                </div>

                                <p className="text-sm text-violet-600">
                                    Created: {format(flipbook.createdAt, "MMM d, yyyy")} by {flipbook.createdBy.firstName} {flipbook.createdBy.lastName}
                                </p>

                                <div className="flex gap-2 justify-center py-3 flex-wrap">
                                    {getButtonsForStatus(flipbook.status).map((btn, index) => (
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
            <ShareFlipbookDialog isShareModalOpen={isShareModalOpen} setIsShareModalOpen={setIsShareModalOpen} />
            <PublishFlipbookDialog isPublishModalOpen={isPublishModalOpen} setIsPublishModalOpen={setIsPublishModalOpen} />

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
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleDelete}
                        >
                            <Trash2 />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={clearSelection}
                        >
                            <X />
                        </Button>
                        <MoveToFolderDropdown clearSelection={clearSelection} />
                    </div>
                </div>
            )}
        </>
    );
}