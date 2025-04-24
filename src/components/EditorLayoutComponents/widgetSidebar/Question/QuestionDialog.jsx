import { Info, Pencil, ShoppingCart } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function QuestionDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full text-black hover:text-primary">
                    <Pencil /> Edit question
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[640px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Question settings</DialogTitle>
                    <DialogDescription className="sr-only">
                        Description
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[calc(100vh-150px)] overflow-y-auto px-1 py-2">
                    <div>
                        <Label htmlFor="question-tooltip" className="text-xs">
                            Tooltip
                        </Label>
                        <Input
                            type="text"
                            id="question-tooltip"
                            defaultValue="Click to answer question"
                            placeholder="Click to answer question"
                        />
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-2">
                        <div>
                            <Label htmlFor="question-tooltip" >
                                Button
                            </Label>
                            <p className="text-sm text-gray-500">
                                Customise the button of the pop-up. You can see the changes in preview mode.
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="button-label" className="text-xs">
                                Button label
                            </Label>
                            <Input
                                type="text"
                                id="button-label"
                                defaultValue="Submit"
                                placeholder="Submit"
                            />
                        </div>

                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-2">
                        <div>
                            <Label htmlFor="question-tooltip" >
                                Thank you message
                            </Label>
                            <p className="text-sm text-gray-500">
                                Customise the message your readers see after they submit their response.
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="message-text" className="text-xs">
                                Message text <span>*</span>
                            </Label>
                            <Textarea
                                type="text"
                                id="message-text"
                                defaultValue="Your response has been submitted."
                                placeholder="Your response has been submitted."
                                rows={4}
                                className="resize-none"
                            />
                        </div>
                    </div>
                    <div className="my-4">
                        <div className="flex justify-between">
                            <Label htmlFor="question-tooltip" >
                                Collect email address
                            </Label>
                            <Switch
                            />
                        </div>
                        <p className="text-sm text-gray-500">
                            Respondents must complete their email address In order to submit answers.
                        </p>
                    </div>
                    <div className="my-6 space-y-2">
                        <div className="flex justify-between">
                            <div className='flex gap-2 items-center'>
                                <Label htmlFor="min-max-quantity" className="text-gray-700">
                                    Add privacy policy
                                </Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Info className="h-4 w-4 cursor-pointer" />
                                        </TooltipTrigger>
                                        <TooltipContent
                                            side="right"
                                            align="center"
                                            className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
                                        >
                                            <p className="text-sm">Having in mind applicable privacy laws and regulation, we recommend adding your privacy and policy link when collecting personal information.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Switch
                            />
                        </div>
                        <div>
                            <Label htmlFor="company-name" className="text-xs">Company name</Label>
                            <Input type="text" id="company-name" defaultValue="Flipnova" placeholder="E.g. Flipnova" />
                        </div>
                        <div>
                            <Label htmlFor="privacy-policy" className="text-xs">Privacy Policy link</Label>
                            <Input type="text" id="privacy-policy" defaultValue="https://legal.flipnova.com/privacy-policy" placeholder="E.g. www.flipsnack.com" />
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="my-6 space-y-2">
                        <div className="flex justify-between">
                            <div className='flex gap-2 items-center'>
                                <Label htmlFor="min-max-quantity" className="text-gray-700">
                                    Add GDPR compliance check
                                </Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Info className="h-4 w-4 cursor-pointer" />
                                        </TooltipTrigger>
                                        <TooltipContent
                                            side="right"
                                            align="center"
                                            className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
                                        >
                                            <p className="text-sm">Follow GDPR rules and make sure your readers consent to using their information.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Switch
                            />
                        </div>
                        <div>
                            <Label htmlFor="company-name" className="text-xs">Formulate message</Label>
                            <Input type="text" id="company-name" defaultValue="I agree to receive marketing materials." placeholder="I agree to receive marketing materials." />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline">
                        Cancle
                    </Button>
                    <Button>
                        Save product
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}