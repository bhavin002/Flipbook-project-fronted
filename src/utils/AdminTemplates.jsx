import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, ShoppingBag, Newspaper, Type, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConfirmationDialog from "@/utils/ConfirmationDialog";
import { GetAllTemplates } from "@/service/template.service";
import { DeleteTemplateApi } from "@/service/template.service";
import { toast } from "sonner";
import { TemplateType } from '@/utils/enum';

export default function AdminTemplates() {
    const [isLoading, setIsLoading] = useState(false);
    const [templates, setTemplates] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const navigate = useNavigate();

    const getTypeLabel = (type) => {
        switch (parseInt(type)) {
            case TemplateType.PRODUCT: return "Product";
            case TemplateType.NORMAL: return "Normal";
            case TemplateType.TEXT: return "Text";
            default: return "Unknown";
        }
    };

    const getTypeIcon = (type) => {
        switch (parseInt(type)) {
            case TemplateType.PRODUCT: return <ShoppingBag className="h-4 w-4 text-gray-600" />;
            case TemplateType.NORMAL: return <Newspaper className="h-4 w-4 text-gray-600" />;
            case TemplateType.TEXT: return <Type className="h-4 w-4 text-gray-600" />;
            default: return <Newspaper className="h-4 w-4 text-gray-600" />;
        }
    };

    useEffect(() => {
        fetchAdminTemplates();
    }, []);

    const fetchAdminTemplates = async () => {
        setIsLoading(true);
        try {
            const response = await GetAllTemplates();
            setTemplates(response.data);
        } catch (error) {
            toast.error("Failed to fetch admin templates", {
                description: error.message || "Something went wrong"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (templateId) => {
        navigate(`/admin-editor/${templateId}`);
    };

    const handleDeleteClick = (template) => {
        setSelectedTemplate(template);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirmation = async (confirmed) => {
        if (confirmed && selectedTemplate) {
            setActionLoading(true);
            try {
                await DeleteTemplateApi(selectedTemplate._id);

                toast.success("Template deleted", {
                    description: "The admin template was successfully deleted"
                });

                setTemplates(prev => prev.filter(item => item._id !== selectedTemplate._id));
                setIsDeleteModalOpen(false);
                setSelectedTemplate(null);
            } catch (error) {
                toast.error("Failed to delete template", {
                    description: error.message || "Something went wrong",
                });
            } finally {
                setActionLoading(false);
            }
        } else {
            setIsDeleteModalOpen(false);
            setSelectedTemplate(null);
        }
    };

    const ListSkeleton = () => (
        <div className="bg-white rounded-md overflow-hidden border border-gray-200 animate-pulse">
            {/* Mobile & Tablet Skeleton */}
            <div className="block lg:hidden">
                <div className="flex items-start gap-0">
                    <div className="flex-shrink-0 w-28 h-32 bg-gray-200"></div>
                    <div className="flex-1 p-3 space-y-3">
                        <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                        <div className="mt-4 h-3 w-full bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>

            {/* Desktop Skeleton */}
            <div className="hidden lg:flex items-center gap-3 p-0 mr-2">
                <div className="flex-shrink-0 w-28 h-32 bg-gray-200"></div>
                <div className="flex-1 space-y-2 py-2">
                    <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
                    <div className="flex gap-2">
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </div>
                </div>
                <div className="flex items-center gap-2 pr-2">
                    <div className="h-8 w-20 bg-gray-200 rounded"></div>
                    <div className="h-8 w-20 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        return (
            <div className="md:p-6 p-3 max-w-[100vw] overflow-auto space-y-4 pt-0">
                <div className="space-y-3 sm:space-y-4">
                    {isLoading
                        ? [...Array(6)].map((_, index) => <ListSkeleton key={index} />)
                        : templates.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <p>No admin templates found</p>
                            </div>
                        ) : templates.map((template) => {
                            return (
                                <div
                                    key={template._id}
                                    className="bg-white rounded-md overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors"
                                >
                                    {/* Mobile & Tablet View */}
                                    <div className="block lg:hidden">
                                        <div className="flex items-start gap-0">
                                            <div className="flex-shrink-0 relative h-full bg-gray-50">
                                                <img
                                                    src={template.thumbnail || "/assets/book_thumbnail.jpg"}
                                                    alt="Template Cover"
                                                    className="w-28 h-32 object-contain"
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0 flex flex-col justify-between p-3 relative">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <div className="px-1.5 py-0.5 rounded border border-[#dac9ff] bg-[#f5f0ff] text-[#8e65ff] text-[9px] font-medium leading-none uppercase tracking-wider">
                                                            {template.categoryName}
                                                        </div>
                                                        <div className="flex items-center gap-1" title={getTypeLabel(template.type)}>
                                                            {getTypeIcon(template.type)}
                                                        </div>
                                                    </div>

                                                    <h3 title={`Template ${template._id}`} className="font-semibold text-gray-900 text-sm truncate pr-8">
                                                        {template.name}
                                                    </h3>

                                                    <div className="space-y-0.5">
                                                        <p className="text-xs text-gray-600 font-medium">
                                                            {template.noOfPages} {template.noOfPages === 1 ? 'page' : 'pages'}
                                                        </p>
                                                        <div className="flex items-center gap-1 text-gray-400">
                                                            <span className="text-[10px]">{template.width} x {template.height} px</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 mt-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEdit(template._id)}
                                                        className="flex-1"
                                                    >
                                                        <Pencil className="h-4 w-4 mr-1" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDeleteClick(template)}
                                                        className="flex-1 text-red-600 hover:text-red-700"
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-1" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Desktop View */}
                                    <div className="hidden lg:flex items-center gap-3 mr-2 p-2">
                                        <div className="flex-shrink-0 relative h-full bg-gray-50">
                                            <img
                                                src={template.thumbnail || "/assets/book_thumbnail.jpg"}
                                                alt="Template Cover"
                                                className="w-28 h-32 object-contain"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0 flex flex-col justify-center py-2">
                                            <div className="flex items-center gap-2.5 mb-1.5">
                                                <div className="px-2 py-0.5 rounded border border-[#dac9ff] bg-[#f5f0ff] text-[#8e65ff] text-[10px] font-semibold leading-none uppercase tracking-wider">
                                                    {template.categoryName}
                                                </div>
                                                <div className="flex items-center gap-1.5" title={getTypeLabel(template.type)}>
                                                    {getTypeIcon(template.type)}
                                                </div>
                                            </div>

                                            <h3 title={`Template ${template._id}`} className="font-bold text-gray-900 text-base truncate mb-1">
                                                {template.name}
                                            </h3>

                                            <div className="flex flex-col gap-0.5">
                                                <div className="text-sm text-gray-600 font-medium">
                                                    {template.noOfPages} {template.noOfPages === 1 ? 'page' : 'pages'}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-gray-400">
                                                    <span className="text-xs">
                                                        {template.width} x {template.height} px
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex ml-auto items-center gap-2 pr-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleEdit(template._id)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteClick(template)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    };

    return (
        <>
            {renderContent()}

            <ConfirmationDialog
                isConfirmModalOpen={isDeleteModalOpen}
                setIsConfirmModalOpen={setIsDeleteModalOpen}
                title="Delete Admin Template"
                description={`Are you sure you want to delete this admin template? This action cannot be undone.`}
                isLoading={actionLoading}
                onConfirm={() => handleDeleteConfirmation(true)}
                onCancel={() => handleDeleteConfirmation(false)}
            />
        </>
    );
}
