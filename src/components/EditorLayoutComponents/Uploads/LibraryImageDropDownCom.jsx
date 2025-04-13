import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getData } from "@/utils/datas";
import { Users, Trash2, Ellipsis, Link2, FolderSymlink, Download, ChevronRight, Folder } from 'lucide-react';

function MoveToDropDown() {
    const folders = getData('folders');

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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <FolderSymlink className="mr-2 h-4 w-4" />
                        <span>Move to</span>
                    </div>
                    <ChevronRight className="ml-2 w-4 h-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 max-h-[200px]" align="start" side="right">
                <DropdownMenuGroup>
                    {getMenuItems()}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default function LibraryImageDropDownCom({ onOpenChange }) {
    return (
        <DropdownMenu onOpenChange={onOpenChange}>
            <DropdownMenuTrigger className="absolute top-1 right-1 text-center bg-black bg-opacity-70 text-white px-1.5 rounded-[12px] text-xs font-medium">
                <Ellipsis className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <span>pexels-photo-170811.jpeg</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Copy to my team</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link2 className="mr-2 h-4 w-4" />
                        <span>Copy link</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <MoveToDropDown />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Download original</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}