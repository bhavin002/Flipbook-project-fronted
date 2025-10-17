import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { useEmbedSettings } from "@/context/EmbedSettingsContext";

export default function EmbedCode({ flipbookId, numberOfPages }) {
    const [copied, setCopied] = useState(false);
    const [embedSizeError, setEmbedSizeError] = useState(false);
    const { height, setHeight, startPage, setStartPage } = useEmbedSettings();
    
    const handleCopy = () => {
        navigator.clipboard.writeText(generateEmbedCode());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleHeightChange = (e) => {
        const value = e.target.value;
        const parsedValue = parseInt(value, 10);

        if(parsedValue > 2080) {
            return;
        }
        
        if (value === '' || isNaN(parsedValue) || parsedValue < 280 || parsedValue > 2080) {
            setEmbedSizeError(true);
            setHeight(value);
        } else {
            setEmbedSizeError(false);
            setHeight(parsedValue);
        }
    };

    const handlePageChange = (value) => {
        setStartPage(value);
    };
    
    const generateEmbedCode = () => {
        const baseUrl = `${import.meta.env.VITE_APP_URL}/embed-flipbook/${flipbookId}`;
        const url = startPage !== '1' ? `${baseUrl}?p=${startPage}` : baseUrl;
        return `<iframe src="${url}" width='100%' height='${height}' seamless='seamless' scrolling='no' frameBorder='0' allowFullScreen allow='autoplay; clipboard-read; clipboard-write'></iframe>`;
    };

    const pageOptions = [];
    for(let i = 1; i <= numberOfPages; i++) {
        pageOptions.push({ value: i.toString(), label: `Page ${i}` });
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Copy embed code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-1">
                    <Label>Set embed size (280-2080)</Label>
                    <Input
                        className={`w-24 ${embedSizeError ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}`}
                        id="height"
                        type="number"
                        value={height}
                        onChange={handleHeightChange}
                        min={280}
                        max={2080}
                        required
                    />
                </div>
                <div className="space-y-1">
                    <Label>Start from Page</Label>
                    <Select value={startPage} onValueChange={handlePageChange}>
                        <SelectTrigger id="teammates" className="w-full sm:w-[180px] md:w-[200px]">
                            <SelectValue placeholder="Select page" />
                        </SelectTrigger>
                        <SelectContent>
                            {pageOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <Label>Embed code</Label>
                    <div className="flex items-center space-x-2">
                        <Input
                            value={generateEmbedCode()}
                            readOnly
                        />
                        <Button 
                            variant="outline" 
                            onClick={handleCopy}
                            disabled={embedSizeError}
                        >
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