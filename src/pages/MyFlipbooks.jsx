import { Sparkles } from 'lucide-react';
import MyFlipbookDropdown from '../components/AppLayoutComponents/Sidebar/Home/MyFlipbooks/MyFlipbookDropdown'
import ShareFlipbookDialog from '../components/AppLayoutComponents/Sidebar/Home/MyFlipbooks/ShareFlipbookDialog'
import { useState, useEffect } from 'react';
import PublishFlipbookDialog from '../components/AppLayoutComponents/Sidebar/Home/MyFlipbooks/PublishFlipbookDialog'
import { getData } from '@/utils/datas';
import { useNavigate } from 'react-router-dom';

export default function MyFlipbooks({ isSidebarOpen }) {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [imageLoadingStates, setImageLoadingStates] = useState({});
    const router = useNavigate();

    const flipbooks = getData('flipbooks');
    const unpublishedButtons = getData('unpublishedButtons');
    const publishedButtons = getData('publishedButtons');

    // Simulate initial data loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Adjust this delay as needed
        return () => clearTimeout(timer);
    }, []);

    const handleImageLoad = (id) => {
        setImageLoadingStates(prev => ({
            ...prev,
            [id]: false
        }));
    };

    // Initialize image loading states
    useEffect(() => {
        const initialStates = {};
        flipbooks.forEach(flipbook => {
            initialStates[flipbook.id] = true;
        });
        setImageLoadingStates(initialStates);
    }, []);

    const handleItemClick = (action) => {
        if (action === 'share') {
            setIsShareModalOpen(true);
        } else if (action === 'publish') {
            setIsPublishModalOpen(true);
        } else if(action === "details"){
            router("/details/sd2112wdwd1d")
        }else if(action === "stats"){
            router("/stats/sd2112wdwd1d")
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

    return (
        <>
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 ${isSidebarOpen ? "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" : "lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"} gap-4 p-6`}>
                {isLoading ? (
                    [...Array(6)].map((_, index) => (
                        <SkeletonCard key={index} />
                    ))
                ) : (
                    flipbooks.map((flipbook) => (
                        <div
                            key={flipbook.id}
                            className="bg-white opacity-0 animate-fade-in rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-violet-100"
                        >
                            <div className="relative group bg-gray-200 backdrop-blur-sm">
                                {imageLoadingStates[flipbook.id] && (
                                    <div className="absolute inset-0 bg-gray-200 animate-pulse h-[200px]"></div>
                                )}
                                <img
                                    src="/src/assets/profile.jpg"
                                    alt="Flipbook Cover"
                                    className={`max-h-[200px] h-full m-auto transition-transform duration-500 ${imageLoadingStates[flipbook.id] ? 'opacity-0' : 'opacity-100'}`}
                                    onLoad={() => handleImageLoad(flipbook.id)}
                                />
                                <MyFlipbookDropdown status={flipbook.status} />
                                <div className="absolute top-3 left-3 transform transition-transform duration-200 hover:scale-105">
                                    <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${getStatusBadgeStyle(flipbook.status)}`}>
                                        {getStatusDisplayText(flipbook.status)}
                                    </span>
                                </div>
                            </div>

                            <div className="px-4 pt-4 mt-[-15px] rounded-t-xl z-[11] relative bg-white">
                                <div className="flex items-center justify-between">
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
                    ))
                )}
            </div>
            <ShareFlipbookDialog isShareModalOpen={isShareModalOpen} setIsShareModalOpen={setIsShareModalOpen} />
            <PublishFlipbookDialog isPublishModalOpen={isPublishModalOpen} setIsPublishModalOpen={setIsPublishModalOpen} />
        </>
    );
}