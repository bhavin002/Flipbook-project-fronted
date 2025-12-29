import SAMPLE_FONTS from '@/data/sampleFonts';

class DynamicFontManager {
    constructor() {
        this.loadedFonts = new Set();
        this.loadingFonts = new Set();
        this.fontCache = new Map();
        this.injectedLinks = new Set();
        this.fonts = [...SAMPLE_FONTS];
    }

    getAllFonts() {
        return this.fonts.sort((a, b) => a.name.localeCompare(b.name));
    }

    getFontById(fontId) {
        return this.fonts.find(font => font.id === fontId) || null;
    }

    searchFonts(query) {
        const lowercaseQuery = query.toLowerCase();
        return this.fonts
            .filter(font => 
                font.name.toLowerCase().includes(lowercaseQuery) ||
                font.family.toLowerCase().includes(lowercaseQuery)
            )
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    isFontLoaded(fontId) {
        return this.loadedFonts.has(fontId);
    }

    isFontLoading(fontId) {
        return this.loadingFonts.has(fontId);
    }

    async loadFontById(fontId) {
        const font = this.getFontById(fontId);
        if (!font) {
            console.error(`Font with ID ${fontId} not found`);
            return false;
        }

        if (this.isFontLoaded(fontId)) {
            return true;
        }

        if (this.isFontLoading(fontId)) {
            return new Promise((resolve) => {
                const checkLoading = () => {
                    if (!this.isFontLoading(fontId)) {
                        resolve(this.isFontLoaded(fontId));
                    } else {
                        setTimeout(checkLoading, 100);
                    }
                };
                checkLoading();
            });
        }

        this.loadingFonts.add(fontId);

        try {
            await this.loadGoogleFont(font);
            this.loadedFonts.add(fontId);
            this.loadingFonts.delete(fontId);
            return true;
        } catch (error) {
            console.error(`Error loading font ${fontId}:`, error);
            this.loadingFonts.delete(fontId);
            return false;
        }

        this.loadingFonts.delete(fontId);
        return false;
    }

    async loadGoogleFont(font) {
        if (this.injectedLinks.has(font.url)) {
            return;
        }

        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = font.url;
            link.onload = () => {
                this.injectedLinks.add(font.url);
                resolve();
            };
            link.onerror = () => {
                reject(new Error(`Failed to load Google Font: ${font.name}`));
            };
            document.head.appendChild(link);
        });
    }

    async loadFontsByIds(fontIds) {
        const results = {
            loaded: [],
            failed: [],
            alreadyLoaded: []
        };

        const loadPromises = fontIds.map(async (fontId) => {
            if (this.isFontLoaded(fontId)) {
                results.alreadyLoaded.push(fontId);
                return;
            }

            const success = await this.loadFontById(fontId);
            if (success) {
                results.loaded.push(fontId);
            } else {
                results.failed.push(fontId);
            }
        });

        await Promise.all(loadPromises);
        return results;
    }

    async preloadFonts(fontIds) {
        return this.loadFontsByIds(fontIds);
    }

    getFontFamily(fontId) {
        const font = this.getFontById(fontId);
        return font ? font.family : 'Arial';
    }

    getFontPreview(fontId) {
        const font = this.getFontById(fontId);
        return font ? font.preview : null;
    }



    generateFontFamily(fontId, fallbacks = ['Arial', 'sans-serif']) {
        const font = this.getFontById(fontId);
        if (!font) return fallbacks.join(', ');
        
        return `"${font.family}", ${fallbacks.join(', ')}`;
    }

    async waitForFont(fontId, timeout = 5000) {
        const startTime = Date.now();
        
        while (Date.now() - startTime < timeout) {
            if (this.isFontLoaded(fontId)) {
                return true;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        return false;
    }

    getLoadingStatus(fontIds) {
        return {
            loaded: fontIds.filter(id => this.isFontLoaded(id)),
            loading: fontIds.filter(id => this.isFontLoading(id)),
            notLoaded: fontIds.filter(id => !this.isFontLoaded(id) && !this.isFontLoading(id))
        };
    }

    clearCache() {
        this.loadedFonts.clear();
        this.loadingFonts.clear();
        this.fontCache.clear();
        this.injectedLinks.clear();
    }


}

const fontManager = new DynamicFontManager();

export default fontManager;

export const {
    getAllFonts,
    getFontById,
    searchFonts,
    isFontLoaded,
    isFontLoading,
    loadFontById,
    loadFontsByIds,
    preloadFonts,
    getFontFamily,
    getFontPreview,
    generateFontFamily,
    waitForFont,
    getLoadingStatus,
    clearCache
} = fontManager;

