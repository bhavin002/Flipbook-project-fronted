import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import { createBrandColorApi, updateBrandColorApi, getBrandColorsApi, deleteBrandColorApi } from '@/service/brandColor.service';
import ConfirmationDialog from '@/utils/ConfirmationDialog';
import { toast } from 'sonner';

export default function BrandingColors() {
    const [colors, setColors] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isNewColorAdded, setIsNewColorAdded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [colorToDelete, setColorToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const colorInputRef = useRef(null);
    const containerRef = useRef(null);
    const debounceTimerRef = useRef(null);

    useEffect(() => {
        fetchColors();
    }, []);

    const fetchColors = async () => {
        setIsLoading(true);
        try {
            const response = await getBrandColorsApi();
            setColors(response.data.map(c => ({ id: c._id, name: c.name })));
        } catch (error) {
            toast.error('Error fetching colors', { description: error.message || 'Oops! Something went wrong.' });
        } finally {
            setIsLoading(false);
        }
    };

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

    const debouncedUpdateColor = useCallback(async (colorId, newColor, index) => {

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(async () => {
            try {
                await updateBrandColorApi(colorId, { name: newColor });
        
            } catch (error) {
                toast.error('Failed to update color', { description: error.message || 'Oops! Something went wrong.' });
        
                setColors(prevColors => {
                    const updatedColors = [...prevColors];
            
                    return updatedColors;
                });
            }
        }, 500)
    }, []);

    const handleAddColor = async () => {
        setIsSaving(true);
        try {
            const response = await createBrandColorApi({ name: '#FFFFFF' });
            const newColor = { id: response.data.colorId, name: '#FFFFFF' };
            setColors(prev => [...prev, newColor]);
            const newIndex = colors.length;
            setSelectedIndex(newIndex);
            setIsNewColorAdded(true);
    
            setTimeout(() => {
                if (colorInputRef.current) {
                    colorInputRef.current.click();
                }
            }, 100);
        } catch (error) {
            toast.error('Failed to add color', { description: error.message || 'Oops! Something went wrong.' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleColorChange = async (e) => {
        if (selectedIndex === null) return;
        const newColor = e.target.value;
        const colorObj = colors[selectedIndex];
        if (!colorObj) return;


        const updatedColors = [...colors];
        updatedColors[selectedIndex] = { ...colorObj, name: newColor };
        setColors(updatedColors);


        debouncedUpdateColor(colorObj.id, newColor, selectedIndex);
    };

    const handleColorBoxClick = (index) => {
        setSelectedIndex(index);
        setIsNewColorAdded(false);
        setTimeout(() => colorInputRef.current?.click(), 10);
    };

    const handleRemoveColor = (index, e) => {
        e.stopPropagation();
        setColorToDelete({ ...colors[index], index });
    };

    const confirmDeleteColor = async () => {
        if (!colorToDelete) return;
        setIsDeleting(true);
        try {
            const response = await deleteBrandColorApi(colorToDelete.id);
            setColors(prev => prev.filter((_, i) => i !== colorToDelete.index));
            setSelectedIndex(null);
            toast.success('Color deleted', {
                description: response.message
            });
        } catch (error) {
            toast.error('Failed to delete color', { description: error.message || 'Oops! Something went wrong.' });
        } finally {
            setIsDeleting(false);
            setColorToDelete(null);
        }
    };

    const handleInputChange = async (e, index) => {
        let value = e.target.value;
        if (!value.startsWith('#')) value = '#' + value;
        const hexRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;
        if (hexRegex.test(value)) {
            const colorObj = colors[index];
            if (!colorObj) return;

    
            const updatedColors = [...colors];
            updatedColors[index] = { ...colorObj, name: value };
            setColors(updatedColors);
    
            debouncedUpdateColor(colorObj.id, value, index);
        }
    };

    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    return (
        <>
            <div className="p-6 max-w-[100vw] overflow-auto space-y-4 pt-0 flex-1 flex flex-col max-md:max-h-[calc(100vh-156px-80px)]" ref={containerRef}>
                <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                    <h1 className="text-2xl font-bold mb-2">Colors</h1>
                    <p className="text-gray-500">Set your default brand colors for the Design Studio and flipbook backgrounds.</p>
                </div>

                <div className="flex flex-col space-y-4">
                    <div className='relative w-fit'>
                        <Button
                            onClick={handleAddColor}
                            disabled={isSaving || isLoading}
                        >
                            + Add Color
                        </Button>
                        {isNewColorAdded && selectedIndex !== null && (
                            <input
                                ref={colorInputRef}
                                type="color"
                                value={colors[selectedIndex]?.name || '#FFFFFF'}
                                onChange={handleColorChange}
                                className="opacity-0 absolute w-1 h-1 left-0 right-0 m-auto bottom-0"
                                disabled={isSaving}
                            />
                        )}
                    </div>
                    {isLoading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <div key={idx} className="animate-pulse bg-gray-200 h-24 rounded-lg" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {colors.map((color, index) => (
                                <div
                                    key={color.id}
                                    className="group relative w-full aspect-square bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 animate-in fade-in zoom-in"
                                    data-color-box
                                >
                                    <div
                                        className="w-full h-3/4 rounded-t-lg cursor-pointer relative overflow-hidden"
                                        style={{ backgroundColor: color.name }}
                                        onClick={() => handleColorBoxClick(index)}
                                    >
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 z-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 bg-white/90 hover:bg-white/90 text-red-500 rounded-full h-7 w-7"
                                            onClick={(e) => handleRemoveColor(index, e)}
                                            disabled={isDeleting}
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                        {selectedIndex === index && (
                                            <div className="absolute inset-0 border-2 border-primary rounded-t-lg pointer-events-none z-0"></div>
                                        )}
                                    </div>
                                    <div className="p-2">
                                        <Input
                                            value={color.name.toUpperCase()}
                                            onChange={(e) => handleInputChange(e, index)}
                                            className="text-center text-sm font-mono border-none focus:ring-0 bg-gray-50 rounded-b-lg"
                                            maxLength={7}
                                            readOnly={false}
                                        />
                                    </div>
                                    {selectedIndex === index && !isNewColorAdded && (
                                        <input
                                            ref={colorInputRef}
                                            type="color"
                                            value={colors[selectedIndex]?.name || '#FFFFFF'}
                                            onChange={handleColorChange}
                                            className="opacity-0 absolute w-1 h-1 left-0 right-0 m-auto top-0 bottom-10"
                                            disabled={isSaving}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <ConfirmationDialog
                isConfirmModalOpen={!!colorToDelete}
                setIsConfirmModalOpen={() => setColorToDelete(null)}
                title="Delete Color"
                description="Are you sure you want to delete this color? This action cannot be undone."
                onConfirm={confirmDeleteColor}
                isLoading={isDeleting}
            />
        </>
    );
}