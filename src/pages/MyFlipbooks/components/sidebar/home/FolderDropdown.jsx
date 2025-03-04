import { EllipsisVertical } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FolderPen } from 'lucide-react';
import { Share2 } from 'lucide-react';
import { Trash } from 'lucide-react';

export default function FolderDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <EllipsisVertical className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <FolderPen /> Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Share2 /> Get share link
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Trash /> Move to trash
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}