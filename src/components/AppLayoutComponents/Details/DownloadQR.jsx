import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function DownloadQR({ flipbookId }) {
    const [qrCodeDataURL, setQrCodeDataURL] = useState("");
    const [logoFile, setLogoFile] = useState(null);
    const [logoDataURL, setLogoDataURL] = useState("");
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [logoSize, setLogoSize] = useState("Large");

    const redirectURL = `${import.meta.env.VITE_WEBSITE_URL}/public/flipbook/${flipbookId}`;

    useEffect(() => {
        generateQRCode();
    }, [flipbookId, logoDataURL, logoSize]);

    const generateQRCode = async () => {
        try {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            // Set canvas size
            canvas.width = 300;
            canvas.height = 300;

            // Generate QR code
            await QRCode.toCanvas(canvas, redirectURL, {
                width: 300,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });

            // If logo is present, add it to the center
            if (logoDataURL) {
                const logoImg = new Image();
                logoImg.onload = () => {
                    const sizeMap = { Small: 50, Medium: 60, Large: 70 };
                    const logoSizePx = sizeMap[logoSize] || 50;
                    const x = (canvas.width - logoSizePx) / 2;
                    const y = (canvas.height - logoSizePx) / 2;

                    // Draw white background circle for logo
                    ctx.fillStyle = '#FFFFFF';
                    ctx.beginPath();
                    ctx.arc(canvas.width / 2, canvas.height / 2, logoSizePx / 2 + 5, 0, 2 * Math.PI);
                    ctx.fill();

                    // Draw logo
                    ctx.drawImage(logoImg, x, y, logoSizePx, logoSizePx);

                    // Update data URL
                    setQrCodeDataURL(canvas.toDataURL());
                };
                logoImg.src = logoDataURL;
            } else {
                setQrCodeDataURL(canvas.toDataURL());
            }
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.match(/^image\/(png|jpeg|jpg|svg\+xml)$/)) {
                toast.error("File validation", {
                    description: "Please select a PNG, JPG, or SVG file."
                })
                return;
            }
            // Validate file size (optional)
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size", {
                    description: "File size should be less than 5MB."
                })
                return;
            }

            setLogoFile(file);

            const reader = new FileReader();
            reader.onload = (e) => {
                setLogoDataURL(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const downloadQRCode = async (format) => {
        const canvas = canvasRef.current;
        let downloadURL;
        let filename;

        switch (format) {
            case 'png':
                downloadURL = canvas.toDataURL('image/png');
                filename = `qr-code-${flipbookId}.png`;
                break;
            case 'jpg':
                downloadURL = canvas.toDataURL('image/jpeg', 0.9);
                filename = `qr-code-${flipbookId}.jpg`;
                break;
            case 'webp':
                downloadURL = canvas.toDataURL('image/webp');
                filename = `qr-code-${flipbookId}.webp`;
                break;
            default:
                return;
        }

        const a = document.createElement('a');
        a.href = downloadURL;
        a.download = filename;
        a.click();
    };

    const removeLogo = () => {
        setLogoFile(null);
        setLogoDataURL("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="py-6 max-w-[100vw] overflow-auto space-y-4">
            <div className="p-4 md:p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Generate QR Code</h1>
                <p className="text-sm md:text-base text-gray-500">
                    Generate a customized QR code for your catalog, download it in different formats and share it with your readers.
                </p>
            </div>

            <Card>
                <CardContent className="flex flex-col md:flex-row pt-6 gap-4">
                    <div>
                        <div className="border mx-auto md:mx-0 min-w-[200px] min-h-[200px] flex items-center justify-center">
                            {qrCodeDataURL ? (
                                <img
                                    src={qrCodeDataURL}
                                    alt="Generated QR Code"
                                    className="w-full h-full md:w-[250px] md:h-[250px]"
                                    style={{ minWidth: "200px", minHeight: "200px", objectFit: "contain" }}
                                />
                            ) : (
                                <div className="w-full h-full md:w-[250px] md:h-[250px] flex items-center justify-center text-gray-400">
                                    Generating QR Code...
                                </div>
                            )}
                            {/* Hidden canvas for QR generation */}
                            <canvas ref={canvasRef} style={{ display: 'none' }} />
                        </div>
                    </div>


                    <div className="space-y-6">
                        <div className="space-y-2">
                            <p className="text-lg md:text-xl font-semibold">Brand your QR Code</p>
                            <p className="text-gray-500 text-xs md:text-sm">
                                You can upload an image of 100x100px png or jpg.
                            </p>
                            <div className="flex gap-2 items-center">
                                <Button
                                    variant="outline"
                                    className="w-full md:w-auto"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    Select your logo
                                </Button>
                                {logoFile && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={removeLogo}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/png,image/jpeg,image/jpg"
                                onChange={handleLogoUpload}
                                className="hidden"
                            />
                            {logoFile && (
                                <div className="mt-2 space-y-2">
                                    <label className="text-sm">Logo size</label>
                                    <Select value={logoSize} onValueChange={setLogoSize}>
                                        <SelectTrigger className="w-full md:w-[50%]">
                                            <SelectValue placeholder="Select logo size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="Small">Small</SelectItem>
                                                <SelectItem value="Medium">Medium</SelectItem>
                                                <SelectItem value="Large">Large</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <p className="text-lg md:text-xl font-semibold">Use QR Code</p>
                            <p className="text-gray-500 text-xs md:text-sm">
                                Your QR code is ready to use, download it below.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
                                <Button
                                    className="gap-1 text-xs md:text-sm"
                                    onClick={() => downloadQRCode('jpg')}
                                    disabled={!qrCodeDataURL}
                                >
                                    <svg width="16px" height="16px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.8333 2.16667V13.8333H2.16667V2.16667H13.8333ZM13.8333 0.5H2.16667C1.25 0.5 0.5 1.25 0.5 2.16667V13.8333C0.5 14.75 1.25 15.5 2.16667 15.5H13.8333C14.75 15.5 15.5 14.75 15.5 13.8333V2.16667C15.5 1.25 14.75 0.5 13.8333 0.5ZM9.78333 7.88333L7.28333 11.1083L5.5 8.95L3 12.1667H13L9.78333 7.88333Z" fill="white"></path>
                                    </svg>
                                    Download JPG
                                </Button>
                                <Button
                                    className="gap-1 text-xs md:text-sm"
                                    onClick={() => downloadQRCode('png')}
                                    disabled={!qrCodeDataURL}
                                >
                                    <svg width="16px" height="16px" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.33317 2.33317H8.1665V0.666504H2.33317C1.4165 0.666504 0.666504 1.4165 0.666504 2.33317V8.1665H2.33317V2.33317ZM7.33317 9.83317L3.99984 13.9998H13.9998L11.4998 10.6665L9.80817 12.9248L7.33317 9.83317ZM13.1665 6.08317C13.1665 5.3915 12.6082 4.83317 11.9165 4.83317C11.2248 4.83317 10.6665 5.3915 10.6665 6.08317C10.6665 6.77484 11.2248 7.33317 11.9165 7.33317C12.6082 7.33317 13.1665 6.77484 13.1665 6.08317ZM15.6665 0.666504H9.83317V2.33317H15.6665V8.1665H17.3332V2.33317C17.3332 1.4165 16.5832 0.666504 15.6665 0.666504ZM15.6665 15.6665H9.83317V17.3332H15.6665C16.5832 17.3332 17.3332 16.5832 17.3332 15.6665V9.83317H15.6665V15.6665ZM2.33317 9.83317H0.666504V15.6665C0.666504 16.5832 1.4165 17.3332 2.33317 17.3332H8.1665V15.6665H2.33317V9.83317Z" fill="white"></path>
                                    </svg>
                                    Download PNG
                                </Button>
                                <Button
                                    className="gap-1 text-xs md:text-sm"
                                    onClick={() => downloadQRCode('webp')}
                                    disabled={!qrCodeDataURL}
                                >
                                    <svg width="16px" height="16px" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.9998 9.83317C11.2415 9.83317 8.99984 12.0748 8.99984 14.8332C11.7582 14.8332 13.9998 12.5915 13.9998 9.83317ZM3.99984 9.83317C3.99984 12.5915 6.2415 14.8332 8.99984 14.8332C8.99984 12.0748 6.75817 9.83317 3.99984 9.83317ZM5.6665 8.1915C5.6665 8.90817 6.24984 9.4915 6.9665 9.4915C7.2415 9.4915 7.4915 9.40817 7.70817 9.25817L7.69984 9.35817C7.69984 10.0748 8.28317 10.6582 8.99984 10.6582C9.7165 10.6582 10.2998 10.0748 10.2998 9.35817L10.2915 9.25817C10.4998 9.39984 10.7582 9.4915 11.0332 9.4915C11.7498 9.4915 12.3332 8.90817 12.3332 8.1915C12.3332 7.67484 12.0248 7.22484 11.5915 7.0165C12.0248 6.8165 12.3332 6.3665 12.3332 5.84984C12.3332 5.13317 11.7498 4.54984 11.0332 4.54984C10.7582 4.54984 10.5082 4.63317 10.2915 4.78317L10.2998 4.68317C10.2998 3.9665 9.7165 3.38317 8.99984 3.38317C8.28317 3.38317 7.69984 3.9665 7.69984 4.68317L7.70817 4.78317C7.49984 4.63317 7.2415 4.54984 6.9665 4.54984C6.24984 4.54984 5.6665 5.13317 5.6665 5.84984C5.6665 6.3665 5.97484 6.8165 6.40817 7.02484C5.97484 7.22484 5.6665 7.67484 5.6665 8.1915ZM8.99984 5.7165C9.7165 5.7165 10.2998 6.29984 10.2998 7.0165C10.2998 7.73317 9.7165 8.3165 8.99984 8.3165C8.28317 8.3165 7.69984 7.73317 7.69984 7.0165C7.69984 6.29984 8.28317 5.7165 8.99984 5.7165ZM15.6665 2.33317V15.6665H2.33317V2.33317H15.6665ZM15.6665 0.666504H2.33317C1.4165 0.666504 0.666504 1.4165 0.666504 2.33317V15.6665C0.666504 16.5832 1.4165 17.3332 2.33317 17.3332H15.6665C16.5832 17.3332 17.3332 16.5832 17.3332 15.6665V2.33317C17.3332 1.4165 16.5832 0.666504 15.6665 0.666504Z" fill="white"></path>
                                    </svg>
                                    Download WEBP
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}