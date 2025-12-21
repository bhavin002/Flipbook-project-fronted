import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
    UploadFilesNewApi,
    GenerateFlipbookApi,
    subscribeToUploadProgress,
} from "@/service/flipbook.service";
import { useFileUpload } from "@/context/FileUploadContext";
import { useFlipbook } from "@/context/FlipbookContext";
import { FlipbookUploadMode } from "@/utils/enum";

export const useFlipbookCreation = () => {
    const navigate = useNavigate();
    const { fetchFlipbooks } = useFlipbook();
    const { setFiles } = useFileUpload();
    
    // State
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [multiFileDialogOpen, setMultiFileDialogOpen] = useState(false);
    const [pendingFiles, setPendingFiles] = useState([]);
    const [uploadingSeparately, setUploadingSeparately] = useState(false);
    const [progressPercent, setProgressPercent] = useState(0);
    const [progressText, setProgressText] = useState("");
    const [fileProgressList, setFileProgressList] = useState([]);
    
    const fileInputRef = useRef(null);
    const eventSourceRef = useRef(null);

    const resetUpload = () => {
        if (eventSourceRef.current) eventSourceRef.current.close();
        setProgressPercent(0);
        setProgressText("");
        setFileProgressList([]);
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
            formData.append("mode", FlipbookUploadMode.COMBINE);

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
                        try {
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
                        } catch (err) {
                            toast.error("Flipbook creation failed", { description: err.message });
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

    const handleUploadSeparately = async () => {
        setMultiFileDialogOpen(false);
        setUploadingSeparately(true);
        setUploadDialogOpen(true);
        resetUpload();

        try {
            const formData = new FormData();
            pendingFiles.forEach((file) => formData.append("files", file));
            formData.append("mode", FlipbookUploadMode.SEPARATELY);

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

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
            fileInputRef.current.click();
        }
    };

    return {
        // State
        uploadDialogOpen,
        setUploadDialogOpen,
        multiFileDialogOpen,
        setMultiFileDialogOpen,
        pendingFiles,
        uploadingSeparately,
        progressPercent,
        progressText,
        fileProgressList,
        
        // Refs
        fileInputRef,
        
        // Handlers
        handleFileChange,
        handleUploadSeparately,
        handleMergeIntoOne,
        triggerFileInput
    };
};
