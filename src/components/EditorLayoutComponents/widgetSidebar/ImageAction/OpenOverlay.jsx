import { FilterSlider } from "@/components/ui/filterSlider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { addIntercationDataToMainStage } from "@/utils/Helper";

export default function OpenOverlay({
    selectedShape,
    setMainStage,
    mainStage,
    selectedIndex,
}) {
    const [opacity, setOpacity] = useState(30);
    const [tooltip, setTooltip] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [hoverColor, setHoverColor] = useState("#ffffff");
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const colorInputRef = useRef(null);

    useEffect(() => {
        const htmlData = selectedShape?.[0]?.attrs?.htmlData || {};
        setOpacity(typeof htmlData.hoverOpacity === "number" ? htmlData.hoverOpacity : 30);
        setTooltip(htmlData.tooltip || "On click");
        setTitle(htmlData.title || "");
        setDescription(htmlData.description || "");
        setHoverColor(htmlData.hoverColor || "#ffffff");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedShape]);

    const updateMainStage = (data) => {
        const output = {
            data: {
                action: "open-overlay",
                tooltip: data.tooltip,
                title: data.title,
                description: data.description,
                hoverColor: data.hoverColor,
                hoverOpacity: data.hoverOpacity,
            }
        };
        addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
    };

    const handleColorClick = () => {
        setIsColorPickerOpen(true);
        setTimeout(() => colorInputRef.current?.click(), 10);
    };

    const handleOpacityChange = (value) => {
        const next = Array.isArray(value) ? value[0] : value;
        setOpacity(next);
        updateMainStage({
            tooltip,
            title,
            description,
            hoverColor,
            hoverOpacity: next,
        });
    };

    const handleTooltipChange = (e) => {
        const val = e.target.value;
        setTooltip(val);
        updateMainStage({
            tooltip: val,
            title,
            description,
            hoverColor,
            hoverOpacity: opacity,
        });
    };

    const handleTitleChange = (e) => {
        const val = e.target.value;
        setTitle(val);
        updateMainStage({
            tooltip,
            title: val,
            description,
            hoverColor,
            hoverOpacity: opacity,
        });
    };

    const handleDescriptionChange = (e) => {
        const val = e.target.value;
        setDescription(val);
        updateMainStage({
            tooltip,
            title,
            description: val,
            hoverColor,
            hoverOpacity: opacity,
        });
    };

    const handleHoverColorChange = (val) => {
        setHoverColor(val);
        updateMainStage({
            tooltip,
            title,
            description,
            hoverColor: val,
            hoverOpacity: opacity,
        });
    };

    return (
        <>
            <div>
                <Label htmlFor="open-overlay-tooltip" className="text-xs">Tooltip</Label>
                <Input
                    type="text"
                    id="open-overlay-tooltip"
                    value={tooltip}
                    onChange={handleTooltipChange}
                    placeholder="Enter tooltip text"
                    className="placeholder:text-gray-400" />
            </div>
            <div>
                <Label htmlFor="open-overlay-title" className="text-xs">Title</Label>
                <Input
                    type="text"
                    id="open-overlay-title"
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>
            <div>
                <Label htmlFor="open-overlay-description" className="text-xs">Description</Label>
                <Textarea
                    type="text"
                    id="open-overlay-description"
                    rows={4}
                    value={description}
                    onChange={handleDescriptionChange}
                    className="resize-none" />
            </div>
            <div>
                <Label className="text-xs">Hover color</Label>
                <div className="relative">
                    <Input
                        type="text"
                        value={hoverColor}
                        onChange={(e) => handleHoverColorChange(e.target.value)}
                        className="pr-12"
                    />
                    <div
                        className={`absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded`}
                        style={{ backgroundColor: hoverColor }}
                        onClick={handleColorClick}
                    />
                    {isColorPickerOpen && (
                        <input
                            ref={colorInputRef}
                            type="color"
                            value={hoverColor}
                            onChange={(e) => handleHoverColorChange(e.target.value)}
                            className="opacity-0 absolute w-1 h-1 right-3 top-1/2 -translate-y-1/2"
                        />
                    )}
                </div>
            </div>
            <div>
                <Label className="text-xs">Hover opacity</Label>
                <div className="py-2 px-1 flex gap-2 items-center">
                    <FilterSlider
                        min={0}
                        max={100}
                        value={[opacity]}
                        onValueChange={(values) => handleOpacityChange(values)}
                        className="w-full"
                    />
                    <div className="text-[12px]">{opacity}%</div>
                </div>
            </div>
        </>
    );
}