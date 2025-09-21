import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useWindowWidth from "@/hooks/use-window-width";
import BrandColors from "@/utils/BrandColors";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";

export default function Color({ setIsShapeDrawerOpen, setSelectedSubMenu, selectedShape, mainStage, selectedIndex, setMainStage }) {
    const [isNewColorAdded, setIsNewColorAdded] = useState(false);
    const [currentColor, setCurrentColor] = useState(selectedShape.length ? selectedShape[0].attrs.fill : mainStage[selectedIndex]?.background || '#FFFFFF');
    const [isTransparent, setIsTransparent] = useState(currentColor === "transparent" ? true : false);
    const colorInputRef = useRef(null);
    
    const handleAddColor = () => {
        setIsNewColorAdded(true);
        setTimeout(() => colorInputRef.current?.click(), 10);
    };

    const handleColorPickerChange = (e) => {
        const selectedColor = e.target.value;
        setCurrentColor(selectedColor);
        updateShapeColor(selectedColor);
    };

    const windowInnerWidth = useWindowWidth();

    const grayShades = [
        '#1E2A35', '#2F4353', '#3C4A5F', '#4B5C6B', '#5A6C7A', '#ffffff'
    ];

    const defaultPalette = [
        '#E15B5B', '#DB5A8D', '#AA5223', '#7D22DB', '#5D88CA', '#5A9DE9',
        '#55B1F3', '#E36A5E', '#4CAEA2', '#6BC16A', '#B1CE56', '#F9DD64',
        '#FACC40', '#F9A940', '#F37D4B'
    ];

    const updateShapeColor = (color) => {
        setCurrentColor(color);
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

    const setTransparent = () => {
        const color = isTransparent ? '#FFFFFF' : "transparent";
        setIsTransparent(!isTransparent);
        setCurrentColor(color);
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
    }

    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <div className="flex justify-between items-center">
                <Label htmlFor="transparent">
                    Transparent
                </Label>
                <Switch
                    id="transparent"
                    className="border border-white"
                    checked={isTransparent}
                    onCheckedChange={setTransparent}
                />
            </div>
            <Input
                type="text"
                value={currentColor || ''}
                onChange={handleHexInputChange}
                placeholder="paste a hex color here"
                className="placeholder:text-[#d8dce3]"
                disabled={isTransparent} />
            <div className={`space-y-2 ${isTransparent ? 'opacity-50 pointer-events-none' : ''}`}>
                <Label>Custom colors</Label>
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
                                value={currentColor}
                                onChange={handleColorPickerChange}
                                className="opacity-0 absolute w-1 h-1 left-0 right-0 m-auto bottom-0"
                            />
                        }
                    </div>
                </div>
            </div>
            <div className={`space-y-2 ${isTransparent ? 'opacity-50 pointer-events-none' : ''}`}>
                <BrandColors handlePaletteColorSelect={updateShapeColor} selectedColor={currentColor} />
                <a href={`${import.meta.env.VITE_APP_URL}/branding/colors`} target="_blank" className="text-xs font-medium text-white cursor-pointer hover:underline">Manage brand colors</a>
            </div>
            <div className={`space-y-2 ${isTransparent ? 'opacity-50 pointer-events-none' : ''}`}>
                <Label>Default Palette</Label>
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
            <div className={`space-y-2 ${isTransparent ? 'opacity-50 pointer-events-none' : ''}`}>
                <Label>Grey shades</Label>
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