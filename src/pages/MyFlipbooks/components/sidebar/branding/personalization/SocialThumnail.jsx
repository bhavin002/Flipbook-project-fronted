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
export default function SocialThumnail() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Change your social media thumbnail</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="font-medium flex items-center gap-2">
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
                    </label>
                    <Button variant="outline"><Trash2 /></Button>
                </div>
                <Button variant="outline" size="sm">
                    <Upload size={14} className="mr-2" />
                    Upload Image
                </Button>
                <div className="flex justify-center items-center">
                    <img src="/src/assets/social-media-thumbnail.png" className="w-auto" alt="Social Media Thumbnail" />
                </div>
            </CardContent>
        </Card>
    )
}