import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Eye } from 'lucide-react';
import ZeroState from '@/utils/ZeroState';
import { GetSharedFlipbooksApi } from '@/service/flipbook.publish.service';

export default function SharedWithMe({ isSidebarOpen }) {
    const [isLoading, setIsLoading] = useState(true);
    const [sharedFlipbooks, setSharedFlipbooks] = useState([]);

    useEffect(() => {
        const getFlipbooks = async () => {
            try {
                setIsLoading(true);
                const response = await GetSharedFlipbooksApi();
                setSharedFlipbooks(response.data.flipbooks);
            } catch (error) {
                toast.error("Flipbook fetch failed", {
                    description: error.message || "Oops! Something went wrong.",
                });
            } finally {
                setIsLoading(false);
            }
        }
        getFlipbooks();
    }, [])

    if (sharedFlipbooks.length === 0 && !isLoading) {
        return (
            <ZeroState
                title="There are no publications shared with you."
                description="You don’t currently have publications shared with you."
            />
        );
    }

    const handleViewFlipbook = (flipbookId) => {
        window.open(`/public-flipbook/${flipbookId}`, '_blank');
    };

    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 ${isSidebarOpen ? "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" : "lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"} gap-4 p-6`}>
            {sharedFlipbooks.map((flipbook) => {
                return (
                    <div
                        key={flipbook._id}
                        className="bg-white opacity-0 animate-fade-in rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-violet-100 relative group flex flex-col"
                    >
                        <div className="relative bg-[#ede9f5] backdrop-blur-sm p-3 flex-grow">
                            <img
                                src={`${flipbook.thumbnail ? flipbook.thumbnail : "/assets/book_thumbnail.jpg"}`}
                                alt="Flipbook Cover"
                                className={`max-h-[200px] h-full m-auto transition-transform duration-500 rounded-t-md`}
                            />
                        </div>

                        <div className="px-4 pt-4 mt-[-15px] space-y-1 rounded-t-xl z-[11] relative bg-white">
                            <div className="flex items-center justify-between">
                                <h3 title={flipbook.name} className="font-semibold text-violet-900 transition-colors duration-200 hover:text-violet-600 truncate">
                                    {flipbook.name}
                                </h3>
                            </div>

                            <p className="text-sm text-violet-600">
                                Created by : {flipbook.createdBy}
                            </p>

                            <div className="flex gap-2 justify-center py-3 flex-wrap">
                                <button
                                    className="p-2 hover:-translate-y-[1px] rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 hover:scale-110 transition-all duration-200"
                                    title="View Flipbook"
                                    onClick={() => handleViewFlipbook(flipbook._id)}
                                >
                                    <Eye size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}