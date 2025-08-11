import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { getBrandColorsApi } from "@/service/brandColor.service";
import { Info, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ColorSkeleton = () => (
    <div className="w-8 h-8 rounded bg-gray-200 animate-pulse" />
);

export default function BrandColors({ handlePaletteColorSelect, selectedColor }) {
    const [isLoading, setIsLoading] = useState(false);
    const [brandColors, setBrandColors] = useState([]);
    const [showAll, setShowAll] = useState(false);

    const COLORS_PER_ROW = 8;

    useEffect(() => {
        const getBrandColors = async () => {
            try {
                setIsLoading(true);
                const response = await getBrandColorsApi();
                setBrandColors(response.data);
            } catch (error) {
                toast.error("Failed to fetch brand colors", {
                    description: error.message || "Oops! Something went wrong.",
                });
            } finally {
                setIsLoading(false);
            }
        }
        if(!brandColors?.length){
            getBrandColors();
        }
    }, [])

    const displayedColors = showAll ? brandColors : brandColors.slice(0, COLORS_PER_ROW);
    const hasMoreColors = brandColors.length > COLORS_PER_ROW;

    const renderColorSkeleton = () => (
        <div className="flex gap-2 flex-wrap">
            {Array.from({ length: COLORS_PER_ROW }).map((_, index) => (
                <ColorSkeleton key={index} />
            ))}
        </div>
    );

    const renderColors = () => (
        <>
            <div className="flex gap-2 flex-wrap">
                {displayedColors.map((color, index) => (
                    <div
                        key={index}
                        className={`w-8 h-8 rounded cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all ${
                            selectedColor === color.name ? 'ring-2 ring-blue-500' : ''
                        }`}
                        style={{ backgroundColor: color.name }}
                        onClick={() => handlePaletteColorSelect(color.name)}
                        title={color.name}
                    />
                ))}
            </div>
            
            {hasMoreColors && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAll(!showAll)}
                    className="mt-2 h-8 px-2 text-xs text-black"
                >
                    {showAll ? (
                        <>
                            <ChevronUp className="h-3 w-3 mr-1" />
                            Show Less
                        </>
                    ) : (
                        <>
                            <ChevronDown className="h-3 w-3 mr-1" />
                            Show More ({brandColors.length - COLORS_PER_ROW} more)
                        </>
                    )}
                </Button>
            )}
        </>
    );

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <Label>Brand Colors</Label>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Info className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent
                            side="right"
                            align="center"
                            className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
                        >
                            <p className="text-sm">Select from brand colors</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            
            {isLoading ? renderColorSkeleton() : renderColors()}
        </div>
    );
}