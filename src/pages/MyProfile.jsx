import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Lock, Search, Shield } from "lucide-react";
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";
import { GetWorkspaceBookApi } from "@/service/flipbook.publish.service";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Loader } from "@/components/ui/loader";
import bookLogo from '/assets/book_thumbnail.jpg';

export default function MyProfile() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const { id } = useParams();
    const [hoveredId, setHoveredId] = useState(null);

    useEffect(() => {
        const GetProfileDetails = async () => {
            setLoading(true);
            try {
                const response = await GetWorkspaceBookApi(id);
                setData(response.data);
            } catch (err) {
                toast.error("Getting an error which fetching workspace book details", {
                    description: err.message
                })
            } finally {
                setLoading(false);
            }
        }
        GetProfileDetails();
    }, []);

    if (loading) {
        return (
            <Loader />
        );
    }

    if (!data) return null;

    if (data.isProfilePrivate) {
        return (
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden py-4 h-[100vh]">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-100 rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full opacity-20 animate-pulse"></div>
                </div>

                <div className="relative z-10 max-w-md w-full mx-4 animate-fade-in">
                    <div className="flex justify-center mb-8">
                        <div className="relative p-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 shadow-2xl transform hover:scale-110 transition-all duration-700">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 opacity-50 blur-xl animate-pulse"></div>
                            <Lock className="w-12 h-12 text-white relative z-10 animate-bounce" />
                            <Shield className="absolute -top-2 -right-2 w-6 h-6 text-purple-300 animate-ping" />
                            <Eye className="absolute -bottom-1 -left-2 w-5 h-5 text-purple-300 animate-pulse" />
                            <EyeOff className="absolute top-0 left-0 w-4 h-4 text-purple-300 animate-ping" />
                        </div>
                    </div>

                    <div className="text-center space-y-6 px-6">
                        <div className="space-y-3">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
                                Private Profile
                            </h1>
                            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-500 mx-auto rounded-full"></div>
                        </div>

                        <p className="text-xl text-gray-700 font-medium">
                            Access Restricted
                        </p>

                        <p className="text-gray-500 leading-relaxed">
                            This publisher's profile is set to private. You don't have permission to view the content at this time.
                        </p>

                        {/* <div className="flex justify-center space-x-8 pt-6">
                            <div className="flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                                <div className="p-3 bg-gray-100 rounded-full hover:bg-purple-100 transition-colors duration-300">
                                    <Shield className="w-5 h-5 text-gray-600 hover:text-purple-600 transition-colors duration-300" />
                                </div>
                                <span className="text-xs text-gray-500 font-medium">Protected</span>
                            </div>

                            <div className="flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                                <div className="p-3 bg-gray-100 rounded-full hover:bg-purple-100 transition-colors duration-300">
                                    <Lock className="w-5 h-5 text-gray-600 hover:text-purple-600 transition-colors duration-300" />
                                </div>
                                <span className="text-xs text-gray-500 font-medium">Secure</span>
                            </div>

                            <div className="flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                                <div className="p-3 bg-gray-100 rounded-full hover:bg-purple-100 transition-colors duration-300">
                                    <EyeOff className="w-5 h-5 text-gray-600 hover:text-purple-600 transition-colors duration-300" />
                                </div>
                                <span className="text-xs text-gray-500 font-medium">Private</span>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className="absolute top-10 left-10 w-8 h-8 bg-purple-200 rounded-full opacity-30 animate-ping"></div>
                <div className="absolute bottom-10 right-10 w-6 h-6 bg-purple-200 rounded-full opacity-30 animate-ping"></div>
                <div className="absolute top-1/3 right-20 w-4 h-4 bg-purple-300 rounded-full opacity-40 animate-bounce"></div>
                <div className="absolute bottom-1/3 left-20 w-5 h-5 bg-purple-300 rounded-full opacity-40 animate-bounce"></div>
            </div>
        );
    }

    const filteredFlipbooks = data.flipbooks?.filter(fb =>
        fb.name.toLowerCase().includes(search.toLowerCase())
    );

    const socialIcons = [
        { key: "facebookLink", icon: Facebook },
        { key: "twitterLink", icon: Twitter },
        { key: "youtubeLink", icon: Youtube },
        { key: "instagramLink", icon: Instagram },
        { key: "linkedinLink", icon: Linkedin },
    ];

    return (
        <div>
            <dv>
                {data.showHeader && (
                    <div className="py-3 pl-5" style={{ backgroundColor: data.headerColor }}>
                        {data.logo && <img
                            src={data.logo}
                            alt="Logo"
                            className="max-h-[45px]  max-w-[200px]"
                        />}
                    </div>
                )}
            </dv>
            <div className="w-[80%] m-auto">
                {!data.isProfileInfoHidden && (
                    <div className="w-full flex flex-col items-center md:items-start justify-center md:justify-start py-8 px-4 sm:px-8 md:py-12 lg:py-16">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 w-full mx-auto md:mx-0">
                            {data.profileImage && <img
                                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border border-gray-200 shadow-sm shrink-0"
                                alt="profile"
                                src={data.profileImage}
                            />}
                            <div className="flex flex-col items-center md:items-start w-full space-y-6 md:space-y-8">
                                <div className="space-y-2">
                                    <p className="text-3xl md:text-4xl font-bold text-center md:text-left">{data.name}</p>
                                    <div className="flex max-md:justify-center">
                                        {data.websiteLink && (
                                            <a
                                                href={data.websiteLink}
                                                className="text-[15px] font-medium hover:underline break-all"
                                                style={{ color: data.elementColor }}
                                                target="_blank"
                                            >
                                                {data.websiteLink.replace(/^https?:\/\//, "")}
                                            </a>
                                        )}
                                    </div>

                                    {data.description && (
                                        <p className="text-[15px] md:text-base text-center md:text-left text-gray-700">{data.description}</p>
                                    )}
                                </div>
                                <div className="flex gap-3 justify-center md:justify-start w-full">
                                    {socialIcons.map(
                                        ({ key, icon: Icon }) =>
                                            data[key] && (
                                                <Button
                                                    key={key}
                                                    variant="outline"
                                                    className="px-2"
                                                    asChild
                                                >
                                                    <a href={data[key]} target="_blank" rel="noopener noreferrer">
                                                        <Icon className="w-5 h-5" color={data.elementColor} />
                                                    </a>
                                                </Button>
                                            )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <Separator />
                <div className="px-4 py-6 space-y-6">
                    <div className="flex justify-between items-center gap-3">
                        <p className="text-2xl font-semibold">Publications</p>
                        {data.showSearchBar && (
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
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4 space-y-8">
                        {filteredFlipbooks.length === 0 ? (
                            <p>No publications found.</p>
                        ) : (
                            filteredFlipbooks.map(fb => (
                                <div
                                    key={fb._id}
                                    className="flex flex-col space-y-4 bg-white rounded-lg"
                                    onMouseEnter={() => setHoveredId(fb._id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    <a
                                        href={fb.type === 'bookshelf' ? `/public-bookshelf/${fb._id}` : `/public-flipbook/${fb._id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-grow flex items-end justify-center"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <img
                                            src={fb.thumbnail ? fb.thumbnail : bookLogo}
                                            alt={fb.name}
                                            className="rounded-md max-h-56 shadow-md hover:shadow-xl transition duration-200 hover:opacity-80 cursor-pointer"
                                        />
                                    </a>
                                    <div className="space-y-2">
                                        <a
                                            href={fb.type === 'bookshelf' ? `/public-bookshelf/${fb._id}` : `/public-flipbook/${fb._id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <p
                                                className="font-semibold truncate"
                                                title={fb.name}
                                                style={hoveredId === fb._id ? { color: data.elementColor } : {}}
                                            >
                                                {fb.name}
                                            </p>
                                        </a>
                                        {fb.isPublishDtVisible && (
                                            <p className="text-xs text-[#2d516e] font-bold">
                                                Published on {format(new Date(fb.publishedOn), "MMM dd, yyyy")}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Separator />
            <div className="px-4 py-6 gap-3 flex justify-evenly flex-wrap">
                {data.footerLink?.map(link => (
                    <a
                        key={link._id}
                        href={link.url}
                        className="text-gray-500"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = data.elementColor)}
                        onMouseLeave={e => (e.currentTarget.style.color = "")}
                    >
                        {link.title}
                    </a>
                ))}
            </div>
        </div>
    );
}