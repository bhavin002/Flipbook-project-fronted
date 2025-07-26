import { GetShelfPreview } from "@/service/bookshelf.service"
import { useEffect, useState, useRef } from "react"
import { toast } from "sonner"
import { Loader } from "@/components/ui/loader";
import bookLogo from '@/assets/book_thumbnail.jpg';
import { Input } from "../ui/input";
import { Search } from "lucide-react";

export default function BookShelfView({ id }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(1);
    const [currentPageCount, setCurrentPageCount] = useState(1);
    const containerRef = useRef(null);

    useEffect(() => {
        const updateItemsPerView = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                let newItemsPerView = 1;
                if (width >= 1536) {
                    newItemsPerView = 8;
                } else if (width >= 1280) {
                    newItemsPerView = 6;
                } else if (width >= 1024) {
                    newItemsPerView = 4;
                } else if (width >= 768) {
                    newItemsPerView = 2;
                } else {
                    newItemsPerView = 1;
                }
                setItemsPerView(newItemsPerView);
                setCurrentPageCount(Math.min(newItemsPerView, data ? data.length - currentIndex : newItemsPerView));
            }
        };
        updateItemsPerView();
        window.addEventListener('resize', updateItemsPerView);
        return () => window.removeEventListener('resize', updateItemsPerView);
    }, [data, currentIndex]);

    useEffect(() => {
        const fetchShelfData = async () => {
            setLoading(true);
            try {
                const response = await GetShelfPreview(id);
                console.log(response.data)
                setData(response.data);
            } catch (error) {
                toast.error("Failed to fetch bookshelf", {
                    description: error.message
                })
            } finally {
                setLoading(false);
            }
        }
        if (id) {
            fetchShelfData()
        }
    }, [id])

    useEffect(() => {
        if (data && currentIndex >= data?.length - itemsPerView) {
            setCurrentIndex(Math.max(0, data?.length - itemsPerView));
            setCurrentPageCount(Math.min(itemsPerView, data?.length - currentIndex));
        } else {
            setCurrentPageCount(Math.min(itemsPerView, data?.length - currentIndex));
        }
    }, [itemsPerView, data, currentIndex]);

    const goToPrevious = () => {
        setCurrentIndex(prev => Math.max(0, prev - itemsPerView));
    };

    const goToNext = () => {
        if (data) {
            setCurrentIndex(prev =>
                Math.min(data.length - itemsPerView, prev + itemsPerView)
            );
        }
    };

    const canGoPrevious = currentIndex > 0;
    const canGoNext = data && currentIndex < data?.length - itemsPerView;

    if (loading) {
        return (
            <Loader />
        );
    }

    if (!data) return null;

    return (
        <div className="w-full h-full flex flex-col relative" id="bookshelf-preview-id" ref={containerRef}>
            <div className="flex justify-end px-4 py-4 absolute top-0 right-0 items-center gap-3">
                <p className="text-2xl font-semibold"></p>
                <div className="grid items-center gap-1.5">
                    <div className="relative">
                        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                            <Search className="h-4 w-4" />
                        </div>
                        <Input
                            id="search"
                            autoComplete="off"
                            type="search"
                            placeholder="Search publications"
                            className="w-full rounded-lg bg-background pl-8"
                        />
                    </div>
                </div>
            </div>
            <div className="px-4 py-6 h-full flex items-center">
                {data?.length === 0 ? (
                    <p className="text-center">No publications found.</p>
                ) : (
                    <div className="relative flex items-center flex-wrap w-full">
                        {canGoPrevious && (
                            <button
                                onClick={goToPrevious}
                                className="absolute left-0 z-10 flex items-center justify-center rounded-full p-2 transition-all duration-300 ease-in-out hover:bg-[#ffffff40] cursor-pointer opacity-100"
                                style={{ top: '50%', transform: 'translateY(-50%)' }}
                                aria-label="Previous page"
                            >
                                <svg aria-hidden="true" width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill="#FFFFFF"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M31.3138 39.4453C30.5737 40.1853 29.374 40.1852 28.634 39.4452L12.7973 23.6076C11.9093 22.7196 11.9094 21.2799 12.7973 20.3919L28.634 4.55524C29.374 3.81524 30.5738 3.81524 31.3138 4.55524C32.0538 5.29524 32.0538 6.49502 31.3138 7.23501L16.549 21.9998L31.3138 36.7655C32.0538 37.5055 32.0538 38.7053 31.3138 39.4453Z"
                                    />
                                    <path
                                        fill="#000000"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M32.7279 40.8595C31.2068 42.3805 28.7407 42.3805 27.2197 40.8594L11.383 25.0218C9.71408 23.3527 9.71412 20.6467 11.3831 18.9777L27.2198 3.14103C28.7409 1.61998 31.207 1.61998 32.728 3.14103L31.3138 4.55524C30.5738 3.81524 29.374 3.81524 28.634 4.55524L12.7973 20.3919C11.9094 21.2799 11.9093 22.7196 12.7973 23.6076L28.634 39.4452C29.374 40.1852 30.5737 40.1853 31.3138 39.4453C32.0538 38.7053 32.0538 37.5055 31.3138 36.7655L16.549 21.9998L31.3138 7.23501C32.0538 6.49502 32.0538 5.29524 31.3138 4.55524L32.728 3.14103C34.2491 4.66208 34.2491 7.12818 32.728 8.64923L19.3774 21.9999L32.7281 35.3513C34.2491 36.8724 34.249 39.3385 32.7279 40.8595Z"
                                        fillOpacity="0.2"
                                    />
                                </svg>
                            </button>
                        )}

                        <div className="overflow-hidden mx-16 z-10 content-center w-full">
                            <div className="flex justify-center w-full flex-col items-center py-6">
                                <div
                                    className="flex transition-transform duration-300 ease-in-out z-10 relative"
                                    style={{
                                        transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                                        width: `${currentPageCount * (100 / itemsPerView)}%`,
                                    }}
                                >
                                    {data?.map((book, index) => (
                                        <div
                                            key={book._id}
                                            className="flex-shrink-0 px-5 my-2"
                                            style={{
                                                width: `${100 / currentPageCount}%`,
                                            }}
                                        >
                                            <div className="rounded-lg flex justify-center items-end h-full">
                                                <a
                                                    href={`/public-flipbook/${book._id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block"
                                                    style={{ textDecoration: "none" }}
                                                >
                                                    <img
                                                        src={book.thumbnail ? book.thumbnail : bookLogo}
                                                        alt={`Book ${book._id}`}
                                                        className="rounded-md max-h-56 w-auto shadow-md transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 cursor-pointer mx-auto"
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                                <div className="relative w-full h-auto"
                                style={{
                                     width: `${currentPageCount * (100 / itemsPerView)}%`
                                }}>
                                    <div
                                        className="opacity-76 w-full absolute -bottom-0.5"
                                        style={{
                                            borderBottom: '20px solid rgb(209, 209, 209)',
                                            borderLeft: '22px solid transparent',
                                            borderRight: '22px solid transparent'
                                        }}
                                    ></div>

                                    <div
                                        className="h-2.5 w-full absolute left-0 right-0 z-10 m-0 bg-neutral-300"
                                        style={{ bottom: '-11px' }}
                                    ></div>

                                    <div
                                        className="w-full h-2.5 absolute left-0 flex opacity-40"
                                        style={{
                                            bottom: '-21px',
                                            background: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)'
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>


                        {canGoNext && (
                            <button
                                onClick={goToNext}
                                className="absolute right-0 z-10 flex items-center justify-center rounded-full p-2 transition-all duration-300 ease-in-out hover:bg-[#ffffff40] cursor-pointer opacity-100"
                                style={{ top: '50%', transform: 'translateY(-50%)' }}
                                aria-label="Next page"
                            >
                                <svg aria-hidden="true" width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill="#FFFFFF"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12.6864 4.5552C13.4264 3.81523 14.6262 3.81526 15.3662 4.55528L31.2028 20.3929C32.0908 21.2809 32.0908 22.7206 31.2028 23.6086L15.3661 39.4452C14.6261 40.1852 13.4263 40.1852 12.6863 39.4452C11.9463 38.7052 11.9463 37.5055 12.6863 36.7655L27.4512 22.0007L12.6863 7.23497C11.9463 6.49495 11.9464 5.29518 12.6864 4.5552Z"
                                    />
                                    <path
                                        fill="#000000"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M11.2721 40.8595C9.75109 39.3384 9.75108 36.8723 11.2721 35.3513L24.6228 22.0006L11.2721 8.64915C9.75105 7.12806 9.75112 4.66195 11.2722 3.14095C12.7933 1.61995 15.2594 1.62002 16.7804 3.14111L32.6171 18.9787C34.2861 20.6478 34.286 23.3538 32.617 25.0228L16.7803 40.8595C15.2593 42.3805 12.7932 42.3805 11.2721 40.8595ZM12.6863 36.7655C11.9463 37.5055 11.9463 38.7052 12.6863 39.4452C13.4263 40.1852 14.6261 40.1852 15.3661 39.4452L31.2028 23.6086C32.0908 22.7206 32.0908 21.2809 31.2028 20.3929L15.3662 4.55528C14.6262 3.81526 13.4264 3.81523 12.6864 4.5552C11.9464 5.29518 11.9463 6.49495 12.6863 7.23497L27.4512 22.0007L12.6863 36.7655Z"
                                        fillOpacity="0.2"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}