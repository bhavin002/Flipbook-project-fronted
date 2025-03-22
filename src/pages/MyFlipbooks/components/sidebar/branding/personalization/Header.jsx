import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export default function Header() {
    return (
         <Card>
            <CardHeader>
                <CardTitle>Personalize your header</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center">
                    <Switch id="show-header" />
                    <label htmlFor="show-header" className="ml-3 text-gray-700">
                        Show header
                    </label>
                </div>
                <div className="flex items-center">
                    <Switch id="show-search-bar" />
                    <label htmlFor="show-search-bar" className="ml-3 text-gray-700">
                        Show search bar
                    </label>
                </div>
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
                <div className="flex flex-col gap-2">
                    <Label>Header color</Label>
                    <Input type="color" value="#7b39ed" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label className="flex gap-2">Elements color
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
                                    <p className="text-sm">This will affect the color of the text and the icons on your readers navigation bar.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Label>
                    <Input type="color" value="#ffffff" />
                </div>
            </CardContent>
        </Card>
    )
}