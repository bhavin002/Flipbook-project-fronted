import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import BookShelfView from "../BookShelfView";
import { Info, Plus, Trash2, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import SelectLogoDialog from "@/components/AppLayoutComponents/Sidebar/Setting/Workspace/SelectLogoDialog";
import { useBookshelf } from "@/context/BookshelfContext";
import { z } from "zod";
import LoadingButton from "@/utils/LoadingButton";
import BrandColors from "@/utils/BrandColors";

const urlSchema = z.string().regex(/^$|^(?!https?\.)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$|^https?:\/\/[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/).or(z.literal(''));

export default function Customize({ flipbookId }) {
    const {
        bookshelfSettings,
        updateSetting,
        updateMultipleSettings,
        saveBookshelfSettings,
        handleImageUpload,
        handleImageDelete,
        handleLogoSelect,
        handleLogoDelete
    } = useBookshelf();

    const colorPickerRef = useRef(null);
    const paletteColorPickerRef = useRef(null);
    const [thumbnailSizeError, setThumbnailSizeError] = useState(false);

    const isValidUrl = (url) => {
        try {
            const urlToValidate = url.startsWith('http') ? url : `https://${url}`;
            urlSchema.parse(urlToValidate);
            return true;
        } catch {
            return false;
        }
    };

    const handleColorPickerChange = (e) => {
        const value = e.target.value.toUpperCase();
        updateSetting('bookshelfColor', value);
    };

    const handleColorSwatchClick = () => {
        colorPickerRef.current?.click();
    };

    const handleColorInputChange = (e) => {
        const value = e.target.value;
        updateSetting('bookshelfColor', value);
    };

    const handleBackgroundChange = (value) => {
        const updates = { selectedBackground: value };

        if (value !== 'solidcolor') {
            updates.backgroundColorHash = '#ffffff';
        }
        if (value !== 'uploadimage') {
            updates.backgroundImage = null;
        }

        updateMultipleSettings(updates);
    };

    const handlePaletteColorSelect = (color) => {
        updateSetting('backgroundColorHash', color);
    };

    const handlePaletteColorPickerChange = (e) => {
        const color = e.target.value.toUpperCase();
        updateSetting('backgroundColorHash', color);
    };

    const handleAddCustomColor = () => {
        paletteColorPickerRef.current?.click();
    };

    const handleLogoLinkChange = (e) => {
        updateSetting('logoLink', e.target.value);
    };

    const formatUrl = (url) => {
        if (!url) return "";
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        return `https://${url}`;
    };

    const handleLogoLinkBlur = (e) => {
        const value = e.target.value;
        if (value) {
            const formattedUrl = formatUrl(value);
            if (isValidUrl(formattedUrl)) {
                updateSetting('logoLink', formattedUrl);
            }
        }
    };

    const handleThumbnailSizeChange = (e) => {
        const value = e.target.value;
        const parsedValue = parseInt(value, 10);
        if (value === '' || isNaN(parsedValue) || parsedValue < 100 || parsedValue > 300) {
            setThumbnailSizeError(true);
            updateSetting('thumbnailSize', value);
        } else {
            setThumbnailSizeError(false);
            updateSetting('thumbnailSize', parsedValue);
        }
    };

    const renderBackgroundContent = () => {
        const { selectedBackground, backgroundColorHash, backgroundImage, isImageUploading, backgroundImageType } = bookshelfSettings;

        switch (selectedBackground) {
            case 'solidcolor':
                return (
                    <div className="space-y-4 mt-4">
                        <BrandColors handlePaletteColorSelect={handlePaletteColorSelect} selectedColor={backgroundColorHash} />
                        <div className="space-y-2">
                            <Label>Default Palette</Label>
                            <div className="flex flex-wrap gap-2">
                                <div className="relative">
                                    <div
                                        onClick={handleAddCustomColor}
                                        className="w-8 h-8 rounded cursor-pointer hover:ring-2 hover:ring-blue-500 bg-gray-500 flex items-center justify-center border"
                                    >
                                        <Plus className="h-4 w-4 text-white" />
                                    </div>
                                    <input
                                        ref={paletteColorPickerRef}
                                        type="color"
                                        onChange={handlePaletteColorPickerChange}
                                        className="opacity-0 absolute w-1 h-1 left-0 right-0 m-auto bottom-0"
                                    />
                                </div>
                                {[
                                    '#1E2A35', '#2F4353', '#3C4A5F', '#4B5C6B', '#5A6C7A', '#697C88', '#788C96', '#879BA4',
                                    '#4B8BA4', '#44A69C', '#5DC48E', '#C0C0C0', '#B0E0E6', '#B3E5B3', '#F0E68C', '#F5B4B4', '#F08080'
                                ].map((color, index) => (
                                    <div
                                        key={index}
                                        className={`w-8 h-8 rounded cursor-pointer hover:ring-2 hover:ring-blue-500 ${backgroundColorHash === color ? 'ring-2 ring-blue-500' : ''
                                            }`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => handlePaletteColorSelect(color)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'uploadimage':
                return (
                    <div className="space-y-4 mt-4">
                        {!backgroundImage && !isImageUploading ? (
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="background-image-upload"
                                />
                                <label htmlFor="background-image-upload">
                                    <Button variant="outline" className="text-primary" asChild>
                                        <span className="cursor-pointer">
                                            {isImageUploading ? 'Uploading...' : 'Upload image'}
                                        </span>
                                    </Button>
                                </label>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
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
                                        />
                                        <Select
                                            value={backgroundImageType}
                                            onValueChange={(value) => updateSetting('backgroundImageType', value)}
                                        >
                                            <SelectTrigger className="w-[100px]">
                                                <SelectValue placeholder="Select style" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="scale-crop">Scale-crop</SelectItem>
                                                <SelectItem value="center">Center</SelectItem>
                                                <SelectItem value="tile">Tile</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={handleImageDelete}
                                            className="h-8 w-8"
                                        >
                                            <Trash2 className="h-4 w-4" />
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

    const {
        bookshelfName,
        bookshelfColor,
        selectedBackground,
        selectedLogo,
        logoLink,
        thumbnailSize,
        openInNewTab,
        allowSearch,
        showFlipbookName,
        isLogoLoading,
    } = bookshelfSettings;

    return (
        <div className="py-6 max-w-[100vw] overflow-auto space-y-4 h-full flex flex-col">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Customize <span className="text-primary">{bookshelfName || "New Flipbook"}</span></h1>
                <p className="text-gray-500">Choose your width and height size, responsiveness and the page where your flipbook should start. Copy the embed code and paste it in your website.</p>
            </div>
            <div className="flex max-lg:flex-wrap gap-4">
                <div className="lg:w-[40%] w-full lg:block space-y-4 lg:h-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customize your bookshelf</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="bookshelf-name">
                                    Bookshelf name
                                </Label>
                                <Input
                                    id="bookshelf-name"
                                    placeholder="New shelf"
                                    value={bookshelfName}
                                    onChange={(e) => updateSetting('bookshelfName', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Label>Logo</Label>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Info className="h-4 w-4 text-gray-400" />
                                            </TooltipTrigger>
                                            <TooltipContent
                                                side="right"
                                                align="center"
                                                className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
                                            >
                                                <p className="text-sm">Upload a logo for your bookshelf</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
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
                                                <SelectLogoDialog
                                                    onLogoSelect={handleLogoSelect}
                                                    mode="replace"
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={handleLogoDelete}
                                                    className="h-8 w-8"
                                                    disabled={isLogoLoading}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="logo-link">Add a link to your logo</Label>
                                            <Input
                                                id="logo-link"
                                                type="url"
                                                value={logoLink}
                                                onChange={handleLogoLinkChange}
                                                onBlur={handleLogoLinkBlur}
                                                className={`placeholder:text-[#d8dce3] ${logoLink && !isValidUrl(logoLink) ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''} w-full`}
                                                placeholder="Enter logo link URL"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <SelectLogoDialog
                                            onLogoSelect={handleLogoSelect}
                                            mode="select"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Background</Label>
                                <Select value={selectedBackground} onValueChange={handleBackgroundChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select background" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="transparent">Transparent</SelectItem>
                                        <SelectItem value="solidcolor">Solid colors</SelectItem>
                                        <SelectItem value="uploadimage">Upload image</SelectItem>
                                    </SelectContent>
                                </Select>
                                {renderBackgroundContent()}
                            </div>

                            <div className="space-y-2">
                                <Label>Bookshelf color</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="text"
                                        value={bookshelfColor}
                                        onChange={handleColorInputChange}
                                        className="flex-1"
                                        placeholder="#ffffff"
                                    />
                                    <div className="relative">
                                        <div
                                            className="w-10 h-10 rounded border cursor-pointer"
                                            style={{ backgroundColor: bookshelfColor }}
                                            onClick={handleColorSwatchClick}
                                        />
                                        <input
                                            ref={colorPickerRef}
                                            type="color"
                                            value={bookshelfColor}
                                            onChange={handleColorPickerChange}
                                            className="opacity-0 absolute w-1 h-1 left-0 right-0 m-auto bottom-0"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="thumbnail-size">Set thumbnails size</Label>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Info className="h-4 w-4 text-gray-400" />
                                            </TooltipTrigger>
                                            <TooltipContent
                                                side="right"
                                                align="center"
                                                className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
                                            >
                                                <p className="text-sm">Set the size of book thumbnails (100-300)</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <Input
                                    id="thumbnail-size"
                                    type="number"
                                    value={thumbnailSize}
                                    onChange={handleThumbnailSizeChange}
                                    min={100}
                                    max={300}
                                    className={`w-24 ${thumbnailSizeError ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}`}
                                    required
                                />
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className="flex items-center gap-2">
                                    <Switch
                                        id="open-flipbooks"
                                        checked={openInNewTab}
                                        onCheckedChange={(checked) => updateSetting('openInNewTab', checked)}
                                    />
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="open-flipbooks">
                                            Open flipbooks in new tab
                                        </Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-gray-400" />
                                                </TooltipTrigger>
                                                <TooltipContent
                                                    side="right"
                                                    align="center"
                                                    className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
                                                >
                                                    <p className="text-sm">Open flipbooks in a new browser tab</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Switch
                                        id="allow-searching"
                                        checked={allowSearch}
                                        onCheckedChange={(checked) => updateSetting('allowSearch', checked)}
                                    />
                                    <Label htmlFor="allow-searching">
                                        Allow searching in bookshelf
                                    </Label>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Switch
                                        id="show-flipbook-name"
                                        checked={showFlipbookName}
                                        onCheckedChange={(checked) => updateSetting('showFlipbookName', checked)}
                                    />
                                    <Label htmlFor="show-flipbook-name">
                                        Show flipbook name on mouse hover
                                    </Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:w-[60%] w-full sticky top-[-22px] h-fit">
                    <Card className="pt-6">
                        <CardContent className="p-0 m-6 mt-0 space-y-4 rounded-sm">
                            <Button
                                onClick={saveBookshelfSettings}
                                disabled={bookshelfSettings.isSaving || bookshelfSettings.isLoading || thumbnailSizeError}
                                className="flex items-center gap-2"
                            >
                                {bookshelfSettings.isSaving ? <LoadingButton /> : 'Save changes'}
                            </Button>
                            <div className="px-6 py-4 border">
                                <div className="h-48 md:h-96 w-full">
                                    <BookShelfView id={flipbookId} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}