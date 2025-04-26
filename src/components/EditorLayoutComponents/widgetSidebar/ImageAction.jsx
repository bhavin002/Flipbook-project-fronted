import { Label } from "@/components/ui/label";
import { getData } from "@/utils/datas";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PopupFrame from "./Hyperlink/PopupFrame";
import Spotlight from "./Hyperlink/Spotlight";
import { useEffect, useState } from "react";
import OpenLink from "./ImageAction/OpenLink";
import GoToPage from "./ImageAction/GoToPage";
import OpenOverlay from "./ImageAction/OpenOverlay";
import { Button } from "@/components/ui/button";

export default function ImageAction({ action }) {
    const imageActions = getData("imageActions") || [];
    const [selectedAction, setSelectedAction] = useState(action || "open-link");

    useEffect(() => {
        if (action) {
            setSelectedAction(action);
        }
    }, [action]);

    const renderDynamicContent = () => {
        switch (selectedAction) {
            case "open-link":
                return <OpenLink />;
            case "go-to-page":
                return <GoToPage />;
            case "open-overlay":
                return <OpenOverlay />;
            case "spotlight":
                return <Spotlight />;
            case "popup-frame":
                return <PopupFrame />;
            default:
                return null;
        }
    }

    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <div className="space-y-2 flex flex-col h-full">
                <div className="flex-grow h-0 overflow-y-auto">
                    <div>
                        <Label className="text-xs">Action</Label>
                        <Select
                            defaultValue="open-link"
                            value={selectedAction}
                            onValueChange={(value) => setSelectedAction(value)}
                        >
                            <SelectTrigger id="action" className="w-full">
                                <SelectValue placeholder="Select action" />
                            </SelectTrigger>
                            <SelectContent>
                                {imageActions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {renderDynamicContent()}
                </div>

                <Button variant="outline" className="w-full text-black">
                    Remove interaction
                </Button>
            </div>
        </div>
    )
}