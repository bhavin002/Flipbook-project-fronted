import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EllipsisVertical, Users, FolderOpen, PencilLine, Trash2 } from 'lucide-react';

export default function FolderDropDownCom({ onOpenChange }) {
    return (
        <DropdownMenu onOpenChange={onOpenChange}>
            <DropdownMenuTrigger className="hover:bg-sidebar p-1 rounded-md">
                <EllipsisVertical className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Copy to my team</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <FolderOpen className="mr-2 h-4 w-4" />
                        <span>Open</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <PencilLine className="mr-2 h-4 w-4" />
                        <span>Rename</span>
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