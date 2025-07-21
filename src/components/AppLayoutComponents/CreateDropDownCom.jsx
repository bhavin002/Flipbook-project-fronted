import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronRight, Plus } from 'lucide-react';
import { Upload } from 'lucide-react';
import { Brush } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { LayoutPanelLeft } from 'lucide-react';
import { LibraryBig } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UploadPdfApi } from "@/service/flipbook.service";
import { toast } from "sonner";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useFileUpload } from "@/context/FileUploadContext";

export default function CreateDropDownCom() {

    const navigate = useNavigate();
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const fileInputRef = useRef(null);
    const { setFiles } = useFileUpload();

    const handleItemClick = (action) => {
        if (action === "from-scratch") {
            navigate("/create")
        } else if (action === "template") {
            navigate("/create?ct=template");
        }
    };

    const handleUploadPdfClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event) => {
        const files = Array.from(event.target.files);
        if (!files.length) return;
        // Only allow supported types
        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation", // pptx
            "application/vnd.oasis.opendocument.presentation", // odp
            "image/jpeg",
            "image/png"
        ];
        const allValid = files.every(file => allowedTypes.includes(file.type));
        if (!allValid) {
            alert("Please select only PDF, PPTX, ODP, JPG, or PNG files.");
            return;
        }
        if (files.length === 1) {
            // Single file upload (keep current logic)
            const file = files[0];
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
        } else {
            console.log("files ?>??? CreateDropDownCom ",files)
            setFiles(files);
            navigate("/upload");
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
                        <div className="flex justify-between items-center w-full">
                            <div className="flex gap-2 items-center">
                                <Upload className="h-4 w-4" />  Upload Files
                            </div>
                            <ChevronRight className="h-4 w-4" />
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => handleItemClick("from-scratch")}>
                        <Brush /> From scratch
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleItemClick("template")}>
                        <LayoutPanelLeft />  Template
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <ShoppingCart /> Product catalog
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LibraryBig /> Bookshelf
                </DropdownMenuItem>
            </DropdownMenuContent>
            <input
                type="file"
                accept=".pdf,.pptx,.odp,.jpg,.jpeg,.png"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                multiple
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