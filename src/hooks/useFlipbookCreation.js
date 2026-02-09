import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
    GetR2UploadUrlApi,
    UploadToR2Url,
    CreateFlipbookFromR2Api,
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
        setProgressText("Starting upload...");

        try {
            // 1. Get Presigned URL
            const { url, key } = await GetR2UploadUrlApi(file.name, file.type);
            if (!url || !key) throw new Error("Failed to get upload URL");

            // 2. Upload to R2
            await UploadToR2Url(url, file, (progressEvent) => {
                const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgressPercent(percent);
                setProgressText(`Uploading: ${percent}%`);
            });

            setProgressText("We're working our magic... Optimizing your flipbook!");
            
            // 3. Create Flipbook
            const genRes = await CreateFlipbookFromR2Api({
                pdfKey: key,
                mode: FlipbookUploadMode.COMBINE,
                fileName: file.name
            });

            // Handle response
            const bookId = genRes?.book?._id || genRes?.data?.book?._id || genRes?.bookIds?.[0] || genRes?.data?.bookIds?.[0];
            
            if (bookId) {
                setProgressPercent(100);
                setProgressText("Flipbook created successfully 🎉");

                setTimeout(() => {
                    setUploadDialogOpen(false);
                    navigate(`/customize/${bookId}`);
                }, 1000);
            } else {
                // Fallback attempt
                const possibleId = genRes?._id || genRes?.id;
                if(possibleId) {
                     setUploadDialogOpen(false);
                     navigate(`/customize/${possibleId}`);
                } else {
                     toast.error("Flipbook creation failed: No ID returned");
                     setUploadDialogOpen(false);
                }
            }

        } catch (error) {
            console.error("Upload failed", error);
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

        // Initialize progress list
        setFileProgressList(
            pendingFiles.map((file) => ({
                name: file.name,
                percent: 0,
                status: "waiting",
            }))
        );

        try {
            // 1. Upload All Files to R2
            const uploadedKeys = await Promise.all(
                pendingFiles.map(async (file) => {
                    try {
                        // Update status to uploading
                        setFileProgressList(prev => prev.map(p => p.name === file.name ? { ...p, status: 'uploading' } : p));

                        const { url, key } = await GetR2UploadUrlApi(file.name, file.type);
                        if (!url || !key) throw new Error("No upload URL");

                        await UploadToR2Url(url, file, (progressEvent) => {
                             const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                             setFileProgressList(prev => prev.map(p => p.name === file.name ? { ...p, percent } : p));
                        });

                         setFileProgressList(prev => prev.map(p => p.name === file.name ? { ...p, percent: 100, status: 'done' } : p));
                         return key;
                    } catch (e) {
                         setFileProgressList(prev => prev.map(p => p.name === file.name ? { ...p, status: 'error' } : p));
                         throw e;
                    }
                })
            );

            setProgressText("Almost there! Generating your flipbooks...");

            // 2. Create Flipbooks
            // We'll try sending all keys with mode SEPARATELY
            const payload = {
                pdfKey: uploadedKeys, // Array of keys
                mode: FlipbookUploadMode.SEPARATELY,
                fileName: pendingFiles.map(f => f.name) // Send names array
            };

            const genRes = await CreateFlipbookFromR2Api(payload);
            const bookIds = genRes?.bookIds || genRes?.data?.bookIds || (genRes?.book?._id ? [genRes.book._id] : []);

            if (bookIds.length) {
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
