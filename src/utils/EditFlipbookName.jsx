import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleCheckBig, X, Pencil, RefreshCw } from "lucide-react";
import { UpdateFlipbookApi } from "@/service/flipbook.service";
import { toast } from "sonner";
import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip";

export default function EditFlipbookName({
    flipbookName, setFlipbookName, flipbookId, isLoading, updatePageData, isTemplate, isInitialLoad
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(flipbookName);
    const [isHovering, setIsHovering] = useState(false);
    const [iconState, setIconState] = useState("upload");
    const prevIsLoadingRef = useRef(isLoading);

    useEffect(() => {
        if (isLoading) {
            setIconState("loading");
        } else if (prevIsLoadingRef.current === true && !isLoading) {
            setIconState("check");
            const timeout = setTimeout(() => {
                setIconState("upload");
            }, 1000);
            return () => clearTimeout(timeout);
        }

        prevIsLoadingRef.current = isLoading;
    }, [isLoading]);

    const handleSave = async () => {
        try {
            const response = await UpdateFlipbookApi(flipbookId, { name: tempName });
            setFlipbookName(tempName);
            toast.success("Flipbook name updated", {
                description: response.message || "Flipbook name updated successfully"
            });
        } catch (error) {
            toast.error("Failed to update flipbook name", {
                description: error.message || "Something went wrong"
            });
        } finally {
            setIsEditing(false);
            setIsHovering(false);
        }
    };

    const handleCancel = () => {
        setTempName(flipbookName);
        setIsEditing(false);
        setIsHovering(false);
    };


    const renderIcon = () => {
        switch (iconState) {
            case "loading":
                return <RefreshCw size={16} className="animate-spin" />;
            case "check":
                return <CircleCheckBig size={16} className="text-green-500" />;
            case "upload":
            default:
                return <RefreshCw size={16} />;
        }
    };

    return (
        <div className="flex items-center gap-2">
            <div
                className="relative w-56 max-md:w-full"
                onMouseEnter={() => !isEditing && setIsHovering(true)}
                onMouseLeave={() => !isEditing && setIsHovering(false)}
            >
                <Input
                    type="text"
                    value={isEditing ? tempName : flipbookName}
                    onChange={isEditing ? (e) => setTempName(e.target.value) : undefined}
                    className="pr-10"
                    readOnly={!isEditing}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    {isEditing ? (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleSave}
                                className="h-6 w-6 text-green-600 hover:text-green-600 p-0"
                            >
                                <CircleCheckBig size={14} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleCancel}
                                className="h-6 w-6 text-red-600 hover:text-red-600 p-0"
                            >
                                <X size={14} />
                            </Button>
                        </>
                    ) : (
                        isHovering && (
                            <Button
                                disabled={!isInitialLoad}
                                variant="ghost"
                                onClick={() => {
                                    setIsEditing(true);
                                    setTempName(flipbookName);
                                }}
                                className="h-6 w-6 p-0"
                            >
                                <Pencil className="w-4 h-4" />
                            </Button>
                        )
                    )}
                </div>
            </div>
            <Button
                variant="outline"
                disabled={isLoading || !isInitialLoad}
                onClick={updatePageData}
                className="transition-all duration-200"
            >
                {renderIcon()}
            </Button>
            {isTemplate && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                className="bg-primary text-white px-4 py-1 rounded-md font-medium text-sm cursor-pointer select-none"
                                tabIndex={0}
                            >
                                Template
                            </div>
                        </TooltipTrigger>
                        <TooltipContent
                            side="bottom"
                            align="center"
                            className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
                        >
                            <p className="text-sm">You are working on a template. All the edits that you make now will become a part of the template.</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </div>
    );
}