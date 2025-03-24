import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function EmailClient() {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
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
                        value="<table style='background-color: rgb(237, 240, 246); width: 100%;'><tbody><tr><td><table cellspacing='0' border='0' cellpadding='0' align='center' width='100%' style='background-color: rgb(237, 240, 246); border-collapse: collapse; border-spacing: 0px; max-width: 555px;'><tbody><tr><td align='center' style='background-color: rgb(237, 240, 246); border-collapse: collapse; font-family: Arial; font-size: 16px; line-height: 25px; padding: 20px 0px; text-align: center;'><img src='https://cdn.flipsnack.com/email/email-logo.png' width='200px' alt='Flipnova logo' border='0' style='vertical-align: middle;'></td></tr><tr><td align='center' style='border-collapse: collapse; font-family: Arial; font-size: 16px; line-height: 25px; padding: 0px 20px; text-align: center;'><table cellspacing='0' border='0' cellpadding='0' style='border-collapse: collapse; border-radius: 10px; border-spacing: 0px; width: 100%; background-color: white;'><tbody><tr><td align='center' style='border-collapse: collapse; font-family: Arial; font-size: 16px; line-height: 25px; text-align: center;'><table cellpadding='0' cellspacing='0' border='0' width='100%' align='center' style='background-color: white; border-collapse: collapse; border-spacing: 0px; border-radius: 4px;'><tbody><tr><td align='center' style='border-radius: 4px 4px 0px 0px; font-family: Arial; font-size: 16px; line-height: 25px; padding: 30px 20px; text-align: center; background-color: rgb(3, 98, 252);'><a href='https://www.flipsnack.com/F9D7AD99E8C/new-flipbook-71pfukuo7k/full-view.html' rel='noopener noreferrer' target='_blank'><img width='40%' alt='Flipbook cover' src='https://d1dhn91mufybwl.cloudfront.net/collections/items/8813ceda32a1967c82f4f3i147291099/covers/Zleh497pxCEcI_xV/medium?t=1742320704000' style='border: none; display: block; margin: 0px auto; max-width: 100%;'></a></td></tr><tr><td align='center' style='border-collapse: collapse; font-family: Arial; font-size: 16px; line-height: 25px; padding: 30px 0px 0px; text-align: center;'><h1 style='color: rgb(3, 98, 252); font-size: 36px; font-weight: 300; letter-spacing: 0.02em; line-height: 40px; margin: 0px; padding: 0px; word-break: break-word;'>This is my masterpiece</h1></td></tr><tr><td align='center' style='border-collapse: collapse; font-family: Arial; font-size: 16px; line-height: 25px; padding: 0px 20px 30px; text-align: center;'><p style='color: rgba(0, 0, 0, 0.87); font-size: 16px; font-weight: 300; letter-spacing: 0.02em; line-height: 26px; margin: 18px auto; max-width: 370px; text-align: left; width: 100%; word-break: break-word;'>Take a look at this publication to see my recent work. I made this flipbook using Flipnova.</p><a href='https://www.flipsnack.com/F9D7AD99E8C/new-flipbook-71pfukuo7k/full-view.html' rel='noopener noreferrer' target='_blank' style='border: none; display: block; text-align: center; width: 100%; text-decoration: none;'><div role='presentation' style='background-color: rgb(3, 98, 252); max-width: 370px; width: 100%; line-height: 40px; border-radius: 3px; color: rgb(255, 255, 255); font-size: 13px; text-align: center; margin: 18px auto;'>READ BOOK</div></a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td align='center' style='border-collapse: collapse; font-family: Arial; font-size: 16px; line-height: 25px; padding: 20px; text-align: center;'><p style='color: rgb(182, 188, 200); font-size: 12px; font-weight: 300; letter-spacing: 0.02em; line-height: 20px; margin: 0px 0px 10px; text-align: center;'><span style='color: rgba(0, 0, 0, 0.87); font-size: 12px; font-weight: 300; letter-spacing: 0.02em; line-height: 20px; margin: 0px 0px 10px; text-align: center;'>Flipnova LLC - 535 Mission St. FL 14, San Francisco, CA 94105, USA</span></p></td></tr></tbody></table></td></tr></tbody></table>"
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