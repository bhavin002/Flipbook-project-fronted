import { useState, useEffect } from "react";
import { FilterSlider } from "@/components/ui/filterSlider";
import { Label } from "@/components/ui/label";

const filterPresets = {
  Normal: {
    brightness: 0,
    contrast: 0,
    saturation: 0,
    sepia: 0,
    tint: 0,
    blur: 0,
    vignette: 0,
    grayscale: 0,
  },
  Ashby: {
    brightness: 20,
    contrast: 15,
    saturation: 20,
    sepia: 15,
    tint: 5,
    blur: 0,
    vignette: 30,
    grayscale: 0,
  },
  Brooklyn: {
    brightness: -15,
    contrast: 10,
    saturation: -20,
    sepia: 20,
    tint: 8,
    blur: 3,
    vignette: 35,
    grayscale: 0,
  },
  Moon: {
    brightness: -20,
    contrast: 50,
    saturation: -100,
    sepia: 0,
    tint: 0,
    blur: 8,
    vignette: 50,
    grayscale: 100,
  },
  Sutro: {
    brightness: -30,
    contrast: 40,
    saturation: 10,
    sepia: 30,
    tint: 10,
    blur: 5,
    vignette: 60,
    grayscale: 0,
  },
  Poprocket: {
    brightness: 30,
    contrast: 25,
    saturation: 50,
    sepia: 0,
    tint: 15,
    blur: 0,
    vignette: 20,
    grayscale: 0,
  },
  Skyline: {
    brightness: 25,
    contrast: 20,
    saturation: 30,
    sepia: 0,
    tint: 0,
    blur: 0,
    vignette: 15,
    grayscale: 0,
  },
  Rise: {
    brightness: 35,
    contrast: -10,
    saturation: 15,
    sepia: 25,
    tint: 8,
    blur: 6,
    vignette: 40,
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
      id: 1,
      filter: "Normal",
      url: "https://images.pexels.com/photos/5874910/pexels-photo-5874910.jpeg",
    },
    {
      id: 2,
      filter: "Ashby",
      url: "https://images.pexels.com/photos/5874910/pexels-photo-5874910.jpeg",
    },
    {
      id: 3,
      filter: "Brooklyn",
      url: "https://images.pexels.com/photos/5874910/pexels-photo-5874910.jpeg",
    },
    {
      id: 4,
      filter: "Moon",
      url: "https://images.pexels.com/photos/5874910/pexels-photo-5874910.jpeg",
    },
    {
      id: 5,
      filter: "Sutro",
      url: "https://images.pexels.com/photos/5874910/pexels-photo-5874910.jpeg",
    },
    {
      id: 6,
      filter: "Poprocket",
      url: "https://images.pexels.com/photos/5874910/pexels-photo-5874910.jpeg",
    },
    {
      id: 7,
      filter: "Skyline",
      url: "https://images.pexels.com/photos/5874910/pexels-photo-5874910.jpeg",
    },
    {
      id: 8,
      filter: "Rise",
      url: "https://images.pexels.com/photos/5874910/pexels-photo-5874910.jpeg",
    },
  ];

  const [filters, setFilters] = useState({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    sepia: 0,
    tint: 0,
    blur: 0,
    vignette: 0,
    grayscale: 0,
  });

  // Load filter settings from selected shape
  useEffect(() => {
    if (selectedShape.length && selectedShape[0]) {
      const effect = selectedShape[0].attrs.effect || {};
      setFilters({
        brightness: effect.brightness !== undefined ? effect.brightness : 0,
        contrast: effect.contrast !== undefined ? effect.contrast : 0,
        saturation: effect.saturation !== undefined ? effect.saturation : 0,
        sepia: effect.sepia !== undefined ? effect.sepia : 0,
        tint: effect.tint !== undefined ? effect.tint : 0,
        blur: effect.blur !== undefined ? effect.blur : 0,
        vignette: effect.vignette !== undefined ? effect.vignette : 0,
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
    <div className="p-6 space-y-4">
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

      {/* Sepia Slider */}
      <div>
        <Label>Sepia</Label>
        <div className="py-2 px-1 flex gap-2 items-center">
          <FilterSlider
            min={0}
            max={100}
            value={[filters.sepia]}
            onValueChange={(value) => handleFilterChange("sepia", value)}
            className="w-full"
          />
          <div className="text-[12px] w-12">{filters.sepia}</div>
        </div>
      </div>

      {/* Tint Slider */}
      <div>
        <Label>Tint</Label>
        <div className="py-2 px-1 flex gap-2 items-center">
          <FilterSlider
            min={0}
            max={100}
            value={[filters.tint]}
            onValueChange={(value) => handleFilterChange("tint", value)}
            className="w-full"
          />
          <div className="text-[12px] w-12">{filters.tint}</div>
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

      {/* Vignette Slider */}
      <div>
        <Label>Vignette</Label>
        <div className="py-2 px-1 flex gap-2 items-center">
          <FilterSlider
            min={0}
            max={100}
            value={[filters.vignette]}
            onValueChange={(value) => handleFilterChange("vignette", value)}
            className="w-full"
          />
          <div className="text-[12px] w-12">{filters.vignette}</div>
        </div>
      </div>
    </div>
  );
}