import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Upload } from "lucide-react";
import { UploadBrandLogoApi, GetBrandLogosApi, DeleteBrandLogoApi } from "@/service/brandLogo.service";
import ConfirmationDialog from "@/utils/ConfirmationDialog";
import LoadingButton from "@/utils/LoadingButton";
import { toast } from 'sonner';

export default function BrandingLogos() {
    const [logos, setLogos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [logoToDelete, setLogoToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchLogos();
    }, []);

    const fetchLogos = async () => {
        try {
            setIsLoading(true);
            const response = await GetBrandLogosApi();
            setLogos(response.data.map(logo => ({
                id: logo._id,
                src: logo.url,
                alt: `Logo ${logo._id}`,
                type: logo.fileType
            })));
        } catch (error) {
            toast.error("Error fetching logos", {
                description: error.message || "Oops! Something went wrong."
            })
            console.error("Error fetching logos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (event) => {
        const files = event.target.files;
        if (!files.length) return;

        try {
            setIsUploading(true);
            const formData = new FormData();
            Array.from(files).forEach(file => {
                formData.append('files', file);
            });

            const response = await UploadBrandLogoApi(formData);
            const newLogos = response.data.map(logo => ({
                id: logo._id,
                src: logo.url,
                alt: `Logo ${logo._id}`,
                type: logo.fileType
            }));
            setLogos(prevLogos => [...prevLogos, ...newLogos]);
        } catch (error) {
            toast.error("Logo upload failed", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleDelete = async () => {
        if (!logoToDelete) return;

        try {
            setIsDeleting(true);
            const response = await DeleteBrandLogoApi(logoToDelete.id);
            if (response.data === 401) {
                toast.error("Brandlogo deletion failed", {
                    description: response.message,
                });
                return;
            }

            setLogos(logos.filter(logo => logo.id !== logoToDelete.id));
            setLogoToDelete(null);
        } catch (error) {
            toast.error("Logo deletion failed", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsDeleting(false);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <div className="p-6 max-w-[100vw] overflow-auto space-y-4 pt-0 flex-1 flex flex-col max-md:max-h-[calc(100vh-156px-80px)]">
                <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                    <h1 className="text-2xl font-bold mb-2">Brand Logos</h1>
                    <p className="text-gray-500">Manage your logos, images and visual brand assets</p>
                </div>

                <div className="mb-6">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        multiple
                        accept="image/*"
                        className="hidden"
                    />
                    <Button onClick={handleUploadClick} disabled={isUploading}>
                        {isUploading ? <LoadingButton /> : (
                            <>
                                <Upload size={16} />
                                Upload brand logo
                            </>
                        )}
                    </Button>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Card key={index} className="animate-pulse bg-gray-200 h-32 rounded-lg" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                        {logos.map((logo) => (
                            <LogoCard
                                key={logo.id}
                                logo={logo}
                                onDelete={() => setLogoToDelete(logo)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <ConfirmationDialog
                isConfirmModalOpen={!!logoToDelete}
                setIsConfirmModalOpen={() => setLogoToDelete(null)}
                title="Delete Logo"
                description="Are you sure you want to delete this logo? This action cannot be undone."
                onConfirm={handleDelete}
                isLoading={isDeleting}
            />
        </>
    );
}

function LogoCard({ logo, onDelete }) {
    const preventDrag = (e) => {
        e.preventDefault();
        return false;
    };

    return (
        <Card className="relative overflow-hidden aspect-square border border-gray-200 rounded-lg shadow-sm hover:shadow transition-all">
            <div
                className="absolute inset-0 bg-center bg-repeat"
                style={{ backgroundImage: 'url(https://cdn.flipsnack.com/site/images/transparent-bg-pattern.png)' }}
            />

            <img
                src={logo.src}
                alt={logo.alt}
                className="w-full h-full object-contain p-2 relative z-10 select-none"
                draggable="false"
                onDragStart={preventDrag}
            />

            <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 text-gray-500 bg-gray-200 hover:text-red-600 z-20 p-1 h-6 w-6 rounded-full"
                onClick={() => onDelete(logo)}
            >
                <Trash2 size={14} />
            </Button>
        </Card>
    );
}