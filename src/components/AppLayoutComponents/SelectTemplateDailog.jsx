import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { GetTemplatesByLayoutApi } from "@/service/template.service";
import { GetTemplateFieldsApi, GeneratePagesApi } from "@/service/productCatalog.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoadingOverlay } from "@/utils/Skeleton";
import LoadingButton from "@/utils/LoadingButton";
import { useFlipbook } from "@/context/FlipbookContext";

export default function SelectTemplateDialog({ open, onOpenChange, catalogId }) {
    const [isLoading, setIsLoading] = useState(false);
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [isContinueLoading, setIsContinueLoading] = useState(false);
    const [showFieldMapping, setShowFieldMapping] = useState(false);
    const [templateFieldsData, setTemplateFieldsData] = useState(null);
    const [selectedUniqueKey, setSelectedUniqueKey] = useState("");
    const [fieldMappings, setFieldMappings] = useState({});
    const [isGeneratingCatalog, setIsGeneratingCatalog] = useState(false);
    const { fetchFlipbooks } = useFlipbook();


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
        setShowFieldMapping(false);
        setTemplateFieldsData(null);
        setSelectedUniqueKey("");
        setFieldMappings({});
    };

    const handleBack = () => {
        setShowFieldMapping(false);
        setTemplateFieldsData(null);
        setSelectedUniqueKey("");
        setFieldMappings({});
    };

    const handleContinue = async () => {
        if (selectedTemplate) {
            try {
                setIsContinueLoading(true);
                const payload = {
                    flipbookTemplateId: selectedTemplate._id,
                    catalogId: catalogId
                };
                const response = await GetTemplateFieldsApi(payload);

                setTemplateFieldsData(response.data);
                setShowFieldMapping(true);


                if (response.data.uniqueKeys && response.data.uniqueKeys.length > 0) {
                    setSelectedUniqueKey(response.data.uniqueKeys[0]);
                }
            } catch (error) {
                toast.error("Failed to load template fields", {
                    description: error.message || "Oops! Something went wrong.",
                });
            } finally {
                setIsContinueLoading(false);
            }
        }
    };

    const handleFieldMappingChange = (fieldId, value) => {
        setFieldMappings(prev => ({
            ...prev,
            [fieldId]: value
        }));
    };

    const handleGenerateCatalog = async () => {
        try {
            setIsGeneratingCatalog(true);
            const mapFieldData = Object.entries(fieldMappings).map(([fieldId, fieldValue]) => ({
                fieldId,
                fieldValue
            }));
            const payload = {
                flipbookTemplateId: selectedTemplate._id,
                catalogId: catalogId,
                mapFieldData
            };
            await GeneratePagesApi(payload);
            fetchFlipbooks();
            onOpenChange(false);
        } catch (error) {
            toast.error("Failed to generate catalog", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsGeneratingCatalog(false);
        }
    };

    if (showFieldMapping && templateFieldsData) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[800px] w-[90vw] min-h-[500px]">
                    <DialogHeader>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleBack}
                                className="p-1 h-8 w-8"
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <DialogTitle>Map feed content</DialogTitle>
                        </div>
                    </DialogHeader>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                                🔄 Make your content updatable
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                We can update your catalog as your feed changes, just need something to identify your items.
                            </p>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Select unique ID</label>
                                <Select value={selectedUniqueKey} onValueChange={setSelectedUniqueKey}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Choose unique identifier" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {templateFieldsData.uniqueKeys?.map((key) => (
                                            <SelectItem key={key} value={key}>
                                                {key.toUpperCase()}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-gray-500">
                                    Choose the column with the items unique code.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="grid grid-cols-2 gap-8 border-b my-4">
                                <div>
                                    <h4 className="font-medium mb-3">Flipsnack option</h4>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-3">Your feed columns</h4>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {templateFieldsData.templateFieldNames?.map((field) => (
                                    <div key={field.fieldId} className="grid grid-cols-2 gap-8 items-center">
                                        <div className="text-sm font-medium">
                                            {field.fieldName}
                                        </div>
                                        <Select
                                            value={fieldMappings[field.fieldId] || ""}
                                            onValueChange={(value) => handleFieldMappingChange(field.fieldId, value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select column" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {templateFieldsData.keys?.map((key) => (
                                                    <SelectItem key={key} value={key}>
                                                        {key}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isGeneratingCatalog}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleGenerateCatalog}
                            disabled={isGeneratingCatalog}
                        >
                            {isGeneratingCatalog ? <LoadingButton /> : "Generate catalog"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[1040px] w-[90vw] min-h-[406px]">
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
                                                    e.target.src = '/placeholder-template.png';
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
                                        disabled={isContinueLoading}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleContinue}
                                        disabled={!selectedTemplate || isContinueLoading}
                                    >
                                        {isContinueLoading ? <LoadingButton /> : "Continue"}
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