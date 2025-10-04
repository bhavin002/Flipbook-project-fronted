import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import dynamicFontManager, { FONT_CATEGORIES } from '@/utils/dynamicFontManager';

/**
 * Dynamic Font Demo Component
 * Demonstrates the dynamic font management system with ID-based loading
 */
export default function DynamicFontDemo() {
    const [fonts, setFonts] = useState([]);
    const [filteredFonts, setFilteredFonts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedFontId, setSelectedFontId] = useState('system-arial');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState({});
    const [sampleText, setSampleText] = useState('The quick brown fox jumps over the lazy dog');

    useEffect(() => {
        const loadFonts = async () => {
            setIsLoading(true);
            try {
                const allFonts = dynamicFontManager.getAllFonts();
                setFonts(allFonts);
                setFilteredFonts(allFonts);
                
                // Preload some common fonts
                const commonFontIds = ['system-arial', 'system-helvetica', 'system-times'];
                await dynamicFontManager.preloadFonts(commonFontIds);
            } catch (error) {
                console.error('Error loading fonts:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadFonts();
    }, []);

    // Filter fonts based on search and category
    useEffect(() => {
        let filtered = fonts;

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(font => font.category === selectedCategory);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(font => 
                font.name.toLowerCase().includes(query) ||
                font.family.toLowerCase().includes(query) ||
                font.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        setFilteredFonts(filtered);
    }, [fonts, selectedCategory, searchQuery]);

    const handleFontSelect = async (fontId) => {
        setSelectedFontId(fontId);
        setLoadingStatus(prev => ({ ...prev, [fontId]: 'loading' }));
        
        try {
            const isLoaded = await dynamicFontManager.loadFontById(fontId);
            setLoadingStatus(prev => ({ 
                ...prev, 
                [fontId]: isLoaded ? 'loaded' : 'failed' 
            }));
        } catch (error) {
            console.error('Error loading font:', error);
            setLoadingStatus(prev => ({ ...prev, [fontId]: 'failed' }));
        }
    };

    const getLoadingIcon = (fontId) => {
        const status = loadingStatus[fontId];
        if (status === 'loading') return <Loader2 className="h-4 w-4 animate-spin" />;
        if (status === 'loaded') return <CheckCircle className="h-4 w-4 text-green-500" />;
        if (status === 'failed') return <AlertCircle className="h-4 w-4 text-red-500" />;
        return null;
    };

    const selectedFont = dynamicFontManager.getFontById(selectedFontId);

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Dynamic Font Management System</CardTitle>
                    <CardDescription>
                        ID-based font loading with dynamic injection via script/link tags. 
                        Similar to Flipsnack's font system.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Sample Text Preview */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Sample Text Preview:</label>
                        <Input
                            value={sampleText}
                            onChange={(e) => setSampleText(e.target.value)}
                            placeholder="Enter sample text..."
                            className="mb-2"
                        />
                        <div 
                            className="p-4 border rounded-lg bg-gray-50 text-2xl"
                            style={{ 
                                fontFamily: selectedFont ? `"${selectedFont.family}", Arial, sans-serif` : 'Arial'
                            }}
                        >
                            {sampleText}
                        </div>
                    </div>

                    {/* Font Search and Filter */}
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search fonts by name or tags..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Button
                                onClick={() => {
                                    const stats = dynamicFontManager.getStats();
                                    alert(`Font Stats:\nTotal: ${stats.totalFonts}\nLoaded: ${stats.loadedFonts}\nLoading: ${stats.loadingFonts}\nInjected Links: ${stats.injectedLinks}`);
                                }}
                                variant="outline"
                            >
                                Show Stats
                            </Button>
                        </div>

                        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                            <TabsList className="grid w-full grid-cols-6">
                                {FONT_CATEGORIES.map(category => (
                                    <TabsTrigger key={category.id} value={category.id}>
                                        <span className="mr-1">{category.icon}</span>
                                        {category.name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </div>

                    {/* Font Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                        {isLoading ? (
                            <div className="col-span-full text-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                                <p>Loading fonts...</p>
                            </div>
                        ) : (
                            filteredFonts.map((font) => (
                                <Card 
                                    key={font.id}
                                    className={`cursor-pointer transition-all hover:shadow-md ${
                                        selectedFontId === font.id ? 'ring-2 ring-blue-500' : ''
                                    }`}
                                    onClick={() => handleFontSelect(font.id)}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <h3 
                                                    className="font-semibold text-lg"
                                                    style={{ fontFamily: font.family }}
                                                >
                                                    {font.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {font.category} • {font.type}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {getLoadingIcon(font.id)}
                                                <Badge 
                                                    variant={font.type === 'system' ? 'secondary' : 'outline'}
                                                    className="text-xs"
                                                >
                                                    {font.type}
                                                </Badge>
                                            </div>
                                        </div>
                                        
                                        {/* Font Preview */}
                                        <div 
                                            className="text-sm mb-2 p-2 bg-gray-50 rounded"
                                            style={{ fontFamily: font.family }}
                                        >
                                            Aa Bb Cc
                                        </div>
                                        
                                        {/* Font Tags */}
                                        <div className="flex flex-wrap gap-1">
                                            {font.tags.slice(0, 3).map(tag => (
                                                <Badge key={tag} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                            {font.tags.length > 3 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{font.tags.length - 3}
                                                </Badge>
                                            )}
                                        </div>
                                        
                                        {/* Font Weights */}
                                        <div className="mt-2 text-xs text-gray-500">
                                            Weights: {font.weights.join(', ')}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>

                    {filteredFonts.length === 0 && !isLoading && (
                        <div className="text-center py-8 text-gray-500">
                            No fonts found matching your criteria
                        </div>
                    )}

                    {/* Selected Font Details */}
                    {selectedFont && (
                        <Card className="bg-blue-50">
                            <CardContent className="p-4">
                                <h3 className="font-semibold mb-2">Selected Font Details</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <strong>Name:</strong> {selectedFont.name}
                                    </div>
                                    <div>
                                        <strong>Family:</strong> {selectedFont.family}
                                    </div>
                                    <div>
                                        <strong>Type:</strong> {selectedFont.type}
                                    </div>
                                    <div>
                                        <strong>Category:</strong> {selectedFont.category}
                                    </div>
                                    <div>
                                        <strong>Weights:</strong> {selectedFont.weights.join(', ')}
                                    </div>
                                    <div>
                                        <strong>Styles:</strong> {selectedFont.styles.join(', ')}
                                    </div>
                                    <div>
                                        <strong>Status:</strong> {dynamicFontManager.isFontLoaded(selectedFont.id) ? 'Loaded' : 'Not Loaded'}
                                    </div>
                                    <div>
                                        <strong>ID:</strong> {selectedFont.id}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Usage Instructions */}
                    <Card className="bg-gray-50">
                        <CardContent className="p-4">
                            <h3 className="font-semibold mb-2">How It Works</h3>
                            <ul className="text-sm space-y-1 text-gray-600">
                                <li>• <strong>Font IDs:</strong> Each font has a unique ID for backend integration</li>
                                <li>• <strong>Dynamic Loading:</strong> Fonts are loaded on-demand via Google Fonts API</li>
                                <li>• <strong>Script Injection:</strong> Fonts are injected as &lt;link&gt; tags in document head</li>
                                <li>• <strong>System Fonts:</strong> Always available, no loading required</li>
                                <li>• <strong>Search & Filter:</strong> Find fonts by name, category, or tags</li>
                                <li>• <strong>Preview:</strong> See font names in their actual typeface</li>
                                <li>• <strong>Status Tracking:</strong> Monitor loading status for each font</li>
                            </ul>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
}

