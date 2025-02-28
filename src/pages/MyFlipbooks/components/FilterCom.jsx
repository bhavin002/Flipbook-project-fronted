import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ListFilter } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";

export default function FilterCom() {
    const [showStatusBar, setShowStatusBar] = useState(true)
    const [showActivityBar, setShowActivityBar] = useState(false)
    const [showPanel, setShowPanel] = useState(false)
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <ListFilter />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="mb-4">
                    <SheetTitle>Filter options</SheetTitle>
                </SheetHeader>
                <div>

                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button>Apply filters</Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button variant="outline">Clear filters</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}