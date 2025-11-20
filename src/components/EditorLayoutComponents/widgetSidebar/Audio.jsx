import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play, Pause, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { DeleteSingleMediaApi, UploadSingleMediaApi } from "@/service/widgetMedia.service";
import { toast } from "sonner";
import { SingleFileUploadSkeleton } from "@/utils/Skeleton";
import ConfirmationDialog from "@/utils/ConfirmationDialog";
import CornerRadiusControl from "@/utils/CornerRadiusControl";

const AUDIO_MAX_SIZE = 5 * 1024 * 1024;

const audioSchema = z.object({
    audioFile: z
        .instanceof(File)
        .optional()
        .refine((file) => !file || !file.size || file.type === "audio/mpeg", {
            message: "Only MP3 files are allowed"
        })
        .refine((file) => !file || !file.size || file.size <= AUDIO_MAX_SIZE, {
            message: `File size must be less than ${AUDIO_MAX_SIZE / 1024 / 1024} MB`
        }),
    tooltip: z.string().optional()
});

export default function Audio({ mainStage, setMainStage, selectedShape, selectedIndex }) {
    const [useIndividualCorners, setUseIndividualCorners] = useState(
        selectedShape?.[0]?.attrs?.effect?.individualCorners || false
    );

    const defaultCornerRadius = selectedShape?.[0]?.attrs?.effect?.cornerRadius || 0;
    const [cornerRadius, setCornerRadius] = useState(defaultCornerRadius);

    const [topLeftRadius, setTopLeftRadius] = useState(
        useIndividualCorners ?
            selectedShape?.[0]?.attrs?.effect?.topLeftRadius || 0 :
            defaultCornerRadius
    );

    const [topRightRadius, setTopRightRadius] = useState(
        useIndividualCorners ?
            selectedShape?.[0]?.attrs?.effect?.topRightRadius || 0 :
            defaultCornerRadius
    );

    const [bottomRightRadius, setBottomRightRadius] = useState(
        useIndividualCorners ?
            selectedShape?.[0]?.attrs?.effect?.bottomRightRadius || 0 :
            defaultCornerRadius
    );

    const [bottomLeftRadius, setBottomLeftRadius] = useState(
        useIndividualCorners ?
            selectedShape?.[0]?.attrs?.effect?.bottomLeftRadius || 0 :
            defaultCornerRadius
    );

    const [showPlayer, setShowPlayer] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(6);
    const [trimEnabled, setTrimEnabled] = useState(selectedShape[0]?.attrs?.htmlData?.trimEnabled || false);
    const [startTime, setStartTime] = useState(selectedShape[0]?.attrs?.htmlData?.startTime || 0);
    const [endTime, setEndTime] = useState(selectedShape[0]?.attrs?.htmlData?.endTime || 6);
    const [audioData, setAudioData] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isDeleteAudioLoading, setIsDeleteAudioLoading] = useState(false);
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);

    const audioRef = useRef(null);
    const progressRef = useRef(null);
    const trimSliderRef = useRef(null);
    const fileInputRef = useRef(null);

    const startHandleRef = useRef(null);
    const endHandleRef = useRef(null);
    const isDraggingStart = useRef(false);
    const isDraggingEnd = useRef(false);
    const isDraggingProgress = useRef(false);

    const initialTooltip = selectedShape[0]?.attrs?.htmlData?.tooltip || "Click to play";
    const initialAudioData = selectedShape[0]?.attrs?.htmlData?.audioFile || null;

    const form = useForm({
        resolver: zodResolver(audioSchema),
        defaultValues: {
            audioFile: initialAudioData,
            tooltip: initialTooltip
        },
        mode: "onChange"
    });

    useEffect(() => {
        const effect = selectedShape[0].attrs.effect || {};
        const hasIndividualCorners = effect.individualCorners;

        setUseIndividualCorners(hasIndividualCorners);
        setCornerRadius(effect.cornerRadius || 0);
        if (hasIndividualCorners) {
            setTopLeftRadius(effect.topLeftRadius || 0);
            setTopRightRadius(effect.topRightRadius || 0);
            setBottomRightRadius(effect.bottomRightRadius || 0);
            setBottomLeftRadius(effect.bottomLeftRadius || 0);
        } else {
            const uniformRadius = effect.cornerRadius || 0;
            setTopLeftRadius(uniformRadius);
            setTopRightRadius(uniformRadius);
            setBottomRightRadius(uniformRadius);
            setBottomLeftRadius(uniformRadius);
        }

        if (selectedShape[0]?.attrs?.htmlData) {
            const newAudioData = selectedShape[0]?.attrs?.htmlData?.audioFile || null;
            const newTooltip = selectedShape[0]?.attrs?.htmlData?.tooltip || "Click to play";

            if (selectedShape[0]?.attrs?.htmlData?.trimEnabled !== undefined) {
                setTrimEnabled(selectedShape[0]?.attrs?.htmlData?.trimEnabled);
            }

            if (selectedShape[0]?.attrs?.htmlData?.startTime !== undefined) {
                setStartTime(selectedShape[0]?.attrs?.htmlData?.startTime);
            }

            if (selectedShape[0]?.attrs?.htmlData?.endTime !== undefined) {
                setEndTime(selectedShape[0]?.attrs?.htmlData?.endTime);
            }

            form.setValue("audioFile", newAudioData);
            form.setValue("tooltip", newTooltip);

            if (newAudioData) {
                setAudioData(newAudioData);
                setShowPlayer(true);
                if (audioRef.current) {
                    audioRef.current.src = newAudioData.url;
                    audioRef.current.load();
                }
            } else {
                setAudioData(null);
                setShowPlayer(false);
            }
        } else {
            form.setValue("audioFile", null);
            form.setValue("tooltip", "Click to play");
            setAudioData(null);
            setShowPlayer(false);
        }
    }, [selectedShape, form]);

    useEffect(() => {
        if (audioRef.current) {
            const audio = audioRef.current;

            const handleLoadedMetadata = () => {
                const audioDuration = audio.duration;
                setDuration(audioDuration);

                if (!initialLoadComplete) {
                    if (selectedShape[0]?.attrs?.htmlData?.endTime !== undefined) {
                        setEndTime(selectedShape[0]?.attrs?.htmlData?.endTime);
                    } else {
                        setEndTime(audioDuration);
                    }
                    setInitialLoadComplete(true);
                }
            };

            const handleTimeUpdate = () => {
                setCurrentTime(audio.currentTime);
                updateProgressPosition(audio.currentTime);

                if (trimEnabled && audio.currentTime >= endTime) {
                    audio.currentTime = startTime;
                    if (isPlaying) {
                        audio.play();
                    }
                }
            };

            const handleEnded = () => {
                setIsPlaying(false);
                audio.currentTime = trimEnabled ? startTime : 0;
            };

            audio.addEventListener("loadedmetadata", handleLoadedMetadata);
            audio.addEventListener("timeupdate", handleTimeUpdate);
            audio.addEventListener("ended", handleEnded);

            return () => {
                audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
                audio.removeEventListener("timeupdate", handleTimeUpdate);
                audio.removeEventListener("ended", handleEnded);
            };
        }
    }, [trimEnabled, startTime, endTime, isPlaying, selectedShape, initialLoadComplete]);

    useEffect(() => {
        if (showPlayer) {
            const handleMouseMove = (e) => {
                if (isDraggingStart.current && startHandleRef.current && trimSliderRef.current) {
                    handleDrag(e, startHandleRef.current, trimSliderRef.current, (newPos) => {
                        const newTime = (newPos / trimSliderRef.current.offsetWidth) * duration;
                        const clampedTime = Math.max(0, Math.min(newTime, endTime - 0.1));
                        setStartTime(clampedTime);
                    });
                } else if (isDraggingEnd.current && endHandleRef.current && trimSliderRef.current) {
                    handleDrag(e, endHandleRef.current, trimSliderRef.current, (newPos) => {
                        const newTime = (newPos / trimSliderRef.current.offsetWidth) * duration;
                        const clampedTime = Math.max(startTime + 0.1, Math.min(newTime, duration));
                        setEndTime(clampedTime);
                    });
                } else if (isDraggingProgress.current && progressRef.current) {
                    handleDrag(e, null, progressRef.current, (newPos) => {
                        const percent = newPos / progressRef.current.offsetWidth;
                        const newTime = percent * duration;
                        updateAudioTime(newTime);
                    });
                }
            };

            const handleMouseUp = () => {
                isDraggingStart.current = false;
                isDraggingEnd.current = false;
                isDraggingProgress.current = false;
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [showPlayer, duration, startTime, endTime]);

    useEffect(() => {
        if (!selectedShape.length || !mainStage[selectedIndex]?.shapes) return;

        const updatedMainStage = [...mainStage];
        updatedMainStage[selectedIndex].shapes = mainStage[selectedIndex].shapes.map(element => {
            const matchingShape = selectedShape.find(selShape => selShape.attrs.id === element.id);
            if (matchingShape) {
                return {
                    ...element,
                    effect: {
                        cornerRadius: cornerRadius,
                        individualCorners: useIndividualCorners,
                        topLeftRadius: useIndividualCorners ? topLeftRadius : cornerRadius,
                        topRightRadius: useIndividualCorners ? topRightRadius : cornerRadius,
                        bottomRightRadius: useIndividualCorners ? bottomRightRadius : cornerRadius,
                        bottomLeftRadius: useIndividualCorners ? bottomLeftRadius : cornerRadius,
                    }
                };
            }
            return element;
        });

        setMainStage(updatedMainStage);
    }, [
        cornerRadius, useIndividualCorners, topLeftRadius, topRightRadius,
        bottomRightRadius, bottomLeftRadius
    ]);

    const handleDrag = (e, handle, container, updateFunction) => {
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const newPos = Math.max(0, Math.min(e.clientX - rect.left, rect.width));

        updateFunction(newPos);
    };

    const updateProgressPosition = (time) => {
        if (progressRef.current) {
            const percent = (time / duration) * 100;
            progressRef.current.style.setProperty('--progress', `${percent}%`);
        }
    };

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            if (trimEnabled && (currentTime < startTime || currentTime > endTime)) {
                audio.currentTime = startTime;
            }
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const updateAudioTime = (time) => {
        const clampedTime = Math.max(0, Math.min(time, duration));
        setCurrentTime(clampedTime);
        if (audioRef.current) {
            audioRef.current.currentTime = clampedTime;
        }
        updateProgressPosition(clampedTime);
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== "audio/mpeg") {
            toast.error("Invalid file format", {
                description: "Only MP3 files are allowed.",
            });
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setIsUploading(true);
        try {
            const response = await UploadSingleMediaApi(formData);
            const audioResponseData = response.data;

            const newAudioData = {
                fileId: audioResponseData.fileId,
                url: audioResponseData.url,
                name: audioResponseData.fileName
            };

            setAudioData(newAudioData);
            form.setValue("audioFile", newAudioData);

            setInitialLoadComplete(false);

            mainStage[selectedIndex].stageref.current.children[0].children[1].children.find(e => {
                if (e.attrs.id === selectedShape[0].attrs.id) {
                    e.attrs.htmlData = {
                        ...e.attrs.htmlData,
                        audioFile: newAudioData,
                        tooltip: form.getValues().tooltip
                    };
                    e.attrs.htmlType = selectedShape[0].attrs.htmlType;
                    return true;
                }
            });
            mainStage[selectedIndex].shapes = mainStage[selectedIndex].stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) || [];
            const temp = JSON.parse(JSON.stringify(mainStage[selectedIndex]))
            temp.selectedShapes = [];
            temp.stageref = null;
            setMainStage([...mainStage]);

            setShowPlayer(true);
            if (audioRef.current) {
                audioRef.current.src = newAudioData.url;
                audioRef.current.load();
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                toast.error("Validation Error", {
                    description: error.errors[0].message || "Invalid file format or size.",
                });
            } else {
                toast.error("Upload failed", {
                    description: error.message || "Oops! Something went wrong.",
                });
            }
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const confirmDeleteAudio = () => {
        setIsConfirmModalOpen(true);
    };

    const handleDeleteAudio = async () => {
        try {
            setIsDeleteAudioLoading(true);

            if (audioData && audioData.fileId) {
                await DeleteSingleMediaApi(audioData.fileId);
            }

            mainStage[selectedIndex].stageref.current.children[0].children[1].children.find(e => {
                if (e.attrs.id === selectedShape[0].attrs.id) {
                    delete e.attrs.htmlData.audioFile;
                }
            });
            mainStage[selectedIndex].shapes = mainStage[selectedIndex].stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) || [];
            const temp = JSON.parse(JSON.stringify(mainStage[selectedIndex]))
            temp.selectedShapes = [];
            temp.stageref = null;
            setMainStage([...mainStage]);

            setShowPlayer(false);
            setIsPlaying(false);
            setAudioData(null);
            form.setValue("audioFile", null);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeAttribute('src');
                audioRef.current.load();
            }
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            setIsConfirmModalOpen(false);
        } catch (error) {
            toast.error("Failed to delete audio", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsDeleteAudioLoading(false);
        }
    };

    const handleResetClick = () => {
        confirmDeleteAudio();
    };

    const handleTooltipChange = (e) => {
        const tooltip = e.target.value;
        form.setValue("tooltip", tooltip);

        mainStage[selectedIndex].stageref.current.children[0].children[1].children.find(e => {
            if (e.attrs.id === selectedShape[0].attrs.id) {
                e.attrs.htmlData = {
                    ...e.attrs.htmlData,
                    tooltip: tooltip
                };
                return true;
            }
        });
        mainStage[selectedIndex].shapes = mainStage[selectedIndex].stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) || [];
        const temp = JSON.parse(JSON.stringify(mainStage[selectedIndex]))
        temp.selectedShapes = [];
        temp.stageref = null;
        setMainStage([...mainStage]);
    };

    const handleTrimChange = (checked) => {
        setTrimEnabled(checked);

        mainStage[selectedIndex].stageref.current.children[0].children[1].children.find(e => {
            if (e.attrs.id === selectedShape[0].attrs.id) {
                e.attrs.htmlData = {
                    ...e.attrs.htmlData,
                    trimEnabled: checked,
                    startTime: startTime,
                    endTime: endTime
                };
                return true;
            }
        });
        mainStage[selectedIndex].shapes = mainStage[selectedIndex].stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) || [];
        const temp = JSON.parse(JSON.stringify(mainStage[selectedIndex]))
        temp.selectedShapes = [];
        temp.stageref = null;
        setMainStage([...mainStage]);
    };

    useEffect(() => {
        if (trimEnabled && audioData) {
            mainStage[selectedIndex].stageref.current.children[0].children[1].children.find(e => {
                if (e.attrs.id === selectedShape[0].attrs.id) {
                    e.attrs.htmlData = {
                        ...e.attrs.htmlData,
                        startTime: startTime,
                        endTime: endTime
                    };
                    return true;
                }
            });
            mainStage[selectedIndex].shapes = mainStage[selectedIndex].stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) || [];
            const temp = JSON.parse(JSON.stringify(mainStage[selectedIndex]))
            temp.selectedShapes = [];
            temp.stageref = null;
            setMainStage([...mainStage]);
        }
    }, [startTime, endTime]);

    return (
        <div className="p-6 space-y-2 w-full overflow-y-auto">
            <Label className="text-lg">Audio</Label>
            <p className="text-sm">Upload an mp3 file from computer and easily edit your music.</p>
            <div className="space-y-4">
                {showPlayer && (
                    <>
                        <div className="flex items-center gap-4">
                            <p className="cursor-pointer" onClick={togglePlayPause} >
                                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </p>

                            <div className="flex-1 relative h-1 bg-white/20 rounded-full">
                                <div
                                    ref={progressRef}
                                    className="relative w-full h-full cursor-pointer"
                                    style={{ '--progress': `${(currentTime / duration) * 100}%` }}
                                    onMouseDown={(e) => {
                                        isDraggingProgress.current = true;
                                        handleDrag(e, null, progressRef.current, (newPos) => {
                                            const percent = newPos / progressRef.current.offsetWidth;
                                            const newTime = percent * duration;
                                            updateAudioTime(newTime);
                                        });
                                    }}
                                >
                                    <div
                                        className="absolute top-0 left-0 h-full bg-white rounded-full"
                                        style={{ width: 'var(--progress)' }}
                                    ></div>
                                    <div
                                        className="absolute top-1/2 h-4 w-4 bg-white rounded-full -translate-y-1/2 -ml-2 cursor-pointer"
                                        style={{ left: 'var(--progress)' }}
                                    ></div>
                                </div>
                            </div>

                            <Button variant="ghost" onClick={handleResetClick}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="trim-audio"
                                checked={trimEnabled}
                                onCheckedChange={handleTrimChange}
                                className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-4 h-4"
                            />
                            <Label htmlFor="trim-audio" className="text-sm">Trim audio</Label>
                        </div>
                    </>
                )}
            </div>

            {showPlayer && trimEnabled && (
                <div className="space-y-4">
                    <h3 className="text-sm">Select starting and ending point</h3>

                    <div
                        ref={trimSliderRef}
                        className="relative h-1 bg-white/20 rounded-full mt-8 mb-4"
                    >
                        <div
                            className="absolute h-full bg-white rounded-full"
                            style={{
                                left: `${(startTime / duration) * 100}%`,
                                width: `${((endTime - startTime) / duration) * 100}%`
                            }}
                        ></div>

                        <div
                            ref={startHandleRef}
                            className="absolute top-1/2 h-4 w-4 bg-white rounded-full -translate-y-1/2 -ml-3 cursor-pointer"
                            style={{ left: `${(startTime / duration) * 100}%` }}
                            onMouseDown={() => { isDraggingStart.current = true; }}
                        ></div>

                        <div
                            ref={endHandleRef}
                            className="absolute top-1/2 h-4 w-4 bg-white rounded-full -translate-y-1/2 -ml-3 cursor-pointer"
                            style={{ left: `${(endTime / duration) * 100}%` }}
                            onMouseDown={() => { isDraggingEnd.current = true; }}
                        ></div>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span>{formatTime(startTime)}</span>
                        <span>{formatTime(endTime)}</span>
                    </div>
                </div>
            )}

            <Form {...form}>
                <div className="space-y-2">
                    {!showPlayer ?
                        isUploading ? (
                            <SingleFileUploadSkeleton />
                        ) : (
                            <div className="pt-1">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="audio/mpeg"
                                    onChange={handleFileChange}
                                />
                                <Button
                                    className="w-full text-black hover:text-primary border border-gray-300"
                                    variant="outline"
                                    onClick={handleUploadClick}
                                    disabled={isUploading}
                                >
                                    Upload MP3
                                </Button>
                            </div>
                        )
                        : null}

                    <div>
                        <Label htmlFor="audio-tooltip" className="text-xs">Tooltip</Label>
                        <FormField
                            control={form.control}
                            name="tooltip"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            id="audio-tooltip"
                                            placeholder="Set your tooltip"
                                            className="placeholder:text-gray-400"
                                            {...field}
                                            onChange={handleTooltipChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </Form>

            <audio
                ref={audioRef}
                src={audioData?.url || ""}
                style={{ display: "none" }}
            />

            <ConfirmationDialog
                isConfirmModalOpen={isConfirmModalOpen}
                setIsConfirmModalOpen={setIsConfirmModalOpen}
                title="Delete Audio"
                description="Are you sure you want to delete this audio file?"
                onConfirm={handleDeleteAudio}
                isLoading={isDeleteAudioLoading}
            />

            <CornerRadiusControl
                useIndividualCorners={useIndividualCorners}
                setUseIndividualCorners={setUseIndividualCorners}
                cornerRadius={cornerRadius}
                setCornerRadius={setCornerRadius}
                topLeftRadius={topLeftRadius}
                setTopLeftRadius={setTopLeftRadius}
                topRightRadius={topRightRadius}
                setTopRightRadius={setTopRightRadius}
                bottomRightRadius={bottomRightRadius}
                setBottomRightRadius={setBottomRightRadius}
                bottomLeftRadius={bottomLeftRadius}
                setBottomLeftRadius={setBottomLeftRadius}
            />
        </div>
    );
}