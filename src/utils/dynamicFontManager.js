/**
 * Dynamic Font Manager
 * Handles font loading by ID, injection via script/link tags, and font management
 */

import { SAMPLE_FONTS, SYSTEM_FONTS, FONT_CATEGORIES } from '@/data/sampleFonts';

class DynamicFontManager {
    constructor() {
        this.loadedFonts = new Set();
        this.loadingFonts = new Set();
        this.fontCache = new Map();
        this.injectedLinks = new Set();
        this.fonts = [...SAMPLE_FONTS, ...SYSTEM_FONTS];
    }

    /**
     * Get all available fonts
     * @returns {Array} Array of font objects sorted alphabetically
     */
    getAllFonts() {
        return this.fonts.sort((a, b) => a.name.localeCompare(b.name));
    }

    /**
     * Get font by ID
     * @param {string} fontId - Font ID
     * @returns {Object|null} Font object or null if not found
     */
    getFontById(fontId) {
        return this.fonts.find(font => font.id === fontId) || null;
    }

    /**
     * Get fonts by category
     * @param {string} category - Font category
     * @returns {Array} Array of fonts in category sorted alphabetically
     */
    getFontsByCategory(category) {
        if (category === 'all') return this.fonts.sort((a, b) => a.name.localeCompare(b.name));
        return this.fonts
            .filter(font => font.category === category)
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    /**
     * Search fonts by name or tags
     * @param {string} query - Search query
     * @returns {Array} Array of matching fonts sorted alphabetically
     */
    searchFonts(query) {
        const lowercaseQuery = query.toLowerCase();
        return this.fonts
            .filter(font => 
                font.name.toLowerCase().includes(lowercaseQuery) ||
                font.family.toLowerCase().includes(lowercaseQuery) ||
                font.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
            )
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    /**
     * Check if font is loaded
     * @param {string} fontId - Font ID
     * @returns {boolean} Whether font is loaded
     */
    isFontLoaded(fontId) {
        return this.loadedFonts.has(fontId);
    }

    /**
     * Check if font is currently loading
     * @param {string} fontId - Font ID
     * @returns {boolean} Whether font is loading
     */
    isFontLoading(fontId) {
        return this.loadingFonts.has(fontId);
    }

    /**
     * Load font by ID
     * @param {string} fontId - Font ID
     * @returns {Promise<boolean>} Whether font loaded successfully
     */
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
            // Wait for existing loading to complete
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
            if (font.type === 'system') {
                // System fonts are always available
                this.loadedFonts.add(fontId);
                this.loadingFonts.delete(fontId);
                return true;
            } else if (font.type === 'google') {
                await this.loadGoogleFont(font);
                this.loadedFonts.add(fontId);
                this.loadingFonts.delete(fontId);
                return true;
            } else if (font.type === 'custom') {
                // Handle custom fonts if needed
                console.warn('Custom font loading not implemented yet');
                this.loadingFonts.delete(fontId);
                return false;
            }
        } catch (error) {
            console.error(`Error loading font ${fontId}:`, error);
            this.loadingFonts.delete(fontId);
            return false;
        }

        this.loadingFonts.delete(fontId);
        return false;
    }

    /**
     * Load Google Font
     * @param {Object} font - Font object
     * @returns {Promise<void>}
     */
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

    /**
     * Load multiple fonts by IDs
     * @param {Array<string>} fontIds - Array of font IDs
     * @returns {Promise<Object>} Results object with loaded and failed fonts
     */
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

    /**
     * Preload fonts for better performance
     * @param {Array<string>} fontIds - Array of font IDs to preload
     * @returns {Promise<Object>} Preload results
     */
    async preloadFonts(fontIds) {
        console.log('Preloading fonts:', fontIds);
        return this.loadFontsByIds(fontIds);
    }

    /**
     * Get font family name for CSS
     * @param {string} fontId - Font ID
     * @returns {string} Font family name
     */
    getFontFamily(fontId) {
        const font = this.getFontById(fontId);
        return font ? font.family : 'Arial';
    }

    /**
     * Get font preview URL
     * @param {string} fontId - Font ID
     * @returns {string} Preview URL
     */
    getFontPreview(fontId) {
        const font = this.getFontById(fontId);
        return font ? font.preview : null;
    }

    /**
     * Get available weights for font
     * @param {string} fontId - Font ID
     * @returns {Array<number>} Array of available weights
     */
    getFontWeights(fontId) {
        const font = this.getFontById(fontId);
        return font ? font.weights : [400];
    }

    /**
     * Get available styles for font
     * @param {string} fontId - Font ID
     * @returns {Array<string>} Array of available styles
     */
    getFontStyles(fontId) {
        const font = this.getFontById(fontId);
        return font ? font.styles : ['normal'];
    }

    /**
     * Generate CSS font-family string
     * @param {string} fontId - Font ID
     * @param {Array<string>} fallbacks - Fallback fonts
     * @returns {string} CSS font-family string
     */
    generateFontFamily(fontId, fallbacks = ['Arial', 'sans-serif']) {
        const font = this.getFontById(fontId);
        if (!font) return fallbacks.join(', ');
        
        return `"${font.family}", ${fallbacks.join(', ')}`;
    }

    /**
     * Wait for font to be loaded
     * @param {string} fontId - Font ID
     * @param {number} timeout - Timeout in milliseconds
     * @returns {Promise<boolean>} Whether font loaded within timeout
     */
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

    /**
     * Get loading status for multiple fonts
     * @param {Array<string>} fontIds - Array of font IDs
     * @returns {Object} Status object
     */
    getLoadingStatus(fontIds) {
        return {
            loaded: fontIds.filter(id => this.isFontLoaded(id)),
            loading: fontIds.filter(id => this.isFontLoading(id)),
            notLoaded: fontIds.filter(id => !this.isFontLoaded(id) && !this.isFontLoading(id))
        };
    }

    /**
     * Clear font cache (useful for testing)
     */
    clearCache() {
        this.loadedFonts.clear();
        this.loadingFonts.clear();
        this.fontCache.clear();
        this.injectedLinks.clear();
    }

    /**
     * Get font statistics
     * @returns {Object} Font statistics
     */
    getStats() {
        return {
            totalFonts: this.fonts.length,
            loadedFonts: this.loadedFonts.size,
            loadingFonts: this.loadingFonts.size,
            injectedLinks: this.injectedLinks.size,
            systemFonts: this.fonts.filter(f => f.type === 'system').length,
            googleFonts: this.fonts.filter(f => f.type === 'google').length,
            customFonts: this.fonts.filter(f => f.type === 'custom').length
        };
    }
}

// Create singleton instance
const fontManager = new DynamicFontManager();

export default fontManager;

// Export individual methods for convenience
export const {
    getAllFonts,
    getFontById,
    getFontsByCategory,
    searchFonts,
    isFontLoaded,
    isFontLoading,
    loadFontById,
    loadFontsByIds,
    preloadFonts,
    getFontFamily,
    getFontPreview,
    getFontWeights,
    getFontStyles,
    generateFontFamily,
    waitForFont,
    getLoadingStatus,
    clearCache,
    getStats
} = fontManager;

// Export FONT_CATEGORIES for convenience
export { FONT_CATEGORIES };

