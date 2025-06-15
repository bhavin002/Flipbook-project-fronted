import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from "@/components/ui/skeleton";

const TemplateDetailView = ({ template, onBackClick, loading, stageWidth, stageHeight }) => {
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
                <Button className="w-full" disabled={loading}>
                    Use all {template?.thumbnail?.length || 0} pages
                </Button>
            </div>
            <div className="h-0 overflow-y-auto flex-grow">
                <div className="grid grid-cols-2 gap-4">
                    {loading ? (
                        [...Array(4)].map((_, index) => (
                            <div key={index} className="relative rounded-lg overflow-hidden">
                                <div className={`relative aspect-[${stageWidth}/${stageHeight}]`}>
                                    <Skeleton className="w-full h-full" />
                                </div>
                            </div>
                        ))
                    ) : (
                        template?.thumbnail?.map((page, index) => (
                            <div
                                key={page._id}
                                className="relative cursor-pointer rounded-lg overflow-hidden"
                                onMouseEnter={() => setHoveredPageIndex(index)}
                                onMouseLeave={() => setHoveredPageIndex(null)}
                            >
                                <div className={`relative aspect-[${stageWidth}/${stageHeight}]`}>
                                    <img
                                        src={page.url}
                                        alt={`Page ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {hoveredPageIndex === index && (
                                        <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded-md">
                                            Page {index + 1}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TemplateDetailView;