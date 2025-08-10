import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus, Check, Edit2 } from "lucide-react";
import { z } from "zod";

const domainSchema = z.string().regex(
    /^(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/,
    "Please enter a valid domain (e.g., example.com)"
);

export default function DomainRestriction() {
    const [isRestrictionEnabled, setIsRestrictionEnabled] = useState(false);
    const [domains, setDomains] = useState([]);

    const handleToggle = () => {
        setIsRestrictionEnabled(!isRestrictionEnabled);
    };

    const handleDomainChange = (id, value) => {
        setDomains(
            domains.map((domain) =>
                domain.id === id ? { ...domain, value, isValid: null } : domain
            )
        );
    };

    const handleConfirmDomain = (id) => {
        const domain = domains.find((d) => d.id === id);
        try {
            domainSchema.parse(domain.value);
            setDomains(
                domains.map((d) =>
                    d.id === id ? { ...d, isValid: true, isEditing: false } : d
                )
            );
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

    const handleDeleteDomain = (id) => {
        setDomains(domains.filter((d) => d.id !== id));
    };

    const handleAddDomain = () => {
        const newId = Math.max(...domains.map((d) => d.id), 0) + 1;
        setDomains([...domains, { id: newId, value: "", isValid: null, isEditing: true }]);
    };

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
                    <Switch
                        id="domain-restrictions"
                        checked={isRestrictionEnabled}
                        onCheckedChange={handleToggle}
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
                                disabled={!isRestrictionEnabled || !domain.isEditing}
                                className={domain.isValid === false ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                            />
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => handleDeleteDomain(domain.id)}
                            disabled={!isRestrictionEnabled}
                        >
                            <Trash2 />
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() =>
                                domain.isEditing
                                    ? handleConfirmDomain(domain.id)
                                    : handleEditDomain(domain.id)
                            }
                            disabled={!isRestrictionEnabled}
                        >
                            {domain.isEditing ? <Check /> : <Edit2 />}
                        </Button>
                    </div>
                ))}
                <Button
                    onClick={handleAddDomain}
                    disabled={!isRestrictionEnabled}
                >
                    <Plus /> Add new link
                </Button>
            </CardContent>
        </Card>
    );
}