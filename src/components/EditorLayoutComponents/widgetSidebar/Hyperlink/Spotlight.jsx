import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function Spotlight() {
    const [imageSize, setImageSize] = useState("medium");
    const [imagePropertie, setImagePropertie] = useState("fit-to-frame");
    const [imageUploaded, setImageUploaded] = useState(false);

    const handleUploadImage = () => {
        setImageUploaded(true);
    };

    const handleDeleteImage = () => {
        setImageUploaded(false);
    };

    return (
        <>
            <div>
                <Label htmlFor="spotlight-tooltip" className="text-xs">Tooltip</Label>
                <Input
                    type="text"
                    id="spotlight-tooltip"
                    placeholder="Spotlight"
                    className="placeholder:text-[#d8dce3]" />
            </div>
            {imageUploaded && (
                <>
                    <div className="flex items-center gap-1 py-2">
                        <Checkbox
                            id="show-bg"
                            className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
                        />
                        <Label htmlFor="show-bg" className="text-sm font-medium leading-none">
                            Show background
                        </Label>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">
                            Image size
                        </Label>
                        <ToggleGroup
                            id="image-size"
                            type="single"
                            variant="outline"
                            value={imageSize}
                            onValueChange={(value) => {
                                if (value) setImageSize(value);
                            }}
                            className="w-fit"
                        >
                            <ToggleGroupItem
                                value="small"
                                className="h-8 px-4 text-xs rounded-full focus:ring-0 focus:ring-offset-0"
                            >
                                Small
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value="medium"
                                className="h-8 px-4 text-xs rounded-full focus:ring-0 focus:ring-offset-0"
                            >
                                Medium
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value="large"
                                className="h-8 px-4 text-xs rounded-full focus:ring-0 focus:ring-offset-0"
                            >
                                Large
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">
                            Image properties
                        </Label>
                        <ToggleGroup
                            id="image-properties"
                            type="single"
                            variant="outline"
                            value={imagePropertie}
                            onValueChange={(value) => {
                                if (value) setImagePropertie(value);
                            }}
                            className="w-fit"
                        >
                            <ToggleGroupItem
                                value="fit-to-frame"
                                className="h-8 px-4 text-xs rounded-full focus:ring-0 focus:ring-offset-0"
                            >
                                Fit to frame
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value="scale-to-fill"
                                className="h-8 px-4 text-xs rounded-full focus:ring-0 focus:ring-offset-0"
                            >
                                Scale to fill
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">
                            Image preview
                        </Label>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2 items-center ">
                                <img src="https://cdn.flipsnack.com/collections/uploads/1500b2e0589f1cb5dcdbab1f49929443_t" className="w-[50px] h-[40px] object-cover rounded-sm" alt="Spotlight" />
                                <p className="text-sm truncate">152 (4).jpg</p>
                            </div>
                            <Button variant="ghost" onClick={handleDeleteImage}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </>
            )}
            <div className="pt-2">
                <Button
                    className="text-black hover:text-primary"
                    variant="outline"
                    onClick={handleUploadImage}
                    disabled={imageUploaded}
                >
                    Upload image
                </Button>
            </div>
        </>
    );
}