import { Info, Sparkles } from "lucide-react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import AiConfimationDialog from "./Accessibility/AiConfimationDialog";
import { useState } from "react";
import ManageAccessibilityContentDialog from "./Accessibility/ManageAccessibilityContentDialog";

export default function Accessibility() {
    const [aiConfimationTitle, setAiConfimationTitle] = useState("Title");
    const [aiConfimationDescription, setAiConfimationDescription] = useState("Description");
    const [aiConfirmationDialog, setAiConfirmationDialog] = useState(false);
    const [buttonText, setButtonText] = useState({
        primaryButton: "Primary Button",
        secondaryButton: "Secondary Button"
    });
    const [isAccessibilityActive, setIsAccessibilityActive] = useState(true);

    const handleAIConfirmation = (action) => {
        if (action === 'extract') {
            setAiConfimationTitle("Extract flipbook text");
            setAiConfimationDescription("Existing content will be overwritten and cannot be recovered. Image descriptions are not extracted. Generated content may vary from the original; please check before sharing.");
            setButtonText({
                primaryButton: "Extract text",
                secondaryButton: "Cancel"
            });
        }
        if (action === 'generate') {
            setAiConfimationTitle("Generate content with AI");
            setAiConfimationDescription("Existing content will be overwritten and can't be recovered. Generated content may not be perfect; please check before sharing.");
            setButtonText({
                primaryButton: "Generate",
                secondaryButton: "Cancel"
            });
        }
        setAiConfirmationDialog(true);
    }

    return (
        <div className="space-y-4 text-white">
            <p className="text-sm">
                Activating this feature makes your content accessible to people with visual difficulties by enlarging text or having it read aloud. However, text-to-speech functionality requires a separate screen reader. You can still add text manually if needed.
                <br />
                <a className="text-sm font-medium text-gray-300 cursor-pointer hover:underline">Learn more</a>
            </p>
            <div className="flex items-center gap-2 ">
                <div className="flex items-center">
                    <Switch 
                        id="activate-accessibility" 
                        checked={isAccessibilityActive}
                        onCheckedChange={setIsAccessibilityActive}
                    />
                    <Label htmlFor="activate-accessibility" className="ml-3">
                        Activate accessibility
                    </Label>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Info className="h-4 w-4 cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent
                            side="right"
                            align="center"
                            className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
                        >
                            <p className="text-sm">
                                Increase the size of your content or have it read out loud for those with visual difficulties.
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            
            {isAccessibilityActive && (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="w-full text-primary" onClick={() => handleAIConfirmation('extract')}>
                            Extract flipbook text
                        </Button>
                        <Button className="w-full bg-sidebar hover:bg-sidebar hover:border" onClick={() => handleAIConfirmation('generate')}>
                            <Sparkles className="animate-pulse" />Generate AI summary
                        </Button>
                    </div>
                    <ManageAccessibilityContentDialog />
                </div>
            )}
            
            <AiConfimationDialog
                isConfirmModalOpen={aiConfirmationDialog}
                setIsConfirmModalOpen={setAiConfirmationDialog}
                title={aiConfimationTitle}
                description={aiConfimationDescription}
                primaryButton={buttonText.primaryButton}
                secondaryButton={buttonText.secondaryButton}
            />
        </div>
    )
}