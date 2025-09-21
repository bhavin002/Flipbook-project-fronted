import { X, FileText, BookOpen } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export default function TableOfContentsDrawer({ open, onClose, visibilitySettings, navigateToPage }) {

    const [shouldDisablePointerEvents, setShouldDisablePointerEvents] = useState(!open);

    const accentColor = visibilitySettings.playerAccentColorHash || "#7c3aede6";

    useEffect(() => {
        let timeout;
        if (open) {
            setShouldDisablePointerEvents(false);
        } else {
            timeout = setTimeout(() => setShouldDisablePointerEvents(true), 300);
        }
        return () => clearTimeout(timeout);
    }, [open]);

    // Helper to generate a unique id
    const generateId = (chapter) => {
        return `${chapter.chapterName}-${chapter.pageNumber}-${chapter.sequence}`;
    };

    // Memoized tocData with _id fields
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

    // State for selected _id
    const [selectedPage, setSelectedPage] = useState(null);

    // Reset selectedPage if not present in new tocWithIds
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

    // Handle case where tocData might be undefined or empty
    if (!tocWithIds || tocWithIds.length === 0) {
        return (
            <div
                className={` h-full w-96 bg-background border-r border-border text-foreground z-50 transition-transform duration-150 ease-in-out shadow-2xl
                    ${open ? "block" : "hidden"}
                    ${shouldDisablePointerEvents ? "pointer-events-none" : "pointer-events-auto"}
                `}
            >
                <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
                    <div className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <span className="font-bold text-lg text-foreground">Table of Contents</span>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="h-8 w-8 hover:bg-muted"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
                <div className="p-4 text-muted-foreground">
                    No table of contents available
                </div>
            </div>
        );
    }

    return (
        <div
            className={`h-full flex flex-col bg-background border-border text-foreground transition-all duration-150 ease-in-out shadow-2xl
                ${shouldDisablePointerEvents ? "pointer-events-none" : "pointer-events-auto"}
                ${open ? "w-96" : "w-0 overflow-hidden"}
            `}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
                <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className="font-bold text-lg text-foreground">Table of Contents</span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-8 w-8 hover:bg-muted"
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>

            {/* Content */}
            <ScrollArea className="w-full flex-grow h-0 overflow-y-auto">
                <div className="p-2">
                    {tocWithIds.map((section) => (
                        <div key={section._id} className="mb-2">
                            {/* Main Section */}
                            <div
                                className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                    selectedPage === section._id
                                        ? 'text-primary-foreground shadow-lg'
                                        : 'bg-card hover:text-primary-foreground hover:shadow-md'
                                }`}
                                style={{
                                    backgroundColor: selectedPage === section._id ? accentColor : undefined
                                }}
                                onMouseEnter={(e) => {
                                    if (selectedPage !== section._id) {
                                        e.currentTarget.style.backgroundColor = accentColor;
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (selectedPage !== section._id) {
                                        e.currentTarget.style.backgroundColor = '';
                                    }
                                }}
                                onClick={() => handlePageClick(section._id, section.pageNumber)}
                            >
                                <div className="flex items-center space-x-3 flex-1">
                                    <FileText className={`w-4 h-4 transition-colors ${selectedPage === section._id
                                            ? 'text-primary-foreground'
                                            : 'text-muted-foreground group-hover:text-primary-foreground'
                                        }`} />
                                    <div className="flex flex-col">
                                        <span className={`font-medium text-sm transition-colors ${selectedPage === section._id
                                                ? 'text-primary-foreground'
                                                : 'text-foreground group-hover:text-primary-foreground'
                                            }`}>
                                            {section.chapterName}
                                        </span>
                                        <span className={`text-xs transition-colors ${selectedPage === section._id
                                                ? 'text-primary-foreground/70'
                                                : 'text-muted-foreground group-hover:text-primary-foreground/80'
                                            }`}>
                                            Page {section.pageNumber}
                                        </span>
                                    </div>
                                </div>
                                <Badge
                                    variant={selectedPage === section._id ? "secondary" : "outline"}
                                    className={`text-xs transition-colors ${selectedPage === section._id
                                            ? ''
                                            : 'group-hover:bg-primary-foreground'
                                        }`}
                                >
                                    {section.pageNumber}
                                </Badge>
                            </div>

                            {/* Sub Chapters */}
                            {section.subChapters && section.subChapters.length > 0 && (
                                <div className="ml-4 mt-1 space-y-1">
                                    {section.subChapters.map((subChapter) => (
                                        <div
                                            key={subChapter._id}
                                            className={`group flex items-center justify-between p-2 rounded-md cursor-pointer transition-all duration-200 ${
                                                selectedPage === subChapter._id
                                                    ? 'text-primary-foreground shadow-md'
                                                    : 'bg-muted/50 hover:text-primary-foreground hover:shadow-sm'
                                            }`}
                                            style={{
                                                backgroundColor: selectedPage === subChapter._id ? accentColor : undefined
                                            }}
                                            onMouseEnter={(e) => {
                                                if (selectedPage !== subChapter._id) {
                                                    e.currentTarget.style.backgroundColor = accentColor;
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (selectedPage !== subChapter._id) {
                                                    e.currentTarget.style.backgroundColor = '';
                                                }
                                            }}
                                            onClick={() => handlePageClick(subChapter._id, subChapter.pageNumber)}
                                        >
                                            <div className="flex items-center space-x-2 flex-1">
                                                <div className={`w-2 h-2 rounded-full transition-colors ${selectedPage === subChapter._id
                                                        ? 'bg-primary-foreground'
                                                        : 'bg-muted-foreground group-hover:bg-primary-foreground'
                                                    }`}></div>
                                                <div className="flex flex-col">
                                                    <span className={`text-sm transition-colors ${selectedPage === subChapter._id
                                                            ? 'text-primary-foreground'
                                                            : 'text-foreground group-hover:text-primary-foreground'
                                                        }`}>
                                                        {subChapter.chapterName}
                                                    </span>
                                                </div>
                                            </div>
                                            <Badge
                                                variant={selectedPage === subChapter._id ? "secondary" : "outline"}
                                                className={`text-xs transition-colors ${selectedPage === subChapter._id
                                                        ? ''
                                                        : 'group-hover:bg-primary-foreground'
                                                    }`}
                                            >
                                                {subChapter.pageNumber}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}