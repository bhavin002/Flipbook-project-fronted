import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from 'lucide-react';
import { useBranding } from "@/context/BrandingContext";

export default function Footer() {
    const { form, handleInputChange } = useBranding();
    const footerLinks = form.watch("footerLinks");

    const handleAddLink = () => {
        const newLinks = [...footerLinks, { title: '', url: '' }];
        handleInputChange("footerLinks", newLinks);
    };

    const handleRemoveLink = (index) => {
        const newLinks = footerLinks.filter((_, i) => i !== index);
        handleInputChange("footerLinks", newLinks);
    };

    const handleLinkChange = (index, field, value) => {
        const newLinks = [...footerLinks];
        newLinks[index] = { ...newLinks[index], [field]: value };
        handleInputChange("footerLinks", newLinks);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add links to your footer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {footerLinks.map((link, index) => (
                    <div key={index} className="flex items-end gap-4">
                        <div>
                            <Label htmlFor={`title${index}`}>Title</Label>
                            <Input 
                                id={`title${index}`} 
                                placeholder="Title"
                                value={link.title}
                                onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor={`url${index}`}>URL</Label>
                            <Input 
                                id={`url${index}`} 
                                placeholder="URL"
                                value={link.url}
                                onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                            />
                        </div>
                        <Button 
                            variant="outline"
                            onClick={() => handleRemoveLink(index)}
                        >
                            <Trash2 />
                        </Button>
                    </div>
                ))}
                <Button onClick={handleAddLink}>
                    <Plus /> Add a link to your footer
                </Button>
            </CardContent>
        </Card>
    );
}