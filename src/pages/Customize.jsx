import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronDown } from "lucide-react"

export default function Customize() {
    const menuItems = [
        { 
            value: "google-translate", 
            icon: "🌐", 
            label: "Google Translate",
            description: "Configure translation settings"
        },
        { 
            value: "branding", 
            icon: "🎨", 
            label: "Branding",
            description: "Set up your brand's visual identity"
        },
        { 
            value: "menu-controls", 
            icon: "⚙️", 
            label: "Menu controls",
            description: "Configure menu settings and behaviors"
        },
        { 
            value: "table-of-contents", 
            icon: "📋", 
            label: "Table of contents",
            description: "Manage content navigation options"
        },
        { 
            value: "lead-form", 
            icon: "📝", 
            label: "Lead form",
            description: "Design and customize lead capture forms"
        },
        { 
            value: "google-analytics", 
            icon: "📊", 
            label: "Google Analytics",
            description: "Configure analytics tracking"
        },
        { 
            value: "google-tag-manager", 
            icon: "🏷️", 
            label: "Google Tag Manager",
            description: "Manage tags and tracking codes"
        }
    ]

    return (
        <div className="flex h-screen">
            <div className="w-[40%] bg-black">
                <Accordion 
                    type="single" 
                    collapsible 
                    className="w-full border-t border-gray-800"
                >
                    {menuItems.map((item) => (
                        <AccordionItem 
                            key={item.value} 
                            value={item.value} 
                            className="border-b border-gray-800"
                        >
                            <AccordionTrigger className="px-4 py-3 hover:bg-gray-900 transition-colors">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-xl">{item.icon}</span>
                                        <span className="text-white">{item.label}</span>
                                    </div>
                                    <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 py-3 bg-gray-900 text-gray-300">
                                {item.description}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
            <div className="w-[60%] bg-white">
                {/* Content for the right side */}
            </div>
        </div>
    )
}