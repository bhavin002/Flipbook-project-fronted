import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Info, Check, ChevronRight, Trash2, Globe, RefreshCw, Loader2, Copy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { AddDomainApi, GetDomainsApi, VerifyDomainApi, DeleteDomainApi } from "@/service/custom.domain.service";
import { toast } from "sonner";
import ConfirmationDialog from "@/utils/ConfirmationDialog";

const CNAME_TARGET = import.meta.env.VITE_CNAME_TARGET;

export default function CustomDomainSettings() {
    const [progress, setProgress] = useState(33);
    const [activeStep, setActiveStep] = useState(1);
    const [domains, setDomains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [newDomain, setNewDomain] = useState("");
    const [domainToDelete, setDomainToDelete] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const fetchDomains = async (showLoader = true) => {
        if (showLoader) setLoading(true);
        try {
            const response = await GetDomainsApi();
            if (response.success) {
                setDomains(response.data || []);
                if (response.data && response.data.length > 0) {
                    const allActive = response.data.every(d => d.status?.toLowerCase() === 'active');
                    if (allActive) {
                        setActiveStep(3);
                        setProgress(100);
                    } else if (activeStep === 1) {
                        setActiveStep(2);
                        setProgress(66);
                    }
                } else if (response.data && response.data.length === 0) {
                    setActiveStep(1);
                    setProgress(33);
                }
            }
        } catch (error) {
            toast.error("Failed to load domains", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            if (showLoader) setLoading(false);
        }
    };

    useEffect(() => {
        fetchDomains();
    }, []);

    const handleAddDomain = async (e) => {
        e.preventDefault();
        if (!newDomain.trim()) return;

        setActionLoading(true);
        try {
            const response = await AddDomainApi({ domain: newDomain.trim() });
            if (response.success) {
                toast.success("Domain added successfully");
                setNewDomain("");
                setActiveStep(2);
                setProgress(66);
                fetchDomains(false);
            }
        } catch (error) {
            toast.error("Failed to add domain", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setActionLoading(false);
        }
    };

    const handleVerifyDomain = async (domainId) => {
        setActionLoading(true);
        try {
            const response = await VerifyDomainApi(domainId);
            if (response.success) {
                if (response.data?.status?.toLowerCase() === 'active') {
                    toast.success("Domain verified and active!");
                } else {
                    toast.info("Domain verification pending", {
                        description: "Please ensure DNS records are propagated.",
                    });
                }
                fetchDomains(false);
            }
        } catch (error) {
            toast.error("Verification failed", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteClick = (domainId) => {
        setDomainToDelete(domainId);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteDomain = async () => {
        if (!domainToDelete) return;

        setActionLoading(true);
        try {
            const response = await DeleteDomainApi(domainToDelete);
            if (response.success) {
                toast.success("Domain removed");
                if (domains.length === 1) {
                    setActiveStep(1);
                    setProgress(33);
                }
                setIsDeleteDialogOpen(false);
                setDomainToDelete(null);
                fetchDomains(false);
            }
        } catch (error) {
            toast.error("Failed to remove domain", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="mt-8 h-40 flex items-center justify-center bg-white rounded-lg border border-dashed">
                <Loader2 className="animate-spin text-violet-600" />
            </div>
        );
    }

    return (
        <div className="mt-8">
            <Card>
                <CardHeader className="pb-0">
                    <div className="flex items-center justify-between w-full">
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="text-violet-600" size={20} />
                            Custom Domain
                        </CardTitle>
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
                            <StepTab active={activeStep === 1} title="Add Domain Details" description="Enter subdomain & upload favicon" />
                            <StepTab active={activeStep === 2} title="Verify Domain" description="Add CNAME record & verify" />
                            <StepTab active={activeStep === 3} title="Activation" description="Flipdrag will activate SSL & custom domain" />
                        </div>
                    </div>

                    {activeStep === 1 && (
                        <DomainConfigStep
                            newDomain={newDomain}
                            setNewDomain={setNewDomain}
                            onSubmit={handleAddDomain}
                            loading={actionLoading}
                        />
                    )}
                    {(activeStep === 2 || activeStep === 3) && (
                        <DNSVerificationStep
                            domains={domains}
                            onVerify={handleVerifyDomain}
                            onDelete={handleDeleteClick}
                            loading={actionLoading}
                        />
                    )}
                </CardContent>
            </Card>

            <ConfirmationDialog
                isConfirmModalOpen={isDeleteDialogOpen}
                setIsConfirmModalOpen={setIsDeleteDialogOpen}
                title="Remove Domain"
                description="Are you sure you want to remove this domain? This action cannot be undone."
                onConfirm={handleDeleteDomain}
                onCancel={() => {
                    setIsDeleteDialogOpen(false);
                    setDomainToDelete(null);
                }}
                isLoading={actionLoading}
            />
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
function DomainConfigStep({ newDomain, setNewDomain, onSubmit, loading }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="domain" className="font-medium">Domain Name</Label>
                <div className="flex gap-2">
                    <Input
                        id="domain"
                        placeholder="e.g., catalog.yourbrand.com"
                        className="max-w-md"
                        value={newDomain}
                        onChange={(e) => setNewDomain(e.target.value)}
                        disabled={loading}
                        required
                    />
                </div>
                <div className="flex items-start gap-2 mt-2">
                    <Info size={16} className="text-violet-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-600">
                        We recommend using a subdomain (like catalog.yourbrand.com) for the best results.
                    </p>
                </div>
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={loading || !newDomain}>
                    Add Domain <ChevronRight size={16} className="ml-1" />
                </Button>
            </div>
        </form>
    );
}

function DNSVerificationStep({ domains, onVerify, onDelete, loading }) {
    const [copiedItem, setCopiedItem] = useState(null);

    const copyToClipboard = (text, itemType) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
        setCopiedItem(itemType);
        
        setTimeout(() => {
            setCopiedItem(null);
        }, 2000);
    };

    const getDomainHostname = (domain) => {
        const parts = domain.split('.');
        return parts.length > 2 ? parts[0] : '@';
    };

    const getTxtRecordName = (domain) => {
        const parts = domain.split('.');
        return parts.length > 2 ? `_flipdrag-verify.${parts[0]}` : '_flipdrag-verify';
    };

    const firstDomain = domains.length > 0 ? domains[0] : null;

    return (
        <div className="space-y-6">
            <p className="text-sm text-gray-600">
                Add the following DNS records to your domain provider (e.g., Cloudflare, GoDaddy, Namecheap) to verify ownership.
            </p>

            {firstDomain && (
                <div className="overflow-x-auto">
                    <div className="border rounded-md max-w-full overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="w-24">Type</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Value</TableHead>
                                    <TableHead className="w-16"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium uppercase">CNAME</TableCell>
                                    <TableCell className="font-mono text-sm">
                                        {getDomainHostname(firstDomain.domain)}
                                    </TableCell>
                                    <TableCell className="font-mono text-sm truncate max-w-[200px]" title={CNAME_TARGET}>
                                        {CNAME_TARGET}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(CNAME_TARGET, 'cname')}>
                                            {copiedItem === 'cname' ? (
                                                <Check size={14} className="text-emerald-600" />
                                            ) : (
                                                <Copy size={14} className="text-gray-400" />
                                            )}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium uppercase">TXT</TableCell>
                                    <TableCell className="font-mono text-sm">
                                        {getTxtRecordName(firstDomain.domain)}
                                    </TableCell>
                                    <TableCell className="font-mono text-sm truncate max-w-[200px]" title={firstDomain.verificationToken}>
                                        {firstDomain.verificationToken}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(firstDomain.verificationToken, 'txt')}>
                                            {copiedItem === 'txt' ? (
                                                <Check size={14} className="text-emerald-600" />
                                            ) : (
                                                <Copy size={14} className="text-gray-400" />
                                            )}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                <div className="overflow-x-auto">
                    <div className="border rounded-md max-w-full">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead>Domain</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {domains.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                                            No domains configured.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    domains.map((domain) => (
                                        <TableRow key={domain._id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-violet-100 rounded flex items-center justify-center">
                                                        <Globe size={14} className="text-violet-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{domain.domain}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {domain.status?.toLowerCase() === 'active' ? (
                                                    <Badge
                                                        variant="outline"
                                                        className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1 w-fit"
                                                    >
                                                        <Check size={12} />
                                                        Active
                                                    </Badge>
                                                ) : (
                                                    <Badge
                                                        variant="outline"
                                                        className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1 w-fit"
                                                    >
                                                        Pending
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    {domain.status?.toLowerCase() === 'pending' && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 px-2"
                                                            onClick={() => onVerify(domain._id)}
                                                            disabled={loading}
                                                        >
                                                            Verify Domain
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="ghost"
                                                        className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 px-2"
                                                        onClick={() => onDelete(domain._id)}
                                                        disabled={loading}
                                                    >
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}
