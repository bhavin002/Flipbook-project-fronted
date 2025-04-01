import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TemplateDetailView = ({ template, onBackClick }) => {
    const [hoveredPageIndex, setHoveredPageIndex] = useState(null);

    return (
        <div className="px-6 pt-6 pb-2 space-y-4 flex flex-col h-[100vh]">
            <div className="flex justify-between items-center gap-2">
                <Button
                    variant="outline"
                    className="text-primary"
                    onClick={onBackClick}
                >
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <Button className="w-full">
                    Use all {template.pages} pages
                </Button>
            </div>
            <div className="h-0 overflow-y-auto flex-grow">
                <div className="grid grid-cols-2 gap-4">
                    {template.pageThumbnails.map((thumbnail, index) => (
                        <div
                            key={index}
                            className="relative cursor-pointer rounded-lg overflow-hidden"
                            onMouseEnter={() => setHoveredPageIndex(index)}
                            onMouseLeave={() => setHoveredPageIndex(null)}
                        >
                            <div className="relative aspect-[4/3]">
                                <img
                                    src={thumbnail}
                                    alt={`Page ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                {hoveredPageIndex === index && (
                                    <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded-md">
                                        {index + 1} page
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TemplateDetailView;