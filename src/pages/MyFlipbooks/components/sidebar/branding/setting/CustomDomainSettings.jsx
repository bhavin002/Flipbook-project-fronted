import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Info,
    AlertTriangle,
    Check,
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
             <Card>
                <CardHeader className="pb-0">
                    <div className="flex items-center justify-between w-full">
                        <CardTitle className="text-xl font-semibold">Custom Domain</CardTitle>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="py-6">
                        <div className="relative pt-2 pb-8">
                            <Progress value={progress} className="h-2" />
                            <div className="absolute top-0 left-0 right-0 flex justify-between -mt-2.5">
                                <StepIndicator active={activeStep >= 1} completed={activeStep > 1} number={1} />
                                <StepIndicator active={activeStep >= 2} completed={activeStep > 2} number={2} />
                                <StepIndicator active={activeStep >= 3} completed={activeStep > 3} number={3} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <StepTab active={activeStep === 1} title="Domain Configuration" description="Add domain & favicon" />
                            <StepTab active={activeStep === 2} title="DNS Verification" description="Add CNAME records" />
                            <StepTab active={activeStep === 3} title="SSL Activation" description="Secure your domain" />
                        </div>
                    </div>

                    {activeStep === 1 && <DomainConfigStep onContinue={handleContinue} />}
                    {activeStep === 2 && <DNSVerificationStep onContinue={handleContinue} onBack={() => handleBack(1)} />}
                    {activeStep === 3 && <DomainActivationStep onBack={() => handleBack(2)} />}
                </CardContent>
            </Card>
        </div>
    );
}

function StepIndicator({ active, completed, number }) {
    const baseClasses = "w-6 h-6 rounded-full flex items-center justify-center border-2 border-white";
    const activeClasses = active ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-600";

    return (
        <div className={`${baseClasses} ${activeClasses}`}>
            {completed ? <Check size={14} /> : <span className="text-xs font-medium">{number}</span>}
        </div>
    );
}

function StepTab({ active, title, description }) {
    const activeClasses = active ? "bg-violet-50 border border-violet-100" : "";

    return (
        <div className={`p-3 rounded-lg transition-colors ${activeClasses}`}>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
}

function StepHeader({ number, title }) {
    return (
        <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-medium">{number}</div>
            <h2 className="text-lg font-medium">{title}</h2>
        </div>
    );
}

function DomainConfigStep({ onContinue }) {
    return (
        <div className="space-y-6">
            <StepHeader number={1} title="Domain Configuration" />

            <div className="space-y-2">
                <label htmlFor="domain" className="font-medium">Domain Name</label>
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

            <div className="flex justify-end">
                <Button onClick={onContinue}>
                    Continue <ChevronRight size={16} className="ml-1" />
                </Button>
            </div>
        </div>
    );
}

function DNSVerificationStep({ onContinue, onBack }) {
    return (
        <div className="space-y-6">
            <StepHeader number={2} title="DNS Verification" />

            <div className="overflow-x-auto">
                <div className="border rounded-md max-w-full overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead>Record Type</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Value</TableHead>
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

            <div className="flex justify-between">
                <Button variant="outline" onClick={onBack}>
                    Back
                </Button>
                <Button onClick={onContinue}>
                    Verify DNS <ChevronRight size={16} className="ml-1" />
                </Button>
            </div>
        </div>
    );
}

function DomainActivationStep({ onBack }) {
    return (
        <div className="space-y-6">
            <StepHeader number={3} title="Domain Activation" />

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

            <div className="flex justify-between">
                <Button variant="outline" onClick={onBack}>
                    Back
                </Button>
                <Button>
                    Test Domain
                </Button>
            </div>
        </div>
    );
}