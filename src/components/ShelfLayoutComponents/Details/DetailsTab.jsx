import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Copy, Edit, Eye, Info, SlidersHorizontal } from 'lucide-react';
import { useState } from "react";
import { toast } from "sonner";
import BookShelfView from "../BookShelfView";
import { useNavigate } from "react-router-dom";
import { useBookshelf } from "@/context/BookshelfContext";

export default function DetailsTab({ flipbookId }) {
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();
    const { bookshelfSettings } = useBookshelf();

    const handleCopy = () => {
        const shareUrl = `${import.meta.env.VITE_WEBSITE_URL}/public/bookshelf/${flipbookId}`;
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
                <h1 className="text-2xl font-bold mb-2">Shelf Details <span className="text-primary">{bookshelfSettings?.bookshelfName || "New Flipbook"}</span></h1>
                <p className="text-gray-500">Access share, embed and download options, as well as statistics.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Share link</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Input
                            value={`${import.meta.env.VITE_WEBSITE_URL}/public/bookshelf/${flipbookId}`}
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
                </CardContent>
            </Card>
            <Card className="shadow-sm flex-grow rounded-lg p-4 w-full flex flex-col gap-4">
                <div className="h-[569px]">
                    <BookShelfView id={flipbookId} />
                </div>
                <div className="flex gap-5 items-center">
                    <Button
                        variant="outline"
                        onClick={() => {
                            window.open(`${import.meta.env.VITE_WEBSITE_URL}/public/bookshelf/${flipbookId}`, "_blank");
                        }}
                        className="text-primary cursor-pointer font-medium"
                    >
                        <Eye className="h-4 w-4 mr-2" />
                        View live
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            navigate(`/shelf/select/${flipbookId}`);
                        }}
                        className="text-primary cursor-pointer font-medium"
                    >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            navigate(`/shelf/customize/${flipbookId}`);
                        }}
                        className="text-primary cursor-pointer font-medium"
                    >
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Customize
                    </Button>
                </div>
            </Card>
        </div>
    )
}
