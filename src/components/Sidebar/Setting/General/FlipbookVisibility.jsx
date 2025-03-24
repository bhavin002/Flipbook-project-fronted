import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Lock, ListX, LockKeyhole, Info } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function FlipbookVisibility() {
    const [selectedRadio, setSelectedRadio] = useState("email");
    const [flipbookVisibility, setFlipbookVisibility] = useState(false)

    const handleRadioChange = (value) => {
        setSelectedRadio(value);
    };
    return (
         <Card>
            <CardHeader>
                <CardTitle>Flipbook visibility</CardTitle>
                <CardDescription>
                    This will be your preselected visibility option when you publish a catalog. You can always change this here or from the visibility sections when publishing.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Tabs defaultValue="public">
                    <TabsList className="grid md:w-[80%] grid-cols-4 mb-4">
                        <TabsTrigger value="public">
                            <Globe className="w-4 h-4 mr-2 hidden md:block" /> Public
                        </TabsTrigger>
                        <TabsTrigger value="unlisted">
                            <ListX className="w-4 h-4 mr-2 hidden md:block" /> Unlisted
                        </TabsTrigger>
                        <TabsTrigger value="passwordLocked">
                            <LockKeyhole className="w-4 h-4 mr-2 hidden md:block" /> Locked
                        </TabsTrigger>
                        <TabsTrigger value="private">
                            <Lock className="w-4 h-4 mr-2 hidden md:block" /> Private
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="public">
                        <p className="text-sm font-medium text-gray-600">Your catalog will appear on your public Flipnova profile and it will be indexed
                            by the search engines (Google, Bing, etc).</p>
                    </TabsContent>

                    <TabsContent value="unlisted">
                        <p className="text-sm font-medium text-gray-600">Your catalog will not appear anywhere on the web.
                            Only people you personally share the direct link with will have access to your catalog.</p>
                    </TabsContent>

                    <TabsContent value="passwordLocked">
                        <p className="text-sm font-medium text-gray-600">Your catalog will not appear anywhere on the web. Your readers must enter the password you have set in order to read your flipbook.</p>
                    </TabsContent>

                    <TabsContent value="private">
                        <RadioGroup
                            className="flex flex-wrap md:gap-6"
                            value={selectedRadio}
                            onValueChange={handleRadioChange}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="email" id="byEmail" />
                                <Label htmlFor="byEmail">By emails</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="readers" id="readersOnly" />
                                <Label htmlFor="readersOnly">Readers Only</Label>
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
                                            <p className="text-sm">Only the users who are in your readers list will be able to see this flipbook.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="sso" id="ssoOnly" />
                                <Label htmlFor="ssoOnly">SSO only</Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Info className="h-4 w-4 text-gray-500 cursor-pointer" />
                                        </TooltipTrigger>
                                        <TooltipContent
                                            side="right"
                                            align="center"
                                            className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md "
                                        >
                                            <p className="text-sm">Share publication with people connected through SSO. They will not be required to create an account.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </RadioGroup>
                    </TabsContent>
                    <div className="flex items-center space-x-2 mt-4">
                        <Checkbox
                            id="flipbookVisibility"
                            checked={flipbookVisibility}
                            onCheckedChange={setFlipbookVisibility}
                        />
                        <Label htmlFor="flipbookVisibility" className="text-sm font-medium text-gray-600">
                            Hide the other visibility options
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
                                    <p className="text-sm">Everyone within the workspace will only have the selected visibility option when publishing their flipbooks.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    )
}