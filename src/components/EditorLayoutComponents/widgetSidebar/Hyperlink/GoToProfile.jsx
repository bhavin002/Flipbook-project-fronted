import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { addIntercationDataToMainStage } from "@/utils/Helper";

export default function GoToProfile({ mainStage, setMainStage, selectedShape, selectedIndex }) {
    const initialTooltip = selectedShape[0]?.attrs?.htmlData?.tooltip || "";
    const [tooltip, setTooltip] = useState(initialTooltip);
    const [previousTooltip, setPreviousTooltip] = useState(initialTooltip);

    useEffect(() => {
        const newTooltip = selectedShape[0]?.attrs?.htmlData?.tooltip || "";
        setTooltip(newTooltip);
        setPreviousTooltip(newTooltip);
    }, [selectedShape]);

    const updateMainStage = (value) => {
        const workspaceId = localStorage.getItem("fd_workspace_id")
        const output = {
            data: {
                action: "go-to-profile",
                tooltip: value,
                url:`/profile/${workspaceId}/`
            }
        };
        addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setTooltip(value);
        if (value !== previousTooltip) {
            updateMainStage(value);
            setPreviousTooltip(value);
        }
    };

    return (
        <div>
            <Label htmlFor="go-to-profile-tooltip" className="text-xs">Tooltip</Label>
            <Input
                type="text"
                id="go-to-profile-tooltip"
                placeholder="Go to profile"
                className="placeholder:text-gray-400"
                value={tooltip}
                onChange={handleInputChange}
            />
        </div>
    );
}