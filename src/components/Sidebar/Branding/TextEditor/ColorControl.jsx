import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Baseline } from 'lucide-react';

export default function ColorControl ({ config, updateConfig }){
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [selectedColor, setSelectedColor] = useState(config.textColor);
    const colorInputRef = useRef(null);

    const handleColorClick = () => {
        setShowColorPicker(true);
        setTimeout(() => colorInputRef.current?.click(), 10);
    };

    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
        updateConfig({
            textColor: e.target.value
        });
    };

    return (
        <div className='relative w-fit'>
            <Button
                variant="ghost"
                onClick={handleColorClick}
            >
                <Baseline />
            </Button>
            {showColorPicker &&
                <input
                    ref={colorInputRef}
                    type="color"
                    value={selectedColor}
                    onChange={handleColorChange}
                    className="opacity-0 absolute w-1 h-1 left-0 right-0 m-auto bottom-0"
                />
            }
        </div>
    );
};
