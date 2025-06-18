import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import PageContentRenderer from './PageContentRenderer';

const PageOverviewModal = ({ isOpen, onClose, pageContent, visibilitySettings, myRef, pageType, divWidth, divHeight, width, height }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                {pageContent.map((page, index) => (

                    <div
                        style={{
                            transformOrigin: "left top",
                            transform: `scale(${width / (pageType === "double" ? divWidth * 2 : divWidth)}, ${height / divHeight})`,
                            width: `${pageType === "double" ? divWidth : divWidth}px`,
                            height: `${divHeight}px`,
                            backgroundColor: page?.background || "white",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        {page.pageData.map((data, idx) => (
                            <PageContentRenderer
                                key={idx}
                                data={data}
                                index={idx}
                                visibilitySettings={visibilitySettings}
                                flipbookRef={myRef}
                            />
                        ))}
                    </div>
                ))}
            </DialogContent>
        </Dialog>
    );
};

export default PageOverviewModal;