
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus, Check } from "lucide-react";

export default function DomainRestriction() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Domain restriction</CardTitle>
                <CardDescription>This option restricts the embed option only to a specific website (domain). It prevents people from embedding the flipbook into other websites.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center">
                    <Switch id="domain-restrictions" />
                    <Label htmlFor="domain-restrictions" className="ml-3 text-gray-700">
                        Use domain restrictions
                    </Label>
                </div>
                <div className="flex items-end gap-4">
                    <div className="w-full">
                        <Input id="title1" placeholder="Write the domain in here…" />
                    </div>
                    <Button variant="outline">
                        <Trash2 />
                    </Button>
                    <Button variant="outline">
                        <Check />
                    </Button>
                </div>
                <div className="flex items-end gap-4">
                    <div className="w-full">
                        <Input id="title1" placeholder="Write the domain in here…" />
                    </div>
                    <Button variant="outline">
                        <Trash2 />
                    </Button>
                    <Button variant="outline">
                        <Check />
                    </Button>
                </div>
                <Button><Plus /> Add new link</Button>
            </CardContent>
        </Card>
    )
}