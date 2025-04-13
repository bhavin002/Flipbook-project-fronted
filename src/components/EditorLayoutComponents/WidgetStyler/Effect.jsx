import React, { useEffect, useState } from 'react';

const Effect = ({
    selectedShape,
    setMainStage,
    mainStage,
    selectedIndex
}) => {
    const [selectedEffect, setSelectedEffect] = useState('Natural');
    const [blurRadius, setBlurRadius] = useState(0);
    const [brightness, setBrightness] = useState(0);
    const [borderWidth, setBorderWidth] = useState(0);
    const [borderColor, setBorderColor] = useState('#000000');
    const [useIndividualCorners, setUseIndividualCorners] = useState(false);
    const [cornerRadius, setCornerRadius] = useState(0);
    const [topLeftRadius, setTopLeftRadius] = useState(0);
    const [topRightRadius, setTopRightRadius] = useState(0);
    const [bottomRightRadius, setBottomRightRadius] = useState(0);
    const [bottomLeftRadius, setBottomLeftRadius] = useState(0);
    const [shadowEnabled, setShadowEnabled] = useState(false);
    const [shadowBlur, setShadowBlur] = useState(0);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [opacity, setOpacity] = useState(100);
    const [color, setColor] = useState('#000000');

    useEffect(() => {
        if (selectedShape.length && selectedShape[0]) {
            const effect = selectedShape[0].attrs.effect || {};
            setSelectedEffect(effect.filterData || 'Natural');
            setBlurRadius(effect.blurRadius || 0);
            setBrightness(effect.brightness || 0);
            setBorderWidth(effect.borderWidth || 0);
            setBorderColor(effect.borderColor || '#000000');

            // Check if individual corners are defined in the effect object
            const hasIndividualCorners = effect.individualCorners ||
                (effect.topLeftRadius !== undefined &&
                    effect.topRightRadius !== undefined &&
                    effect.bottomRightRadius !== undefined &&
                    effect.bottomLeftRadius !== undefined);

            setUseIndividualCorners(hasIndividualCorners);
            setCornerRadius(effect.cornerRadius || 0);

            // Set individual corners directly from effect values if they exist
            if (hasIndividualCorners) {
                setTopLeftRadius(effect.topLeftRadius || 0);
                setTopRightRadius(effect.topRightRadius || 0);
                setBottomRightRadius(effect.bottomRightRadius || 0);
                setBottomLeftRadius(effect.bottomLeftRadius || 0);
            } else {
                // Fallback to cornerRadius only if individual corners aren't set
                const uniformRadius = effect.cornerRadius || 0;
                setTopLeftRadius(uniformRadius);
                setTopRightRadius(uniformRadius);
                setBottomRightRadius(uniformRadius);
                setBottomLeftRadius(uniformRadius);
            }

            setShadowEnabled(effect.shadowEnabled || false);
            setShadowBlur(effect.shadowBlur || 0);
            setOffsetX(effect.offsetX || 0);
            setOffsetY(effect.offsetY || 0);
            setOpacity(effect.opacity ? effect.opacity : 100);
            setColor(effect.color || '#000000');
        }
    }, [selectedShape]);

    useEffect(() => {
        if (!selectedShape.length || !mainStage[selectedIndex]?.shapes) return;

        const updatedMainStage = [...mainStage];
        updatedMainStage[selectedIndex].shapes = mainStage[selectedIndex].shapes.map(element => {
            const matchingShape = selectedShape.find(selShape => selShape.attrs.id === element.id);
            if (matchingShape) {
                return {
                    ...element,
                    effect: {
                        filterData: selectedEffect,
                        blurRadius: blurRadius,
                        brightness: brightness,
                        borderWidth: borderWidth,
                        borderColor: borderColor,
                        cornerRadius: cornerRadius,
                        individualCorners: useIndividualCorners,
                        topLeftRadius: useIndividualCorners ? topLeftRadius : cornerRadius,
                        topRightRadius: useIndividualCorners ? topRightRadius : cornerRadius,
                        bottomRightRadius: useIndividualCorners ? bottomRightRadius : cornerRadius,
                        bottomLeftRadius: useIndividualCorners ? bottomLeftRadius : cornerRadius,
                        shadowEnabled: shadowEnabled,
                        shadowBlur: shadowBlur,
                        offsetX: offsetX,
                        offsetY: offsetY,
                        opacity: opacity,
                        color: color
                    }
                };
            }
            return element;
        });

        setMainStage(updatedMainStage);
    }, [
        selectedEffect, blurRadius, brightness, borderWidth, borderColor,
        cornerRadius, useIndividualCorners, topLeftRadius, topRightRadius,
        bottomRightRadius, bottomLeftRadius, shadowEnabled, shadowBlur,
        offsetX, offsetY, opacity, color, selectedShape
    ]);

    const handleEffectSelect = (effect) => {
        setSelectedEffect(effect);
    };

    return (
        <div className="flex">
            <div className="w-full bg-[#222222] text-white p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Effects</h2>
                    <button className="text-gray-400 hover:text-white">✕</button>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                    {['Grayscale', 'Sepia', 'Cold', 'Natural', 'Warm'].map((effect) => (
                        <button
                            key={effect}
                            onClick={() => handleEffectSelect(effect)}
                            className={`p-2 rounded-sm text-center text-sm ${selectedEffect === effect ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-400`}
                        >
                            {effect}
                        </button>
                    ))}
                </div>

                <div className="mb-4">
                    <label className="text-sm font-medium flex items-center">
                        Blur
                        <input
                            type="checkbox"
                            checked={blurRadius > 0}
                            onChange={(e) => setBlurRadius(e.target.checked ? 1 : 0)}
                            className="ml-2"
                        />
                    </label>
                    <div className="flex items-center">
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value={blurRadius}
                            onChange={(e) => setBlurRadius(Number(e.target.value))}
                            className="w-full mr-2"
                        />
                        <span className="text-sm">{blurRadius}</span>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="text-sm font-medium flex items-center">
                        Brightness
                        <input
                            type="checkbox"
                            checked={brightness !== 0}
                            onChange={(e) => setBrightness(e.target.checked ? 0.1 : 0)}
                            className="ml-2"
                        />
                    </label>
                    <div className="flex items-center">
                        <input
                            type="range"
                            min="-1"
                            max="1"
                            step="0.01"
                            value={brightness}
                            onChange={(e) => setBrightness(Number(e.target.value))}
                            className="w-full mr-2"
                        />
                        <span className="text-sm">{Math.round(brightness * 100)}</span>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="text-sm font-medium flex items-center">
                        Border
                        <input
                            type="checkbox"
                            checked={borderWidth > 0}
                            onChange={(e) => setBorderWidth(e.target.checked ? 1 : 0)}
                            className="ml-2"
                        />
                    </label>
                    <div className="flex items-center">
                        <input
                            type="color"
                            value={borderColor}
                            onChange={(e) => setBorderColor(e.target.value)}
                            className="w-8 h-8 mr-2"
                        />
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={borderWidth}
                            onChange={(e) => setBorderWidth(Number(e.target.value))}
                            className="w-full mr-2"
                        />
                        <span className="text-sm">{borderWidth}</span>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="text-sm font-medium flex items-center">
                        Shadow
                        <input
                            type="checkbox"
                            checked={shadowEnabled}
                            onChange={(e) => setShadowEnabled(e.target.checked)}
                            className="ml-2"
                        />
                    </label>
                    {shadowEnabled && (
                        <>
                            <div className="flex items-center">
                                <label className="text-sm font-medium">Blur</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    value={shadowBlur}
                                    onChange={(e) => setShadowBlur(Number(e.target.value))}
                                    className="w-full mr-2"
                                />
                                <span className="text-sm">{shadowBlur}</span>
                            </div>
                            <div className="flex items-center">
                                <label className="text-sm font-medium">Offset X</label>
                                <input
                                    type="range"
                                    min="-50"
                                    max="50"
                                    value={offsetX}
                                    onChange={(e) => setOffsetX(Number(e.target.value))}
                                    className="w-full mr-2"
                                />
                                <span className="text-sm">{offsetX}</span>
                            </div>
                            <div className="flex items-center">
                                <label className="text-sm font-medium">Offset Y</label>
                                <input
                                    type="range"
                                    min="-50"
                                    max="50"
                                    value={offsetY}
                                    onChange={(e) => setOffsetY(Number(e.target.value))}
                                    className="w-full mr-2"
                                />
                                <span className="text-sm">{offsetY}</span>
                            </div>
                        </>
                    )}
                </div>

                <div className="mb-4">
                    <label className="text-sm font-medium">Opacity</label>
                    <div className="flex items-center">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={opacity}
                            onChange={(e) => setOpacity(Number(e.target.value))}
                            className="w-full mr-2"
                        />
                        <span className="text-sm">{opacity}</span>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="text-sm font-medium flex items-center">
                        Corner Radius
                        <input
                            type="checkbox"
                            checked={useIndividualCorners}
                            onChange={(e) => setUseIndividualCorners(e.target.checked)}
                            className="ml-2"
                        />
                        <span className="ml-2">Individual Corners</span>
                    </label>

                    {!useIndividualCorners ? (
                        <div className="flex items-center">
                            <input
                                type="range"
                                min="0"
                                max="50"
                                value={cornerRadius}
                                onChange={(e) => setCornerRadius(Number(e.target.value))}
                                className="w-full mr-2"
                            />
                            <span className="text-sm">{cornerRadius}</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <div>
                                <label className="text-sm">Top Left</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    value={topLeftRadius}
                                    onChange={(e) => setTopLeftRadius(Number(e.target.value))}
                                    className="w-full"
                                />
                                <span className="text-sm">{topLeftRadius}</span>
                            </div>
                            <div>
                                <label className="text-sm">Top Right</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    value={topRightRadius}
                                    onChange={(e) => setTopRightRadius(Number(e.target.value))}
                                    className="w-full"
                                />
                                <span className="text-sm">{topRightRadius}</span>
                            </div>
                            <div>
                                <label className="text-sm">Bottom Right</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    value={bottomRightRadius}
                                    onChange={(e) => setBottomRightRadius(Number(e.target.value))}
                                    className="w-full"
                                />
                                <span className="text-sm">{bottomRightRadius}</span>
                            </div>
                            <div>
                                <label className="text-sm">Bottom Left</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    value={bottomLeftRadius}
                                    onChange={(e) => setBottomLeftRadius(Number(e.target.value))}
                                    className="w-full"
                                />
                                <span className="text-sm">{bottomLeftRadius}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Effect;