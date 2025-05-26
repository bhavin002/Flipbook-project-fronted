import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Trash2, Download, MoreVertical, Check } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UploadBrandLogoApi, GetBrandLogosApi, DeleteBrandLogoApi } from "@/service/brandLogo.service";
import ConfirmationDialog from "@/utils/ConfirmationDialog";
import LoadingButton from "@/utils/LoadingButton";

export default function SelectLogoDialog({ onLogoSelect, mode = "select" }) {
    const [logos, setLogos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [logoToDelete, setLogoToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const fileInputRef = useRef(null);

    const fetchLogos = async () => {
        try {
            setIsLoading(true);
            const response = await GetBrandLogosApi();
            setLogos(response.data.map(logo => ({
                id: logo._id,
                src: logo.url,
                alt: `Logo ${logo._id}`,
                selected: false,
                type: logo.fileType
            })));
        } catch (error) {
            console.error("Error fetching logos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDialogOpen = async (open) => {
        if (open) {
            await fetchLogos();
        }
        setIsDialogOpen(open);
    };

    const handleFileUpload = async (event) => {
        const files = event.target.files;
        if (!files.length) return;

        try {
            setIsUploading(true);
            const formData = new FormData();
            Array.from(files).forEach(file => {
                formData.append('files', file);
            });

            const response = await UploadBrandLogoApi(formData);
            const newLogos = response.data.map(logo => ({
                id: logo._id,
                src: logo.url,
                alt: `Logo ${logo._id}`,
                selected: false,
                type: logo.fileType
            }));
            setLogos(prevLogos => [...prevLogos, ...newLogos]);
        } catch (error) {
            console.error("Error uploading logos:", error);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleDelete = async () => {
        if (!logoToDelete) return;
        
        try {
            setIsDeleting(true);
            await DeleteBrandLogoApi(logoToDelete.id);
            setLogos(logos.filter(logo => logo.id !== logoToDelete.id));
            setLogoToDelete(null);
        } catch (error) {
            console.error("Error deleting logo:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const toggleSelected = (id) => {
        setLogos(logos.map(logo =>
            logo.id === id ? { ...logo, selected: !logo.selected } : { ...logo, selected: false }
        ));
    };

    const handleInsert = () => {
        const selectedLogo = logos.find(logo => logo.selected);
        if (selectedLogo && onLogoSelect) {
            onLogoSelect(selectedLogo);
            setIsDialogOpen(false);
        }
    };

    const hasSelectedLogo = logos.some(logo => logo.selected);

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={handleDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="text-primary">
                        {isLoading ? <LoadingButton /> : (mode === "replace" ? "Replace logo" : "Select logo")}
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
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            multiple
                            accept="image/*"
                            className="hidden"
                        />
                        <Button 
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                        >
                            {isUploading ? <LoadingButton /> : "Upload logo"}
                        </Button>
                        <Button 
                            onClick={handleInsert}
                            disabled={!hasSelectedLogo}
                        >
                            Insert
                        </Button>
                    </div>
                    <div className="max-h-[calc(100vh-300px)] flex flex-wrap overflow-auto">
                        {logos.map((logo) => (
                            <LogoCard 
                                key={logo.id}
                                logo={logo}
                                onDelete={() => setLogoToDelete(logo)}
                                onToggleSelect={toggleSelected}
                            />
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

            <ConfirmationDialog
                isConfirmModalOpen={!!logoToDelete}
                setIsConfirmModalOpen={() => setLogoToDelete(null)}
                title="Delete Logo"
                description="Are you sure you want to delete this logo? This action cannot be undone."
                onConfirm={handleDelete}
                isLoading={isDeleting}
            />
        </>
    );
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
            className="relative max-h-[80px] md:w-1/4 w-1/2 p-1  h-full overflow-hidden aspect-square border-none shadow-none"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
                if (!dropdownOpen) {
                    setIsHovering(false);
                }
            }}
            onClick={() => onToggleSelect(logo.id)}
        >
            <div className="relative w-full h-full border border-gray-200 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer">
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
                    <div className="absolute bottom-2 left-2 bg-gray-700 text-white text-[10px] px-1 rounded opacity-70 z-20">
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
                            <DropdownMenuContent className="w-48 z-50" align="start">
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
            </div>
          
        </Card>
    );
}