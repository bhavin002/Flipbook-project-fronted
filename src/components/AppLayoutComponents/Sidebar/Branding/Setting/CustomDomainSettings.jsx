import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Info, Check, ChevronRight, Trash2, Globe, RefreshCw, Loader2, Copy, Image, Upload, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { AddDomainApi, GetDomainsApi, VerifyDomainApi, DeleteDomainApi } from "@/service/custom.domain.service";
import { toast } from "sonner";
import ConfirmationDialog from "@/utils/ConfirmationDialog";
import { Crisp } from "crisp-sdk-web";

const CNAME_TARGET = import.meta.env.VITE_CNAME_TARGET;

export default function CustomDomainSettings() {
    const [progress, setProgress] = useState(33);
    const [activeStep, setActiveStep] = useState(1);
    const [domains, setDomains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [newDomain, setNewDomain] = useState("");
    const [favicon, setFavicon] = useState(null);
    const [faviconPreview, setFaviconPreview] = useState(null);
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
                } else {
                        const hasPending = response.data.some(d => d.status?.toLowerCase() === 'pending');
                        if (hasPending && activeStep === 1) {
                            setActiveStep(2);
                            setProgress(66);
                        }
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

        if (favicon && favicon.size > 512 * 1024) {
            toast.error("Favicon size exceeds limit", {
                description: "Maximum file size is 512 KB.",
            });
            return;
        }

        setActionLoading(true);
        try {
            const formData = new FormData();
            formData.append('domain', newDomain.trim());
            if (favicon) {
                formData.append('favicon', favicon);
            }

            const response = await AddDomainApi(formData);
            if (response.success) {
                toast.success("Domain added successfully");
                setNewDomain("");
                setFavicon(null);
                setFaviconPreview(null);
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

    const handleFaviconChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 512 * 1024) {
            toast.error("File size exceeds limit", {
                description: "Maximum file size is 512 KB.",
            });
            e.target.value = '';
            return;
        }

        const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/x-icon', 'image/vnd.microsoft.icon', 'image/svg+xml'];
        if (!validTypes.includes(file.type)) {
            toast.error("Invalid file type", {
                description: "Please upload a PNG, JPG, ICO, or SVG file.",
            });
            e.target.value = '';
            return;
        }

        setFavicon(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setFaviconPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveFavicon = () => {
        setFavicon(null);
        setFaviconPreview(null);
    };

    const handleVerifyDomain = async (domainId) => {
        setActionLoading(true);
        try {
            const response = await VerifyDomainApi(domainId);
            if (response.success) {
                if (response.data?.status?.toLowerCase() === 'active') {
                    toast.success("Domain verified and active!");
                    setActiveStep(3);
                    setProgress(100);
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
            <div className="mt-8">
                <Card>
                    <CardHeader className="pb-0">
                        <Skeleton className="h-6 w-48" />
                    </CardHeader>
                    <CardContent>
                        <div className="py-6">
                            <div className="relative pt-2 pb-8">
                                <Skeleton className="h-2 w-full" />
                                <div className="absolute top-0 left-0 right-0 flex justify-between -mt-2.5">
                                    <Skeleton className="w-6 h-6 rounded-full" />
                                    <Skeleton className="w-6 h-6 rounded-full" />
                                    <Skeleton className="w-6 h-6 rounded-full" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                                <Skeleton className="h-20 rounded-lg" />
                                <Skeleton className="h-20 rounded-lg" />
                                <Skeleton className="h-20 rounded-lg" />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-10 w-full max-w-md" />
                                <Skeleton className="h-4 w-full max-w-2xl" />
                            </div>
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-40" />
                                <div className="flex items-center gap-4">
                                    <Skeleton className="w-20 h-20 rounded-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-9 w-32" />
                                        <Skeleton className="h-3 w-64" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Skeleton className="h-10 w-32" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <Card>
                <CardHeader className="pb-0">
                    <div className="flex items-center justify-between w-full">
                        <CardTitle className="flex items-center gap-2">
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
                            favicon={favicon}
                            faviconPreview={faviconPreview}
                            onFaviconChange={handleFaviconChange}
                            onRemoveFavicon={handleRemoveFavicon}
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
function DomainConfigStep({ newDomain, setNewDomain, favicon, faviconPreview, onFaviconChange, onRemoveFavicon, onSubmit, loading }) {
    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const getFaviconImage = () => {
        if (faviconPreview) {
            return faviconPreview;
        }
        return null;
    };

    const hasFavicon = getFaviconImage();

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-lg font-medium">Add Your Domain Details</h2>
                <p className="text-sm text-gray-600">
                    Your users will see flipbooks on your domain links instead of flipdrag.com domain with custom domain setup.
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="domain" className="font-medium">Domain Name</Label>
                <div className="flex gap-2">
                    <Input
                        id="domain"
                        placeholder="e.g. catalog.yourdomain.com"
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
                    Use a subdomain to avoid any conflicts with domain settings. Eg. instead of putting yourdomain.com as custom domain, add catalog.yourdomain.com
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                <Label className="font-medium">Favicon</Label>
                <div className="flex items-center gap-4">
                    <div className="flex shrink-0 p-0 overflow-hidden justify-center items-center size-20 border-2 border-dotted border-gray-300 text-gray-400 rounded-full dark:border-neutral-700 dark:text-neutral-600">
                        {hasFavicon ? (
                            <img 
                                src={getFaviconImage()} 
                                className="w-auto h-auto max-w-[76px] max-h-[76px] object-cover" 
                                alt="Favicon" 
                            />
                        ) : (
                            <Image />
                        )}
                    </div>
                    <div className="space-y-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={onFaviconChange}
                            accept="image/png,image/jpeg,image/jpg,image/x-icon,image/vnd.microsoft.icon,image/svg+xml"
                            className="hidden"
                            disabled={loading}
                        />
                        <Button 
                            type="button"
                            variant="outline" 
                            size="sm"
                            onClick={handleUploadClick}
                            disabled={loading}
                        >
                            <Upload size={14} className="mr-2" />
                            {hasFavicon ? "Change favicon" : "Upload favicon"}
                        </Button>
                        {hasFavicon && (
                            <p className="text-xs text-gray-500">
                                Click to change your favicon. Maximum file size is 512 KB.
                            </p>
                        )}
                        {!hasFavicon && (
                            <p className="text-xs text-gray-500">
                                Upload a favicon image (PNG, JPG, ICO, or SVG). Maximum file size is 512 KB.
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-start gap-2 mt-2">
                    <Info size={16} className="text-violet-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-600">
                    Favicon is small icon that your users in their browser tab beside page title.
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

function DomainRow({ domain, onVerify, onDelete, loading }) {
    const [faviconError, setFaviconError] = useState(false);

    return (
        <TableRow>
            <TableCell>
                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center overflow-hidden shrink-0">
                    {domain.favicon && !faviconError ? (
                        <img 
                            src={domain.favicon} 
                            alt={`${domain.domain} favicon`}
                            className="w-full h-full object-contain"
                            onError={() => setFaviconError(true)}
                        />
                    ) : null}
                </div>
            </TableCell>
            <TableCell>
                <div className="font-medium">{domain.domain}</div>
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
                        <AlertTriangle size={12} />
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
            <div className="space-y-1">
                <h2 className="text-lg font-medium">Setup Your Custom Domain</h2>
                <p className="text-sm text-gray-600">
                    Please follow the steps accordingly to setup your custom domain
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">STEP 1</span>
                        <span className="text-sm">•</span>
                        <span className="text-sm font-medium">Update DNS Settings</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Add below DNS settings to your domain hosting provider.{" "}
                        <a 
                            href="#" 
                            className="text-violet-600 hover:underline"
                            onClick={(e) => {
                                e.preventDefault();
                                if (window.$crisp) {
                                    window.$crisp.push(["do", "chat:open"]);
                                } else {
                                    Crisp.chat.open();
                                }
                            }}
                        >
                            Get Help
                        </a>
                    </p>

                    {firstDomain && (
                        <div className="overflow-x-auto">
                            <div className="border rounded-md max-w-full overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50">
                                            <TableHead className="w-24">Type</TableHead>
                                            <TableHead>Domain/Hostname</TableHead>
                                            <TableHead>Value/Address</TableHead>
                                            <TableHead className="w-16"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium uppercase">CNAME</TableCell>
                                            <TableCell className="font-mono text-sm">
                                                {firstDomain.domain}
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
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">STEP 2</span>
                        <span className="text-sm">•</span>
                        <span className="text-sm font-medium">Custom Domain Status</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Once you update the DNS settings, please click on verify the domain button. You can remove domain anytime and add different one.
                    </p>

                    <div className="overflow-x-auto">
                        <div className="border rounded-md max-w-full">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50">
                                        <TableHead>Favicon</TableHead>
                                        <TableHead>Domain</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
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
                                            <DomainRow
                                                key={domain._id}
                                                domain={domain}
                                                onVerify={onVerify}
                                                onDelete={onDelete}
                                                loading={loading}
                                            />
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
