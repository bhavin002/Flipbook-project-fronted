import { Label } from "@/components/ui/label";
import { Info, Trash2 } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import SelectLogoDialog from "../AppLayoutComponents/Sidebar/Setting/Workspace/SelectLogoDialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState, useEffect, useRef } from "react";
import ColorPaletteSelector from "./Branding/ColorPaletteSelector";
import { Button } from '@/components/ui/button';
import { useFlipbookPreviewSettings } from "@/hooks/useFlipbookPreviewSettings";
import { toast } from "sonner";
import { BackgroundColorType, BackgroundImageType } from "@/utils/enum";
import { z } from "zod";
import { useFlipbookSettings } from "@/context/FlipbookSettingsProvider";

const urlSchema = z.string().url();
const colorSchema = z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid 6-character hex color code");

export default function Branding() {
    const { settings, updateSettings, latestSettings } = useFlipbookSettings();
    const { isFieldEnabled } = useFlipbookPreviewSettings();
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [selectedBackground, setSelectedBackground] = useState("transparent");
    const [playerAccentColor, setPlayerAccentColor] = useState('#C1080B');
    const [originalPlayerAccentColor, setOriginalPlayerAccentColor] = useState('#C1080B');
    const [hasColorChanged, setHasColorChanged] = useState(false);
    const [selectedLogo, setSelectedLogo] = useState(null);
    const [isLogoLoading, setIsLogoLoading] = useState(false);
    const [logoLink, setLogoLink] = useState("");

    const [backgroundImage, setBackgroundImage] = useState(null);
    const [backgroundImageType, setBackgroundImageType] = useState("scale-crop");
    const [isImageUploading, setIsImageUploading] = useState(false);

    const colorPickerRef = useRef(null);

    const backgroundColorMapping = {
        [BackgroundColorType.TRANSPARENT]: "transparent",
        [BackgroundColorType.SOLID]: "solidcolor",
        [BackgroundColorType.IMAGE]: "uploadimage"
    };

    const reverseBackgroundColorMapping = {
        "transparent": BackgroundColorType.TRANSPARENT,
        "solidcolor": BackgroundColorType.SOLID,
        "uploadimage": BackgroundColorType.IMAGE
    };

    const backgroundImageTypeMapping = {
        [BackgroundImageType.SCALE_CROP]: "scale-crop",
        [BackgroundImageType.CENTER]: "center",
        [BackgroundImageType.TILE]: "tile"
    };

    const reverseBackgroundImageTypeMapping = {
        "scale-crop": BackgroundImageType.SCALE_CROP,
        "center": BackgroundImageType.CENTER,
        "tile": BackgroundImageType.TILE
    };

    const isValidUrl = (url) => {
        try {
            const urlToValidate = url.startsWith('http') ? url : `https://${url}`;
            urlSchema.parse(urlToValidate);
            return true;
        } catch {
            return false;
        }
    };

    const isValidColor = (color) => {
        try {
            colorSchema.parse(color);
            return true;
        } catch {
            return false;
        }
    };

    const formatUrl = (url) => {
        if (!url) return "";
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        return `https://${url}`;
    };

    useEffect(() => {
        const dataToUse = isFirstLoad ? latestSettings : settings;
        
        if (dataToUse) {
            const accentColor = dataToUse.playerAccentColorHash?.toUpperCase() || '#C1080B';
            setSelectedBackground(backgroundColorMapping[dataToUse.backgroundColor] || "transparent");
            setPlayerAccentColor(accentColor);
            setOriginalPlayerAccentColor(accentColor);
            setSelectedLogo(
                dataToUse.brandLogoId ? { src: dataToUse.brandLogoLink, id: dataToUse.brandLogoId } : null
            );
            setLogoLink(dataToUse.logoLink || "");
            setHasColorChanged(false);

            setBackgroundImage(dataToUse.backgroundImageURL || null);
            setBackgroundImageType(backgroundImageTypeMapping[dataToUse.backgroundImageType] || "scale-crop");

            if (isFirstLoad) {
                setIsFirstLoad(false);
            }
        }
    }, [settings]);

    const handleLogoSelect = (logo) => {
        setSelectedLogo(logo);
        updateSettings({ brandLogoId: logo.id });
    };

    const handleLogoDelete = async () => {
        try {
            setIsLogoLoading(true);
            updateSettings({ brandLogoId: null });
            setSelectedLogo(null);
        } catch (error) {
            toast.error("Failed to remove logo", { description: error.message });
        } finally {
            setIsLogoLoading(false);
        }
    };

    const handleBackgroundChange = (value) => {
        setSelectedBackground(value);
        updateSettings({ backgroundColor: reverseBackgroundColorMapping[value] });

        if (value !== "uploadimage" && backgroundImage) {
            updateSettings({ backgroundImage: null });
            setBackgroundImage(null);
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            setIsImageUploading(true);
            const formData = new FormData();
            formData.append('backgroundImage', file);
            updateSettings({ backgroundImage: file });
        } catch (error) {
            toast.error("Failed to upload background image", { description: error.message });
        } finally {
            setIsImageUploading(false);
        }
    };

    const handleImageDelete = async () => {
        try {
            updateSettings({ backgroundImage: null });
            setBackgroundImage(null);
        } catch (error) {
            toast.error("Failed to remove background image", { description: error.message });
        }
    };

    const handleBackgroundImageTypeChange = (value) => {
        setBackgroundImageType(value);
        const numericValue = reverseBackgroundImageTypeMapping[value];
        updateSettings({ backgroundImageType: numericValue });
    };

    const handlePlayerAccentColorChange = (e) => {
        let value = e.target.value.toUpperCase();
        if (!value.startsWith('#')) {
            value = '#' + value.replace(/[^0-9A-Fa-f]/g, '');
        } else {
            value = '#' + value.slice(1).replace(/[^0-9A-Fa-f]/g, '');
        }
        value = value.slice(0, 7);
        setPlayerAccentColor(value);

        if (isValidColor(value) && value !== originalPlayerAccentColor) {
            setHasColorChanged(true);
            updateSettings({ playerAccentColorHash: value });
        } else {
            setHasColorChanged(value !== originalPlayerAccentColor);
        }
    };

    const handleColorPickerChange = (e) => {
        const value = e.target.value.toUpperCase();
        setPlayerAccentColor(value);

        if (value !== originalPlayerAccentColor) {
            setHasColorChanged(true);
            updateSettings({ playerAccentColorHash: value });
        } else {
            setHasColorChanged(false);
        }
    };

    const handleColorSwatchClick = () => {
        if (isFieldEnabled("playerAccentColorHash")) {
            colorPickerRef.current?.click();
        }
    };

    const handleRevertColor = () => {
        setPlayerAccentColor(originalPlayerAccentColor);
        setHasColorChanged(false);
        updateSettings({ playerAccentColorHash: originalPlayerAccentColor });
    };

    const handleLogoLinkChange = (e) => {
        const value = e.target.value;
        setLogoLink(value);

        if (value && isValidUrl(value)) {
            const formattedUrl = formatUrl(value);
            updateSettings({ logoLink: formattedUrl });
            if (formattedUrl !== value) {
                setLogoLink(formattedUrl);
            }
        }
    };

    const handleLogoLinkBlur = (e) => {
        const value = e.target.value;
        if (value && !value.startsWith('http')) {
            const formattedUrl = formatUrl(value);
            setLogoLink(formattedUrl);
            if (isValidUrl(formattedUrl)) {
                updateSettings({ logoLink: formattedUrl });
            }
        } else if (value && isValidUrl(value)) {
            const formattedUrl = formatUrl(value);
            updateSettings({ logoLink: formattedUrl });
        }
    };

    const renderBackgroundContent = (selectedBackground) => {
        switch (selectedBackground) {
            case "solidcolor":
                return <ColorPaletteSelector
                    disabled={!isFieldEnabled("backgroundColor")}
                    onChange={(color) => updateSettings({ backgroundColorHash: color })}
                />
            case "uploadimage":
                return (
                    <div className="space-y-4">
                        {!backgroundImage ? (
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="background-image-upload"
                                    disabled={!isFieldEnabled("backgroundColor") || isImageUploading}
                                />
                                <label htmlFor="background-image-upload">
                                    <Button
                                        variant="outline"
                                        disabled={!isFieldEnabled("backgroundColor") || isImageUploading}
                                        asChild
                                    >
                                        <span className="cursor-pointer">
                                            {isImageUploading ? "Uploading..." : "Upload image"}
                                        </span>
                                    </Button>
                                </label>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="flex items-center gap-4 w-full">
                                    <div className="relative w-20 h-16 bg-white border rounded overflow-hidden">
                                        <img
                                            src={backgroundImage}
                                            alt="Background"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="background-image-replace"
                                            disabled={!isFieldEnabled("backgroundColor") || isImageUploading}
                                        />
                                        <p className="text-sm text-white w-[160px] truncate">{settings?.backgroundImageName}</p>
                                        <Select
                                            value={backgroundImageType}
                                            onValueChange={handleBackgroundImageTypeChange}
                                            disabled={!isFieldEnabled("backgroundColor")}
                                        >
                                            <SelectTrigger id="background-image-style" className="w-[200px] text-white">
                                                <SelectValue placeholder="Select style" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="scale-crop">Scale-crop</SelectItem>
                                                    <SelectItem value="center">Center</SelectItem>
                                                    <SelectItem value="tile">Tile</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={handleImageDelete}
                                            className="h-8 w-8"
                                            disabled={!isFieldEnabled("backgroundColor")}
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className="space-y-4">
                {selectedLogo ? (
                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-12 bg-white border rounded overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-center bg-repeat opacity-20"
                                    style={{ backgroundImage: 'url(https://cdn.flipsnack.com/site/images/transparent-bg-pattern.png)' }}
                                />
                                <img
                                    src={selectedLogo.src}
                                    alt="Logo"
                                    className="w-full h-full object-contain relative z-10"
                                />
                            </div>
                            <div className="flex gap-2 items-center">
                                {isFieldEnabled("brandLogoId") ? (
                                    <SelectLogoDialog onLogoSelect={handleLogoSelect} mode="replace" />
                                ) : (
                                    <Button variant="outline" className="text-primary" disabled={true}>Replace logo</Button>
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
                    type="url"
                    id="logo-link"
                    placeholder="https://feedspace.com/example"
                    value={logoLink}
                    onChange={handleLogoLinkChange}
                    onBlur={handleLogoLinkBlur}
                    className={`placeholder:text-[#d8dce3] ${logoLink && !isValidUrl(logoLink) ? 'border-red-500' : ''}`}
                    disabled={!isFieldEnabled("logoLink")}
                />
            </div>
            <div className="flex flex-col gap-2 text-white">
                <Label htmlFor="background-color" className="text-sm font-medium leading-none">
                    Background color
                </Label>
                <Select
                    value={selectedBackground}
                    onValueChange={handleBackgroundChange}
                    disabled={!isFieldEnabled("backgroundColor")}
                >
                    <SelectTrigger id="background-color">
                        <SelectValue placeholder="Select background type" />
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
                    onChange={handlePlayerAccentColorChange}
                    className={`${playerAccentColor && !isValidColor(playerAccentColor) ? 'border-red-500' : ''}`}
                    disabled={!isFieldEnabled("playerAccentColorHash")}
                    placeholder="#C1080B"
                />
                <div className='flex gap-4 items-center'>
                    <div className='relative'>
                        <div
                            className={`w-8 h-8 rounded cursor-pointer ${!isFieldEnabled("playerAccentColorHash") ? 'cursor-not-allowed opacity-50' : ''
                                }`}
                            style={{ backgroundColor: playerAccentColor }}
                            onClick={handleColorSwatchClick}
                        />
                        <input
                            ref={colorPickerRef}
                            type="color"
                            value={playerAccentColor}
                            onChange={handleColorPickerChange}
                            className="opacity-0 absolute w-1 h-1 left-0 right-0 m-auto bottom-0"
                            disabled={!isFieldEnabled("playerAccentColorHash")}
                        />
                    </div>
                    <Button
                        variant="ghost"
                        disabled={!isFieldEnabled("playerAccentColorHash") || !hasColorChanged}
                        onClick={handleRevertColor}
                    >
                        Revert
                    </Button>
                </div>
            </div>
        </>
    );
}