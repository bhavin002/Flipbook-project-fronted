import React from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const VideoButtonModal = ({ open, onOpenChange, htmlData }) => {
    const getDimensions = () => {
        const size = htmlData?.size || "853-480";
        const [width, height] = size.split('-').map(Number);
        return { width: width || 853, height: height || 480 };
    };

    const getEmbedUrl = () => {
        if (!htmlData?.url) return null;
        
        const url = htmlData.url;
        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(youtubeRegex);
        
        if (match) {
            const videoId = match[1];
            return `https://www.youtube-nocookie.com/embed/${videoId}`;
        }
        return url;
    };

    const { width, height } = getDimensions();
    const embedUrl = getEmbedUrl();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[90vw] z-[100]">
                <div className="flex justify-center w-full overflow-hidden">
                    {embedUrl ? (
                        <iframe
                            src={embedUrl}
                            allowFullScreen
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            title={htmlData?.tooltip || "Video"}
                            width={htmlData?.size === "full-screen" ? "100%" : width}
                            height={height}
                            className="rounded-md pt-5"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-[480px] bg-gray-100 rounded-md">
                            <p className="text-gray-500">Invalid video URL</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default VideoButtonModal;