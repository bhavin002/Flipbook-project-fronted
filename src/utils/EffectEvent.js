export const EffectEvent = (shape, ractnode , imgNode) => {
    const effect = shape.effect || {};

    if(!imgNode || !ractnode) return;
    if (ractnode.isCached()) {
        ractnode.clearCache();
    }
    if (imgNode.isCached()) {
        imgNode.clearCache();
    }

    let filterArray = [];
    switch (effect.filterData) {
        case 'Grayscale':
            filterArray = [Konva.Filters.Grayscale];
            break;
        case 'Sepia':
            filterArray = [Konva.Filters.Sepia];
            break;
        case 'Cold':
            filterArray = [Konva.Filters.RGB];
            imgNode.red(100);
            imgNode.green(150);
            imgNode.blue(255);
            break;
        case 'Warm':
            filterArray = [Konva.Filters.RGB];
            imgNode.red(255);
            imgNode.green(200);
            imgNode.blue(100);
            break;
        case 'Natural':
            filterArray = [];
            break;
        default:
            filterArray = [];
            break;
    }

    if (effect.blurRadius > 0) {
        filterArray.push(Konva.Filters.Blur);
        imgNode.blurRadius(effect.blurRadius);
    }

    if (effect.brightness !== 0) {
        filterArray.push(Konva.Filters.Brighten);
        imgNode.brightness(effect.brightness);
    }

    imgNode.stroke(effect.borderColor);
    imgNode.strokeWidth(effect.borderWidth);

    if (effect.shadowEnabled) {
        ractnode.shadowColor('black');
        ractnode.shadowBlur(effect.shadowBlur || 0);
        ractnode.shadowOffset({ x: effect.offsetX || 0, y: effect.offsetY || 0 });
    } else {
        ractnode.shadowColor('rgba(0, 0, 0, 0)');
        ractnode.shadowBlur(0);
        ractnode.shadowOffset({ x: 0, y: 0 });
    }

    imgNode.opacity((effect.opacity || 100) / 100);

    if (filterArray.length > 0) {
        imgNode.filters(filterArray);
        imgNode.cache();
    }

    imgNode.getLayer()?.batchDraw();
};