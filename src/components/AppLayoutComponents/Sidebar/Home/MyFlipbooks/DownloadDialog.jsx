import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Crown } from 'lucide-react';
import { getData } from "@/utils/datas";

export default function DownloadDialog({ isDownloadModalOpen, setIsDownloadModalOpen }) {
    const downloadOptions = getData("downloadOptions");

    return (
        <Dialog open={isDownloadModalOpen} onOpenChange={setIsDownloadModalOpen}>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Download</DialogTitle>
                    <DialogDescription className="sr-only">
                        Description
                    </DialogDescription>
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