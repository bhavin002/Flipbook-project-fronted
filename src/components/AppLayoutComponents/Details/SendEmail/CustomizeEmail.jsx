import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Trash2,
    Upload,
    Info
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

export default function CustomizeEmail() {
    const { emailData, updateEmailData, updateLogo, resetLogo } = useEmailCustomization();

    const handleLogoSelect = (selectedLogo) => {
        updateLogo(selectedLogo.src);
    };

    const handleDeleteLogo = () => {
        resetLogo();
    };

    const isDefaultLogo = emailData.logo === "https://flipbook-subway-workspace-logo.s3.ap-south-1.amazonaws.com/5e909bd2-5ac1-4dd8-a886-2df3327e86cb.png";

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
                    <MaskEmailInput />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="subject">
                        Subject
                    </Label>
                    <Input 
                        id="subject" 
                        value={emailData.subject}
                        onChange={(e) => updateEmailData('subject', e.target.value)}
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
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="discription">
                        Description
                    </Label>
                    <Input 
                        id="discription" 
                        value={emailData.description}
                        onChange={(e) => updateEmailData('description', e.target.value)}
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
                    />
                </div>
                <div className="space-y-2">
                    <Label>Background color</Label>
                    <Input 
                        type="color" 
                        value={emailData.backgroundColor}
                        onChange={(e) => updateEmailData('backgroundColor', e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Accent color</Label>
                    <Input 
                        type="color" 
                        value={emailData.accentColor}
                        onChange={(e) => updateEmailData('accentColor', e.target.value)}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Email will be sent to 10 people</p>
                    <Button>Send email</Button>
                </div>
            </CardContent>
        </Card>
    )
}