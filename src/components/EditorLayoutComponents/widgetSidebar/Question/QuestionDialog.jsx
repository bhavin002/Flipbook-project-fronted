import { useState } from "react";
import { Info, Pencil } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogDescription,
    DialogHeader,
    DialogTitle,
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
} from "@/components/ui/tooltip";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionSchema } from "./question.schema";
import { createQuestionFormApi, getQuestionFormApi, updateQuestionFormApi } from "@/service/question.service";
import { toast } from "sonner";
import LoadingButton from "@/utils/LoadingButton";
import { addIntercationDataToMainStage } from "@/utils/Helper";

export default function QuestionDialog({ selectedShape, mainStage, setMainStage, selectedIndex }) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const variantId = selectedShape[0]?.attrs?.htmlData?.variantId || null;

    const form = useForm({
        resolver: zodResolver(questionSchema),
        defaultValues: {
            question: "Add your question here...",
            tooltip: "Click to answer question",
            buttonLabel: "Submit",
            thankYouMessage: "Your response has been submitted.",
            collectEmailAddress: false,
            addPrivacyPolicy: false,
            companyName: "",
            privacyPolicyLink: "",
            addGDPRCompliance: false,
            formulateMessage: ""
        }
    });

    const { formState: { errors } , clearErrors } = form;

    const fetchQuestionForm = async () => {
        if (!variantId) {
            setOpen(true);
            return;
        }

        try {
            setIsFetching(true);
            const response = await getQuestionFormApi(variantId);
            form.reset(response.data);
            setOpen(true);
        } catch (error) {
            toast.error("Failed to fetch question form", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsFetching(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            let response;

            if (variantId) {
                response = await updateQuestionFormApi(variantId, data);
            } else {
                response = await createQuestionFormApi(data);
            }

            console.log("response.data ??", response.data)

            const output = {
                data: {
                    variantId: response.data.questionForm._id
                }
            };

            addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
            setOpen(false);
        } catch (error) {
            toast.error("Failed to save question form", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Handle collect email address change
    const handleCollectEmailChange = (checked) => {
        form.setValue("collectEmailAddress", checked);
        if (!checked) {
            form.setValue("addPrivacyPolicy", false);
            form.setValue("addGDPRCompliance", false);
        }
    };

    // Set default values when privacy policy is enabled
    const handlePrivacyPolicyChange = (checked) => {
        clearErrors("companyName");
        clearErrors("privacyPolicyLink");
        form.setValue("addPrivacyPolicy", checked);
        if (checked) {
            form.setValue("companyName", "Flipnova");
            form.setValue("privacyPolicyLink", "https://legal.flipnova.com/privacy-policy");
        }
    };

    // Set default value when GDPR compliance is enabled
    const handleGDPRComplianceChange = (checked) => {
        clearErrors("formulateMessage");
        form.setValue("addGDPRCompliance", checked);
        if (checked) {
            form.setValue("formulateMessage", "I agree to receive marketing materials.");
        }
    };

    return (
        <>
            <Button variant="outline" className="w-full text-black hover:text-primary" onClick={fetchQuestionForm} disabled={isFetching}>
                {
                    isFetching ? <LoadingButton isLoading={isFetching} /> : <> <Pencil /> Edit form </>
                }
            </Button>
            {
                open && (<Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[640px] w-[90vw]">
                        <DialogHeader>
                            <DialogTitle>Question settings</DialogTitle>
                            <DialogDescription className="sr-only">
                                Description
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="lg:max-h-[calc(100vh-150px)] max-lg:max-h-[calc(100vh-300px)] overflow-y-auto px-1 py-2">
                                <div>
                                    <Label htmlFor="question-tooltip" className={`text-xs ${errors.tooltip ? "text-red-500" : ""}`}>
                                        Tooltip
                                    </Label>
                                    <Input
                                        type="text"
                                        id="question-tooltip"
                                        {...form.register("tooltip")}
                                        placeholder="Click to answer question"
                                        className={errors.tooltip ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                                    />
                                    {errors.tooltip && <p className="text-red-500 text-xs">{errors.tooltip.message}</p>}
                                </div>
                                <Separator className="my-4" />
                                <div className="space-y-2">
                                    <div>
                                        <Label htmlFor="question-tooltip">Button</Label>
                                        <p className="text-sm text-gray-500">
                                            Customise the button of the pop-up. You can see the changes in preview mode.
                                        </p>
                                    </div>
                                    <div>
                                        <Label htmlFor="button-label" className={`text-xs ${errors.buttonLabel ? "text-red-500" : ""}`}>
                                            Button label <span>*</span>
                                        </Label>
                                        <Input
                                            type="text"
                                            id="button-label"
                                            {...form.register("buttonLabel")}
                                            placeholder="Submit"
                                            className={errors.buttonLabel ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                                        />
                                        {errors.buttonLabel && <p className="text-red-500 text-xs">{errors.buttonLabel.message}</p>}
                                    </div>
                                </div>
                                <Separator className="my-4" />
                                <div className="space-y-2">
                                    <div>
                                        <Label htmlFor="question-tooltip">Thank you message</Label>
                                        <p className="text-sm text-gray-500">
                                            Customise the message your readers see after they submit their response.
                                        </p>
                                    </div>
                                    <div>
                                        <Label htmlFor="message-text" className={`text-xs ${errors.thankYouMessage ? "text-red-500" : ""}`}>
                                            Message text <span>*</span>
                                        </Label>
                                        <Textarea
                                            type="text"
                                            id="message-text"
                                            {...form.register("thankYouMessage")}
                                            placeholder="Your response has been submitted."
                                            rows={4}
                                            className={`resize-none ${errors.thankYouMessage ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}`}
                                        />
                                        {errors.thankYouMessage && <p className="text-red-500 text-xs">{errors.thankYouMessage.message}</p>}
                                    </div>
                                </div>
                                <div className="my-4">
                                    <div className="flex justify-between">
                                        <Label htmlFor="collect-email">Collect email address</Label>
                                        <Switch
                                            id="collect-email"
                                            checked={form.watch("collectEmailAddress")}
                                            onCheckedChange={handleCollectEmailChange}
                                        />
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Respondents must complete their email address in order to submit answers.
                                    </p>
                                </div>

                                {form.watch("collectEmailAddress") && (
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
                                                    checked={form.watch("addPrivacyPolicy")}
                                                    onCheckedChange={handlePrivacyPolicyChange}
                                                />
                                            </div>
                                            {form.watch("addPrivacyPolicy") && (
                                                <>
                                                    <div>
                                                        <Label htmlFor="company-name" className={`text-xs ${errors.companyName ? "text-red-500" : ""}`}>
                                                            Company name <span>*</span>
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            id="company-name"
                                                            {...form.register("companyName")}
                                                            placeholder="Flipnova"
                                                            className={errors.companyName ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                                                        />
                                                        {errors.companyName && <p className="text-red-500 text-xs">{errors.companyName.message}</p>}
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="privacy-policy" className={`text-xs ${errors.privacyPolicyLink ? "text-red-500" : ""}`}>
                                                            Privacy Policy link <span>*</span>
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            id="privacy-policy"
                                                            {...form.register("privacyPolicyLink")}
                                                            placeholder="https://legal.flipnova.com/privacy-policy"
                                                            className={errors.privacyPolicyLink ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                                                        />
                                                        {errors.privacyPolicyLink && <p className="text-red-500 text-xs">{errors.privacyPolicyLink.message}</p>}
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
                                                    checked={form.watch("addGDPRCompliance")}
                                                    onCheckedChange={handleGDPRComplianceChange}
                                                />
                                            </div>
                                            {form.watch("addGDPRCompliance") && (
                                                <div>
                                                    <Label htmlFor="gdpr-message" className={`text-xs ${errors.formulateMessage ? "text-red-500" : ""}`}>
                                                        Formulate message <span>*</span>
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        id="gdpr-message"
                                                        {...form.register("formulateMessage")}
                                                        placeholder="I agree to receive marketing materials."
                                                        className={errors.formulateMessage ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                                                    />
                                                    {errors.formulateMessage && <p className="text-red-500 text-xs">{errors.formulateMessage.message}</p>}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                            <DialogFooter>
                                <Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button>
                                <Button type="submit" disabled={isLoading}>
                                    {
                                        isLoading ? <LoadingButton isLoading={isLoading} /> : "Save question"
                                    }
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>)
            }
        </>
    );
}