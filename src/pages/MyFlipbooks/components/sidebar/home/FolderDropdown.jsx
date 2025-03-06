import { EllipsisVertical } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FolderPen, Share2, Trash } from 'lucide-react';
import { useState } from 'react';
import RenameFolderDialog from './RenameFolderDialog';
import GetShareLink from './GetShareLink';
import ConfirmationDialog from './ConfirmationDialog';

export default function FolderDropdown() {
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isTrashModalOpen, setIsTrashModalOpen] = useState(false);

    const handleItemClick = (action) => {
        if (action === 'rename') {
            setIsRenameModalOpen(true);
        } else if (action === 'share') {
            setIsShareModalOpen(true);
        } else if (action === 'trash') {
            setIsTrashModalOpen(true);
        } else {
            console.error("Invalid action:", action);
        }
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <EllipsisVertical className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => handleItemClick('rename')}>
                            <FolderPen className="mr-2 h-4 w-4" /> Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleItemClick('share')}>
                            <Share2 className="mr-2 h-4 w-4" /> Get share link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleItemClick('trash')}>
                            <Trash className="mr-2 h-4 w-4" /> Move to trash
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <RenameFolderDialog isRenameModalOpen={isRenameModalOpen} setIsRenameModalOpen={setIsRenameModalOpen}/>
            <GetShareLink isShareModalOpen={isShareModalOpen} setIsShareModalOpen={setIsShareModalOpen}/>
            <ConfirmationDialog isConfirmModalOpen={isTrashModalOpen} setIsConfirmModalOpen={setIsTrashModalOpen}/>
        </div>
    );
}