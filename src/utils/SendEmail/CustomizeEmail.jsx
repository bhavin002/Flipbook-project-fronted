import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Trash2,
    Info,
    Loader2
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import MaskEmailInput from "@/utils/MaskEmailInput";
import { useEmailCustomization } from "@/context/EmailCustomizationContext";
import SelectLogoDialog from "@/components/AppLayoutComponents/Sidebar/Setting/Workspace/SelectLogoDialog";
import { SendEmailApi } from "@/service/email.service";
import { toast } from "sonner";
import LoadingButton from "../LoadingButton";
import { useMemo } from "react";

export default function CustomizeEmail({ flipbookId, thumbnail, component }) {
    const {
        emailData,
        updateEmailData,
        updateLogo,
        resetLogo,
        errors,
        clearErrors,
        isLoading,
        resetForm,
        setIsLoading,
        updateEmails,
        validateEmailData
    } = useEmailCustomization();

    const handleLogoSelect = (selectedLogo) => {
        updateLogo(selectedLogo.src);
    };

    const handleDeleteLogo = () => {
        resetLogo();
    };

    const href = component === "flipbook" ? `${import.meta.env.VITE_WEBSITE_URL}/public-flipbook/${flipbookId}` : `${import.meta.env.VITE_WEBSITE_URL}/public-bookshelf/${flipbookId}`;

    const isDefaultLogo = emailData.logo === "/assets/logo.png";

    const emailHtml = useMemo(() => {
        return `<table style='background-color: ${emailData.backgroundColor}; width: 100%;'><tbody><tr><td><table cellspacing='0' border='0' cellpadding='0' align='center' width='100%' style='background-color: ${emailData.backgroundColor}; border-collapse: collapse; border-spacing: 0px; max-width: 555px;'><tbody><tr><td align='center' style='background-color: ${emailData.backgroundColor}; border-collapse: collapse; font-family: Arial; font-size: 16px; line-height: 25px; padding: 20px 0px; text-align: center;'><img src='${emailData.logo}' alt='FlipDrag logo' border='0' style='vertical-align: middle;max-height:100px;max-width:200px'></td></tr><tr><td align='center' style='border-collapse: collapse; font-family: Arial; font-size: 16px; line-height: 25px; padding: 0px 20px; text-align: center;'><table cellspacing='0' border='0' cellpadding='0' style='border-collapse: collapse; border-radius: 10px; border-spacing: 0px; width: 100%; background-color: white;'><tbody><tr><td align='center' style='border-collapse: collapse; font-family: Arial; font-size: 16px; line-height: 25px; text-align: center;'><table cellpadding='0' cellspacing='0' border='0' width='100%' align='center' style='background-color: white; border-collapse: collapse; border-spacing: 0px; border-radius: 4px;'><tbody><tr><td align='center' style='border-radius: 4px 4px 0px 0px; font-family: Arial; font-size: 16px; line-height: 25px; padding: 30px 20px; text-align: center; background-color: ${emailData.accentColor};'><a href=${href} rel='noopener noreferrer' target='_blank'><img width='40%' alt='Flipbook cover' src=${thumbnail} style='border: none; display: block; margin: 0px auto; max-width: 100%;'></a></td></tr><tr><td align='center' style='border-collapse: collapse; font-family: Arial; font-size: 16px; line-height: 25px; padding: 30px 0px 0px; text-align: center;'><h1 style='color: ${emailData.accentColor}; font-size: 36px; font-weight: 300; letter-spacing: 0.02em; line-height: 40px; margin: 0px; padding: 0px; word-break: break-word;'>${emailData.title}</h1></td></tr><tr><td align='center' style='border-collapse: collapse; font-family: Arial; font-size: 16px; line-height: 25px; padding: 0px 20px 30px; text-align: center;'><p style='color: rgba(0, 0, 0, 0.87); font-size: 16px; font-weight: 300; letter-spacing: 0.02em; line-height: 26px; margin: 18px auto; max-width: 370px; text-align: center; width: 100%; word-break: break-word;'>${emailData.description}</p><a href=${href} rel='noopener noreferrer' target='_blank' style='border: none; display: block; text-align: center; width: 100%; text-decoration: none;'><div role='presentation' style='background-color: ${emailData.accentColor}; max-width: 370px; width: 100%; line-height: 40px; border-radius: 3px; color: ${emailData.backgroundColor}; font-size: 13px; text-align: center; margin: 18px auto;'>${emailData.label}</div></a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td align='center' style='border-collapse: collapse; font-family: Arial; font-size: 16px; line-height: 25px; padding: 20px; text-align: center;'><p style='color: rgb(182, 188, 200); font-size: 12px; font-weight: 300; letter-spacing: 0.02em; line-height: 20px; margin: 0px 0px 10px; text-align: center;'><span style='color: rgba(0, 0, 0, 0.87); font-size: 12px; font-weight: 300; letter-spacing: 0.02em; line-height: 20px; margin: 0px 0px 10px; text-align: center;'>${emailData.footerDescription}</span></p></td></tr></tbody></table></td></tr></tbody></table>`;
    }, [emailData, thumbnail]);


    const handleSendEmail = async () => {
        clearErrors();

        if (!validateEmailData()) {
            return;
        }

        try {
            setIsLoading(true);

            const payload = {
                emails: emailData.emails,
                htmlBody: emailHtml
            };

            const response = await SendEmailApi(payload);
            toast.success("Email sent successfully", {
                description: response.message
            });
            resetForm();
        } catch (error) {
            toast.error("Failed to send email", {
                description: error.message
            })
        } finally {
            setIsLoading(false);
        }
    };

    const hasErrors = Object.keys(errors).some(key => errors[key]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Customize your email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="space-y-2">
                    <Label>
                        Enter email addresses here
                    </Label>
                    <MaskEmailInput
                        value={emailData.emails}
                        onChange={(emails) => updateEmails(emails)}
                        error={errors.emails}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="subject">
                        Subject
                    </Label>
                    <Input
                        id="subject"
                        value={emailData.subject}
                        onChange={(e) => updateEmailData('subject', e.target.value)}
                        className={errors.subject ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label className="font-medium flex items-center gap-2">
                            Logo
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
                                        <p className="text-sm">Recommended: 5:1 ratio</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Label>
                        <Button
                            variant="outline"
                            onClick={handleDeleteLogo}
                            disabled={isDefaultLogo}
                        >
                            <Trash2 />
                        </Button>
                    </div>
                    <SelectLogoDialog
                        onLogoSelect={handleLogoSelect}
                        mode="replace"
                    />
                    <img
                        src={emailData.logo}
                        className="mx-auto max-h-[100px] max-w-[200px]"
                        alt="Logo"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="title">
                        Title
                    </Label>
                    <Input
                        id="title"
                        value={emailData.title}
                        onChange={(e) => updateEmailData('title', e.target.value)}
                        className={errors.title ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">
                        Description
                    </Label>
                    <Input
                        id="description"
                        value={emailData.description}
                        onChange={(e) => updateEmailData('description', e.target.value)}
                        className={errors.description ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="label">
                        Label
                    </Label>
                    <Input
                        id="label"
                        value={emailData.label}
                        onChange={(e) => updateEmailData('label', e.target.value)}
                        className={errors.label ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="footer-description">
                        Footer description
                    </Label>
                    <Input
                        id="footer-description"
                        value={emailData.footerDescription}
                        onChange={(e) => updateEmailData('footerDescription', e.target.value)}
                        className={errors.footerDescription ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Background color</Label>
                    <Input
                        type="color"
                        value={emailData.backgroundColor}
                        onChange={(e) => updateEmailData('backgroundColor', e.target.value)}
                        className={errors.backgroundColor ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Accent color</Label>
                    <Input
                        type="color"
                        value={emailData.accentColor}
                        onChange={(e) => updateEmailData('accentColor', e.target.value)}
                        className={errors.accentColor ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}
                    />
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-500">
                            {`Email will be sent to ${emailData.emails.length} ${emailData.emails.length === 1 ? 'person' : 'people'}`}
                        </p>
                    </div>
                    <Button
                        onClick={handleSendEmail}
                        disabled={!emailData.emails.length > 0 || hasErrors || isLoading}
                        className="min-w-[120px]"
                    >
                        {isLoading ? <LoadingButton /> : 'Send email'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}