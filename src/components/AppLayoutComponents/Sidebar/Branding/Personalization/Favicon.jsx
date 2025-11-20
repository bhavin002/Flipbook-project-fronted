import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Trash2,
    Upload,
    Info
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

export default function Favicon() {
    const { form, handleFileUpload, handleDeleteFile, previewUrls } = useBranding();
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 150 * 1024) {
                toast.error("Failed to upload", {
                    description: "File size should be less than 150kb",
                });
                return;
            }
            handleFileUpload("favicon", file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleDelete = () => {
        handleDeleteFile("favicon");
    };

    const favicon = form.watch("favicon");
    const hasFavicon = previewUrls.favicon || favicon;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Set your favicon</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="font-medium flex items-center gap-2">
                        Favicon
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
                                    <p className="text-sm">Recommended: 1:1 ratio</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Label>
                    <Button
                        variant="outline"
                        onClick={handleDelete}
                        disabled={!hasFavicon}
                    >
                        <Trash2 />
                    </Button>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex justify-center items-center size-12">
                        <img
                            src={previewUrls.favicon || "/assets/book_logo.png"}
                            className="w-auto h-auto max-h-12 max-w-full"
                            alt="Favicon"
                        />
                    </div>
                    <div className="space-y-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/png,image/jpeg,image/x-icon"
                            className="hidden"
                        />
                        <Button variant="outline" size="sm" onClick={handleUploadClick}>
                            <Upload size={14} className="mr-2" />
                            Upload Favicon
                        </Button>
                        <p className="text-xs text-gray-500">PNG, JPG or ICO (Max 150kb)</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}