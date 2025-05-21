import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function QuizSettings({ form }) {
    const { formState: { errors } } = form;

    return (
        <>
            <div className="flex items-center gap-2 my-6">
                <Checkbox
                    id="show-correct-answer"
                    {...form.register("settings.isShowCorrectAnswer")}
                />
                <div className='flex gap-2 items-center'>
                    <Label htmlFor="show-correct-answer" className="text-sm font-medium leading-none">
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
                <Label htmlFor="question-tooltip" className={`text-xs ${errors.settings?.tooltip ? "text-red-500" : ""}`}>
                    Tooltip
                </Label>
                <Input
                    type="text"
                    id="question-tooltip"
                    {...form.register("settings.tooltip")}
                    placeholder="Click to answer question"
                    className={errors.settings?.tooltip ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                />
                {errors.settings?.tooltip && <p className="text-red-500 text-xs">{errors.settings.tooltip.message}</p>}
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
                <div>
                    <Label>
                        Quiz name
                    </Label>
                    <p className="text-sm text-gray-500">
                        This name won't be visible in the flipbook, but it will help you find the quiz in the statistics.
                    </p>
                </div>
                <div>
                    <Label htmlFor="button-name" className={`text-xs ${errors.settings?.quizName ? "text-red-500" : ""}`}>
                        Name <span>*</span>
                    </Label>
                    <Input
                        type="text"
                        id="button-name"
                        {...form.register("settings.quizName")}
                        placeholder="Untitled quiz"
                        className={errors.settings?.quizName ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                    />
                    {errors.settings?.quizName && <p className="text-red-500 text-xs">{errors.settings.quizName.message}</p>}
                </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
                <div>
                    <Label>
                        Quiz button
                    </Label>
                    <p className="text-sm text-gray-500">
                        Customise the button of the pop-up. You can see the changes in preview mode.
                    </p>
                </div>
                <div>
                    <Label htmlFor="button-label" className={`text-xs ${errors.settings?.quizButtonLabel ? "text-red-500" : ""}`}>
                        Button label <span>*</span>
                    </Label>
                    <Input
                        type="text"
                        id="button-label"
                        {...form.register("settings.quizButtonLabel")}
                        placeholder="Submit"
                        className={errors.settings?.quizButtonLabel ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                    />
                    {errors.settings?.quizButtonLabel && <p className="text-red-500 text-xs">{errors.settings.quizButtonLabel.message}</p>}
                </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
                <div>
                    <Label>
                        Thank you message
                    </Label>
                    <p className="text-sm text-gray-500">
                        Customize the message your readers see after completing the quiz.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Switch
                        {...form.register("settings.useDifferentMessages")}
                        checked={form.watch("settings.useDifferentMessages")}
                        onCheckedChange={(checked) => form.setValue("settings.useDifferentMessages", checked)}
                    />
                    <Label htmlFor="question-tooltip" className="text-gray-500">
                        Use different messages for passed and failed quizzes
                    </Label>
                </div>
                {form.watch("settings.useDifferentMessages") ? (
                    <>
                        <div>
                            <Label htmlFor="passed-quiz-message" className={`text-xs ${errors.settings?.passedQuizMessage ? "text-red-500" : ""}`}>
                                Message for passed quiz <span>*</span>
                            </Label>
                            <Textarea
                                type="text"
                                id="passed-quiz-message"
                                {...form.register("settings.passedQuizMessage")}
                                placeholder="Your response has been submitted."
                                rows={4}
                                className={`resize-none ${errors.settings?.passedQuizMessage ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}`}
                            />
                            {errors.settings?.passedQuizMessage && <p className="text-red-500 text-xs">{errors.settings.passedQuizMessage.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="failed-quiz-message" className={`text-xs ${errors.settings?.failedQuizMessage ? "text-red-500" : ""}`}>
                                Message for failed quiz <span>*</span>
                            </Label>
                            <Textarea
                                type="text"
                                id="failed-quiz-message"
                                {...form.register("settings.failedQuizMessage")}
                                placeholder="Your response has been submitted."
                                rows={4}
                                className={`resize-none ${errors.settings?.failedQuizMessage ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}`}
                            />
                            {errors.settings?.failedQuizMessage && <p className="text-red-500 text-xs">{errors.settings.failedQuizMessage.message}</p>}
                        </div>
                    </>
                ) : (
                    <div>
                        <Label htmlFor="message-text" className={`text-xs ${errors.settings?.messageText ? "text-red-500" : ""}`}>
                            Message text <span>*</span>
                        </Label>
                        <Textarea
                            type="text"
                            id="message-text"
                            {...form.register("settings.messageText")}
                            placeholder="Your response has been submitted."
                            rows={4}
                            className={`resize-none ${errors.settings?.messageText ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}`}
                        />
                        {errors.settings?.messageText && <p className="text-red-500 text-xs">{errors.settings.messageText.message}</p>}
                    </div>
                )}
            </div>
            <Separator className="my-4" />
            <div className="flex items-center gap-2 my-6">
                <Checkbox
                    id="allow-retake-quiz"
                    {...form.register("settings.allowRetake")}
                />
                <div className='flex gap-2 items-center'>
                    <Label htmlFor="allow-retake-quiz" className="text-sm font-medium leading-none">
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
            <div className="my-4">
                <div className="flex justify-between">
                    <Label htmlFor="collect-email">Collect email address</Label>
                    <Switch
                        id="collect-email"
                        {...form.register("settings.collectEmail")}
                        checked={form.watch("settings.collectEmail")}
                        onCheckedChange={(checked) => form.setValue("settings.collectEmail", checked)}
                    />
                </div>
                <p className="text-sm text-gray-500">
                    Respondents must complete their email address in order to submit answers.
                </p>
            </div>

            {form.watch("settings.collectEmail") && (
                <>
                    <div className="my-6 space-y-2">
                        <div className="flex justify-between">
                            <div className="flex gap-2 items-center">
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
                                            <p className="text-sm">
                                                Having in mind applicable privacy laws and regulation, we recommend
                                                adding your privacy and policy link when collecting personal information.
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Switch
                                {...form.register("settings.addPrivacyPolicy")}
                                checked={form.watch("settings.addPrivacyPolicy")}
                                onCheckedChange={(checked) => form.setValue("settings.addPrivacyPolicy", checked)}
                            />
                        </div>
                        {form.watch("settings.addPrivacyPolicy") && (
                            <>
                                <div>
                                    <Label htmlFor="company-name" className={`text-xs ${errors.settings?.companyName ? "text-red-500" : ""}`}>
                                        Company name
                                    </Label>
                                    <Input
                                        type="text"
                                        id="company-name"
                                        {...form.register("settings.companyName")}
                                        placeholder="Flipnova"
                                        className={errors.settings?.companyName ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                                    />
                                    {errors.settings?.companyName && <p className="text-red-500 text-xs">{errors.settings.companyName.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="privacy-policy" className={`text-xs ${errors.settings?.privacyPolicyLink ? "text-red-500" : ""}`}>
                                        Privacy Policy link
                                    </Label>
                                    <Input
                                        type="text"
                                        id="privacy-policy"
                                        {...form.register("settings.privacyPolicyLink")}
                                        placeholder="https://legal.flipsnack.com/privacy-policy"
                                        className={errors.settings?.privacyPolicyLink ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                                    />
                                    {errors.settings?.privacyPolicyLink && <p className="text-red-500 text-xs">{errors.settings.privacyPolicyLink.message}</p>}
                                </div>
                            </>
                        )}
                    </div>
                    <Separator className="my-4" />
                    <div className="my-6 space-y-2">
                        <div className="flex justify-between">
                            <div className="flex gap-2 items-center">
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
                                            <p className="text-sm">
                                                Follow GDPR rules and make sure your readers consent to using their
                                                information.
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Switch
                                {...form.register("settings.addGDPRCompliance")}
                                checked={form.watch("settings.addGDPRCompliance")}
                                onCheckedChange={(checked) => form.setValue("settings.addGDPRCompliance", checked)}
                            />
                        </div>
                        {form.watch("settings.addGDPRCompliance") && (
                            <div>
                                <Label htmlFor="gdpr-message" className={`text-xs ${errors.settings?.gdprMessage ? "text-red-500" : ""}`}>
                                    Formulate message
                                </Label>
                                <Input
                                    type="text"
                                    id="gdpr-message"
                                    {...form.register("settings.gdprMessage")}
                                    placeholder="By clicking on the button below, you agree to our Privacy Policy and Terms of Service."
                                    className={errors.settings?.gdprMessage ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                                />
                                {errors.settings?.gdprMessage && <p className="text-red-500 text-xs">{errors.settings.gdprMessage.message}</p>}
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
}