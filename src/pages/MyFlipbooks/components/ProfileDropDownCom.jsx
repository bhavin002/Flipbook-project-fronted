import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CircleUser } from 'lucide-react';
import { BookUser } from 'lucide-react';
import { Settings } from 'lucide-react';
import { Wrench } from 'lucide-react';
import { LogOut } from 'lucide-react';

export default function ProfileDropDownCom() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src="/src/assets/profile.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <div className="flex items-center">
                    <Avatar>
                        <AvatarImage src="/src/assets/profile.jpg" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <DropdownMenuLabel className="p-0 px-2 pb-1.5">Bhavin Vasavada</DropdownMenuLabel>
                        <p className="text-[12px] ml-2 text-muted-foreground truncate max-w-40 -mt-2">bhavin@gmail.com</p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <CircleUser /> My profile
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <BookUser /> My account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings /> Settings
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Wrench /> Help and support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut /> Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}