import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Image,
    Trash2,
    Upload,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useBranding } from "@/context/BrandingContext";
import { useRef } from "react";
import { toast } from "sonner";

export default function Profile() {
    const { form, handleFileUpload, handleDeleteFile, handleInputChange, previewUrls } = useBranding();
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file size (15MB)
            if (file.size > 15 * 1024 * 1024) {
                toast.error("Failed to upload", {
                    description: "File size should be less than 15MB",
                });
                return;
            }
            handleFileUpload("profileImage", file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleDelete = () => {
        handleDeleteFile("profileImage");
    };

    const profileImage = form.watch("profileImage");
    const hasProfileImage = previewUrls.profileImage || profileImage;
    const isProfileInfoHidden = form.watch("isProfileInfoHidden");
    const name = form.watch("name");
    const description = form.watch("description");
    const websiteLink = form.watch("websiteLink");

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center">
                    <Switch
                        id="hide-profile-info"
                        checked={isProfileInfoHidden}
                        onCheckedChange={(checked) => handleInputChange("isProfileInfoHidden", checked)}
                    />
                    <Label htmlFor="hide-profile-info" className="ml-3 text-gray-700">
                        Hide profile information
                    </Label>
                </div>
                <div className="flex items-center justify-between">
                    <Label className="font-medium flex items-center gap-2">
                        Profile Image
                    </Label>
                    <Button
                        variant="outline"
                        onClick={handleDelete}
                        disabled={!hasProfileImage}
                    >
                        <Trash2 />
                    </Button>
                </div>
                <div className="flex items-center gap-4">

                    {hasProfileImage ? (
                        <div className="flex justify-center items-center size-20 rounded-full overflow-hidden border">
                            <img
                                src={previewUrls.profileImage}
                                className="w-full h-full object-cover aspect-1"
                                alt="Profile"
                            />
                        </div>

                    ) : (
                        <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                            <Image className="text-gray-400" />
                        </div>
                    )}
                    <div className="space-y-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/png,image/jpeg"
                            className="hidden"
                        />
                        <Button variant="outline" size="sm" onClick={handleUploadClick}>
                            <Upload size={14} className="mr-2" />
                            Upload Image
                        </Button>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG (Max 15MB)</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Description"
                        className="resize-none"
                        rows={3}
                        value={description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="link-to-website">Link to my website</Label>
                    <Input
                        id="link-to-website"
                        placeholder="yourdomain.com"
                        value={websiteLink}
                        onChange={(e) => handleInputChange("websiteLink", e.target.value)}
                    />
                </div>
            </CardContent>
        </Card>
    );
}