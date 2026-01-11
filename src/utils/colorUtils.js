/**
 * Calculates the relative luminance of a color
 * @param {string} color - Hex color code (e.g., '#FFFFFF' or 'FFFFFF')
 * @returns {number} - Luminance value between 0 and 1
 */
export const getColorLuminance = (color) => {
    if (!color) return 0;
    
    // Remove # if present
    const hex = color.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    // Apply gamma correction
    const rLinear = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gLinear = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const bLinear = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    // Calculate luminance
    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
};

/**
 * Determines whether to use black or white text based on background color
 * @param {string} backgroundColor - Hex color code
 * @returns {string} - 'black' or 'white'
 */
export const getContrastTextColor = (backgroundColor) => {
    if (!backgroundColor) return 'white';
    
    const luminance = getColorLuminance(backgroundColor);
    
    // WCAG recommends 0.5 as threshold for contrast
    // If luminance > 0.5, use black text; otherwise use white
    return luminance > 0.5 ? 'black' : 'white';
};

/**
 * Converts hex color to space-separated HSL components
 * @param {string} hex - Hex color code
 * @returns {string} - "H S% L%" components
 */
export const hexToHslComponents = (hex) => {
    if (!hex) return '262.1 83.3% 57.8%'; // Default primary color
    
    let r = parseInt(hex.substring(1, 3), 16) / 255;
    let g = parseInt(hex.substring(3, 5), 16) / 255;
    let b = parseInt(hex.substring(5, 7), 16) / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
};
