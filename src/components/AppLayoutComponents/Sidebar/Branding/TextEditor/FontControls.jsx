import React from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function FontControls({ config, updateConfig }) {
    const handleFontWeightChange = (value) => {
        const newStyles = [...config.styles];

        if (value === 'bold') {
            if (!newStyles.includes('bold')) {
                newStyles.push('bold');
            }
        } else {
            const boldIndex = newStyles.indexOf('bold');
            if (boldIndex !== -1) {
                newStyles.splice(boldIndex, 1);
            }
        }

        updateConfig({
            fontWeight: value,
            styles: newStyles
        });
    };

    const handleFontSizeChange = (e) => {
        updateConfig({
            fontSize: parseInt(e.target.value)
        });
    };

    return (
        <>
            <div className='flex gap-2'>
                <Select
                    value={config.fontFamily}
                    onValueChange={(val) => updateConfig({ fontFamily: val })}
                >
                    <SelectTrigger className="min-w-[150px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="font-sans">Font Sans</SelectItem>
                        <SelectItem value="font-serif">Font Serif</SelectItem>
                        <SelectItem value="font-mono">Font Mono</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={config.fontWeight} onValueChange={handleFontWeightChange}>
                    <SelectTrigger className="min-w-[150px]">
                        <SelectValue placeholder="Weight" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="regular">Regular</SelectItem>
                        {config.isBoldDisabled ? null : <SelectItem value="bold">Bold</SelectItem>}
                    </SelectContent>
                </Select>
            </div>

            <Input
                type="number"
                value={config.fontSize}
                onChange={handleFontSizeChange}
                className="w-16 text-center"
            />
        </>
    );
}