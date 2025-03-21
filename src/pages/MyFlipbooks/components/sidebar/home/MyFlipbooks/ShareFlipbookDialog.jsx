import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy, Check, Mail, Info } from 'lucide-react'
import { useState } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function ShareFlipbookDialog({ isShareModalOpen, setIsShareModalOpen }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Share Folder</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Button variant="outline">
                            <img className="w-7" src="/src/assets/social/facebook.png" alt="Facebook" />
                        </Button>
                        <Button variant="outline">
                            <img className="w-7" src="/src/assets/social/whatsapp.png" alt="Facebook" />
                        </Button>
                        <Button variant="outline">
                            <img className="w-7" src="/src/assets/social/linkedin.png" alt="Facebook" />
                        </Button>
                        <Button variant="outline">
                            <Mail /> Send Email
                        </Button>
                    </div>
                    <div className="space-y-2 mt-6">
                        <p className="text-[12px] font-medium text-gray-600">Link to fullscreen mode on Flipnova without Flipnova branding</p>
                        <div className="flex items-center gap-3">
                            <Input
                                value="https://www.flipsnack.com/65BDD977C6F/d/a5a5f848-2a20-45ee-b4aa-4d21fa7fff08/"
                                readOnly
                                className="flex-1 text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300"
                            />
                            <Button
                                variant="outline"
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-4 py-2 border-gray-300 rounded-md hover:bg-gray-100"
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-4 w-4" />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-4 w-4" />
                                        Copy
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Trackable Links Section */}
                    <div className="flex items-center mt-6 gap-2">
                        <a className="text-sm font-medium text-purple-600 cursor-pointer">Create trackable links</a>
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

                    {/* White Label URL Section */}
                    <div className="flex items-center mt-6 gap-2">
                        <span className="text-[12px] font-medium text-gray-700">White label URL -</span>
                        <a
                            href="https://help.flipsnack.com/en/articles/2139448-using-a-custom-domain-with-flipsnack"
                            className="text-[12px] font-medium text-purple-600 hover:underline"
                        >
                            Learn more
                        </a>
                    </div>

                    {/* White Label Input */}
                    <div className="flex items-center mt-2">
                        <div className="flex-grow mr-1 max-w-[50%] relative">
                            <Input
                                value="flibook.yourdomain.com"
                                readOnly
                                className="text-sm border-gray-300 rounded-l-md focus:ring-2 focus:ring-purple-300 pr-0 bg-white"
                            />
                        </div>
                        <div className="bg-gray-50 border border-gray-300 text-sm text-gray-600 py-2 px-3 rounded-r-md whitespace-nowrap flex items-center">
                            /campaigns.html
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}