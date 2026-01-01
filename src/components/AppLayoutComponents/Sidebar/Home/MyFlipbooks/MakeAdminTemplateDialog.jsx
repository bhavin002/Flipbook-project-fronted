import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MakeAdminTemplateApi } from "@/service/flipbook.service";
import { GetAllTemplateCategories } from "@/service/template.service";
import LoadingButton from "@/utils/LoadingButton";

export default function MakeAdminTemplateDialog({
    isMakeAdminTemplateModalOpen,
    setIsMakeAdminTemplateModalOpen,
    flipbook,
}) {
    const [templateName, setTemplateName] = useState("");
    const [templateType, setTemplateType] = useState("2");
    const [templateCategory, setTemplateCategory] = useState("");
    const [templateCategories, setTemplateCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchTemplateCategories = async () => {
            try {
                const response = await GetAllTemplateCategories();
                setTemplateCategories(response.data);
                // Set first category as default if available
                if (response.data.length > 0) {
                    setTemplateCategory(response.data[0]._id);
                }
            } catch (error) {
                toast.error("Error fetching template categories", {
                    description: error.message || "Something went wrong"
                });
            }
        };

        if (isMakeAdminTemplateModalOpen) {
            fetchTemplateCategories();
            // Set flipbook name as default template name
            if (flipbook?.name) {
                setTemplateName(flipbook.name);
            }
        }
    }, [isMakeAdminTemplateModalOpen, flipbook]);

    const handleMakeAdminTemplate = async () => {
        if (!templateName.trim()) {
            toast.error("Please enter a template name");
            return;
        }

        if (!templateType) {
            toast.error("Please select a template type");
            return;
        }

        if (!templateCategory) {
            toast.error("Please select a category");
            return;
        }

        setIsLoading(true);
        try {
            const payload = {
                type: parseInt(templateType),
                categoryId: templateCategory,
                flipbookId: flipbook._id,
                name: templateName.trim()
            };

            const response = await MakeAdminTemplateApi(payload);

            toast.success("Admin template created", {
                description: response.message || "The flipbook was successfully saved as an admin template"
            });

            handleClose();
        } catch (error) {
            toast.error("Failed to create admin template", {
                description: error.message || "Oops! Something went wrong."
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setTemplateName("");
        setTemplateType("2");
        setTemplateCategory("");
        setIsMakeAdminTemplateModalOpen(false);
    };

    return (
        <Dialog open={isMakeAdminTemplateModalOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Make Admin Template</DialogTitle>
                    <DialogDescription className="sr-only">
                        Convert this flipbook into an admin template
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="template-name">Template Name</Label>
                        <Input
                            id="template-name"
                            placeholder="Enter template name"
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="template-type">Template Type</Label>
                        <Select value={templateType} onValueChange={setTemplateType}>
                            <SelectTrigger id="template-type">
                                <SelectValue placeholder="Select template type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Product Template</SelectItem>
                                <SelectItem value="2">Normal Template</SelectItem>
                                <SelectItem value="3">Text Template</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="template-category">Category</Label>
                        <Select value={templateCategory} onValueChange={setTemplateCategory}>
                            <SelectTrigger id="template-category">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {templateCategories.map((category) => (
                                    <SelectItem key={category._id} value={category._id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleMakeAdminTemplate}
                        disabled={isLoading || !templateName.trim() || !templateType || !templateCategory}
                    >
                        {isLoading ? (
                            <LoadingButton />
                        ) : (
                            "Save"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
