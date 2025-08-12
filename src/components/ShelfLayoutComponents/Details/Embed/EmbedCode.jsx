import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getData } from "@/utils/datas";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label";

export default function EmbedCode() {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }
    const pageOptions = getData("pageOptions")
    return (
        <Card>
            <CardHeader>
                <CardTitle>Copy embed code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-1">
                    <Label>Set embed size</Label>
                    <Input
                        className="w-24"
                        id="height"
                        type="number"
                        defaultValue="480"
                    />
                </div>
                <div className="space-y-1">
                    <Label>Embed code</Label>
                    <div className="flex items-center space-x-2">
                        <Input
                            value="<iframe src='https://player.flipsnack.com?hash=RjlEN0FEOTlFOEMrNzFwZnVrdW83aw==' width='100%' height='480' seamless='seamless' scrolling='no' frameBorder='0' allowFullScreen allow='autoplay; clipboard-read; clipboard-write'></iframe>"
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

                </div>
            </CardContent>
        </Card>
    )
}