import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Trash2, Download, MoreVertical, Check } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SelectLogoDialog() {
    const [logos, setLogos] = useState([
        { id: 1, src: "/src/assets/book_logo.png", alt: "Logo 1", selected: false, type: "PNG" },
        { id: 2, src: "/src/assets/logo.png", alt: "Logo 2", selected: false, type: "PNG" }
    ]);

    const handleDelete = (id) => {
        setLogos(logos.filter(logo => logo.id !== id));
    };

    const toggleSelected = (id) => {

        setLogos(logos.map(logo =>
            logo.id === id ? { ...logo, selected: !logo.selected } : { ...logo, selected: false }
        ));
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    Select logo
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Brand logos</DialogTitle>
                    <DialogDescription className="sr-only">
                        Description
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2">
                    <Button variant="outline">
                        Upload logo
                    </Button>
                    <Button>
                        Insert
                    </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {logos.map((logo) => (
                        <LogoCard
                            key={logo.id}
                            logo={logo}
                            onDelete={handleDelete}
                            onToggleSelect={toggleSelected}
                        />
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}

function LogoCard({ logo, onDelete, onToggleSelect }) {
    const [isHovering, setIsHovering] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const preventDrag = (e) => {
        e.preventDefault();
        return false;
    };

    return (
        <Card
            className="relative overflow-hidden aspect-square border border-gray-200 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
                if (!dropdownOpen) {
                    setIsHovering(false);
                }
            }}
            onClick={() => onToggleSelect(logo.id)}
        >
            <div
                className="absolute inset-0 bg-center bg-repeat"
                style={{ backgroundImage: 'url(https://cdn.flipsnack.com/site/images/transparent-bg-pattern.png)' }}
            />

            <img
                src={logo.src}
                alt={logo.alt}
                className="w-full h-full object-contain p-2 relative z-10 select-none"
                draggable="false"
                onDragStart={preventDrag}
            />



            {(isHovering || logo.selected) && (
                <>
                    <div className="absolute bottom-2 left-2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-70 z-20">
                        {logo.type}
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-20 z-20">
                        <div
                            className="absolute top-2 left-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleSelect(logo.id);
                            }}
                        >
                            {logo.selected ? (
                                <div className="rounded-full bg-purple-600 text-white p-1">
                                    <Check size={16} />
                                </div>
                            ) : (
                                <div className="rounded-full border-2 border-white w-6 h-6" />
                            )}
                        </div>

                        {/* Three dots menu */}
                        <DropdownMenu
                            open={dropdownOpen}
                            onOpenChange={(open) => {
                                setDropdownOpen(open);
                                if (!open && !isHovering) {
                                    setIsHovering(false);
                                }
                            }}
                        >
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 text-white hover:bg-black hover:bg-opacity-20 z-30 p-1 h-6 w-6 rounded-full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    <MoreVertical size={16} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-48 z-50" align="end">
                                <DropdownMenuItem
                                    className="flex items-center gap-2"
                                >
                                    <Download size={16} />
                                    <span>Download original</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="flex items-center gap-2 text-red-600 focus:text-red-600"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(logo.id);
                                    }}
                                >
                                    <Trash2 size={16} />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </>

            )}
        </Card>
    );
}