import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

export default function BrandingFonts() {
    const fonts = [
        { id: 1, name: "Open Sans", styles: ["Regular", "Italic",] },
        { id: 2, name: "Montserrat", styles: ["Regular", "SemiBold",] },
        { id: 3, name: "Roboto", styles: ["Regular", "Bold",] },
    ];
    return (
        <div className="md:p-6 p-3 max-w-[100vw] overflow-auto space-y-4 pt-0 flex-1 flex flex-col max-md:max-h-[calc(100vh-68px-80px)]">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Brand fonts</h1>
                <p className="text-gray-500">Upload and manage custom fonts to use in your designs.</p>
            </div>
            <div className="flex items-center gap-8">
                <Button>
                    Upload your font
                </Button>
                <p className="text-gray-500 text-sm">Accepted font types: TTF and OTF</p>
            </div>
            <div className="space-y-4">
                {fonts.map((font) => (
                    <Card key={font.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-4 flex justify-between items-center border-b">
                            <h3 className="text-lg font-semibold" style={{ fontFamily: font.name }}>{font.name}</h3>
                        </div>

                        {font.styles.map((style, index) => (
                            <CardContent key={index} className="p-0">
                                <div className="flex justify-between items-center p-4 border-b last:border-b-0 hover:bg-gray-50">
                                    <p className="text-lg" style={{
                                        fontFamily: font.name,
                                        fontStyle: style.includes('Italic') ? 'italic' : 'normal',
                                        fontWeight: style.includes('Bold') ? 'bold' : style.includes('Medium') ? '500' : style.includes('SemiBold') ? '600' : style.includes('Light') ? '300' : 'normal'
                                    }}>
                                        {style}
                                    </p>
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500">
                                        <Trash2 size={18} />
                                    </Button>
                                </div>
                            </CardContent>
                        ))}
                    </Card>
                ))}
            </div>
        </div>
    )
}