import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Upload } from "lucide-react";

export default function BrandingLogos() {
    const [logos, setLogos] = useState([
        { id: 1, src: "/src/assets/logo.png", alt: "Logo 1" },
        { id: 2, src: "/src/assets/logo.png", alt: "Logo 2" }
    ]);

    const handleDelete = (id) => {
        setLogos(logos.filter(logo => logo.id !== id));
    };

    const handleUpload = () => {
        const newLogo = {
            id: Date.now(),
            src: "/src/assets/logo.png",
            alt: `Logo ${logos.length + 1}`
        };
        setLogos([...logos, newLogo]);
    };

    return (
        <div className="flex flex-col max-w-full overflow-hidden p-6 h-full space-y-4">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Brand Logos</h1>
                <p className="text-gray-500">Manage your logos, images and visual brand assets</p>
            </div>

            <div className="mb-6">
                <Button onClick={handleUpload} >
                    <Upload size={16} />
                    Upload brand logo
                </Button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {logos.map((logo) => (
                    <LogoCard key={logo.id} logo={logo} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
}

function LogoCard({ logo, onDelete }) {
    const preventDrag = (e) => {
        e.preventDefault();
        return false;
    };

    return (
        <Card className="relative overflow-hidden aspect-square border border-gray-200 rounded-lg shadow-sm hover:shadow transition-all">
            <div
                className="absolute inset-0 bg-center bg-repeat"
                style={{ backgroundImage: 'url(https://cdn.flipsnack.com/site/images/transparent-bg-pattern.png)' }}
            />

            <img
                src={logo.src}
                alt={logo.alt}
                className="w-full h-full object-contain p-2 relative z-10 select-none"
                draggable="false"
                onDragStart={preventDrag}
            />

            <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 text-gray-500 hover:bg-gray-200 hover:text-red-600 z-20 p-1 h-6 w-6 rounded-full"
                onClick={() => onDelete(logo.id)}
            >
                <Trash2 size={14} />
            </Button>
        </Card>
    );
}