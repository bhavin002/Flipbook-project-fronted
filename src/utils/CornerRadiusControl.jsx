import { Checkbox } from "@/components/ui/checkbox";
import { FilterSlider } from "@/components/ui/filterSlider";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

export default function CornerRadiusControl({
  useIndividualCorners,
  setUseIndividualCorners,
  cornerRadius,
  setCornerRadius,
  topLeftRadius,
  setTopLeftRadius,
  topRightRadius,
  setTopRightRadius,
  bottomRightRadius,
  setBottomRightRadius,
  bottomLeftRadius,
  setBottomLeftRadius
}) {
  useEffect(() => {
    if (!useIndividualCorners) {
      setTopLeftRadius(cornerRadius);
      setTopRightRadius(cornerRadius);
      setBottomRightRadius(cornerRadius);
      setBottomLeftRadius(cornerRadius);
    }
  }, [useIndividualCorners, cornerRadius]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-medium flex items-center">
          Corner Radius
        </Label>
        <div className="flex items-center gap-1">
          <Checkbox
            id="individual-corners"
            checked={useIndividualCorners}
            onCheckedChange={(checked) => setUseIndividualCorners(checked)}
            className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
          />
          <Label htmlFor="individual-corners" className="text-sm font-medium flex items-center">Individual Corners</Label>
        </div>
      </div>

      {!useIndividualCorners && (
        <FilterSlider
          min={0}
          max={100}
          value={[cornerRadius]}
          onValueChange={(values) => setCornerRadius(values[0])}
          className="w-full"
        />
      )}

      {useIndividualCorners && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs">Top Left</Label>
              <span className="text-xs">{topLeftRadius}</span>
            </div>
            <FilterSlider
              min={0}
              max={100}
              value={[topLeftRadius]}
              onValueChange={(values) => setTopLeftRadius(values[0])}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs">Top Right</Label>
              <span className="text-xs">{topRightRadius}</span>
            </div>
            <FilterSlider
              min={0}
              max={100}
              value={[topRightRadius]}
              onValueChange={(values) => setTopRightRadius(values[0])}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs">Bottom Right</Label>
              <span className="text-xs">{bottomRightRadius}</span>
            </div>
            <FilterSlider
              min={0}
              max={100}
              value={[bottomRightRadius]}
              onValueChange={(values) => setBottomRightRadius(values[0])}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs">Bottom Left</Label>
              <span className="text-xs">{bottomLeftRadius}</span>
            </div>
            <FilterSlider
              min={0}
              max={100}
              value={[bottomLeftRadius]}
              onValueChange={(values) => setBottomLeftRadius(values[0])}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}