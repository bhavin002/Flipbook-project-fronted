import { Label } from "@/components/ui/label";
import { getData } from "@/utils/datas";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SendEmail from "./Hyperlink/SendEmail";
import GoToProfile from "./Hyperlink/GoToProfile";
import GoToUrl from "./Hyperlink/GoToUrl";
import GoToPage from "./Hyperlink/GoToPage";
import PopupFrame from "./Hyperlink/PopupFrame";
import Spotlight from "./Hyperlink/Spotlight";
import PhoneNumber from "./Hyperlink/PhoneNumber";
import PhotoSlideshow from "./Hyperlink/PhotoSlideshow";
import Chart from "./Hyperlink/Chart";
import { useEffect, useState } from "react";
import { addIntercationDataToMainStage } from "@/utils/Helper";

export default function Hyperlink({ mainStage, setMainStage, selectedShape, selectedIndex }) {
    const hyperlinks = getData("hyperlinks") || [];
    const currentAction = selectedShape[0]?.attrs?.htmlData?.action;
    const [selectedAction, setSelectedAction] = useState(currentAction || "go-to-url");

    useEffect(() => {
        const action = selectedShape[0]?.attrs?.htmlData?.action;
        setSelectedAction(action || "go-to-url");
    }, [selectedShape]);

    const changeAction = (value) => {
        setSelectedAction(value);
        const output = {
            data: {
                action: value,
            }
        };
        addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
    };

    const renderDynamicContent = () => {
        switch (selectedAction) {
            case "send-email":
                return <SendEmail mainStage={mainStage} setMainStage={setMainStage} selectedShape={selectedShape} selectedIndex={selectedIndex} />;
            case "go-to-profile":
                return <GoToProfile mainStage={mainStage} setMainStage={setMainStage} selectedShape={selectedShape} selectedIndex={selectedIndex} />;
            case "go-to-url":
                return <GoToUrl mainStage={mainStage} setMainStage={setMainStage} selectedShape={selectedShape} selectedIndex={selectedIndex} />;
            case "go-to-page":
                return <GoToPage mainStage={mainStage} setMainStage={setMainStage} selectedShape={selectedShape} selectedIndex={selectedIndex} />;
            case "popup-frame":
                return <PopupFrame />;
            case "spotlight":
                return <Spotlight />;
            case "phone-number":
                return <PhoneNumber mainStage={mainStage} setMainStage={setMainStage} selectedShape={selectedShape} selectedIndex={selectedIndex} />;
            case "photo-slideshow":
                return <PhotoSlideshow />;
            case "line-chart":
                return <Chart chart={"Line"} />;
            case "bar-chart":
                return <Chart chart={"Bar"} />;
            case "pie-chart":
                return <Chart chart={"Pie"} />;
            default:
                return null;
        }
    }

    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Label className="text-lg">Hyperlink</Label>
            <div className="space-y-2">
                <div>
                    <Label className="text-xs">Action</Label>
                    <Select
                        value={selectedAction}
                        onValueChange={(value) => changeAction(value)}
                    >
                        <SelectTrigger id="hyperlink" className="w-full">
                            <SelectValue placeholder="Select hyperlink" />
                        </SelectTrigger>
                        <SelectContent>
                            {hyperlinks.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {renderDynamicContent()}
            </div>
        </div>
    )
}