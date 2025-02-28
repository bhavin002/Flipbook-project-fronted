import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus } from 'lucide-react';
import { Upload } from 'lucide-react';
import { Brush } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { LayoutPanelLeft } from 'lucide-react';
import { LibraryBig } from 'lucide-react';
import { Folder } from 'lucide-react';
import { Archive } from 'lucide-react';

export default function CreateDropDownCom() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button>
                    <Plus /> <span className="hidden md:inline">
                        Create
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Upload />  Upload PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Brush /> From scratch
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <ShoppingCart /> Product catalog
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <LayoutPanelLeft />  Template
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <LibraryBig /> Bookshelf
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Folder /> Folder
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Archive /> Bulk upload
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}