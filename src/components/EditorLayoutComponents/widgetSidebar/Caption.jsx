import { Checkbox } from "@/components/ui/checkbox";
import { FilterSlider } from "@/components/ui/filterSlider";
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
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label className="text-sm font-medium flex items-center">
                            Corner Radius
                        </Label>
                        <div className="flex items-center gap-1">
                            <Checkbox
                                id="individual-corners"
                                checked={useIndividualCorners}
                                onCheckedChange={(checked) => setUseIndividualCorners(checked)}
                                className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
                            />
                            <Label htmlFor="individual-corners" className="text-sm font-medium flex items-center">Individual Corners</Label>
                        </div>
                    </div>

                    {!useIndividualCorners && (
                        <FilterSlider
                            min={0}
                            max={100}
                            value={[cornerRadius]}
                            onValueChange={(values) => setCornerRadius(values[0])}
                            className="w-full"
                        />
                    )}

                    {
                        useIndividualCorners && (<div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label className="text-xs">Top Left</Label>
                                    <span className="text-xs">{topLeftRadius}</span>
                                </div>
                                <FilterSlider
                                    min={0}
                                    max={50}
                                    value={[topLeftRadius]}
                                    onValueChange={(values) => setTopLeftRadius(values[0])}
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label className="text-xs">Top Right</Label>
                                    <span className="text-xs">{topRightRadius}</span>
                                </div>
                                <FilterSlider
                                    min={0}
                                    max={50}
                                    value={[topRightRadius]}
                                    onValueChange={(values) => setTopRightRadius(values[0])}
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label className="text-xs">Bottom Right</Label>
                                    <span className="text-xs">{bottomRightRadius}</span>
                                </div>
                                <FilterSlider
                                    min={0}
                                    max={50}
                                    value={[bottomRightRadius]}
                                    onValueChange={(values) => setBottomRightRadius(values[0])}
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label className="text-xs">Bottom Left</Label>
                                    <span className="text-xs">{bottomLeftRadius}</span>
                                </div>
                                <FilterSlider
                                    min={0}
                                    max={50}
                                    value={[bottomLeftRadius]}
                                    onValueChange={(values) => setBottomLeftRadius(values[0])}
                                    className="w-full"
                                />
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}