import {
    Pencil,
    SlidersHorizontal,
    ChartPie,
    Send,
    BookOpen,
    Sparkles,
    Share2,
    Info
} from 'lucide-react';
import MyFlipbookDropdown from './MyFlipbooks/MyFlipbookDropdown';
import ShareFlipbookDialog from './MyFlipbooks/ShareFlipbookDialog';
import { useState } from 'react';
import PublishFlipbookDialog from './MyFlipbooks/PublishFlipbookDialog';

export default function MyFlipbooks({ isSidebarOpen }) {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
    const flipbooks = [
        { id: 1, name: "Flipbook 1", created: "March 05, 2025", status: "draft" },
        { id: 2, name: "Flipbook 2", created: "March 04, 2025", status: "published" },
        { id: 3, name: "Flipbook 3", created: "March 03, 2025", status: "unpublished" },
        { id: 4, name: "Flipbook 4", created: "March 02, 2025", status: "published" },
        { id: 5, name: "Flipbook 5", created: "March 01, 2025", status: "unpublished" },
        { id: 6, name: "Flipbook 6", created: "February 28, 2025", status: "published" },
    ]

    const unpublishedButtons = [
        { icon: Pencil, title: "Edit", value: "edit", color: "text-amber-600", bg: "bg-amber-50", hover: "hover:bg-amber-100" },
        { icon: SlidersHorizontal, title: "Customize", value: "customize", color: "text-blue-600", bg: "bg-blue-50", hover: "hover:bg-blue-100" },
        { icon: Send, title: "Publish", value: "publish", color: "text-green-600", bg: "bg-green-50", hover: "hover:bg-green-100" },
    ];

    const publishedButtons = [
        { icon: BookOpen, title: "View", value: "view", color: "text-blue-600", bg: "bg-blue-50", hover: "hover:bg-blue-100" },
        { icon: Info, title: "Details", value: "details", color: "text-pink-600", bg: "bg-pink-50", hover: "hover:bg-pink-100" },
        { icon: Pencil, title: "Edit", value: "edit", color: "text-amber-600", bg: "bg-amber-50", hover: "hover:bg-amber-100" },
        { icon: SlidersHorizontal, title: "Customize", value: "customize", color: "text-blue-600", bg: "bg-blue-50", hover: "hover:bg-blue-100" },
        { icon: ChartPie, title: "Statistics", value: "stats", color: "text-amber-600", bg: "bg-amber-50", hover: "hover:bg-amber-100" },
        { icon: Share2, title: "Share", value: "share", color: "text-green-600", bg: "bg-green-50", hover: "hover:bg-green-100" },
    ];

    const handleItemClick = (action) => {
        if (action === 'share') {
            setIsShareModalOpen(true);
        } else if (action === 'publish') {
            setIsPublishModalOpen(true);
        }
        else {
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
            default:
                return 'Unknown';
        }
    };

    return (
        <>
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1  ${isSidebarOpen ? "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" : "lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"} gap-4 mx-4 mt-3 mb-4`}>
                {flipbooks.map((flipbook) => (
                    <div
                        key={flipbook.id}
                        className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-violet-100"
                    >
                        <div className="relative group bg-gray-200 backdrop-blur-sm">
                            <img
                                src="/src/assets/profile.jpg"
                                alt="Flipbook Cover"
                                className="max-h-[200px] h-full m-auto transition-transform duration-500"
                            />
                            <MyFlipbookDropdown status={flipbook.status} />
                            <div className="absolute top-3 left-3 transform transition-transform duration-200 hover:scale-105">
                                <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${getStatusBadgeStyle(flipbook.status)}`}>
                                    {getStatusDisplayText(flipbook.status)}
                                </span>
                            </div>
                        </div>

                        <div className="px-4 pt-4 mt-[-15px] rounded-t-xl z-[11] relative bg-white">
                            <div className="flex items-center justify-between ">
                                <h3 className="font-semibold text-violet-900 mb-1 transition-colors duration-200 hover:text-violet-600">
                                    {flipbook.name}
                                </h3>
                                <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-1.5 rounded-full shadow-sm hover:scale-110 transition-all duration-200">
                                    <Sparkles size={16} className="text-white animate-pulse" />
                                </div>
                            </div>

                            <p className="text-sm text-violet-600">
                                Created: {flipbook.created}
                            </p>

                            <div className="flex gap-2 justify-center py-3 flex-wrap">
                                {getButtonsForStatus(flipbook.status).map((btn, index) => (
                                    <button
                                        key={index}
                                        className={`p-2 hover:-translate-y-[1px] rounded-lg ${btn.color} ${btn.bg} ${btn.hover} hover:scale-110 transition-all duration-200`}
                                        title={btn.title}
                                        onClick={() => handleItemClick(btn.value)}
                                    >
                                        <btn.icon size={16} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ShareFlipbookDialog isShareModalOpen={isShareModalOpen} setIsShareModalOpen={setIsShareModalOpen} />
            <PublishFlipbookDialog isPublishModalOpen={isPublishModalOpen} setIsPublishModalOpen={setIsPublishModalOpen} />
        </>
    )
}