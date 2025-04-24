import { Label } from "@/components/ui/label";
import { Info, MailPlus, Trash2 } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function OrderOptions() {
    return (
        <>
            <div className="space-y-4">
                <div className="flex gap-2 items-center">
                    <MailPlus className="h-5 w-5" />  <span className="text-sm font-semibold">Send order via email</span>
                </div>
                <p className="text-sm text-gray-500">
                    Your customers can send their orders directly via email through Flipsnack.
                </p>
                <div className="space-y-2">
                    <div>
                        <Label htmlFor="button-label" className="text-xs">
                            Button label
                        </Label>
                        <Input
                            type="text"
                            id="button-label"
                            defaultValue="Send order"
                            placeholder="Send order"
                        />
                    </div>
                    <div>
                        <div className='flex gap-2 items-center'>
                            <Label htmlFor="min-max-quantity" className="text-xs">
                                Logo
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
                                        <p className="text-sm">Recommended: 5:1 ratio, 1MB size.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="border flex justify-between p-2 rounded-sm my-2 items-center">
                            <img src="/src/assets/book_logo.png" className="max-w-[142px] max-h-[40px]" alt="Logo" />
                            <div className="flex gap-1 items-center">
                                <Button variant="ghost">
                                    Replace
                                </Button>
                                <Button variant="ghost">
                                    <Trash2 />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}