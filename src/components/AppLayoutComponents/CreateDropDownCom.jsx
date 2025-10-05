import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronRight, Plus, X, Upload as LayoutGrid } from 'lucide-react';
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
import { useFileUpload } from "@/context/FileUploadContext";
import { FlipbookUploadMode } from "@/utils/enum";
import LoadingButton from "@/utils/LoadingButton";
import { useFlipbook } from "@/context/FlipbookContext";
import ProductCatalog from "./ProductCatalogComponent";
import { useAuth } from "@/context/AuthContext";

export default function CreateDropDownCom() {
    const { fetchFlipbooks } = useFlipbook();
    const navigate = useNavigate();
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [productCatalogOpen, setProductCatalogOpen] = useState(false);
    const fileInputRef = useRef(null);
    const { setFiles } = useFileUpload();
    const [multiFileDialogOpen, setMultiFileDialogOpen] = useState(false);
    const [pendingFiles, setPendingFiles] = useState([]);
    const [uploadingSeparately, setUploadingSeparately] = useState(false);
    const { userMeta } = useAuth();

    const handleItemClick = (action) => {
        if (action === "from-scratch") {
            navigate("/create")
        } else if (action === "template") {
            navigate("/create?ct=template");
        } else if (action === "product-catalog") {
            setProductCatalogOpen(true);
        } else if (action === "admin-template") {
            navigate("/create?ct=admin-template");
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
        const allowedTypes = [
            "application/pdf",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "application/vnd.oasis.opendocument.presentation",
            "image/jpeg",
            "image/png"
        ];
        const allValid = files.every(file => allowedTypes.includes(file.type));
        if (!allValid) {
            toast.error("Invalid file type", {
                description: "Please select only PDF, PPTX, ODP, JPG, or PNG files."
            })
            return;
        }
        if (files.length === 1) {
            const file = files[0];
            if (!allowedTypes.includes(file.type)) {
                toast.error("Invalid file type", {
                    description: "Please select only PDF, PPTX, ODP, JPG, or PNG files."
                });
                return;
            }
            setUploadDialogOpen(true);
            try {
                const formData = new FormData();
                formData.append("files", file);
                const response = await UploadPdfApi(formData);
                const bookId = response.data.bookId;
                setTimeout(() => {
                    navigate(`/customize/${bookId}`);
                }, 100);
            } catch (error) {
                toast.error("Failed to upload file", {
                    description: error.message
                })
            } finally {
                setUploadDialogOpen(false)
            }
        } else {
            setPendingFiles(files);
            setMultiFileDialogOpen(true);
        }
    };

    const handleUploadSeparately = async () => {
        setUploadingSeparately(true);
        try {
            const formData = new FormData();
            pendingFiles.forEach(file => formData.append("files", file));
            formData.append("mode", FlipbookUploadMode.SEPARATELY);
            await UploadPdfApi(formData);
            setMultiFileDialogOpen(false);
            setPendingFiles([]);
            fetchFlipbooks();
        } catch (error) {
            toast.error("Failed to upload files", {
                description: error.message
            });
        } finally {
            setUploadingSeparately(false);
        }
    };

    const handleMergeIntoOne = () => {
        setFiles(pendingFiles);
        setMultiFileDialogOpen(false);
        setPendingFiles([]);
        navigate("/upload");
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
                {userMeta?.role === 1 && <>
                    <DropdownMenuItem onClick={() => handleItemClick("admin-template")}>
                        <LayoutGrid /> Admin Template
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                </>}
                <DropdownMenuItem onClick={() => handleItemClick("product-catalog")}>
                    <ShoppingCart /> Product catalog
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/shelf/select")}>
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
                        <img
                            src="/assets/Uploading_cloud.gif"
                        />
                        <div className="text-lg font-semibold mb-5">
                            Uploading your PDF...
                        </div>
                        <div className="w-full mt-2 h-2 bg-gray-200 rounded overflow-hidden relative">
                            <div className="absolute inset-0">
                                <div className="infinite-progress-bar h-full" />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={multiFileDialogOpen} onOpenChange={setMultiFileDialogOpen}>
                <DialogContent hideClose>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <img src="/assets/box_lines.svg" />
                        <div className="space-y-2 text-center">
                            <div className="text-xl font-bold">You have selected {pendingFiles.length} files</div>
                            <div className="text-center text-gray-600">How would you like to upload them?</div>
                        </div>
                        <div className="flex gap-4 w-full">
                            <Button
                                className="flex-1"
                                variant="outline"
                                onClick={handleUploadSeparately}
                                disabled={uploadingSeparately}
                            >
                                {uploadingSeparately ? <LoadingButton /> : "Upload separately"}
                            </Button>
                            <Button
                                className="flex-1"
                                onClick={handleMergeIntoOne}
                                disabled={uploadingSeparately}
                            >
                                Merge them into one
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <ProductCatalog
                open={productCatalogOpen}
                onOpenChange={setProductCatalogOpen}
            />
        </DropdownMenu>
    )
}