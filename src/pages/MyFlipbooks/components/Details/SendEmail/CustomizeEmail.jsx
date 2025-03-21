import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MaskInputEmail from "@/utils/MaskInputEmail";
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
import { Switch } from "@/components/ui/switch";

export default function CustomizeEmail() {
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
                    <MaskInputEmail />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="subject">
                        Subject
                    </Label>
                    <Input id="subject" defaultValue="hopoleh620 hopoleh620 shared a flipbook with you!" />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="font-medium flex items-center gap-2">
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
                        </label>
                        <Button variant="outline"><Trash2 /></Button>
                    </div>
                    <Button variant="outline" size="sm">
                        <Upload size={14} className="mr-2" />
                        Upload Logo
                    </Button>
                    <img src="/src/assets/logo.png" className="mx-auto max-h-[100px] max-w-[200px]" alt="Logo" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="title">
                        Title
                    </Label>
                    <Input id="title" defaultValue="This is my masterpiece" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="discription">
                        Description
                    </Label>
                    <Input id="discription" defaultValue="Take a look at this publication to see my recent work. I made this flipbook using Flipnova." />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="label">
                        Label
                    </Label>
                    <Input id="label" defaultValue="READ BOOK" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="footer-description">
                        Footer description
                    </Label>
                    <Input id="footer-description" defaultValue="Flipnova LLC - 535 Mission St. FL 14, San Francisco, CA 94105, USA" />
                </div>
                <div className="space-y-2">
                    <Label>Background color</Label>
                    <Input type="color" value="#7b39ed" />
                </div>
                <div className="space-y-2">
                    <Label>Accent color</Label>
                    <Input type="color" value="#ffffff" />
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Email will be sent to 10 people</p>
                    <Button>Send email</Button>
                </div>
                <p className="text-sm text-gray-500"> <a className="text-sm font-medium text-purple-600 cursor-pointer">Upgrade </a>to send email via Flipnova or <a className="text-sm font-medium text-purple-600 cursor-pointer">click here </a>to use your email client</p>
                <div className="flex items-center">
                    <Switch id="save-emails" />
                    <label htmlFor="save-emails" className="ml-3 text-gray-700">
                    Save these settings for future emails
                    </label>
                </div>
            </CardContent>
        </Card>
    )
}