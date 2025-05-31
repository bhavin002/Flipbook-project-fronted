import { Label } from "@/components/ui/label"
import { CircleCheckBig, Delete, Info, Music2, Trash2 } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { Alert, AlertDescription } from "../ui/alert"
import { Button } from "../ui/button"
import { useFlipbookPreviewSettings } from "@/hooks/useFlipbookPreviewSettings"

export default function MenuControls() {
    const { isFieldEnabled } = useFlipbookPreviewSettings();

    const checkboxOptions = [
        { id: "controls-normal-mode", label: "Controls in normal mode", isShowTooltip: true, tooltip: "Display your control settings without having to enter fullscreen mode.", fieldKey: "controlInNormalMode" },
        { id: "navigation-bar", label: "Navigation bar", isShowTooltip: true, tooltip: "Hide and show bottom navigation bar.", fieldKey: "navigationBar" },
        { id: "navigation-arrows", label: "Navigation arrows", isShowTooltip: true, tooltip: "Hide or show the navigation arrows", fieldKey: "navigationArrow" },
        { id: "share-options", label: "Share options", isShowTooltip: false, fieldKey: "shareOptions" },
        { id: "pages-overview", label: "Pages overview", isShowTooltip: false, fieldKey: "pageOverview" },
        { id: "allow-fullscreen", label: "Allow fullscreen", isShowTooltip: false, fieldKey: "allowFullScreen" },
        { id: "download-pdf", label: "Download PDF", isShowTooltip: true, tooltip: "Allow your readers to download your flipbook in PDF format.", fieldKey: "downloadPDF" },
        { id: "print-pdf", label: "Print PDF", isShowTooltip: true, tooltip: "Allow your readers to print your flipbook.", fieldKey: "printPDF" },
        { id: "search", label: "Search", isShowTooltip: true, tooltip: "Your readers can search for text in your flipbook", fieldKey: "search" },
        { id: "background-audio", label: "Background audio", isShowTooltip: true, tooltip: "Add mp3 audio that plays across pages in the background.", fieldKey: "backgroundAudio" }
    ]

    const [checkedItems, setCheckedItems] = useState({
        "controls-normal-mode": false,
        "navigation-bar": false,
        "navigation-arrows": false,
        "share-options": false,
        "pages-overview": true,
        "allow-fullscreen": false,
        "download-pdf": false,
        "print-pdf": false,
        "search": false,
        "background-audio": true
    })

    const handleCheckboxChange = (id) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    return (
        <>
            {checkboxOptions.map((option) => (
                <>
                    <div key={option.id} className="flex items-center gap-2 text-white">
                        <Checkbox
                            id={option.id}
                            checked={checkedItems[option.id]}
                            onCheckedChange={() => handleCheckboxChange(option.id)}
                            className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary"
                            disabled={!isFieldEnabled(option.fieldKey)}
                        />
                        <Label htmlFor={option.id} className="text-sm font-medium leading-none">
                            {option.label}
                        </Label>
                        {
                            option.isShowTooltip && (<TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info className="h-4 w-4 cursor-pointer" />
                                    </TooltipTrigger>
                                    <TooltipContent
                                        side="right"
                                        align="center"
                                        className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
                                    >
                                        <p className="text-sm">{option.tooltip}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>)
                        }
                    </div>
                    {option.id === "pages-overview" && checkedItems["pages-overview"] && (
                        <Alert>
                            <AlertDescription className="flex items-center gap-2 text-primary">
                                <CircleCheckBig className="h-5 w-5" /> Every page thumbnail will be visible after publishing.
                            </AlertDescription>
                        </Alert>
                    )}
                    {option.id === "background-audio" && checkedItems["background-audio"] && (
                        <div className="space-y-4 text-white">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Music2 className="h-5 w-5" />
                                        <p className="text-sm text-gray-100">feed_8rjtifB1740372106515 (1).mp3</p>
                                    </div>
                                    <Button variant="ghost" className="hover:text-red-500 hover:bg-sidebar" disabled={!isFieldEnabled(option.fieldKey)}><Trash2 /></Button>
                                </div>
                                <Button variant="outline" className="text-primary" disabled={!isFieldEnabled(option.fieldKey)}>Replace audio</Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="loop"
                                    className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary"
                                    disabled={!isFieldEnabled(option.fieldKey)}
                                />
                                <Label htmlFor="loop" className="text-sm font-medium leading-none">
                                    Loop
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
                                            <p className="text-sm">Loop audio until the flipbook closes.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="autoplay"
                                    className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary"
                                    disabled={!isFieldEnabled(option.fieldKey)}
                                />
                                <Label htmlFor="autoplay" className="text-sm font-medium leading-none">
                                    Autoplay
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
                                            <p className="text-sm">Play audio when the flipbook opens.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    )}
                </>
            ))}
        </>
    )
}