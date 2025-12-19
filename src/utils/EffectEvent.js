import Konva from 'konva';

// Utility function to check if image is PNG
const isPngImage = (src) => {
    if (!src) return false;
    // Check file extension
    if (src.toLowerCase().endsWith('.png')) return true;
    // Check data URL
    if (src.startsWith('data:image/png')) return true;
    // Check if URL contains .png extension (with or without query parameters)
    if (src.toLowerCase().includes('.png')) return true;
    return false;
};

export const EffectEvent = (shape, ractnode, imgNode) => {
    const effect = shape.effect || {};
    
    // Check if the image is PNG
    const isPng = isPngImage(shape.src);

    if (!imgNode || !ractnode) return;

    if (ractnode.isCached()) {
        ractnode.clearCache();
    }
    if (imgNode.isCached()) {
        imgNode.clearCache();
    }

    let filterArray = [];

    const defaultValues = {
        brightness: 0,
        contrast: 0,
        saturation: 0,
        blur: 0,
        grayscale: 0,
    };

    const mergedEffect = { ...defaultValues, ...effect };

    if (mergedEffect.blur > 0) {
        filterArray.push(Konva.Filters.Blur);
        imgNode.blurRadius(mergedEffect.blur / 20);
    }

    if (mergedEffect.brightness !== 0) {
        filterArray.push(Konva.Filters.Brighten);
        imgNode.brightness(mergedEffect.brightness / 200);
    }

    if (mergedEffect.contrast !== 0) {
        filterArray.push(Konva.Filters.Contrast);
        imgNode.contrast(mergedEffect.contrast);
    }

    if (mergedEffect.saturation !== 0) {
        filterArray.push(Konva.Filters.HSL);
        imgNode.saturation(mergedEffect.saturation / 50);
    }

    if (mergedEffect.grayscale > 0) {
        filterArray.push(Konva.Filters.Grayscale);
    }

    // Special handling for action buttons with white background to ensure icons are visible (black)
    const fill = shape.fill?.toLowerCase();
    const isWhiteBg = !fill || ['#ffffff', 'white', '#fff', 'rgb(255, 255, 255)', 'rgba(255, 255, 255, 1)'].includes(fill);
    const isIconButton = [
        'video-button', 'audio-button', 'go-to-button-link', 'square-caption', 'page-options', 'go-to-page',
        'go-to-previous-page', 'go-to-next-page', 'go-to-first-page', 'go-to-last-page'
    ].includes(shape.htmlType) || 
                         ['video-button', 'audio-button', 'link-button', 'caption', 'page-options', 'go-to-page'].includes(shape.title);
    
    if (isIconButton && isWhiteBg) {
        filterArray.push(Konva.Filters.Invert);
    }

    // ractnode.fill('rgba(0, 0, 0, 0)');
    // CRITICAL: Never apply shadow to PNG images, even if shadow settings exist
    if (effect.isShadowEnabled && !isPng) {
        ractnode.opacity(effect.shadowOpacity / 100 || 0);
        ractnode.shadowColor(effect.shadowColor || 'rgba(0, 0, 0, 0)');
        ractnode.shadowBlur(effect.shadowBlur || 0);
        ractnode.shadowOffset({ x: effect.shadowOffsetX || 0, y: effect.shadowOffsetY || 0 });
    } else {
        ractnode.shadowColor('rgba(0, 0, 0, 0)');
        ractnode.shadowBlur(0);
        ractnode.shadowOffset({ x: 0, y: 0 });
    }
    
    if (filterArray.length > 0) {
        imgNode.cache();
        imgNode.filters(filterArray);
    } else {
        imgNode.filters([]);
    }

    imgNode.getLayer()?.batchDraw();
};