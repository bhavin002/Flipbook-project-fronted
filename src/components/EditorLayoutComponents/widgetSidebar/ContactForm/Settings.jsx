import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function Settings({ form, clearErrors }) {
    const { formState: { errors } } = form;

    return (
        <>
            <div className="px-1 py-2">
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
                            checked={form.watch("settings.collectEmail")}
                            onCheckedChange={(checked) => {
                                form.setValue("settings.collectEmail", checked);
                                if (!checked) {
                                    form.setValue("settings.addPrivacyPolicy", false);
                                    form.setValue("settings.addGDPRCompliance", false);
                                }
                            }}
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
                                    checked={form.watch("settings.addPrivacyPolicy")}
                                    onCheckedChange={(checked) => {
                                        form.setValue("settings.addPrivacyPolicy", checked);
                                        if (!checked) {
                                            form.setValue("settings.privacyPolicyLink", "");
                                        }
                                    }}
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
                                            placeholder="E.g. Flipnova"
                                            className={errors.settings?.companyName ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                                        />
                                        {errors.settings?.companyName && <p className="text-red-500 text-xs">{errors.settings.companyName.message}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="privacy-policy" className={`text-xs ${errors.settings?.privacyPolicyLink ? "text-red-500" : ""}`}>
                                            Privacy Policy link <span>*</span>
                                        </Label>
                                        <Input
                                            type="text"
                                            id="privacy-policy"
                                            {...form.register("settings.privacyPolicyLink")}
                                            placeholder="E.g. www.flipsnack.com"
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
                                    checked={form.watch("settings.addGDPRCompliance")}
                                    onCheckedChange={(checked) => {
                                        form.setValue("settings.addGDPRCompliance", checked);
                                        if (!checked) {
                                            form.setValue("settings.gdprMessage", "");
                                        }
                                    }}
                                />
                            </div>
                            {form.watch("settings.addGDPRCompliance") && (
                                <div>
                                    <Label htmlFor="gdpr-message" className={`text-xs ${errors.settings?.gdprMessage ? "text-red-500" : ""}`}>
                                        Formulate message <span>*</span>
                                    </Label>
                                    <Input
                                        type="text"
                                        id="gdpr-message"
                                        {...form.register("settings.gdprMessage")}
                                        placeholder="I agree to receive marketing materials."
                                        className={errors.settings?.gdprMessage ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                                    />
                                    {errors.settings?.gdprMessage && <p className="text-red-500 text-xs">{errors.settings.gdprMessage.message}</p>}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}