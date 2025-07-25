import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Copy, Info } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react";
import { toast } from "sonner";
import BookShelfView from "../BookShelfView";

export default function DetailsTab({ flipbookId }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const shareUrl = `${import.meta.env.VITE_APP_URL}/public-flipbook/${flipbookId}`;
        navigator.clipboard.writeText(shareUrl)
            .then(() => {
                setCopied(true);
                toast.success("Link copied to clipboard!");
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(() => {
                toast.error("Failed to copy link");
            });
    };

    return (
        <div className="py-6 max-w-[100vw] overflow-auto space-y-4">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Shelf Details</h1>
                <p className="text-gray-500">Access share, embed and download options, as well as statistics.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Share link</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Input
                            value={`${import.meta.env.VITE_APP_URL}/public-flipbook/${flipbookId}`}
                            readOnly
                        />
                        <Button variant="outline" onClick={handleCopy}>
                            {copied ? (
                                <>
                                    <Check className="h-4 w-4 mr-2" />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy
                                </>
                            )}
                        </Button>
                    </div>
                    <div className="flex items-center gap-2">
                        <a className="text-sm font-medium text-purple-600 cursor-pointer hover:underline">Create trackable links</a>
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
                                    <p className="text-sm">Create unique link for each lead to track their interactions in your flipbook</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </CardContent>
                <BookShelfView id={flipbookId} />
            </Card>
        </div>
    )
}
