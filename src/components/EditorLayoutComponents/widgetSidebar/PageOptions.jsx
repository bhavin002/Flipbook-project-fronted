import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import CornerRadiusControl from "@/utils/CornerRadiusControl";

export default function PageOptions({
    selectedShape,
    setMainStage,
    mainStage,
    selectedIndex
}) {
    const pageOptions = {
        "go-to-previous-page": "Go to previous page",
        "go-to-next-page": "Go to next page",
        "go-to-first-page": "Go to first page",
        "go-to-last-page": "Go to last page"
    };

    const [useIndividualCorners, setUseIndividualCorners] = useState(
        selectedShape?.[0]?.attrs?.effect?.individualCorners || false
    );
    
    const defaultCornerRadius = selectedShape?.[0]?.attrs?.effect?.cornerRadius || 0;
    const [cornerRadius, setCornerRadius] = useState(defaultCornerRadius);
    
    const [topLeftRadius, setTopLeftRadius] = useState(
        useIndividualCorners ? 
            selectedShape?.[0]?.attrs?.effect?.topLeftRadius || 0 : 
            defaultCornerRadius
    );
    
    const [topRightRadius, setTopRightRadius] = useState(
        useIndividualCorners ? 
            selectedShape?.[0]?.attrs?.effect?.topRightRadius || 0 : 
            defaultCornerRadius
    );
    
    const [bottomRightRadius, setBottomRightRadius] = useState(
        useIndividualCorners ? 
            selectedShape?.[0]?.attrs?.effect?.bottomRightRadius || 0 : 
            defaultCornerRadius
    );
    
    const [bottomLeftRadius, setBottomLeftRadius] = useState(
        useIndividualCorners ? 
            selectedShape?.[0]?.attrs?.effect?.bottomLeftRadius || 0 : 
            defaultCornerRadius
    );

    
    const [tooltip, setTooltip] = useState(
        selectedShape?.[0]?.attrs?.htmlData?.tooltip || 
        pageOptions[selectedShape?.[0]?.attrs?.htmlType] || ""
    );

    useEffect(() => {
        if (selectedShape.length && selectedShape[0]) {
            const effect = selectedShape[0].attrs.effect || {};
            const hasIndividualCorners = effect.individualCorners;

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

            const tooltipValue = selectedShape[0]?.attrs?.htmlData?.tooltip || 
                               pageOptions[selectedShape[0]?.attrs?.htmlType] || "";
            setTooltip(tooltipValue);
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

    const handleTooltipChange = (e) => {
        const value = e.target.value;
        setTooltip(value);

        updatePageOptionsInMainStage(value);
    };

    const updatePageOptionsInMainStage = (tooltipValue) => {
        if (!selectedShape.length || !mainStage[selectedIndex]?.shapes) return;

        const updatedMainStage = [...mainStage];
        updatedMainStage[selectedIndex].shapes = mainStage[selectedIndex].shapes.map(element => {
            const matchingShape = selectedShape.find(selShape => selShape.attrs.id === element.id);
            if (matchingShape) {
                return {
                    ...element,
                    htmlData: {
                        ...element.htmlData,
                        type: selectedShape[0].attrs.htmlType,
                        tooltip: tooltipValue
                    }
                };
            }
            return element;
        });

        setMainStage(updatedMainStage);
    };

    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Label className="text-lg">Page Options</Label>
            <div className="space-y-2">
                <div>
                    <Label htmlFor="page-options-tooltip" className="text-xs">Tooltip</Label>
                    <Input
                        type="text"
                        id="page-options-tooltip"
                        value={tooltip}
                        onChange={handleTooltipChange}
                        placeholder={pageOptions[selectedShape[0]?.attrs?.htmlType] || ""}
                        className="placeholder:text-[#d8dce3]"
                    />
                </div>
            </div>

            <CornerRadiusControl
                useIndividualCorners={useIndividualCorners}
                setUseIndividualCorners={setUseIndividualCorners}
                cornerRadius={cornerRadius}
                setCornerRadius={setCornerRadius}
                topLeftRadius={topLeftRadius}
                setTopLeftRadius={setTopLeftRadius}
                topRightRadius={topRightRadius}
                setTopRightRadius={setTopRightRadius}
                bottomRightRadius={bottomRightRadius}
                setBottomRightRadius={setBottomRightRadius}
                bottomLeftRadius={bottomLeftRadius}
                setBottomLeftRadius={setBottomLeftRadius}
            />
        </div>
    );
}