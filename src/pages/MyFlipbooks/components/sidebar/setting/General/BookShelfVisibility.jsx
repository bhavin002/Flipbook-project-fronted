import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, ListX, Info } from 'lucide-react'
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function BookShelfVisibility() {
    const [bookshelfVisibility, setBookshelfVisibility] = useState(false)
    return (
         <Card>
            <CardHeader>
                <CardTitle className="text-xl font-semibold">Bookshelf visibility</CardTitle>
                <CardDescription>
                    This will be your preselected visibility option when you publish a bookshelf. You can always change this here or from the visibility sections when publishing.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Tabs defaultValue="public">
                    <TabsList className="grid md:w-[40%] grid-cols-2 mb-4">
                        <TabsTrigger value="public">
                            <Globe className="w-4 h-4 mr-2 hidden md:block" /> Public
                        </TabsTrigger>
                        <TabsTrigger value="unlisted">
                            <ListX className="w-4 h-4 mr-2 hidden md:block" /> Unlisted
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
                    <div className="flex items-center space-x-2 mt-4">
                        <Checkbox
                            id="bookshelfVisibility"
                            checked={bookshelfVisibility}
                            onCheckedChange={setBookshelfVisibility}
                        />
                        <Label htmlFor="bookshelfVisibility" className="text-sm font-medium text-gray-600">
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
                                    <p className="text-sm">Everyone within the workspace will only have the selected visibility option when publishing their bookshelfs.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    )
}