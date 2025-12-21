import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ChevronRight,
    Plus,
    Upload as UploadIcon,
    Brush,
    LayoutPanelLeft,
    LayoutGrid,
    ShoppingCart,
    LibraryBig,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useFileUpload } from "@/context/FileUploadContext";
import LoadingButton from "@/utils/LoadingButton";
import { useFlipbook } from "@/context/FlipbookContext";
import ProductCatalog from "./ProductCatalogComponent";
import { useAuth } from "@/context/AuthContext";
import { useFlipbookCreation } from "@/hooks/useFlipbookCreation";

export default function CreateDropDownCom() {
    const { fetchFlipbooks } = useFlipbook(); // Kept for consistency if other parts need it, though hook uses it internally too.
    const navigate = useNavigate();
    const [productCatalogOpen, setProductCatalogOpen] = useState(false);
    const { userMeta } = useAuth();
    const { setFiles } = useFileUpload(); // Hook uses this, but leaving if needed for other logic not in hook.

    const {
        uploadDialogOpen,
        setUploadDialogOpen,
        multiFileDialogOpen,
        setMultiFileDialogOpen,
        pendingFiles,
        uploadingSeparately,
        progressPercent,
        progressText,
        fileProgressList,
        fileInputRef,
        handleFileChange,
        handleUploadSeparately,
        handleMergeIntoOne,
        triggerFileInput
    } = useFlipbookCreation();

    const handleItemClick = (action) => {
        if (action === "from-scratch") navigate("/create");
        else if (action === "template") navigate("/create?ct=template");
        else if (action === "product-catalog") setProductCatalogOpen(true);
        else if (action === "admin-template") navigate("/create?ct=admin-template");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button>
                    <Plus /> <span className="hidden md:inline">Create</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={triggerFileInput}>
                        <div className="flex justify-between items-center w-full">
                            <div className="flex gap-2 items-center">
                                <UploadIcon className="h-4 w-4" /> Upload Files
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
                        <LayoutPanelLeft /> Template
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {userMeta?.role === 1 && (
                    <>
                        <DropdownMenuItem onClick={() => handleItemClick("admin-template")}>
                            <LayoutGrid /> Admin Template
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                )}

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
                <DialogContent className="sm:max-w-[540px] w-[90vw]">
                    <div className="flex flex-col items-center justify-center p-4 w-full space-y-6">
                        <img src="/assets/Uploading_cloud.gif" className="w-20 scale-150" alt="uploading" />

                        <div className="text-lg font-semibold">
                            {progressText || "Uploading files..."}
                        </div>

                        {fileProgressList.length > 0 ? (
                            <div className="w-full flex flex-col gap-4 max-h-[400px] overflow-y-auto">
                                {fileProgressList.map((file, idx) => (
                                    <div key={idx} className="max-w-[476px]">
                                        <div className="flex justify-between items-center mb-1 gap-2 overflow-hidden w-full">
                                            <span className="text-sm text-gray-700 truncate min-w-0 flex-1">{file.name}</span>
                                            <span className="text-xs text-gray-500 flex-shrink-0 whitespace-nowrap">{file.percent}%</span>
                                        </div>

                                        <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
                                            <div
                                                className={`h-2 transition-all ${file.status === "done"
                                                    ? "bg-green-500"
                                                    : "bg-purple-600"
                                                    }`}
                                                style={{ width: `${file.percent}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="w-full mt-2 h-2 bg-gray-200 rounded overflow-hidden relative">
                                    <div
                                        className="h-full bg-purple-600 transition-all duration-300"
                                        style={{ width: `${progressPercent}%` }}
                                    ></div>
                                </div>
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={multiFileDialogOpen} onOpenChange={setMultiFileDialogOpen}>
                <DialogContent className="sm:max-w-[540px] w-[90vw]">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <img src="/assets/box_lines.svg" />
                        <div className="space-y-2 text-center">
                            <div className="text-xl font-bold">
                                You have selected {pendingFiles.length} files
                            </div>
                            <div className="text-center text-gray-600">
                                How would you like to upload them?
                            </div>
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

            <ProductCatalog open={productCatalogOpen} onOpenChange={setProductCatalogOpen} />
        </DropdownMenu>
    );
}
