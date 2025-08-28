import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TemplateDetailView from "./TemplateDetailView";
import { GetAllTemplateCategories, GetTemplatesByLayoutApi, GetThumbnailApi } from "@/service/template.service";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { TemplateType } from "@/utils/enum";

export default function TemplateSidebarPanel({ mainStage, stageWidth, stageHeight, selectedIndex, setMainStage }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [hoveredId, setHoveredId] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [templateCategories, setTemplateCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all-templates");
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [loadingTemplates, setLoadingTemplates] = useState(false);
    const [loadingThumbnail, setLoadingThumbnail] = useState(false);

    useEffect(() => {
        const fetchTemplateCategories = async () => {
            try {
                setLoadingCategories(true);
                const response = await GetAllTemplateCategories();
                const categoriesWithAll = [
                    { _id: "all-templates", name: "All Templates" },
                    ...response.data
                ];
                setTemplateCategories(categoriesWithAll);
            } catch (error) {
                toast.error("Error fetching template categories", {
                    description: error.message || "Something went wrong"
                });
            } finally {
                setLoadingCategories(false);
            }
        };
        fetchTemplateCategories();
    }, []);

    // Fetch templates when component mounts or category changes
    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                setLoadingTemplates(true);
                const data = {
                    width: stageWidth,
                    height: stageHeight,
                    type: TemplateType.NORMAL
                };

                // Add category filter if not "all-templates"
                if (selectedCategory !== "all-templates") {
                    data.category = selectedCategory;
                }

                const response = await GetTemplatesByLayoutApi(data);
                const templatesWithThumbnails = response.data.filter(template => template.thumbnail);
                setTemplates(templatesWithThumbnails);
            } catch (error) {
                toast.error("Error fetching templates", {
                    description: error.message || "Something went wrong"
                });
            } finally {
                setLoadingTemplates(false);
            }
        };
        fetchTemplates();
    }, [selectedCategory]);

    const handleTemplateClick = async (template) => {
        try {
            setLoadingThumbnail(true);
            const response = await GetThumbnailApi(template._id);
            setSelectedTemplate({
                ...template,
                thumbnail: response.data.thumbnail
            });
        } catch (error) {
            toast.error("Error fetching template details", {
                description: error.message || "Something went wrong"
            });
        } finally {
            setLoadingThumbnail(false);
        }
    };

    const handleBackClick = () => {
        setSelectedTemplate(null);
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    if (selectedTemplate || loadingThumbnail) {
        return (
            <TemplateDetailView
                templateId={selectedTemplate?._id}
                template={selectedTemplate}
                onBackClick={handleBackClick}
                loading={loadingThumbnail}
                stageWidth={stageWidth}
                stageHeight={stageHeight}
                mainStage={mainStage}
                selectedIndex={selectedIndex}
                setMainStage={setMainStage}
            />
        );
    }

    const onDragTemplate = async (templateId) => {
        const templateData = {
            templateId,
            type: "drag-template",
        }
        mainStage[selectedIndex].dragRect.current = templateData;
    }

    return (
        <div className="px-6 pt-6 pb-2 space-y-4 flex flex-col h-[100vh]">
            {/* <div className="relative">
                <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                    <Search className="h-4 w-4" />
                </div>
                <Input
                    id="search"
                    autoComplete="off"
                    type="search"
                    placeholder="Search by name"
                    className="w-full rounded-lg bg-background text-black pl-8"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                />
            </div> */}

            {loadingCategories ? (
                <Skeleton className="w-full h-10 rounded-md" />
            ) : (
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger id="template" className="w-full">
                        <SelectValue placeholder="Select template category" />
                    </SelectTrigger>
                    <SelectContent>
                        {templateCategories.map(category => (
                            <SelectItem key={category._id} value={category._id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}

            <div className="h-0 overflow-y-auto flex-grow">
                {loadingTemplates ? (
                    <div className="grid grid-cols-2 gap-4">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="relative rounded-lg overflow-hidden">
                                <Skeleton className="w-full h-32 rounded-lg" />
                            </div>
                        ))}
                    </div>
                ) : templates.length === 0 ? (
                    <div className="flex items-center justify-center h-32 text-white    ">
                        No templates found for this category
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {templates.map((template) => (
                            <div
                                key={template._id}
                                className="relative cursor-pointer rounded-lg overflow-hidden"
                                onMouseEnter={() => setHoveredId(template._id)}
                                onMouseLeave={() => setHoveredId(null)}
                                onClick={() => handleTemplateClick(template)}
                            >
                                <div className={`relative aspect-[${stageWidth}/${stageHeight}]`}>
                                    <img
                                        src={template.thumbnail}
                                        alt={`Template ${template._id}`}
                                        className="w-full h-full object-cover"
                                        draggable
                                        onDragStart={() => onDragTemplate(template._id)}
                                    />

                                    {hoveredId === template._id && (
                                        <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded-md">
                                            {template.noOfPages} pages
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}