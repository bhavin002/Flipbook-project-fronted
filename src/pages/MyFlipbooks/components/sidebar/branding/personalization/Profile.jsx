import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Trash2,
    Upload,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
export default function Profile() {
    return (
         <Card>
            <CardHeader>
                <CardTitle>Profile information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center">
                    <Switch id="hide-profile-info" />
                    <label htmlFor="hide-profile-info" className="ml-3 text-gray-700">
                        Hide profile information
                    </label>
                </div>
                <div className="flex items-center justify-between">
                    <label className="font-medium flex items-center gap-2">
                        Profile Image
                    </label>
                    <Button variant="outline"><Trash2 /></Button>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex justify-center items-center size-12 overflow-hidden border border-1 border-gray-100">
                        <img src="/src/assets/profile.jpg" className="w-auto h-auto max-h-12 max-w-full" alt="Favicon" />
                    </div>
                    <div className="space-y-2">
                        <Button variant="outline" size="sm">
                            <Upload size={14} className="mr-2" />
                            Upload Image
                        </Button>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG (Max 15MB)</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="hopoleh620 hopoleh620" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="description">
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        placeholder="Description"
                        className="resize-none"
                        rows={3}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="link-to-website">Link to my website</Label>
                    <Input id="link-to-website" placeholder="yourdomain.com" />
                </div>
            </CardContent>
        </Card>
    )
}