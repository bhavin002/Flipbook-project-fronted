import React from 'react';
import { Button } from '@/components/ui/button';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function AlignmentControl({ config, updateConfig }) {
    const renderAlignmentIcon = () => {
        switch (config.alignment) {
            case 'left':
                return <AlignLeft className="h-4 w-4" />;
            case 'center':
                return <AlignCenter className="h-4 w-4" />;
            case 'right':
                return <AlignRight className="h-4 w-4" />;
            case 'justify':
                return <AlignJustify className="h-4 w-4" />;
            default:
                return <AlignLeft className="h-4 w-4" />;
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost">
                    {renderAlignmentIcon()}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-1 w-auto" align="center">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateConfig({ alignment: 'left' })}
                >
                    <AlignLeft />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateConfig({ alignment: 'center' })}
                >
                    <AlignCenter />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateConfig({ alignment: 'right' })}
                >
                    <AlignRight />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateConfig({ alignment: 'justify' })}
                >
                    <AlignJustify />
                </Button>
            </PopoverContent>
        </Popover>
    );
};
