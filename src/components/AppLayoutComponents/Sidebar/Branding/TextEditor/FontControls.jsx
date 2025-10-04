import React, { useEffect, useState } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import dynamicFontManager from '@/utils/dynamicFontManager';
import { SAMPLE_FONTS } from '@/data/sampleFonts';

export default function FontControls({ config, updateConfig }) {
    // Font management state
    const [allFonts, setAllFonts] = useState([...SAMPLE_FONTS]);
    const [filteredFonts, setFilteredFonts] = useState([...SAMPLE_FONTS]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoadingFonts, setIsLoadingFonts] = useState(false);
    const [selectedFontId, setSelectedFontId] = useState('145'); // Default to Abel font

    // Load fonts on component mount
    useEffect(() => {
        const loadFonts = async () => {
            setIsLoadingFonts(true);
            try {
                const combinedFonts = [...SAMPLE_FONTS];
                setAllFonts(combinedFonts);
                setFilteredFonts(combinedFonts);
                
                // Preload some common fonts
                const commonFontIds = ['145', '2', '21', '3287']; // Abel, Roboto, Montserrat, Open Sans
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

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(font => 
                font.name.toLowerCase().includes(query) ||
                font.family.toLowerCase().includes(query) ||
                font.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        setFilteredFonts(filtered);
    }, [allFonts, searchQuery]);

    // Sync selectedFontId with config.fontFamily when config changes
    useEffect(() => {
        if (config.fontFamily) {
            const matchingFont = allFonts.find(font => font.family === config.fontFamily);
            if (matchingFont) {
                setSelectedFontId(matchingFont.id);
            }
        }
    }, [config.fontFamily, allFonts]);

    // Handle font selection with dynamic loading
    const handleFontSelect = async (fontId) => {
        setSelectedFontId(fontId);
        const font = allFonts.find(f => f.id === fontId);
        
        if (font) {
            // Load font if not already loaded
            const isLoaded = await dynamicFontManager.loadFontById(fontId);
            
            if (isLoaded) {
                updateConfig({ fontFamily: font.family ,fontId: font.id});
            } else {
                console.error(`Failed to load font: ${font.name}`);
            }
        }
    };

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
                    value={selectedFontId}
                    onValueChange={handleFontSelect}
                >
                    <SelectTrigger className="min-w-[200px]">
                        <SelectValue placeholder="Select font">
                            {selectedFontId && (
                                <div className="flex items-center gap-2">
                                    <span style={{ 
                                        fontFamily: allFonts.find(f => f.id === selectedFontId)?.family || 'Arial' 
                                    }}>
                                        {allFonts.find(f => f.id === selectedFontId)?.name || 'Select font'}
                                    </span>
                                </div>
                            )}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                        {/* Search within dropdown */}
                        <div className="p-2 border-b">
                            <div className="relative">
                                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search fonts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-8 h-8"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>
                        
                        {/* Font List with Previews */}
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
                                            <div className="flex items-center gap-3">
                                                {/* Preview Image */}
                                                <img 
                                                    src={font.preview} 
                                                    alt={font.name} 
                                                    className="h-6 mr-2"
                                                />
                                            </div>
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

                <Select value={config.fontWeight} onValueChange={handleFontWeightChange}>
                    <SelectTrigger className="min-w-[150px]">
                        <SelectValue placeholder="Weight" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="normal">Regular</SelectItem>
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