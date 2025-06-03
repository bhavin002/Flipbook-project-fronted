import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import DynamicForm from "./LeadForm/DynamicForm";
import { useState, useEffect, useCallback } from "react";
import { useFlipbookPreviewSettings } from "@/hooks/useFlipbookPreviewSettings";
import { UpdateFlipbookPreviewSettingApi } from "@/service/flipbookPreviewSetting.service";
import { toast } from "sonner";
import { z } from "zod";

const urlSchema = z.string().url();

export default function LeadForm({ flipbookId, settings }) {
    const { isFieldEnabled } = useFlipbookPreviewSettings();
    const [isLeadFormActivated, setIsLeadFormActivated] = useState(false);
    const [leadFormState, setLeadFormState] = useState({
        title: "",
        submitButtonText: "Submit",
        setOnPage: 1,
        companyName: "",
        privacyPolicyLink: "",
        gdprMessage: "",
        skipButtonText: "",
        fields: [],
        addPrivacyPolicy: false,
        gdprCompliancyCheck: false,
        allowSkip: false,
    });

    const isValidUrl = (url) => {
        try {
            const urlToValidate = url.startsWith('http') ? url : `https://${url}`;
            urlSchema.parse(urlToValidate);
            return true;
        } catch {
            return false;
        }
    };

    const formatUrl = (url) => {
        if (!url) return "";
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        return `https://${url}`;
    };

    // Helper function to map fields for API payload
    const mapFieldsForPayload = (fields) => {
        return fields.map((f) => ({
            type: f.type,
            label: f.name,
            required: f.required,
            options: f.options,
            _id: f.id,
        }));
    };

    // Helper function to create complete leadForm payload
    const createLeadFormPayload = (updatedState = leadFormState) => {
        return {
            ...updatedState,
            fields: mapFieldsForPayload(updatedState.fields),
        };
    };

    useEffect(() => {
        if (settings && settings.leadForm) {
            setIsLeadFormActivated(settings.isLeadForm || false);
            setLeadFormState({
                title: settings.leadForm.title || "",
                submitButtonText: settings.leadForm.submitButtonText || "Submit",
                setOnPage: settings.leadForm.setOnPage || 1,
                companyName: settings.leadForm.companyName || "",
                privacyPolicyLink: settings.leadForm.privacyPolicyLink || "",
                gdprMessage: settings.leadForm.gdprMessage || "",
                skipButtonText: settings.leadForm.skipButtonText || "",
                addPrivacyPolicy: settings.leadForm.addPrivacyPolicy || false,
                gdprCompliancyCheck: settings.leadForm.gdprCompliancyCheck || false,
                allowSkip: settings.leadForm.allowSkip || false,
                fields: settings.leadForm.fields.map((field) => ({
                    id: field._id || `field-${Date.now()}`,
                    name: field.label,
                    type: field.type,
                    required: !!field.required,
                    options: field.options || [],
                })),
            });
        }
    }, [settings]);

    const handleUpdate = useCallback(async (payload) => {
        try {
            const formData = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
                if (key === "leadForm") {
                    const leadFormData = {
                        ...value,
                        fields: value.fields.map((field) => ({
                            ...field,
                            _id: undefined,
                        })),
                    };
                    formData.append(key, JSON.stringify(leadFormData));
                } else {
                    formData.append(key, value);
                }
            });
            await UpdateFlipbookPreviewSettingApi(flipbookId, formData);
        } catch (error) {
            toast.error("Failed to update lead form", { description: error.message });
        }
    }, [flipbookId]);

    const handleLeadFormToggle = () => {
        setIsLeadFormActivated((prev) => {
            const newState = !prev;
            handleUpdate({ isLeadForm: newState });
            return newState;
        });
    };

    const updateLeadFormState = (updates) => {
        setLeadFormState((prevState) => {
            const newState = { ...prevState, ...updates };
            handleUpdate({
                leadForm: createLeadFormPayload(newState),
            });
            return newState;
        });
    };

    const handleFieldChange = (field, value) => {
        updateLeadFormState({ [field]: value });
    };

    const handlePrivacyPolicyToggle = () => {
        const newPrivacyPolicyState = !leadFormState.addPrivacyPolicy;
        const updates = {
            addPrivacyPolicy: newPrivacyPolicyState,
        };

        if (newPrivacyPolicyState) {
            updates.companyName = leadFormState.companyName || "Your Company";
            updates.privacyPolicyLink = leadFormState.privacyPolicyLink || "https://example.com/privacy-policy";
        }

        updateLeadFormState(updates);
    };

    const handleGDPRToggle = () => {
        const newGDPRState = !leadFormState.gdprCompliancyCheck;
        const updates = {
            gdprCompliancyCheck: newGDPRState,
        };

        if (newGDPRState) {
            updates.gdprMessage = leadFormState.gdprMessage || "I agree to receive marketing materials.";
        }

        updateLeadFormState(updates);
    };

    const handleAllowSkipToggle = () => {
        const newAllowSkipState = !leadFormState.allowSkip;
        const updates = {
            allowSkip: newAllowSkipState,
        };

        if (newAllowSkipState) {
            updates.skipButtonText = leadFormState.skipButtonText || "Maybe Later";
        }

        updateLeadFormState(updates);
    };

    const handleDynamicFormChange = (newFields) => {
        updateLeadFormState({ fields: newFields });
    };

    const handlePrivacyPolicyLinkChange = (e) => {
        const value = e.target.value;
        setLeadFormState(prev => ({ ...prev, privacyPolicyLink: value }));

        if (value && isValidUrl(value)) {
            const formattedUrl = formatUrl(value);
            const updatedState = { ...leadFormState, privacyPolicyLink: formattedUrl };
            handleUpdate({
                leadForm: createLeadFormPayload(updatedState),
            });
            if (formattedUrl !== value) {
                setLeadFormState(prev => ({ ...prev, privacyPolicyLink: formattedUrl }));
            }
        }
    };

    const handlePrivacyPolicyLinkBlur = (e) => {
        const value = e.target.value;
        if (value && !value.startsWith('http')) {
            const formattedUrl = formatUrl(value);
            const updatedState = { ...leadFormState, privacyPolicyLink: formattedUrl };
            setLeadFormState(prev => ({ ...prev, privacyPolicyLink: formattedUrl }));
            
            if (isValidUrl(formattedUrl)) {
                handleUpdate({
                    leadForm: createLeadFormPayload(updatedState),
                });
            }
        } else if (value && isValidUrl(value)) {
            const formattedUrl = formatUrl(value);
            const updatedState = { ...leadFormState, privacyPolicyLink: formattedUrl };
            handleUpdate({
                leadForm: createLeadFormPayload(updatedState),
            });
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
                <Checkbox
                    id="lead-form"
                    checked={isLeadFormActivated}
                    onCheckedChange={handleLeadFormToggle}
                    className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary"
                    disabled={!isFieldEnabled("isLeadForm")}
                />
                <Label htmlFor="lead-form" className="text-sm font-medium">
                    Add lead capture form
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
                            <p className="text-sm">Collect email leads by adding a lead form in your flipbook.</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            {isLeadFormActivated && (
                <div className={`space-y-4 ${!isFieldEnabled("leadForm") ? "pointer-events-none opacity-50" : ""}`}>
                    <div className="flex flex-col gap-2 text-white">
                        <Label htmlFor="title">Title</Label>
                        <Textarea
                            id="title"
                            placeholder="Fill out this form to keep reading"
                            value={leadFormState.title}
                            onChange={(e) => handleFieldChange("title", e.target.value)}
                            className="resize-none placeholder:text-[#d8dce3]"
                        />
                    </div>
                    <div className="flex flex-col gap-2 text-white">
                        <Label htmlFor="submit-button-text">Submit button text</Label>
                        <Input
                            type="text"
                            id="submit-button-text"
                            value={leadFormState.submitButtonText}
                            onChange={(e) => handleFieldChange("submitButtonText", e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 text-white">
                        <Label htmlFor="set-on-page">Set on page</Label>
                        <Input
                            type="number"
                            id="set-on-page"
                            value={leadFormState.setOnPage}
                            onChange={(e) => handleFieldChange("setOnPage", Number(e.target.value))}
                            min={1}
                        />
                    </div>
                    <div className="flex flex-col gap-4 text-white">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="fields">Fields</Label>
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
                                        <p className="text-sm">Customize your lead form with up to 9 custom fields.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <DynamicForm
                            fields={leadFormState.fields}
                            onChange={handleDynamicFormChange}
                            disabled={!isFieldEnabled("leadForm")}
                        />
                    </div>
                    <div className="flex items-center gap-2 text-white">
                        <Checkbox
                            id="policy"
                            checked={leadFormState.addPrivacyPolicy}
                            onCheckedChange={handlePrivacyPolicyToggle}
                            className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary"
                            disabled={!isFieldEnabled("leadForm")}
                        />
                        <Label htmlFor="policy" className="text-sm font-medium">
                            Add a Privacy Policy link
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
                                        Adding a Privacy Policy link ensures that your users can check how you collect and use their data before submitting personal information. We recommend adding a privacy policy link.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    {leadFormState.addPrivacyPolicy && (
                        <>
                            <div className="flex flex-col gap-2 text-white">
                                <Label htmlFor="company-name">Company name</Label>
                                <Input
                                    type="text"
                                    id="company-name"
                                    placeholder="Your company"
                                    value={leadFormState.companyName}
                                    onChange={(e) => handleFieldChange("companyName", e.target.value)}
                                    className="placeholder:text-[#d8dce3]"
                                />
                            </div>
                            <div className="flex flex-col gap-2 text-white">
                                <Label htmlFor="privacy-policy">Privacy Policy link</Label>
                                <Input
                                    type="text"
                                    id="privacy-policy"
                                    placeholder="Add your own Privacy Policy link"
                                    value={leadFormState.privacyPolicyLink}
                                    onChange={handlePrivacyPolicyLinkChange}
                                    onBlur={handlePrivacyPolicyLinkBlur}
                                    className={`placeholder:text-[#d8dce3] ${leadFormState.privacyPolicyLink && !isValidUrl(leadFormState.privacyPolicyLink) ? 'border-red-500' : ''}`}
                                />
                            </div>
                        </>
                    )}
                    <div className="flex items-center gap-2 text-white">
                        <Checkbox
                            id="gdpr"
                            checked={leadFormState.gdprCompliancyCheck}
                            onCheckedChange={handleGDPRToggle}
                            className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary"
                            disabled={!isFieldEnabled("leadForm")}
                        />
                        <Label htmlFor="gdpr" className="text-sm font-medium">
                            Add GDPR compliancy check
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
                                        Follow GDPR rules and make sure your readers consent to using their information.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    {leadFormState.gdprCompliancyCheck && (
                        <div className="flex flex-col gap-2 text-white">
                            <Label htmlFor="formulate-message">Formulate message</Label>
                            <Input
                                type="text"
                                id="formulate-message"
                                placeholder="I agree to receive marketing materials."
                                value={leadFormState.gdprMessage}
                                onChange={(e) => handleFieldChange("gdprMessage", e.target.value)}
                                className="placeholder:text-[#d8dce3]"
                            />
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-white">
                        <Checkbox
                            id="allow-skip"
                            checked={leadFormState.allowSkip}
                            onCheckedChange={handleAllowSkipToggle}
                            className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary"
                            disabled={!isFieldEnabled("leadForm")}
                        />
                        <Label htmlFor="allow-skip" className="text-sm font-medium">
                            Allow users to skip it
                        </Label>
                    </div>
                    {leadFormState.allowSkip && (
                        <div className="flex flex-col gap-2 text-white">
                            <Label htmlFor="skip">Skip</Label>
                            <Input
                                type="text"
                                id="skip"
                                placeholder="Maybe Later"
                                value={leadFormState.skipButtonText}
                                onChange={(e) => handleFieldChange("skipButtonText", e.target.value)}
                                className="placeholder:text-[#d8dce3]"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}