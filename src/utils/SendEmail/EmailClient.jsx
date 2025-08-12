import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { Check, Copy } from "lucide-react";
import { useEmailCustomization } from "@/context/EmailCustomizationContext";

export default function EmailClient({ flipbookId, isLoading, thumbnail, component }) {
    const [copied, setCopied] = useState(false);
    const { emailData } = useEmailCustomization();
    const href = component === "flipbook" ? `${import.meta.env.VITE_APP_URL}/public-flipbook/${flipbookId}` : `${import.meta.env.VITE_APP_URL}/public-bookshelf/${flipbookId}`;

    const emailHtml = useMemo(() => {
        return `<table style='background-color: ${emailData.backgroundColor}; width: 100%;'><tbody><tr><td><table cellspacing='0' border='0' cellpadding='0' align='center' width='100%' style='background-color: ${emailData.backgroundColor}; border-collapse: collapse; border-spacing: 0px; max-width: 555px;'><tbody><tr><td align='center' style='background-color: ${emailData.backgroundColor}; border-collapse: collapse; font-family: Arial; font-size: 16px; line-height: 25px; padding: 20px 0px; text-align: center;'><img src='${emailData.logo}' alt='Flipnova logo' border='0' style='vertical-align: middle;max-height:100px;max-width:200px'></td></tr><tr><td align='center' style='border-collapse: collapse; font-family: Arial; font-size: 16px; line-height: 25px; padding: 0px 20px; text-align: center;'><table cellspacing='0' border='0' cellpadding='0' style='border-collapse: collapse; border-radius: 10px; border-spacing: 0px; width: 100%; background-color: white;'><tbody><tr><td align='center' style='border-collapse: collapse; font-family: Arial; font-size: 16px; line-height: 25px; text-align: center;'><table cellpadding='0' cellspacing='0' border='0' width='100%' align='center' style='background-color: white; border-collapse: collapse; border-spacing: 0px; border-radius: 4px;'><tbody><tr><td align='center' style='border-radius: 4px 4px 0px 0px; font-family: Arial; font-size: 16px; line-height: 25px; padding: 30px 20px; text-align: center; background-color: ${emailData.accentColor};'><a href=${href} rel='noopener noreferrer' target='_blank'><img width='40%' alt='Flipbook cover' src=${thumbnail} style='border: none; display: block; margin: 0px auto; max-width: 100%;'></a></td></tr><tr><td align='center' style='border-collapse: collapse; font-family: Arial; font-size: 16px; line-height: 25px; padding: 30px 0px 0px; text-align: center;'><h1 style='color: ${emailData.accentColor}; font-size: 36px; font-weight: 300; letter-spacing: 0.02em; line-height: 40px; margin: 0px; padding: 0px; word-break: break-word;'>${emailData.title}</h1></td></tr><tr><td align='center' style='border-collapse: collapse; font-family: Arial; font-size: 16px; line-height: 25px; padding: 0px 20px 30px; text-align: center;'><p style='color: rgba(0, 0, 0, 0.87); font-size: 16px; font-weight: 300; letter-spacing: 0.02em; line-height: 26px; margin: 18px auto; max-width: 370px; text-align: center; width: 100%; word-break: break-word;'>${emailData.description}</p><a href=${href} rel='noopener noreferrer' target='_blank' style='border: none; display: block; text-align: center; width: 100%; text-decoration: none;'><div role='presentation' style='background-color: ${emailData.accentColor}; max-width: 370px; width: 100%; line-height: 40px; border-radius: 3px; color: ${emailData.backgroundColor}; font-size: 13px; text-align: center; margin: 18px auto;'>${emailData.label}</div></a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td align='center' style='border-collapse: collapse; font-family: Arial; font-size: 16px; line-height: 25px; padding: 20px; text-align: center;'><p style='color: rgb(182, 188, 200); font-size: 12px; font-weight: 300; letter-spacing: 0.02em; line-height: 20px; margin: 0px 0px 10px; text-align: center;'><span style='color: rgba(0, 0, 0, 0.87); font-size: 12px; font-weight: 300; letter-spacing: 0.02em; line-height: 20px; margin: 0px 0px 10px; text-align: center;'>${emailData.footerDescription}</span></p></td></tr></tbody></table></td></tr></tbody></table>`;
    }, [emailData, thumbnail]);

    const handleCopy = () => {
        navigator.clipboard.writeText(emailHtml);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <div className="animate-pulse bg-gray-200 rounded h-6 w-64 mb-2" />
                    <div className="animate-pulse bg-gray-200 rounded h-4 w-96" />
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2">
                        <div className="animate-pulse bg-gray-200 rounded h-10 flex-1" />
                        <div className="animate-pulse bg-gray-200 rounded h-10 w-20" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Send it using your email client</CardTitle>
                <CardDescription>Use code to embed the flipbook snippet into your email newsletter</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-2">
                    <Input
                        value={emailHtml}
                        readOnly
                    />
                    <Button variant="outline" onClick={handleCopy}>
                        {copied ? (
                            <>
                                <Check className="h-4 w-4 mr-2" />
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy
                            </>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}