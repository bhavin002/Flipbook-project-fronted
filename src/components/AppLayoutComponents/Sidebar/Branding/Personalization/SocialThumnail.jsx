import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Trash2,
    Upload,
    Info,
    Image
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Label } from "@/components/ui/label";
import { useBranding } from "@/context/BrandingContext";
import { useRef } from "react";
import { toast } from "sonner";

export default function SocialThumnail() {
    const { form, handleFileUpload, handleDeleteFile, previewUrls } = useBranding();
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file size (2MB)
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Failed to upload", {
                    description: "File size should be less than 2MB",
                });
                return;
            }
            handleFileUpload("socialMediaImage", file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleDelete = () => {
        handleDeleteFile("socialMediaImage");
    };

    const socialMediaImage = form.watch("socialMediaImage");
    const hasSocialMediaImage = previewUrls.socialMediaImage || socialMediaImage;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Change your social media thumbnail</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="font-medium flex items-center gap-2">
                        Social media image
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-gray-500 cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent
                                    side="right"
                                    align="center"
                                    className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
                                >
                                    <p className="text-sm">This is the image that appears when your profile is shared on Facebook, Twitter or any other social media. Recommended: 1:91:1 ratio, 2mb size, 1200 x 630 dimensions</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Label>
                    <Button 
                        variant="outline" 
                        onClick={handleDelete}
                        disabled={!hasSocialMediaImage}
                    >
                        <Trash2 />
                    </Button>
                </div>
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
                <div className="flex justify-center items-center">
                    {hasSocialMediaImage ? (
                        <img 
                            src={previewUrls.socialMediaImage} 
                            className="w-auto" 
                            alt="Social Media Thumbnail" 
                        />
                    ) : (
                        <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                            <Image className="text-gray-400" />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}