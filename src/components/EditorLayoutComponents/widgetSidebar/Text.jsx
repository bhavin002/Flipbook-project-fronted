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
    Search,
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
import dynamicFontManager from '@/utils/dynamicFontManager';
import { SAMPLE_FONTS } from '@/data/sampleFonts';
import { Separator } from '@/components/ui/separator';

export default function Text({ selectedShape, setMainStage, mainStage, selectedIndex }) {
    const [textStyle, setTextStyle] = useState({
        text: selectedShape?.[0]?.attrs.text || '',
        fontFamily: selectedShape?.[0]?.attrs.fontFamily || 'Arial',
        fontId: selectedShape?.[0]?.attrs.fontId || '2',
        fontSize: selectedShape?.[0]?.attrs.fontSize || 16,
        fontWeight: selectedShape?.[0]?.attrs.fontWeight || 'normal',
        fontStyle: selectedShape?.[0]?.attrs.fontStyle || 'normal',
        textDecoration: selectedShape?.[0]?.attrs.textDecoration || '',
        align: selectedShape?.[0]?.attrs.align || 'left',
        textTransform: selectedShape?.[0]?.attrs.textTransform || 'none',
        letterSpacing: selectedShape?.[0]?.attrs.letterSpacing || 0,
        lineHeight: selectedShape?.[0]?.attrs.lineHeight || 1
    });

    // Font management state - Now using SAMPLE_FONTS
    const [allFonts, setAllFonts] = useState([...SAMPLE_FONTS]);
    const [filteredFonts, setFilteredFonts] = useState([...SAMPLE_FONTS]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [isLoadingFonts, setIsLoadingFonts] = useState(false);
    const [selectedFontId, setSelectedFontId] = useState('2');

    const textTransformItems = [
        { id: 1, icon: "Aa", name: 'Capitalize', value: 'capitalize' },
        { id: 2, icon: "AA", name: 'Uppercase', value: 'uppercase' },
        { id: 3, icon: "aa", name: 'Lowercase', value: 'lowercase' },
        { id: 4, icon: "aA", name: "None", value: "none" }
    ];

    // Load fonts on component mount - Initialize with SAMPLE_FONTS
    useEffect(() => {
        const loadFonts = async () => {
            setIsLoadingFonts(true);
            try {
                const combinedFonts = [...SAMPLE_FONTS];
                setAllFonts(combinedFonts);
                setFilteredFonts(combinedFonts);

                // Preload some common fonts (now including SAMPLE_FONTS defaults)
                const commonFontIds = [SAMPLE_FONTS[0]?.id, SAMPLE_FONTS[1]?.id, SAMPLE_FONTS[2]?.id].filter(Boolean);
                await dynamicFontManager.preloadFonts(commonFontIds);
            } catch (error) {
                console.error('Error loading fonts:', error);
            } finally {
                setIsLoadingFonts(false);
            }
        };

        loadFonts();
    }, []);

    // Filter fonts based on search query
    useEffect(() => {
        let filtered = allFonts;

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(font =>
                font.name.toLowerCase().includes(query) ||
                font.family.toLowerCase().includes(query)
            );
        }

        setFilteredFonts(filtered);
    }, [allFonts, searchQuery]);

    const handleSearch = () => {
        setSearchQuery(searchInput);
    };

    useEffect(() => {
        if (selectedShape && selectedShape[0]) {
            const fontId = selectedShape[0].attrs.fontId || '2';
            setTextStyle({
                text: selectedShape[0].attrs.text || '',
                fontFamily: selectedShape[0].attrs.fontFamily || 'Arial',
                fontId: fontId,
                fontSize: selectedShape[0].attrs.fontSize || 16,
                fontWeight: selectedShape[0].attrs.fontWeight || 'normal',
                fontStyle: selectedShape[0].attrs.fontStyle || 'normal',
                textDecoration: selectedShape[0].attrs.textDecoration || '',
                align: selectedShape[0].attrs.align || 'left',
                textTransform: selectedShape[0].attrs.textTransform || 'none',
                letterSpacing: selectedShape[0].attrs.letterSpacing || 0,
                lineHeight: selectedShape[0].attrs.lineHeight || 1
            });
            setSelectedFontId(fontId);
        }
    }, [selectedShape]);

    // Handle font selection - Dynamically loads font on click
    const handleFontSelect = async (fontId) => {
        setSelectedFontId(fontId);
        const font = allFonts.find(f => f.id === fontId);

        if (font) {
            const isLoaded = await dynamicFontManager.loadFontById(fontId);

            if (isLoaded) {
                updateItem({
                    fontId: fontId,
                    fontFamily: font.family
                });
                setTextStyle(prev => ({
                    ...prev,
                    fontId: fontId,
                    fontFamily: font.family
                }));
            } else {
                console.error(`Failed to load font: ${font.name}`);
            }
        }
    };

    const updateItem = (keyOrUpdates, value) => {
        if (!selectedShape || !selectedShape[0]) return;

        const selectedId = selectedShape[0].attrs.id;

        const updatedShapes = mainStage[selectedIndex].shapes.map(shape => {
            const shapeId = shape.attrs ? shape.attrs.id : shape.id;

            if (String(shapeId) === String(selectedId)) {
                if (typeof keyOrUpdates === 'object') {
                    if (shape.attrs) {
                        return {
                            ...shape,
                            attrs: {
                                ...shape.attrs,
                                ...keyOrUpdates
                            }
                        };
                    }
                    return {
                        ...shape,
                        ...keyOrUpdates
                    };
                }

                if (shape.attrs) {
                    return {
                        ...shape,
                        attrs: {
                            ...shape.attrs,
                            [keyOrUpdates]: value
                        }
                    };
                }
                return {
                    ...shape,
                    [keyOrUpdates]: value
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

    const getMeasuredWidth = (newFontSize) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const text = selectedShape?.[0]?.attrs?.text || textStyle.text || '';

        let fontString = '';
        if (textStyle.fontStyle.includes('italic')) fontString += 'italic ';
        if (textStyle.fontStyle.includes('bold') || textStyle.fontWeight === 'bold') fontString += 'bold ';

        fontString += `${newFontSize}px `;
        fontString += `"${textStyle.fontFamily}"`;

        context.font = fontString;
        let width = context.measureText(text).width;

        if (textStyle.letterSpacing && text.length > 1) {
            width += (text.length - 1) * textStyle.letterSpacing;
        }

        return width;
    };

    const handleFontSizeChange = (e) => {
        const size = parseInt(e.target.value);
        if (!isNaN(size) && size >= 0) {
            const text = selectedShape?.[0]?.attrs?.text || textStyle.text || '';

            // Check if text is a single word (no spaces, no newlines)
            // We also check for single letter specifically as requested
            const isSingleWord = !text.trim().includes(' ') && !text.includes('\n');
            const isSingleLetter = text.length === 1;

            const measuredTextWidth = getMeasuredWidth(size);
            const padding = selectedShape[0].attrs.padding || 0;
            const buffer = 50;
            const requiredWidth = Math.ceil(measuredTextWidth + (padding * 2) + buffer);

            const currentWidth = selectedShape[0].attrs.width || 0;

            const updates = {
                fontSize: size
            };

            // Only automatically expand width if:
            // 1. It's a single letter (always ensure it fits)
            // 2. It's a single word AND the current width is too small
            // 3. The current width is 0 (initial auto-width state)
            // This preserves wrapping for multi-word or multi-line text.
            if (currentWidth === 0 || isSingleLetter || (isSingleWord && requiredWidth > currentWidth)) {
                updates.width = requiredWidth;
            }

            updateItem(updates);
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
                        value={selectedFontId}
                        onValueChange={handleFontSelect}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select font">
                                {selectedFontId && (
                                    <span style={{
                                        fontFamily: allFonts.find(f => f.id === selectedFontId)?.family || 'Arial'
                                    }}>
                                        {allFonts.find(f => f.id === selectedFontId)?.name || 'Select font'}
                                    </span>
                                )}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                            <div className="sticky top-0 bg-white z-10 pb-2">
                                <div className="relative" onKeyDown={(e) => e.stopPropagation()}>
                                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        placeholder="Search fonts... (Press Enter)"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSearch();
                                            }
                                            e.stopPropagation();
                                        }}
                                        className="pl-8 h-8"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                                <Separator className="mt-2" />
                            </div>
                            <div className="max-h-48 overflow-y-auto">
                                {isLoadingFonts ? (
                                    <div className="p-4 text-center text-sm text-gray-500">
                                        Loading fonts...
                                    </div>
                                ) : (
                                    filteredFonts.map((font) => (
                                        <SelectItem
                                            key={font.id}
                                            value={font.id}
                                            className="cursor-pointer"
                                        >
                                            <div className="flex items-center justify-between w-full p-2">
                                                <img
                                                    src={font.preview}
                                                    alt={font.name}
                                                    className="h-6 mr-2"
                                                />
                                            </div>
                                        </SelectItem>
                                    ))
                                )}

                                {filteredFonts.length === 0 && !isLoadingFonts && (
                                    <div className="p-4 text-center text-sm text-gray-500">
                                        No fonts found
                                    </div>
                                )}
                            </div>
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
                        min={-50}
                        max={30}
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