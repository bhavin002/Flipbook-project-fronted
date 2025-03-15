import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function SpacingControl({ config, updateConfig }){
    const handleLetterSpacingChange = (vals) => {
        updateConfig({
            letterSpacing: vals[0]
        });
    };

    const handleLineHeightChange = (vals) => {
        const newLineHeight = vals[0] / 10;
        updateConfig({
            lineHeight: newLineHeight
        });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost">
                    Spacing
                </Button>
            </PopoverTrigger>
            <PopoverContent align="center">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label>Letter spacing</label>
                            <span>{config.letterSpacing}</span>
                        </div>
                        <Slider
                            value={[config.letterSpacing]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={handleLetterSpacingChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label>Line height</label>
                            <span>{config.lineHeight.toFixed(1)}</span>
                        </div>
                        <Slider
                            value={[config.lineHeight * 10]}
                            min={10}
                            max={30}
                            step={1}
                            onValueChange={handleLineHeightChange}
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};