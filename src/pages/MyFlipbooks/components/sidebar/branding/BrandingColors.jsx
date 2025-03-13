import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';

export default function BrandingColors() {
    const [colors, setColors] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isNewColorAdded, setIsNewColorAdded] = useState(false);
    const colorInputRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectedIndex !== null &&
                colorInputRef.current &&
                !colorInputRef.current.contains(event.target) &&
                !event.target.closest('[data-color-box]')) {
                setSelectedIndex(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [selectedIndex]);

    const handleAddColor = () => {
        setColors([...colors, '#FFFFFF']);
        const newIndex = colors.length;
        setSelectedIndex(newIndex);
        setIsNewColorAdded(true);
        setTimeout(() => colorInputRef.current?.click(), 10);
    };

    const handleColorChange = (e) => {
        if (selectedIndex === null) return;
        const newColor = e.target.value;
        const updatedColors = [...colors];
        updatedColors[selectedIndex] = newColor;
        setColors(updatedColors);
    };

    const handleColorBoxClick = (index) => {
        setSelectedIndex(index);
        setIsNewColorAdded(false);
        setTimeout(() => colorInputRef.current?.click(), 10);
    };

    const handleRemoveColor = (index, e) => {
        e.stopPropagation();
        const updatedColors = [...colors];
        updatedColors.splice(index, 1);
        setColors(updatedColors);
        if (selectedIndex === index) {
            setSelectedIndex(null);
        } else if (selectedIndex > index) {
            setSelectedIndex(selectedIndex - 1);
        }
    };

    const handleInputChange = (e, index) => {
        let value = e.target.value;
        if (!value.startsWith('#')) value = '#' + value;
        const hexRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;
        if (hexRegex.test(value)) {
            const updatedColors = [...colors];
            updatedColors[index] = value;
            setColors(updatedColors);
        }
    };

    return (
        <div className="flex flex-col max-w-[100vw] overflow-auto p-6 h-full" ref={containerRef}>
            {/* Header Section */}
            <div className="p-6 mb-8 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Brand fonts</h1>
                <p className="text-gray-500">Upload and manage custom fonts to use in your designs.</p>
            </div>

            {/* Main Content */}
            <div className="flex flex-col gap-8">
                <div className='relative w-fit'>
                    <Button
                        onClick={handleAddColor}
                    >
                        + Add Color
                    </Button>
                    {
                        isNewColorAdded && <input
                            ref={colorInputRef}
                            type="color"
                            value={selectedIndex !== null ? colors[selectedIndex] : '#FFFFFF'}
                            onChange={handleColorChange}
                            className="opacity-0 absolute w-1 h-1 left-0 right-0 m-auto bottom-0"
                        />
                    }


                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            className="group relative w-full aspect-square bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 animate-in fade-in zoom-in"
                            data-color-box
                        >
                            <div
                                className="w-full h-3/4 rounded-t-lg cursor-pointer relative overflow-hidden"
                                style={{ backgroundColor: color }}
                                onClick={() => handleColorBoxClick(index)}
                            >
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 bg-white/90 hover:bg-white/90 text-red-500 rounded-full h-7 w-7"
                                    onClick={(e) => handleRemoveColor(index, e)}
                                >
                                    <Trash2 size={16} />
                                </Button>
                                {selectedIndex === index && (
                                    <div className="absolute inset-0 border-2 border-primary rounded-t-lg animate-pulse pointer-events-none"></div>
                                )}
                            </div>
                            <div className="p-2">
                                <Input
                                    value={color.toUpperCase()}
                                    onChange={(e) => handleInputChange(e, index)}
                                    className="text-center text-sm font-mono border-none focus:ring-0 bg-gray-50 rounded-b-lg"
                                    maxLength={7}
                                    readOnly={true}
                                />
                            </div>
                            {
                                selectedIndex == index && !isNewColorAdded && <input
                                    ref={colorInputRef}
                                    type="color"
                                    value={selectedIndex !== null ? colors[selectedIndex] : '#FFFFFF'}
                                    onChange={handleColorChange}
                                    className="opacity-0 absolute  w-1 h-1 left-0 right-0 m-auto top-0 bottom-10"
                                />
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}