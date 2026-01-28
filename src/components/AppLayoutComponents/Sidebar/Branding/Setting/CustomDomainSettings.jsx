import { useState, useEffect } from "react";
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
    Shield,
    Trash2,
    Globe,
    ExternalLink,
    RefreshCw,
    Loader2,
    Settings,
    BookOpen
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { AddDomainApi, GetDomainsApi, VerifyDomainApi, DeleteDomainApi, SetDefaultFlipbookApi, GetDomainConfigApi } from "@/service/custom.domain.service";
import { GetWorkspaceBookApi } from "@/service/flipbook.publish.service";
import { useWorkspaces } from "@/context/WorkspaceContext";
import { toast } from "sonner";
import { Loader } from "@/components/ui/loader";

export default function CustomDomainSettings() {
    const [progress, setProgress] = useState(33);
    const [activeStep, setActiveStep] = useState(1);
    const [domains, setDomains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [newDomain, setNewDomain] = useState("");
    const [currentDomain, setCurrentDomain] = useState(null);
    const [publishedBooks, setPublishedBooks] = useState([]);
    const [domainConfig, setDomainConfig] = useState(null);
    const { currentWorkspace } = useWorkspaces();

    const fetchDomains = async (showLoader = true) => {
        if (showLoader) setLoading(true);
        try {
            // Fetch domains and config in parallel
            const [domainsRes, configRes] = await Promise.all([
                GetDomainsApi(),
                GetDomainConfigApi()
            ]);

            if (configRes.success) {
                setDomainConfig(configRes.data);
            }

            if (domainsRes.success) {
                setDomains(domainsRes.data);
                // If there's a pending domain, select it as current for the wizard
                const pending = domainsRes.data.find(d => d.status.toLowerCase() === 'pending');
                if (pending) {
                    setCurrentDomain(pending);
                    setActiveStep(2);
                    setProgress(66);
                } else if (res.data.length > 0) {
                    // If we have active domains, show the list (Step 3)
                    setActiveStep(3);
                    setProgress(100);
                    fetchPublishedBooks();
                } else {
                    setActiveStep(1);
                    setProgress(33);
                }
            }
        } catch (err) {
            toast.error("Failed to load domains");
        } finally {
            setLoading(false);
        }
    };

    const fetchPublishedBooks = async () => {
        if (!currentWorkspace?._id) return;
        try {
            const res = await GetWorkspaceBookApi(currentWorkspace._id);
            if (res.success) {
                // Filter out any unpublished or deleted books if necessary, 
                // but usually GetWorkspaceBookApi for publishing info returns published ones.
                setPublishedBooks(res.data || []);
            }
        } catch (err) {
            console.error("Failed to fetch published books", err);
        }
    };

    useEffect(() => {
        fetchDomains();
    }, []);

    const handleAddDomain = async (e) => {
        e.preventDefault();
        if (!newDomain) return;

        setActionLoading(true);
        try {
            const res = await AddDomainApi({ domain: newDomain });
            if (res.success) {
                toast.success("Domain added successfully");
                setNewDomain("");
                fetchDomains(false);
            }
        } catch (err) {
            toast.error(err.message || "Failed to add domain");
        } finally {
            setActionLoading(false);
        }
    };

    const handleVerifyDomain = async (domainId) => {
        setActionLoading(true);
        try {
            const res = await VerifyDomainApi(domainId);
            if (res.success) {
                if (res.data.status.toLowerCase() === 'active') {
                    toast.success("Domain verified and active!");
                } else {
                    toast.info("Domain verification pending. Please ensure DNS records are propagated.");
                }
                fetchDomains(false);
            }
        } catch (err) {
            toast.error(err.message || "Verification failed");
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteDomain = async (domainId) => {
        if (!window.confirm("Are you sure you want to remove this domain?")) return;

        setActionLoading(true);
        try {
            const res = await DeleteDomainApi(domainId);
            if (res.success) {
                toast.success("Domain removed");
                setCurrentDomain(null);
                fetchDomains(false);
            }
        } catch (err) {
            toast.error(err.message || "Failed to remove domain");
        } finally {
            setActionLoading(false);
        }
    };

    const handleSetDefaultFlipbook = async (domainId, flipbookId) => {
        setActionLoading(true);
        try {
            const res = await SetDefaultFlipbookApi(domainId, flipbookId);
            if (res.success) {
                toast.success("Default flipbook updated");
                fetchDomains(false);
            }
        } catch (err) {
            toast.error(err.message || "Failed to update default flipbook");
        } finally {
            setActionLoading(false);
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

    if (loading) return <div className="mt-8 h-40 flex items-center justify-center bg-white rounded-lg border border-dashed"><Loader2 className="animate-spin text-violet-600" /></div>;

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
                            <StepTab active={activeStep === 1} title="Domain Configuration" description="Add domain name" />
                            <StepTab active={activeStep === 2} title="DNS Verification" description="Add DNS records" />
                            <StepTab active={activeStep === 3} title="Domain Activation" description="Ready to use" />
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
                    {activeStep === 2 && (
                        <DNSVerificationStep
                            domain={currentDomain}
                            config={domainConfig}
                            onVerify={() => handleVerifyDomain(currentDomain._id)}
                            onBack={() => handleBack(domains.length > 0 ? 3 : 1)}
                            loading={actionLoading}
                        />
                    )}
                    {activeStep === 3 && (
                        <DomainActivationStep
                            domains={domains}
                            publishedBooks={publishedBooks}
                            onVerify={handleVerifyDomain}
                            onDelete={handleDeleteDomain}
                            onSetDefault={handleSetDefaultFlipbook}
                            onSelectForSetup={(d) => { setCurrentDomain(d); setActiveStep(2); setProgress(66); }}
                            onAddNew={() => { setActiveStep(1); setProgress(33); }}
                            loading={actionLoading}
                        />
                    )}
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

function DomainConfigStep({ newDomain, setNewDomain, onSubmit, loading }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <StepHeader number={1} title="Domain Configuration" />

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
                    {loading ? <RefreshCw className="animate-spin mr-2" size={16} /> : null}
                    Add Domain <ChevronRight size={16} className="ml-1" />
                </Button>
            </div>
        </form>
    );
}

function DNSVerificationStep({ domain, config, onVerify, onBack, loading }) {
    if (!domain) return null;

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

    const cnameTarget = config?.cnameTarget || "cname.flipdrag.com";

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <StepHeader number={2} title="DNS Verification" />
                <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
                    {domain.domain}
                </Badge>
            </div>

            <p className="text-sm text-gray-600">
                Add the following DNS records to your domain provider (e.g., Cloudflare, GoDaddy, Namecheap) to verify ownership.
            </p>

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
                                    {domain.domain.split('.').length > 2 ? domain.domain.split('.')[0] : '@'}
                                </TableCell>
                                <TableCell className="font-mono text-sm truncate max-w-[200px]" title={cnameTarget}>{cnameTarget}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(cnameTarget)}>
                                        <Check size={14} className="text-gray-400" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium uppercase">TXT</TableCell>
                                <TableCell className="font-mono text-sm">
                                    {domain.domain.split('.').length > 2 ? `_flipdrag-verify.${domain.domain.split('.')[0]}` : '_flipdrag-verify'}
                                </TableCell>
                                <TableCell className="font-mono text-sm truncate max-w-[200px]" title={domain.verificationToken}>{domain.verificationToken}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(domain.verificationToken)}>
                                        <Check size={14} className="text-gray-400" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 p-3 rounded-lg flex gap-3">
                <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">
                    DNS propagation can take anywhere from a few minutes to 24 hours. If it doesn't verify immediately, please try again later.
                </p>
            </div>

            <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={onBack} disabled={loading}>
                    Back
                </Button>
                <Button onClick={onVerify} disabled={loading}>
                    {loading ? <RefreshCw className="animate-spin mr-2" size={16} /> : null}
                    Verify Records <ChevronRight size={16} className="ml-1" />
                </Button>
            </div>
        </div>
    );
}

function DomainActivationStep({ domains, publishedBooks, onVerify, onDelete, onSetDefault, onSelectForSetup, onAddNew, loading }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <StepHeader number={3} title="Domains" />
                <Button variant="outline" size="sm" onClick={onAddNew}>
                    Add New Domain
                </Button>
            </div>

            <div className="overflow-x-auto">
                <div className="border rounded-md max-w-full">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead>Domain</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-64">Root Path (Default)</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {domains.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
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
                                                    {domain.status === 'Active' && (
                                                        <a
                                                            href={`https://${domain.domain}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-[10px] text-violet-600 flex items-center gap-0.5 hover:underline"
                                                        >
                                                            Visit <ExternalLink size={8} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {domain.status.toLowerCase() === 'active' ? (
                                                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1 w-fit">
                                                    <Check size={12} />
                                                    Active
                                                </Badge>
                                            ) : domain.status.toLowerCase() === 'suspended' ? (
                                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1 w-fit">
                                                    <Shield size={12} />
                                                    Suspended
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1 w-fit">
                                                    <RefreshCw size={12} className="animate-spin-slow" />
                                                    Pending
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {domain.status.toLowerCase() === 'active' ? (
                                                <div className="flex flex-col gap-1">
                                                    <Select
                                                        value={domain.defaultFlipbookId || "_none_"}
                                                        onValueChange={(val) => onSetDefault(domain._id, val === "_none_" ? null : val)}
                                                        disabled={loading}
                                                    >
                                                        <SelectTrigger className="h-8 text-xs focus:ring-0">
                                                            <SelectValue placeholder="Select Default Book" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="_none_">None (404 on Root)</SelectItem>
                                                            {publishedBooks.map(book => (
                                                                <SelectItem key={book.flipbookId} value={book.flipbookId}>
                                                                    {book.flipbook?.name || "Untitled"}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <div className="text-[10px] text-gray-400">
                                                        This book will load at the root (/) of your domain.
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-xs text-gray-400 italic">
                                                    Domain not active
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1">
                                                {domain.status.toLowerCase() === 'pending' && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-violet-600 h-8 px-2"
                                                        onClick={() => onSelectForSetup(domain)}
                                                    >
                                                        Setup
                                                    </Button>
                                                )}
                                                {domain.status.toLowerCase() === 'pending' && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 px-2"
                                                        onClick={() => onVerify(domain._id)}
                                                        disabled={loading}
                                                    >
                                                        Verify
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

            <div className="bg-violet-50 border border-violet-100 p-4 rounded-lg flex gap-4">
                <div className="bg-white p-2 rounded-full h-fit border border-violet-200">
                    <Settings className="text-violet-600" size={20} />
                </div>
                <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-violet-900">Advanced Custom Paths</h4>
                    <p className="text-xs text-violet-800 leading-relaxed">
                        To point a specific book to a custom path (e.g., yourdomain.com/summer-catalog),
                        set the <strong>Slug</strong> in the flipbook's individual publish settings.
                    </p>
                </div>
            </div>
        </div>
    );
}
