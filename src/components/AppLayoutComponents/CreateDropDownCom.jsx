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
import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
    UploadFilesNewApi,
    GenerateFlipbookApi,
    subscribeToUploadProgress,
} from "@/service/flipbook.service";
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
    const [multiFileDialogOpen, setMultiFileDialogOpen] = useState(false);
    const [pendingFiles, setPendingFiles] = useState([]);
    const [uploadingSeparately, setUploadingSeparately] = useState(false);
    const [progressPercent, setProgressPercent] = useState(0);
    const [progressText, setProgressText] = useState("");
    const [fileProgressList, setFileProgressList] = useState([]);
    const [productCatalogOpen, setProductCatalogOpen] = useState(false);
    const { userMeta } = useAuth();
    const { setFiles } = useFileUpload();
    const fileInputRef = useRef(null);
    const eventSourceRef = useRef(null);

    const resetUpload = () => {
        if (eventSourceRef.current) eventSourceRef.current.close();
        setProgressPercent(0);
        setProgressText("");
        setFileProgressList([]);
    };

    const handleItemClick = (action) => {
        if (action === "from-scratch") navigate("/create");
        else if (action === "template") navigate("/create?ct=template");
        else if (action === "product-catalog") setProductCatalogOpen(true);
        else if (action === "admin-template") navigate("/create?ct=admin-template");
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
            "image/png",
        ];

        const allValid = files.every((file) => allowedTypes.includes(file.type));
        if (!allValid) {
            toast.error("Invalid file type", {
                description: "Please select only PDF, PPTX, ODP, JPG, or PNG files.",
            });
            return;
        }

        if (files.length === 1) {
            await uploadSingleFile(files[0]);
        } else {
            setPendingFiles(files);
            setMultiFileDialogOpen(true);
        }
    };

    const smoothTo100 = (callback) => {
        let percent = 0;
        const step = () => {
            percent += 5;
            callback(percent);
            if (percent < 100) setTimeout(step, 20);
        };
        step();
    };

    const uploadSingleFile = async (file) => {
        resetUpload();
        setUploadDialogOpen(true);
        setProgressText("Uploading your file...");

        try {
            const formData = new FormData();
            formData.append("files", file);

            const uploadRes = await UploadFilesNewApi(formData);
            const { sessionId, mainFolderId, files: uploadedFiles } = uploadRes;

            eventSourceRef.current = subscribeToUploadProgress(sessionId, async (data) => {
                if (data.status === "rendering") {
                    const percent = Math.round((data.page / (data.total || 1)) * 100);
                    setProgressText(`Hang tight! Processing pages... ${data.page}/${data.total}`);
                    setProgressPercent(percent);
                }

                if (data.stage === "all_done") {
                    smoothTo100(setProgressPercent);
                    setProgressText("Generating your flipbook...");

                    setTimeout(async () => {
                        const genRes = await GenerateFlipbookApi({
                            mainFolderId,
                            files: uploadedFiles,
                            mode: FlipbookUploadMode.COMBINE,
                        });

                        const { bookIds } = genRes.data;
                        if (bookIds?.length) {
                            setProgressPercent(100);
                            setProgressText("Flipbook created successfully 🎉");

                            setTimeout(() => {
                                setUploadDialogOpen(false);
                                navigate(`/customize/${bookIds[0]}`);
                            }, 1000);
                        } else {
                            toast.error("Flipbook creation failed");
                            setUploadDialogOpen(false);
                        }
                    }, 600);
                }
            });
        } catch (error) {
            toast.error("Upload failed", { description: error.message });
            setUploadDialogOpen(false);
        }
    };

    const handleUploadSeparately = async () => {
        setMultiFileDialogOpen(false);
        setUploadingSeparately(true);
        setUploadDialogOpen(true);
        resetUpload();

        try {
            const formData = new FormData();
            pendingFiles.forEach((file) => formData.append("files", file));

            const uploadRes = await UploadFilesNewApi(formData);
            const { sessionId, mainFolderId, files: uploadedFiles } = uploadRes;

            setFileProgressList(
                pendingFiles.map((file) => ({
                    name: file.name,
                    percent: 0,
                    status: "waiting",
                }))
            );

            eventSourceRef.current = subscribeToUploadProgress(sessionId, async (data) => {
                if (!data) return;

                if (data.status === "rendering") {
                    const percent = Math.min(
                        Math.round((data.page / (data.total || 1)) * 100),
                        100
                    );

                    setFileProgressList((prev) =>
                        prev.map((f) =>
                            f.name === data.file
                                ? { ...f, percent, status: "rendering" }
                                : f
                        )
                    );
                }

                if (data.stage === "file_done") {
                    setFileProgressList((prev) =>
                        prev.map((f) =>
                            f.name === data.file ? { ...f, percent: 100, status: "done" } : f
                        )
                    );
                }

                if (data.stage === "all_done") {
                    setFileProgressList((prev) =>
                        prev.map((item) => ({ ...item, percent: 100, status: "done" }))
                    );

                    setProgressText("Generating flipbooks...");

                    try {
                        const genRes = await GenerateFlipbookApi({
                            mainFolderId,
                            files: uploadedFiles,
                            mode: FlipbookUploadMode.SEPARATELY,
                        });

                        if (genRes.data.bookIds?.length) {
                            toast.success("All flipbooks created successfully 🎉");
                            fetchFlipbooks();
                            setTimeout(() => {
                                setUploadDialogOpen(false);
                                setMultiFileDialogOpen(false);
                                setPendingFiles([]);
                            }, 1000);
                        } else {
                            toast.error("Flipbook generation failed");
                        }
                    } catch (err) {
                        toast.error("Flipbook generation failed", { description: err.message });
                    }
                }
            });
        } catch (err) {
            toast.error("Failed to upload", { description: err.message });
            setUploadDialogOpen(false);
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
                    <Plus /> <span className="hidden md:inline">Create</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleUploadPdfClick}>
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
