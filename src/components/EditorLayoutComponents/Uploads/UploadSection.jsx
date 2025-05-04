import * as React from "react";
import { useState } from "react";
import { ChevronDown, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import MediaImageDropDownCom from "./MediaImageDropDownCom";
import { Folder } from "lucide-react";

export default function UploadSection({
  mediaFiles = [],
  folders = [],
}) {
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const [activeImageDropdownIndex, setActiveImageDropdownIndex] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleImageDropdownOpen = (index) => {
    setActiveImageDropdownIndex(index);
  };

  const handleImageDropdownClose = () => {
    setActiveImageDropdownIndex(null);
  };

  const getMenuItems = () => {
    return (
      <>
        {folders.map((folder, index) => (
          folder.byDefault ? 
            <DropdownMenuItem key={`default-${index}`}>
              <Folder fill="currentColor" className="mr-2 h-4 w-4" /> {folder.name}
            </DropdownMenuItem> 
          : 
            <DropdownMenuItem key={index}>
              <Folder className="mr-2 h-4 w-4" /> {folder.name}
            </DropdownMenuItem>
        ))}
      </>
    );
  };

  return (
    <div className="space-y-2 flex flex-col flex-grow overflow-y-auto h-0">
      <div className="flex items-center justify-between w-full h-9">
        <div>
          <span className="font-semibold">Uploads</span>
        </div>
        <div className="flex items-center gap-3">
          {isChecked && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="text-primary">
                    Move to <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 max-h-[200px]" align="start">
                  <DropdownMenuGroup>
                    {getMenuItems()}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Users 
                className="w-5 h-5 cursor-pointer" 
              />
              <Trash2 
                className="w-5 h-5 cursor-pointer" 
              />
            </>
          )}
          <Checkbox
            className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-5 h-5"
            checked={isChecked}
            onCheckedChange={setIsChecked}
          />
        </div>
      </div>

      <div className="overflow-y-auto flex-grow h-0">
        {mediaFiles.length > 0 ? (
          <div className="columns-3 gap-2 space-y-2 p-1 cursor-pointer">
            {mediaFiles.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="break-inside-avoid relative group"
                onMouseEnter={() => setHoveredImageIndex(itemIndex)}
                onMouseLeave={() => {
                  if (activeImageDropdownIndex !== itemIndex) {
                    setHoveredImageIndex(null);
                  }
                }}
              >
                <img
                  src={item.url}
                  alt={`Upload ${item._id}`}
                  className="w-full rounded-lg"
                />

                {(hoveredImageIndex === itemIndex || activeImageDropdownIndex === itemIndex) && (
                  <>
                    <div className="absolute left-1 bottom-1 text-center bg-black bg-opacity-70 text-white px-2 py-0.5 rounded-[12px] text-xs font-medium">
                      {item.fileType || 'Image'}
                    </div>
                    <div className="absolute top-1 left-1.5">
                      <Checkbox className="bg-white border-white data-[state=checked]:bg-white data-[state=checked]:text-primary" />
                    </div>
                    <MediaImageDropDownCom
                      onOpenChange={(open) => {
                        if (open) {
                          handleImageDropdownOpen(itemIndex);
                        } else {
                          handleImageDropdownClose();
                        }
                      }}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white text-xs py-2 px-3 text-center">
            This section is empty
          </div>
        )}
      </div>
    </div>
  );
}