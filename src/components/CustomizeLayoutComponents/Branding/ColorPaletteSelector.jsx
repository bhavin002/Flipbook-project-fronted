import React, { useRef, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Info, Plus } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ColorPaletteSelector() {
    const [isNewColorAdded, setIsNewColorAdded] = useState(false);
    const colorInputRef = useRef(null);
    const handleAddColor = () => {
        setIsNewColorAdded(true);
        setTimeout(() => colorInputRef.current?.click(), 10);
    };

    const brandColors = [
        '#808080', '#A9A9A9'
    ];

    const defaultPalette = [
        '#1E2A35', '#2F4353', '#3C4A5F', '#4B5C6B', '#5A6C7A', '#697C88', '#788C96', '#879BA4',
        '#4B8BA4', '#44A69C', '#5DC48E', '#C0C0C0', '#B0E0E6', '#B3E5B3', '#F0E68C', '#F5B4B4', '#F08080'
    ];

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-2">
                <div className='flex gap-2 items-center'>
                    <Label>Brand Colors</Label>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-gray-500 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent
                                side="right"
                                align="center"
                                className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
                            >
                                <p className="text-sm">Create unique link for each lead to track their interactions in your flipbook</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="flex gap-2">
                    {brandColors.map((color, index) => (
                        <div
                            key={index}
                            className="w-8 h-8 rounded cursor-pointer hover:border-2 border-[#7b39ed]"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label>Default Palette</Label>
                <div className="flex flex-wrap gap-2">
                    <div className='relative w-fit'>
                        <div onClick={handleAddColor}
                            className="w-8 h-8 rounded cursor-pointer hover:border-2 border-[#7b39ed] bg-gray-500 flex items-center justify-center"
                        >
                            <Plus color='white' />
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
                    {defaultPalette.map((color, index) => (
                        <div
                            key={index}
                            className="w-8 h-8 rounded cursor-pointer hover:border-2 border-[#7b39ed]"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};