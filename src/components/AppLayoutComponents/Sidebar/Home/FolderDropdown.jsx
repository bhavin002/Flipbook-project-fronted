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
import ConfirmationDialog from '../../../../utils/ConfirmationDialog';

export default function FolderDropdown() {
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isTrashModalOpen, setIsTrashModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleItemClick = (action, e) => {
        e.stopPropagation();
        e.preventDefault();
        
        setIsDropdownOpen(false);
        
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

    const handleTriggerClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <div 
                        className="w-5 h-5 hover:bg-[#8e65ff] flex items-center justify-center rounded-sm cursor-pointer"
                        onClick={handleTriggerClick}
                    >
                        <EllipsisVertical className="w-4 h-4" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={(e) => handleItemClick('rename', e)}>
                            <FolderPen className="mr-2 h-4 w-4" /> Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => handleItemClick('share', e)}>
                            <Share2 className="mr-2 h-4 w-4" /> Get share link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => handleItemClick('trash', e)}>
                            <Trash className="mr-2 h-4 w-4" /> Move to trash
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <RenameFolderDialog isRenameModalOpen={isRenameModalOpen} setIsRenameModalOpen={setIsRenameModalOpen} />
            <GetShareLink isShareModalOpen={isShareModalOpen} setIsShareModalOpen={setIsShareModalOpen} />
            <ConfirmationDialog
                isConfirmModalOpen={isTrashModalOpen}
                setIsConfirmModalOpen={setIsTrashModalOpen}
                title="Delete folder"
                description="Are you sure you want to delete this folder?"
            />
        </div>
    );
}