import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState, useEffect } from "react";
import CornerRadiusControl from "@/utils/CornerRadiusControl";

export default function ImageStyle({
  selectedShape,
  setMainStage,
  mainStage,
  selectedIndex,
}) {
  const [useIndividualCorners, setUseIndividualCorners] = useState(
    selectedShape[0].attrs?.effect?.individualCorners || false
  );
  
  const defaultCornerRadius = selectedShape[0].attrs?.effect?.cornerRadius || 0;
  const [cornerRadius, setCornerRadius] = useState(defaultCornerRadius);
  
  const [topLeftRadius, setTopLeftRadius] = useState(
    useIndividualCorners ? 
      selectedShape[0].attrs?.effect?.topLeftRadius || 0 : 
      defaultCornerRadius
  );
  
  const [topRightRadius, setTopRightRadius] = useState(
    useIndividualCorners ? 
      selectedShape[0].attrs?.effect?.topRightRadius || 0 : 
      defaultCornerRadius
  );
  
  const [bottomRightRadius, setBottomRightRadius] = useState(
    useIndividualCorners ? 
      selectedShape[0].attrs?.effect?.bottomRightRadius || 0 : 
      defaultCornerRadius
  );
  
  const [bottomLeftRadius, setBottomLeftRadius] = useState(
    useIndividualCorners ? 
      selectedShape[0].attrs?.effect?.bottomLeftRadius || 0 : 
      defaultCornerRadius
  );

  const [styles, setStyles] = useState({
    isShadowEnabled: selectedShape[0].attrs?.effect?.isShadowEnabled || false,
    shadowColor: selectedShape[0].attrs.effect?.shadowColor || "#000000",
    shadowOpacity: selectedShape[0].attrs.effect?.shadowOpacity || 60,
    shadowOffsetX: selectedShape[0].attrs.effect?.shadowOffsetX || 0,
    shadowOffsetY: selectedShape[0].attrs.effect?.shadowOffsetY || 0,
    shadowBlur: selectedShape[0].attrs.effect?.shadowBlur || 10,
    isBorderEnabled: selectedShape[0].attrs?.effect?.isBorderEnabled || false,
    borderColor: selectedShape[0].attrs.effect?.borderColor || "#000000",
    borderWidth: selectedShape[0].attrs.effect?.borderWidth || 10,
  });

  const shadowColorInputRef = useRef(null);
  const borderColorInputRef = useRef(null);
  const [isShadowColorPickerOpen, setIsShadowColorPickerOpen] = useState(false);
  const [isBorderColorPickerOpen, setIsBorderColorPickerOpen] = useState(false);

  // Load style settings from selected shape
  useEffect(() => {
    if (selectedShape.length && selectedShape[0]) {
      const effect = selectedShape[0].attrs.effect || {};
      const hasIndividualCorners = effect.individualCorners;

      setUseIndividualCorners(hasIndividualCorners);
      setCornerRadius(effect.cornerRadius || 0);
      if (hasIndividualCorners) {
        setTopLeftRadius(effect.topLeftRadius || 0);
        setTopRightRadius(effect.topRightRadius || 0);
        setBottomRightRadius(effect.bottomRightRadius || 0);
        setBottomLeftRadius(effect.bottomLeftRadius || 0);
      } else {
        const uniformRadius = effect.cornerRadius || 0;
        setTopLeftRadius(uniformRadius);
        setTopRightRadius(uniformRadius);
        setBottomRightRadius(uniformRadius);
        setBottomLeftRadius(uniformRadius);
      }

      setStyles({
        isShadowEnabled: effect.isShadowEnabled !== undefined ? effect.isShadowEnabled : false,
        shadowColor: effect.shadowColor || "#000000",
        shadowOpacity: effect.shadowOpacity !== undefined ? effect.shadowOpacity : 60,
        shadowOffsetX: effect.shadowOffsetX !== undefined ? effect.shadowOffsetX : 0,
        shadowOffsetY: effect.shadowOffsetY !== undefined ? effect.shadowOffsetY : 0,
        shadowBlur: effect.shadowBlur !== undefined ? effect.shadowBlur : 30,
        isBorderEnabled: effect.isBorderEnabled !== undefined ? effect.isBorderEnabled : true,
        borderColor: effect.borderColor || "#000000",
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
              cornerRadius: cornerRadius,
              individualCorners: useIndividualCorners,
              topLeftRadius: useIndividualCorners ? topLeftRadius : cornerRadius,
              topRightRadius: useIndividualCorners ? topRightRadius : cornerRadius,
              bottomRightRadius: useIndividualCorners ? bottomRightRadius : cornerRadius,
              bottomLeftRadius: useIndividualCorners ? bottomLeftRadius : cornerRadius,
              ...styles,
            },
          };
        }
        return element;
      }
    );

    setMainStage(updatedMainStage);
  }, [
    cornerRadius, useIndividualCorners, topLeftRadius, topRightRadius,
    bottomRightRadius, bottomLeftRadius, styles, selectedShape, selectedIndex
  ]);

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
    <div className="p-6 space-y-4 w-full overflow-y-auto">
      <Label className="text-lg">Image style</Label>
      
      <CornerRadiusControl
        useIndividualCorners={useIndividualCorners}
        setUseIndividualCorners={setUseIndividualCorners}
        cornerRadius={cornerRadius}
        setCornerRadius={setCornerRadius}
        topLeftRadius={topLeftRadius}
        setTopLeftRadius={setTopLeftRadius}
        topRightRadius={topRightRadius}
        setTopRightRadius={setTopRightRadius}
        bottomRightRadius={bottomRightRadius}
        setBottomRightRadius={setBottomRightRadius}
        bottomLeftRadius={bottomLeftRadius}
        setBottomLeftRadius={setBottomLeftRadius}
      />

      <div className="space-y-2">
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
                className={`absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded ${styles.isShadowEnabled ? "cursor-pointer" : "cursor-not-allowed"
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
        {/* <div className="flex items-center gap-1">
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
              max={100}
              className="w-24"
              disabled={!styles.isBorderEnabled}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}