import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getData } from "@/utils/datas";
import TemplateDetailView from "./TemplateDetailView";

export default function TemplateSidebarPanel() {
    const [searchQuery, setSearchQuery] = useState("");
    const [hoveredId, setHoveredId] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const templatesData = getData("templatesData") || [];
    const templates = getData("templates") || [];

    const handleTemplateClick = (template) => {
        setSelectedTemplate(template);
    };

    const handleBackClick = () => {
        setSelectedTemplate(null);
    };

    if (selectedTemplate) {
        return (
            <TemplateDetailView 
                template={selectedTemplate}
                onBackClick={handleBackClick}
            />
        );
    }

    return (
        <div className="px-6 pt-6 pb-2 space-y-4 flex flex-col h-[100vh]">
            <div className="relative">
                <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                    <Search className="h-4 w-4" />
                </div>
                <Input
                    id="search"
                    autoComplete="off"
                    type="search"
                    placeholder="Search by name"
                    className="w-full rounded-lg bg-background text-black pl-8"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                />
            </div>
            <Select defaultValue="all-templates">
                <SelectTrigger id="template" className="w-full">
                    <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                    {templatesData.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="h-0 overflow-y-auto flex-grow">
                <div className="grid grid-cols-2 gap-4">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className="relative cursor-pointer rounded-lg overflow-hidden"
                            onMouseEnter={() => setHoveredId(template.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => handleTemplateClick(template)}
                        >
                            <div className="relative aspect-[4/3]">
                                <img
                                    src={template.thumbnail}
                                    alt={`Template ${template.id}`}
                                    className="w-full h-full object-cover"
                                />

                                {hoveredId === template.id && (
                                    <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded-md">
                                        {template.pages} pages
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}