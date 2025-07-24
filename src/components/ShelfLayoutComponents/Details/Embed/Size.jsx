import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Size() {
    return (
         <Card>
            <CardHeader>
                <CardTitle>Choose embed size</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="width">
                            Width
                        </Label>
                        <Input
                            id="width"
                            type="number"
                            defaultValue="721"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="height">
                            Height
                        </Label>
                        <Input
                            id="height"
                            type="number"
                            defaultValue="481"
                        />
                    </div>
                </div>
                <div className="flex items-center">
                    <Switch id="responsive-width" />
                    <Label htmlFor="responsive-width" className="ml-3 text-gray-700">
                        Responsive width
                    </Label>
                </div>
            </CardContent>
        </Card>
    )
}