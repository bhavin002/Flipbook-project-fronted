import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";
import { GetWorkspaceBookApi } from "@/service/flipbook.publish.service";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

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
            <Card>
                <CardContent>
                    <Skeleton className="w-full h-96" />
                </CardContent>
            </Card>
        );
    }

    if (!data) return null;

    // Filter publications by search
    const filteredFlipbooks = data.flipbooks?.filter(fb =>
        fb.name.toLowerCase().includes(search.toLowerCase())
    );

    // Helper for social icons
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
                    <div className="py-3 pl-5 h-[62px]" style={{ backgroundColor: data.headerColor }}>
                        {data.logo && <img
                            src={data.logo}
                            alt="Logo"
                            className="max-h-[45px]"
                        />}
                    </div>
                )}
            </dv>
            <div className="w-[80%] m-auto">
                {!data.isProfileInfoHidden && (
                    <div className="w-full flex flex-col items-center md:items-start justify-center md:justify-start py-8 px-4 sm:px-8 md:py-12 lg:py-16">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 w-full mx-auto md:mx-0">
                            {data.profileImage && <img
                                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border border-gray-200 shadow-sm"
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
                                    <div className="flex-grow flex items-end justify-center">
                                        <img
                                            src={fb.thumbnail}
                                            alt={fb.name}
                                            className="rounded-md max-h-56 shadow-md hover:shadow-xl transition duration-200 hover:opacity-80 cursor-pointer"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <p
                                            className="font-semibold"
                                            style={hoveredId === fb._id ? { color: data.elementColor } : {}}
                                        >
                                            {fb.name}
                                        </p>
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