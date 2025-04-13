import Konva from 'konva';

export const EffectEvent = (shape, rectNode, imgNode) => {
    const effect = shape.effect || {};

    if (!imgNode || !rectNode) return;

    if (rectNode.isCached()) {
        rectNode.clearCache();
    }
    if (imgNode.isCached()) {
        imgNode.clearCache();
    }

    let filterArray = [];

    const defaultValues = {
        brightness: 0,
        contrast: 0,
        saturation: 0,
        sepia: 0,
        tint: 0,
        blur: 0,
        vignette: 0,
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
        imgNode.saturation(mergedEffect.saturation / 50); // Reverted to /50
    }

    if (mergedEffect.sepia > 0) {
        filterArray.push(Konva.Filters.HSL);
        imgNode.hue(35);
        imgNode.saturation(mergedEffect.sepia / 100);
        imgNode.luminance(mergedEffect.sepia / 200);
    }

    if (mergedEffect.tint > 0) {
        filterArray.push(Konva.Filters.HSL);
        imgNode.hue((mergedEffect.tint / 200) * 360);
    }

    if (mergedEffect.grayscale > 0) {
        filterArray.push(Konva.Filters.Grayscale);
    }

    if (mergedEffect.vignette > 0) {
        const width = shape.width || imgNode.width();
        const height = shape.height || imgNode.height();
        rectNode.fillRadialGradientStartPoint({ x: width / 2, y: height / 2 });
        rectNode.fillRadialGradientEndPoint({ x: width / 2, y: height / 2 });
        rectNode.fillRadialGradientStartRadius(0);
        rectNode.fillRadialGradientEndRadius(Math.max(width, height) / 1.5);
        rectNode.fillRadialGradientColorStops([
            0,
            'rgba(0, 0, 0, 0)',
            1,
            `rgba(0, 0, 0, ${mergedEffect.vignette / 100})`,
        ]);
    } else {
        rectNode.fill('rgba(0, 0, 0, 0)');
    }

    if (filterArray.length > 0) {
        imgNode.filters(filterArray);
        imgNode.cache();
    } else {
        imgNode.filters([]);
    }

    imgNode.getLayer()?.batchDraw();
};