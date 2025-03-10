import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
    Info,
    Upload,
    AlertTriangle,
    Check,
    ExternalLink,
    Globe,
    ChevronRight,
    Shield
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function CustomDomainSettings() {
    const [progress, setProgress] = useState(33);
    const [activeStep, setActiveStep] = useState(1);

    const handleContinue = () => {
        if (activeStep === 1) {
            setProgress(66);
            setActiveStep(2);
        } else if (activeStep === 2) {
            setProgress(100);
            setActiveStep(3);
        }
    };

    const handleBack = (step) => {
        setActiveStep(step);
        if (step === 1) {
            setProgress(33);
        } else if (step === 2) {
            setProgress(66);
        }
    };

    return (
        <div className="mt-8">
            <Card className="shadow-sm rounded-lg">
                <CardHeader className="pb-0">
                    <div className="flex items-center justify-between w-full">
                        <CardTitle className="text-xl font-semibold">Custom Domain</CardTitle>
                        <Button variant="outline">View Domain Status</Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="py-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-medium text-lg">Domain Setup Progress</h2>
                            <Badge variant="outline" className="bg-violet-50 text-violet-700 font-medium">
                                {progress}% Complete
                            </Badge>
                        </div>

                        <div className="relative pt-2 pb-8">
                            <Progress value={progress} className="h-2" />
                            <div className="absolute top-0 left-0 right-0 flex justify-between -mt-2.5">
                                <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-white
                                        ${activeStep >= 1 ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-600"}`}
                                >
                                    {activeStep > 1 ? <Check size={14} /> : <span className="text-xs font-medium">1</span>}
                                </div>
                                <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-white
                                        ${activeStep >= 2 ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-600"}`}
                                >
                                    {activeStep > 2 ? <Check size={14} /> : <span className="text-xs font-medium">2</span>}
                                </div>
                                <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-white
                                        ${activeStep >= 3 ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-600"}`}
                                >
                                    {activeStep > 3 ? <Check size={14} /> : <span className="text-xs font-medium">3</span>}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className={`p-3 rounded-lg transition-colors ${activeStep === 1 ? "bg-violet-50 border border-violet-100" : ""}`}>
                                <h3 className="font-medium">Domain Configuration</h3>
                                <p className="text-sm text-gray-600">Add domain & favicon</p>
                            </div>

                            <div className={`p-3 rounded-lg transition-colors ${activeStep === 2 ? "bg-violet-50 border border-violet-100" : ""}`}>
                                <h3 className="font-medium">DNS Verification</h3>
                                <p className="text-sm text-gray-600">Add CNAME records</p>
                            </div>

                            <div className={`p-3 rounded-lg transition-colors ${activeStep === 3 ? "bg-violet-50 border border-violet-100" : ""}`}>
                                <h3 className="font-medium">SSL Activation</h3>
                                <p className="text-sm text-gray-600">Secure your domain</p>
                            </div>
                        </div>
                    </div>

                    {activeStep === 1 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-medium">1</div>
                                <h2 className="text-lg font-medium">Domain Configuration</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="font-medium block">Favicon</label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                                            <Upload className="text-gray-400" size={24} />
                                        </div>
                                        <div className="space-y-2">
                                            <Button variant="outline" size="sm" className="text-violet-600">
                                                <Upload size={14} className="mr-2" />
                                                Upload Favicon
                                            </Button>
                                            <p className="text-xs text-gray-500">PNG, JPG or ICO (Max 5MB)</p>
                                        </div>
                                    </div>
                                    <Alert variant="default" className="bg-gray-50 border-gray-200">
                                        <div className="flex items-center justify-start gap-2 text-gray-600">
                                            <Globe className="h-4 w-4" />
                                            <AlertDescription>
                                                The favicon appears in browser tabs next to your page title, helping users identify your brand.
                                            </AlertDescription>
                                        </div>
                                    </Alert>
                                </div>

                                {/* <Separator /> */}

                                {/* Domain Name Second */}
                                <div className="space-y-2">
                                    <label htmlFor="domain" className="font-medium block">Domain Name</label>
                                    <Input
                                        id="domain"
                                        placeholder="e.g., forms.yourbrand.com"
                                        className="max-w-md"
                                    />
                                    <div className="flex items-start gap-2 mt-2">
                                        <Info size={16} className="text-violet-500 mt-0.5 shrink-0" />
                                        <p className="text-sm text-gray-600">
                                            We recommend using a subdomain (like forms.yourbrand.com) rather than your root domain for better compatibility.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button className="bg-violet-600 hover:bg-violet-700" onClick={handleContinue}>
                                    Continue <ChevronRight size={16} className="ml-1" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {activeStep === 2 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-medium">2</div>
                                <h2 className="text-lg font-medium">DNS Verification</h2>
                            </div>

                            <Alert variant="warning" className="bg-amber-50 border-amber-200">
                                <div className="flex items-center justify-start gap-2 text-amber-800">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertDescription>
                                        DNS changes may take up to 24-48 hours to propagate across the internet.
                                    </AlertDescription>
                                </div>
                            </Alert>

                            <div className="overflow-x-auto">
                                <div className="border rounded-md max-w-full overflow-hidden">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-gray-50">
                                                <TableHead className="w-1/5">Record Type</TableHead>
                                                <TableHead className="w-2/5">Name / Host</TableHead>
                                                <TableHead className="w-2/5">Value / Target</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-medium">CNAME</TableCell>
                                                <TableCell>forms</TableCell>
                                                <TableCell>app-client.feedspace.io</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">TXT</TableCell>
                                                <TableCell>forms.verify</TableCell>
                                                <TableCell className="font-mono text-sm">feedspace-site-verification=a1b2c3d4</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>

                            <Alert variant="default" className="bg-gray-50 border-gray-200">
                                <Info size={18} className="h-4 w-4 text-violet-500" />
                                <div>
                                    <AlertDescription>
                                        <h4 className="font-medium mb-1">Need help with DNS setup?</h4>
                                        <p className="text-sm text-gray-600 mb-2">
                                            Access detailed instructions for popular domain providers.
                                        </p>
                                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                                            View DNS Setup Guide <ExternalLink size={14} />
                                        </Button>
                                    </AlertDescription>
                                </div>
                            </Alert>

                            <div className="flex justify-between">
                                <Button variant="outline" onClick={() => handleBack(1)}>
                                    Back
                                </Button>
                                <Button className="bg-violet-600 hover:bg-violet-700" onClick={handleContinue}>
                                    Verify DNS <ChevronRight size={16} className="ml-1" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {activeStep === 3 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-medium">3</div>
                                <h2 className="text-lg font-medium">Domain Activation</h2>
                            </div>

                            <div className="overflow-x-auto">
                                <div className="border rounded-md max-w-full">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-gray-50">
                                                <TableHead>Domain</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>SSL</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 bg-violet-100 rounded flex items-center justify-center">
                                                            <span className="text-xs text-violet-600">F</span>
                                                        </div>
                                                        <span className="font-medium">forms.yourbrand.com</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1 w-fit">
                                                        <AlertTriangle size={12} />
                                                        Pending
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 flex items-center gap-1 w-fit">
                                                        <Shield size={12} />
                                                        Provisioning
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button variant="outline">
                                                            Verify Domain
                                                        </Button>
                                                        <Button variant="destructive">
                                                            Remove Domain
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Alert variant="default" className="bg-violet-50 border-violet-100">
                                    <Shield size={16} className="h-4 w-4" color={"#5b21b6"} />
                                    <AlertDescription className="text-violet-700">
                                        <h4 className="font-medium mb-1 text-violet-800">SSL Certificate</h4>
                                        We automatically issue and renew SSL certificates for your custom domain to ensure secure connections.
                                    </AlertDescription>
                                </Alert>

                                <Alert variant="default" className="bg-gray-50 border-gray-200 text-gray-600">
                                    <Globe size={16} className="h-4 w-4" />
                                    <AlertDescription>
                                        <h4 className="font-medium mb-1">Domain Propagation</h4>
                                        Once verified, your domain will be active within 15 minutes. DNS changes can take up to 48 hours to propagate.
                                    </AlertDescription>
                                </Alert>
                            </div>

                            <div className="flex justify-between">
                                <Button variant="outline" onClick={() => handleBack(2)}>
                                    Back
                                </Button>
                                <Button className="bg-violet-600 hover:bg-violet-700">
                                    Test Domain
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}