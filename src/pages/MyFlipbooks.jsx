import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import HoverParagraph from "@/components/ui/HoverParagraph";
import { useState } from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Plus } from 'lucide-react';
import { Upload } from 'lucide-react';
import { Brush } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { LayoutPanelLeft } from 'lucide-react';
import { LibraryBig } from 'lucide-react';
import { Folder } from 'lucide-react';
import { Archive } from 'lucide-react';
import { CircleUser } from 'lucide-react';
import { BookUser } from 'lucide-react';
import { Settings } from 'lucide-react';
import { Wrench } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { BookOpenText } from 'lucide-react';
import { BookCopy } from 'lucide-react';
import { ListFilter } from 'lucide-react';
import { Search } from 'lucide-react';
import { Clock } from 'lucide-react';


export default function MyFlipbooks() {
    const [searchValue, setSearchValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        setTimeout(() => {
            if (!e.currentTarget.contains(document.activeElement)) {
                setIsFocused(false);
            }
        }, 200);
    };

    return (
        <>
            <header className="flex h-20 w-full justify-between shrink-0 items-center px-4 md:px-6">
                <div>
                    <img src="/src/assets/logo.png" width={200} />
                </div>
                <div className="relative md:flex gap-6 hidden" onBlur={handleBlur}>
                    <div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <div className="relative">
                                <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                                    <Search className="h-4 w-4" />
                                </div>
                                <Input
                                    id="search"
                                    autocomplete="off"
                                    type="search"
                                    placeholder="Search..."
                                    className="w-full rounded-lg bg-background pl-8"
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                    onFocus={handleFocus}
                                />
                            </div>
                        </div>
                        {searchValue && isFocused && (
                            <div className="absolute mt-2 -left-12">
                                <Tabs defaultValue="flipbooks" className="w-[300px]">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="flipbooks">
                                            <BookOpenText className="w-4 h-4 mr-2" /> Flipbooks</TabsTrigger>
                                        <TabsTrigger value="templates">
                                            <BookCopy className="w-4 h-4 mr-2" /> Templates</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="flipbooks">
                                        <Card>
                                            <CardHeader>
                                                <CardDescription>
                                                    Recent searches
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-2">
                                                <HoverParagraph>
                                                    <Clock className="w-4 h-4 mr-2" /> Harry Potter
                                                </HoverParagraph>
                                                <HoverParagraph>
                                                    <Clock className="w-4 h-4 mr-2" />Ikigai
                                                </HoverParagraph>
                                                <HoverParagraph>
                                                    <Clock className="w-4 h-4 mr-2" /> Rich Dad Poor Dad
                                                </HoverParagraph>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                    <TabsContent value="templates">
                                        <Card>
                                            <CardHeader>
                                                <CardDescription>
                                                    Recent searches
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-2">
                                                <HoverParagraph>
                                                    <Clock className="w-4 h-4 mr-2" /> Think and Grow Rich
                                                </HoverParagraph>
                                                <HoverParagraph>
                                                    <Clock className="w-4 h-4 mr-2" /> Think like a Monk
                                                </HoverParagraph>
                                                <HoverParagraph>
                                                    <Clock className="w-4 h-4 mr-2" /> The Kite Runner
                                                </HoverParagraph>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        )}
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline">
                                <ListFilter />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Edit profile</SheetTitle>
                                <SheetDescription>
                                    Make changes to your profile here. Click save when you're done.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input id="name" value="Pedro Duarte" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Username
                                    </Label>
                                    <Input id="username" value="@peduarte" className="col-span-3" />
                                </div>
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button type="submit">Save changes</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="flex md:gap-6 gap-2 items-center">
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

                </div>
            </header>
            <div className="relative flex gap-2 justify-end mx-4 md:hidden" onBlur={handleBlur}>
                <div className="w-full">
                    <div className="grid w-full items-center gap-1.5">
                        <div className="relative">
                            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                                <Search className="h-4 w-4" />
                            </div>
                            <Input
                                id="search"
                                autocomplete="off"
                                type="search"
                                placeholder="Search..."
                                className="w-full rounded-lg bg-background pl-8"
                                value={searchValue}
                                onChange={handleSearchChange}
                                onFocus={handleFocus}
                            />
                        </div>
                    </div>
                    {searchValue && isFocused && (
                        <div className="absolute mt-2">
                            <Tabs defaultValue="flipbooks" className="w-[300px]">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="flipbooks">
                                        <BookOpenText className="w-4 h-4 mr-2" /> Flipbooks</TabsTrigger>
                                    <TabsTrigger value="templates">
                                        <BookCopy className="w-4 h-4 mr-2" /> Templates</TabsTrigger>
                                </TabsList>
                                <TabsContent value="flipbooks">
                                    <Card>
                                        <CardHeader>
                                            <CardDescription>
                                                Recent searches
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <HoverParagraph>
                                                <Clock className="w-4 h-4 mr-2" /> Harry Potter
                                            </HoverParagraph>
                                            <HoverParagraph>
                                                <Clock className="w-4 h-4 mr-2" />Ikigai
                                            </HoverParagraph>
                                            <HoverParagraph>
                                                <Clock className="w-4 h-4 mr-2" /> Rich Dad Poor Dad
                                            </HoverParagraph>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="templates">
                                    <Card>
                                        <CardHeader>
                                            <CardDescription>
                                                Recent searches
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <HoverParagraph>
                                                <Clock className="w-4 h-4 mr-2" /> Think and Grow Rich
                                            </HoverParagraph>
                                            <HoverParagraph>
                                                <Clock className="w-4 h-4 mr-2" /> Think like a Monk
                                            </HoverParagraph>
                                            <HoverParagraph>
                                                <Clock className="w-4 h-4 mr-2" /> The Kite Runner
                                            </HoverParagraph>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    )}
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">
                            <ListFilter />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Edit profile</SheetTitle>
                            <SheetDescription>
                                Make changes to your profile here. Click save when you're done.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input id="name" value="Pedro Duarte" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Username
                                </Label>
                                <Input id="username" value="@peduarte" className="col-span-3" />
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit">Save changes</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}