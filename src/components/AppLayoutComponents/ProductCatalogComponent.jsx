import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload as UploadIcon } from 'lucide-react';
import { useRef, useState } from "react";
import { UploadCsvApi } from "@/service/productCatalog.service";
import { toast } from "sonner";
import SelectTemplateDialog from "./SelectTemplateDailog";

export default function ProductCatalog({ open, onOpenChange }) {
    const csvInputRef = useRef(null);
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
    const [catalogId, setCatalogId] = useState(null);
    console.log("catalogId ??>?>",catalogId)

    const handleUploadCsvClick = () => {
        if (csvInputRef.current) {
            csvInputRef.current.value = null;
            csvInputRef.current.click();
        }
    };

    const validateAndProcessFile = async (file) => {
        if (!file) return;

        if (file.type !== "text/csv" && !file.name.endsWith('.csv')) {
            toast.error("Invalid file type", {
                description: "Please select only CSV files."
            });
            return;
        }

        onOpenChange(false);
        setUploadDialogOpen(true);
        
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await UploadCsvApi(formData);
            console.log("Upload response:", response);
            setCatalogId(response.data.id);
            setOpenTemplateDialog(true);
        } catch (error) {
            toast.error("Upload failed", {
                description: error.message || "Failed to upload CSV file. Please try again."
            });
        } finally {
            setUploadDialogOpen(false);
        }
    };

    const handleCsvFileChange = async (event) => {
        const file = event.target.files[0];
        await validateAndProcessFile(file);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            await validateAndProcessFile(files[0]);
        }
    };

    const handleDownloadTemplate = () => {
        try {
            const link = document.createElement('a');
            link.href = '/catalog.csv';
            link.download = 'catalog-template.csv';
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            toast.error("Failed to download template", {
                description: error.message || "Oops! Something went wrong."
            });
        }
    };

    const handleTryDemo = async () => {
        onOpenChange(false);
        setUploadDialogOpen(true);
        
        try {
            const csvRes = await fetch('/catalog.csv');
            if (!csvRes.ok) {
                throw new Error('Failed to fetch demo CSV file');
            }
            
            const blob = await csvRes.blob();
            const file = new File([blob], 'catalog.csv', { type: 'text/csv' });
            
            const formData = new FormData();
            formData.append('file', file);
            const response = await UploadCsvApi(formData);
            console.log("Demo upload response:", response);
            setCatalogId(response.data.id);
            setOpenTemplateDialog(true);
            
        } catch (error) {
            console.error("Demo CSV upload error:", error);
            toast.error("Demo upload failed", {
                description: error.message || "Failed to upload demo CSV file. Please try again."
            });
        } finally {
            setUploadDialogOpen(false);
        }
    };

    return (
        <>
            <input
                type="file"
                accept=".csv"
                ref={csvInputRef}
                style={{ display: "none" }}
                onChange={handleCsvFileChange}
            />

            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                <DialogContent hideClose>
                    <div className="flex flex-col items-center justify-center p-4">
                        <img
                            src="/src/assets/Uploading_cloud.gif"
                        />
                        <div className="text-lg font-semibold mb-5">
                            Extracting data from CSV...
                        </div>
                        <div className="w-full mt-2 h-2 bg-gray-200 rounded overflow-hidden relative">
                            <div className="absolute inset-0">
                                <div className="infinite-progress-bar h-full" />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <DialogTitle>Import product feed</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        <div
                            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                                isDragOver 
                                    ? 'border-primary bg-primary/10' 
                                    : 'border-gray-200 hover:border-primary bg-gray-50'
                            }`}
                            onClick={handleUploadCsvClick}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center space-y-4">
                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                                    <UploadIcon className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <div className="text-md font-medium text-gray-900">Upload CSV</div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        Click to browse or drag and drop
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={handleDownloadTemplate}
                            >
                                Download template
                            </Button>
                            <Button
                                onClick={handleTryDemo}
                            >
                                Try demo
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <SelectTemplateDialog open={openTemplateDialog} onOpenChange={setOpenTemplateDialog} />
        </>

    )
}