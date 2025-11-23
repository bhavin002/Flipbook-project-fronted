import { X, BookOpen } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

export default function TableOfContentsDrawer({ open, onClose, visibilitySettings, navigateToPage, containerHeight }) {

    const generateId = (chapter) => {
        return `${chapter.chapterName}-${chapter.pageNumber}-${chapter.sequence}`;
    };

    const tocWithIds = useMemo(() => {
        if (!visibilitySettings.tableOfContents) return [];
        return visibilitySettings.tableOfContents.map(section => ({
            ...section,
            _id: section._id || generateId(section),
            subChapters: section.subChapters?.map(sub => ({
                ...sub,
                _id: sub._id || generateId(sub)
            })) || []
        }));
    }, [visibilitySettings.tableOfContents]);

    const [selectedPage, setSelectedPage] = useState(null);

    useEffect(() => {
        if (!selectedPage) return;
        const exists = tocWithIds.some(section => section._id === selectedPage || section.subChapters.some(sub => sub._id === selectedPage));
        if (!exists) setSelectedPage(null);
    }, [tocWithIds, selectedPage]);

    const handlePageClick = (pageId, pageNumber) => {
        setSelectedPage(pageId);
        if (navigateToPage) {
            navigateToPage(pageNumber);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ maxHeight: containerHeight ? containerHeight - 32 : 'calc(100vh - 2rem)' }}
                    className="absolute top-4 left-4 w-80 bg-[#333333]/80 backdrop-blur-sm rounded-lg shadow-xl z-50 flex flex-col border border-white/10"
                >
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <div className="flex items-center space-x-2">
                            <BookOpen className="w-5 h-5 text-white" />
                            <span className="font-bold text-lg text-white">Table of Contents</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="h-8 w-8 text-white hover:bg-white/10 hover:text-white"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                    <ScrollArea className="w-full flex-grow overflow-y-auto custom-scrollbar">
                        <div className="p-2">
                            {(!tocWithIds || tocWithIds.length === 0) ? (
                                <div className="p-4 text-white/70 text-center">
                                    No table of contents available
                                </div>
                            ) : (
                                tocWithIds.map((section) => {
                                    const hasSubChapters = section.subChapters && section.subChapters.length > 0;
                                    return (
                                        <div key={section._id} className="mb-1">
                                            <div
                                                className={`group flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-all duration-200 ${selectedPage === section._id ? 'text-white bg-white/10' : 'hover:bg-white/10 text-white/90 hover:text-white'}`}
                                                onClick={() => handlePageClick(section._id, section.pageNumber)}
                                            >
                                                <span className="font-medium text-sm truncate pr-4">
                                                    {section.chapterName}
                                                </span>
                                                <span className="text-sm opacity-70 whitespace-nowrap">
                                                    {section.pageNumber}
                                                </span>
                                            </div>
                                            {hasSubChapters && (
                                                <div className="mt-1 space-y-1">
                                                    {section.subChapters.map((subChapter) => (
                                                        <div
                                                            key={subChapter._id}
                                                            className={`group flex items-center justify-between px-3 py-2 pl-8 rounded-md cursor-pointer transition-all duration-200 ${selectedPage === subChapter._id ? 'text-white bg-white/10' : 'hover:bg-white/10 text-white/80 hover:text-white'}`}
                                                            onClick={() => handlePageClick(subChapter._id, subChapter.pageNumber)}
                                                        >
                                                            <span className="text-sm truncate pr-4">
                                                                {subChapter.chapterName}
                                                            </span>
                                                            <span className="text-sm opacity-70 whitespace-nowrap">
                                                                {subChapter.pageNumber}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </ScrollArea>
                </motion.div>
            )}
        </AnimatePresence>
    );
}