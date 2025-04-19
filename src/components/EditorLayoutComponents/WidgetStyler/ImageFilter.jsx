import { useState, useEffect } from "react";
import { FilterSlider } from "@/components/ui/filterSlider";
import { Label } from "@/components/ui/label";

const filterPresets = {
  Normal: {
    brightness: 0,
    contrast: 0,
    saturation: 0,
    blur: 0,
    grayscale: 0,
  },
  Grayscale: {
    brightness: 0,
    contrast: 0,
    saturation: 0,
    blur: 0,
    grayscale: 100,
  },
  Sepia: {
    brightness: 0,
    contrast: 0,
    saturation: -50,
    blur: 0,
    grayscale: 0,
  },
  Cold: {
    brightness: -10,
    contrast: 10,
    saturation: -20,
    blur: 0,
    grayscale: 0,
  },
  Natural: {
    brightness: 10,
    contrast: 5,
    saturation: 10,
    blur: 0,
    grayscale: 0,
  },
  Warm: {
    brightness: 10,
    contrast: 0,
    saturation: 20,
    blur: 0,
    grayscale: 0,
  },
};

export default function ImageFilter({
  selectedShape,
  setMainStage,
  mainStage,
  selectedIndex,
}) {
  const imageFilters = [
    {
      id: 6,
      filter: "Normal",
      url: "https://images.pexels.com/photos/5874910/pexels-photo-5874910.jpeg",
    },
    {
      id: 1,
      filter: "Grayscale",
      url: "https://images.pexels.com/photos/5874910/pexels-photo-5874910.jpeg",
    },
    {
      id: 2,
      filter: "Sepia",
      url: "https://images.pexels.com/photos/5874910/pexels-photo-5874910.jpeg",
    },
    {
      id: 3,
      filter: "Cold",
      url: "https://images.pexels.com/photos/5874910/pexels-photo-5874910.jpeg",
    },
    {
      id: 4,
      filter: "Natural",
      url: "https://images.pexels.com/photos/5874910/pexels-photo-5874910.jpeg",
    },
    {
      id: 5,
      filter: "Warm",
      url: "https://images.pexels.com/photos/5874910/pexels-photo-5874910.jpeg",
    },
  ];

  const [filters, setFilters] = useState({
    brightness: selectedShape[0].attrs?.effect?.brightness || 0,
    contrast: selectedShape[0].attrs?.effect?.contrast || 0,
    saturation: selectedShape[0].attrs?.effect?.saturation || 0,
    blur: selectedShape[0].attrs?.effect?.blur || 0,
    grayscale: selectedShape[0].attrs?.effect?.grayscale || 0,
  });

  // Load filter settings from selected shape
  useEffect(() => {
    if (selectedShape.length && selectedShape[0]) {
      const effect = selectedShape[0].attrs.effect || {};
      setFilters({
        brightness: effect.brightness !== undefined ? effect.brightness : 0,
        contrast: effect.contrast !== undefined ? effect.contrast : 0,
        saturation: effect.saturation !== undefined ? effect.saturation : 0,
        blur: effect.blur !== undefined ? effect.blur : 0,
        grayscale: effect.grayscale !== undefined ? effect.grayscale : 0,
      });
    }
  }, [selectedShape]);

  // Update mainStage with filter settings
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
              ...filters,

            },
          };
        }
        return element;
      }
    );

    setMainStage(updatedMainStage);
  }, [filters, selectedShape, selectedIndex]);

  const handleFilterChange = (filterName, newValue) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: newValue[0],
    }));
  };

  const applyPresetFilter = (filterName) => {
    setFilters(filterPresets[filterName]);
  };

  return (
    <div className="p-6 space-y-2">
      <Label className="text-lg">Image filter</Label>
      <div className="grid grid-cols-4 gap-2 justify-items-center">
        {imageFilters.map((filter) => (
          <div
            key={filter.id}
            className="text-center cursor-pointer"
            onClick={() => applyPresetFilter(filter.filter)}
          >
            <img
              src={filter.url}
              alt={filter.filter}
              className="w-16 h-16 rounded-sm object-cover"
            />
            <p className="mt-1 text-xs">{filter.filter}</p>
          </div>
        ))}
      </div>

      {/* Brightness Slider */}
      <div>
        <Label>Brightness</Label>
        <div className="py-2 px-1 flex gap-2 items-center">
          <FilterSlider
            min={-100}
            max={100}
            value={[filters.brightness]}
            onValueChange={(value) => handleFilterChange("brightness", value)}
            className="w-full"
          />
          <div className="text-[12px] w-12">{filters.brightness}</div>
        </div>
      </div>

      {/* Contrast Slider */}
      <div>
        <Label>Contrast</Label>
        <div className="py-2 px-1 flex gap-2 items-center">
          <FilterSlider
            min={-100}
            max={100}
            value={[filters.contrast]}
            onValueChange={(value) => handleFilterChange("contrast", value)}
            className="w-full"
          />
          <div className="text-[12px] w-12">{filters.contrast}</div>
        </div>
      </div>

      {/* Saturation Slider */}
      <div>
        <Label>Saturation</Label>
        <div className="py-2 px-1 flex gap-2 items-center">
          <FilterSlider
            min={-100}
            max={100}
            value={[filters.saturation]}
            onValueChange={(value) => handleFilterChange("saturation", value)}
            className="w-full"
          />
          <div className="text-[12px] w-12">{filters.saturation}</div>
        </div>
      </div>

      {/* Blur Slider */}
      <div>
        <Label>Blur</Label>
        <div className="py-2 px-1 flex gap-2 items-center">
          <FilterSlider
            min={0}
            max={100}
            value={[filters.blur]}
            onValueChange={(value) => handleFilterChange("blur", value)}
            className="w-full"
          />
          <div className="text-[12px] w-12">{filters.blur}</div>
        </div>
      </div>

      {/* Grayscale Slider */}
      <div>
        <Label>Grayscale</Label>
        <div className="py-2 px-1 flex gap-2 items-center">
          <FilterSlider
            min={0}
            max={100}
            value={[filters.grayscale]}
            onValueChange={(value) => handleFilterChange("grayscale", value)}
            className="w-full"
          />
          <div className="text-[12px] w-12">{filters.grayscale}</div>
        </div>
      </div>
    </div>
  );
}