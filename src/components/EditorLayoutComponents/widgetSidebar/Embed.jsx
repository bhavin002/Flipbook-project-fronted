import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Info, Trash2 } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button";

export default function Embed() {
    const [hasImage, setHasImage] = useState(false);

    const handleUploadImage = () => {
        setHasImage(true);
    };

    const handleDeleteImage = () => {
        setHasImage(false);
    };

    return (
        <div className="p-6 space-y-2 w-full">
            <Label className="text-lg">Embed</Label>
            <div className="space-y-2">
                <div>
                    <Label htmlFor="popup-frame-code" className="text-xs">Embed code</Label>
                    <Textarea
                        id="popup-frame-code"
                        placeholder="Embed code"
                        className="resize-none placeholder:text-gray-300"
                        rows={4}
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-1">
                        <Label className="text-xs">
                            Cover image
                        </Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Info className="h-3 w-3 cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent
                                    side="right"
                                    align="center"
                                    className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
                                >
                                    <p className="text-sm">The cover image shows as a placeholder when the flipbook is downloaded (PDF, JPG, PNG).</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    {hasImage &&
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2 items-center ">
                                <img src="https://cdn.flipsnack.com/collections/uploads/1500b2e0589f1cb5dcdbab1f49929443_t" className="w-[50px] h-[40px] object-cover rounded-sm" alt="Spotlight" />
                                <p className="text-sm truncate">152 (4).jpg</p>
                            </div>
                            <Button variant="ghost" onClick={handleDeleteImage}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    }
                    <Button
                        className="w-full text-black hover:text-primary"
                        variant="outline"
                        onClick={handleUploadImage}
                        disabled={hasImage}
                    >
                        Upload image
                    </Button>
                </div>
            </div>
        </div>
    )
}