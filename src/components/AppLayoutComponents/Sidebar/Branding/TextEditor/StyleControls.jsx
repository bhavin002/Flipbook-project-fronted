import React from 'react';
import { Bold, Italic, Underline, Strikethrough } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function StyleControls({ config, updateConfig }) {
    const toggleBold = () => {
        const isBold = config.styles.includes('bold');
        if (isBold) {
            updateConfig({
                styles: config.styles.filter(s => s !== 'bold'),
                fontWeight: 'regular'
            });
        } else {
            updateConfig({
                styles: [...config.styles, 'bold'],
                fontWeight: 'bold'
            });
        }
    };

    const toggleStyle = (style) => {
        if (style === 'bold') {
            toggleBold();
            return;
        }

        const newStyles = [...config.styles];
        const styleIndex = newStyles.indexOf(style);

        if (styleIndex === -1) {
            newStyles.push(style);
        } else {
            newStyles.splice(styleIndex, 1);
        }

        updateConfig({
            styles: newStyles
        });
    };

    return (
        <ToggleGroup type="multiple" className="flex gap-2" value={config.styles}>
            <ToggleGroupItem
            disabled={config.isBoldDisabled}
                value="bold"
                aria-label="Toggle bold"
                variant="outline"
                onClick={() => toggleBold()}
            >
                <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
                disabled={config.isItalicDisabled}
                value="italic"
                aria-label="Toggle italic"
                variant="outline"
                onClick={() => toggleStyle('italic')}
            >
                <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
                value="underline"
                aria-label="Toggle underline"
                variant="outline"
                onClick={() => toggleStyle('underline')}
            >
                <Underline className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
                value="strikethrough"
                aria-label="Toggle strikethrough"
                variant="outline"
                onClick={() => toggleStyle('strikethrough')}
            >
                <Strikethrough className="h-4 w-4" />
            </ToggleGroupItem>
        </ToggleGroup>
    );
};
