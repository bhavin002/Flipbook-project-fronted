import FlipBookPreview from "@/components/EditorLayoutComponents/Preview/Components/FlipBookPreview";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEmbedSettings } from "@/context/EmbedSettingsContext";

export default function EmbedPreview({ flipbookId }) {
    const { height } = useEmbedSettings();
    
    return (
        <Card className="pt-6">
            <CardContent className="border p-0 m-6 mt-0 rounded-sm">
                <div className="p-2 bg-gray-100 flex flex-row items-center space-x-2">
                    <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                </div>
                <div className="px-6 py-4">
                    <Skeleton className="w-1/4 h-6 rounded-md" />
                </div>
                <div className="px-6 py-4">
                    <div className="w-full"  style={{ height: `${height}px` }}>
                        <FlipBookPreview 
                            flipbookId={flipbookId} 
                            component={"customize"} 
                        />
                    </div>
                </div>
                <div className="w-full px-6 py-4 flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3">
                        <Skeleton className="w-full h-24 md:h-48 rounded-md" />
                    </div>
                    <div className="w-full md:w-2/3 space-y-6 flex flex-col justify-center">
                        <Skeleton className="w-3/4 h-6 rounded-md" />
                        <Skeleton className="w-full h-6 rounded-md" />
                        <Skeleton className="w-3/4 h-6 rounded-md" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
