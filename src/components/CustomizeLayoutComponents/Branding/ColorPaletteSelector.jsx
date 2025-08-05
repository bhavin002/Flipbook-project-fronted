import React, { useRef, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import BrandColors from '@/utils/BrandColors';

// Custom debounce function
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

export default function ColorPaletteSelector({ disabled, onChange, backgroundColor }) {
    const [isNewColorAdded, setIsNewColorAdded] = useState(false);
    const [selectedColor, setSelectedColor] = useState(backgroundColor);
    const colorInputRef = useRef(null);

    // Debounced onChange
    const debouncedOnChange = useRef(
        debounce((color) => {
            if (onChange) {
                onChange(color);
            }
        }, 500) // 500ms delay
    ).current;

    const handleAddColor = () => {
        if (disabled) return;
        setIsNewColorAdded(true);
        setTimeout(() => colorInputRef.current?.click(), 10);
    };

    const handleColorSelect = (color) => {
        if (disabled) return;
        setSelectedColor(color);
        debouncedOnChange(color); // Use debounced onChange
    };

    const handleColorPickerChange = (e) => {
        const color = e.target.value.toUpperCase();
        setSelectedColor(color);
        debouncedOnChange(color); // Use debounced onChange
    };

    const handleColorPickerClick = (e) => {
        e.stopPropagation();
    };

    const defaultPalette = [
        '#1E2A35', '#2F4353', '#3C4A5F', '#4B5C6B', '#5A6C7A', '#697C88', '#788C96', '#879BA4',
        '#4B8BA4', '#44A69C', '#5DC48E', '#C0C0C0', '#B0E0E6', '#B3E5B3', '#F0E68C', '#F5B4B4', '#F08080'
    ];

    return (
        <div className="space-y-4 text-white">
            <BrandColors handlePaletteColorSelect={handleColorSelect} selectedColor={selectedColor} />
            <div className="flex flex-col gap-2">
                <Label>Default Palette</Label>
                <div className="flex flex-wrap gap-2">
                    <div className='relative w-fit'>
                        <div
                            onClick={handleAddColor}
                            className={`w-8 h-8 rounded cursor-pointer hover:border-2 border-[#7b39ed] bg-gray-500 flex items-center justify-center ${disabled ? 'cursor-not-allowed opacity-50' : ''
                                }`}
                        >
                            <Plus color='white' />
                        </div>
                        {isNewColorAdded && (
                            <input
                                ref={colorInputRef}
                                type="color"
                                value={'#FFFFFF'}
                                onChange={handleColorPickerChange}
                                onClick={handleColorPickerClick}
                                className="opacity-0 absolute w-1 h-1 left-0 right-0 m-auto bottom-0"
                                disabled={disabled}
                            />
                        )}
                    </div>
                    {defaultPalette.map((color, index) => (
                        <div
                            key={index}
                            className={`w-8 h-8 rounded cursor-pointer hover:ring-2 hover:ring-blue-500 ${selectedColor === color ? 'ring-2 ring-blue-500' : ''
                                }`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorSelect(color)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}