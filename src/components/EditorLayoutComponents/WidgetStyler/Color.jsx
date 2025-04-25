import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";

export default function Color({ windowInnerWidth, setIsShapeDrawerOpen, setSelectedSubMenu, selectedShape, mainStage, selectedIndex, setMainStage }) {
    const [isNewColorAdded, setIsNewColorAdded] = useState(false);
    const colorInputRef = useRef(null);
    const handleAddColor = () => {
        setIsNewColorAdded(true);
        setTimeout(() => colorInputRef.current?.click(), 10);
    };
    const recentColors = [
        '#000000', '#020301'
    ];

    const brandColors = [
        '#c54e4f', '#cb2727', "#412a0a"
    ];

    const grayShades = [
        '#1E2A35', '#2F4353', '#3C4A5F', '#4B5C6B', '#5A6C7A', '#ffffff'
    ];

    const defaultPalette = [
        '#E15B5B', '#DB5A8D', '#AA5223', '#7D22DB', '#5D88CA', '#5A9DE9',
        '#55B1F3', '#E36A5E', '#4CAEA2', '#6BC16A', '#B1CE56', '#F9DD64',
        '#FACC40', '#F9A940', '#F37D4B'
    ];

    const updateShapeColor = (color) => {
        if (selectedShape.length) {
            mainStage[selectedIndex].shapes.forEach(element => {
                selectedShape.forEach(selShape => {
                    if (selShape.attrs.id === element.id) {
                        element.fill = color;
                        selShape.attrs.fill = color;
                    }
                })
            });
        } else {
            mainStage[selectedIndex].background = color;
        }

        setMainStage([...mainStage]);
        if (windowInnerWidth > 1024) return;
        setIsShapeDrawerOpen(false);
        setSelectedSubMenu(null);
    };

    const handleHexInputChange = (e) => {
        updateShapeColor(e.target.value);
    };

    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Input
                type="text"
                onChange={handleHexInputChange}
                placeholder="paste a hex color here"
                className="placeholder:text-[#d8dce3]" />
            <div className="space-y-2">
                <Label className="text-xs">Recent colors</Label>
                <div className="flex flex-wrap gap-2">
                    <div className='relative w-fit'>
                        <div onClick={handleAddColor}
                            className="w-8 h-8 rounded cursor-pointer bg-white flex items-center justify-center"
                        >
                            <Plus color='black' />
                        </div>
                        {
                            isNewColorAdded && <input
                                ref={colorInputRef}
                                type="color"
                                value={'#FFFFFF'}
                                className="opacity-0 absolute w-1 h-1 left-0 right-0 m-auto bottom-0"
                            />
                        }
                    </div>
                    {recentColors.map((color, index) => (
                        <div
                            key={index}
                            className="w-8 h-8 rounded cursor-pointer hover:scale-110 transition-transform duration-200"
                            style={{ backgroundColor: color }}
                            onClick={() => updateShapeColor(color)}
                        />
                    ))}
                </div>
            </div>
            <div className="space-y-2">
                <Label className="text-xs">Brand colors</Label>
                <div className="flex flex-wrap gap-2">
                    {brandColors.map((color, index) => (
                        <div
                            key={index}
                            className="w-8 h-8 rounded cursor-pointer hover:scale-110 transition-transform duration-200"
                            style={{ backgroundColor: color }}
                            onClick={() => updateShapeColor(color)}
                        />
                    ))}
                </div>
                <a href="http://localhost:5173/branding/colors" target="_blank" className="text-xs font-medium text-white cursor-pointer hover:underline">Manage brand colors</a>
            </div>
            <div className="space-y-2">
                <Label className="text-xs">Default Palette</Label>
                <div className="flex flex-wrap gap-2">
                    {defaultPalette.map((color, index) => (
                        <div
                            key={index}
                            className="w-8 h-8 rounded cursor-pointer hover:scale-110 transition-transform duration-200"
                            style={{ backgroundColor: color }}
                            onClick={() => updateShapeColor(color)}
                        />
                    ))}
                </div>
            </div>
            <div className="space-y-2">
                <Label className="text-xs">Grey shades</Label>
                <div className="flex flex-wrap gap-2">
                    {grayShades.map((color, index) => (
                        <div
                            key={index}
                            className="w-8 h-8 rounded cursor-pointer hover:scale-110 transition-transform duration-200"
                            style={{ backgroundColor: color }}
                            onClick={() => updateShapeColor(color)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}