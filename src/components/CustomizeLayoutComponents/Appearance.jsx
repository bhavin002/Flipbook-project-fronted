import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useFlipbookPreviewSettings } from "@/hooks/useFlipbookPreviewSettings"

export default function Appearance() {
    const { isFieldEnabled } = useFlipbookPreviewSettings();

    const checkboxOptions = [
        { id: "automatic-transition", label: "Automatic transition", isShowTooltip: false, fieldKey: "automaticTransition" },
        { id: "flip-sounds", label: "Flip sounds", isShowTooltip: true, tooltip: "Note: on mobile devices or when slide effect is selected, flip sounds will always be disabled.", fieldKey: "flipSound" },
        { id: "right-to-left", label: "Right to left orientation", isShowTooltip: false, fieldKey: "rigthToLeftOrientation" },
        { id: "shadow", label: "Shadow on pages", isShowTooltip: true, tooltip: "Note: when slide effect is selected, shadow on pages will be disabled.", fieldKey: "shadowOnPages" },
        { id: "animate", label: "Animate interactions", isShowTooltip: true, tooltip: "Make yur interations pop by animating them.", fieldKey: "animateInteraction" },
        { id: "highlights", label: "Highlights on links", isShowTooltip: true, tooltip: "Make your links pop by highlighting them.", fieldKey: "highlightsOnLink" }
    ]

    const [checkedItems, setCheckedItems] = useState({
        "automatic-transition": true,
        "flip-sounds": false,
        "right-to-left": false,
        "shadow": false,
        "animate": false,
        "highlights": false
    })

    const handleCheckboxChange = (id) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    return (
        <>
            <div className="flex flex-col gap-2 text-white">
                <Label>Player skin</Label>
                <Tabs defaultValue="classic" disabled={!isFieldEnabled("playerSkin")}>
                    <TabsList className="w-full">
                        <TabsTrigger className="items-center gap-2 w-full" value="classic" disabled={!isFieldEnabled("playerSkin")}>
                            Classic
                        </TabsTrigger>
                        <TabsTrigger className="items-center gap-2 w-full" value="modern" disabled={!isFieldEnabled("playerSkin")}>
                            Modern
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className="flex flex-col gap-2 text-white">
                <Label>Page transition</Label>
                <Tabs defaultValue="flip" disabled={!isFieldEnabled("pageTransition")}>
                    <TabsList className="w-full">
                        <TabsTrigger className="items-center gap-2 w-full" value="flip" disabled={!isFieldEnabled("pageTransition")}>
                            Flip
                        </TabsTrigger>
                        <TabsTrigger className="items-center gap-2 w-full" value="slide" disabled={!isFieldEnabled("pageTransition")}>
                            Slide
                        </TabsTrigger>
                        <TabsTrigger className="items-center gap-2 w-full" value="scroll" disabled={!isFieldEnabled("pageTransition")}>
                            Scroll
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className="flex flex-col gap-2 text-white">
                <div className="flex justify-between">
                    <Label>Layout style</Label>
                    <p className="text-sm cursor-pointer text-gray-300 hover:underline">Learn more</p>
                </div>
                <Select defaultValue="smart-view" disabled={!isFieldEnabled("layoutStyle")}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a layout view" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="smart-view">
                                <div className="flex gap-2">
                                    Smart view
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
                                                <p className="text-sm">Create unique link for each lead to track their interactions in your flipbook</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </SelectItem>
                            <SelectItem value="single-page-view">
                                <div className="flex gap-2">
                                    Single page view
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
                                                <p className="text-sm">Create unique link for each lead to track their interactions in your flipbook</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </SelectItem>
                            <SelectItem value="two-page-view">
                                Two page view
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {checkboxOptions.map((option) => (
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
                    {option.id === "automatic-transition" && checkedItems["automatic-transition"] && (
                        <div className="flex items-center gap-2 ml-auto">
                            <Label htmlFor="delay" className="text-sm font-medium leading-none">
                                Delay
                            </Label>
                            <Input className="w-24" type="number" defaultValue="7" disabled={!isFieldEnabled(option.fieldKey)} />
                            <p className="text-sm">sec</p>
                        </div>
                    )}
                </div>
            ))}
        </>
    )
}