import { useState } from "react";
import { FilterSlider } from "@/components/ui/filterSlider";
import { Label } from "@/components/ui/label";

export default function ImageFilter() {
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
    brightness: Math.floor(Math.random() * 101),
    contrast: Math.floor(Math.random() * 101),
    saturation: Math.floor(Math.random() * 101),
    sepia: Math.floor(Math.random() * 101),
    tint: Math.floor(Math.random() * 101),
    blur: Math.floor(Math.random() * 101),
    vignette: Math.floor(Math.random() * 101),
  });

  const handleFilterChange = (filterName, newValue) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: newValue[0],
    }));
  };

  return (
    <div className="p-6 space-y-4">
      <Label className="text-lg">Image filter</Label>
      <div className="grid grid-cols-4 gap-2 justify-items-center">
        {imageFilters.map((filter) => (
          <div key={filter.id} className="text-center cursor-pointer">
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
            min={0}
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
            min={0}
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
            min={0}
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