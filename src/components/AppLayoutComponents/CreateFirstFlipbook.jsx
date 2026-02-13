import { Button } from "@/components/ui/button";
import { Brush, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileDropDownCom from "./ProfileDropDownCom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoadingButton from "@/utils/LoadingButton";
import { useFlipbookCreation } from "@/hooks/useFlipbookCreation";

export default function CreateFirstFlipbook() {
    const navigate = useNavigate();

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

    return (
        <div className="flex flex-col min-h-screen">
            <header className="fixed top-0 left-0 right-0 z-10 bg-white">
                <div className="flex h-16 w-full justify-between shrink-0 items-center px-3 md:px-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div
                            className="relative flex items-center cursor-pointer"
                            onClick={() => navigate("/myflipbooks/flipbooks")}
                        >
                            <img src="/assets/logo.png" width={200} className="my-2" alt="Logo" />
                            {/* <span className="absolute -right-6 top-3 bg-purple-600 text-white text-[9px] font-bold px-1.5 py-[1px] rounded cursor-default">
                                BETA
                            </span> */}
                        </div>
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
                                            onClick={triggerFileInput}
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
                                        onChange={handleFileChange}
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
        </div>
    )
}