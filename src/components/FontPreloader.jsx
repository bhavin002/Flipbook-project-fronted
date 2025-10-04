import React, { useEffect, useState } from 'react';
import { preloadAllFonts } from '@/utils/dynamicFontManager';

/**
 * Font Preloader Component
 * Preloads all fonts when the app starts
 */
export default function FontPreloader({ children }) {
    const [isPreloading, setIsPreloading] = useState(true);
    const [preloadProgress, setPreloadProgress] = useState(0);

    useEffect(() => {
        const preloadFonts = async () => {
            try {
                console.log('🚀 Starting font preload...');
                const startTime = Date.now();
                
                const results = await preloadAllFonts();
                const endTime = Date.now();
                
                console.log(`✅ Font preload completed in ${endTime - startTime}ms`);
                console.log('📊 Preload results:', results);
                
                setPreloadProgress(100);
            } catch (error) {
                console.error('❌ Font preload failed:', error);
            } finally {
                setIsPreloading(false);
            }
        };

        preloadFonts();
    }, []);

    // Show loading indicator while preloading
    if (isPreloading) {
        return (
            <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Fonts</h2>
                    <p className="text-gray-600 mb-4">Preloading all fonts for the best experience...</p>
                    <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
                        <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${preloadProgress}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{preloadProgress}% complete</p>
                </div>
            </div>
        );
    }

    return children;
}
