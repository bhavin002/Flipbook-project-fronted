import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from 'lucide-react';

export default function Footer() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Add links to your footer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-end gap-4">
                    <div>
                        <Label htmlFor="title1">Title</Label>
                        <Input id="title1" placeholder="Title" />
                    </div>
                    <div>
                        <Label htmlFor="url1">URL</Label>
                        <Input id="url1" placeholder="URL" />
                    </div>
                    <Button variant="outline">
                        <Trash2 />
                    </Button>
                </div>
                <div className="flex items-end gap-4">
                    <div>
                        <Label htmlFor="title1">Title</Label>
                        <Input id="title1" placeholder="Title" />
                    </div>
                    <div>
                        <Label htmlFor="url1">URL</Label>
                        <Input id="url1" placeholder="URL" />
                    </div>
                    <Button variant="outline">
                        <Trash2 />
                    </Button>
                </div>
                <Button><Plus /> Add a link to your footer</Button>
            </CardContent>
        </Card>
    )
}