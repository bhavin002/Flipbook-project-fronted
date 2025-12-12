import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useRef, useState, useEffect, useMemo } from "react";
import CornerRadiusControl from "@/utils/CornerRadiusControl";

const isPngImage = (src) => {
  if (!src) return false;
  if (src.toLowerCase().endsWith('.png')) return true;
  if (src.startsWith('data:image/png')) return true;
  if (src.toLowerCase().includes('.png')) return true;
  return false;
};

export default function ImageStyle({
  selectedShape,
  setMainStage,
  mainStage,
  selectedIndex,
}) {
  const [useIndividualCorners, setUseIndividualCorners] = useState(
    selectedShape[0].attrs?.effect?.individualCorners || false
  );

  const isPng = useMemo(() => {
    if (selectedShape.length && selectedShape[0].attrs?.src) {
      return isPngImage(selectedShape[0].attrs.src);
    }
    return false;
  }, [selectedShape]);

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

  const [styles, setStyles] = useState(() => {
    const effect = selectedShape[0].attrs?.effect || {};
    const imageSrc = selectedShape[0].attrs?.src;
    const isImagePng = isPngImage(imageSrc);

    return {
      isShadowEnabled: isImagePng ? false : (effect.isShadowEnabled || false),
      shadowColor: effect.shadowColor || "#000000",
      shadowOpacity: effect.shadowOpacity || 60,
      shadowOffsetX: effect.shadowOffsetX || 0,
      shadowOffsetY: effect.shadowOffsetY || 0,
      shadowBlur: effect.shadowBlur || 10,
      isBorderEnabled: effect.isBorderEnabled || false,
      borderColor: effect.borderColor || "#000000",
      borderWidth: effect.borderWidth || 5,
      borderStyle: effect.borderStyle || "solid",
      borderRoundedCorners: effect.borderRoundedCorners || false,
    };
  });

  const shadowColorInputRef = useRef(null);
  const borderColorInputRef = useRef(null);
  const [isShadowColorPickerOpen, setIsShadowColorPickerOpen] = useState(false);
  const [isBorderColorPickerOpen, setIsBorderColorPickerOpen] = useState(false);

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

      const imageSrc = selectedShape[0].attrs?.src;
      const isImagePng = isPngImage(imageSrc);

      setStyles({
        isShadowEnabled: isImagePng ? false : (effect.isShadowEnabled !== undefined ? effect.isShadowEnabled : false),
        shadowColor: effect.shadowColor || "#000000",
        shadowOpacity: effect.shadowOpacity !== undefined ? effect.shadowOpacity : 60,
        shadowOffsetX: effect.shadowOffsetX !== undefined ? effect.shadowOffsetX : 0,
        shadowOffsetY: effect.shadowOffsetY !== undefined ? effect.shadowOffsetY : 0,
        shadowBlur: effect.shadowBlur !== undefined ? effect.shadowBlur : 30,
        isBorderEnabled: effect.isBorderEnabled !== undefined ? effect.isBorderEnabled : false,
        borderColor: effect.borderColor || "#000000",
        borderWidth: effect.borderWidth !== undefined ? effect.borderWidth : 5,
        borderStyle: effect.borderStyle || "solid",
        borderRoundedCorners: effect.borderRoundedCorners !== undefined ? effect.borderRoundedCorners : false,
      });
    }
  }, [selectedShape]);

  useEffect(() => {
    if (!selectedShape.length || !mainStage[selectedIndex]?.shapes) return;

    const updatedMainStage = [...mainStage];
    updatedMainStage[selectedIndex].shapes = mainStage[selectedIndex].shapes.map(
      (element) => {
        const matchingShape = selectedShape.find(
          (selShape) => selShape.attrs.id === element.id
        );
        if (matchingShape) {
          const isElementPng = isPngImage(element.src);

          return {
            ...element,
            effect: {
              cornerRadius: cornerRadius,
              individualCorners: useIndividualCorners,
              topLeftRadius: useIndividualCorners ? topLeftRadius : cornerRadius,
              topRightRadius: useIndividualCorners ? topRightRadius : cornerRadius,
              bottomRightRadius: useIndividualCorners ? bottomRightRadius : cornerRadius,
              bottomLeftRadius: useIndividualCorners ? bottomLeftRadius : cornerRadius,
              ...styles,
              isShadowEnabled: isElementPng ? false : styles.isShadowEnabled,
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
    if (key === 'isShadowEnabled' && isPng && value === true) {
    }

    setStyles((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleShadowColorClick = () => {
    if (!styles.isShadowEnabled || isPng) return;
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
            disabled={isPng}
          />
          <Label htmlFor="shadow" className={`text-sm font-medium leading-none ${isPng ? 'opacity-50 cursor-not-allowed' : ''}`}>
            Shadow {isPng && '(Not available for PNG images)'}
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
                disabled={!styles.isShadowEnabled || isPng}
              />
              <div
                className={`absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded ${(styles.isShadowEnabled && !isPng) ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                style={{ backgroundColor: styles.shadowColor }}
                onClick={handleShadowColorClick}
              />
              {isShadowColorPickerOpen && styles.isShadowEnabled && !isPng && (
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
                disabled={!styles.isShadowEnabled || isPng}
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
                disabled={!styles.isShadowEnabled || isPng}
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
                disabled={!styles.isShadowEnabled || isPng}
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
              disabled={!styles.isShadowEnabled || isPng}
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
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs">Stroke Weight</Label>
              <Input
                type="number"
                value={styles.borderWidth}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  handleStyleChange("borderWidth", Math.max(0, Math.min(50, val)));
                }}
                min={0}
                max={50}
                className="w-16 h-7 text-xs"
                disabled={!styles.isBorderEnabled}
              />
            </div>
            <Slider
              value={[styles.borderWidth]}
              onValueChange={(value) => handleStyleChange("borderWidth", value[0])}
              min={0}
              max={50}
              step={1}
              className="w-full"
              disabled={!styles.isBorderEnabled}
            />
          </div>

          <div>
            <Label className="text-xs mb-2 block">Stroke Color</Label>
            <div className="relative">
              <Input
                type="text"
                value={styles.borderColor}
                onChange={(e) => handleStyleChange("borderColor", e.target.value)}
                placeholder="#000000"
                className="pr-12"
                disabled={!styles.isBorderEnabled}
              />
              <div
                className={`absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded border border-gray-300 ${
                  styles.isBorderEnabled ? "cursor-pointer" : "cursor-not-allowed"
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
        </div>
      </div >
    </div >
  );
}