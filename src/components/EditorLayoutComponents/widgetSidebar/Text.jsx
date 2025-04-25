import React, { useEffect, useState } from 'react';
import {
    Bold,
    Italic,
    Underline,
    StrikethroughIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    ChevronDown,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { FilterSlider } from '@/components/ui/filterSlider';

export default function Text({ selectedShape, setMainStage, mainStage, selectedIndex }) {
    const [textStyle, setTextStyle] = useState({
        text: selectedShape?.[0]?.attrs.text || '',
        fontFamily: selectedShape?.[0]?.attrs.fontFamily || 'Arial',
        fontSize: selectedShape?.[0]?.attrs.fontSize || 16,
        fontWeight: selectedShape?.[0]?.attrs.fontWeight || 'normal',
        fontStyle: selectedShape?.[0]?.attrs.fontStyle || 'normal',
        textDecoration: selectedShape?.[0]?.attrs.textDecoration || '',
        align: selectedShape?.[0]?.attrs.align || 'left',
        textTransform: selectedShape?.[0]?.attrs.textTransform || 'none',
        letterSpacing: selectedShape?.[0]?.attrs.letterSpacing || 0,
        lineHeight: selectedShape?.[0]?.attrs.lineHeight || 1
    });

    const textTransformItems = [
        { id: 1, icon: "Aa", name: 'Capitalize', value: 'capitalize' },
        { id: 2, icon: "AA", name: 'Uppercase', value: 'uppercase' },
        { id: 3, icon: "aa", name: 'Lowercase', value: 'lowercase' },
        { id: 4, icon: "aA", name: "None", value: "none" }
    ];

    useEffect(() => {
        if (selectedShape && selectedShape[0]) {
            setTextStyle({
                text: selectedShape[0].attrs.text || '',
                fontFamily: selectedShape[0].attrs.fontFamily || 'Arial',
                fontSize: selectedShape[0].attrs.fontSize || 16,
                fontWeight: selectedShape[0].attrs.fontWeight || 'normal',
                fontStyle: selectedShape[0].attrs.fontStyle || 'normal',
                textDecoration: selectedShape[0].attrs.textDecoration || '',
                align: selectedShape[0].attrs.align || 'left',
                textTransform: selectedShape[0].attrs.textTransform || 'none',
                letterSpacing: selectedShape[0].attrs.letterSpacing || 0,
                lineHeight: selectedShape[0].attrs.lineHeight || 1
            });
        }
    }, [selectedShape]);

    const updateItem = (key, value) => {
        if (!selectedShape || !selectedShape[0]) return;

        const updatedShapes = mainStage[selectedIndex].shapes.map(shape => {
            if (selectedShape.some(e => shape.id === e.attrs.id)) {
                return {
                    ...shape,
                    [key]: value
                };
            }
            return shape;
        });

        const updatedStage = [...mainStage];
        updatedStage[selectedIndex].shapes = updatedShapes;
        setMainStage(updatedStage);
    };

    const getCurrentFontWeight = () => {
        return textStyle.fontStyle.includes('bold') ? 'bold' : 'normal';
    };

    const isItalicActive = () => {
        return textStyle.fontStyle.includes('italic');
    };

    const handleFontWeightChange = (weight) => {
        setTextStyle(prev => {
            const isItalic = isItalicActive();
            const newStyle = weight === 'bold'
                ? `${isItalic ? 'italic ' : ''}bold`
                : (isItalic ? 'italic' : 'normal');
            updateItem('fontStyle', newStyle);
            return {
                ...prev,
                fontStyle: newStyle
            };
        });
    };

    const handleLetterSpacingChange = (value) => {
        const spacing = value[0];
        updateItem('letterSpacing', spacing);
        setTextStyle(prev => ({
            ...prev,
            letterSpacing: spacing
        }));
    };

    const handleLineHeightChange = (value) => {
        const height = value[0];
        updateItem('lineHeight', height);
        setTextStyle(prev => ({
            ...prev,
            lineHeight: height
        }));
    };

    const toggleItalic = () => {
        setTextStyle(prev => {
            const currentWeight = getCurrentFontWeight();
            const hasItalic = isItalicActive();

            if (hasItalic) {
                updateItem('fontStyle', currentWeight === 'bold' ? 'bold' : 'normal');
                return {
                    ...prev,
                    fontStyle: currentWeight === 'bold' ? 'bold' : 'normal'
                };
            } else {
                updateItem('fontStyle', `italic${currentWeight === 'bold' ? ' bold' : ''}`);
                return {
                    ...prev,
                    fontStyle: `italic${currentWeight === 'bold' ? ' bold' : ''}`
                };
            }
        });
    };

    const toggleStyle = (property, value) => {
        setTextStyle(prev => {
            const newStyle = { ...prev };

            switch (property) {
                case 'textDecoration':
                    if (value === 'underline') {
                        newStyle.textDecoration = prev.textDecoration.includes('underline')
                            ? prev.textDecoration.replace('underline', '').trim()
                            : `${prev.textDecoration} underline`.trim();
                    } else if (value === 'line-through') {
                        newStyle.textDecoration = prev.textDecoration.includes('line-through')
                            ? prev.textDecoration.replace('line-through', '').trim()
                            : `${prev.textDecoration} line-through`.trim();
                    }
                    break;
                case 'align':
                    newStyle[property] = value;
                    break;
                case 'textTransform':
                    if (value === 'capitalize') {
                        newStyle.text = prev.text.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
                        newStyle.textTransform = value;
                    } else if (value === 'uppercase') {
                        newStyle.text = prev.text.toUpperCase();
                        newStyle.textTransform = value;
                    } else if (value === 'lowercase') {
                        newStyle.text = prev.text.toLowerCase();
                        newStyle.textTransform = value;
                    } else {
                        newStyle.textTransform = value;
                    }
                    updateItem('text', newStyle.text);
                    break;
                default:
                    newStyle[property] = value;
            }
            updateItem(property, newStyle[property]);
            return newStyle;
        });
    };

    const handleFontSizeChange = (e) => {
        const size = parseInt(e.target.value);
        if (!isNaN(size) && size >= 0) {
            updateItem('fontSize', size);
            setTextStyle(prev => ({ ...prev, fontSize: size }));
        }
    };

    const getCurrentTextTransformIcon = () => {
        const transform = textTransformItems.find(item => item.value === textStyle.textTransform);
        return transform ? transform.icon : "aA";
    };

    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Label className="text-lg">Text</Label>
            <div className="space-y-4">
                <div>
                    <Label className="text-xs font-medium mb-1">Font</Label>
                    <Select
                        value={textStyle.fontFamily}
                        onValueChange={(value) => {
                            updateItem('fontFamily', value);
                            setTextStyle(prev => ({ ...prev, fontFamily: value }));
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select font" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Arial">Arial</SelectItem>
                            <SelectItem value="Helvetica">Helvetica</SelectItem>
                            <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                            <SelectItem value="Courier New">Courier New</SelectItem>
                            <SelectItem value="Verdana">Verdana</SelectItem>
                            <SelectItem value="Georgia">Georgia</SelectItem>
                            <SelectItem value="Palatino">Palatino</SelectItem>
                            <SelectItem value="Garamond">Garamond</SelectItem>
                            <SelectItem value="Bookman">Bookman</SelectItem>
                            <SelectItem value="Comic Sans MS">Comic Sans MS</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="fontWeight" className="text-xs font-medium">Font Weight</Label>
                        <Select
                            value={getCurrentFontWeight()}
                            onValueChange={handleFontWeightChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Weight" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="normal">Regular</SelectItem>
                                <SelectItem value="bold">Bold</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="fontSize" className="text-xs font-medium">Size</Label>
                        <Input
                            id="fontSize"
                            type="number"
                            value={textStyle.fontSize}
                            onChange={handleFontSizeChange}
                            min={0}
                            max={1000}
                            className="w-full"
                        />
                    </div>
                </div>

                <div className="flex gap-2 items-center">
                    <Button
                        variant={getCurrentFontWeight() === 'bold' ? "secondary" : "ghost"}
                        onClick={() => handleFontWeightChange(getCurrentFontWeight() === 'bold' ? 'normal' : 'bold')}
                    >
                        <Bold className="h-4 w-4" />
                    </Button>

                    <Button
                        variant={isItalicActive() ? "secondary" : "ghost"}
                        onClick={toggleItalic}
                    >
                        <Italic className="h-4 w-4" />
                    </Button>

                    <Button
                        variant={textStyle.textDecoration.includes('underline') ? "secondary" : "ghost"}
                        onClick={() => toggleStyle('textDecoration', 'underline')}
                    >
                        <Underline className="h-4 w-4" />
                    </Button>

                    <Button
                        variant={textStyle.textDecoration.includes('line-through') ? "secondary" : "ghost"}
                        onClick={() => toggleStyle('textDecoration', 'line-through')}
                    >
                        <StrikethroughIcon className="h-4 w-4" />
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto text-black">
                                <span className="font-bold mr-1">{getCurrentTextTransformIcon()}</span>
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {textTransformItems.map((option) => (
                                <DropdownMenuItem
                                    key={option.id}
                                    className={textStyle.textTransform === option.value ? "bg-accent" : ""}
                                    onClick={() => toggleStyle('textTransform', option.value)}
                                >
                                    <span className="font-bold mr-2">{option.icon}</span>
                                    {option.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant={textStyle.align === 'left' ? "secondary" : "ghost"}
                        size="icon"
                        onClick={() => toggleStyle('align', 'left')}
                    >
                        <AlignLeft className="h-4 w-4" />
                    </Button>

                    <Button
                        variant={textStyle.align === 'center' ? "secondary" : "ghost"}
                        size="icon"
                        onClick={() => toggleStyle('align', 'center')}
                    >
                        <AlignCenter className="h-4 w-4" />
                    </Button>

                    <Button
                        variant={textStyle.align === 'right' ? "secondary" : "ghost"}
                        size="icon"
                        onClick={() => toggleStyle('align', 'right')}
                    >
                        <AlignRight className="h-4 w-4" />
                    </Button>

                    <Button
                        variant={textStyle.align === 'justify' ? "secondary" : "ghost"}
                        size="icon"
                        onClick={() => toggleStyle('align', 'justify')}
                    >
                        <AlignJustify className="h-4 w-4" />
                    </Button>
                </div>

                <div>
                    <div className="flex justify-between">
                        <Label htmlFor="letterSpacing" className="text-xs font-medium">Letter spacing</Label>
                        <span className="text-sm">{textStyle.letterSpacing}</span>
                    </div>
                    <FilterSlider
                        id="letterSpacing"
                        min={-10}
                        max={80}
                        step={1}
                        value={[textStyle.letterSpacing]}
                        onValueChange={handleLetterSpacingChange}
                        className="mt-2"
                    />
                </div>

                <div>
                    <div className="flex justify-between">
                        <Label htmlFor="lineHeight" className="text-xs font-medium">Line height</Label>
                        <span className="text-sm">{textStyle.lineHeight.toFixed(1)}</span>
                    </div>
                    <FilterSlider
                        id="lineHeight"
                        min={0.5}
                        max={2.5}
                        step={0.1}
                        value={[textStyle.lineHeight]}
                        onValueChange={handleLineHeightChange}
                        className="mt-2"
                    />
                </div>
            </div>
        </div>
    );
}