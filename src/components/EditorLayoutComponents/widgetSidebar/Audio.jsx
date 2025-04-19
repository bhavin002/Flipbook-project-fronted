import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play, Pause, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function Audio() {
    const [showPlayer, setShowPlayer] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(6);
    const [trimEnabled, setTrimEnabled] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(6);
    const audioRef = useRef(null);
    const progressRef = useRef(null);
    const trimSliderRef = useRef(null);

    const startHandleRef = useRef(null);
    const endHandleRef = useRef(null);
    const isDraggingStart = useRef(false);
    const isDraggingEnd = useRef(false);
    const isDraggingProgress = useRef(false);

    useEffect(() => {
        if (audioRef.current) {
            const audio = audioRef.current;

            const handleLoadedMetadata = () => {
                setDuration(audio.duration);
                setEndTime(audio.duration);
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
    }, [trimEnabled, startTime, endTime, isPlaying]);

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
        setShowPlayer(true);
        if (audioRef.current) {
            audioRef.current.load();
        }
    };

    const handleResetClick = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        setIsPlaying(false);
        setCurrentTime(0);
        updateProgressPosition(0);
        
        setShowPlayer(false);
        setTrimEnabled(false);
        setStartTime(0);
        setEndTime(duration);
    };

    return (
        <div className="p-6 space-y-2">
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
                                onCheckedChange={setTrimEnabled}
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

            <div className="space-y-2">
                {!showPlayer && <div className="pt-1">
                    <Button
                        className="w-full text-black hover:text-primary border border-gray-300"
                        variant="outline"
                        onClick={handleUploadClick}
                    >
                        Upload MP3
                    </Button>
                </div>}
                <div>
                    <Label htmlFor="audio-tooltip" className="text-xs">Tooltip</Label>
                    <Input
                        type="text"
                        id="audio-tooltip"
                        defaultValue="Click to play"
                        placeholder="Set your tooltip"
                        className="placeholder:text-gray-400"
                    />
                </div>
            </div>

            <audio
                ref={audioRef}
                src="https://cdn.flipsnack.com/collections/uploads/ecf3411c52dd4d40a24ee227ebb83ad5"
                style={{ display: "none" }}
            />
        </div>
    );
}