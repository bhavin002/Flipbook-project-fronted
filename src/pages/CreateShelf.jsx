import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle } from "lucide-react";
import { GetPublicFlipbookApi } from "@/service/flipbook.publish.service";
import { toast } from "sonner";
import { Loader } from "@/components/ui/loader";
import bookLogo from '@/assets/book_thumbnail.jpg';
import { useWorkspaces } from "@/context/WorkspaceContext";
import { useShelfCreate } from "@/layout/ShelfCreateLayout";
import { useParams } from "react-router-dom";

export default function CreateShelf() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const { currentWorkspace } = useWorkspaces();
    const { selectedFlipbooks, setSelectedFlipbooks } = useShelfCreate();
    const { id } = useParams();
    console.log("book shelf id", id);

    useEffect(() => {
        const fetchFlipbooks = async () => {
            setLoading(true);
            try {
                const response = await GetPublicFlipbookApi(currentWorkspace._id);
                setData(response.data);
            } catch (err) {
                toast.error("Error fetching flipbooks", {
                    description: err.message
                });
            } finally {
                setLoading(false);
            }
        };
        if (currentWorkspace) {
            fetchFlipbooks();
        }
    }, [currentWorkspace]);

    if (loading) {
        return <Loader />;
    }

    if (!data) return null;

    const filteredFlipbooks = data.flipbooks?.filter(fb =>
        fb.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

    const isSelected = (id) => selectedFlipbooks.some(fb => fb._id === id);

    const handleSelectFlipbook = (flipbook) => {
        setSelectedFlipbooks(prev => {
            if (prev.some(fb => fb._id === flipbook._id)) {
                return prev.filter(fb => fb._id !== flipbook._id);
            } else {
                return [...prev, flipbook];
            }
        });
    };

    return (
        <div className="w-full px-4 md:px-6 mt-4">
            <div className="flex justify-between items-center gap-3">
                <p className="text-lg font-semibold">Select flipbooks ({selectedFlipbooks.length})</p>
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
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4 py-4">
                {filteredFlipbooks.length === 0 ? (
                    <p>No publications found.</p>
                ) : (
                    filteredFlipbooks.map(fb => (
                        <div
                            key={fb._id}
                            className={`relative flex flex-col rounded-sm h-[351px] overflow-hidden group transition-all duration-300
                                ${isSelected(fb._id)
                                    ? 'border-2 border-primary rounded-md overflow-hidden'
                                    : 'border-2 border-gray-200 rounded-md'
                                }
                                group-hover:border-4 group-hover:border-primary group-hover:rounded-md group-hover:shadow-lg group-hover:shadow-black/30
                            `}
                            onClick={() => handleSelectFlipbook(fb)}
                            style={{ cursor: 'pointer' }}
                        >
                            {isSelected(fb._id) && (
                                <CheckCircle
                                    className="absolute top-2 right-2 z-20 text-primary bg-white rounded-full shadow-lg"
                                    size={28}
                                />
                            )}
                            <div className={`absolute inset-0 z-10 bg-black/40 transition-opacity duration-200 pointer-events-none ${isSelected(fb._id) ? 'opacity-60' : 'opacity-0 group-hover:opacity-60'}`} />
                            <div className="flex-grow flex items-center justify-center bg-[#f6f6f6] max-h-full h-[245px] relative" >
                                <img
                                    src={fb.thumbnail ? fb.thumbnail : bookLogo}
                                    alt={fb.name}
                                    className="max-h-full"
                                />
                            </div>
                            <div className="text-start px-3 space-y-1 py-2">
                                <p
                                    className="font-semibold truncate"
                                    title={fb.name}
                                >
                                    {fb.name}
                                </p>
                                <img src="/src/assets/globe.png" className="w-4 h-4" />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}