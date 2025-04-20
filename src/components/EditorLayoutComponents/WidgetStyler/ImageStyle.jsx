import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState, useEffect } from "react";

export default function ImageStyle({
  selectedShape,
  setMainStage,
  mainStage,
  selectedIndex,
}) {
  const [styles, setStyles] = useState({
    cornerRadius: selectedShape[0].attrs?.effect?.cornerRadius || 0,
    isShadowEnabled: selectedShape[0].attrs?.effect?.isShadowEnabled || true,
    shadowColor: selectedShape[0].attrs.effect?.shadowColor || "#ffffff",
    shadowOpacity: selectedShape[0].attrs.effect?.shadowOpacity || 60,
    shadowOffsetX: selectedShape[0].attrs.effect?.shadowOffsetX || 0,
    shadowOffsetY: selectedShape[0].attrs.effect?.shadowOffsetY || 0,
    shadowBlur: selectedShape[0].attrs.effect?.shadowBlur || 10,
    isBorderEnabled: selectedShape[0].attrs?.effect?.isBorderEnabled || true,
    borderColor: selectedShape[0].attrs.effect?.borderColor || "#ffffff",
    borderWidth: selectedShape[0].attrs?.effect?.borderWidth || 10,
  });

  const shadowColorInputRef = useRef(null);
  const borderColorInputRef = useRef(null);
  const [isShadowColorPickerOpen, setIsShadowColorPickerOpen] = useState(false);
  const [isBorderColorPickerOpen, setIsBorderColorPickerOpen] = useState(false);

  // Load style settings from selected shape
  useEffect(() => {
    if (selectedShape.length && selectedShape[0]) {
      const effect = selectedShape[0].attrs.effect || {};
      setStyles({
        cornerRadius: effect.cornerRadius !== undefined ? effect.cornerRadius : 0,
        isShadowEnabled: effect.isShadowEnabled !== undefined ? effect.isShadowEnabled : true,
        shadowColor: effect.shadowColor || "#ffffff",
        shadowOpacity: effect.shadowOpacity !== undefined ? effect.shadowOpacity : 60,
        shadowOffsetX: effect.shadowOffsetX !== undefined ? effect.shadowOffsetX : 0,
        shadowOffsetY: effect.shadowOffsetY !== undefined ? effect.shadowOffsetY : 0,
        shadowBlur: effect.shadowBlur !== undefined ? effect.shadowBlur : 10,
        isBorderEnabled: effect.isBorderEnabled !== undefined ? effect.isBorderEnabled : true,
        borderColor: effect.borderColor || "#ffffff",
        borderWidth: effect.borderWidth !== undefined ? effect.borderWidth : 10,
      });
    }
  }, [selectedShape]);

  // Update mainStage with style settings
  useEffect(() => {
    if (!selectedShape.length || !mainStage[selectedIndex]?.shapes) return;

    const updatedMainStage = [...mainStage];
    updatedMainStage[selectedIndex].shapes = mainStage[selectedIndex].shapes.map(
      (element) => {
        const matchingShape = selectedShape.find(
          (selShape) => selShape.attrs.id === element.id
        );
        if (matchingShape) {
          return {
            ...element,
            effect: {
              ...element.effect, // Preserve existing filter effects
              ...styles,
            },
          };
        }
        return element;
      }
    );

    setMainStage(updatedMainStage);
  }, [styles, selectedShape, selectedIndex]);

  const handleStyleChange = (key, value) => {
    setStyles((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleShadowColorClick = () => {
    if (!styles.isShadowEnabled) return;
    setIsShadowColorPickerOpen(true);
    setTimeout(() => shadowColorInputRef.current?.click(), 10);
  };

  const handleBorderColorClick = () => {
    if (!styles.isBorderEnabled) return;
    setIsBorderColorPickerOpen(true);
    setTimeout(() => borderColorInputRef.current?.click(), 10);
  };

  return (
    <div className="p-6 space-y-2">
      <Label className="text-lg">Image style</Label>
      <div>
        <Label className="text-xs">Corner roundness</Label>
        <Input
          type="number"
          value={styles.cornerRadius}
          onChange={(e) => handleStyleChange("cornerRadius", parseInt(e.target.value) || 0)}
          min={0}
          max={100}
          className="text-white"
        />
      </div>
      <div className="flex items-center gap-1">
        <Checkbox
          id="shadow"
          className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
          checked={styles.isShadowEnabled}
          onCheckedChange={(checked) => handleStyleChange("isShadowEnabled", checked)}
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
              value={styles.shadowColor}
              onChange={(e) => handleStyleChange("shadowColor", e.target.value)}
              className="pr-12"
              disabled={!styles.isShadowEnabled}
            />
            <div
              className={`absolute right-1 top-1/2 -translate-y-1/2 w German: w-7 h-7 rounded ${styles.isShadowEnabled ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              style={{ backgroundColor: styles.shadowColor }}
              onClick={handleShadowColorClick}
            />
            {isShadowColorPickerOpen && styles.isShadowEnabled && (
              <input
                ref={shadowColorInputRef}
                type="color"
                value={styles.shadowColor}
                onChange={(e) => handleStyleChange("shadowColor", e.target.value)}
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
              value={styles.shadowOpacity}
              onChange={(e) => handleStyleChange("shadowOpacity", parseInt(e.target.value) || 0)}
              min={0}
              max={100}
              disabled={!styles.isShadowEnabled}
            />
          </div>
          <div>
            <Label className="text-xs">X</Label>
            <Input
              type="number"
              value={styles.shadowOffsetX}
              onChange={(e) => handleStyleChange("shadowOffsetX", parseInt(e.target.value) || 0)}
              min={-100}
              max={100}
              disabled={!styles.isShadowEnabled}
            />
          </div>
          <div>
            <Label className="text-xs">Y</Label>
            <Input
              type="number"
              value={styles.shadowOffsetY}
              onChange={(e) => handleStyleChange("shadowOffsetY", parseInt(e.target.value) || 0)}
              min={-100}
              max={100}
              disabled={!styles.isShadowEnabled}
            />
          </div>
        </div>
        <div>
          <Label className="text-xs">Blur:</Label>
          <Input
            type="number"
            value={styles.shadowBlur}
            onChange={(e) => handleStyleChange("shadowBlur", parseInt(e.target.value) || 0)}
            min={0}
            max={100}
            className="w-24"
            disabled={!styles.isShadowEnabled}
          />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Checkbox
          id="border"
          className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
          checked={styles.isBorderEnabled}
          onCheckedChange={(checked) => handleStyleChange("isBorderEnabled", checked)}
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
              value={styles.borderColor}
              onChange={(e) => handleStyleChange("borderColor", e.target.value)}
              className="pr-12"
              disabled={!styles.isBorderEnabled}
            />
            <div
              className={`absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded ${styles.isBorderEnabled ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              style={{ backgroundColor: styles.borderColor }}
              onClick={handleBorderColorClick}
            />
            {isBorderColorPickerOpen && styles.isBorderEnabled && (
              <input
                ref={borderColorInputRef}
                type="color"
                value={styles.borderColor}
                onChange={(e) => handleStyleChange("borderColor", e.target.value)}
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
            value={styles.borderWidth}
            onChange={(e) => handleStyleChange("borderWidth", parseInt(e.target.value) || 0)}
            min={0}
            max={50}
            className="w-24"
            disabled={!styles.isBorderEnabled}
          />
        </div>
      </div>
    </div>
  );
}