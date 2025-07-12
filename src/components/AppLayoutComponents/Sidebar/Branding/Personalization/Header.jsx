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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useBranding } from "@/context/BrandingContext";
import { useRef } from "react";

export default function Header() {
    const { form, handleFileUpload, handleDeleteFile, handleInputChange, previewUrls } = useBranding();
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file size (2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert("File size should be less than 2MB");
                return;
            }
            handleFileUpload("logo", file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleDelete = () => {
        handleDeleteFile("logo");
    };

    const logo = form.watch("logo");
    const hasLogo = previewUrls.logo || logo;
    const isHeaderVisible = form.watch("isHeaderVisible");
    const isSearchBarVisible = form.watch("isSearchBarVisible");
    const headerColor = form.watch("headerColor");
    const elementColor = form.watch("elementColor");

    return (
        <Card>
            <CardHeader>
                <CardTitle>Personalize your header</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center">
                    <Switch 
                        id="show-header" 
                        checked={isHeaderVisible}
                        onCheckedChange={(checked) => handleInputChange("isHeaderVisible", checked)}
                    />
                    <Label htmlFor="show-header" className="ml-3 text-gray-700">
                        Show header
                    </Label>
                </div>
                <div className="flex items-center">
                    <Switch 
                        id="show-search-bar" 
                        checked={isSearchBarVisible}
                        onCheckedChange={(checked) => handleInputChange("isSearchBarVisible", checked)}
                    />
                    <Label htmlFor="show-search-bar" className="ml-3 text-gray-700">
                        Show search bar
                    </Label>
                </div>
                <div className="flex items-center justify-between">
                    <Label className="font-medium flex items-center gap-2">
                        Logo
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
                                    <p className="text-sm">Recommended: 5:1 ratio</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Label>
                    <Button 
                        variant="outline" 
                        onClick={handleDelete}
                        disabled={!hasLogo}
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
                    Upload Logo
                </Button>
                {hasLogo && (
                    <img 
                        src={previewUrls.logo} 
                        className="mx-auto max-h-[100px] max-w-[200px]" 
                        alt="Logo" 
                    />
                )}
                <div className="flex flex-col gap-2">
                    <Label>Header color</Label>
                    <Input 
                        type="color" 
                        value={headerColor}
                        onChange={(e) => handleInputChange("headerColor", e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label className="flex gap-2">Elements color
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
                                    <p className="text-sm">This will affect the color of the text and the icons on your readers navigation bar.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Label>
                    <Input 
                        type="color" 
                        value={elementColor}
                        onChange={(e) => handleInputChange("elementColor", e.target.value)}
                    />
                </div>
            </CardContent>
        </Card>
    );
}