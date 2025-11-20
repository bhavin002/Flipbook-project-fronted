import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, Plus, Check, Edit2 } from "lucide-react";
import { z } from "zod";
import { DomainRestrictionApi, GetDomainRestrictionApi } from "@/service/flipbook.service";
import { toast } from "sonner";

const domainSchema = z.string().regex(
    /^(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/,
    "Please enter a valid domain (e.g., example.com)"
);

export default function DomainRestriction({ flipbookId }) {
    const [isRestrictionEnabled, setIsRestrictionEnabled] = useState(false);
    const [domains, setDomains] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchDomainRestrictions = async () => {
            try {
                setIsLoading(true);
                const response = await GetDomainRestrictionApi(flipbookId);
                setIsRestrictionEnabled(response.data.useDomainRestrictions || false);
                if (response.data.allowedDomains && response.data.allowedDomains.length > 0) {
                    const formattedDomains = response.data.allowedDomains.map((domain, index) => ({
                        id: index + 1,
                        value: domain,
                        isValid: true,
                        isEditing: false
                    }));
                    setDomains(formattedDomains);
                }
            } catch (error) {
                toast.error("Error fetching domain restrictions", {
                    description: error.message || "Oops! Something went wrong."
                });
            } finally {
                setIsLoading(false);
            }
        };

        if (flipbookId) {
            fetchDomainRestrictions();
        }
    }, [flipbookId]);

    const saveDomainRestrictions = async (domainsToSave, restrictionEnabled = isRestrictionEnabled) => {
        try {
            setIsSaving(true);

            const validDomains = domainsToSave
                .filter(domain => domain.isValid === true && domain.value.trim())
                .map(domain => domain.value.trim());

            const payload = {
                useDomainRestrictions: restrictionEnabled,
                allowedDomains: validDomains
            };

            await DomainRestrictionApi(flipbookId, payload);
        } catch (error) {
            toast.error("Error saving domain restrictions", {
                description: error.message || "Oops! Something went wrong."
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleToggle = async () => {
        const newValue = !isRestrictionEnabled;
        setIsRestrictionEnabled(newValue);

        try {
            setIsSaving(true);
            await saveDomainRestrictions(domains, newValue);
        } catch (error) {
            toast.error("Error toggling domain restrictions", {
                description: error.message || "Oops! Something went wrong."
            });
            setIsRestrictionEnabled(!newValue);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDomainChange = (id, value) => {
        setDomains(
            domains.map((domain) =>
                domain.id === id ? { ...domain, value, isValid: null } : domain
            )
        );
    };

    const handleConfirmDomain = async (id) => {
        const domain = domains.find((d) => d.id === id);
        try {
            domainSchema.parse(domain.value);
            const updatedDomains = domains.map((d) =>
                d.id === id ? { ...d, isValid: true, isEditing: false } : d
            );
            setDomains(updatedDomains);
            await saveDomainRestrictions(updatedDomains);
        } catch (error) {
            setDomains(
                domains.map((d) =>
                    d.id === id ? { ...d, isValid: false } : d
                )
            );
        }
    };

    const handleEditDomain = (id) => {
        setDomains(
            domains.map((d) =>
                d.id === id ? { ...d, isEditing: true } : d
            )
        );
    };

    const handleDeleteDomain = async (id) => {
        const updatedDomains = domains.filter((d) => d.id !== id);
        setDomains(updatedDomains);

        try {
            setIsSaving(true);
            await saveDomainRestrictions(updatedDomains);
        } catch (error) {
            toast.error("Error deleting domain", {
                description: error.message || "Oops! Something went wrong."
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddDomain = () => {
        const newId = Math.max(...domains.map((d) => d.id), 0) + 1;
        setDomains([...domains, { id: newId, value: "", isValid: null, isEditing: true }]);
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Domain restriction</CardTitle>
                    <CardDescription>
                        This option restricts the embed option only to a specific website (domain).
                        It prevents people from embedding the flipbook into other websites.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center">
                        <Skeleton className="h-6 w-11 rounded-full" />
                        <Skeleton className="h-4 w-40 ml-3" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-end gap-4">
                            <div className="w-full">
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <Skeleton className="h-10 w-10" />
                            <Skeleton className="h-10 w-10" />
                        </div>
                        <div className="flex items-end gap-4">
                            <div className="w-full">
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <Skeleton className="h-10 w-10" />
                            <Skeleton className="h-10 w-10" />
                        </div>
                    </div>
                    <Skeleton className="h-10 w-32" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Domain restriction
                </CardTitle>
                <CardDescription>
                    This option restricts the embed option only to a specific website (domain).
                    It prevents people from embedding the flipbook into other websites.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center">
                    <Switch
                        id="domain-restrictions"
                        checked={isRestrictionEnabled}
                        onCheckedChange={handleToggle}
                        disabled={isSaving}
                    />
                    <Label htmlFor="domain-restrictions" className="ml-3 text-gray-700">
                        Use domain restrictions
                    </Label>
                </div>

                {domains.map((domain) => (
                    <div key={domain.id} className="flex items-end gap-4">
                        <div className="w-full">
                            <Input
                                id={`domain-${domain.id}`}
                                placeholder="Write the domain in here…"
                                value={domain.value}
                                onChange={(e) => handleDomainChange(domain.id, e.target.value)}
                                disabled={!isRestrictionEnabled || !domain.isEditing || isSaving}
                                className={domain.isValid === false ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                            />
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => handleDeleteDomain(domain.id)}
                            disabled={!isRestrictionEnabled || isSaving}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() =>
                                domain.isEditing
                                    ? handleConfirmDomain(domain.id)
                                    : handleEditDomain(domain.id)
                            }
                            disabled={!isRestrictionEnabled || isSaving || (domain.isEditing && !domain.value.trim())}
                        >
                            {domain.isEditing ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                        </Button>
                    </div>
                ))}

                <Button
                    onClick={handleAddDomain}
                    disabled={!isRestrictionEnabled || isSaving}
                    variant="outline"
                >
                    <Plus className="h-4 w-4 mr-2" /> Add new domain
                </Button>
            </CardContent>
        </Card>
    );
}