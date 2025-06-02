import { Label } from "@/components/ui/label"
import { Info, Trash2 } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import SelectLogoDialog from "../AppLayoutComponents/Sidebar/Setting/Workspace/SelectLogoDialog"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import ColorPaletteSelector from "./Branding/ColorPaletteSelector"
import { Button } from '@/components/ui/button';
import { useFlipbookPreviewSettings } from "@/hooks/useFlipbookPreviewSettings";
import { toast } from "sonner";

export default function Branding() {
    const { isFieldEnabled } = useFlipbookPreviewSettings();
    const [selectedBackground, setSelectedBackground] = useState("solidcolor")
    const [playerAccentColor, setPlayerAccentColor] = useState('#c1080b');
    const [selectedLogo, setSelectedLogo] = useState(null);
    const [isLogoLoading, setIsLogoLoading] = useState(false);

    const handleLogoSelect = (logo) => {
        setSelectedLogo(logo);
    };

    const handleLogoDelete = async () => {
        try {
            setIsLogoLoading(true);
            
            // Simulate API call - replace with actual API
            
            setSelectedLogo(null);
        } catch (error) {
            toast.error("Failed to remove logo", {
                description: error.message || "Something went wrong"
            });
        } finally {
            setIsLogoLoading(false);
        }
    };

    const renderBackgroundContent = (selectedBackground) => {
        switch (selectedBackground) {
            case "solidcolor":
                return <ColorPaletteSelector disabled={!isFieldEnabled("backgroundColor")} />
            case "uploadimage":
                return (
                    <div className="flex justify-between">
                        <Button variant="outline" disabled={!isFieldEnabled("backgroundColor")}>Upload image</Button>
                        <Select defaultValue="scale-crop" disabled={!isFieldEnabled("backgroundColor")}>
                            <SelectTrigger id="background-color" className="w-[200px]">
                                <SelectValue placeholder="Select a workspace" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="scale-crop">Scale-crop</SelectItem>
                                    <SelectItem value="center">Center</SelectItem>
                                    <SelectItem value="tile">Tile</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <>
            <div className="space-y-4 ">
                {selectedLogo ? (
                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-12 bg-white border rounded overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-center bg-repeat opacity-20"
                                    style={{ backgroundImage: 'url(https://cdn.flipsnack.com/site/images/transparent-bg-pattern.png)' }}
                                />
                                <img
                                    src={selectedLogo?.src || brandingData?.logo}
                                    alt={selectedLogo?.alt || `${brandingData?.name} logo`}
                                    className="w-full h-full object-contain relative z-10"
                                />
                            </div>
                            <div className="flex gap-2 items-center">
                                {isFieldEnabled("brandLogoId") ? (
                                    <SelectLogoDialog 
                                        onLogoSelect={handleLogoSelect}
                                        mode="replace" 
                                    />
                                ) : (
                                    <Button variant="outline" className="text-primary" disabled={true}>
                                        Replace logo
                                    </Button>
                                )}
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleLogoDelete}
                                    className="h-8 w-8"
                                    disabled={isLogoLoading || !isFieldEnabled("brandLogoId")}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <SelectLogoDialog 
                                onLogoSelect={handleLogoSelect}
                                mode="select" 
                                disabled={!isFieldEnabled("brandLogoId")}
                            />
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2 text-white">
                <Label htmlFor="logo-link" className="text-sm font-medium leading-none">
                    Add a link on your logo
                </Label>
                <Input
                    type="text"
                    id="logo-link"
                    placeholder="Logo link"
                    className="placeholder:text-[#d8dce3]"
                    disabled={!isFieldEnabled("logoLink")}
                />
            </div>
            <div className="flex flex-col gap-2 text-white">
                <Label htmlFor="background-color" className="text-sm font-medium leading-none">
                    Background color
                </Label>
                <Select
                    defaultValue={selectedBackground}
                    onValueChange={setSelectedBackground}
                    disabled={!isFieldEnabled("backgroundColor")}
                >
                    <SelectTrigger id="background-color">
                        <SelectValue placeholder="Select a workspace" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="transparent">Transparent</SelectItem>
                            <SelectItem value="solidcolor">Solid colors</SelectItem>
                            <SelectItem value="uploadimage">Upload image</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {renderBackgroundContent(selectedBackground)}
            <div className='flex gap-2 items-center text-white'>
                <Label>Player accent color</Label>
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
                            <p className="text-sm">Once set the accent color will be visible on the progress bar, selected items and hovers.</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className='flex justify-between gap-4 text-white'>
                <Input
                    type="text"
                    value={playerAccentColor}
                    onChange={(e) => setPlayerAccentColor(e.target.value)}
                    disabled={!isFieldEnabled("playerAccentColorHash")}
                />
                <div className='flex gap-4 items-center'>
                    <div
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: playerAccentColor }}
                    />
                    <Button variant="ghost" disabled={!isFieldEnabled("playerAccentColorHash")}>Revert</Button>
                </div>
            </div>
        </>
    )
}