import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useFlipbookPreviewSettings } from "@/hooks/useFlipbookPreviewSettings";
import { UpdateFlipbookPreviewSettingApi } from "@/service/flipbookPreviewSetting.service";
import { toast } from "sonner";
import { PlayerSkin, PageTransition, LayoutStyle } from "@/utils/enum";

export default function Appearance({ flipbookId, settings }) {
    console.log("Appearance settings >?>?>?>", settings)
    const { isFieldEnabled } = useFlipbookPreviewSettings();

    const checkboxOptions = [
        { id: "automatic-transition", label: "Automatic transition", isShowTooltip: false, fieldKey: "automaticTransition" },
        { id: "flip-sounds", label: "Flip sounds", isShowTooltip: true, tooltip: "Note: on mobile devices or when slide effect is selected, flip sounds will always be disabled.", fieldKey: "flipSound" },
        { id: "right-to-left", label: "Right to left orientation", isShowTooltip: false, fieldKey: "rigthToLeftOrientation" },
        { id: "shadow", label: "Shadow on pages", isShowTooltip: true, tooltip: "Note: when slide effect is selected, shadow on pages will be disabled.", fieldKey: "shadowOnPages" },
        { id: "animate", label: "Animate interactions", isShowTooltip: true, tooltip: "Make your interactions pop by animating them.", fieldKey: "animateInteraction" },
        { id: "highlights", label: "Highlights on links", isShowTooltip: true, tooltip: "Make your links pop by highlighting them.", fieldKey: "highlightsOnLink" },
    ];

    // Create proper mappings between enum values and select values
    const layoutStyleMapping = {
        [LayoutStyle.SMART_VIEW]: "smart-view",
        [LayoutStyle.ONE_PAGE]: "single-page-view",
        [LayoutStyle.TWO_PAGE]: "two-page-view"
    };

    const reverseLayoutStyleMapping = {
        "smart-view": LayoutStyle.SMART_VIEW,
        "single-page-view": LayoutStyle.ONE_PAGE,
        "two-page-view": LayoutStyle.TWO_PAGE
    };

    const [checkedItems, setCheckedItems] = useState({
        "automatic-transition": false,
        "flip-sounds": false,
        "right-to-left": false,
        "shadow": false,
        "animate": false,
        "highlights": false,
    });
    const [playerSkin, setPlayerSkin] = useState("classic");
    const [pageTransition, setPageTransition] = useState("flip");
    const [layoutStyle, setLayoutStyle] = useState("smart-view");
    const [automaticTransitionDelay, setAutomaticTransitionDelay] = useState(7);

    useEffect(() => {
        if (settings) {
            setCheckedItems({
                "automatic-transition": settings.automaticTransition || false,
                "flip-sounds": settings.flipSound || false,
                "right-to-left": settings.rigthToLeftOrientation || false,
                "shadow": settings.shadowOnPages || false,
                "animate": settings.animateInteraction || false,
                "highlights": settings.highlightsOnLink || false,
            });
            setPlayerSkin(Object.keys(PlayerSkin)[settings.playerSkin]?.toLowerCase() || "classic");
            setPageTransition(Object.keys(PageTransition)[settings.pageTransition]?.toLowerCase() || "flip");

            // Fixed layout style mapping
            setLayoutStyle(layoutStyleMapping[settings.layoutStyle] || "smart-view");

            setAutomaticTransitionDelay(settings.automaticTransitionDelay || 7);
        }
    }, [settings]);

    const handleUpdate = async (payload) => {
        try {
            const formData = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
                formData.append(key, value);
            });
            await UpdateFlipbookPreviewSettingApi(flipbookId, formData);
        } catch (error) {
            toast.error("Failed to update settings", { description: error.message });
        }
    };

    const handleCheckboxChange = (id) => {
        setCheckedItems((prev) => {
            const newState = { ...prev, [id]: !prev[id] };
            const fieldKey = checkboxOptions.find((opt) => opt.id === id).fieldKey;
            handleUpdate({ [fieldKey]: newState[id] });
            return newState;
        });
    };

    const handlePlayerSkinChange = (value) => {
        setPlayerSkin(value);
        handleUpdate({ playerSkin: PlayerSkin[value.toUpperCase()] });
    };

    const handlePageTransitionChange = (value) => {
        setPageTransition(value);
        handleUpdate({ pageTransition: PageTransition[value.toUpperCase()] });
    };

    const handleLayoutStyleChange = (value) => {
        setLayoutStyle(value);
        // Use the reverse mapping to get the correct enum value
        handleUpdate({ layoutStyle: reverseLayoutStyleMapping[value] });
    };

    const handleDelayChange = (e) => {
        const value = Number(e.target.value);
        setAutomaticTransitionDelay(value);
        handleUpdate({ automaticTransitionDelay: value });
    };

    return (
        <>
            <div className="flex flex-col gap-2 text-white">
                <Label>Player skin</Label>
                <Tabs value={playerSkin} onValueChange={handlePlayerSkinChange} disabled={!isFieldEnabled("playerSkin")}>
                    <TabsList className="w-full">
                        <TabsTrigger className="items-center gap-2 w-full" value="classic">Classic</TabsTrigger>
                        <TabsTrigger className="items-center gap-2 w-full" value="modern">Modern</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className="flex flex-col gap-2 text-white">
                <Label>Page transition</Label>
                <Tabs value={pageTransition} onValueChange={handlePageTransitionChange} disabled={!isFieldEnabled("pageTransition")}>
                    <TabsList className="w-full">
                        <TabsTrigger className="items-center gap-2 w-full" value="flip">Flip</TabsTrigger>
                        <TabsTrigger className="items-center gap-2 w-full" value="slide">Slide</TabsTrigger>
                        <TabsTrigger className="items-center gap-2 w-full" value="scroll">Scroll</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className="flex flex-col gap-2 text-white">
                <div className="flex justify-between">
                    <Label>Layout style</Label>
                    <p className="text-sm cursor-pointer text-gray-300 hover:underline">Learn more</p>
                </div>
                <Select value={layoutStyle} onValueChange={handleLayoutStyleChange} disabled={!isFieldEnabled("layoutStyle")}>
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
                            <SelectItem value="two-page-view">Two page view</SelectItem>
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
                    {option.isShowTooltip && (
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
                                    <p className="text-sm">{option.tooltip}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                    {option.id === "automatic-transition" && checkedItems["automatic-transition"] && (
                        <div className="flex items-center gap-2 ml-auto">
                            <Label htmlFor="delay" className="text-sm font-medium leading-none">
                                Delay
                            </Label>
                            <Input
                                className="w-24"
                                type="number"
                                value={automaticTransitionDelay}
                                onChange={handleDelayChange}
                                disabled={!isFieldEnabled(option.fieldKey)}
                            />
                            <p className="text-sm">sec</p>
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}