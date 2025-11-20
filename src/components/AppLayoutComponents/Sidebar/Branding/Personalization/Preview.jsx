import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";
import { useBranding } from "@/context/BrandingContext";
import { toast } from "sonner";
import { UpdateWorkspaceApi } from "@/service/workspace.service";
import { useState } from "react";
import { useWorkspaces } from "@/context/WorkspaceContext";

export default function Preview() {
    const { form, hasChanges, previewUrls, setHasChanges, getPayload } = useBranding();
    const formValues = form.watch();
    const [isLoading, setIsLoading] = useState(false);
    const {myWorkspaceId, updateWorkspaceName} = useWorkspaces();

    const socialIcons = {
        facebook: Facebook,
        twitter: Twitter,
        youtube: Youtube,
        instagram: Instagram,
        linkedin: Linkedin,
    };

    const handleSaveChanges = async () => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            const payload = getPayload();

            Object.keys(payload).forEach(key => {
                if (payload[key] instanceof File) {
                    formData.append(key, payload[key]);
                } else if (payload[key] === null) {
                    formData.append(key, ""); // Send empty string for deleted images
                } else if (payload[key] !== undefined) {
                    if (key === 'footerLinks') {
                        formData.append(key, JSON.stringify(payload[key]));
                    } else {
                        formData.append(key, payload[key]);
                    }
                }
            });

            const response = await UpdateWorkspaceApi(formData);
            toast.success("profile updated successfully", {
                description: response.message || "Profile updated successfully",
            });
            setHasChanges(false);
            // Update workspace name in context if changed
            if (payload.name) {
                updateWorkspaceName(myWorkspaceId, payload.name);
            }
        } catch (error) {
            toast.error("Failed to update profile", {
                description: error.message || "Something went wrong while saving changes",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const getSocialIcon = (platform) => {
        const value = formValues[platform];
        if (!value) return null;

        const IconComponent = socialIcons[platform];
        if (!IconComponent) return null;

        return (
            <Button variant="outline" className="px-2">
                <IconComponent className="w-5 h-5" style={{ color: formValues.elementColor }} />
            </Button>
        );
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <Button
                        onClick={handleSaveChanges}
                        disabled={!hasChanges || isLoading}
                    >
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                    <a
                        href={import.meta.env.VITE_APP_URL + `/profile/${myWorkspaceId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="outline">
                            See my profile
                        </Button>
                    </a>
                </div>
            </CardHeader>
            <CardContent className="border p-0 m-6 mt-0 rounded-sm">
                <div className="p-2 bg-[#e2e4ea] flex flex-row items-center space-x-2">
                    <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1">
                        <div className="bg-white rounded-md p-1 text-xs flex items-center gap-1">
                            <img
                                src={previewUrls.favicon || "/assets/book_logo.png"}
                                className="h-4 w-auto shrink-0"
                                alt="Logo"
                            />
                            <span className="text-gray-500 max-md:max-w-[235px] truncate overflow-hidden whitespace-nowrap">
                                {import.meta.env.VITE_APP_URL + `/profile/${myWorkspaceId}`}
                            </span>
                        </div>
                    </div>
                </div>
                {formValues.isHeaderVisible && (
                    <div className="p-4" style={{ backgroundColor: formValues.headerColor }}>
                        {previewUrls.logo && (
                            <img
                                src={previewUrls.logo}
                                className="max-h-[45px]  max-w-[200px]"
                                alt="Cover"
                            />
                        )}
                    </div>
                )}
                {!formValues.isProfileInfoHidden && (
                    <div className="py-4 px-4 flex max-md:flex-wrap gap-4">
                        {previewUrls.profileImage && (
                            <div className="flex items-start">
                                <img
                                    className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border border-gray-200 shadow-sm shrink-0"
                                    alt="profile"
                                    src={previewUrls.profileImage}
                                />
                            </div>)}
                        <div className="w-fit space-y-2">
                            <p className="text-lg font-bold">{formValues.name}</p>
                            {formValues.websiteLink && (
                                <a
                                    href={formValues.websiteLink}
                                    className="text-[12px] font-medium hover:underline"
                                    style={{ color: formValues.elementColor }}
                                >
                                    {formValues.websiteLink}
                                </a>
                            )}
                            {formValues.description && (
                                <p className="text-gray-500 text-xs" style={{ wordBreak: "break-all" }}>
                                    {formValues.description}
                                </p>
                            )}
                            <div className="flex gap-3">
                                {getSocialIcon("facebook")}
                                {getSocialIcon("twitter")}
                                {getSocialIcon("youtube")}
                                {getSocialIcon("instagram")}
                                {getSocialIcon("linkedin")}
                            </div>
                        </div>
                    </div>
                )}
                <Separator />
                <div className="px-4 py-6 space-y-6">
                    <div className="flex justify-between items-center gap-3">
                        <p className="text-md font-semibold">Publications</p>
                        {formValues.isSearchBarVisible && (
                            <div className="grid items-center gap-1.5">
                                <div className="relative">
                                    <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                                        <Search className="h-4 w-4" />
                                    </div>
                                    <Input
                                        id="search"
                                        autoComplete="off"
                                        type="search"
                                        placeholder="Search..."
                                        className="w-full rounded-lg bg-background pl-8"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="flex flex-col space-y-4">
                                <Skeleton className="w-full h-48 rounded-md" />
                                <Skeleton className="w-full h-6 rounded-md" />
                                <Skeleton className="w-3/4 h-6 rounded-md" />
                            </div>
                        ))}
                    </div>
                </div>
                <Separator />
                <div className="px-4 py-6 gap-3 flex justify-evenly flex-wrap">
                    {formValues.footerLinks
                        .filter(link => link.title && link.url)
                        .map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                className="text-gray-500 hover:transition-colors duration-200"
                                style={{ 
                                    '--hover-color': formValues.elementColor 
                                }}
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={(e) => {
                                    e.target.style.color = formValues.elementColor;
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = '#6b7280'; // text-gray-500
                                }}
                            >
                                {link.title}
                            </a>
                        ))}
                </div>
            </CardContent>
        </Card>
    );
}
