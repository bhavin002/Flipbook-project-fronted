import { GetShelfPreview } from "@/service/bookshelf.service"
import { ResolveDomainApi } from "@/service/custom.domain.service"
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { toast } from "sonner"
import bookLogo from '/assets/book_thumbnail.jpg';
import { Input } from "../ui/input";
import { Loader2, Search } from "lucide-react";
import { useBookshelf } from "@/context/BookshelfContext";
import { detectDeviceType } from "@/utils/Helper";
import { UpdateFlipbookViewCountApi } from "@/service/flipbook.publish.service";

export default function BookShelfView({ id, isPublicView = false }) {
    const navigate = useNavigate();
    const { bookshelfSettings } = useBookshelf();
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(1);
    const [currentPageCount, setCurrentPageCount] = useState(1);
    const containerRef = useRef(null);
    const [viewCountUpdated, setViewCountUpdated] = useState(false);

    const isThrottled = useRef(false);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const minSwipeDistance = 50;

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
                setCurrentPageCount(Math.min(newItemsPerView, filteredData ? filteredData.length - currentIndex : newItemsPerView));
            }
        };
        updateItemsPerView();
        window.addEventListener('resize', updateItemsPerView);
        return () => window.removeEventListener('resize', updateItemsPerView);
    }, [filteredData, currentIndex]);

    useEffect(() => {
        const fetchShelfData = async () => {
            setLoading(true);
            try {
                const response = await GetShelfPreview(id);
                setData(response.data);
                setFilteredData(response.data); // Initialize filteredData with all books
            } catch (error) {
                // Proactive redirect for custom domains on unauthorized errors
                const host = window.location.host.toLowerCase();
                const systemDomains = ["flipdrag.com", "app.flipdrag.com", "localhost"];
                const isCustom = !systemDomains.some(d => host.includes(d));

                if (isCustom && (error.message?.includes("Unauthorized access") || error.message?.includes("from this domain"))) {
                    try {
                        const domainRes = await ResolveDomainApi();
                        if (domainRes.success && domainRes.data.workspaceId) {
                            navigate(`/profile/${domainRes.data.workspaceId}`, { replace: true });
                            return;
                        }
                    } catch (domainErr) {
                        console.error("Automatic redirect failed", domainErr);
                    }
                }

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
        if (data) {
            const filtered = data.filter(book =>
                book.name?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredData(filtered);
            setCurrentIndex(0);
        }
    }, [searchQuery, data]);

    useEffect(() => {
        if (filteredData && currentIndex >= filteredData?.length - itemsPerView) {
            setCurrentIndex(Math.max(0, filteredData?.length - itemsPerView));
            setCurrentPageCount(Math.min(itemsPerView, filteredData?.length - currentIndex));
        } else {
            setCurrentPageCount(Math.min(itemsPerView, filteredData?.length - currentIndex));
        }
    }, [itemsPerView, filteredData, currentIndex]);

    const goToPrevious = () => {
        setCurrentIndex(prev => Math.max(0, prev - itemsPerView));
    };

    const goToNext = () => {
        if (filteredData) {
            setCurrentIndex(prev =>
                Math.min(filteredData.length - itemsPerView, prev + itemsPerView)
            );
        }
    };

    const canGoPrevious = currentIndex > 0;
    const canGoNext = filteredData && currentIndex < filteredData?.length - itemsPerView;

    const getBookshelfStyles = () => {
        const styles = {
            backgroundColor: 'transparent',
            backgroundImage: 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        };

        if (bookshelfSettings.selectedBackground === 'solidcolor') {
            styles.backgroundColor = bookshelfSettings.backgroundColorHash;
        } else if (bookshelfSettings.selectedBackground === 'uploadimage' && bookshelfSettings.backgroundImage) {
            styles.backgroundImage = `url(${bookshelfSettings.backgroundImage})`;

            switch (bookshelfSettings.backgroundImageType) {
                case 'scale-crop':
                    styles.backgroundSize = 'cover';
                    styles.backgroundPosition = 'center';
                    break;
                case 'center':
                    styles.backgroundSize = 'contain';
                    styles.backgroundPosition = 'center';
                    break;
                case 'tile':
                    styles.backgroundSize = 'auto';
                    styles.backgroundRepeat = 'repeat';
                    break;
                default:
                    styles.backgroundSize = 'cover';
                    styles.backgroundPosition = 'center';
            }
        }

        return styles;
    };

    const bookshelfStyles = getBookshelfStyles();

    const handleFlipbookClick = async () => {
        if (isPublicView && !viewCountUpdated) {
            try {
                const data = {
                    device: detectDeviceType()
                }
                await UpdateFlipbookViewCountApi(id, data);
                setViewCountUpdated(true);
            } catch (error) {
                toast.error("Failed to update view count", {
                    description: error.message || "Oops! Something went wrong."
                })
            }
        }
    };

    const handleWheel = (e) => {
        if (isThrottled.current) return;
        const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        if (Math.abs(delta) < 20) return;
        if (delta > 0 && canGoNext) {
            goToNext();
            isThrottled.current = true;
            setTimeout(() => { isThrottled.current = false; }, 800);
        } else if (delta < 0 && canGoPrevious) {
            goToPrevious();
            isThrottled.current = true;
            setTimeout(() => { isThrottled.current = false; }, 800);
        }
    };

    const handleTouchStart = (e) => {
        touchEndX.current = null;
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;

        const distance = touchStartX.current - touchEndX.current;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && canGoNext) {
            goToNext();
        }

        if (isRightSwipe && canGoPrevious) {
            goToPrevious();
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div
            className="w-full h-full flex flex-col relative"
            id="bookshelf-preview-id"
            ref={containerRef}
            style={bookshelfStyles}
            onClick={handleFlipbookClick}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {bookshelfSettings.selectedLogo && (
                <div className="absolute top-4 left-4 z-20">
                    <a
                        href={bookshelfSettings.logoLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <img
                            src={bookshelfSettings.selectedLogo.src}
                            alt="Logo"
                            className="max-h-[50px] max-w-[200px]"
                        />
                    </a>
                </div>
            )}

            <div className="flex justify-end px-4 py-4 absolute top-0 right-0 items-center gap-3">
                {bookshelfSettings.allowSearch && (
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
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                )}
            </div>
            {
                loading ? <div className="px-4 py-6 h-full flex items-center justify-center">
                    <div className="flex items-center justify-center h-full gap-3">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        <span className="text-lg font-medium text-gray-900">
                            Loading
                            <span className="inline-flex ml-1">
                                <span className="animate-dot-1">.</span>
                                <span className="animate-dot-2">.</span>
                                <span className="animate-dot-3">.</span>
                            </span>
                        </span>
                    </div>
                </div> : <div className="px-4 py-6 h-full flex items-center">
                    {filteredData?.length === 0 ? (
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
                                        {filteredData?.map((book, index) => (
                                            <div
                                                key={book._id}
                                                className="flex-shrink-0 px-5 my-2"
                                                style={{
                                                    width: `${100 / currentPageCount}%`,
                                                }}
                                            >
                                                <div className="rounded-lg flex justify-center items-end h-full relative group">
                                                    <a
                                                        href={`/public/flipbook/${book._id}`}
                                                        target={bookshelfSettings.openInNewTab ? "_blank" : "_self"}
                                                        rel="noopener noreferrer"
                                                        className="block"
                                                        style={{ textDecoration: "none" }}
                                                    >
                                                        <div className="relative overflow-auto rounded-md shadow-md transition-all duration-200 hover:scale-105 hover:-translate-y-0.5">
                                                            <img
                                                                src={book.thumbnail ? book.thumbnail : bookLogo}
                                                                alt={`Book ${book._id}`}
                                                                className="  cursor-pointer mx-auto"
                                                                style={{
                                                                    minHeight: "100px",
                                                                    maxHeight: `${bookshelfSettings.thumbnailSize > 300 ? 300 : bookshelfSettings.thumbnailSize}px`,
                                                                    width: 'auto'
                                                                }}
                                                            />
                                                            {bookshelfSettings.showFlipbookName && (
                                                                <div className="absolute flex items-end top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 rounded-b-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                                    <span className="w-full truncate">
                                                                        {book.name || `Book ${book._id}`}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
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
                                                borderBottom: `20px solid ${bookshelfSettings.bookshelfColor}`,
                                                borderLeft: '22px solid transparent',
                                                borderRight: '22px solid transparent'
                                            }}
                                        ></div>

                                        <div
                                            className="h-2.5 w-full absolute left-0 right-0 z-10 m-0"
                                            style={{
                                                bottom: '-11px',
                                                backgroundColor: bookshelfSettings.bookshelfColor
                                            }}
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
            }
        </div>
    )
}