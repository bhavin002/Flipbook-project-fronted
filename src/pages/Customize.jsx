import React, { useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { AlignRight, Eye, Palette, PersonStanding, SlidersHorizontal, TableOfContents } from "lucide-react"
import Appearance from "@/components/CustomizeLayoutComponents/Appearance"
import Branding from '@/components/CustomizeLayoutComponents/Branding'
import MenuControls from '@/components/CustomizeLayoutComponents/MenuControls'
import TableOfContentsComponent from '@/components/CustomizeLayoutComponents/TableOfContentsComponent'
import LeadForm from '@/components/CustomizeLayoutComponents/LeadForm'
import Accessibility from '@/components/CustomizeLayoutComponents/Accessibility'

export default function Customize() {
    const [activeValues, setActiveValues] = useState([])

    const menuItems = [
        {
            value: "appearance",
            icon: <Eye />,
            label: "Appearance",
            component: <Appearance />
        },
        {
            value: "branding",
            icon: <Palette />,
            label: "Branding",
            component: <Branding />
        },
        {
            value: "menu-controls",
            icon: <SlidersHorizontal />,
            label: "Menu controls",
            component: <MenuControls />
        },
        {
            value: "table-of-contents",
            icon: <TableOfContents />,
            label: "Table of contents",
            component: <TableOfContentsComponent />
        },
        {
            value: "lead-form",
            icon: <AlignRight />,
            label: "Lead form",
            component: <LeadForm />
        },
        {
            value: "accessibility",
            icon: <PersonStanding />,
            label: "Accessibility",
            component: <Accessibility />
        }
    ]

    const handleValueChange = (values) => {
        setActiveValues(values)
    }

    return (
        <div className="flex">
            <div className="w-[40%]">
                <Accordion 
                    type="multiple" 
                    collapsible 
                    className="w-full p-4"
                    value={activeValues}
                    onValueChange={handleValueChange}
                >
                    {menuItems.map((item) => (
                        <AccordionItem
                            key={item.value}
                            value={item.value}
                            className="border my-4 px-4 rounded-md"
                        >
                            <AccordionTrigger className="hover:no-underline">
                                <div className="flex justify-start items-center gap-2">
                                    {item.icon}
                                    {item.label}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-4 px-1">
                                {activeValues.includes(item.value) && item.component}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
            <div className="w-[60%] bg-white">
                {/* Right side content area left empty */}
            </div>
        </div>
    )
}