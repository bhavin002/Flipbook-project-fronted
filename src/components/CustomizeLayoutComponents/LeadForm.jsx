import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import DynamicForm from "./LeadForm/DynamicForm";
import { useState } from "react";

export default function LeadForm() {
    const [addPrivacyPolicy, setAddPrivacyPolicy] = useState(true);
    const [addGDPR, setAddGDPR] = useState(true);
    const [allowSkip, setAllowSkip] = useState(true);

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Checkbox id="lead-form" />
                    <Label htmlFor="lead-form" className="text-sm font-medium">
                        Add lead capture form
                    </Label>
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
                                <p className="text-sm">
                                    Collect email leads by adding a lead form in your flipbook.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Textarea
                        id="title"
                        placeholder="Fill out this form to keep reading"
                        className="resize-none"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="submit-button-text">Submit button text</Label>
                    <Input type="text" id="submit-button-text" defaultValue="Submit" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="set-on-page">Set on page</Label>
                    <Input type="number" id="set-on-page" defaultValue={1} />
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="fields">Fields</Label>
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
                                    <p className="text-sm">
                                        Customize your lead form with up to 9 custom fields.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <DynamicForm />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="policy"
                        checked={addPrivacyPolicy}
                        onCheckedChange={() => setAddPrivacyPolicy(!addPrivacyPolicy)}
                    />
                    <Label htmlFor="policy" className="text-sm font-medium">
                        Add a Privacy Policy link
                    </Label>
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
                                <p className="text-sm">
                                    Adding a Privacy Policy link makes sure that your users can check how you collect their data and also how you use the data, before submitting their personal information.
                                    We recommend you add a privacy policy link.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                {
                    addPrivacyPolicy && (
                        <>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="company-name">Company name</Label>
                                <Input type="text" id="company-name" placeholder="Your company" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="privacy-policy">Privacy Policy link</Label>
                                <Input type="number" id="privacy-policy" placeholder="Add your own Privacy Policy link" />
                            </div>
                        </>
                    )
                }
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="gdpr"
                        checked={addGDPR}
                        onCheckedChange={() => setAddGDPR(!addGDPR)}
                    />
                    <Label htmlFor="gdpr" className="text-sm font-medium">
                        Add GDPR compliancy check
                    </Label>
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
                                <p className="text-sm">
                                    Follow GDPR rules and make sure your readers consent to using their information.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                {
                    addGDPR && (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="formulate-message">Formulate message</Label>
                            <Input type="text" id="formulate-message" placeholder="I agree to receive marketing materials." />
                        </div>
                    )
                }
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="allow-skip"
                        checked={allowSkip}
                        onCheckedChange={() => setAllowSkip(!allowSkip)}
                    />
                    <Label htmlFor="allow-skip" className="text-sm font-medium">
                        Allow users to skip it
                    </Label>
                </div>
                {
                    allowSkip && (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="skip">Skip</Label>
                            <Input type="text" id="skip" placeholder="I agree to receive marketing materials." />
                        </div>
                    )
                }

            </div>
        </>
    );
}