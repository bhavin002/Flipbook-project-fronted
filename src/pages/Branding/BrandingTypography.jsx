import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import TextPreview from '../../components/AppLayoutComponents/Sidebar/Branding/TextEditor/TextPreview'
import FontControls from '../../components/AppLayoutComponents/Sidebar/Branding/TextEditor/FontControls'
import StyleControls from '../../components/AppLayoutComponents/Sidebar/Branding/TextEditor/StyleControls'
import TextCaseControl from '../../components/AppLayoutComponents/Sidebar/Branding/TextEditor/TextCaseControl'
import ColorControl from '../../components/AppLayoutComponents/Sidebar/Branding/TextEditor/ColorControl'
import AlignmentControl from '../../components/AppLayoutComponents/Sidebar/Branding/TextEditor/AlignmentControl'
import TextWrapControl from '../../components/AppLayoutComponents/Sidebar/Branding/TextEditor/TextWrapControl'
import SpacingControl from '../../components/AppLayoutComponents/Sidebar/Branding/TextEditor/SpacingControl'

export default function BrandingTypography() {
    const [editors, setEditors] = useState([
        {
            id: 1,
            name: 'Heading',
            description: 'George enjoys a healthy diet of fruits and grain.',
            fontFamily: 'font-sans',
            fontWeight: 'bold',
            fontSize: 60,
            textColor: '#1f2937',
            styles: ['bold'],
            textCase: 'none',
            alignment: 'left',
            textWrap: 'wrap',
            letterSpacing: 0,
            lineHeight: 1.2,
            isBoldDisabled: false,
            isItalicDisabled: true,
        },
        {
            id: 2,
            name: 'Sub heading',
            description:"There are three cats looking at me from the tree. I’m not sure what they want, but they look shady.",
            fontFamily: 'font-serif',
            fontWeight: 'regular',
            fontSize: 24,
            textColor: '#1f2937',
            styles: [''],
            textCase: 'none',
            alignment: 'left',
            textWrap: 'wrap',
            letterSpacing: 0,
            lineHeight: 1.2,
            isBoldDisabled: true,
            isItalicDisabled: true,
        },
        {
            id: 3,
            name: 'Body text',
            description:"Winter in New York is a very cold place, but it’s equally as beautiful. My best suggestion would be to find a nice pizza shop, order a nice warm slice of your favorite pizza, and watch the snow fall. You can also try hitting one of the amazing coffee shops in Times Square.",
            fontFamily: 'font-sans',
            fontWeight: 'regular',
            fontSize: 16,
            textColor: '#1f2937',
            styles: [''],
            textCase: 'none',
            alignment: 'left',
            textWrap: 'wrap',
            letterSpacing: 0,
            lineHeight: 1.2,
            isBoldDisabled: false,
            isItalicDisabled: true,
        },
        {
            id: 4,
            name: 'Pagination',
            description:"1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11",
            fontFamily: 'font-mono',
            fontWeight: 'bold',
            fontSize: 14,
            textColor: '#1f2937',
            styles: ['bold'],
            textCase: 'none',
            alignment: 'center',
            textWrap: 'wrap',
            letterSpacing: 0,
            lineHeight: 1.2,
            isBoldDisabled: false,
            isItalicDisabled: true,
        }
    ]);

    const updateEditorConfig = (editorId, updates) => {
        setEditors(prevEditors =>
            prevEditors.map(editor => {
                if (editor.id === editorId) {
                    const updatedEditor = { ...editor, ...updates };
                    console.log(`Updated editor ${editorId}:`, updatedEditor);
                    return updatedEditor;
                }
                return editor;
            })
        );
    };

    return (
        <div className="flex flex-col max-w-full p-6 space-y-2">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Typography</h1>
                <p className="text-gray-500">Set custom default text styles for easy access when you design publications</p>
            </div>

            {editors.map((editor) => (
                <Card key={editor.id} className="p-4 overflow-hidden mb-4 shadow-sm rounded-lg">
                    <div className="text-sm text-gray-500 mb-2">{editor.name}</div>

                    <CardContent className="p-0 mb-2">
                        <TextPreview config={editor} />
                    </CardContent>

                    <div className="flex flex-wrap items-center gap-2 border-t pt-4">
                        <FontControls
                            config={editor}
                            updateConfig={(updates) => updateEditorConfig(editor.id, updates)}
                        />

                        <StyleControls
                            config={editor}
                            updateConfig={(updates) => updateEditorConfig(editor.id, updates)}
                        />

                        <TextCaseControl
                            config={editor}
                            updateConfig={(updates) => updateEditorConfig(editor.id, updates)}
                        />

                        <ColorControl
                            config={editor}
                            updateConfig={(updates) => updateEditorConfig(editor.id, updates)}
                        />

                        <AlignmentControl
                            config={editor}
                            updateConfig={(updates) => updateEditorConfig(editor.id, updates)}
                        />

                        <TextWrapControl
                            config={editor}
                            updateConfig={(updates) => updateEditorConfig(editor.id, updates)}
                        />

                        <SpacingControl
                            config={editor}
                            updateConfig={(updates) => updateEditorConfig(editor.id, updates)}
                        />
                    </div>
                </Card>
            ))}
        </div>
    );
}