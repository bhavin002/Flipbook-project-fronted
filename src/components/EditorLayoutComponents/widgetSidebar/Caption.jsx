import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export default function Caption({ selectedShape,
    setMainStage,
    mainStage,
    selectedIndex }) {
    const [useIndividualCorners, setUseIndividualCorners] = useState(false);
    const [cornerRadius, setCornerRadius] = useState(0);
    const [topLeftRadius, setTopLeftRadius] = useState(0);
    const [topRightRadius, setTopRightRadius] = useState(0);
    const [bottomRightRadius, setBottomRightRadius] = useState(0);
    const [bottomLeftRadius, setBottomLeftRadius] = useState(0);

    useEffect(() => {
        if (selectedShape.length && selectedShape[0]) {
            const effect = selectedShape[0].attrs.effect || {};
            const hasIndividualCorners = effect.individualCorners 
               

            setUseIndividualCorners(hasIndividualCorners);
            setCornerRadius(effect.cornerRadius || 0);
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
                        cornerRadius: cornerRadius,
                        individualCorners: useIndividualCorners,
                        topLeftRadius: useIndividualCorners ? topLeftRadius : cornerRadius,
                        topRightRadius: useIndividualCorners ? topRightRadius : cornerRadius,
                        bottomRightRadius: useIndividualCorners ? bottomRightRadius : cornerRadius,
                        bottomLeftRadius: useIndividualCorners ? bottomLeftRadius : cornerRadius,
                    }
                };
            }
            return element;
        });

        setMainStage(updatedMainStage);
    }, [
        cornerRadius, useIndividualCorners, topLeftRadius, topRightRadius,
        bottomRightRadius, bottomLeftRadius
    ]);
    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Label className="text-lg">Caption</Label>
            <div className="space-y-2">
                <div>
                    <Label htmlFor="Caption-text" className="text-xs">Text</Label>
                    <Input
                        type="text"
                        id="Caption-text"
                        placeholder="Set your text"
                        defaultValue="Add text here"
                        className="placeholder:text-[#d8dce3]" />
                </div>
                <div>
                    <Label htmlFor="Caption-url" className="text-xs">URL</Label>
                    <Input
                        type="text"
                        id="Caption-url"
                        placeholder="Set your URL"
                        className="placeholder:text-[#d8dce3]" />
                </div>
                <div>
                    <Label htmlFor="button-label" className="text-xs">Button label</Label>
                    <Input
                        type="text"
                        id="button-label"
                        placeholder="Set your label"
                        defaultValue="Open link"
                        disabled
                        className="placeholder:text-[#d8dce3]" />
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
    )
}