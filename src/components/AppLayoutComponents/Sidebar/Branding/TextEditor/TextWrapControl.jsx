import React from 'react';
import { Button } from '@/components/ui/button';
import { WrapText } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function TextWrapControl({ config, updateConfig }) {
    const renderTextWrapIcon = () => {
        switch (config.textWrap) {
            case 'nowrap':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" aria-label="Clip text" className="h-4 w-4">
                        <path d="M160-160v-640h80v640h-80Zm560 0v-280H320v-80h400v-280h80v640h-80Z"></path>
                    </svg>
                );
            case 'wrap':
                return <WrapText className="h-4 w-4" />;
            default:
                return <WrapText className="h-4 w-4" />;
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost">
                    {renderTextWrapIcon()}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-1 w-auto" align="center">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateConfig({ textWrap: 'nowrap' })}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" aria-label="Clip text" className="h-4 w-4">
                        <path d="M160-160v-640h80v640h-80Zm560 0v-280H320v-80h400v-280h80v640h-80Z"></path>
                    </svg>
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateConfig({ textWrap: 'wrap' })}
                >
                    <WrapText />
                </Button>
            </PopoverContent>
        </Popover>
    );
};
