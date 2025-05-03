import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import CornerRadiusControl from "@/utils/CornerRadiusControl";

export default function GoToPage({ 
    selectedShape,
    setMainStage,
    mainStage,
    selectedIndex 
}) {
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
    
    const [pageNumber, setPageNumber] = useState(
        selectedShape?.[0]?.attrs?.htmlData?.pageNumber || 1
    );
    
    const [tooltip, setTooltip] = useState(
        selectedShape?.[0]?.attrs?.htmlData?.tooltip || "Go to page"
    );
    
    const [maxPage, setMaxPage] = useState(mainStage?.length || 1);

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

            const pageNumberValue = selectedShape[0]?.attrs?.htmlData?.pageNumber || 1;
            const tooltipValue = selectedShape[0]?.attrs?.htmlData?.tooltip || "Go to page";
            setPageNumber(pageNumberValue);
            setTooltip(tooltipValue);
            
            const totalPages = mainStage?.length || 1;
            setMaxPage(totalPages);
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

    const handlePageNumberChange = (e) => {
        const value = parseInt(e.target.value);
        if (isNaN(value) || value < 1) return;
        
        const validValue = Math.min(value, maxPage);
        setPageNumber(validValue);
        
        updateGoToPageInMainStage(validValue, tooltip);
    };

    const handleTooltipChange = (e) => {
        const value = e.target.value;
        setTooltip(value);
        
        updateGoToPageInMainStage(pageNumber, value);
    };

    const updateGoToPageInMainStage = (pageNumberValue, tooltipValue) => {
        if (!selectedShape.length || !mainStage[selectedIndex]?.shapes) return;

        const updatedMainStage = [...mainStage];
        updatedMainStage[selectedIndex].shapes = mainStage[selectedIndex].shapes.map(element => {
            const matchingShape = selectedShape.find(selShape => selShape.attrs.id === element.id);
            if (matchingShape) {
                return {
                    ...element,
                    htmlData: {
                        ...element.htmlData,
                        pageNumber: pageNumberValue,
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
            <Label className="text-lg">Go To Page</Label>
            <div className="space-y-2">
                <div>
                    <Label htmlFor="page-number" className="text-xs">Page number (1-{maxPage})</Label>
                    <Input
                        type="number"
                        id="page-number"
                        value={pageNumber}
                        onChange={handlePageNumberChange}
                        min={1}
                        max={maxPage}
                        className="placeholder:text-[#d8dce3]" 
                    />
                </div>
            </div>
            <div className="space-y-2">
                <div>
                    <Label htmlFor="go-to-page-tooltip" className="text-xs">Tooltip</Label>
                    <Input
                        type="text"
                        id="go-to-page-tooltip"
                        value={tooltip}
                        onChange={handleTooltipChange}
                        placeholder="Tooltip"
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