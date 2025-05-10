import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FolderInput } from 'lucide-react';

export default function MoveToFolderDropdown({ clearSelection }) {

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                    size="icon"
                        variant="ghost"
                        onClick={clearSelection}
                    >
                        <FolderInput />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" side="right">
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            Folder 1
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Folder 2
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Folder 3
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Folder 4
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Folder 5
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Folder 6
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}