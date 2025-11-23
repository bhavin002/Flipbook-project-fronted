import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy, Check, Download } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
} from "react-share"
import QRCode from "qrcode"

export default function ShareFlipbookDialog({ isShareModalOpen, setIsShareModalOpen, flipbookId }) {
    const [copied, setCopied] = useState(false)
    const [qrCodeDataURL, setQrCodeDataURL] = useState("")
    const canvasRef = useRef(null)

    const shareUrl = `${import.meta.env.VITE_APP_URL}/public-flipbook/${flipbookId}`;

    useEffect(() => {
        if (isShareModalOpen && flipbookId) {
            setTimeout(() => {
                generateQRCode();
            }, 100);
        }
    }, [isShareModalOpen, flipbookId]);

    const generateQRCode = async () => {
        try {
            const canvas = canvasRef.current;
            if (!canvas) {
                console.log('Canvas not available');
                return;
            }

            console.log('Starting QR code generation for:', shareUrl);

            // Set canvas size
            canvas.width = 256;
            canvas.height = 256;

            // Generate QR code
            await QRCode.toCanvas(canvas, shareUrl, {
                width: 256,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });

            // Get the data URL after generation
            const dataURL = canvas.toDataURL('image/png');
            console.log('QR Code data URL generated:', dataURL.substring(0, 50) + '...');
            setQrCodeDataURL(dataURL);

            console.log('QR Code generated successfully');
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(() => {
            });
    }

    const sendEmail = () => {
        const subject = encodeURIComponent("Check out this flipbook!");
        const body = encodeURIComponent(`I wanted to share this flipbook with you:\n\n${shareUrl}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }

    const downloadQRCode = () => {
        if (!qrCodeDataURL) {
            return;
        }

        try {
            const a = document.createElement('a');
            a.href = qrCodeDataURL;
            a.download = `flipbook-qr-${flipbookId}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error('Download error:', error);
        }
    }

    return (
        <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
            <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Share Flipbook</DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    {/* Mobile: QR Code first, Desktop: Side by side */}
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Social Icons Section - Left on Desktop */}
                        <div className="flex-1 order-2 md:order-1">
                            <h3 className="text-sm font-medium text-gray-700 mb-3">Share via Social Media</h3>
                            <div className="flex flex-col gap-2">
                                <FacebookShareButton url={shareUrl} quote="Check out this flipbook!" className="w-full">
                                    <Button variant="outline" className="w-full justify-start gap-3 h-11">
                                        <img className="w-7 h-7" src="/assets/social/facebook.png" alt="" />
                                        <span className="font-medium">Facebook</span>
                                    </Button>
                                </FacebookShareButton>

                                <TwitterShareButton url={shareUrl} title="Check out this flipbook!" className="w-full">
                                    <Button variant="outline" className="w-full justify-start gap-3 h-11">
                                        <img className="w-7 h-7" src="/assets/social/twitter.png" alt="" />
                                        <span className="font-medium">Twitter</span>
                                    </Button>
                                </TwitterShareButton>

                                <WhatsappShareButton url={shareUrl} title="Check out this flipbook!" className="w-full">
                                    <Button variant="outline" className="w-full justify-start gap-3 h-11">
                                        <img className="w-7 h-7" src="/assets/social/whatsapp.png" alt="" />
                                        <span className="font-medium">WhatsApp</span>
                                    </Button>
                                </WhatsappShareButton>

                                <LinkedinShareButton url={shareUrl} title="Check out this flipbook!" className="w-full">
                                    <Button variant="outline" className="w-full justify-start gap-3 h-11">
                                        <img className="w-7 h-7" src="/assets/social/linkedin.png" alt="" />
                                        <span className="font-medium">LinkedIn</span>
                                    </Button>
                                </LinkedinShareButton>

                                <Button variant="outline" onClick={sendEmail} className="w-full justify-start gap-3 h-11">
                                    <img className="w-7 h-7" src="/assets/social/email.png" alt="" />
                                    <span className="font-medium">Email</span>
                                </Button>
                            </div>
                        </div>

                        {/* QR Code Section - Right on Desktop, Top on Mobile */}
                        <div className="flex-shrink-0 order-1 md:order-2">
                            <h3 className="text-sm font-medium text-gray-700 mb-3 text-center md:text-left">Scan QR Code</h3>
                            <div className="flex flex-col items-center gap-3">
                                <div className="border rounded-xl p-2.5 bg-white shadow-sm">
                                    {qrCodeDataURL ? (
                                        <img
                                            src={qrCodeDataURL}
                                            alt="QR Code"
                                            className="w-[200px] h-[200px] md:w-[180px] md:h-[180px]"
                                        />
                                    ) : (
                                        <div className="w-[200px] h-[200px] md:w-[180px] md:h-[180px] flex items-center justify-center text-gray-400 text-sm">
                                            <div className="text-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                                                Generating...
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={downloadQRCode}
                                    disabled={!qrCodeDataURL}
                                    className="w-full gap-2"
                                >
                                    <Download className="h-4 w-4" />
                                    Download QR Code
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Copy Link Section - Always at Bottom */}
                    <div className="mt-6 pt-6 border-t">
                        <div className="flex items-center gap-2">
                            <Input
                                value={shareUrl}
                                readOnly
                                className="flex-1 text-sm bg-gray-50"
                            />
                            <Button
                                variant="outline"
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-4 whitespace-nowrap"
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-4 w-4" />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-4 w-4" />
                                        Copy
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Hidden canvas for QR code generation */}
                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </DialogContent>
        </Dialog>
    )
}