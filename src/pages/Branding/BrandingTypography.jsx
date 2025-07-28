import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import TextPreview from '../../components/AppLayoutComponents/Sidebar/Branding/TextEditor/TextPreview'
import FontControls from '../../components/AppLayoutComponents/Sidebar/Branding/TextEditor/FontControls'
import StyleControls from '../../components/AppLayoutComponents/Sidebar/Branding/TextEditor/StyleControls'
import TextCaseControl from '../../components/AppLayoutComponents/Sidebar/Branding/TextEditor/TextCaseControl'
import ColorControl from '../../components/AppLayoutComponents/Sidebar/Branding/TextEditor/ColorControl'
import AlignmentControl from '../../components/AppLayoutComponents/Sidebar/Branding/TextEditor/AlignmentControl'
import TextWrapControl from '../../components/AppLayoutComponents/Sidebar/Branding/TextEditor/TextWrapControl'
import SpacingControl from '../../components/AppLayoutComponents/Sidebar/Branding/TextEditor/SpacingControl'
import { GetWorkspaceFontsApi, UpdateWorkspaceFontsApi } from '@/service/font.service';
import { toast } from 'sonner';
import { FontCardSkeleton } from '@/utils/Skeleton';

export default function BrandingTypography() {
    const [editors, setEditors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const debounceTimers = useRef({});

    useEffect(() => {
        const getWorkspaceFonts = async () => {
            try {
                setIsLoading(true);
                const response = await GetWorkspaceFontsApi();
                setEditors(response.data);
            } catch (error) {
                toast.error("Failed to fetch workspace fonts", {
                    description: error.message || "Oops! Something went wrong.",
                });
            } finally {
                setIsLoading(false);
            }
        }
        getWorkspaceFonts();
    }, []);

    const shouldDebounce = (updates) => {
        const debouncedFields = ['fontSize', 'spacing', 'letterSpacing', 'lineHeight', 'textColor'];
        return Object.keys(updates).some(key => debouncedFields.includes(key));
    };

    const makeApiCall = useCallback(async (editorId, updates) => {
        const { previousState, ...payload } = updates;

        try {
            const fontId = editorId;
            await UpdateWorkspaceFontsApi(fontId, payload);
        } catch (error) {
            toast.error("Failed to update font", {
                description: error.message || "Oops! Something went wrong.",
            });
        }
    }, []);

    const updateEditorConfig = (editorId, updates) => {
        const currentEditor = editors.find(editor => editor.id === editorId || editor._id === editorId);
        if (!currentEditor) return;

        setEditors(prevEditors =>
            prevEditors.map(editor => {
                const id = editor._id || editor.id;
                if (id === editorId) {
                    return { ...editor, ...updates };
                }
                return editor;
            })
        );

        if (debounceTimers.current[editorId]) {
            clearTimeout(debounceTimers.current[editorId]);
        }

        const isDebounced = shouldDebounce(updates);
        const delay = isDebounced ? 500 : 0;

        debounceTimers.current[editorId] = setTimeout(() => {
            const finalUpdates = updates;
            makeApiCall(editorId, finalUpdates);
        }, delay);
    };

    return (
        <div className="flex flex-col max-w-full p-6 space-y-2 pt-0">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Typography</h1>
                <p className="text-gray-500">Set custom default text styles for easy access when you design publications</p>
            </div>

            {isLoading ? (
                <>
                    <FontCardSkeleton />
                    <FontCardSkeleton />
                    <FontCardSkeleton />
                    <FontCardSkeleton />
                </>
            ) : (
                editors.map((editor) => {
                    const editorId = editor._id || editor.id;

                    return (
                        <Card key={editorId} className="p-4 overflow-hidden mb-4 shadow-sm rounded-lg relative">

                            <div className="text-sm text-gray-500 mb-2">{editor.name}</div>

                            <CardContent className="p-0 mb-2">
                                <TextPreview config={editor} />
                            </CardContent>

                            <div className="flex flex-wrap items-center gap-2 border-t pt-4">
                                <FontControls
                                    config={editor}
                                    updateConfig={(updates) => updateEditorConfig(editorId, updates)}
                                />

                                <StyleControls
                                    config={editor}
                                    updateConfig={(updates) => updateEditorConfig(editorId, updates)}
                                />

                                <TextCaseControl
                                    config={editor}
                                    updateConfig={(updates) => updateEditorConfig(editorId, updates)}
                                />

                                <ColorControl
                                    config={editor}
                                    updateConfig={(updates) => updateEditorConfig(editorId, updates)}
                                />

                                <AlignmentControl
                                    config={editor}
                                    updateConfig={(updates) => updateEditorConfig(editorId, updates)}
                                />

                                <TextWrapControl
                                    config={editor}
                                    updateConfig={(updates) => updateEditorConfig(editorId, updates)}
                                />

                                <SpacingControl
                                    config={editor}
                                    updateConfig={(updates) => updateEditorConfig(editorId, updates)}
                                />
                            </div>
                        </Card>
                    );
                })
            )}
        </div>
    );
}