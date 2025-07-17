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
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UploadPdfApi } from "@/service/flipbook.service";
import { toast } from "sonner";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function CreateDropDownCom() {

    const navigate = useNavigate();
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const fileInputRef = useRef(null);

    const handleItemClick = (action) => {
        if (action === "from-scratch") {
            navigate("/create")
        }
    };

    const handleUploadPdfClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        if (file.type !== "application/pdf") {
            alert("Please select a PDF file.");
            return;
        }
        setUploadDialogOpen(true);
        try {
            const formData = new FormData();
            formData.append("pdfFile", file);
            const response = await UploadPdfApi(formData);
            console.log("response ?>??", response)
            const bookId = response.data.bookId;
            setTimeout(() => {
                setUploadDialogOpen(false);
                navigate(`/customize/${bookId}`);
            }, 100);
        } catch (error) {
            toast.error("Failed to upload pdf", {
                description: error.message
            })
        }
    };

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
                    <DropdownMenuItem onClick={handleUploadPdfClick}>
                        <Upload />  Upload PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleItemClick("from-scratch")}>
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
            <input
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                <DialogContent hideClose>
                    <div className="flex flex-col items-center justify-center p-4">
                        <DotLottieReact
                            src="public/Uploading_to_cloud.json"
                            loop
                            autoplay
                        />
                        <div className="text-lg font-semibold mb-5">Uploading your PDF...</div>
                        <div className="w-full mt-2 h-2 bg-gray-200 rounded overflow-hidden relative">
                            <div className="absolute inset-0">
                                <div className="infinite-progress-bar h-full" />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </DropdownMenu>
    )
}