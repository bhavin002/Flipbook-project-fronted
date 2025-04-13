import { Label } from "@/components/ui/label"
import { Info } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import SelectLogoDialog from "../AppLayoutComponents/Sidebar/Setting/Workspace/SelectLogoDialog"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import ColorPaletteSelector from "./Branding/ColorPaletteSelector"
import { Button } from '@/components/ui/button';

export default function Branding() {
    const [selectedBackground, setSelectedBackground] = useState("solidcolor")
    const [playerAccentColor, setPlayerAccentColor] = useState('#c1080b');


    const renderBackgroundContent = (selectedBackground) => {
        switch (selectedBackground) {
            case "solidcolor":
                return <ColorPaletteSelector />
            case "uploadimage":
                return (
                    <div className="flex justify-between">
                        <Button variant="outline" >Upload image</Button>
                        <Select defaultValue="scale-crop">
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
                <div className="flex items-center gap-2 text-white">
                    <Checkbox
                        id="add-logo"
                        className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary"
                    />
                    <Label htmlFor="add-logo" className="text-sm font-medium leading-none">
                        Add your logo
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
                                <p className="text-sm">Personalize your flipbook using your own logo.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <SelectLogoDialog />
            </div>
            <div className="flex flex-col gap-2 text-white">
                <Label htmlFor="logo-link" className="text-sm font-medium leading-none">
                    Add a link on your logo
                </Label>
                <Input type="text" id="logo-link" placeholder="Logo link" className="placeholder:text-[#d8dce3]"/>
            </div>
            <div className="flex flex-col gap-2 text-white">
                <Label htmlFor="background-color" className="text-sm font-medium leading-none">
                    Background color
                </Label>
                <Select defaultValue={selectedBackground} onValueChange={setSelectedBackground}>
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
                />
                <div className='flex gap-4 items-center'>
                    <div
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: playerAccentColor }}
                    />
                    <Button variant="ghost">Revert</Button>
                </div>
            </div>
            {/* based on selectedBackground value show content here   */}
        </>
    )
}