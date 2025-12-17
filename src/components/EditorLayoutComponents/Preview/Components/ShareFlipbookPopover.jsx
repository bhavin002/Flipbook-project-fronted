import React, { useState, useEffect, useRef } from 'react';
import * as PopoverPrimitive from "@radix-ui/react-popover";
import {
    Popover,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Copy, Check } from 'lucide-react';

import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    EmailShareButton
} from "react-share";
import QRCode from "qrcode";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ShareFlipbookPopover({ children, flipbookId, visibilitySettings, container }) {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [qrCodeDataURL, setQrCodeDataURL] = useState("");
    const canvasRef = useRef(null);

    const shareUrl = `${import.meta.env.VITE_APP_URL}/public-flipbook/${flipbookId}`;

    useEffect(() => {
        if (open && flipbookId) {
            setTimeout(() => {
                generateQRCode();
            }, 100);
        }
    }, [open, flipbookId]);

    const generateQRCode = async () => {
        try {
            const canvas = canvasRef.current;
            if (!canvas) return;

            await QRCode.toCanvas(canvas, shareUrl, {
                width: 256,
                margin: 1,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });

            const dataURL = canvas.toDataURL('image/png');
            setQrCodeDataURL(dataURL);
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl)
            .then(() => {
                setCopied(true);
                toast.success("Link copied to clipboard!");
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(() => {
                toast.error("Failed to copy link");
            });
    };



    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverPrimitive.Portal container={container}>
                <PopoverPrimitive.Content
                    side="top"
                    align="end"
                    sideOffset={5}
                    className={cn(
                        "z-[9999] w-auto p-0 border-none bg-transparent shadow-none outline-none share-popover-content",
                        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    )}
                >
                    <div className="relative isolate z-50">
                        <div className="bg-[#333333]/90 backdrop-blur-sm rounded-lg shadow-xl border border-white/10 p-4 flex flex-col gap-4 relative max-w-[90vw] md:max-w-none w-[340px]">

                            <div className="flex gap-4 h-full">
                                <div className="flex flex-col items-center justify-center gap-2 shrink-0">
                                    <div className="bg-white p-1.5 rounded-lg shadow-sm">
                                        {qrCodeDataURL ? (
                                            <img
                                                src={qrCodeDataURL}
                                                alt="QR Code"
                                                className="w-24 h-24 object-contain"
                                            />
                                        ) : (
                                            <div className="w-24 h-24 flex items-center justify-center bg-gray-50 rounded">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="w-px bg-white/10 my-1" />

                                <div className="flex-1 flex items-center justify-center">
                                    <div className="grid grid-cols-3 gap-3">
                                        <FacebookShareButton url={shareUrl} className="hover:scale-110 transition-transform">
                                            <img src="/assets/social/facebook.png" alt="FB" className="w-10 h-10" />
                                        </FacebookShareButton>

                                        <TwitterShareButton url={shareUrl} className="hover:scale-110 transition-transform">
                                            <img src="/assets/social/twitter.png" alt="TW" className="w-10 h-10" />
                                        </TwitterShareButton>

                                        <WhatsappShareButton url={shareUrl} className="hover:scale-110 transition-transform">
                                            <img src="/assets/social/whatsapp.png" alt="WA" className="w-10 h-10" />
                                        </WhatsappShareButton>

                                        <LinkedinShareButton url={shareUrl} className="hover:scale-110 transition-transform">
                                            <img src="/assets/social/linkedin.png" alt="IN" className="w-10 h-10" />
                                        </LinkedinShareButton>

                                        <EmailShareButton url={shareUrl} body={`Check out this flipbook: ${shareUrl}`} subject="Check out this flipbook!" className="hover:scale-110 transition-transform">
                                            <img src="/assets/social/email.png" alt="Email" className="w-10 h-10" />
                                        </EmailShareButton>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-1 flex items-center border border-white/10 shadow-inner">
                                <input
                                    value={shareUrl}
                                    readOnly
                                    className="bg-transparent border-none text-white/90 text-xs px-2 w-full outline-none placeholder:text-white/30 truncate"
                                />
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 text-white/70 hover:bg-white/10 hover:text-white shrink-0 rounded-md"
                                    onClick={handleCopy}
                                >
                                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                                </Button>
                            </div>

                            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-[#333333]/90 rotate-45 border-r border-b border-white/10" />
                        </div>
                        <canvas ref={canvasRef} className="hidden" />
                    </div>
                </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
        </Popover>
    );
}
