import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Info } from "lucide-react";
import { useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function QuizSettings() {
    const [useDifferentMessages, setUseDifferentMessages] = useState(false);
    return (
        <>
            <div className="flex items-center gap-2 my-6">
                <Checkbox
                    id="show-bg"
                />
                <div className='flex gap-2 items-center'>
                    <Label htmlFor="show-bg" className="text-sm font-medium leading-none">
                    Show correct answer
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
                                <p className="text-sm">Allow readers to view the correct answers after they completed the quiz.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            <Separator className="my-4" />
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
                    <Label >
                        Quiz name
                    </Label>
                    <p className="text-sm text-gray-500">
                        This name won't be visible in the flipbook, but it will help you find the quiz in the statistics.
                    </p>
                </div>
                <div>
                    <Label htmlFor="button-name" className="text-xs">
                        Name <span>*</span>
                    </Label>
                    <Input
                        type="text"
                        id="button-name"
                        defaultValue="Untitled quiz"
                        placeholder="Untitled quiz"
                    />
                </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
                <div>
                    <Label >
                        Quiz button
                    </Label>
                    <p className="text-sm text-gray-500">
                        Customise the button of the pop-up. You can see the changes in preview mode.                    </p>
                </div>
                <div>
                    <Label htmlFor="button-label" className="text-xs">
                        Button label <span>*</span>
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
            <div className="space-y-4">
                <div>
                    <Label >
                        Thank you message
                    </Label>
                    <p className="text-sm text-gray-500">
                        Customize the message your readers see after completing the quiz.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Switch
                        checked={useDifferentMessages}
                        onCheckedChange={setUseDifferentMessages}
                    />
                    <Label htmlFor="question-tooltip" className="text-gray-500">
                        Use different messages for passed and failed quizzes
                    </Label>
                </div>
                {
                    useDifferentMessages ? <div>
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
                    </div> : <>
                        <div>
                            <Label htmlFor="passed-quiz-message" className="text-xs">
                                Message for passed quiz <span>*</span>
                            </Label>
                            <Textarea
                                type="text"
                                id="passed-quiz-message"
                                defaultValue="Your response has been submitted."
                                placeholder="Your response has been submitted."
                                rows={4}
                                className="resize-none"
                            />
                        </div>
                        <div>
                            <Label htmlFor="failed-quiz-message" className="text-xs">
                                Message for failed quiz <span>*</span>
                            </Label>
                            <Textarea
                                type="text"
                                id="failed-quiz-message"
                                defaultValue="Your response has been submitted."
                                placeholder="Your response has been submitted."
                                rows={4}
                                className="resize-none"
                            />
                        </div>
                    </>
                }
            </div>
            <Separator className="my-4" />
            <div className="flex items-center gap-2 my-6">
                <Checkbox
                    id="show-bg"
                />
                <div className='flex gap-2 items-center'>
                    <Label htmlFor="show-bg" className="text-sm font-medium leading-none">
                        Allow retaking quiz
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
                                <p className="text-sm">Enable readers to retake the quiz and submit their answers multiple times.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            <Separator className="my-4" />
        </>

    )
}