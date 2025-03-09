import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import {
    FileCode,
    FileText,
    Image,
    CirclePlay,
    Crown
} from 'lucide-react';

export default function DownloadDialog({ isDownloadModalOpen, setIsDownloadModalOpen }) {
    const downloadOptions = [
        {
            id: 1,
            icon: FileCode,
            title: "Download HTML5",
            description: "Download the animated HTML5 flipbook on your computer for offline use self hosting.",
            learnMoreLink: "#",
            isPremium: true,
        },
        {
            id: 2,
            icon: FileText,
            title: "Download PDF for web",
            description: "Download your design as web PDF, if you need it for online sharing.",
            learnMoreLink: "#",
            isPremium: true,
        },
        {
            id: 3,
            icon: FileText,
            title: "Download PDF for print",
            description: "Download the print-ready PDF, if you need to print your design.",
            learnMoreLink: "#",
            isPremium: false,
        },
        {
            id: 4,
            icon: Image,
            title: "Download GIF",
            description: "Perfect for sharing a preview on email and social media. Always accompany it with the catalog link.",
            learnMoreLink: "#",
            isPremium: true,
        },
        {
            id: 5,
            icon: Image,
            title: "Download PNG",
            description: "Perfect for sharing a preview on email and social media. Always accompany it with the catalog link.",
            learnMoreLink: "#",
            isPremium: true,
        },
        {
            id: 6,
            icon: Image,
            title: "Download GPEG",
            description: "Perfect for sharing a preview on email and social media. Always accompany it with the catalog link.",
            learnMoreLink: "#",
            isPremium: false,
        },
        {
            id: 7,
            icon: CirclePlay,
            title: "Download MP4",
            description: "Get a 10-12 seconds teaser trailer of your catalog, perfect for social sharing.",
            learnMoreLink: "#",
            isPremium: true,
        },
    ];

    return (
        <Dialog open={isDownloadModalOpen} onOpenChange={setIsDownloadModalOpen}>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Download</DialogTitle>
                </DialogHeader>
                <div className="max-h-[calc(100vh-300px)] overflow-y-auto space-y-4 py-4">
                    {downloadOptions.map((option) => (
                        <div
                            key={option.id}
                            className="flex flex-col sm:flex-row items-start p-4 bg-violet-50 rounded-lg"
                        >
                            <div className="flex items-start w-full">
                                <div className="mr-4 mt-1 bg-violet-100 p-2 rounded-lg shrink-0">
                                    <option.icon className="h-6 w-6 text-violet-600" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="text-lg font-semibold">{option.title}</h3>
                                        {option.isPremium && (
                                            <Crown className="h-5 w-5 text-amber-400 shrink-0" />
                                        )}
                                    </div>
                                    <p className="text-gray-600 text-sm mt-1 break-words">{option.description}
                                        <a href={option.learnMoreLink} className="text-violet-700 text-sm hover:underline ml-1">
                                            Learn more
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 sm:mt-0 sm:ml-4 self-start sm:self-center w-full sm:w-auto flex justify-end">
                                <Button
                                    variant={option.isPremium ? "default" : "outline"}
                                    className={`text-sm px-4 ${!option.isPremium && "opacity-50"}`}
                                    disabled={!option.isPremium}
                                >
                                    Download
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}