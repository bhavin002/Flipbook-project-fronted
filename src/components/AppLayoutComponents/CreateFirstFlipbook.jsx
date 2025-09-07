import { Button } from "@/components/ui/button";
import { Brush, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropDownCom from "./ProfileDropDownCom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UploadPdfApi } from "@/service/flipbook.service";
import { toast } from "sonner";
import { useFileUpload } from "@/context/FileUploadContext";
import { FlipbookUploadMode } from "@/utils/enum";
import LoadingButton from "@/utils/LoadingButton";
import { useFlipbook } from "@/context/FlipbookContext";

export default function CreateFirstFlipbook() {
    const { fetchFlipbooks } = useFlipbook();
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { setFiles } = useFileUpload();
    
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [multiFileDialogOpen, setMultiFileDialogOpen] = useState(false);
    const [pendingFiles, setPendingFiles] = useState([]);
    const [uploadingSeparately, setUploadingSeparately] = useState(false);

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
            fileInputRef.current.click();
        }
    };

    const handleFileInputChange = async (event) => {
        const files = Array.from(event.target.files);
        if (!files.length) return;
        
        // File type validation
        const allowedTypes = [
            "application/pdf",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "application/vnd.oasis.opendocument.presentation",
            "image/jpeg",
            "image/png",
            "image/gif"
        ];
        
        const allValid = files.every(file => allowedTypes.includes(file.type));
        if (!allValid) {
            toast.error("Invalid file type", {
                description: "Please select only PDF, PPTX, ODP, JPG, PNG, or GIF files."
            });
            return;
        }

        if (files.length === 1) {
            const file = files[0];
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
                });
            } finally {
                setUploadDialogOpen(false);
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
            navigate("/myflipbooks");
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
        <div className="flex flex-col min-h-screen">
            <header className="fixed top-0 left-0 right-0 z-10 bg-white">
                <div className="flex h-16 w-full justify-between shrink-0 items-center px-4 md:px-6">
                    <div className="cursor-pointer" onClick={() => {
                        navigate("/myflipbooks")
                    }}>
                        <img src="/assets/logo.png" width={200} alt="Logo" />
                    </div>
                    <div className="flex md:gap-6 gap-2 items-center">
                        <ProfileDropDownCom />
                    </div>
                </div>
            </header>

            <div className="max-md:flex mt-[64px] flex overflow-y-auto h-[calc(100vh-64px)]">
                <div className="flex items-center justify-center w-full">
                    <div className="w-full bg-white flex h-full overflow-auto flex-col">
                        <div className='flex flex-col overflow-y-auto max-md:px-3'>
                            <div className='flex flex-col justify-center m-auto max-w-2xl w-full'>
                                <h1 className="text-2xl font-semibold text-center">Create your first flipbook</h1>
                                <div
                                    className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-lg p-12 my-8 space-y-4 bg-purple-50/30 transition-colors hover:border-purple-300 hover:bg-purple-50/50"
                                >
                                    <img src='/assets/upload_icon.svg' />
                                    <div className='space-y-1 flex flex-col justify-center text-center'>
                                        <h3 className="text-lg font-medium">Drag and drop or upload your files</h3>
                                        <p className="text-sm text-gray-500">Supported formats: PDF, PPTX, ODP, JPG, PNG, GIF.</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            className="bg-purple-600 hover:bg-purple-700"
                                            onClick={handleUploadClick}
                                        >
                                            <Upload className="w-4 h-4" />
                                            Upload files
                                        </Button>
                                    </div>

                                    <input
                                        type="file"
                                        accept=".pdf,.pptx,.ppt,.odp,.jpg,.jpeg,.png,.gif"
                                        multiple
                                        ref={fileInputRef}
                                        className="hidden"
                                        onChange={handleFileInputChange}
                                    />
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    <div>
                                        <p className="text-md font-medium">Nothing to upload?</p>
                                        <p className="text-sm text-gray-500">Design your own flipbook from scratch.</p>
                                    </div>
                                    <Button onClick={() => navigate("/create")} variant="outline">
                                        <Brush /> Create from scratch
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Single file upload dialog */}
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                <DialogContent hideClose>
                    <div className="flex flex-col items-center justify-center p-4">
                        <img
                            src="/assets/Uploading_cloud.gif"
                        />
                        <div className="text-lg font-semibold mb-5">
                            Uploading your file...
                        </div>
                        <div className="w-full mt-2 h-2 bg-gray-200 rounded overflow-hidden relative">
                            <div className="absolute inset-0">
                                <div className="infinite-progress-bar h-full" />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Multiple files upload options dialog */}
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
        </div>
    )
}