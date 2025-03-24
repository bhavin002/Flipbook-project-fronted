import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TextCaseControl({ config, updateConfig }) {
    const renderTextCaseIcon = () => {
        switch (config.textCase) {
            case 'none':
                return <span className="text-sm">aA</span>;
            case 'capitalize':
                return <span className="text-sm">Aa</span>;
            case 'uppercase':
                return <span className="text-sm">AA</span>;
            case 'lowercase':
                return <span className="text-sm">aa</span>;
            default:
                return <span className="text-sm">aA</span>;
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                    {renderTextCaseIcon()}
                    <ChevronDown className="h-3 w-3" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => updateConfig({ textCase: 'none' })}>
                    <span className="text-base">aA</span>
                    <span className="text-sm ml-4">None</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateConfig({ textCase: 'capitalize' })}>
                    <span className="text-base">Aa</span>
                    <span className="text-sm ml-4">Capitalize</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateConfig({ textCase: 'uppercase' })}>
                    <span className="text-base">AA</span>
                    <span className="text-sm ml-4">Uppercase</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateConfig({ textCase: 'lowercase' })}>
                    <span className="text-base">aa</span>
                    <span className="text-sm ml-4">Lowercase</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
