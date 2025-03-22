import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Info
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Customize() {
    return (
         <Card>
            <CardHeader>
                <CardTitle>Customize the look of your embed</CardTitle>
                <CardDescription>You can edit the following settings in Customize:</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-1">
                    <p>‧ Display controls.</p>
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
                                <p className="text-sm">Sharing options, Language, Download PDF</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <p>‧ Transparent background (no color), or choose color.</p>
                <p>‧ Display one page at a time (Layout style).</p>
                <p>‧ Add your brand logo.</p>
                <div className="flex justify-end">
                <Button >Customize appearances</Button>
                </div>
            </CardContent>
        </Card>
    )
}