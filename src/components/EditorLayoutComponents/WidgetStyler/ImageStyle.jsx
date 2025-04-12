import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";

export default function ImageStyle() {
  const [shadowColor, setShadowColor] = useState("#ffffff");
  const [borderColor, setBorderColor] = useState("#ffffff");
  const [isShadowColorPickerOpen, setIsShadowColorPickerOpen] = useState(false);
  const [isBorderColorPickerOpen, setIsBorderColorPickerOpen] = useState(false);
  const [isShadowEnabled, setIsShadowEnabled] = useState(true);
  const [isBorderEnabled, setIsBorderEnabled] = useState(true);
  const shadowColorInputRef = useRef(null);
  const borderColorInputRef = useRef(null);

  const handleShadowColorClick = () => {
    if (!isShadowEnabled) return;
    setIsShadowColorPickerOpen(true);
    setTimeout(() => shadowColorInputRef.current?.click(), 10);
  };

  const handleBorderColorClick = () => {
    if (!isBorderEnabled) return;
    setIsBorderColorPickerOpen(true);
    setTimeout(() => borderColorInputRef.current?.click(), 10);
  };

  return (
    <div className="p-6 space-y-4">
      <Label className="text-lg">Image style</Label>
      <div>
        <Label className="text-xs">Corner roundness</Label>
        <Input type="number" defaultValue={0} className="text-white" />
      </div>
      <div className="flex items-center gap-1">
        <Checkbox
          id="shadow"
          className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
          checked={isShadowEnabled}
          onCheckedChange={setIsShadowEnabled}
        />
        <Label htmlFor="shadow" className="text-sm font-medium leading-none">
          Shadow
        </Label>
      </div>
      <div className="space-y-2">
        <div>
          <Label className="text-xs">Color</Label>
          <div className="relative">
            <Input
              type="text"
              value={shadowColor}
              onChange={(e) => setShadowColor(e.target.value)}
              className="pr-12"
              disabled={!isShadowEnabled}
            />
            <div
              className={`absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded ${
                isShadowEnabled ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              style={{ backgroundColor: shadowColor }}
              onClick={handleShadowColorClick}
            />
            {isShadowColorPickerOpen && isShadowEnabled && (
              <input
                ref={shadowColorInputRef}
                type="color"
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
                onBlur={() => setIsShadowColorPickerOpen(false)}
                className="opacity-0 absolute w-1 h-1 right-3 top-1/2 -translate-y-1/2"
              />
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <div>
            <Label className="text-xs">Opacity:</Label>
            <Input
              type="number"
              defaultValue={60}
              disabled={!isShadowEnabled}
            />
          </div>
          <div>
            <Label className="text-xs">X</Label>
            <Input
              type="number"
              defaultValue={0}
              disabled={!isShadowEnabled}
            />
          </div>
          <div>
            <Label className="text-xs">Y</Label>
            <Input
              type="number"
              defaultValue={0}
              disabled={!isShadowEnabled}
            />
          </div>
        </div>
        <div>
          <Label className="text-xs">Blur:</Label>
          <Input
            type="number"
            defaultValue={10}
            className="w-24"
            disabled={!isShadowEnabled}
          />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Checkbox
          id="border"
          className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
          checked={isBorderEnabled}
          onCheckedChange={setIsBorderEnabled}
        />
        <Label htmlFor="border" className="text-sm font-medium leading-none">
          Border
        </Label>
      </div>
      <div className="space-y-2">
        <div>
          <Label className="text-xs">Color</Label>
          <div className="relative">
            <Input
              type="text"
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
              className="pr-12"
              disabled={!isBorderEnabled}
            />
            <div
              className={`absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded ${
                isBorderEnabled ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              style={{ backgroundColor: borderColor }}
              onClick={handleBorderColorClick}
            />
            {isBorderColorPickerOpen && isBorderEnabled && (
              <input
                ref={borderColorInputRef}
                type="color"
                value={borderColor}
                onChange={(e) => setBorderColor(e.target.value)}
                onBlur={() => setIsBorderColorPickerOpen(false)}
                className="opacity-0 absolute w-1 h-1 right-3 top-1/2 -translate-y-1/2"
              />
            )}
          </div>
        </div>
        <div>
          <Label className="text-xs">Width:</Label>
          <Input
            type="number"
            defaultValue={10}
            className="w-24"
            disabled={!isBorderEnabled}
          />
        </div>
      </div>
    </div>
  );
}