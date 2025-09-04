import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from "@/components/ui/skeleton";
import ConfirmationDialog from "@/utils/ConfirmationDialog";
import { GetPageByIndexApi, GetTemplateApi } from "@/service/template.service";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";

const TemplateDetailView = ({ templateId, template, onBackClick, loading, stageWidth, stageHeight, mainStage, selectedIndex, setMainStage }) => {
    const [hoveredPageIndex, setHoveredPageIndex] = useState(null);
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const [isPageModalOpen, setIsPageModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPageIndex, setSelectedPageIndex] = useState(null);

    const onDragPage = async (pageIndex) => {
        const pageData = {
            templateId,
            pageIndex,
            type: "drag-page",
        }
        mainStage[selectedIndex].dragRect.current = pageData;
    }

    const handlePageClick = (pageIndex) => {
        setSelectedPageIndex(pageIndex);
        setIsPageModalOpen(true);
    }

    const handleUseAllPages = () => {
        setIsTemplateModalOpen(true);
    }

    const handleApplyPage = async () => {
        try {
            setIsLoading(true);
            const response = await GetPageByIndexApi(templateId, selectedPageIndex);
            const newStageData = JSON.parse(response.data.pageData);
            newStageData.shapes.forEach(shape => {
                shape.id = uuid();
            });
            mainStage.splice(selectedIndex, 1, newStageData);
            setMainStage([...mainStage]);
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
            setIsPageModalOpen(false);
            setSelectedPageIndex(null);
        }
    }

    const handleApplyTemplate = async () => {
        try {
            setIsLoading(true);
            const response = await GetTemplateApi(templateId, false);
            const validPageData = response.data.pages;
            const newStageData = validPageData.map(e => JSON.parse(e.pageData));
            mainStage.forEach(e => {
                e.shapes = e.stageref && e.stageref.current ? e.stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) : e.shapes;
            })
            newStageData.forEach(e => {
                e.shapes.forEach(shape => {
                    shape.id = uuid();
                })
            })
            mainStage.splice(selectedIndex, 1, ...newStageData);
            setMainStage([...mainStage]);
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
            setIsTemplateModalOpen(false);
        }
    }

    return (
        <div className="px-6 pt-6 pb-2 space-y-4 flex flex-col h-[100vh]">
            <div className="flex justify-between items-center gap-2">
                <Button
                    variant="outline"
                    className="text-primary"
                    onClick={onBackClick}
                >
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <Button
                    className="w-full"
                    disabled={loading}
                    onClick={handleUseAllPages}
                >
                    Use all {template?.thumbnail?.length || 0} pages
                </Button>
            </div>
            <div className="h-0 overflow-y-auto flex-grow">
                <div className="grid grid-cols-2 gap-4">
                    {loading ? (
                        [...Array(4)].map((_, index) => (
                            <div key={index} className="relative rounded-lg overflow-hidden">
                                <div className={`relative aspect-[${stageWidth}/${stageHeight}]`}>
                                    <Skeleton className="w-full h-full" />
                                </div>
                            </div>
                        ))
                    ) : (
                        template?.thumbnail?.map((page, index) => (
                            <div
                                key={page._id}
                                className="relative cursor-pointer rounded-lg overflow-hidden"
                                onMouseEnter={() => setHoveredPageIndex(index)}
                                onMouseLeave={() => setHoveredPageIndex(null)}
                                onClick={() => handlePageClick(index)}
                            >
                                <div className={`relative aspect-[${stageWidth}/${stageHeight}]`}>
                                    <img
                                        src={page.url}
                                        alt={`Page ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        draggable
                                        onDragStart={() => onDragPage(index)}
                                    />
                                    {hoveredPageIndex === index && (
                                        <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded-md">
                                            Page {index + 1}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Template Confirmation Dialog */}
            <ConfirmationDialog
                isConfirmModalOpen={isTemplateModalOpen}
                setIsConfirmModalOpen={setIsTemplateModalOpen}
                title="Apply Template"
                description="Applying a template will replace the content on the current page and will add new pages if needed. Other pages won't be changed."
                isLoading={isLoading}
                onConfirm={handleApplyTemplate}
                onCancel={() => setIsTemplateModalOpen(false)}
            />

            {/* Page Confirmation Dialog */}
            <ConfirmationDialog
                isConfirmModalOpen={isPageModalOpen}
                setIsConfirmModalOpen={setIsPageModalOpen}
                title="Apply Page"
                description="Applying a page will replace the content on the current page. Other pages won't be changed."
                isLoading={isLoading}
                onConfirm={handleApplyPage}
                onCancel={() => {
                    setIsPageModalOpen(false);
                    setSelectedPageIndex(null);
                }}
            />
        </div>
    );
};

export default TemplateDetailView;