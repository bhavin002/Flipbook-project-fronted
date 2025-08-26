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

export default function ImageAction({
    selectedShape,
    setMainStage,
    mainStage,
    selectedIndex,
}) {

    const imageActions = getData("imageActions") || [];
    const currentAction = selectedShape[0]?.attrs?.htmlData?.action;
    const [selectedAction, setSelectedAction] = useState(currentAction || "open-link");
    const [isRemovedInteraction, setIsRemovedInteraction] = useState(false);

    const defaultConfig = {
        "open-link": {
            "action": "open-link",
        },
        "go-to-page": {
            "action": "go-to-page",
            "tooltip": "Go to page",
            "pageNumber": 1,
            "pageAction": "go-to-page"
        },
        "open-overlay": {
            "action": "open-overlay",
            "tooltip": "On click",
            "hoverColor": " #ffffff",
            "hoverOpacity": 30
        },
        "spotlight": {
            "action": "spotlight",
        },
        "popup-frame": {
            "action": "popup-frame",
        },
    };

    useEffect(() => {
        const action = selectedShape[0]?.attrs?.htmlData?.action;
        setSelectedAction(action || "open-link");
    }, [selectedShape]);



    const changeAction = (value) => {
        setSelectedAction(value);
        mainStage[selectedIndex].stageref.current.children[0].children[1].children.find(e => {
            if (e.attrs.id === selectedShape[0].attrs.id) {
                e.attrs.htmlData = defaultConfig[value]
                return true;
            }
        });

        mainStage[selectedIndex].shapes = mainStage[selectedIndex].stageref.current.children[0].children[1].children.map(e =>
            JSON.parse(JSON.stringify(e.attrs))
        ) || [];

        const temp = JSON.parse(JSON.stringify(mainStage[selectedIndex]));
        temp.selectedShapes = [];
        temp.stageref = null;
        setMainStage([...mainStage]);
    };

    const removeInteraction = () => {
        setIsRemovedInteraction(true);
        mainStage[selectedIndex].stageref.current.children[0].children[1].children.find(e => {
            if (e.attrs.id === selectedShape[0].attrs.id) {
                e.attrs.htmlData = {
                    action: defaultConfig["open-link"],
                }
                return true;
            }
        });

        mainStage[selectedIndex].shapes = mainStage[selectedIndex].stageref.current.children[0].children[1].children.map(e =>
            JSON.parse(JSON.stringify(e.attrs))
        ) || [];

        const temp = JSON.parse(JSON.stringify(mainStage[selectedIndex]));
        temp.selectedShapes = [];
        temp.stageref = null;

        setSelectedAction("open-link");
        setMainStage([...mainStage]);
    };

    const renderDynamicContent = () => {
        switch (selectedAction) {
            case "open-link":
                return <OpenLink selectedShape={selectedShape} setMainStage={setMainStage} mainStage={mainStage} selectedIndex={selectedIndex} isRemovedInteraction={isRemovedInteraction} />;
            case "go-to-page":
                return <GoToPage selectedShape={selectedShape} setMainStage={setMainStage} mainStage={mainStage} selectedIndex={selectedIndex} />;
            case "open-overlay":
                return <OpenOverlay selectedShape={selectedShape} setMainStage={setMainStage} mainStage={mainStage} selectedIndex={selectedIndex} />;
            case "spotlight":
                return <Spotlight selectedShape={selectedShape} setMainStage={setMainStage} mainStage={mainStage} selectedIndex={selectedIndex} />;
            case "popup-frame":
                return <PopupFrame selectedShape={selectedShape} setMainStage={setMainStage} mainStage={mainStage} selectedIndex={selectedIndex} />;
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
                            onValueChange={(value) => changeAction(value)}
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

                <Button onClick={removeInteraction} variant="outline" className="w-full text-black">
                    Remove interaction
                </Button>
            </div>
        </div>
    )
}