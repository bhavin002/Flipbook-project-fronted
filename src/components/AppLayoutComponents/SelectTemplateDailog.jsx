import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GetTemplatesByLayoutApi } from "@/service/template.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoadingOverlay } from "@/utils/Skeleton";

export default function SelectTemplateDialog({ open, onOpenChange }) {
    const [isLoading, setIsLoading] = useState(false);
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    useEffect(() => {
        if (open) {
            const GetTemplates = async () => {
                try {
                    setIsLoading(true);
                    const response = await GetTemplatesByLayoutApi(816, 1056);

                    const templatesWithThumbnails = response.data.filter(template => template.thumbnail);
                    setTemplates(templatesWithThumbnails);

                    if (templatesWithThumbnails.length > 0) {
                        setSelectedTemplate(templatesWithThumbnails[0]);
                    }
                } catch (error) {
                    toast.error("Template fetch failed", {
                        description: error.message || "Oops! Something went wrong.",
                    });
                } finally {
                    setIsLoading(false);
                }
            }
            GetTemplates();
        }
    }, [open]);

    const handleCancel = () => {
        onOpenChange(false);
        setSelectedTemplate(null);
        setTemplates([]);
    };

    const handleContinue = () => {
        if (selectedTemplate) {
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[1040px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Select Template</DialogTitle>
                </DialogHeader>
                <div className="flex">
                    {isLoading ? (
                        <LoadingOverlay />
                    ) : (
                        <>
                            <div className="w-1/2">
                                <div className="grid grid-cols-2 gap-4">
                                    {templates.map((template) => (
                                        <div
                                            key={template._id}
                                            className={`cursor-pointer rounded-lg border overflow-hidden ${selectedTemplate?._id === template._id
                                                ? 'border-primary bg-primary/5'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            onClick={() => setSelectedTemplate(template)}
                                        >
                                            <div className={`relative`}>
                                                <img
                                                    src={template.thumbnail}
                                                    alt={`Template ${template._id}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 border-l mx-4 flex flex-col">
                                <div className="flex-1 flex items-center mx-4 justify-center rounded-lg">
                                    {selectedTemplate ? (
                                        <div className="text-center">
                                            <img
                                                src={selectedTemplate.thumbnail}
                                                alt={`Selected template ${selectedTemplate._id}`}
                                                className="max-h-80 max-w-full object-contain rounded-lg shadow-lg"
                                                onError={(e) => {
                                                    e.target.src = '/placeholder-template.png';  // fallback image
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-gray-500 text-center">
                                            <div className="text-lg mb-2">No template selected</div>
                                            <div className="text-sm">Select a template from the left panel</div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end gap-3 mt-6">
                                    <Button
                                        variant="outline"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleContinue}
                                        disabled={!selectedTemplate}
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}