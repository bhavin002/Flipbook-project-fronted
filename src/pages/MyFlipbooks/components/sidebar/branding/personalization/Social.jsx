import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export default function Social() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Social media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input id="facebook" placeholder="facebook.com/" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="x">X (formerly Twitter)</Label>
                    <Input id="x" placeholder="x.com/" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="youtube">YouTube</Label>
                    <Input id="youtube" placeholder="youtube.com/" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input id="instagram" placeholder="instagram.com/" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input id="linkedin" placeholder="linkedin.com/" />
                </div>
            </CardContent>
        </Card>
    )
}