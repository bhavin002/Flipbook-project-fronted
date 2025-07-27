import { createContext, useContext, useState, useEffect } from 'react';
import { getBookShelfPreviewSetting, updateBookShelfPreviewSetting } from '@/service/bookshelfPreviewSetting.service';
import { BackgroundImageType, BackgroundColorType } from '@/utils/enum.js';
import { toast } from 'sonner';

const BookshelfContext = createContext();

export const useBookshelf = () => {
    const context = useContext(BookshelfContext);
    if (!context) {
        throw new Error('useBookshelf must be used within a BookshelfProvider');
    }
    return context;
};

export const BookshelfProvider = ({ children, flipbookId }) => {
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

    const saveBookshelfSettings = async () => {
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

    useEffect(() => {
        loadBookshelfSettings();
    }, [flipbookId]);

    const value = {
        bookshelfSettings,
        updateSetting,
        updateMultipleSettings,
        loadBookshelfSettings,
        saveBookshelfSettings,
        handleImageUpload,
        handleImageDelete,
        handleLogoSelect,
        handleLogoDelete
    };

    return (
        <BookshelfContext.Provider value={value}>
            {children}
        </BookshelfContext.Provider>
    );
}; 