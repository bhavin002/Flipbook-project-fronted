import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useBranding } from "@/context/BrandingContext";

export default function Social() {
    const { form, handleInputChange } = useBranding();
    const facebook = form.watch("facebook");
    const twitter = form.watch("twitter");
    const youtube = form.watch("youtube");
    const instagram = form.watch("instagram");
    const linkedin = form.watch("linkedin");

    const handleSocialChange = (field, value) => {
        // Add https:// if not present
        if (value && !value.startsWith('http://') && !value.startsWith('https://')) {
            value = 'https://' + value;
        }
        handleInputChange(field, value);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Social media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input 
                        id="facebook" 
                        placeholder="facebook.com/"
                        value={facebook}
                        onChange={(e) => handleSocialChange("facebook", e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="x">X (formerly Twitter)</Label>
                    <Input 
                        id="x" 
                        placeholder="x.com/"
                        value={twitter}
                        onChange={(e) => handleSocialChange("twitter", e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="youtube">YouTube</Label>
                    <Input 
                        id="youtube" 
                        placeholder="youtube.com/"
                        value={youtube}
                        onChange={(e) => handleSocialChange("youtube", e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input 
                        id="instagram" 
                        placeholder="instagram.com/"
                        value={instagram}
                        onChange={(e) => handleSocialChange("instagram", e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input 
                        id="linkedin" 
                        placeholder="linkedin.com/"
                        value={linkedin}
                        onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                    />
                </div>
            </CardContent>
        </Card>
    );
}