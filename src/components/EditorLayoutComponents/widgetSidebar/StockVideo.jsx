
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function StockVideo({ mainStage, setMainStage, selectedShape, selectedIndex }) {

    const [showControls, setShowControls] = useState(
        selectedShape?.[0]?.attrs?.htmlData?.showControls || true
    );
    
    const [autoPlay, setAutoPlay] = useState(
        selectedShape?.[0]?.attrs?.htmlData?.autoPlay || false
    );
    
    const [mute, setMute] = useState(
        selectedShape?.[0]?.attrs?.htmlData?.mute || false
    );
    
    const [loop, setLoop] = useState(
        selectedShape?.[0]?.attrs?.htmlData?.loop || false
    );

    useEffect(() => {
        if (selectedShape.length && selectedShape[0]) {
            // Set stock video specific values
            const htmlData = selectedShape[0]?.attrs?.htmlData || {};
            setShowControls(htmlData.showControls || true);
            setAutoPlay(htmlData.autoPlay || false);
            setMute(htmlData.mute || false);
            setLoop(htmlData.loop || false);
        }
    }, [selectedShape]);

    const updateStockVideoInMainStage = (data) => {
        if (!selectedShape.length || !mainStage[selectedIndex]?.shapes) return;

        const updatedMainStage = [...mainStage];
        updatedMainStage[selectedIndex].shapes = mainStage[selectedIndex].shapes.map(element => {
            const matchingShape = selectedShape.find(selShape => selShape.attrs.id === element.id);
            if (matchingShape) {
                return {
                    ...element,
                    htmlData: {
                        ...element.htmlData,
                        ...data
                    }
                };
            }
            return element;
        });

        setMainStage(updatedMainStage);
    };

    const handleShowControlsChange = (checked) => {
        setShowControls(checked);
        updateStockVideoInMainStage({ showControls: checked });
    };

    const handleAutoPlayChange = (checked) => {
        setAutoPlay(checked);
        updateStockVideoInMainStage({ autoPlay: checked });
    };

    const handleMuteChange = (checked) => {
        setMute(checked);
        updateStockVideoInMainStage({ mute: checked });
    };

    const handleLoopChange = (checked) => {
        setLoop(checked);
        updateStockVideoInMainStage({ loop: checked });
    };

    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Label className="text-lg">Video Widget</Label>
            <div className="space-y-2">
                <div className="flex items-center gap-1">
                    <Checkbox
                        id="show-controls"
                        checked={showControls}
                        onCheckedChange={handleShowControlsChange}
                        className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
                    />
                    <Label htmlFor="show-controls" className="text-sm font-medium leading-none">Show controls</Label>
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-1">
                    <Checkbox
                        id="auto-play"
                        checked={autoPlay}
                        onCheckedChange={handleAutoPlayChange}
                        className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
                    />
                    <Label htmlFor="auto-play" className="text-sm font-medium leading-none">Autoplay</Label>
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-1">
                    <Checkbox
                        id="mute"
                        checked={mute}
                        onCheckedChange={handleMuteChange}
                        className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
                    />
                    <Label htmlFor="mute" className="text-sm font-medium leading-none">Mute</Label>
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-1">
                    <Checkbox
                        id="loop"
                        checked={loop}
                        onCheckedChange={handleLoopChange}
                        className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
                    />
                    <Label htmlFor="loop" className="text-sm font-medium leading-none">Loop</Label>
                </div>
            </div>
        </div>
    )
}