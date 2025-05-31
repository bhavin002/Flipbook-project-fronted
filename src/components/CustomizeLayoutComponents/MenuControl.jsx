import React, { useEffect, useState } from 'react';
import { useFlipbookPreviewSettings } from '../../contexts/FlipbookPreviewSettingsContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';

export default function MenuControl() {
    const { isFieldEnabled } = useFlipbookPreviewSettings();
    const [selectedAudio, setSelectedAudio] = useState(null);

    return (
        <>
            <div className="flex flex-col gap-2 text-white relative">
                {!isFieldEnabled("backgroundAudio") && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 rounded-md" />
                )}
                <div className={!isFieldEnabled("backgroundAudio") ? "pointer-events-none opacity-50" : ""}>
                    <Label>Background Audio</Label>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="w-full text-primary"
                            onClick={() => {/* Your audio selection logic */}}
                        >
                            Select Audio
                        </Button>
                        {selectedAudio && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600"
                                onClick={() => setSelectedAudio(null)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                    {selectedAudio && (
                        <div className="mt-2">
                            <audio controls className="w-full">
                                <source src={selectedAudio} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    )}
                </div>
            </div>
            {/* ... rest of your component ... */}
        </>
    );
} 