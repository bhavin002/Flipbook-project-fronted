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

    // Set default values when privacy policy is enabled
    const handlePrivacyPolicyChange = (checked) => {
        clearErrors("settings.companyName");
        clearErrors("settings.privacyPolicyLink");
        form.setValue("settings.addPrivacyPolicy", checked);
        if (checked) {
            form.setValue("settings.companyName", "FlipDrag");
            form.setValue("settings.privacyPolicyLink", "https://legal.flipsnack.com/privacy-policy");
        }
    };

    // Set default value when GDPR compliance is enabled
    const handleGDPRComplianceChange = (checked) => {
        clearErrors("settings.gdprMessage");
        form.setValue("settings.addGDPRCompliance", checked);
        if (checked) {
            form.setValue("settings.gdprMessage", "By clicking on the button below, you agree to our Privacy Policy and Terms of Service.");
        }
    };

    return (
        <>
            <div className="px-1 py-2">
                <div className="space-y-2">
                    <div>
                        <Label htmlFor="question-tooltip">Button</Label>
                        <p className="text-sm text-gray-500">
                            Customise the button of the pop-up. You can see the changes in preview mode.
                        </p>
                    </div>
                    <div>
                        <Label htmlFor="button-label" className={`text-xs ${errors.settings?.buttonLabel ? "text-red-500" : ""}`}>
                            Button label <span>*</span>
                        </Label>
                        <Input
                            type="text"
                            id="button-label"
                            {...form.register("settings.buttonLabel")}
                            placeholder="Submit"
                            className={errors.settings?.buttonLabel ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                        />
                        {errors.settings?.buttonLabel && <p className="text-red-500 text-xs">{errors.settings.buttonLabel.message}</p>}
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
                        <Label htmlFor="message-text" className={`text-xs ${errors.settings?.thankYouMessage ? "text-red-500" : ""}`}>
                            Message text <span>*</span>
                        </Label>
                        <Textarea
                            type="text"
                            id="message-text"
                            {...form.register("settings.thankYouMessage")}
                            placeholder="Your response has been submitted."
                            rows={4}
                            className={`resize-none ${errors.settings?.thankYouMessage ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}`}
                        />
                        {errors.settings?.thankYouMessage && <p className="text-red-500 text-xs">{errors.settings.thankYouMessage.message}</p>}
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
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
                            onCheckedChange={handlePrivacyPolicyChange}
                        />
                    </div>
                    {form.watch("settings.addPrivacyPolicy") && (
                        <>
                            <div>
                                <Label htmlFor="company-name" className={`text-xs ${errors.settings?.companyName ? "text-red-500" : ""}`}>
                                    Company name <span>*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="company-name"
                                    {...form.register("settings.companyName")}
                                    placeholder="FlipDrag"
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
                                    placeholder="https://legal.flipsnack.com/privacy-policy"
                                    className={errors.settings?.privacyPolicyLink ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                                />
                                {errors.settings?.privacyPolicyLink && <p className="text-red-500 text-xs">{errors.settings.privacyPolicyLink.message}</p>}
                            </div>
                        </>
                    )}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
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
                            onCheckedChange={handleGDPRComplianceChange}
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
                                placeholder="By clicking on the button below, you agree to our Privacy Policy and Terms of Service."
                                className={errors.settings?.gdprMessage ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                            />
                            {errors.settings?.gdprMessage && <p className="text-red-500 text-xs">{errors.settings.gdprMessage.message}</p>}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}