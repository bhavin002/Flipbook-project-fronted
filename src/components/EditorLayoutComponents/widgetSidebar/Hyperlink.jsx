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

export default function Hyperlink({ action }) {
    const hyperlinks = getData("hyperlinks") || [];
    const [selectedAction, setSelectedAction] = useState(action || "send-email");

    useEffect(() => {
        if (action) {
            setSelectedAction(action);
        }
    }, [action]);

    const renderDynamicContent = () => {
        switch (selectedAction) {
            case "send-email":
                return <SendEmail />;
            case "go-to-profile":
                return <GoToProfile />;
            case "go-to-url":
                return <GoToUrl />;
            case "go-to-page":
                return <GoToPage />;
            case "popup-frame":
                return <PopupFrame />;
            case "spotlight":
                return <Spotlight />;
            case "phone-number":
                return <PhoneNumber />;
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
        <div className="p-6 space-y-2 w-full overflow-y-auto overflow-y-auto">
            <Label className="text-lg">Hyperlink</Label>
            <div className="space-y-2">
                <div>
                    <Label className="text-xs">Action</Label>
                    <Select
                        defaultValue="send-email"
                        value={selectedAction}
                        onValueChange={(value) => setSelectedAction(value)}
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