import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { useBranding } from "@/context/BrandingContext";
import { toast } from "sonner";
import { UpdateWorkspaceApi } from "@/service/workspace.service";
import { useState } from "react";

export default function Preview() {
    const { form, hasChanges, previewUrls, setHasChanges } = useBranding();
    const formValues = form.watch();
    const [isLoading, setIsLoading] = useState(false);

    const handleSaveChanges = async () => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            const values = form.getValues();

            Object.keys(values).forEach(key => {
                if (values[key] !== null && values[key] !== undefined) {
                    if (key === 'footerLinks') {
                        formData.append(key, JSON.stringify(values[key]));
                    } else if (values[key] instanceof File) {
                        formData.append(key, values[key]);
                    } else {
                        formData.append(key, values[key]);
                    }
                }
            });

            const response = await UpdateWorkspaceApi(formData);
            toast.success("profile updated successfully", {
                description: response.message || "Profile updated successfully",
            });

        } catch (error) {
            toast.error("Failed to update profile", {
                description: error.message || "Something went wrong while saving changes",
            });
        } finally {
            setIsLoading(false);
            setHasChanges(false);
        }
    };

    const getSocialIcon = (platform) => {
        const value = formValues[platform];
        if (!value) return null;

        try {
            return (
                <Button variant="outline" className="px-2">
                    <img
                        className="w-5 h-5"
                        src={`/src/assets/social/theme/${platform}.png`}
                        alt={platform}
                    />
                </Button>
            );
        } catch {
            return null;
        }
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
                    <Button variant="outline">
                        See my profile
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="border p-0 m-6 mt-0 rounded-sm">
                <div className="p-2 bg-gray-100 flex flex-row items-center space-x-2">
                    <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1">
                        <div className="bg-white rounded-md p-1 text-xs flex items-center gap-1">
                            <img
                                src={previewUrls.favicon || "/src/assets/book_logo.png"}
                                className="h-4 w-auto shrink-0"
                                alt="Logo"
                            />
                            <span className="text-gray-500 truncate overflow-hidden whitespace-nowrap">
                                https://www.flipnova.com/F9D7AD99E8C/
                            </span>
                        </div>
                    </div>
                </div>
                {formValues.isHeaderVisible && (
                    <div className="p-4" style={{ backgroundColor: formValues.headerColor }}>
                        <img
                            src={previewUrls.logo || "/src/assets/logo.png"}
                            width={200}
                            alt="Cover"
                        />
                    </div>
                )}
                {!formValues.isProfileInfoHidden && (
                    <div className="py-4 px-8 flex max-md:flex-wrap gap-4">
                        <div className="flex items-start">
                            <img
                                className="w-28 rounded-full"
                                alt="profile"
                                src={previewUrls.profileImage || "/src/assets/profile.jpg"}
                            />
                        </div>
                        <div className="w-fit space-y-2">
                            <p className="text-lg font-bold">{formValues.name}</p>
                            {formValues.websiteLink && (
                                <a
                                    href={formValues.websiteLink}
                                    className="text-[12px] font-medium text-blue-600 hover:underline"
                                >
                                    {formValues.websiteLink}
                                </a>
                            )}
                            {formValues.description && (
                                <p className="text-gray-500 text-xs">
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
                                className="text-gray-500"
                            >
                                {link.title}
                            </a>
                        ))}
                </div>
            </CardContent>
        </Card>
    );
}
