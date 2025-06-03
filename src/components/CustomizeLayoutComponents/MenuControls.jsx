import { Label } from "@/components/ui/label";
import { CircleCheckBig, Trash2, Music2, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { useFlipbookPreviewSettings } from "@/hooks/useFlipbookPreviewSettings";
import { UpdateFlipbookPreviewSettingApi } from "@/service/flipbookPreviewSetting.service";
import { toast } from "sonner";

export default function MenuControls({ flipbookId, settings }) {
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
        { id: "background-audio", label: "Background audio", isShowTooltip: true, tooltip: "Add mp3 audio that plays across pages in the background.", fieldKey: "backgroundAudio" },
    ];

    const [checkedItems, setCheckedItems] = useState({
        "controls-normal-mode": false,
        "navigation-bar": false,
        "navigation-arrows": false,
        "share-options": false,
        "pages-overview": false,
        "allow-fullscreen": false,
        "download-pdf": false,
        "print-pdf": false,
        "search": false,
        "background-audio": false,
    });
    const [isAudioLoop, setIsAudioLoop] = useState(false);
    const [isAutoPlay, setIsAutoPlay] = useState(false);
    const [backgroundAudioFile, setBackgroundAudioFile] = useState(null);

    useEffect(() => {
        if (Object.keys(settings).length > 0) {
            setCheckedItems({
                "controls-normal-mode": settings.controlInNormalMode,
                "navigation-bar": settings.navigationBar,
                "navigation-arrows": settings.navigationArrow,
                "share-options": settings.shareOptions,
                "pages-overview": settings.pageOverview,
                "allow-fullscreen": settings.allowFullScreen,
                "download-pdf": settings.downloadPDF,
                "print-pdf": settings.printPDF,
                "search": settings.search,
                "background-audio": settings.backgroundAudio,
            });
            setIsAudioLoop(settings.isAudioLoop);
            setIsAutoPlay(settings.isAutoPlay);
            setBackgroundAudioFile(settings.backgroundAudioFileName && settings.backgroundAudioLink ? 
                { name: settings.backgroundAudioFileName, url: settings.backgroundAudioLink } : null);
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
            
            // Special handling for background audio checkbox
            if (id === "background-audio" && !newState[id]) {
                // When unchecking background audio, also clear the audio file
                handleUpdate({ [fieldKey]: newState[id], backgroundAudioFile: null });
                setBackgroundAudioFile(null);
            } else {
                handleUpdate({ [fieldKey]: newState[id] });
            }
            
            return newState;
        });
    };

    const handleAudioLoopChange = () => {
        setIsAudioLoop((prev) => {
            handleUpdate({ isAudioLoop: !prev });
            return !prev;
        });
    };

    const handleAutoPlayChange = () => {
        setIsAutoPlay((prev) => {
            handleUpdate({ isAutoPlay: !prev });
            return !prev;
        });
    };

    const handleAudioReplace = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append("backgroundAudioFile", file);
                formData.append("backgroundAudio", true);
                await UpdateFlipbookPreviewSettingApi(flipbookId, formData);
                setBackgroundAudioFile({ name: file.name, url: URL.createObjectURL(file) });
                setCheckedItems(prev => ({ ...prev, "background-audio": true }));
            } catch (error) {
                toast.error("Failed to upload audio", { description: error.message });
            }
        }
    };

    const handleAudioDelete = async () => {
        try {
            const formData = new FormData();
            formData.append("backgroundAudioFile", null);
            await UpdateFlipbookPreviewSettingApi(flipbookId, formData);
            setBackgroundAudioFile(null);
        } catch (error) {
            toast.error("Failed to remove audio", { description: error.message });
        }
    };

    // Determine if we have an audio file (either uploaded or existing)
    const hasAudioFile = backgroundAudioFile !== null;
    const buttonLabel = hasAudioFile ? "Replace audio" : "Upload audio";

    return (
        <>
            {checkboxOptions.map((option) => (
                <>
                    <div className="flex items-center gap-2 text-white">
                        <Checkbox
                            id={option.id}
                            checked={checkedItems[option.id]}
                            onCheckedChange={() => handleCheckboxChange(option.id)}
                            className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary"
                            disabled={!isFieldEnabled(option.fieldKey)}
                        />
                        <Label htmlFor={option.id} className="text-sm font-medium leading-none">{option.label}</Label>
                        {option.isShowTooltip && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info className="h-4 w-4 cursor-pointer" />
                                    </TooltipTrigger>
                                    <TooltipContent side="right" align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md">
                                        <p className="text-sm">{option.tooltip}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
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
                                {hasAudioFile && (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Music2 className="h-5 w-5" />
                                            <p className="text-sm text-gray-100">{backgroundAudioFile.name}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            className="hover:text-red-500 hover:bg-sidebar"
                                            onClick={handleAudioDelete}
                                            disabled={!isFieldEnabled(option.fieldKey)}
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>
                                )}
                                <Button
                                    variant="outline"
                                    className="text-primary"
                                    disabled={!isFieldEnabled(option.fieldKey)}
                                    asChild
                                >
                                    <label>
                                        {buttonLabel}
                                        <input type="file" accept="audio/mp3" hidden onChange={handleAudioReplace} />
                                    </label>
                                </Button>
                            </div>
                            {/* Only show Loop and Autoplay options when audio file is uploaded */}
                            {hasAudioFile && (
                                <>
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="loop"
                                            checked={isAudioLoop}
                                            onCheckedChange={handleAudioLoopChange}
                                            className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary"
                                            disabled={!isFieldEnabled(option.fieldKey)}
                                        />
                                        <Label htmlFor="loop" className="text-sm font-medium leading-none">Loop</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="h-4 w-4 cursor-pointer" />
                                                </TooltipTrigger>
                                                <TooltipContent side="right" align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md">
                                                    <p className="text-sm">Loop audio until the flipbook closes.</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="autoplay"
                                            checked={isAutoPlay}
                                            onCheckedChange={handleAutoPlayChange}
                                            className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary"
                                            disabled={!isFieldEnabled(option.fieldKey)}
                                        />
                                        <Label htmlFor="autoplay" className="text-sm font-medium leading-none">Autoplay</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="h-4 w-4 cursor-pointer" />
                                                </TooltipTrigger>
                                                <TooltipContent side="right" align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md">
                                                    <p className="text-sm">Play audio when the flipbook opens.</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </>
            ))}
        </>
    );
}