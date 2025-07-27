import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import BookShelfView from "../BookShelfView";
import { Info, Plus, Trash2, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import SelectLogoDialog from "@/components/AppLayoutComponents/Sidebar/Setting/Workspace/SelectLogoDialog";
import { BackgroundImageType, BackgroundColorType } from "@/utils/enum.js";
import { getBookShelfPreviewSetting, updateBookShelfPreviewSetting } from "@/service/bookshelfPreviewSetting.service";
import { toast } from "sonner";
import { z } from "zod";

const urlSchema = z.string().regex(/^$|^(?!https?\.)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$|^https?:\/\/[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/).or(z.literal(''));

export default function Customize({ flipbookId }) {
    const [bookshelfSettings, setBookshelfSettings] = useState({
        bookshelfName: 'New shelf',
        bookshelfColor: '#ffffff',
        backgroundColorHash: '#5b21b6',
        selectedBackground: 'transparent',
        backgroundImage: null,
        backgroundImageFile: null,
        backgroundImageType: 'scale-crop',
        selectedPaletteColor: null,
        selectedLogo: null,
        logoLink: '',
        thumbnailSize: 200,
        openInNewTab: false,
        allowSearch: false,
        showFlipbookName: false,
        isImageUploading: false,
        isLogoLoading: false,
        isLoading: false,
        isSaving: false
    });

    const colorPickerRef = useRef(null);
    const paletteColorPickerRef = useRef(null);

    const updateSetting = (key, value) => {
        setBookshelfSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const updateMultipleSettings = (updates) => {
        setBookshelfSettings(prev => ({
            ...prev,
            ...updates
        }));
    };

    useEffect(() => {
        loadBookshelfSettings();
    }, [flipbookId]);

    const loadBookshelfSettings = async () => {
        if (!flipbookId) return;

        try {
            updateSetting('isLoading', true);
            const response = await getBookShelfPreviewSetting(flipbookId);
            const settings = response.data;

            const updates = {
                bookshelfName: settings.name || 'New shelf',
                bookshelfColor: settings.bookshelfColorHash || '#ffffff',
                backgroundColorHash: settings.backgroundColorHash || '#5b21b6',
                logoLink: settings.logoLink || '',
                thumbnailSize: settings.setThumbnailSize || 200,
                openInNewTab: settings.openInNewTab || false,
                allowSearch: settings.allowSearch || false,
                showFlipbookName: settings.showFlipbookName || false
            };

            const bgType = settings.backgroundColor;
            if (bgType === BackgroundColorType.TRANSPARENT) {
                updates.selectedBackground = 'transparent';
            } else if (bgType === BackgroundColorType.SOLID) {
                updates.selectedBackground = 'solidcolor';
                updates.selectedPaletteColor = settings.backgroundColorHash;
            } else if (bgType === BackgroundColorType.IMAGE) {
                updates.selectedBackground = 'uploadimage';
                updates.backgroundImage = settings.backgroundImageURL;
            }

            if (settings.backgroundImageType !== undefined) {
                const imageTypeMap = {
                    [BackgroundImageType.SCALE_CROP]: 'scale-crop',
                    [BackgroundImageType.CENTER]: 'center',
                    [BackgroundImageType.TILE]: 'tile'
                };
                updates.backgroundImageType = imageTypeMap[settings.backgroundImageType] || 'scale-crop';
            }

            if (settings.brandLogoId && settings.brandLogoLink) {
                updates.selectedLogo = {
                    id: settings.brandLogoId,
                    src: settings.brandLogoLink
                };
            }

            updateMultipleSettings(updates);
        } catch (error) {
            toast.error('Failed to load bookshelf settings', {
                description: error.message
            });
        } finally {
            updateSetting('isLoading', false);
        }
    };

    const handleSaveChanges = async () => {
        if (!flipbookId) {
            toast.error('Flipbook ID is required');
            return;
        }

        try {
            updateSetting('isSaving', true);

            const formData = new FormData();
            const {
                bookshelfName,
                bookshelfColor,
                backgroundColorHash,
                selectedBackground,
                selectedPaletteColor,
                thumbnailSize,
                openInNewTab,
                allowSearch,
                showFlipbookName,
                logoLink,
                backgroundImageType,
                backgroundImageFile,
                selectedLogo
            } = bookshelfSettings;

            formData.append('name', bookshelfName);
            formData.append('bookshelfColorHash', bookshelfColor);
            formData.append('backgroundColorHash', selectedBackground === 'solidcolor' ? (selectedPaletteColor || backgroundColorHash) : backgroundColorHash);
            formData.append('setThumbnailSize', parseInt(thumbnailSize));
            formData.append('openInNewTab', openInNewTab);
            formData.append('allowSearch', allowSearch);
            formData.append('showFlipbookName', showFlipbookName);
            formData.append('logoLink', logoLink);

            if (selectedBackground === 'transparent') {
                formData.append('backgroundColor', BackgroundColorType.TRANSPARENT);
            } else if (selectedBackground === 'solidcolor') {
                formData.append('backgroundColor', BackgroundColorType.SOLID);
            } else if (selectedBackground === 'uploadimage') {
                formData.append('backgroundColor', BackgroundColorType.IMAGE);
                const imageTypeMap = {
                    'scale-crop': BackgroundImageType.SCALE_CROP,
                    'center': BackgroundImageType.CENTER,
                    'tile': BackgroundImageType.TILE
                };
                formData.append('backgroundImageType', imageTypeMap[backgroundImageType]);

                if (backgroundImageFile) {
                    formData.append('backgroundImage', backgroundImageFile);
                }
            }

            if (selectedLogo) {
                formData.append('brandLogoId', selectedLogo.id);
            }

            const response = await updateBookShelfPreviewSetting(flipbookId, formData);

            toast.success('Bookshelf settings', {
                description: response.message
            });
        } catch (error) {
            toast.error('Failed to save bookshelf settings', {
                description: error.message
            });
        } finally {
            updateSetting('isSaving', false);
        }
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
            updates.selectedPaletteColor = null;
        }
        if (value !== 'uploadimage') {
            updates.backgroundImage = null;
        }

        updateMultipleSettings(updates);
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            updateSetting('isImageUploading', true);
            const imageUrl = URL.createObjectURL(file);
            updateMultipleSettings({
                backgroundImage: imageUrl,
                backgroundImageFile: file
            });
        } catch (error) {
            toast.error("Failed to upload background image", {
                description: error.message || "Oops! Something went wrong."
            });
        } finally {
            updateSetting('isImageUploading', false);
        }
    };

    const handleImageDelete = async () => {
        try {
            updateMultipleSettings({
                backgroundImage: null,
                backgroundImageFile: null
            });
        } catch (error) {
            toast.error("Failed to remove background image", {
                description: error.message || "Oops! Something went wrong."
            });
        }
    };

    const handlePaletteColorSelect = (color) => {
        updateSetting('selectedPaletteColor', color);
    };

    const handlePaletteColorPickerChange = (e) => {
        const color = e.target.value.toUpperCase();
        updateSetting('selectedPaletteColor', color);
    };

    const handleAddCustomColor = () => {
        paletteColorPickerRef.current?.click();
    };

    const handleLogoSelect = (logo) => {
        updateSetting('selectedLogo', logo);
    };

    const handleLogoDelete = async () => {
        try {
            updateSetting('isLogoLoading', true);
            updateSetting('selectedLogo', null);
        } catch (error) {
            console.error("Failed to remove logo", error);
        } finally {
            updateSetting('isLogoLoading', false);
        }
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

    const renderBackgroundContent = () => {
        const { selectedBackground, selectedPaletteColor, backgroundImage, isImageUploading, backgroundImageType } = bookshelfSettings;

        switch (selectedBackground) {
            case 'solidcolor':
                return (
                    <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Label>Brand Colors</Label>
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
                                            <p className="text-sm">Select from brand colors</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div className="flex gap-2">
                                {['#808080', '#A9A9A9'].map((color, index) => (
                                    <div
                                        key={index}
                                        className={`w-8 h-8 rounded cursor-pointer hover:ring-2 hover:ring-blue-500 ${selectedPaletteColor === color ? 'ring-2 ring-blue-500' : 'border'
                                            }`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => handlePaletteColorSelect(color)}
                                    />
                                ))}
                            </div>
                        </div>
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
                                        className={`w-8 h-8 rounded cursor-pointer hover:ring-2 hover:ring-blue-500 ${selectedPaletteColor === color ? 'ring-2 ring-blue-500' : 'border'
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
                                            <SelectTrigger className="w-[150px]">
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
        isLoading,
        isSaving
    } = bookshelfSettings;

    return (
        <div className="py-6 max-w-[100vw] overflow-auto space-y-4 h-full flex flex-col">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Customize</h1>
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
                                    <Label>Set thumbnails size</Label>
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
                                                <p className="text-sm">Set the size of book thumbnails</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <Input
                                    id="thumbnail-size"
                                    type="number"
                                    value={thumbnailSize}
                                    onChange={(e) => updateSetting('thumbnailSize', e.target.value)}
                                    className="w-24"
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
                                onClick={handleSaveChanges}
                                disabled={isSaving || isLoading}
                                className="flex items-center gap-2"
                            >
                                {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                                {isSaving ? 'Saving...' : 'Save changes'}
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