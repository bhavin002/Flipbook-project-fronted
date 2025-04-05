import * as React from "react"
import { useState } from "react"
import { ChevronDown, Folder, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateFolderDialog from "./CreateFolderDialog";
import { getData } from "@/utils/datas";
import FolderDropDownCom from "./FolderDropDownCom";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,DropdownMenuGroup } from "@/components/ui/dropdown-menu";


export default function MyUpload() {
    const [showAllFolders, setShowAllFolders] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const folders = getData('folders');
    const library = getData('library');

    const displayedFolders = showAllFolders ? folders : folders.slice(0, 6);

    const handleDropdownOpen = (index) => {
        setActiveDropdownIndex(index);
    };

    const handleDropdownClose = () => {
        setActiveDropdownIndex(null);
    };

    const getMenuItems = () => {
        return (
            <>
                <DropdownMenuItem>
                    <Folder fill="currentColor" className="mr-2 h-4 w-4" /> Library
                </DropdownMenuItem>
                {folders.map((folder, index) => (
                    <DropdownMenuItem key={index}>
                        <Folder className="mr-2 h-4 w-4" /> {folder.name}
                    </DropdownMenuItem>
                ))}
            </>
        );
    };

    return (
        <>
            <Button className="w-full text-primary" variant="outline">Upload media</Button>
            <div className="space-y-2">
                <div className="flex items-center justify-between w-full">
                    <span className="font-semibold">Folders</span>
                    <CreateFolderDialog />
                </div>
                <div className="flex flex-col">
                    <div className="max-h-48 overflow-y-auto">
                        <div className="grid grid-cols-3 gap-2">
                            {displayedFolders.map((item, itemIndex) => (
                                <div
                                    key={itemIndex}
                                    className="cursor-pointer flex flex-col items-center"
                                    onMouseEnter={() => setHoveredIndex(itemIndex)}
                                    onMouseLeave={() => {
                                        // Only reset hover state if dropdown isn't active
                                        if (activeDropdownIndex !== itemIndex) {
                                            setHoveredIndex(null);
                                        }
                                    }}
                                >
                                    <div className="rounded-lg w-full bg-primary hover:bg-violet-700 flex gap-2 px-1 py-1 items-center">
                                        {hoveredIndex === itemIndex || activeDropdownIndex === itemIndex ? (
                                            <FolderDropDownCom
                                                onOpenChange={(open) => {
                                                    if (open) {
                                                        handleDropdownOpen(itemIndex);
                                                    } else {
                                                        handleDropdownClose();
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <div className="p-1">
                                                <Folder className="w-4 h-4" />
                                            </div>
                                        )}
                                        <span className="text-xs truncate">{item.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {folders.length > 6 && (
                        <p className="text-xs mt-2 font-medium text-white cursor-pointer hover:underline"
                            onClick={() => setShowAllFolders(!showAllFolders)}
                        >
                            {showAllFolders ? "Show Less" : "Show More"}
                        </p>
                    )}
                </div>
            </div>
            <div className="space-y-2">
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
                                <Users className="w-5 h-5 cursor-pointer" />
                                <Trash2 className="w-5 h-5 cursor-pointer" />
                            </>
                        )}
                        <Checkbox
                            className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-5 h-5"
                            checked={isChecked}
                            onCheckedChange={setIsChecked}
                        />
                    </div>

                </div>
                <div className="overflow-y-auto flex-grow">
                    <div className="flex flex-wrap justify-between gap-2">
                        {library.map((item, itemIndex) => (
                            <img src={item.img} key={itemIndex} alt={`Upload ${item.id}`} className="w-[96px] h-auto object-cover rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}